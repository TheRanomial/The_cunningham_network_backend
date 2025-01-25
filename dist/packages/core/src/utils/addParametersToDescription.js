"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addParametersToDescription = addParametersToDescription;
function addParametersToDescription(description, schema) {
    let paramLines = [];
    if (schema._def?.typeName === "ZodObject") {
        const shape = schema._def.shape();
        if (shape) {
            paramLines = Object.entries(shape).map(([key, value]) => {
                const isOptional = value.isOptional();
                const paramDescription = value.description || "";
                const typeStr = getTypeString(value);
                return `- ${key}${isOptional ? " (optional)" : ""} (${typeStr}): ${paramDescription}`;
            });
        }
    }
    return `${description}\n${paramLines.join("\n")}`;
}
function getTypeString(schema) {
    const typeName = schema._def?.typeName;
    switch (typeName) {
        case "ZodOptional":
            return getTypeString(schema.unwrap());
        case "ZodString":
            return "string";
        case "ZodNumber":
            return "number";
        case "ZodBoolean":
            return "boolean";
        case "ZodArray":
            return "array";
        case "ZodObject":
            return "object";
        default:
            return "unknown";
    }
}
