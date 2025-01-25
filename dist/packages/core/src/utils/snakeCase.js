"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.snakeCase = snakeCase;
function snakeCase(str) {
    return str.replace(/([a-z])([A-Z])/g, "$1_$2").toLowerCase();
}
