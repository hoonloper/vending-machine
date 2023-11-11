const { InvalidError } = require("../common/CustomError");
const { validNumberString } = require("../common/utils");

class Card {
  static NUMBER_LENGTH = 16;
  static EXPIRED_LENGTH = 5;
  static BIRTH_DAY_LENGTH = 6;
  static TOTAL_CARD_INFO_LENGTH =
    this.NUMBER_LENGTH + this.EXPIRED_LENGTH + this.BIRTH_DAY_LENGTH + 2; // 2는 ':' 개수

  number;
  expiredDate;
  birthDay;
  usedPrice = 0;

  constructor(number, expiredDate, birthDay) {
    if (!this.validCardNumber(number)) {
      throw InvalidError("카드 번호");
    }
    this.number = number;

    if (!this.validExpiredDate(expiredDate)) {
      throw InvalidError("만료일자");
    }
    this.expiredDate = expiredDate;

    if (!this.validBirthDay(birthDay)) {
      throw InvalidError("생년월일");
    }
    this.birthDay = birthDay;
  }

  /**
   * @returns 'xxxx-xxxx-xxxx-xxxx' 형태로 변환
   */
  formatNumber(number) {
    return number.replace(/(.{4})/g, "$1-").slice(0, -1);
  }
  /**
   * @returns 'xxxxxxxx****xxxx' 형태로 블러
   */
  blurNumber(number) {
    return number.slice(0, 8) + "****" + number.slice(12);
  }
  getNumber() {
    return this.number;
  }
  getPrice() {
    return this.usedPrice;
  }

  increase(price) {
    if (price < 0) {
      throw InvalidError("가격");
    }
    this.usedPrice += price;
  }

  validCardNumber(number) {
    if (number.length !== 16 || !validNumberString(number)) {
      return false;
    }
    return true;
  }

  validExpiredDate(expired) {
    if (!expired.includes("/") || expired.length !== 5) {
      return false;
    }
    const [expiredMonth, expiredYear] = expired.split("/");
    const isExpiredMonth =
      expiredMonth.length === 2 && validNumberString(expiredMonth);
    const isExpiredYear =
      expiredYear.length === 2 && validNumberString(expiredYear);
    const currentYear = Number(new Date().getFullYear().toString().slice(2));
    if (
      !isExpiredMonth ||
      !isExpiredYear ||
      Number(expiredMonth) > 12 ||
      Number(expiredMonth) < 1 ||
      expiredYear > 99 ||
      currentYear > expiredYear
    ) {
      return false;
    }
    return true;
  }

  validBirthDay(birthDay) {
    if (birthDay.length !== 6 || !validNumberString(birthDay)) {
      return false;
    }
    const year = Number(birthDay.slice(0, 2));
    const month = Number(birthDay.slice(2, 4));
    const day = Number(birthDay.slice(4, 6));
    if (year > 99 || month > 12 || month < 1 || day > 31 || day < 1) {
      return false;
    }
    return true;
  }
}

module.exports = Card;
