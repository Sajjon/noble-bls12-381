import * as fc from 'fast-check';
import { Fp, Fp2, PointG1, PointG2 } from '..';
import { CURVE } from '../math';

const NUM_RUNS = Number(process.env.RUNS_COUNT || 1); // reduce to 1 to shorten test time
const FC_BIGINT = fc.bigInt(1n, Fp.ORDER - 1n);

describe('bls12-381 Point', () => {
  describe('Point with Fp coordinates', () => {
    it('Point equality', () => {
      fc.assert(
        fc.property(
          fc.array(FC_BIGINT, { minLength: 3, maxLength: 3 }),
          fc.array(FC_BIGINT, { minLength: 3, maxLength: 3 }),
          ([x1, y1, z1], [x2, y2, z2]) => {
            const p1 = new PointG1(new Fp(x1), new Fp(y1), new Fp(z1));
            const p2 = new PointG1(new Fp(x2), new Fp(y2), new Fp(z2));
            expect(p1.equals(p1)).toBe(true);
            expect(p2.equals(p2)).toBe(true);
            expect(p1.equals(p2)).toBe(false);
            expect(p2.equals(p1)).toBe(false);
          }
        ),
        {
          numRuns: NUM_RUNS,
        }
      );
    });
    it('should be placed on curve vector 1', () => {
      const a = new PointG1(new Fp(0n), new Fp(1n), new Fp(0n));
      a.assertValidity();
    });

    it("point * 5", () => {
      const a = new PointG1(
        new Fp(
          0x17f1d3a73197d7942695638c4fa9ac0fc3688c4f9774b905a14e3a3f171bac586c55e83ff97a1aeffb3af00adb22c6bbn
        ),
        new Fp(
          0x08b3f481e3aaa0f1a09e30ed741d8ae4fcf5e095d5d00af600db18cb2c04b3edd03cc744a5888ae40caa532946c5e7e1n
        ),
        new Fp(1n)
      );
      let a5 = a.multiplyUnsafe(5n);
        expect(a5.x.toString()).toEqual("01ee86694b38a2513cd24a4648773811645bfc47087f1c758135cd25e871b090ab541a3370f9ade7551308d4fba7dd8b");
        expect(a5.y.toString()).toEqual("19f31db260c65c64bf01338623dfa71f1c4b9429f19ff8c9c776157d267a44fe6eb83608557ccffef8a31a71e3573d8d");
        expect(a5.z.toString()).toEqual("0346f0c9f5a5ab5c4454b77bc42d4d63dfead096169aede021098aae8c95e20b8b0425dde1b6a7ed9ee882defee1c6ee");
    });

    it("point double is mul*2", () => {
      const a = new PointG1(
        new Fp(
          0x17f1d3a73197d7942695638c4fa9ac0fc3688c4f9774b905a14e3a3f171bac586c55e83ff97a1aeffb3af00adb22c6bbn
        ),
        new Fp(
          0x08b3f481e3aaa0f1a09e30ed741d8ae4fcf5e095d5d00af600db18cb2c04b3edd03cc744a5888ae40caa532946c5e7e1n
        ),
        new Fp(1n)
      );
      let x = a;
      let y = a;
      for (let i = 0; i < 20; ++i) {
        x = x.double();
        y = y.multiply(2n);
      }
      expect(x.equals(y)).toBe(true);
    });

    it("point double", () => {
      const a = new PointG1(
        new Fp(
          0x17f1d3a73197d7942695638c4fa9ac0fc3688c4f9774b905a14e3a3f171bac586c55e83ff97a1aeffb3af00adb22c6bbn
        ),
        new Fp(
          0x08b3f481e3aaa0f1a09e30ed741d8ae4fcf5e095d5d00af600db18cb2c04b3edd03cc744a5888ae40caa532946c5e7e1n
        ),
        new Fp(1n)
      );
      let a2 = a.double();
        expect(a2.x.toString()).toEqual("02d7746f66839924e53de9082f8a65e4b5274a17c4fedc762f6e22ddddeb324d29871309744a3604cd346417f302c654");
        expect(a2.y.toString()).toEqual("0dfc7d639436a6c7ab28584eb49eba8e2e9abc707e0fb990217cbcc77d9a6aabd19d7e3e078c51d0cc5f84ea2cee5e50");
        expect(a2.z.toString()).toEqual("05e2b2e771f02e7353849a3e7f73987cdebd11ee33761af0bea90c4d508d91f91103f8ffeabd9dfde899dc4d19c2a636");
    });

    it("point add", () => {
      let d =  new PointG1(
        new Fp(0x02d7746f66839924e53de9082f8a65e4b5274a17c4fedc762f6e22ddddeb324d29871309744a3604cd346417f302c654n), 
          new Fp(0x0dfc7d639436a6c7ab28584eb49eba8e2e9abc707e0fb990217cbcc77d9a6aabd19d7e3e078c51d0cc5f84ea2cee5e50n), 
            new Fp(0x05e2b2e771f02e7353849a3e7f73987cdebd11ee33761af0bea90c4d508d91f91103f8ffeabd9dfde899dc4d19c2a636n), 
      )
      
      let point = new PointG1(
        new Fp(0x17f1d3a73197d7942695638c4fa9ac0fc3688c4f9774b905a14e3a3f171bac586c55e83ff97a1aeffb3af00adb22c6bbn), 
        new Fp(0x08b3f481e3aaa0f1a09e30ed741d8ae4fcf5e095d5d00af600db18cb2c04b3edd03cc744a5888ae40caa532946c5e7e1n), 
        new Fp(0x000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001n),
      )

      let sum = point.add(d);
      expect(sum.x.toString()).toEqual("0c3c926ff79142f05674c562e83ae387c825591a4b3bf3ff805c2811e2692629219fe79966872509e1f922d6b69dd4e6");
      expect(sum.y.toString()).toEqual("0cc975875c1d9b3a529a8f0add6dab65da11a7f47219bd1b8167717bdb62e5478447484a2ed9e8c7f0bfc8ad4088f8b9");
      expect(sum.z.toString()).toEqual("18a86b9f1311f110046bc73aceb078b73f493280837e79cda1de1c63cbba1358a3068cf775186bbddeef738ae4924b99");
    });

    it("point * 3", () => {
      const a = new PointG1(
        new Fp(
          0x17f1d3a73197d7942695638c4fa9ac0fc3688c4f9774b905a14e3a3f171bac586c55e83ff97a1aeffb3af00adb22c6bbn
        ),
        new Fp(
          0x08b3f481e3aaa0f1a09e30ed741d8ae4fcf5e095d5d00af600db18cb2c04b3edd03cc744a5888ae40caa532946c5e7e1n
        ),
        new Fp(1n)
      );
      let a3 = a.multiplyUnsafe(3n);
        expect(a3.x.toString()).toEqual("0c3c926ff79142f05674c562e83ae387c825591a4b3bf3ff805c2811e2692629219fe79966872509e1f922d6b69dd4e6");
        expect(a3.y.toString()).toEqual("0cc975875c1d9b3a529a8f0add6dab65da11a7f47219bd1b8167717bdb62e5478447484a2ed9e8c7f0bfc8ad4088f8b9");
        expect(a3.z.toString()).toEqual("18a86b9f1311f110046bc73aceb078b73f493280837e79cda1de1c63cbba1358a3068cf775186bbddeef738ae4924b99");
    });


    it("point * 2", () => {
      const a = new PointG1(
        new Fp(
          0x17f1d3a73197d7942695638c4fa9ac0fc3688c4f9774b905a14e3a3f171bac586c55e83ff97a1aeffb3af00adb22c6bbn
        ),
        new Fp(
          0x08b3f481e3aaa0f1a09e30ed741d8ae4fcf5e095d5d00af600db18cb2c04b3edd03cc744a5888ae40caa532946c5e7e1n
        ),
        new Fp(1n)
      );
      let a2 = a.multiplyUnsafe(2n);
        expect(a2.x.toString()).toEqual("02d7746f66839924e53de9082f8a65e4b5274a17c4fedc762f6e22ddddeb324d29871309744a3604cd346417f302c654");
        expect(a2.y.toString()).toEqual("0dfc7d639436a6c7ab28584eb49eba8e2e9abc707e0fb990217cbcc77d9a6aabd19d7e3e078c51d0cc5f84ea2cee5e50");
        expect(a2.z.toString()).toEqual("05e2b2e771f02e7353849a3e7f73987cdebd11ee33761af0bea90c4d508d91f91103f8ffeabd9dfde899dc4d19c2a636");
    });
    it('should be placed on curve vector 2', () => {
      const a = new PointG1(
        new Fp(
          0x17f1d3a73197d7942695638c4fa9ac0fc3688c4f9774b905a14e3a3f171bac586c55e83ff97a1aeffb3af00adb22c6bbn
        ),
        new Fp(
          0x08b3f481e3aaa0f1a09e30ed741d8ae4fcf5e095d5d00af600db18cb2c04b3edd03cc744a2888ae40caa232946c5e7e1n
        ),
        new Fp(1n)
      );
      console.log("a: " + a.toString(false));
      console.log("a.affine: " + a.toString());
      a.assertValidity();
    });
    it('should be placed on curve vector 3', () => {
      const a = new PointG1(
        new Fp(
          3924344720014921989021119511230386772731826098545970939506931087307386672210285223838080721449761235230077903044877n
        ),
        new Fp(
          849807144208813628470408553955992794901182511881745746883517188868859266470363575621518219643826028639669002210378n
        ),
        new Fp(
          3930721696149562403635400786075999079293412954676383650049953083395242611527429259758704756726466284064096417462642n
        )
      );
      a.assertValidity();
    });
    it('should not be placed on curve vector 1', () => {
      const a = new PointG1(new Fp(0n), new Fp(1n), new Fp(1n));
      expect(() => a.assertValidity()).toThrowError();
    });
    it('should not be placed on curve vector 2', () => {
      const a = new PointG1(
        new Fp(
          0x17f1d3a73197d7942695638c4fa9ac0fc3688c4f9774b905a14e3a3f171bac586c55e83ff97a1aeffb3af00adb22c6ban
        ),
        new Fp(
          0x08b3f481e3aaa0f1a09e30ed741d8ae4fcf5e095d5d00af600db18cb2c04b3edd03cc744a2888ae40caa232946c5e7e1n
        ),
        new Fp(1n)
      );
      expect(() => a.assertValidity()).toThrowError();
    });
    it('should not be placed on curve vector 3', () => {
      const a = new PointG1(
        new Fp(
          0x034a6fce17d489676fb0a38892584cb4720682fe47c6dc2e058811e7ba4454300c078d0d7d8a147a294b8758ef846ccan
        ),
        new Fp(
          0x14e4b429606d02bc3c604c0410e5fc01d6093a00bb3e2bc9395952af0b6a0dbd599a8782a1bea48a2aa4d8e1b1df7caan
        ),
        new Fp(
          0x1167e903c75541e3413c61dae83b15c9f9ebc12baba015ec01b63196580967dba0798e89451115c8195446528d8bcfcan
        )
      );
      expect(() => a.assertValidity()).toThrowError();
    });
    it('should be doubled and placed on curve vector 1', () => {
      const a = new PointG1(
        new Fp(
          0x17f1d3a73197d7942695638c4fa9ac0fc3688c4f9774b905a14e3a3f171bac586c55e83ff97a1aeffb3af00adb22c6bbn
        ),
        new Fp(
          0x08b3f481e3aaa0f1a09e30ed741d8ae4fcf5e095d5d00af600db18cb2c04b3edd03cc744a2888ae40caa232946c5e7e1n
        ),
        new Fp(1n)
      );
      const double = a.double();
      double.assertValidity();

      // let doubleManual = new PointG1()

      expect(double).toEqual(
        new PointG1(
          new Fp(
            0x5dff4ac6726c6cb9b6d4dac3f33e92c062e48a6104cc52f6e7f23d4350c60bd7803e16723f9f1478a13c2b29f4325adn
          ),
          new Fp(
            0x14e4b429606d02bc3c604c0410e5fc01d6093a00bb3e2bc9395952af0b6a0dbd599a8782a1bea48a2aa4d8e1b1df7ca5n
          ),
          new Fp(
            0x430df56ea4aba6928180e61b1f2cb8f962f5650798fdf279a55bee62edcdb27c04c720ae01952ac770553ef06aadf22n
          )
        )
      );
      expect(double).toEqual(a.multiply(2n));
      expect(double).toEqual(a.add(a));
    });
    it('should be pdoubled and placed on curve vector 2', () => {
      const a = new PointG1(
        new Fp(
          3924344720014921989021119511230386772731826098545970939506931087307386672210285223838080721449761235230077903044877n
        ),
        new Fp(
          849807144208813628470408553955992794901182511881745746883517188868859266470363575621518219643826028639669002210378n
        ),
        new Fp(
          3930721696149562403635400786075999079293412954676383650049953083395242611527429259758704756726466284064096417462642n
        )
      );
      const double = a.double();
      double.assertValidity();
      expect(double).toEqual(
        new PointG1(
          new Fp(
            1434314241472461137481482360511979492412320309040868403221478633648864894222507584070840774595331376671376457941809n
          ),
          new Fp(
            1327071823197710441072036380447230598536236767385499051709001927612351186086830940857597209332339198024189212158053n
          ),
          new Fp(
            3846649914824545670119444188001834433916103346657636038418442067224470303304147136417575142846208087722533543598904n
          )
        )
      );
      expect(double).toEqual(a.multiply(2n));
      expect(double).toEqual(a.add(a));
    });
    it('should not validate incorrect point', () => {
      const x =
        499001545268060011619089734015590154568173930614466321429631711131511181286230338880376679848890024401335766847607n;
      const y =
        3934582309586258715640230772291917282844636728991757779640464479794033391537662970190753981664259511166946374555673n;

      const p = new PointG1(new Fp(x), new Fp(y));
      expect(() => p.assertValidity()).toThrowError();
    });
  });
  describe('Point with Fp2 coordinates', () => {
    it('Point equality', () => {
      fc.assert(
        fc.property(
          fc.array(fc.array(FC_BIGINT, { minLength: 2, maxLength: 2 }), { minLength: 3, maxLength: 3 }),
          fc.array(fc.array(FC_BIGINT, { minLength: 2, maxLength: 2 }), { minLength: 3, maxLength: 3 }),
          ([x1, y1, z1], [x2, y2, z2]) => {
            const p1 = new PointG2(Fp2.fromBigTuple(x1), Fp2.fromBigTuple(y1), Fp2.fromBigTuple(z1));
            const p2 = new PointG2(Fp2.fromBigTuple(x2), Fp2.fromBigTuple(y2), Fp2.fromBigTuple(z2));
            expect(p1.equals(p1)).toBe(true);
            expect(p2.equals(p2)).toBe(true);
            expect(p1.equals(p2)).toBe(false);
            expect(p2.equals(p1)).toBe(false);
          }
        ),
        {
          numRuns: NUM_RUNS,
        }
      );
    });
    it('should be placed on curve vector 1', () => {
      const a = new PointG2(Fp2.fromBigTuple([0n, 0n]), Fp2.fromBigTuple([1n, 0n]), Fp2.fromBigTuple([0n, 0n]));
      a.assertValidity();
    });
    it('should be placed on curve vector 2', () => {
      const a = new PointG2(
        Fp2.fromBigTuple([
          0x024aa2b2f08f0a91260805272dc51051c6e47ad4fa403b02b4510b647ae3d1770bac0326a805bbefd48056c8c121bdb8n,
          0x13e02b6052719f607dacd3a088274f65596bd0d09920b61ab5da61bbdc7f5049334cf11213945d57e5ac7d055d042b7en,
        ]),
        Fp2.fromBigTuple([
          0x0ce5d527727d6e118cc9cdc6da2e351aadfd9baa8cbdd3a76d429a695160d12c923ac9cc3baca289e193548608b82801n,
          0x0606c4a02ea734cc32acd2b02bc28b99cb3e287e85a763af267492ab572e99ab3f370d275cec1da1aaa9075ff05f79ben,
        ]),
        Fp2.fromBigTuple([1n, 0n])
      );
      a.assertValidity();
    });
    it('should be placed on curve vector 3', () => {
      const a = new PointG2(
        Fp2.fromBigTuple([
          1050910533020938551374635094591786195161318899082245208049526631521590440770333461074893697611276887218497078796422n,
          1598996588129879649144273449445099511963892936268948685794588663059536473334389899700849905658337146716739117116278n,
        ]),
        Fp2.fromBigTuple([
          2297925586785011392322632866903098777630933241582428655157725630032766380748347103951287973711001282071754690744592n,
          2722692942832192263619429510118606113750284957310697940719148392728935618099339326005363048966551031941723480961950n,
        ]),
        Fp2.fromBigTuple([
          76217213143079476655331517031477221909850679220115226933444440112284563392888424587575503026751093730973752137345n,
          651517437191775294694379224746298241572865421785132086369822391079440481283732426567988496860904675941017132063964n,
        ])
      );
      a.assertValidity();
    });
    it('should not be placed on curve vector 1', () => {
      const a = new PointG2(Fp2.fromBigTuple([0n, 0n]), Fp2.fromBigTuple([1n, 0n]), Fp2.fromBigTuple([1n, 0n]));
      expect(() => a.assertValidity()).toThrowError();
    });
    it('should not be placed on curve vector 2', () => {
      const a = new PointG2(
        Fp2.fromBigTuple([
          0x024aa2b2f08f0a91260805272dc51051c6e47ad4fa403b02b4410b647ae3d1770bac0326a805bbefd48056c8c121bdb8n,
          0x13e02b6052719f607dacd3a088274f65596bd0d09920b61ab5da61bbdc7f5049334cf11213945d57e5ac7d055d042b7en,
        ]),
        Fp2.fromBigTuple([
          0x0ce5d527727d6e118cc9cdc6da2e351aadfd9baa8cbdd3a76d229a695160d12c923ac9cc3baca289e193548608b82801n,
          0x0606c4a02ea734cc32acd2b02bc28b99cb3e287e85a763af267492ab572e99ab3f370d275cec1da1aaa9075ff05f79ben,
        ]),
        Fp2.fromBigTuple([1n, 0n])
      );
      expect(() => a.assertValidity()).toThrowError();
    });
    it('should not be placed on curve vector 3', () => {
      const a = new PointG2(
        Fp2.fromBigTuple([
          0x877d52dd65245f8908a03288adcd396f489ef87ae23fe110c5aa48bc208fbd1a0ed403df5b1ac137922b915f1f38ec37n,
          0x0cf8158b9e689553d58194f79863fe02902c5f169f0d4ddf46e23f15bb4f24304a8e26f1e5febc57b750d1c3dc4261d8n,
        ]),
        Fp2.fromBigTuple([
          0x065ae9215806e8a55fd2d9ec4af9d2d448599cdb85d9080b2c9b4766434c33d103730c92c30a69d0602a8804c2a7c65fn,
          0x0e9c342d8a6d4b3a1cbd02c7bdc0e0aa304de41a04569ae33184419e66bbc0271c361c973962955ba6405f0e51beb98bn,
        ]),
        Fp2.fromBigTuple([
          0x19cbaa4ee4fadc2319939b8db45c6a355bfb3755197ba74eda8534d2a2c1a2592475939877594513c326a90c11705002n,
          0x0c0d89405d4e69986559a56057851733967c50fd0b4ec75e4ce92556ae5d33567e6e1a4eb9d83b4355520ebfe0bef37cn,
        ])
      );
      expect(() => a.assertValidity()).toThrowError();
    });
  });
  it('should be doubled and placed on curve vector 1', () => {
    const a = new PointG2(
      Fp2.fromBigTuple([
        0x024aa2b2f08f0a91260805272dc51051c6e47ad4fa403b02b4510b647ae3d1770bac0326a805bbefd48056c8c121bdb8n,
        0x13e02b6052719f607dacd3a088274f65596bd0d09920b61ab5da61bbdc7f5049334cf11213945d57e5ac7d055d042b7en,
      ]),
      Fp2.fromBigTuple([
        0x0ce5d527727d6e118cc9cdc6da2e351aadfd9baa8cbdd3a76d429a695160d12c923ac9cc3baca289e193548608b82801n,
        0x0606c4a02ea734cc32acd2b02bc28b99cb3e287e85a763af267492ab572e99ab3f370d275cec1da1aaa9075ff05f79ben,
      ]),
      Fp2.fromBigTuple([1n, 0n])
    );
    const double = a.double();
    double.assertValidity();
    expect(double).toEqual(
      new PointG2(
        Fp2.fromBigTuple([
          2004569552561385659566932407633616698939912674197491321901037400001042336021538860336682240104624979660689237563240n,
          3955604752108186662342584665293438104124851975447411601471797343177761394177049673802376047736772242152530202962941n,
        ]),
        Fp2.fromBigTuple([
          978142457653236052983988388396292566217089069272380812666116929298652861694202207333864830606577192738105844024927n,
          2248711152455689790114026331322133133284196260289964969465268080325775757898907753181154992709229860715480504777099n,
        ]),
        Fp2.fromBigTuple([
          3145673658656250241340817105688138628074744674635286712244193301767486380727788868972774468795689607869551989918920n,
          968254395890002185853925600926112283510369004782031018144050081533668188797348331621250985545304947843412000516197n,
        ])
      )
    );
    expect(double).toEqual(a.multiply(2n));
    expect(double).toEqual(a.add(a));
  });
  it('should be doubled and placed on curve vector 2', () => {
    const a = new PointG2(
      Fp2.fromBigTuple([
        1050910533020938551374635094591786195161318899082245208049526631521590440770333461074893697611276887218497078796422n,
        1598996588129879649144273449445099511963892936268948685794588663059536473334389899700849905658337146716739117116278n,
      ]),
      Fp2.fromBigTuple([
        2297925586785011392322632866903098777630933241582428655157725630032766380748347103951287973711001282071754690744592n,
        2722692942832192263619429510118606113750284957310697940719148392728935618099339326005363048966551031941723480961950n,
      ]),
      Fp2.fromBigTuple([
        76217213143079476655331517031477221909850679220115226933444440112284563392888424587575503026751093730973752137345n,
        651517437191775294694379224746298241572865421785132086369822391079440481283732426567988496860904675941017132063964n,
      ])
    );
    const double = a.double();
    double.assertValidity();
    expect(double).toEqual(
      new PointG2(
        Fp2.fromBigTuple([
          971534195338026376106694691801988868863420444490100454506033572314651086872437977861235872590578590756720024471469n,
          378014958429131328675394810343769919858050810498061656943526952326849391332443820094459004368687076347500373099156n,
        ]),
        Fp2.fromBigTuple([
          3280997195265200639128448910548139455469442645584276216556357555470480677955454794092224549507347100925189702190894n,
          158426171401258191330058082816753806149755104529779342689180332371855591641984107207983953003313468624083823672075n,
        ]),
        Fp2.fromBigTuple([
          3008329035346660988655239603307628288451385710327841564719334330531972476116399444025767153235631811081036738463342n,
          3341599904620117102667473563202270732934028545405889777934923014103677543378240279263895401928203318430834551303601n,
        ])
      )
    );
    expect(double).toEqual(a.multiply(2n));
    expect(double).toEqual(a.add(a));
  });
  const wNAF_VECTORS = [
    0x28b90deaf189015d3a325908c5e0e4bf00f84f7e639b056ff82d7e70b6eede4cn,
    0x13eda753299d7d483339d80809a1d80553bda402fffe5bfeffffffff00000001n,
    0x23eda753299d7d483339d80809a1d80553bda402fffe5bfeffffffff00000001n,
    0x33eda753299d7d483339d80809a1d80553bda402fffe5bfeffffffff00000001n,
    0x43eda753299d7d483339d80809a1d80553bda402fffe5bfeffffffff00000001n,
    0x53eda753299d7d483339d80809a1d80553bda402fffe5bfeffffffff00000001n,
    0x63eda753299d7d483339d80809a1d80553bda402fffe5bfeffffffff00000000n,
  ];
  it('wNAF multiplication same as unsafe (G1, W=1)', () => {
    let G = PointG1.BASE.negate().negate(); // create new point
    for (let k of wNAF_VECTORS) {
      expect(G.multiplyPrecomputed(k).equals(G.multiplyUnsafe(k))).toEqual(true);
    }
  });
  it('wNAF multiplication same as unsafe (G1, W=4)', () => {
    let G = PointG1.BASE.negate().negate();
    G.calcMultiplyPrecomputes(4);
    for (let k of wNAF_VECTORS) {
      expect(G.multiplyPrecomputed(k).equals(G.multiplyUnsafe(k))).toEqual(true);
    }
  });
  it('wNAF multiplication same as unsafe (G1, W=5)', () => {
    let G = PointG1.BASE.negate().negate();
    G.calcMultiplyPrecomputes(5);
    for (let k of wNAF_VECTORS) {
      expect(G.multiplyPrecomputed(k).equals(G.multiplyUnsafe(k))).toEqual(true);
    }
  });
  it('wNAF multiplication same as unsafe (G2, W=1)', () => {
    let G = PointG2.BASE.negate().negate();
    for (let k of wNAF_VECTORS) {
      expect(G.multiplyPrecomputed(k).equals(G.multiplyUnsafe(k))).toEqual(true);
    }
  });
  it('wNAF multiplication same as unsafe (G2, W=4)', () => {
    let G = PointG2.BASE.negate().negate();
    G.calcMultiplyPrecomputes(4);
    for (let k of wNAF_VECTORS) {
      expect(G.multiplyPrecomputed(k).equals(G.multiplyUnsafe(k))).toEqual(true);
    }
  });
  it('wNAF multiplication same as unsafe (G2, W=5)', () => {
    let G = PointG2.BASE.negate().negate();
    G.calcMultiplyPrecomputes(5);
    for (let k of wNAF_VECTORS) {
      expect(G.multiplyPrecomputed(k).equals(G.multiplyUnsafe(k))).toEqual(true);
    }
  });
  it('PSI cofactor cleaning same as multiplication', () => {
    const points = [
      new PointG2(
        Fp2.fromBigTuple([
          0x19658bb3b27541a2cf4c24ffe2a329fff606add46e55dac0ccf6d03887fa5a4bfbe3f9dcb991cfa8a8cb00b1b08699c3n,
          0x0b2fd20060fc25842260db4c6e9c6f2c83f4ad14ac319fe513363b589f18eda5f02337cfe9b2b8b679d47e01be32275fn,
        ]),
        Fp2.fromBigTuple([
          0x0276bdbbad87dcd9f78581c6e40ac42d8036115a617a283014acc0ec55137a5e6234862859bc61a6d55c1115493a940bn,
          0x15d90b5c373060751f0ff367f3b75770c3bf3dc8f6f4078325bc24a7b134e7a290442a6b612f913b5ac4a2c5dc6cddean,
        ]),
        Fp2.fromBigTuple([
          0x0a0adb13f08a7a54039373efa3d100f9760aa0efc1d494f4e8d82915345f72444b43c021ab8d32b9393db70a6f75e6e1n,
          0x19fbb8b214bd1368a21fbe627574a25e0157459480bbd3a3e7febe5fec82b9ef1cdf49d4c2f12e68d44429403106aeden,
        ])
      ),
      new PointG2(
        Fp2.fromBigTuple([
          0x166c0c0103a81e8cbf85d645d9fa05a1e656f3ca19e6b7f13013f35ab0e1abf4650234da919dcbd99196b6daf7850f2fn,
          0x1095a6c628b95126cac07d2b0fc01a373ed72f88a52086c9e1563573b151f73678dfb959eb3859e9c923b9ce048afdf9n,
        ]),
        Fp2.fromBigTuple([
          0x0f7c5242ffdb2f2fd325e0cd9dd233d85d3f01c54b4f5d13f06429167356946689c2a0ac323c6f5ad46689b3ed35d272n,
          0x1258a942709e1174f931eab9661ad1994b479e965c7434d7eb27c725da7ab431a32eb8859d58abde2a7a0f2a83601b12n,
        ]),
        Fp2.fromBigTuple([
          0x1728e5c5e2db31e982cef972c1b7376fab10f787a374ad66be59645b42878fac60ffc7b46097853e7f47757312374bb1n,
          0x09b021454f2266f5c4faad3224712b985be5e30a861d6b15978eecdf92c9da19f775c7caa33c4d6f8eb2c7aef031e54cn,
        ])
      ),
      new PointG2(
        Fp2.fromBigTuple([
          0x1050085832985ac2c91552a31aa11977c7cfaf77c8b41b88a1c2b959cdd2d3d95954ba2428bb6fe4a568d036b9634a23n,
          0x0ed2e0dc90b9b40b3742ca07f022638422530dce532c3c4620fae0ceb4dc3d926515da7f38f1757ec6c04b33ad77645an,
        ]),
        Fp2.fromBigTuple([
          0x15d5fb5f39a8ae95b96fddd198e4cda8211007391c7be57205d137bd58cc8a06b48cbec32b70c7053a00c96ffe091da9n,
          0x037a323cf0270c8e34200ead02e40f3a04096a9aa774415fe79049248bcb70ef2ccddf9d87db100ce52342e25030528fn,
        ]),
        Fp2.fromBigTuple([
          0x12f017b2c2a30eeaf122036397b06f2e4ef82edd41fd735416dbd2be3b491c312af1639dffa9943e00c624dfbf6d347en,
          0x0714a7544bae337f8959b865f8e0c36104655157f6649fd798e54afeb3fb24a62464f2659c7b0d0999b55f71a49e2f9cn,
        ])
      ),
      new PointG2(
        Fp2.fromBigTuple([
          0x14918659c1a50a20b4c3b07c242442b005070f68fab64c4b801f812c3378dbdb584053a428affb79bcf9190618488999n,
          0x0c2540ba1076ab00629d8c0d60a6bcf88b770d27343447b7868418f98c2f97cd9af7c5a5a4dae409a9ddeeb36308d2cen,
        ]),
        Fp2.fromBigTuple([
          0x06010eb447078dcaabf8f537df2739c9011f716552ade5d7980258700872219610d3769e78a56a95f52afe3254a40acan,
          0x07889027cb2dea1e5ecbefcd0bdc55816a6abfaa8a280df42339c6cc3ff6436c9f1008fa00911006151d71ddfe9ead2cn,
        ]),
        Fp2.fromBigTuple([
          0x1711ccc0d10cf739fb2aacb3f8dbef07e1698523ed8a927fe171d25606ff2241c77e2ed2dbf695c138714efb5afd53c1n,
          0x06ba4615f5c63cf56b12a267850d02402d0c8fd3294b70b77b93b4ccb7b6f4bf15df501d0cafd70b039167c306f834dfn,
        ])
      ),
      new PointG2(
        Fp2.fromBigTuple([
          0x19658bb3b27541a2cf4c24ffe2a329fff606add46e55dac0ccf6d03887fa5a4bfbe3f9dcb991cfa8a8cb00b1b08699c3n,
          0x0b2fd20060fc25842260db4c6e9c6f2c83f4ad14ac319fe513363b589f18eda5f02337cfe9b2b8b679d47e01be32275fn,
        ]),
        Fp2.fromBigTuple([
          0x0276bdbbad87dcd9f78581c6e40ac42d8036115a617a283014acc0ec55137a5e6234862859bc61a6d55c1115493a940bn,
          0x15d90b5c373060751f0ff367f3b75770c3bf3dc8f6f4078325bc24a7b134e7a290442a6b612f913b5ac4a2c5dc6cddean,
        ]),
        Fp2.fromBigTuple([
          0x0a0adb13f08a7a54039373efa3d100f9760aa0efc1d494f4e8d82915345f72444b43c021ab8d32b9393db70a6f75e6e1n,
          0x19fbb8b214bd1368a21fbe627574a25e0157459480bbd3a3e7febe5fec82b9ef1cdf49d4c2f12e68d44429403106aeden,
        ])
      ),
    ];
    // Re-define validateScalar to allow scalars higher than CURVE.r
    // @ts-ignore
    PointG2.prototype.validateScalar = function (n: bigint | number): bigint {
      if (typeof n === 'number') n = BigInt(n);
      if (typeof n !== 'bigint' || n <= 0) {
        // n > CURVE.r
        throw new Error(
          `Point#multiply: invalid scalar, expected positive integer < CURVE.r. Got: ${n}`
        );
      }
      return n;
    };
    for (let p of points) {
      const ours = p.clearCofactor();
      const shouldBe = p.multiplyUnsafe(CURVE.h2Eff);
      expect(ours.equals(shouldBe)).toBeTruthy();
    }
  });
});
