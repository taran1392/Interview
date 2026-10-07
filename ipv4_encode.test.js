const { test } = require('node:test');
const assert = require('node:assert/strict');

const { ipv4ToInt } = require('./ipv4_encode.js');


const validIps = [
    ['0.0.0.0', 0],
    ['0.0.0.1', 1],
    ['0.0.1.0', 256],
    ['0.1.0.0', 65536],
    ['1.0.0.0', 16777216],
    ['1.2.3.4', 16909060],
    ['127.255.255.255', 2147483647],
    ['128.0.0.0', 2147483648],
    ['192.168.0.1', 3232235521],
    ['192.168.1.1', 3232235777],
    
    ['255.255.255.255', 4294967295],
];

for (const [ip, expected] of validIps) {
    test(`converts ${ip} to ${expected}`, () => {
        assert.equal(ipv4ToInt(ip), expected);
    });
}

const invalidIps = [
  '1.2.3.4 ', ' 1.2.3.4', '1.2.3.4\n', '1. 2.3.4',
  '+1.2.3.4', '-1.2.3.4', '1.2.3.4abc', '0x1.0x2.0x3.0x4',
  '1e1.2.3.4', '1,2,3,4', '1.2.3.4.', '..', '...', '1.2.3.-4',
  '１.２.３.４', '192.168.001.001',
  '', '1.2.3', '1.2.3.4.5', '256.0.0.1', '1.256.0.1',
  '1.2.256.1', '1.2.3.256', '999.0.0.1', '01.2.3.4',
  '1a2b3c4', '1.2.3.4\r', '1.2.3.4\r\n', '1.2.3.4\t',
  '\n1.2.3.4', '1.2.3.4\u2028', '1.2.3.4\u2029',
];

for (const ip of invalidIps) {
    test(`rejects ${JSON.stringify(ip)}`, () => {
        assert.throws(() => ipv4ToInt(ip), {
            name: 'Error',
            message: 'Invalid IPv4 address',
        });
    });
}

const invalidTypes = [
    undefined, null, 0, 3232235521, true, {}, [],
    ['1.2.3.4'], new String('1.2.3.4'), Symbol('ip'), 1n,
    { toString: () => '1.2.3.4' },
];

for (const [index, value] of invalidTypes.entries()) {
    test(`rejects non-string input #${index + 1}`, () => {
        assert.throws(() => ipv4ToInt(value), {
            name: 'TypeError',
            message: 'ip should be a string',
        });
    });
}
