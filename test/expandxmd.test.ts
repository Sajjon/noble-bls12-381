import { bigInt } from 'fast-check';
import { expand_message_xmd, hash_to_field, hexToBytes, stringToBytes, bytesToHex } from '..';

describe('expand', () => {
    // it('vector 0', async () => {
    //     const dstString = "QUUX-V01-CS02-with-expander-SHA256-128-long-DST-1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111";
    //     const dst = stringToBytes(dstString);
    //     const length = 32
    //     const message = hexToBytes("61626364656630313233343536373839"); // "abcdef0123456789"
    //     expect(bytesToHex(stringToBytes("abcdef0123456789"))).toMatch("61626364656630313233343536373839");
    //     const expanded = await expand_message_xmd(message, dst, length);
    //     const expectedAsHex = "35387dcf22618f3728e6c686490f8b431f76550b0b2c61cbc1ce7001536f4521";
    //     console.log("expanded to: " + bytesToHex(expanded));
    //     expect(bytesToHex(expanded)).toMatch(expectedAsHex);
    //   });
      it('has working hash_to_field', async () => {
            const dstString = "QUUX-V01-CS02-with-BLS12381G2_XMD:SHA-256_SSWU_RO_";
            console.log("Expected DST bytes: " + bytesToHex(stringToBytes(dstString)));
            console.log("DST that seems to be used: " + hexToBytes("424c535f5349475f424c53313233383147325f584d443a5348412d3235365f535357555f524f5f4e554c5f"))
            const message = stringToBytes("abcdef0123456789");
            
            const u = await hash_to_field(message, 2, { DST: dstString })
            console.log("got u: ");
            const uMapped = u.map((is: BigInt[]) => { is.map((i) => { const ut = i.toString(16); console.log(ut); return ut; }) });
            
            console.log("expected u: " + expected.toString());
      });
});

let expected =  [
    [
        "0x0313d9325081b415bfd4e5364efaef392ecf69b087496973b229303e1816d2080971470f7da112c4eb43053130b785e1",
        "0x062f84cb21ed89406890c051a0e8b9cf6c575cf6e8e18ecf63ba86826b0ae02548d83b483b79e48512b82a6c0686df8f"
    ],
    [
        "0x1739123845406baa7be5c5dc74492051b6d42504de008c635f3535bb831d478a341420e67dcc7b46b2e8cba5379cca97",
        "0x01897665d9cb5db16a27657760bbea7951f67ad68f8d55f7113f24ba6ddd82caef240a9bfa627972279974894701d975"
    ]
];