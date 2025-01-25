"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toolMetadataKey = void 0;
exports.Tool = Tool;
const classes_1 = require("../classes");
const snakeCase_1 = require("../utils/snakeCase");
require("reflect-metadata");
exports.toolMetadataKey = Symbol("goat:tool");
/**
 * Decorator that marks a class method as a tool accessible to the LLM
 * @param params - Configuration parameters for the tool
 * @returns A decorator function that can be applied to class methods
 *
 * @example
 * class MyToolService {
 *     \@Tool({
 *         description: "Adds two numbers",
 *     })
 *     add({a, b}: AddParameters) {
 *         return a + b;
 *     }
 *}
 */
function Tool(params) {
    // biome-ignore lint/complexity/noBannedTypes: Object is the correct type for a class method
    return (target, propertyKey, descriptor) => {
        const { parameters, walletClient } = validateMethodParameters(target, propertyKey);
        const existingTools = Reflect.getMetadata(exports.toolMetadataKey, target.constructor) || new Map();
        existingTools.set(propertyKey, {
            target: descriptor.value,
            name: params.name ?? (0, snakeCase_1.snakeCase)(propertyKey),
            description: params.description,
            parameters: parameters,
            ...(walletClient ? { walletClient } : {}),
        });
        Reflect.defineMetadata(exports.toolMetadataKey, existingTools, target.constructor);
        return target;
    };
}
function validateMethodParameters(
// biome-ignore lint/complexity/noBannedTypes: Object is the correct type for a class method
target, propertyKey) {
    const className = target instanceof Object ? target.constructor.name : undefined;
    const logPrefix = `Method '${propertyKey}'${className ? ` on class '${className}'` : ""}`;
    const explainer = "Tool methods must have at least one parameter that is a Zod schema class created with the createToolParameters function.";
    const methodParameters = Reflect.getMetadata("design:paramtypes", target, propertyKey);
    if (methodParameters == null) {
        throw new Error(`Failed to get parameters for ${logPrefix}.`);
    }
    if (methodParameters.length === 0) {
        throw new Error(`${logPrefix} has no parameters. ${explainer}`);
    }
    if (methodParameters.length > 2) {
        throw new Error(`${logPrefix} has ${methodParameters.length} parameters. ${explainer}`);
    }
    const parametersParameter = methodParameters.find(isParametersParameter);
    if (parametersParameter == null) {
        throw new Error(`${logPrefix} has no parameters parameter.\n\n1.) ${explainer}\n\n2.) Ensure that you are not using 'import type' for the parameters.`);
    }
    const walletClientParameter = methodParameters.find(isWalletClientParameter);
    return {
        parameters: {
            index: methodParameters.indexOf(parametersParameter),
            schema: parametersParameter.prototype.constructor.schema,
        },
        ...(walletClientParameter
            ? { walletClient: { index: methodParameters.indexOf(walletClientParameter) } }
            : {}),
    };
}
// biome-ignore lint/suspicious/noExplicitAny: <explanation>
function isWalletClientParameter(param) {
    if (!param || !param.prototype) {
        return false;
    }
    if (param === classes_1.WalletClientBase) {
        return true;
    }
    return param.prototype instanceof classes_1.WalletClientBase;
}
// biome-ignore lint/suspicious/noExplicitAny: <explanation>
function isParametersParameter(param) {
    return param.prototype?.constructor?.schema != null;
}
