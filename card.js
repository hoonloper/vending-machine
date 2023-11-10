class Card {
  number;
  expiredDate;
  birthDay;
  usedPrice = 0;

  // TODO: valid 장착
  constructor(number, expiredDate, birthDay) {
    this.number = number;
    this.expiredDate = expiredDate;
    this.birthDay = birthDay;
  }

  /**
   * @returns 'xxxx-xxxx-xxxx-xxxx' 형태로 변환
   */
  formatNumber(number) {
    return number.replace(/(.{4})/g, "$1-");
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

  increasePrice(price) {
    if (price < 0) {
      throw Error("INVALID:PRICE");
    }
    this.usedPrice += price;
  }
}

module.exports = Card;
