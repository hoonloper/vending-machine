const { InvalidError } = require("../common/CustomError");
const {
  validNumberString,
  validStrictNumber,
  validFilledString,
} = require("../common/utils");

class Card {
  static NUMBER_LENGTH = 16;
  static EXPIRED_LENGTH = 5;
  static BIRTH_DAY_LENGTH = 6;
  static TOTAL_CARD_INFO_LENGTH =
    this.NUMBER_LENGTH + this.EXPIRED_LENGTH + this.BIRTH_DAY_LENGTH + 2; // 2는 ':' 개수

  #number;
  #expiredDate;
  #birthDay;
  #usedPrice;

  constructor(number, expiredDate, birthDay, usedPrice = 0) {
    if (!Card.validCardNumber(number)) {
      throw new InvalidError(number);
    }
    if (!Card.validExpiredDate(expiredDate)) {
      throw new InvalidError(expiredDate);
    }
    if (!Card.validBirthDay(birthDay)) {
      throw new InvalidError(birthDay);
    }

    this.#number = number;
    this.#expiredDate = expiredDate;
    this.#birthDay = birthDay;
    this.#usedPrice = usedPrice;
  }

  /**
   * @returns 'xxxx-xxxx-xxxx-xxxx' 형태로 변환
   */
  formatNumber(number) {
    return number.replace(/(.{4})/g, "$1-").slice(0, -1);
  }
  /**
   * @returns 'xxxxxxxx****xxxx' 형태로 가리기
   */
  maskNumber(number) {
    return number.slice(0, 8) + "****" + number.slice(12);
  }
  getNumber() {
    return this.#number;
  }
  getExpiredDate() {
    return this.#expiredDate;
  }
  getBirthDay() {
    return this.#birthDay;
  }
  getPrice() {
    return this.#usedPrice;
  }
  getInfo() {
    return {
      number: this.formatNumber(this.maskNumber(this.getNumber())),
      expiredDate: this.getExpiredDate(),
      birthDay: this.getBirthDay(),
      price: this.getPrice(),
    };
  }

  increasePrice(price) {
    if (price < 0) {
      throw new InvalidError(price);
    }
    this.#usedPrice += price;
  }

  copy() {
    return new Card(
      this.getNumber(),
      this.getExpiredDate(),
      this.getBirthDay(),
      this.getPrice()
    );
  }

  static validCardNumber(number) {
    return validNumberString(number) && number.length === Card.NUMBER_LENGTH;
  }

  static validExpiredDate(expired) {
    if (
      !validFilledString(expired) ||
      !expired.includes("/") ||
      expired.length !== Card.EXPIRED_LENGTH
    ) {
      return false;
    }
    const [expiredMonth, expiredYear] = expired.split("/");
    const isExpiredMonth =
      expiredMonth.length === 2 &&
      validNumberString(expiredMonth) &&
      Number(expiredMonth) <= 12 &&
      Number(expiredMonth) > 0;
    const currentYear = Number(new Date().getFullYear().toString().slice(2));
    const isExpiredYear =
      expiredYear.length === 2 &&
      validNumberString(expiredYear) &&
      Number(expiredYear) <= 99 &&
      Number(expiredYear) >= currentYear;

    return isExpiredMonth && isExpiredYear;
  }

  static validBirthDay(birthDay) {
    if (
      !validFilledString(birthDay) ||
      birthDay.length !== Card.BIRTH_DAY_LENGTH ||
      !validNumberString(birthDay)
    ) {
      return false;
    }
    const year = Number(birthDay.slice(0, 2));
    const month = Number(birthDay.slice(2, 4));
    const day = Number(birthDay.slice(4, Card.BIRTH_DAY_LENGTH));

    return (
      year <= 99 &&
      year >= 0 &&
      month <= 12 &&
      month >= 1 &&
      day <= 31 &&
      day >= 1
    );
  }

  hasPrice() {
    return validStrictNumber(this.getPrice()) && this.getPrice() > 0;
  }

  static isCard(card) {
    return card instanceof Card;
  }
}

module.exports = Card;
