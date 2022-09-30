import { bigInt } from 'fast-check';
import { expand_message_xmd, Fp12, PointG2, hexToBytes, stringToBytes, bytesToHex, Fp2 } from '..';

describe('hashToCurve', () => {

      it('has working hash_to_cruve', async () => {
			const vector = testSuite.vectors[1]
        	const message = stringToBytes(vector.msg);
			
            console.log("JSON expected.p: " + JSON.stringify(vector.P, null, 4));
            console.log("JSON expected.Q0: " + JSON.stringify(vector.Q0, null, 4));
            console.log("JSON expected.Q1: " + JSON.stringify(vector.Q1, null, 4));
			const expectedPoints = g2PointsOfVector(vector);
			console.log("expected.p: " + expectedPoints.P);
			console.log("expected.Q0: " + expectedPoints.Q0);
			console.log("expected.Q1: " + expectedPoints.Q1);
			
            const result = await PointG2.hashToCurve(message, { DST: testSuite.dst });
            console.log("result.toString(affine: false): + " + result.toString());
            console.log("result.toString(affine: true): + " + result.toString(true));

            expect(result.equals(expectedPoints.P)).toBe(true);
      });
});

type SimpleAffine = { x: string, y: string }

export function fp2FromString(xyString: string): Fp2 {
	const xyComp = xyString.split(',')
	if (xyComp.length !== 2) {
		throw new Error("Bad length");
	}
	const bigInts = xyComp.map((s) => { return BigInt(s) });
	return Fp2.fromBigTuple(bigInts);
}

export function g2PointFromSimpleAffine(simpleAffine: SimpleAffine): PointG2 {
	return new PointG2(fp2FromString(simpleAffine.x), fp2FromString(simpleAffine.y));
}

export function g2PointsOfVector(vector: { P: SimpleAffine, Q0: SimpleAffine, Q1: SimpleAffine }): { P: PointG2, Q0: PointG2, Q1: PointG2 } {
	return {
		P: g2PointFromSimpleAffine(vector.P),
		Q0: g2PointFromSimpleAffine(vector.Q0),
		Q1: g2PointFromSimpleAffine(vector.Q1),
	};
}

const testSuite = {
  "L": "0x40",
  "Z": "0x1a0111ea397fe69a4b1ba7b6434bacd764774b84f38512bf6730d2a0f6b0f6241eabfffeb153ffffb9feffffffffaaa9,0x1a0111ea397fe69a4b1ba7b6434bacd764774b84f38512bf6730d2a0f6b0f6241eabfffeb153ffffb9feffffffffaaaa",
  "ciphersuite": "BLS12381G2_XMD:SHA-256_SSWU_RO_",
  "curve": "BLS12-381 G2",
  "dst": "QUUX-V01-CS02-with-BLS12381G2_XMD:SHA-256_SSWU_RO_",
  "expand": "XMD",
  "field": {
    "m": "0x2",
    "p": "0x1a0111ea397fe69a4b1ba7b6434bacd764774b84f38512bf6730d2a0f6b0f6241eabfffeb153ffffb9feffffffffaaab"
  },
  "hash": "sha256",
  "k": "0x80",
  "map": {
    "name": "SSWU"
  },
  "randomOracle": true,
  "vectors": [
    {
      "P": {
        "x": "0x0141ebfbdca40eb85b87142e130ab689c673cf60f1a3e98d69335266f30d9b8d4ac44c1038e9dcdd5393faf5c41fb78a,0x05cb8437535e20ecffaef7752baddf98034139c38452458baeefab379ba13dff5bf5dd71b72418717047f5b0f37da03d",
        "y": "0x0503921d7f6a12805e72940b963c0cf3471c7b2a524950ca195d11062ee75ec076daf2d4bc358c4b190c0c98064fdd92,0x12424ac32561493f3fe3c260708a12b7c620e7be00099a974e259ddc7d1f6395c3c811cdd19f1e8dbf3e9ecfdcbab8d6"
      },
      "Q0": {
        "x": "0x019ad3fc9c72425a998d7ab1ea0e646a1f6093444fc6965f1cad5a3195a7b1e099c050d57f45e3fa191cc6d75ed7458c,0x171c88b0b0efb5eb2b88913a9e74fe111a4f68867b59db252ce5868af4d1254bfab77ebde5d61cd1a86fb2fe4a5a1c1d",
        "y": "0x0ba10604e62bdd9eeeb4156652066167b72c8d743b050fb4c1016c31b505129374f76e03fa127d6a156213576910fef3,0x0eb22c7a543d3d376e9716a49b72e79a89c9bfe9feee8533ed931cbb5373dde1fbcd7411d8052e02693654f71e15410a"
      },
      "Q1": {
        "x": "0x113d2b9cd4bd98aee53470b27abc658d91b47a78a51584f3d4b950677cfb8a3e99c24222c406128c91296ef6b45608be,0x13855912321c5cb793e9d1e88f6f8d342d49c0b0dbac613ee9e17e3c0b3c97dfbb5a49cc3fb45102fdbaf65e0efe2632",
        "y": "0x0fd3def0b7574a1d801be44fde617162aa2e89da47f464317d9bb5abc3a7071763ce74180883ad7ad9a723a9afafcdca,0x056f617902b3c0d0f78a9a8cbda43a26b65f602f8786540b9469b060db7b38417915b413ca65f875c130bebfaa59790c"
      },
      "msg": "",
      "u": [
        "0x03dbc2cce174e91ba93cbb08f26b917f98194a2ea08d1cce75b2b9cc9f21689d80bd79b594a613d0a68eb807dfdc1cf8,0x05a2acec64114845711a54199ea339abd125ba38253b70a92c876df10598bd1986b739cad67961eb94f7076511b3b39a",
        "0x02f99798e8a5acdeed60d7e18e9120521ba1f47ec090984662846bc825de191b5b7641148c0dbc237726a334473eee94,0x145a81e418d4010cc027a68f14391b30074e89e60ee7a22f87217b2f6eb0c4b94c9115b436e6fa4607e95a98de30a435"
      ]
    },
    {
      "P": {
        "x": "0x02c2d18e033b960562aae3cab37a27ce00d80ccd5ba4b7fe0e7a210245129dbec7780ccc7954725f4168aff2787776e6,0x139cddbccdc5e91b9623efd38c49f81a6f83f175e80b06fc374de9eb4b41dfe4ca3a230ed250fbe3a2acf73a41177fd8",
        "y": "0x1787327b68159716a37440985269cf584bcb1e621d3a7202be6ea05c4cfe244aeb197642555a0645fb87bf7466b2ba48,0x00aa65dae3c8d732d10ecd2c50f8a1baf3001578f71c694e03866e9f3d49ac1e1ce70dd94a733534f106d4cec0eddd16"
      },
      "Q0": {
        "x": "0x12b2e525281b5f4d2276954e84ac4f42cf4e13b6ac4228624e17760faf94ce5706d53f0ca1952f1c5ef75239aeed55ad,0x05d8a724db78e570e34100c0bc4a5fa84ad5839359b40398151f37cff5a51de945c563463c9efbdda569850ee5a53e77",
        "y": "0x02eacdc556d0bdb5d18d22f23dcb086dd106cad713777c7e6407943edbe0b3d1efe391eedf11e977fac55f9b94f2489c,0x04bbe48bfd5814648d0b9e30f0717b34015d45a861425fabc1ee06fdfce36384ae2c808185e693ae97dcde118f34de41"
      },
      "Q1": {
        "x": "0x19f18cc5ec0c2f055e47c802acc3b0e40c337256a208001dde14b25afced146f37ea3d3ce16834c78175b3ed61f3c537,0x15b0dadc256a258b4c68ea43605dffa6d312eef215c19e6474b3e101d33b661dfee43b51abbf96fee68fc6043ac56a58",
        "y": "0x05e47c1781286e61c7ade887512bd9c2cb9f640d3be9cf87ea0bad24bd0ebfe946497b48a581ab6c7d4ca74b5147287f,0x19f98db2f4a1fcdf56a9ced7b320ea9deecf57c8e59236b0dc21f6ee7229aa9705ce9ac7fe7a31c72edca0d92370c096"
      },
      "msg": "abc",
      "u": [
        "0x15f7c0aa8f6b296ab5ff9c2c7581ade64f4ee6f1bf18f55179ff44a2cf355fa53dd2a2158c5ecb17d7c52f63e7195771,0x01c8067bf4c0ba709aa8b9abc3d1cef589a4758e09ef53732d670fd8739a7274e111ba2fcaa71b3d33df2a3a0c8529dd",
        "0x187111d5e088b6b9acfdfad078c4dacf72dcd17ca17c82be35e79f8c372a693f60a033b461d81b025864a0ad051a06e4,0x08b852331c96ed983e497ebc6dee9b75e373d923b729194af8e72a051ea586f3538a6ebb1e80881a082fa2b24df9f566"
      ]
    },
    {
      "P": {
        "x": "0x121982811d2491fde9ba7ed31ef9ca474f0e1501297f68c298e9f4c0028add35aea8bb83d53c08cfc007c1e005723cd0,0x190d119345b94fbd15497bcba94ecf7db2cbfd1e1fe7da034d26cbba169fb3968288b3fafb265f9ebd380512a71c3f2c",
        "y": "0x05571a0f8d3c08d094576981f4a3b8eda0a8e771fcdcc8ecceaf1356a6acf17574518acb506e435b639353c2e14827c8,0x0bb5e7572275c567462d91807de765611490205a941a5a6af3b1691bfe596c31225d3aabdf15faff860cb4ef17c7c3be"
      },
      "Q0": {
        "x": "0x0f48f1ea1318ddb713697708f7327781fb39718971d72a9245b9731faaca4dbaa7cca433d6c434a820c28b18e20ea208,0x06051467c8f85da5ba2540974758f7a1e0239a5981de441fdd87680a995649c211054869c50edbac1f3a86c561ba3162",
        "y": "0x168b3d6df80069dbbedb714d41b32961ad064c227355e1ce5fac8e105de5e49d77f0c64867f3834848f152497eb76333,0x134e0e8331cee8cb12f9c2d0742714ed9eee78a84d634c9a95f6a7391b37125ed48bfc6e90bf3546e99930ff67cc97bc"
      },
      "Q1": {
        "x": "0x004fd03968cd1c99a0dd84551f44c206c84dcbdb78076c5bfee24e89a92c8508b52b88b68a92258403cbe1ea2da3495f,0x1674338ea298281b636b2eb0fe593008d03171195fd6dcd4531e8a1ed1f02a72da238a17a635de307d7d24aa2d969a47",
        "y": "0x0dc7fa13fff6b12558419e0a1e94bfc3cfaf67238009991c5f24ee94b632c3d09e27eca329989aee348a67b50d5e236c,0x169585e164c131103d85324f2d7747b23b91d66ae5d947c449c8194a347969fc6bbd967729768da485ba71868df8aed2"
      },
      "msg": "abcdef0123456789",
      "u": [
        "0x0313d9325081b415bfd4e5364efaef392ecf69b087496973b229303e1816d2080971470f7da112c4eb43053130b785e1,0x062f84cb21ed89406890c051a0e8b9cf6c575cf6e8e18ecf63ba86826b0ae02548d83b483b79e48512b82a6c0686df8f",
        "0x1739123845406baa7be5c5dc74492051b6d42504de008c635f3535bb831d478a341420e67dcc7b46b2e8cba5379cca97,0x01897665d9cb5db16a27657760bbea7951f67ad68f8d55f7113f24ba6ddd82caef240a9bfa627972279974894701d975"
      ]
    },
    {
      "P": {
        "x": "0x19a84dd7248a1066f737cc34502ee5555bd3c19f2ecdb3c7d9e24dc65d4e25e50d83f0f77105e955d78f4762d33c17da,0x0934aba516a52d8ae479939a91998299c76d39cc0c035cd18813bec433f587e2d7a4fef038260eef0cef4d02aae3eb91",
        "y": "0x14f81cd421617428bc3b9fe25afbb751d934a00493524bc4e065635b0555084dd54679df1536101b2c979c0152d09192,0x09bcccfa036b4847c9950780733633f13619994394c23ff0b32fa6b795844f4a0673e20282d07bc69641cee04f5e5662"
      },
      "Q0": {
        "x": "0x09eccbc53df677f0e5814e3f86e41e146422834854a224bf5a83a50e4cc0a77bfc56718e8166ad180f53526ea9194b57,0x0c3633943f91daee715277bd644fba585168a72f96ded64fc5a384cce4ec884a4c3c30f08e09cd2129335dc8f67840ec",
        "y": "0x0eb6186a0457d5b12d132902d4468bfeb7315d83320b6c32f1c875f344efcba979952b4aa418589cb01af712f98cc555,0x119e3cf167e69eb16c1c7830e8df88856d48be12e3ff0a40791a5cd2f7221311d4bf13b1847f371f467357b3f3c0b4c7"
      },
      "Q1": {
        "x": "0x0eb3aabc1ddfce17ff18455fcc7167d15ce6b60ddc9eb9b59f8d40ab49420d35558686293d046fc1e42f864b7f60e381,0x198bdfb19d7441ebcca61e8ff774b29d17da16547d2c10c273227a635cacea3f16826322ae85717630f0867539b5ed8b",
        "y": "0x0aaf1dee3adf3ed4c80e481c09b57ea4c705e1b8d25b897f0ceeec3990748716575f92abff22a1c8f4582aff7b872d52,0x0d058d9061ed27d4259848a06c96c5ca68921a5d269b078650c882cb3c2bd424a8702b7a6ee4e0ead9982baf6843e924"
      },
      "msg": "q128_qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq",
      "u": [
        "0x025820cefc7d06fd38de7d8e370e0da8a52498be9b53cba9927b2ef5c6de1e12e12f188bbc7bc923864883c57e49e253,0x034147b77ce337a52e5948f66db0bab47a8d038e712123bb381899b6ab5ad20f02805601e6104c29df18c254b8618c7b",
        "0x0930315cae1f9a6017c3f0c8f2314baa130e1cf13f6532bff0a8a1790cd70af918088c3db94bda214e896e1543629795,0x10c4df2cacf67ea3cb3108b00d4cbd0b3968031ebc8eac4b1ebcefe84d6b715fde66bef0219951ece29d1facc8a520ef"
      ]
    },
    {
      "P": {
        "x": "0x01a6ba2f9a11fa5598b2d8ace0fbe0a0eacb65deceb476fbbcb64fd24557c2f4b18ecfc5663e54ae16a84f5ab7f62534,0x11fca2ff525572795a801eed17eb12785887c7b63fb77a42be46ce4a34131d71f7a73e95fee3f812aea3de78b4d01569",
        "y": "0x0b6798718c8aed24bc19cb27f866f1c9effcdbf92397ad6448b5c9db90d2b9da6cbabf48adc1adf59a1a28344e79d57e,0x03a47f8e6d1763ba0cad63d6114c0accbef65707825a511b251a660a9b3994249ae4e63fac38b23da0c398689ee2ab52"
      },
      "Q0": {
        "x": "0x17cadf8d04a1a170f8347d42856526a24cc466cb2ddfd506cff01191666b7f944e31244d662c904de5440516a2b09004,0x0d13ba91f2a8b0051cf3279ea0ee63a9f19bc9cb8bfcc7d78b3cbd8cc4fc43ba726774b28038213acf2b0095391c523e",
        "y": "0x17ef19497d6d9246fa94d35575c0f8d06ee02f21a284dbeaa78768cb1e25abd564e3381de87bda26acd04f41181610c5,0x12c3c913ba4ed03c24f0721a81a6be7430f2971ffca8fd1729aafe496bb725807531b44b34b59b3ae5495e5a2dcbd5c8"
      },
      "Q1": {
        "x": "0x16ec57b7fe04c71dfe34fb5ad84dbce5a2dbbd6ee085f1d8cd17f45e8868976fc3c51ad9eeda682c7869024d24579bfd,0x13103f7aace1ae1420d208a537f7d3a9679c287208026e4e3439ab8cd534c12856284d95e27f5e1f33eec2ce656533b0",
        "y": "0x0958b2c4c2c10fcef5a6c59b9e92c4a67b0fae3e2e0f1b6b5edad9c940b8f3524ba9ebbc3f2ceb3cfe377655b3163bd7,0x0ccb594ed8bd14ca64ed9cb4e0aba221be540f25dd0d6ba15a4a4be5d67bcf35df7853b2d8dad3ba245f1ea3697f66aa"
      },
      "msg": "a512_aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "u": [
        "0x190b513da3e66fc9a3587b78c76d1d132b1152174d0b83e3c1114066392579a45824c5fa17649ab89299ddd4bda54935,0x12ab625b0fe0ebd1367fe9fac57bb1168891846039b4216b9d94007b674de2d79126870e88aeef54b2ec717a887dcf39",
        "0x0e6a42010cf435fb5bacc156a585e1ea3294cc81d0ceb81924d95040298380b164f702275892cedd81b62de3aba3f6b5,0x117d9a0defc57a33ed208428cb84e54c85a6840e7648480ae428838989d25d97a0af8e3255be62b25c2a85630d2dddd8"
      ]
    }
  ]
}
