const { describe, it, beforeEach } = require("node:test");
const assert = require("assert");
const Card = require("../../app/models/Card");
const { InvalidError } = require("../../app/common/CustomError");

describe("카드 모델 테스트", () => {
  const NUMBER_LENGTH = 16;
  const EXPIRED_LENGTH = 5;
  const BIRTH_DAY_LENGTH = 6;
  const TOTAL_CARD_INFO_LENGTH =
    NUMBER_LENGTH + EXPIRED_LENGTH + BIRTH_DAY_LENGTH + 2;
  const NUMBER = "1234567887654321";
  const EXPIRED_DATE = "12/28";
  const BIRTHDAY = "900101";

  describe("성공", () => {
    let card = null;
    beforeEach(() => {
      card = new Card(NUMBER, EXPIRED_DATE, BIRTHDAY);
    });
    it("카드 정적 상수", () => {
      assert.strictEqual(NUMBER_LENGTH, Card.NUMBER_LENGTH);
      assert.strictEqual(EXPIRED_LENGTH, Card.EXPIRED_LENGTH);
      assert.strictEqual(BIRTH_DAY_LENGTH, Card.BIRTH_DAY_LENGTH);
      assert.strictEqual(TOTAL_CARD_INFO_LENGTH, Card.TOTAL_CARD_INFO_LENGTH);
    });

    it("카드 인스턴스 생성(기본 게터)", () => {
      assert.strictEqual(NUMBER, card.getNumber());
      assert.strictEqual(EXPIRED_DATE, card.getExpiredDate());
      assert.strictEqual(BIRTHDAY, card.getBirthDay());
      assert.strictEqual(0, card.getPrice());
    });

    it("카드 형태 변환", () => {
      assert.strictEqual("1234-5678-8765-4321", card.formatNumber(NUMBER));
    });

    it("카드 마스킹", () => {
      assert.strictEqual("12345678****4321", card.maskNumber(NUMBER));
    });

    it("카드 정보 가져오기", () => {
      assert.deepStrictEqual(
        {
          number: card.formatNumber(card.maskNumber(NUMBER)),
          expiredDate: EXPIRED_DATE,
          birthDay: BIRTHDAY,
          price: 0,
        },
        card.getInfo()
      );
    });

    it("카드 사용 금액 증가", () => {
      const first = 10_000;
      const second = 20_000;
      const third = 30_000;

      let price = first;
      card.increasePrice(first);
      assert.strictEqual(price, card.getPrice());

      price += second;
      card.increasePrice(second);
      assert.strictEqual(price, card.getPrice());

      price += third;
      card.increasePrice(third);
      assert.strictEqual(price, card.getPrice());
    });

    it("카드 사용 금액 검증", () => {
      assert.equal(false, card.hasPrice());

      card.increasePrice(100);
      assert.ok(card.hasPrice());
    });

    it("카드 번호 검증", () => {
      assert.ok(Card.validCardNumber(NUMBER));
    });

    it("카드 만료일 검증", () => {
      assert.ok(Card.validExpiredDate(EXPIRED_DATE));
    });

    it("카드 생년월일 검증", () => {
      assert.ok(Card.validBirthDay(BIRTHDAY));
    });

    it("카드 복사 검증", () => {
      const copyCard = card.copy();
      assert.ok(copyCard instanceof Card);
      assert.notStrictEqual(copyCard, card);
      assert.strictEqual(true, copyCard !== card);
      card.increasePrice(100);
      assert.strictEqual(true, copyCard.getPrice() < card.getPrice());
    });

    it("카드 인스턴스 검증", () => {
      assert.ok(Card.isCard(card));
    });
  });
  describe("실패", () => {
    let card = null;
    beforeEach(() => {
      card = new Card(NUMBER, EXPIRED_DATE, BIRTHDAY);
    });

    it("잘못된 생성자 주입", () => {
      assert.throws(
        () => new Card(Number(NUMBER), EXPIRED_DATE, BIRTHDAY),
        InvalidError
      );
      assert.throws(
        () => new Card(NUMBER, EXPIRED_DATE + "222", BIRTHDAY),
        InvalidError
      );
      assert.throws(
        () => new Card(NUMBER, EXPIRED_DATE, Number(BIRTHDAY)),
        InvalidError
      );
    });

    it("카드 형태 변환 - 숫자 입력", () => {
      assert.throws(() => card.formatNumber(Number(NUMBER)));
    });

    it("카드 마스킹 - 숫자 입력", () => {
      assert.throws(() => card.maskNumber(Number(NUMBER)));
    });

    it("카드 사용 금액 증가 - 음수 입력", () => {
      assert.throws(() => card.increasePrice(-1));
    });

    it("카드 번호 검증", () => {
      assert.strictEqual(false, Card.validCardNumber());
      assert.strictEqual(false, Card.validCardNumber(Number(NUMBER)));
      assert.strictEqual(false, Card.validCardNumber(null));
      assert.strictEqual(false, Card.validCardNumber(NUMBER + "1234"));
      assert.strictEqual(false, Card.validCardNumber("#!%#%#$^#$@%1234"));
    });

    it("카드 만료일 검증", () => {
      assert.strictEqual(false, Card.validExpiredDate());
      assert.strictEqual(false, Card.validExpiredDate(null));
      assert.strictEqual(false, Card.validExpiredDate(EXPIRED_DATE + "1234"));
      assert.strictEqual(false, Card.validExpiredDate("/////"));
      assert.strictEqual(false, Card.validExpiredDate("1/2/3"));
      assert.strictEqual(false, Card.validExpiredDate("/121/"));
      assert.strictEqual(false, Card.validExpiredDate("/1111"));
    });

    it("카드 생년월일 검증", () => {
      assert.strictEqual(false, Card.validBirthDay());
      assert.strictEqual(false, Card.validBirthDay(null));
      assert.strictEqual(false, Card.validBirthDay(Number(BIRTHDAY)));
      assert.strictEqual(false, Card.validBirthDay(BIRTHDAY + 123));
      assert.strictEqual(false, Card.validBirthDay(BIRTHDAY + "123"));
      assert.strictEqual(false, Card.validBirthDay(999999));
      assert.strictEqual(false, Card.validBirthDay("999999"));
    });

    it("음료 인스턴스 검증", () => {
      assert.strictEqual(false, Card.isCard(new Error()));
    });
  });
});
