"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createToolParameters = createToolParameters;
function createToolParameters(schema) {
    // biome-ignore lint/complexity/noStaticOnlyClass: this is a semi-hack to get the schema into the class
    class SchemaHolder {
        static schema = schema;
    }
    return SchemaHolder;
}
