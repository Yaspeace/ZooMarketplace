export default class Card {
    constructor(
        id,
        title,
        description,
        price,
        date,
        address,
        imgId,
        account
    ) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.price = price;
        this.date = date;
        this.address = address;
        this.imgId = imgId;
        this.account = account;
    }
}