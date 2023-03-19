export class Card {
    constructor(
        id: Number,
        title: String,
        description: String,
        price: Number,
        published: Date,
        state: Number,
        views: Number,
        sex: Number,
        age: Number,
        isPaid: Boolean,
        account: Number,
        type: Number,
        breed: Number,
        isLiked: Boolean,
        image: Number,
    ) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.price = price;
        this.published = published;
        this.state = state;
        this.views = views;
        this.sex = sex;
        this.age = age;
        this.isPaid = isPaid;
        this.account = account;
        this.type = type;
        this.breed = breed;
        this.isLiked = isLiked;
        this.image = image;
    }

    public id: Number;
    public title: String;
    public description: String;
    public price: Number;
    public published: Date;
    public state: Number;
    public views: Number;
    public sex: Number;
    public age: Number;
    public isPaid: Boolean;
    public account: Number;
    public type: Number;
    public breed: Number;
    public isLiked: Boolean;
    public image: Number;
}