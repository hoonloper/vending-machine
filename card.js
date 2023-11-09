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

  increasePrice(price) {
    if (price < 0) {
      throw Error("INVALID:PRICE");
    }
    this.usedPrice += price;
  }
}

module.exports = Card;
