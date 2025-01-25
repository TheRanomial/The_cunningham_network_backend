"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlloraAPIClient = exports.AlloraPricePredictionSignatureFormat = exports.AlloraPricePredictionTimeframe = exports.AlloraPricePredictionToken = void 0;
const axios_1 = __importDefault(require("axios"));
var AlloraPricePredictionToken;
(function (AlloraPricePredictionToken) {
    AlloraPricePredictionToken["BTC"] = "BTC";
    AlloraPricePredictionToken["ETH"] = "ETH";
})(AlloraPricePredictionToken || (exports.AlloraPricePredictionToken = AlloraPricePredictionToken = {}));
var AlloraPricePredictionTimeframe;
(function (AlloraPricePredictionTimeframe) {
    AlloraPricePredictionTimeframe["5m"] = "5m";
    AlloraPricePredictionTimeframe["8h"] = "8h";
})(AlloraPricePredictionTimeframe || (exports.AlloraPricePredictionTimeframe = AlloraPricePredictionTimeframe = {}));
var AlloraPricePredictionSignatureFormat;
(function (AlloraPricePredictionSignatureFormat) {
    AlloraPricePredictionSignatureFormat["EthereumSepolia"] = "ethereum-11155111";
})(AlloraPricePredictionSignatureFormat || (exports.AlloraPricePredictionSignatureFormat = AlloraPricePredictionSignatureFormat = {}));
class AlloraAPIClient {
    apiKey;
    apiRoot;
    constructor(opts) {
        this.apiKey = opts.apiKey;
        const apiRoot = opts.apiRoot || "https://api.upshot.xyz/v2/allora";
        this.apiRoot = apiRoot[apiRoot.length - 1] === "/" ? apiRoot.slice(0, apiRoot.length - 1) : apiRoot;
    }
    async fetchAlloraPricePrediction(asset, timeframe, signatureFormat = AlloraPricePredictionSignatureFormat.EthereumSepolia) {
        const url = `consumer/price/${signatureFormat}/${asset}/${timeframe}`;
        const resp = await this.fetchAlloraAPIData(url);
        if (!resp?.data?.inference_data) {
            throw new Error(`API response missing data: ${JSON.stringify(resp)}`);
        }
        return resp.data.inference_data;
    }
    async fetchAlloraAPIData(endpoint) {
        const cleanEndpoint = endpoint[0] === "/" ? endpoint.slice(1) : endpoint;
        const url = `${this.apiRoot}/${cleanEndpoint}`;
        const headers = {
            "Content-Type": "application/json",
            Accept: "application/json",
        };
        if (this.apiKey) {
            headers["x-api-key"] = this.apiKey;
        }
        const response = await axios_1.default.get(url, { headers });
        if (response.status >= 400) {
            throw new Error(`Allora plugin: error requesting price prediction: url=${url} status=${response.status} body=${JSON.stringify(response.data, null, 4)}`);
        }
        return response.data;
    }
}
exports.AlloraAPIClient = AlloraAPIClient;
