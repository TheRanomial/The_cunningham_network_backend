"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAlloraPricePredictionParameters = void 0;
const core_1 = require("@goat-sdk/core");
const zod_1 = require("zod");
class GetAlloraPricePredictionParameters extends (0, core_1.createToolParameters)(zod_1.z.object({
    ticker: zod_1.z.enum(["BTC", "ETH"]).describe("The ticker of the currency for which to fetch a price prediction."),
    timeframe: zod_1.z.enum(["5m", "8h"]).describe('The timeframe for the prediction (currently, either "5m" or "8h").'),
})) {
}
exports.GetAlloraPricePredictionParameters = GetAlloraPricePredictionParameters;
