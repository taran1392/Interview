

const IP_CHUNK_REGEX = /^(?:25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])$/;


function ipv4ToInt(ip) {
    if(typeof ip !== 'string') {
        throw new TypeError('ip should be a string');
    }
    const IpChunks = ip.split('.');
    
    if (IpChunks.length !== 4 || !IpChunks.every(chunk => IP_CHUNK_REGEX.test(chunk))) {
        throw new Error('Invalid IPv4 address');
    }
    // Arithmetic preserves the unsigned 32-bit range without signed shifts.
    return IpChunks.reduce((acc, octet) => acc * 256 + Number(octet), 0);
}



module.exports = { ipv4ToInt };