"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ROUNDING_CONFIG = void 0;
exports.camelToSnake = camelToSnake;
exports.buildPolyHmacSignature = buildPolyHmacSignature;
exports.buildClobEip712Signature = buildClobEip712Signature;
exports.appendSearchParams = appendSearchParams;
exports.priceValid = priceValid;
exports.getOrderRawAmounts = getOrderRawAmounts;
exports.roundNormal = roundNormal;
exports.roundDown = roundDown;
exports.roundUp = roundUp;
exports.decimalPlaces = decimalPlaces;
exports.getExpirationTimestamp = getExpirationTimestamp;
exports.transformMarketOutcomes = transformMarketOutcomes;
const node_crypto_1 = __importDefault(require("node:crypto"));
const chains_1 = require("viem/chains");
const api_1 = require("./api");
function camelToSnake(str) {
    return str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
}
function buildPolyHmacSignature(secret, timestamp, method, requestPath, body) {
    const message = `${timestamp}${method}${requestPath}${body ?? ""}`;
    const base64Secret = Buffer.from(secret, "base64");
    const hmac = node_crypto_1.default.createHmac("sha256", base64Secret);
    const signature = hmac.update(message).digest("base64");
    // Convert to URL-safe Base64
    return replaceAll(replaceAll(signature, "+", "-"), "/", "_");
}
const MSG_TO_SIGN = "This message attests that I control the given wallet";
async function buildClobEip712Signature(walletClient, timestamp, nonce) {
    const address = walletClient.getAddress();
    const domain = {
        name: "ClobAuthDomain",
        version: "1",
        chainId: walletClient.getChain().id ?? chains_1.polygon.id,
    };
    const types = {
        ClobAuth: [
            { name: "address", type: "address" },
            { name: "timestamp", type: "string" },
            { name: "nonce", type: "uint256" },
            { name: "message", type: "string" },
        ],
    };
    const message = {
        address,
        timestamp: timestamp.toString(),
        nonce,
        message: MSG_TO_SIGN,
    };
    const signature = await walletClient.signTypedData({
        domain,
        types,
        primaryType: "ClobAuth",
        message,
    });
    return signature.signature;
}
function appendSearchParams(url, parameters) {
    for (const [key, value] of Object.entries(parameters)) {
        if (value !== undefined) {
            const paramName = camelToSnake(key);
            if (Array.isArray(value)) {
                for (const val of value) {
                    url.searchParams.append(paramName, String(val));
                }
            }
            else {
                url.searchParams.append(paramName, String(value));
            }
        }
    }
}
function priceValid(price, tickSize) {
    return price >= tickSize && price <= 1 - tickSize;
}
exports.ROUNDING_CONFIG = {
    "0.1": {
        price: 1,
        size: 2,
        amount: 3,
    },
    "0.01": {
        price: 2,
        size: 2,
        amount: 4,
    },
    "0.001": {
        price: 3,
        size: 2,
        amount: 5,
    },
    "0.0001": {
        price: 4,
        size: 2,
        amount: 6,
    },
};
function getOrderRawAmounts(side, size, price, roundConfig) {
    const rawPrice = roundNormal(price, roundConfig.price);
    if (side === api_1.Side.BUY) {
        // force 2 decimals places
        const rawTakerAmt = roundDown(size, roundConfig.size);
        let rawMakerAmt = rawTakerAmt * rawPrice;
        if (decimalPlaces(rawMakerAmt) > roundConfig.amount) {
            rawMakerAmt = roundUp(rawMakerAmt, roundConfig.amount + 4);
            if (decimalPlaces(rawMakerAmt) > roundConfig.amount) {
                rawMakerAmt = roundDown(rawMakerAmt, roundConfig.amount);
            }
        }
        return {
            side: api_1.IntSide.BUY,
            rawMakerAmt,
            rawTakerAmt,
        };
    }
    const rawMakerAmt = roundDown(size, roundConfig.size);
    let rawTakerAmt = rawMakerAmt * rawPrice;
    if (decimalPlaces(rawTakerAmt) > roundConfig.amount) {
        rawTakerAmt = roundUp(rawTakerAmt, roundConfig.amount + 4);
        if (decimalPlaces(rawTakerAmt) > roundConfig.amount) {
            rawTakerAmt = roundDown(rawTakerAmt, roundConfig.amount);
        }
    }
    return {
        side: api_1.IntSide.SELL,
        rawMakerAmt,
        rawTakerAmt,
    };
}
function roundNormal(num, decimals) {
    if (decimalPlaces(num) <= decimals) {
        return num;
    }
    return Math.round((num + Number.EPSILON) * 10 ** decimals) / 10 ** decimals;
}
function roundDown(num, decimals) {
    if (decimalPlaces(num) <= decimals) {
        return num;
    }
    return Math.floor(num * 10 ** decimals) / 10 ** decimals;
}
function roundUp(num, decimals) {
    if (decimalPlaces(num) <= decimals) {
        return num;
    }
    return Math.ceil(num * 10 ** decimals) / 10 ** decimals;
}
function decimalPlaces(num) {
    if (Number.isInteger(num)) {
        return 0;
    }
    const arr = num.toString().split(".");
    if (arr.length <= 1) {
        return 0;
    }
    return arr[1].length;
}
function getExpirationTimestamp(secondsToAdd) {
    const currentUnixTimestamp = Math.floor(Date.now() / 1000);
    const newUnixTimestamp = currentUnixTimestamp + secondsToAdd;
    return newUnixTimestamp;
}
function replaceAll(str, search, replace) {
    return str.split(search).join(replace);
}
/**
 * Transforms market outcome data into a more usable format.
 * Takes a market object with separate arrays for prices, names and token IDs,
 * and combines them into a single array of outcome objects.
 * Each outcome object contains the price, name and token ID for that outcome.
 *
 * @param market - Market object containing outcomePrices, outcomes (names), and clobTokenIds arrays
 * @returns Transformed market object with combined outcomes array and other properties preserved
 */
function transformMarketOutcomes(market) {
    const outcomePrices_ = JSON.parse(market.outcomePrices);
    const outcomes_ = JSON.parse(market.outcomes);
    const clobTokenIds_ = JSON.parse(market.clobTokenIds);
    const transformedOutcomes = outcomePrices_.map((price, index) => ({
        price,
        name: outcomes_[index],
        tokenId: clobTokenIds_[index],
    }));
    const { outcomePrices, clobTokenIds, ...rest } = market;
    return {
        ...rest,
        outcomes: transformedOutcomes,
    };
}
