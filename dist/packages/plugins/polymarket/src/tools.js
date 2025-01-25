"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTools = getTools;
const parameters_1 = require("./parameters");
const core_1 = require("@goat-sdk/core");
const api_1 = require("./api");
function getTools(walletClient, { credentials }) {
    return [
        (0, core_1.createTool)({
            name: "get_polymarket_events",
            description: "Get the events on Polymarket, including their markets, with optional filters",
            parameters: parameters_1.getEventsParametersSchema,
        }, (parameters) => (0, api_1.getEvents)(parameters)),
        (0, core_1.createTool)({
            name: "get_polymarket_market_info",
            description: "Get the info of a specific market on Polymarket",
            parameters: parameters_1.getMarketInfoParametersSchema,
        }, (parameters) => (0, api_1.getMarketInfo)(walletClient, parameters)),
        (0, core_1.createTool)({
            name: "create_order_on_polymarket",
            description: "Create an order on Polymarket",
            parameters: parameters_1.createOrderParametersSchema,
        }, (parameters) => (0, api_1.createOrder)(walletClient, credentials, parameters)),
        (0, core_1.createTool)({
            name: "get_active_polymarket_orders",
            description: "Get the active orders on Polymarket",
            parameters: parameters_1.getOpenOrdersParametersSchema,
        }, (parameters) => (0, api_1.getOpenOrders)(walletClient, credentials, parameters)),
        (0, core_1.createTool)({
            name: "cancel_polymarket_order",
            description: "Cancel an order on Polymarket",
            parameters: parameters_1.cancelOrderParametersSchema,
        }, (parameters) => (0, api_1.cancelOrder)(walletClient, credentials, parameters)),
        (0, core_1.createTool)({
            name: "cancel_all_polymarket_orders",
            description: "Cancel all orders on Polymarket",
            parameters: parameters_1.cancelAllOrdersParametersSchema,
        }, (_parameters) => (0, api_1.cancelAllOrders)(walletClient, credentials)),
    ];
}
