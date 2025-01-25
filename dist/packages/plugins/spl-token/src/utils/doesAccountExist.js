"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.doesAccountExist = doesAccountExist;
async function doesAccountExist(connection, address) {
    const account = await connection.getAccountInfo(address);
    return account != null;
}
