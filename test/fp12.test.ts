import * as fc from 'fast-check';
import { Arbitrary } from 'fast-check';
import { Fp, Fp12 } from '..';

type BigintTwelve = [
  bigint, bigint, bigint, bigint,
  bigint, bigint, bigint, bigint,
  bigint, bigint, bigint, bigint
];

const NUM_RUNS = Number(process.env.RUNS_COUNT || 1); // reduce to 1 to shorten test time
fc.configureGlobal({ numRuns: NUM_RUNS });
const FC_BIGINT = fc.bigInt(1n, Fp.ORDER - 1n);
const FC_BIGINT_12 = fc.array(FC_BIGINT, { minLength: 12, maxLength: 12 }) as Arbitrary<BigintTwelve>;

describe('bls12-381 Fp12', () => {

  it("frob", () => {

    let selff = Fp12.fromBigTwelve([
      0x1a0111ea397fe69a4b1ba7b6434bacd764774b84f38512bf6730d2a0f6b0f6241eabfffeb153ffffb9feffffffffaa5dn,
      0x1a0111ea397fe69a4b1ba7b6434bacd764774b84f38512bf6730d2a0f6b0f6241eabfffeb153ffffb9feffffffffaa70n,
      0x023ca1624e6b67d868054dc4171231499cf22de5bd10db1b56195183bf585a80e9e2f787859e8d26940dfa8c5877e0c8n, 
      0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000003dn,
      0x000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000043n, 
      0x000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000025n,
      0x000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000063n, 
      0x16fe92cf18d23f9af24dc4c2352f8b11c6ff72bb11ac96ea24f0efdf1ed68b214c971b0689bc6cb18b1fe427d3f153ecn,
      0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000dn, 
      0x1a0111ea397fe69a4b1ba7b6434bacd764774b84f38512bf6730d2a0f6b0f6241eabfffeb153ffffb9feffffffffaa8bn,
      0x000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000003n, 
      0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000cn,
    ]);
    
    
    let frobMap6Expected = Fp12.fromBigTwelve([
      0x1a0111ea397fe69a4b1ba7b6434bacd764774b84f38512bf6730d2a0f6b0f6241eabfffeb153ffffb9feffffffffaa5dn, 
0x1a0111ea397fe69a4b1ba7b6434bacd764774b84f38512bf6730d2a0f6b0f6241eabfffeb153ffffb9feffffffffaa70n,
0x023ca1624e6b67d868054dc4171231499cf22de5bd10db1b56195183bf585a80e9e2f787859e8d26940dfa8c5877e0c8n, 
0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000003dn,
0x000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000043n, 
0x000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000025n,
0x1a0111ea397fe69a4b1ba7b6434bacd764774b84f38512bf6730d2a0f6b0f6241eabfffeb153ffffb9feffffffffaa48n, 
0x03027f1b20ada6ff58cde2f40e1c21c59d77d8c9e1d87bd5423fe2c1d7da6b02d214e4f82797934e2edf1bd82c0e56bfn,
0x1a0111ea397fe69a4b1ba7b6434bacd764774b84f38512bf6730d2a0f6b0f6241eabfffeb153ffffb9feffffffffaa9en, 
0x000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000020n,
0x1a0111ea397fe69a4b1ba7b6434bacd764774b84f38512bf6730d2a0f6b0f6241eabfffeb153ffffb9feffffffffaaa8n, 
0x1a0111ea397fe69a4b1ba7b6434bacd764774b84f38512bf6730d2a0f6b0f6241eabfffeb153ffffb9feffffffffaa9fn
    ]);
    
    
        let frobMap6 = selff.frobeniusMap(6);
    
        expect(frobMap6.equals(frobMap6Expected)).toBe(true);
  });

  it("frobdiv", () => {


    let frobMap6Expected = Fp12.fromBigTwelve([
      0x1a0111ea397fe69a4b1ba7b6434bacd764774b84f38512bf6730d2a0f6b0f6241eabfffeb153ffffb9feffffffffaa5dn, 
0x1a0111ea397fe69a4b1ba7b6434bacd764774b84f38512bf6730d2a0f6b0f6241eabfffeb153ffffb9feffffffffaa70n,
0x023ca1624e6b67d868054dc4171231499cf22de5bd10db1b56195183bf585a80e9e2f787859e8d26940dfa8c5877e0c8n, 
0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000003dn,
0x000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000043n, 
0x000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000025n,
0x1a0111ea397fe69a4b1ba7b6434bacd764774b84f38512bf6730d2a0f6b0f6241eabfffeb153ffffb9feffffffffaa48n, 
0x03027f1b20ada6ff58cde2f40e1c21c59d77d8c9e1d87bd5423fe2c1d7da6b02d214e4f82797934e2edf1bd82c0e56bfn,
0x1a0111ea397fe69a4b1ba7b6434bacd764774b84f38512bf6730d2a0f6b0f6241eabfffeb153ffffb9feffffffffaa9en, 
0x000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000020n,
0x1a0111ea397fe69a4b1ba7b6434bacd764774b84f38512bf6730d2a0f6b0f6241eabfffeb153ffffb9feffffffffaaa8n, 
0x1a0111ea397fe69a4b1ba7b6434bacd764774b84f38512bf6730d2a0f6b0f6241eabfffeb153ffffb9feffffffffaa9fn
    ]);

let selff = Fp12.fromBigTwelve([
  0x1a0111ea397fe69a4b1ba7b6434bacd764774b84f38512bf6730d2a0f6b0f6241eabfffeb153ffffb9feffffffffaa5dn,
  0x1a0111ea397fe69a4b1ba7b6434bacd764774b84f38512bf6730d2a0f6b0f6241eabfffeb153ffffb9feffffffffaa70n,
  0x023ca1624e6b67d868054dc4171231499cf22de5bd10db1b56195183bf585a80e9e2f787859e8d26940dfa8c5877e0c8n, 
  0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000003dn,
  0x000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000043n, 
  0x000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000025n,
  0x000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000063n, 
  0x16fe92cf18d23f9af24dc4c2352f8b11c6ff72bb11ac96ea24f0efdf1ed68b214c971b0689bc6cb18b1fe427d3f153ecn,
  0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000dn, 
  0x1a0111ea397fe69a4b1ba7b6434bacd764774b84f38512bf6730d2a0f6b0f6241eabfffeb153ffffb9feffffffffaa8bn,
  0x000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000003n, 
  0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000cn,
]);

let invSelff = selff.invert();
// console.log("🐼 invSelff: " + invSelff.toString());
let expectedInverted = Fp12.fromBigTwelve([
  0x170ac059f9612f497b918f87dc15fbbca5ca218661be46b4236709617a1d3757e6d292c9b58cf250cc5a64418f050794n, 
  0x106dfbaca506cf2054700e9e0bdd4cd3881a5397b65cb3a6b80938b3425a92b576120252a18163b1d565189e88798b77n,
  0x0626566f1b4ca705c05f6d874929b34d276e42a9c842039f5c4a1a9784e1ebd5d20e60cb6de6556c0ca7d362004177dan, 
  0x0a683f25f6ad936b940c95b541b7dc751ca72e38710d2c7096fe1238ce6be372c9fb2bdfcd3ec56a6a7673bfa666567bn,
  0x16dd8323232e5879d95ecefbf85425b10e1f7188765cf0266e09fa173240fdd2a4d99e5fd9bd75e36b7f4f9bedebc93fn, 
  0x0a0b48b27e8155e174cbdffece2cbbec130852ecaa1fe731a7ba707a91c900554cca3fc8060ac48d05b0321565ad039dn,
  0x146b2b33a39d93b5a53bfb17f6ac39df43da85302fde72a548488765fe73a8607f0780e42402bcef707054f82c3f6224n, 
  0x0a3533ac89fa2556681e9bd3d082f85c67418457a205237991c49e8bc8e5d6f9403c1056e8ad47526caa0fa043894d42n,
  0x1749782bd15abd1a2d342fe46f43084be1d4d2ecd268b5d78a54fe75606bdb837fab8173a4a240988b4c91ea817f8bean, 
  0x01ac3cf3b465233faec5a446e8f6cca7108d405e419c299fd2673c390e5eb6123ece4b7e8ae2403ad4d6910422b36bc0n,
  0x0ecbc70f3a86f84ce29ce8e4bd3cbeb1fb8394f2e809b0f125419d21df10c7c262e861e81d28ae9cdfcd7f787538d95bn, 
  0x040416b5fca2a68c2573314262c9e01900563fa1133b26dbf84df15e18c5fda4e9a5c4ec4a7b1826ab03fc991e63e646n,
    ]);
expect(invSelff.equals(expectedInverted)).toBe(true);


    let frobMap6 = selff.frobeniusMap(6);

    expect(frobMap6.equals(frobMap6Expected)).toBe(true);

let frobMap6DivSelf = frobMap6.div(selff);

let expected = Fp12.fromBigTwelve([
  0x0271d279499e7b1e44e85d2597fd4f7dcbb4c0a74b9c0090acee7e2759ef93bc9cd2387a92ce336b7e4cb0b76c6052f4n,
  0x0135b3a48844bf6ebf500723a59b0b9a353e171e07996d27e23e7faffaad3adb3a2d12f95bfd3a86cffc5ceaeead3fcbn,
  0x133282f9dc4f8b48d6a7173ea1ec18fc084905dd29fe9e7454192c30130c130927fdaffd7abf7eccf8484df7b7447419n,
  0x0474948c86288780fd6a7ed541327804ad9a921881c50a4d848ffc95ee05e810c04c4f65aa449022648e62c8a452fcc5n,
  0x15f943714d951f51159bd7df183570bfb18517053a79d6c0663157ba9ef161bb5131724a0cd016a5d7cd826f898c1622n,
  0x1824ed1ea7dc25d290e28a630430c5adee4ccba2f4684c79b3b79ae2dac7ec6481e7e17b71444223d755c85ad23e3f0an,
  0x04cb3286a3da6274df1893c44da63d18607862246bb794bb35fee2909c565ffcf2daaa296016c7eb6077f3228e0687ffn,
  0x0c5834a088bfca934ba79958d471c1f6ff01ab703dbcd4a97ce8253756ce49b716870c9d1da22f09446eace17371807fn,
  0x01a5b04370943d27d36f7f37021c9257929f71f2c142ffe5ca34fcee37e167190e78cfa0a54397f84bcd7b67640351efn,
  0x0e9418e9692a9d97c0ab18736c6ad5f2f903ed4e53fc50769ec79ee1b68894149731b336b8cccbf7c1a7be56d29fa57bn,
  0x077840baee90c0c9868c7a9b8749b99beac0797d71dccf427fd3e50ddc4eb02c9185a6125f56a37396503bb9a09a6890n,
  0x0b6fedbdc34cbb5e65f5bed5782023b62b9ecc87cc434b7968e8cf4a780896dc0496d61fda499cbb3596ed433cee68a9n,

    ]);

    expect(frobMap6DivSelf.equals(expected)).toBe(true);
  });

  it("finalExp", () => {
    let a = Fp12.fromBigTwelve([
      0x1a0111ea397fe69a4b1ba7b6434bacd764774b84f38512bf6730d2a0f6b0f6241eabfffeb153ffffb9feffffffffaa5dn,
      0x1a0111ea397fe69a4b1ba7b6434bacd764774b84f38512bf6730d2a0f6b0f6241eabfffeb153ffffb9feffffffffaa70n,
      0x023ca1624e6b67d868054dc4171231499cf22de5bd10db1b56195183bf585a80e9e2f787859e8d26940dfa8c5877e0c8n, 
      0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000003dn,
      0x000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000043n, 
      0x000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000025n,
      0x000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000063n, 
      0x16fe92cf18d23f9af24dc4c2352f8b11c6ff72bb11ac96ea24f0efdf1ed68b214c971b0689bc6cb18b1fe427d3f153ecn,
      0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000dn, 
      0x1a0111ea397fe69a4b1ba7b6434bacd764774b84f38512bf6730d2a0f6b0f6241eabfffeb153ffffb9feffffffffaa8bn,
      0x000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000003n, 
      0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000cn,
    ]);
    let fe = a.finalExponentiate()
    // console.log("\n\n🎉🎉🎉🎉 fe: " + fe.toString() + "\n\n\n🎉🎉🎉🎉🎉🎉🎉🎉");
    let exp = Fp12.fromBigTwelve([
      0x0a2b7db0586728c4a9b72ef23883a1cd87d3c430babdb59e1ce2630458f4ff2e75d1b5dea63b8fd9560b0366a7fd04d3n,
      0x0b14c929e25c35a42cc1666b80bec7b9343893972cc75a1415ec77943ed5c7919d343beae8e47c44fc7f919d8da5f5bdn,
      0x05c4537782ca6495b34e45787cd6a0d3d856c819b54bbbe0dee012bfcb42b385541c61ff2b488777eb692de68ed98f5fn,
      0x19553653cb37cb1a6b0dcee63c8f9f751224e6f0e5839831f2f2f5c9fae536ca661ddd14be6a2744aa0ab3a1e2941ef7n,
      0x06e885b04abdfee78fe2705686156a3e94f2add90030a9330f7ffdb7fd6d3c5e99574f1bdb93daeed545e158d074256en,
      0x0b89b5594c50ca9222e7e03d9bf00f10c045cfffcd8cf588702d4f0294d959b8f9964690687831c4aab69a25d5e5eee4n,
      0x0bd940d17bdeff1223639b3759892b6ef76f0e5fa3d3667ff76a4d660067e6eaafd3680ef88e0703d653df7b0397f643n,
      0x067f61c9d365b7b57b666f83cf3e6e0be2d0e80909d410cd5ea7a8103a7983a81d5976bf1e4ffa0aa7b0374bc0b332e3n,
      0x0c29245f0ebfdb55c4e3cf2d46fbc85e85e65f1742c5d616e963b5e41664e74f6845d80898a2d4ce8c89945116c1f0b2n,
      0x1404750201a6cd656166462451a3212328eccfe8a08b30ddff8b82f731997388550c84b09f558898f8bd5f04a54ec7f9n,
      0x0da1fa4d23df37fa787cfb3d65af4b0419f7c9078a1cc7de751c8b6f53f156b3ca768004ea0104c05c376acd68821870n,
      0x170507dcb391b1c9fa764fd47c4159ff98898ecd7a34c61a6342ee0504382de409d53ac63f9eed4c32cf02fe27648580n,
    ]);
    expect(fe.equals(exp)).toBe(true);
  });
  
  it("cyclomaticSquare", () => {
    let a = Fp12.fromBigTwelve([
      0x1a0111ea397fe69a4b1ba7b6434bacd764774b84f38512bf6730d2a0f6b0f6241eabfffeb153ffffb9feffffffffaa5dn,
      0x1a0111ea397fe69a4b1ba7b6434bacd764774b84f38512bf6730d2a0f6b0f6241eabfffeb153ffffb9feffffffffaa70n,
      0x023ca1624e6b67d868054dc4171231499cf22de5bd10db1b56195183bf585a80e9e2f787859e8d26940dfa8c5877e0c8n, 
      0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000003dn,
      0x000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000043n, 
      0x000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000025n,
      0x000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000063n, 
      0x16fe92cf18d23f9af24dc4c2352f8b11c6ff72bb11ac96ea24f0efdf1ed68b214c971b0689bc6cb18b1fe427d3f153ecn,
      0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000dn, 
      0x1a0111ea397fe69a4b1ba7b6434bacd764774b84f38512bf6730d2a0f6b0f6241eabfffeb153ffffb9feffffffffaa8bn,
      0x000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000003n, 
      0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000cn,
    ]);
    let cyc = a.cyclotomicSquare();
    // console.log("🔮cyc: " + cyc.toString());
    let exp = Fp12.fromBigTwelve([
        0x000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001ed8n, 
        0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000588dn,
        0x0207ba9c7a2b7f9dc292d97a63bf37417618d4c905b429dfc5143af94d1baf79902c5806e85d73b5530cfab9a1fb2e10n, 
        0x067ee72fac8bab1a30bb99d7661f3986b41256679a8eb8c317ec9f9ba4e60b30cfe0b7d9edf03484600c6469c6a41719n,
        0x093eef0334059377e4fd5407be3ff6f02c9418c4a565653adb4a85d462575181a34f3fb1348f19aed6c720b2a617046fn, 
        0x0c8d8f2f27118ab59f3bdf46d5d8892937cb795ad0fbfbe7994908ddb0e395eeaba9e3e98f81cd30261b34a67b6db234n,
        0x093b4ed694d7995d866bdf3272a3faaddb3ecb22e00b25f8da9ceb5a74d1b783437bc963473239db6708266556b4d67bn, 
        0x0d4440f1bde7e5ddd27ffb0c291b567232f1608e0b988cb5ee112066d684404fbeed3bbdd14278f59932dda6c20aa147n,
        0x1a0111ea397fe69a4b1ba7b6434bacd764774b84f38512bf6730d2a0f6b0f6241eabfffeb153ffffb9feffffffff66c1n, 
        0x000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002846n,
        0x120f79a6b9194c5dacd76ed7aa016855be479f1611bc8e3e5fa212611820c2eb2f528f53043dbdd37b93257634782a6bn, 
        0x0c46b1673dcb195a56c5673832b7b33a2bb470640f7bfc41e9a4972855812633bcc472146266af2d8b77468ad16c7369n
    ]);
    expect(cyc.equals(exp)).toBe(true);
  });
  it('equality_cyon', () => {
    fc.assert(
      fc.property(FC_BIGINT_12, (num) => {
        const a = Fp12.fromBigTwelve(num);
        const b = Fp12.fromBigTwelve(num);

        console.log("a: " + a.toString())
        console.log("b: " + b.toString())
        expect(a.equals(b)).toBe(true);
        expect(b.equals(a)).toBe(true);
      })
    );
  });
  it('non-equality', () => {
    fc.assert(
      fc.property(FC_BIGINT_12, FC_BIGINT_12, (num1, num2) => {
        const a = Fp12.fromBigTwelve(num1);
        const b = Fp12.fromBigTwelve(num2);
        expect(a.equals(b)).toBe(num1[0] === num2[0] && num1[1] === num2[1]);
        expect(b.equals(a)).toBe(num1[0] === num2[0] && num1[1] === num2[1]);
      })
    );
  });
  describe('add/subtract', () => {
    it('commutativuty', () => {
      fc.assert(
        fc.property(FC_BIGINT_12, FC_BIGINT_12, (num1, num2) => {
          const a = Fp12.fromBigTwelve(num1);
          const b = Fp12.fromBigTwelve(num2);
          expect(a.add(b)).toEqual(b.add(a));
        })
      );
    });
    it('associativity', () => {
      fc.assert(
        fc.property(FC_BIGINT_12, FC_BIGINT_12, FC_BIGINT_12, (num1, num2, num3) => {
          const a = Fp12.fromBigTwelve(num1);
          const b = Fp12.fromBigTwelve(num2);
          const c = Fp12.fromBigTwelve(num3);
          expect(a.add(b.add(c))).toEqual(a.add(b).add(c));
        })
      );
    });
    it('x+0=x', () => {
      fc.assert(
        fc.property(FC_BIGINT_12, (num) => {
          const a = Fp12.fromBigTwelve(num);
          expect(a.add(Fp12.ZERO)).toEqual(a);
        })
      );
    });
    it('x-0=x', () => {
      fc.assert(
        fc.property(FC_BIGINT_12, (num) => {
          const a = Fp12.fromBigTwelve(num);
          expect(a.subtract(Fp12.ZERO)).toEqual(a);
          expect(a.subtract(a)).toEqual(Fp12.ZERO);
        })
      );
    });
    it('negate equality', () => {
      fc.assert(
        fc.property(FC_BIGINT_12, (num1) => {
          const a = Fp12.fromBigTwelve(num1);
          const b = Fp12.fromBigTwelve(num1);
          expect(Fp12.ZERO.subtract(a)).toEqual(a.negate());
          expect(a.subtract(b)).toEqual(a.add(b.negate()));
          expect(a.subtract(b)).toEqual(a.add(b.multiply(-1n)));
        })
      );
    });
    it('negate', () => {
      fc.assert(
        fc.property(FC_BIGINT_12, (num) => {
          const a = Fp12.fromBigTwelve(num);
          expect(a.negate()).toEqual(Fp12.ZERO.subtract(a));
          expect(a.negate()).toEqual(a.multiply(-1n));
        })
      );
    });
  });
  describe('multiply', () => {
    it('commutativity', () => {
      fc.assert(
        fc.property(FC_BIGINT_12, FC_BIGINT_12, (num1, num2) => {
          const a = Fp12.fromBigTwelve(num1);
          const b = Fp12.fromBigTwelve(num2);
          expect(a.multiply(b)).toEqual(b.multiply(a));
        })
      );
    });
    it('associativity', () => {
      fc.assert(
        fc.property(FC_BIGINT_12, FC_BIGINT_12, FC_BIGINT_12, (num1, num2, num3) => {
          const a = Fp12.fromBigTwelve(num1);
          const b = Fp12.fromBigTwelve(num2);
          const c = Fp12.fromBigTwelve(num3);
          expect(a.multiply(b.multiply(c))).toEqual(a.multiply(b).multiply(c));
        })
      );
    });
    it('distributivity', () => {
      fc.assert(
        fc.property(FC_BIGINT_12, FC_BIGINT_12, FC_BIGINT_12, (num1, num2, num3) => {
          const a = Fp12.fromBigTwelve(num1);
          const b = Fp12.fromBigTwelve(num2);
          const c = Fp12.fromBigTwelve(num3);
          expect(a.multiply(b.add(c))).toEqual(b.multiply(a).add(c.multiply(a)));
        })
      );
    });
    it('add equality', () => {
      fc.assert(
        fc.property(FC_BIGINT_12, (num) => {
          const a = Fp12.fromBigTwelve(num);
          expect(a.multiply(0n)).toEqual(Fp12.ZERO);
          expect(a.multiply(Fp12.ZERO)).toEqual(Fp12.ZERO);
          expect(a.multiply(1n)).toEqual(a);
          expect(a.multiply(Fp12.ONE)).toEqual(a);
          expect(a.multiply(2n)).toEqual(a.add(a));
          expect(a.multiply(3n)).toEqual(a.add(a).add(a));
          expect(a.multiply(4n)).toEqual(a.add(a).add(a).add(a));
        })
      );
    });
    it('square equality', () => {
      fc.assert(
        fc.property(FC_BIGINT_12, (num) => {
          const a = Fp12.fromBigTwelve(num);
          expect(a.square()).toEqual(a.multiply(a));
        })
      );
    });
    it('pow equality', () => {
      fc.assert(
        fc.property(FC_BIGINT_12, (num) => {
          const a = Fp12.fromBigTwelve(num);
          expect(a.pow(0n)).toEqual(Fp12.ONE);
          expect(a.pow(1n)).toEqual(a);
          expect(a.pow(2n)).toEqual(a.multiply(a));
          expect(a.pow(3n)).toEqual(a.multiply(a).multiply(a));
        })
      );
    });
  });
  describe('div', () => {
    it('x/1=x', () => {
      fc.assert(
        fc.property(FC_BIGINT_12, (num) => {
          const a = Fp12.fromBigTwelve(num);
          expect(a.div(1n)).toEqual(a);
          expect(a.div(Fp12.ONE)).toEqual(a);
          expect(a.div(a)).toEqual(Fp12.ONE);
        })
      );
    });
    it('x/0=0', () => {
      fc.assert(
        fc.property(FC_BIGINT_12, (num) => {
          const a = Fp12.fromBigTwelve(num);
          expect(Fp12.ZERO.div(a)).toEqual(Fp12.ZERO);
        })
      );
    });
    it('distributivity', () => {
      fc.assert(
        fc.property(FC_BIGINT_12, FC_BIGINT_12, FC_BIGINT_12, (num1, num2, num3) => {
          const a = Fp12.fromBigTwelve(num1);
          const b = Fp12.fromBigTwelve(num2);
          const c = Fp12.fromBigTwelve(num3);
          expect(a.add(b).div(c)).toEqual(a.div(c).add(b.div(c)));
        })
      );
    });
    it('multiply equality', () => {
      fc.assert(
        fc.property(FC_BIGINT_12, FC_BIGINT_12, (num1, num2) => {
          const a = Fp12.fromBigTwelve(num1);
          const b = Fp12.fromBigTwelve(num2);
          expect(a.div(b)).toEqual(a.multiply(b.invert()));
        })
      );
    });
  });
});
