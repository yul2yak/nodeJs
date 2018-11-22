class User {
    constructor(name, battles, win, lose) {
        this.name = name;
        this.battles = battles;
        this.win = win;
        this.lose = lose;
    }

    getPoint() {
        return this.win - this.lose;
    }

    getRate() {
        if ((this.battles - this.draw) !== 0) {
            return this.win / (this.battles - this.draw);
        } else {
            return 0;
        }
    }
}

let userData = [];
userData.push(new User('김성율', 0, 0, 0));
userData.push(new User('장창우', 0, 0, 0));
userData.push(new User('홍재권', 0, 0, 0));
userData.push(new User('김문호', 0, 0, 0));
userData.push(new User('김윤규', 0, 0, 0));
userData.push(new User('구남도', 0, 0, 0));

/*function init(user) {
    user.battles = 0;
    user.win = 0;
    user.lose = 0;
    user.draw = 0;
}

userData.forEach(function (user, index) {
    init(user);
});*/

const temp = userData.filter(function (user) {
    return user.name === "김성율";
});
/*
temp.battles = 0;
temp.win = 0;
temp.lose = 0;
temp.draw = 0;*/
const result = '승';
temp.forEach(function (user, index) {
    if (result === '승') user.win++;
    else if (result === '패') user.lose++;
    else user.draw++;
    user.battles++;
    console.log(user);
});

