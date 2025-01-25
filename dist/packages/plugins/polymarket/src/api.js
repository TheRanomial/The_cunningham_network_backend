"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PROTOCOL_VERSION = exports.PROTOCOL_NAME = exports.ORDER_STRUCTURE = exports.SignatureType = exports.OrderType = exports.IntSide = exports.Side = void 0;
exports.createOrDeriveAPIKey = createOrDeriveAPIKey;
exports.getEvents = getEvents;
exports.getMarketInfo = getMarketInfo;
exports.createOrder = createOrder;
exports.getOpenOrders = getOpenOrders;
exports.cancelOrder = cancelOrder;
exports.cancelAllOrders = cancelAllOrders;
const viem_1 = require("viem");
const chains_1 = require("viem/chains");
const zod_1 = require("zod");
const contracts_1 = require("./contracts");
const utils_1 = require("./utils");
const GAMMA_URL = "https://gamma-api.polymarket.com";
function getBaseUrl(chain) {
    return chain.id === chains_1.polygon.id ? "https://clob.polymarket.com" : "https://clob-staging.polymarket.com";
}
var Side;
(function (Side) {
    Side["BUY"] = "BUY";
    Side["SELL"] = "SELL";
})(Side || (exports.Side = Side = {}));
var IntSide;
(function (IntSide) {
    IntSide[IntSide["BUY"] = 0] = "BUY";
    IntSide[IntSide["SELL"] = 1] = "SELL";
})(IntSide || (exports.IntSide = IntSide = {}));
var OrderType;
(function (OrderType) {
    OrderType["GTC"] = "GTC";
    OrderType["FOK"] = "FOK";
    OrderType["GTD"] = "GTD";
})(OrderType || (exports.OrderType = OrderType = {}));
const Event = zod_1.z.object({
    active: zod_1.z.boolean(),
    archived: zod_1.z.boolean(),
    closed: zod_1.z.boolean(),
    commentCount: zod_1.z.number().optional(),
    creationDate: zod_1.z.string(),
    description: zod_1.z.string(),
    endDate: zod_1.z.string(),
    liquidity: zod_1.z.number().optional(),
    markets: zod_1.z.array(zod_1.z.object({
        acceptingOrders: zod_1.z.boolean(),
        clobTokenIds: zod_1.z.string(),
        description: zod_1.z.string(),
        oneDayPriceChange: zod_1.z.number().optional(),
        orderMinSize: zod_1.z.number(),
        orderPriceMinTickSize: zod_1.z.number(),
        outcomePrices: zod_1.z.string(),
        outcomes: zod_1.z.string(),
        question: zod_1.z.string().optional(),
        slug: zod_1.z.string(),
        volume: zod_1.z.string().optional(),
    })),
    slug: zod_1.z.string(),
    startDate: zod_1.z.string(),
    tags: zod_1.z.array(zod_1.z.object({
        id: zod_1.z.string().optional(),
        label: zod_1.z.string().optional(),
        slug: zod_1.z.string(),
    })),
    title: zod_1.z.string(),
    updatedAt: zod_1.z.string().optional(),
    volume: zod_1.z.number().optional(),
    volume24hr: zod_1.z.number().optional(),
});
var SignatureType;
(function (SignatureType) {
    SignatureType[SignatureType["EOA"] = 0] = "EOA";
    SignatureType[SignatureType["POLY_PROXY"] = 1] = "POLY_PROXY";
    SignatureType[SignatureType["POLY_GNOSIS_SAFE"] = 2] = "POLY_GNOSIS_SAFE";
})(SignatureType || (exports.SignatureType = SignatureType = {}));
exports.ORDER_STRUCTURE = [
    { name: "salt", type: "uint256" },
    { name: "maker", type: "address" },
    { name: "signer", type: "address" },
    { name: "taker", type: "address" },
    { name: "tokenId", type: "uint256" },
    { name: "makerAmount", type: "uint256" },
    { name: "takerAmount", type: "uint256" },
    { name: "expiration", type: "uint256" },
    { name: "nonce", type: "uint256" },
    { name: "feeRateBps", type: "uint256" },
    { name: "side", type: "uint8" },
    { name: "signatureType", type: "uint8" },
];
exports.PROTOCOL_NAME = "Polymarket CTF Exchange";
exports.PROTOCOL_VERSION = "1";
async function getHostTimestamp(chain) {
    const response = await fetch(`${getBaseUrl(chain)}/time`);
    const data = await response.text();
    return Number.parseInt(data, 10);
}
async function createL1Headers(walletClient, timestamp, nonce = 0) {
    const signature = await (0, utils_1.buildClobEip712Signature)(walletClient, timestamp, nonce);
    const address = walletClient.getAddress();
    return {
        POLY_ADDRESS: address,
        POLY_SIGNATURE: signature,
        POLY_TIMESTAMP: timestamp.toString(),
        POLY_NONCE: nonce.toString(),
    };
}
async function createL2Headers(walletClient, credentials, { method, requestPath, body }) {
    const address = walletClient.getAddress();
    const timestamp = await getHostTimestamp(walletClient.getChain());
    const sig = (0, utils_1.buildPolyHmacSignature)(credentials.secret, timestamp, method, requestPath, body);
    const headers = {
        POLY_ADDRESS: address,
        POLY_SIGNATURE: sig,
        POLY_TIMESTAMP: `${timestamp}`,
        POLY_API_KEY: credentials.key,
        POLY_PASSPHRASE: credentials.passphrase,
    };
    return headers;
}
async function getTickSize(chain, tokenId) {
    const url = `${getBaseUrl(chain)}/tick-size/${tokenId}`;
    const response = await fetch(url.toString());
    if (!response.ok) {
        throw new Error(`Failed to fetch tick size: ${response.statusText}`);
    }
    const result = await response.json();
    return result.minimum_tick_size;
}
async function getNegativeRiskAdapter(chain, tokenId) {
    const url = `${getBaseUrl(chain)}/neg-risk/${tokenId}`;
    const response = await fetch(url.toString());
    if (!response.ok) {
        throw new Error(`Failed to fetch negative risk: ${response.statusText}`);
    }
    const result = await response.json();
    return result.neg_risk;
}
async function createOrDeriveAPIKey(walletClient, nonce) {
    const timestamp = await getHostTimestamp(walletClient.getChain());
    const headers = await createL1Headers(walletClient, timestamp, nonce);
    // Try to create a new API key
    let response = await fetch(`${getBaseUrl(walletClient.getChain())}/auth/api-key`, {
        method: "POST",
        headers,
    });
    if (response.ok) {
        const data = await response.json();
        return {
            key: data.apiKey,
            secret: data.secret,
            passphrase: data.passphrase,
        };
    }
    // If creation fails, attempt to derive the API key
    response = await fetch(`${getBaseUrl(walletClient.getChain())}/auth/derive-api-key`, {
        method: "GET",
        headers,
    });
    if (!response.ok) {
        throw new Error(`Failed to create or derive API key: ${response.statusText}`);
    }
    const data = await response.json();
    return {
        key: data.apiKey,
        secret: data.secret,
        passphrase: data.passphrase,
    };
}
async function getEvents(parameters) {
    const url = new URL(`${GAMMA_URL}/events`);
    // Filter out the showOnlyMarketsAcceptingOrders parameter, it's not a valid query parameter
    const { showOnlyMarketsAcceptingOrders, ...filteredParams } = parameters;
    (0, utils_1.appendSearchParams)(url, filteredParams);
    const response = await fetch(url.toString());
    if (!response.ok) {
        throw new Error(`Failed to fetch events: ${response.statusText}`);
    }
    let events = zod_1.z.array(Event).parse(await response.json());
    if (showOnlyMarketsAcceptingOrders) {
        events = events.map((event) => ({
            ...event,
            markets: event.markets.filter((market) => market.acceptingOrders),
        }));
    }
    return events.map((event) => ({
        ...event,
        markets: event.markets.map((market) => ({
            ...(0, utils_1.transformMarketOutcomes)(market),
        })),
    }));
}
async function getMarketInfo(walletClient, parameters) {
    const chain = walletClient.getChain();
    const url = new URL(`${getBaseUrl(chain)}/markets/${parameters.id}`);
    const response = await fetch(url.toString());
    if (!response.ok) {
        throw new Error(`Failed to fetch market info: ${response.statusText}`);
    }
    return await response.json();
}
async function createOrder(walletClient, credentials, parameters) {
    const chain = walletClient.getChain();
    const tokenId = parameters.tokenId;
    const price = parameters.price;
    const orderType = parameters.type;
    const expiration = orderType === OrderType.GTD ? (0, utils_1.getExpirationTimestamp)(parameters.expiration).toString() : "0";
    const size = parameters.size;
    const side = parameters.side;
    const fees = "0";
    const tickSize = await getTickSize(chain, tokenId);
    if (!(0, utils_1.priceValid)(Number(price), tickSize)) {
        throw new Error(`Invalid price (${price}), min: ${tickSize} - max: ${1 - tickSize}`);
    }
    const usesNegRiskAdapter = await getNegativeRiskAdapter(chain, tokenId);
    const exchangeContract = (0, contracts_1.getContractConfig)(chain, usesNegRiskAdapter);
    const funderAddress = walletClient.getAddress();
    const { side: intSide, rawMakerAmt, rawTakerAmt, } = (0, utils_1.getOrderRawAmounts)(side, Number(size), Number(price), utils_1.ROUNDING_CONFIG[tickSize]);
    const makerAmount = (0, viem_1.parseUnits)(rawMakerAmt.toString(), contracts_1.COLLATERAL_TOKEN_DECIMALS).toString();
    const takerAmount = (0, viem_1.parseUnits)(rawTakerAmt.toString(), contracts_1.CONDITIONAL_TOKEN_DECIMALS).toString();
    // Make order public to everyone
    const taker = "0x0000000000000000000000000000000000000000";
    // Nonce
    const nonce = "0";
    // Sign order
    const signatureType = SignatureType.EOA;
    const salt = Math.round(Math.random() * Date.now());
    const dataToSign = {
        primaryType: "Order",
        types: {
            Order: exports.ORDER_STRUCTURE,
        },
        domain: {
            name: exports.PROTOCOL_NAME,
            version: exports.PROTOCOL_VERSION,
            chainId: chain.id,
            verifyingContract: exchangeContract,
        },
        message: {
            salt: salt,
            maker: funderAddress,
            signer: funderAddress,
            taker: taker,
            tokenId: tokenId,
            makerAmount: makerAmount,
            takerAmount: takerAmount,
            side: intSide,
            expiration: expiration,
            nonce: nonce,
            feeRateBps: fees,
            signatureType: signatureType,
        },
    };
    const { signature } = await walletClient.signTypedData(dataToSign);
    const payload = {
        order: {
            salt: salt,
            maker: funderAddress,
            signer: funderAddress,
            taker: taker,
            tokenId: tokenId,
            makerAmount: makerAmount,
            takerAmount: takerAmount,
            side,
            expiration: expiration,
            nonce: nonce,
            feeRateBps: fees,
            signatureType: signatureType,
            signature: signature,
        },
        owner: credentials.key,
        orderType: orderType,
    };
    // Submit order
    const timestamp = await getHostTimestamp(chain);
    const sig = (0, utils_1.buildPolyHmacSignature)(credentials.secret, timestamp, "POST", "/order", JSON.stringify(payload));
    const headers = {
        POLY_ADDRESS: walletClient.getAddress(),
        POLY_SIGNATURE: sig,
        POLY_TIMESTAMP: `${timestamp}`,
        POLY_API_KEY: credentials.key,
        POLY_PASSPHRASE: credentials.passphrase,
    };
    const response = await fetch(`${getBaseUrl(chain)}/order`, {
        method: "POST",
        headers,
        body: JSON.stringify(payload),
    });
    if (!response.ok) {
        const responseJson = await response.json();
        if (responseJson.error === "not enough balance / allowance") {
            const totalPrice = Number(price) * size;
            return `You don't have enough funds for this bet. Total cost: ${totalPrice} USDC. If you do, then you need to give Polymarket allowance.`;
        }
        throw new Error(`Failed to create order: ${JSON.stringify(responseJson)}`);
    }
    return await response.json();
}
async function getOpenOrders(walletClient, credentials, parameters) {
    const url = new URL(`${getBaseUrl(walletClient.getChain())}/data/orders`);
    (0, utils_1.appendSearchParams)(url, parameters);
    const headers = await createL2Headers(walletClient, credentials, {
        method: "GET",
        requestPath: "/data/orders",
    });
    const response = await fetch(url, {
        method: "GET",
        headers,
    });
    if (!response.ok) {
        throw new Error(`Failed to fetch open orders: ${response.statusText}`);
    }
    return await response.json();
}
async function cancelOrder(walletClient, credentials, parameters) {
    const body = { orderID: parameters.id };
    const headers = await createL2Headers(walletClient, credentials, {
        method: "DELETE",
        requestPath: "/order",
        body: JSON.stringify(body),
    });
    const response = await fetch(`${getBaseUrl(walletClient.getChain())}/order`, {
        method: "DELETE",
        headers,
        body: JSON.stringify(body),
    });
    if (!response.ok) {
        throw new Error(`Failed to cancel order: ${response.statusText}`);
    }
    return await response.json();
}
async function cancelAllOrders(walletClient, credentials) {
    const headers = await createL2Headers(walletClient, credentials, {
        method: "DELETE",
        requestPath: "/cancel-all",
    });
    const response = await fetch(`${getBaseUrl(walletClient.getChain())}/cancel-all`, {
        method: "DELETE",
        headers,
    });
    if (!response.ok) {
        throw new Error(`Failed to cancel all orders: ${response.statusText}`);
    }
    return await response.json();
}
