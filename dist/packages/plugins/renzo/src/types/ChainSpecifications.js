"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRenzoAddresses = getRenzoAddresses;
const chains_1 = require("viem/chains");
const chainSpecifications = {
    [chains_1.mode.id]: {
        renzoDepositAddress: "0x4D7572040B84b41a6AA2efE4A93eFFF182388F88",
        l2EzEthAddress: "0x2416092f143378750bb29b79eD961ab195CcEea5",
    },
    [chains_1.base.id]: {
        renzoDepositAddress: "0xf25484650484de3d554fb0b7125e7696efa4ab99",
        l2EzEthAddress: "0x2416092f143378750bb29b79eD961ab195CcEea5",
    },
    [chains_1.arbitrum.id]: {
        renzoDepositAddress: "0xf25484650484de3d554fb0b7125e7696efa4ab99",
        l2EzEthAddress: "0x2416092f143378750bb29b79eD961ab195CcEea5",
    },
    [chains_1.bsc.id]: {
        renzoDepositAddress: "0xf25484650484de3d554fb0b7125e7696efa4ab99",
        l2EzEthAddress: "0x2416092f143378750bb29b79eD961ab195CcEea5",
    },
    [chains_1.linea.id]: {
        renzoDepositAddress: "0x4D7572040B84b41a6AA2efE4A93eFFF182388F88",
        l2EzEthAddress: "0x2416092f143378750bb29b79eD961ab195CcEea5",
    },
};
function getRenzoAddresses(chainId) {
    const chainSpec = chainSpecifications[chainId];
    if (!chainSpec) {
        throw new Error(`Chain ID ${chainId} not supported`);
    }
    return {
        renzoDepositAddress: chainSpec.renzoDepositAddress,
        l2EzEthAddress: chainSpec.l2EzEthAddress,
    };
}
