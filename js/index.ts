
const { keccak_256 } = require('js-sha3');

const isValidStarknetAddress = (address: string): boolean => {
    const regex = /^0x[a-fA-F0-9]{64}$/;
    return regex.test(address);
};

const toChecksumAddress = (address: string): string => {
    if (!isValidStarknetAddress(address)) {
        throw new Error('Invalid Starknet address');
    }

    const normalizedAddress = address.toLowerCase().replace('0x', '');
    const hash = keccak_256(normalizedAddress);

    let checksummedAddress = '0x';
    for (let i = 0; i < normalizedAddress.length; i++) {
        const char = normalizedAddress[i];
        const hashedChar = parseInt(hash[i], 16);

        if (char >= '0' && char <= '9') {
            checksummedAddress += char;
        } else if (hashedChar > 7) {
            checksummedAddress += char.toUpperCase();
        } else {
            checksummedAddress += char.toLowerCase();
        }
    }

    return checksummedAddress;
};

const verifyChecksumAddress = (address: string): boolean => {
    return address === toChecksumAddress(address);
};

// Example usage
const address = '0x0398E02FF59830718827f24e9DD1457c30C9e3F15dC6963A1D50CE1fde7fE802';
const checksummed = toChecksumAddress(address);
console.log('Checksummed address:', checksummed);
console.log('Is valid checksum:', verifyChecksumAddress(address));
