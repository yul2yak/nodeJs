// Initialize Firebase
// TODO: Replace with your project's customized code snippet
const config = {
    apiKey: "AIzaSyD2RicG0k0M6DioaAKgcxx5daHynAkk4ag",
    authDomain: "ykachaos.firebaseapp.com",
    databaseURL: "https://ykachaos.firebaseio.com",
    storageBucket: "ykachaos.appspot.com",
    projectId: "ykachaos",
    messagingSenderId: "983566773859",
};
const firestoreapp = firebase.initializeApp(config);
const db = firebase.firestore(firestoreapp);

let games = [];
let users = [];

const status = [
    "All",
    "힘",
    "민",
    "지"
];

const champions = [
    {
        name: '챈',
        team: '나엘',
        primary: '힘',
        url: 'https://s3.namuwikiusercontent.com/s/21c39cf209c371a8a2fd3c6f4d5e286a38b11e3d686c1c02feb8886091f5326c03059be9c42df8ea1fe0141ced5f4b6cb9d3e60a2ef386814110100dc71fa7b5ee27f9b03640f935bfff4484d05f0642fb03857f420c8876f16e0a3dfe752496'
    },
    {
        name: '스톤콜드',
        team: '나엘',
        primary: '힘',
        url: 'https://s3.namuwikiusercontent.com/s/3aef0c58c5d8915cc026740ed8ae0ad84c4f2125a3123f434eee46d8a321a4ff132074c8bb8b5e4d74ac72dec55ea5819cb916de82014ba247a7755419c61147c5da4a22a0527dae64bdaa1dd06d1efd788313d2c2b81c9d8536d8a6eee90c18'
    },
    {
        name: '무라딘',
        team: '나엘',
        primary: '힘',
        url: 'https://s3.namuwikiusercontent.com/s/2acfa21688e0e61e8c495630c5be5402a7130365b4885b08b1fb9f8d13b7a7ed693a412ba9cfa906dc944da6a20925353caf6d6b46057b5b3b9ca5769538727d8a47741028d85dce8eeaca0119855faefebb869bc1e62b43055f2fd90d47b098'
    },
    {
        name: '캐런후프',
        team: '나엘',
        primary: '힘',
        url: 'https://s3.namuwikiusercontent.com/s/fce5b2f61dc90c015683ceb74d0158d544e7fd9819a4500d6eebc2a6645474bc32776d6219f36b95a52ec847f62c473812ca0361409a097ec01f3b22b5023f18b92b89b563d85530596b41ea8aded2dc9551f8d244e0d852de348b455d8c1b9a'
    },
    {
        name: '아다스',
        team: '나엘',
        primary: '힘',
        url: 'https://s3.namuwikiusercontent.com/s/9b16a08682e703086411c088da5e22e5f0a4d8d866a5b78bb7ee451c0e03a518f2448cb1f1199d171d700ee1f2f0fdaf7c0f86f16739ce2e920c4f41522f724592dadfae5152e6285842e1b7d3b8b54a373469801a96a4afc0a1cca335ce130c'
    },
    {name: '탈론', team: '나엘', primary: '힘', url: ''},
    {name: '니피', team: '나엘', primary: '힘', url: ''},
    {name: '갈리토스', team: '나엘', primary: '힘', url: ''},
    {name: '세드릭', team: '나엘', primary: '힘', url: ''},
    {name: '그리메', team: '나엘', primary: '힘', url: ''},
    {name: '파르테논', team: '나엘', primary: '힘', url: ''},
    {name: '우서', team: '나엘', primary: '힘', url: ''},

    {name: '참새', team: '나엘', primary: '민', url: ''},
    {name: '다래', team: '나엘', primary: '민', url: ''},
    {name: '아가멤논', team: '나엘', primary: '민', url: ''},
    {name: '적혈귀', team: '나엘', primary: '민', url: ''},
    {name: '나이샤', team: '나엘', primary: '민', url: ''},
    {name: '마젠다', team: '나엘', primary: '민', url: ''},
    {name: '실크', team: '나엘', primary: '민', url: ''},
    {name: '제르딘', team: '나엘', primary: '민', url: ''},
    {name: '티란데', team: '나엘', primary: '민', url: ''},
    {name: '가래', team: '나엘', primary: '민', url: ''},
    {name: '샤카-잔', team: '나엘', primary: '민', url: ''},
    {name: '나래', team: '나엘', primary: '민', url: ''},

    {name: '이레아', team: '나엘', primary: '지', url: ''},
    {name: '로칸', team: '나엘', primary: '지', url: ''},
    {name: '프로드', team: '나엘', primary: '지', url: ''},
    {name: '퓨리온', team: '나엘', primary: '지', url: ''},
    {name: '자이로스', team: '나엘', primary: '지', url: ''},
    {name: '엘딘', team: '나엘', primary: '지', url: ''},
    {name: '나즈그렐', team: '나엘', primary: '지', url: ''},
    {name: '페르다', team: '나엘', primary: '지', url: ''},
    {name: '멜쉬드', team: '나엘', primary: '지', url: ''},
    {name: '마누트', team: '나엘', primary: '지', url: ''},
    {name: '볼-진', team: '나엘', primary: '지', url: ''},

    {name: '세티어', team: '언데드', primary: '힘', url: ''},
    {name: '칸젤', team: '언데드', primary: '힘', url: ''},
    {name: '구르르', team: '언데드', primary: '힘', url: ''},
    {name: '브로켄 백작', team: '언데드', primary: '힘', url: ''},
    {name: '에일리언', team: '언데드', primary: '힘', url: ''},
    {name: '뮤턴트', team: '언데드', primary: '힘', url: ''},
    {name: '멀머던', team: '언데드', primary: '힘', url: ''},
    {name: '그롬 헬스크림', team: '언데드', primary: '힘', url: ''},
    {name: '킹죠', team: '언데드', primary: '힘', url: ''},
    {name: '솔-벤-하임', team: '언데드', primary: '힘', url: ''},
    {name: '조디악', team: '언데드', primary: '힘', url: ''},
    {name: '카르투스', team: '언데드', primary: '힘', url: ''},

    {name: '아그니', team: '언데드', primary: '민', url: ''},
    {name: '바이퍼', team: '언데드', primary: '민', url: ''},
    {name: '래퍼드', team: '언데드', primary: '민', url: ''},
    {name: '일리단', team: '언데드', primary: '민', url: ''},
    {name: '레이든', team: '언데드', primary: '민', url: ''},
    {name: '아카샤', team: '언데드', primary: '민', url: ''},
    {name: '레오닉', team: '언데드', primary: '민', url: ''},
    {name: '실바나스', team: '언데드', primary: '민', url: ''},
    {name: '리키안', team: '언데드', primary: '민', url: ''},
    {name: '로자미어', team: '언데드', primary: '민', url: ''},
    {name: '아크루라', team: '언데드', primary: '민', url: ''},
    {name: '줄-마란', team: '언데드', primary: '민', url: ''},

    {name: '니바스', team: '언데드', primary: '지', url: ''},
    {name: '레이디 데스', team: '언데드', primary: '지', url: ''},
    {name: '루시퍼', team: '언데드', primary: '지', url: ''},
    {name: '메두사', team: '언데드', primary: '지', url: ''},
    {name: '오블리', team: '언데드', primary: '지', url: ''},
    {name: '켈자드', team: '언데드', primary: '지', url: ''},
    {name: '아키로', team: '언데드', primary: '지', url: ''},
    {name: '악동', team: '언데드', primary: '지', url: ''},
    {name: '플루토', team: '언데드', primary: '지', url: ''},
    {name: '나카챠', team: '언데드', primary: '지', url: ''},
    {name: '칼리나스', team: '언데드', primary: '지', url: ''},
];

function setToday() {
    const date = new Date();
    const year = date.getFullYear();
    let month = String(date.getMonth() + 1);
    let day = String(date.getDate());
    if (month.length === 1) {
        month = "0" + month;
    }
    if (day.length === 1) {
        day = "0" + day;
    }
    const today = year + month + day;
    $("#date").val(today);
}

function getNow() {
    const date = new Date();
    const year = String(date.getFullYear()).substr(2);
    let month = String(date.getMonth() + 1);
    let day = String(date.getDate());
    let hour = String(date.getHours());
    let minute = String(date.getMinutes());
    let second = String(date.getSeconds());
    if (month.length === 1) {
        month = '0' + month;
    }
    if (day.length === 1) {
        day = '0' + day;
    }
    if (hour.length < 2) {
        hour = '0' + hour;
    }
    if (minute.length < 2) {
        minute = '0' + minute;
    }
    if (second.length < 2) {
        second = '0' + second;
    }
    return year + month + day + '.' + hour + ":" + minute + ":" + second;
}

function makeDateColumn(tr, day) {
    let td = $("<td>").appendTo(tr);
    td.html(day.date);
}

function makeSeqColumn(tr, seq) {
    let td = $("<td>").appendTo(tr);
    td.html(seq);
}

function redAndBold(td) {
    td.css('color', 'red');
    td.css('font-weight', 'bold');
}

function makePlayerColumn(tr, users, team, i) {
    let td = $("<td>").appendTo(tr);
    let player = users.filter(user => {
        if (team.players[i] === undefined) return false;
        return user.id === team.players[i].id;
    });
    if (player.length === 0) {
        td.html('');
        td = $("<td>").appendTo(tr);
        td.html('');
        td = $("<td>").appendTo(tr);
        td.html('');
        return;
    }
    //console.log(player);
    td.html(player[0].name);
    td = $("<td>").appendTo(tr);
    td.html(team.players[i].hero);
    td = $("<td>").appendTo(tr);
    td.html(team.result);
    if (team.result === '승') {
        redAndBold(td);
    }
}

function setBattlesOnEachDate(table, day, seq, users, match, i) {
    if (match.scourge.players[i].id === ''
        && match.sentinel.players[i].id === ''
    ) {
        return;
    }
    let tr = $("<tr>").appendTo(table);
    makeDateColumn(tr, day);
    makeSeqColumn(tr, seq);
    makePlayerColumn(tr, users, match.scourge, i);
    makePlayerColumn(tr, users, match.sentinel, i);
    return tr;
}

function makeTableHeaderForUser(table) {
    const fields = [
        {"text": "ID", "width": 100},
        {"text": "이름", "width": 100},
        {"text": "경기수", "width": 60},
        {"text": "승", "width": 50},
        {"text": "패", "width": 50},
        {"text": "무", "width": 50},
        {"text": "승률", "width": 100},
        {"text": "승점", "width": 50},
        {"text": "랭킹", "width": 50},
    ];

    let tr = $("<tr>").appendTo(table);
    setCssTableHeader(tr);
    fields.forEach(field => {
        let th = $("<th>").appendTo(tr);
        th.html(field.text);
        th.css({"width": field.width + "px"});
    });
}

function setCssTableHeader(tr) {
    tr.css('border-bottom', '3px double');
    tr.css('background-color', 'OldLace');
}

function makeTableHeader(table) {
    const fields = [
        {"text": "날짜", "width": 100},
        {"text": "번호", "width": 50},
        {"text": "플레이어", "width": 80},
        {"text": "영웅", "width": 100},
        {"text": "결과", "width": 50},
        {"text": "플레이어", "width": 80},
        {"text": "영웅", "width": 100},
        {"text": "결과", "width": 50}
    ];

    let tr = $("<tr>").appendTo(table);
    setCssTableHeader(tr);
    $.each(fields, function (index, field) {
        let th = $("<th>").appendTo(tr);
        th.html(field.text);
        th.css({"width": field.width + "px"});
    });
}

function makeTable(div) {
    let table;
    table = $(`<table class="table">`).appendTo(div);
    table.css({'border-collapse': 'collapse', 'border': '1px gray solid', 'margin': 'auto'});
    return table;
}

function setOptionsForPlayerSelector(users, selector) {
    users.forEach(user => {
        const option = document.createElement('option');
        option.value = user.id;
        option.text = user.name + ":" + user.id;
        selector.append(option);
    });
    selector.val('');
    selector.trigger('change');
}

function setOptionsForAllPlayerSelectors(users) {
    setOptionsForPlayerSelector(users, $('#player0'));
    setOptionsForPlayerSelector(users, $('#player1'));
    setOptionsForPlayerSelector(users, $('#player2'));
    setOptionsForPlayerSelector(users, $('#player3'));
    setOptionsForPlayerSelector(users, $('#player4'));
    setOptionsForPlayerSelector(users, $('#player5'));
    setOptionsForPlayerSelector(users, $('#player6'));
    setOptionsForPlayerSelector(users, $('#player7'));
    setOptionsForPlayerSelector(users, $('#player8'));
    setOptionsForPlayerSelector(users, $('#player9'));
}

function setOptionsForChampionSelector(selector) {
    champions.forEach(champion => {
        const option = document.createElement('option');
        option.value = champion.name;
        option.text = champion.name + ":" + champion.primary + ":" + champion.team;
        selector.append(option);
    });
    selector.val('');
    selector.trigger('change');
}

function setOptionsForAllChampionSelectors() {
    setOptionsForChampionSelector($('#hero0'));
    setOptionsForChampionSelector($('#hero1'));
    setOptionsForChampionSelector($('#hero2'));
    setOptionsForChampionSelector($('#hero3'));
    setOptionsForChampionSelector($('#hero4'));
    setOptionsForChampionSelector($('#hero5'));
    setOptionsForChampionSelector($('#hero6'));
    setOptionsForChampionSelector($('#hero7'));
    setOptionsForChampionSelector($('#hero8'));
    setOptionsForChampionSelector($('#hero9'));
}

function setOptionsForStatusSelector(selector) {
    status.forEach(value => {
        const option = document.createElement('option');
        option.value = value;
        option.text = value;
        selector.append(option);
    });
}

function setOptionsForAllStatusSelectors() {
    setOptionsForStatusSelector($('#stat0'));
    setOptionsForStatusSelector($('#stat1'));
    setOptionsForStatusSelector($('#stat2'));
    setOptionsForStatusSelector($('#stat3'));
    setOptionsForStatusSelector($('#stat4'));
    setOptionsForStatusSelector($('#stat5'));
    setOptionsForStatusSelector($('#stat6'));
    setOptionsForStatusSelector($('#stat7'));
    setOptionsForStatusSelector($('#stat8'));
    setOptionsForStatusSelector($('#stat9'));
}

// select2 for selecting champion
$(document).ready(function () {
    $('.player').select2({
        id: '',
        placeholder: '플레이어',
    });
    $('.champion').select2({
        id: '',
        placeholder: '영웅',
    });
    $('.stat').select2();
});

function replaceAll(str, searchStr, replaceStr) {
    return str.split(searchStr).join(replaceStr);
}

function getGamesThatUserJoined(games, user) {
    return games.flatMap(day => {
        return day.matches.map(match => {
            //console.log(JSON.stringify(match.scourge.players));
            //console.log(JSON.stringify(match.sentinel.players));
            const scourgeResult = match.scourge.players.filter(player => player.id === user.id);
            const sentinelResult = match.sentinel.players.filter(player => player.id === user.id);
            if (scourgeResult.length > 0) {
                return match.scourge.result;
            }
            if (sentinelResult.length > 0) {
                return match.sentinel.result;
            }
            return "";
        });
    });
}

function getUserDataWithGameHistory(games, user) {
    const userGames = getGamesThatUserJoined(games, user);
    //console.log(`check userGames result : ${userGames}`);
    const userBattles = userGames.filter(result => result !== "").length;
    const userWins = userGames.filter(result => result === "승").length;
    const userLoses = userGames.filter(result => result === "패").length;
    const userDraws = userGames.filter(result => result === "무").length;
    let userWinRate = (userBattles - userDraws) === 0 ? 0 : userWins / (userBattles - userDraws);
    userWinRate = Math.floor(userWinRate * 100) + "%";
    return {
        id: user.id, name: user.name,
        battles: userBattles, wins: userWins, loses: userLoses, draws: userDraws,
        rate: userWinRate, point: userWins - userLoses
    };
}

function getUsersWithHistory(users, games) {
    const usersWithHistory = [];
    users.forEach(user => {
        let userWithHistory = getUserDataWithGameHistory(games, user);
        usersWithHistory.push(userWithHistory);
    });
    usersWithHistory.sort(function (a, b) {
        if (a.point === b.point) {
            return b.rate - a.rate;
        }
        return b.point - a.point;
    });
    return usersWithHistory;
}

function makeTableForUser(table, users, games) {
    const usersWithHistory = getUsersWithHistory(users, games);
    let index = 0, sameResult = 0;
    let prevUser, td, tr;
    usersWithHistory.forEach(user => {
        console.log(`user:${JSON.stringify(user)}`);
        tr = $("<tr>").appendTo(table);
        td = $("<td>").appendTo(tr);
        td.html(user.id);
        td = $("<td>").appendTo(tr);
        td.html(user.name);
        td = $("<td>").appendTo(tr);

        td.html(user.battles); // 경기수
        td = $("<td>").appendTo(tr);
        td.html(user.wins); // 승
        td = $("<td>").appendTo(tr);
        td.html(user.loses); // 패
        td = $("<td>").appendTo(tr);
        td.html(user.draws); // 무
        td = $("<td>").appendTo(tr);
        td.html(user.rate); // 승률
        td = $("<td>").appendTo(tr);
        td.html(user.point); // 승점
        td = $("<td>").appendTo(tr);
        if (prevUser !== undefined
            && user.point === prevUser.point
            && user.rate === prevUser.rate) {
            sameResult++;
            td.html(index);
        } else {
            index = index + 1 + sameResult;
            td.html(index); // 랭킹
            sameResult = 0;
        }
        if (index === 1) {
            redAndBold(td);
        }
        prevUser = user;
    });
}

function makeTableForBattleHistory(games, table, users) {
    let seq = 0, tr, day = 0;
    games.sort(function (a, b) {
        return b.date - a.date;
    });
    games.forEach(date => {
        seq += date.matches.length;
    });
    $.each(games, function (index, date) {
        day++;
        date.matches.forEach(match => {
            console.log(`length:${match.scourge.players.length}, match:${JSON.stringify(match)}`);
            const length = Math.max(match.scourge.players.length, match.sentinel.players.length);
            for (let i = 0; i < length; i++) {
                tr = setBattlesOnEachDate(table, date, seq, users, match, i);
                if (day % 2 === 0) {
                    tr.css('background-color', 'MintCream');
                } else {
                    tr.css('background-color', 'Beige');
                }
            }
            tr.css('border-bottom', '2px solid black');
            seq--;
        });
    });
}

function getFilteredGames(games) {
    games.forEach(day => {
        day.matches.forEach(match => {
            match.scourge.players = match.scourge.players.filter(player => player.id !== '' && player.id !== null);
            match.sentinel.players = match.sentinel.players.filter(player => player.id !== '' && player.id !== null);
        });
        day.matches = day.matches.filter(match => match.scourge.players.length > 0 && match.sentinel.players.length > 0);
    });
    games = games.filter(day => day.matches.length > 0);
    return games;
}

function getGamesFromDb(querySnapshot) {
    querySnapshot.forEach((doc) => {
        //console.log(`${doc.id} => ${doc.data()}`);
        let day = {
            date: doc.id,
            matches: doc.data().matches
        };
        games.push(day);
    });
}

function getUsersFromDb(querySnapshot) {
    querySnapshot.forEach((doc) => {
        //console.log(`${doc.id} => ${doc.data()}`);
        let user = {
            id: doc.id,
            name: doc.data().name
        };
        users.push(user);
    });
}

function showRandomResult(randoms) {
    let prevDate = getNow();
    let count = 0, isFirst = true;
    const randomResult = $('#randomResult');
    randoms.forEach(random => {
        count++;
        if (count === 1) {
            prevDate = random.date;
        }
        if (prevDate !== random.date) {
            prevDate = random.date;
            if (isFirst) {
                randomResult.html(`<span style="background-color: lightyellow">${randomResult.html()}</span>`);
                isFirst = false;
            }
            randomResult.append('---------------------------------------------------------<br>');
        }
        randomResult.append(`${random.date} ${random.name}(${random.id}) -> ${random.result}` + '<br>');
    });
}

db.collection('randoms').orderBy('date', 'desc').get().then((querySnapshot) => {
    let randoms = [];
    querySnapshot.forEach((doc) => {
        //console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);
        randoms.push(doc.data());
    });
    showRandomResult(randoms);

    db.collection('games').get().then((querySnapshot) => {
        getGamesFromDb(querySnapshot);
        db.collection('users').get().then((querySnapshot) => {
            getUsersFromDb(querySnapshot);

            games = getFilteredGames(games);
            console.log(`filtered games:${JSON.stringify(games)}`);

            setToday();
            setOptionsForAllPlayerSelectors(users);
            setOptionsForAllChampionSelectors();
            setOptionsForAllStatusSelectors();

            let table = makeTable($(".users"));
            makeTableHeaderForUser(table);
            makeTableForUser(table, users, games);

            let divBattles = $(".battles");
            $("<h3>일자별 전적</h3>").appendTo(divBattles);
            table = makeTable(divBattles);
            makeTableHeader(table);
            makeTableForBattleHistory(games, table, users);
        });
    });
});

function putGame() {
    console.log('putGame is called');
    const players = [
        $('#player0'), $('#player1'), $('#player2'), $('#player3'), $('#player4'),
        $('#player5'), $('#player6'), $('#player7'), $('#player8'), $('#player9')
    ];
    const heroes = [
        $('#hero0'), $('#hero1'), $('#hero2'), $('#hero3'), $('#hero4'),
        $('#hero5'), $('#hero6'), $('#hero7'), $('#hero8'), $('#hero9')
    ];

    const date = $('#date').val();
    const result = $("input[name='result']:checked").val();
    //const result = $('#result').val();
    let scourge = [];
    let sentinel = [];
    let i = 0;
    players.forEach(player => {
        if (player.val() === '' || player.val() === null || player.val() === undefined
            || heroes[i].val() === '' || heroes[i].val() === null || heroes[i].val() === undefined) {
            i++;
            return;
        }
        if (i < 5) {
            scourge.push({id: player.val(), hero: heroes[i++].val()});
        } else {
            sentinel.push({id: player.val(), hero: heroes[i++].val()});
        }
    });
    console.log(`result=${result}`);
    console.log(`scourge=${scourge}`);
    console.log(`sentinel=${sentinel}`);
    if (scourge.length === 0 || sentinel.length === 0) {
        alert('전적을 입력하세요');
        return;
    }
    const game = {
        scourge: {
            players: scourge,
            result: result === 'scourge' ? "승" : result === 'sentinel' ? "패" : "무",
            score: result === 'scourge' ? 100 : 0
        },
        sentinel: {
            players: sentinel,
            result: result === 'sentinel' ? "승" : result === 'scourge' ? "패" : "무",
            score: result === 'sentinel' ? 100 : 0
        }
    };
    db.collection('games').doc(date).get().then(doc => {
        if (doc.exists) {
            const matches = doc.data().matches;
            matches.push(game);
            db.collection('games').doc(date).set({"matches": matches});
            console.log(`game data is added ${matches}`);
        } else {
            db.collection('games').doc(date).set({"matches": [game]});
        }
        alert('전적 입력 완료');
    });
    /*const table = $(".battles").children('.table');
    table*/
}

function getRandom() {
    const players = [
        $('#player0'), $('#player1'), $('#player2'), $('#player3'), $('#player4'),
        $('#player5'), $('#player6'), $('#player7'), $('#player8'), $('#player9')
    ];
    const heroes = [
        $('#hero0'), $('#hero1'), $('#hero2'), $('#hero3'), $('#hero4'),
        $('#hero5'), $('#hero6'), $('#hero7'), $('#hero8'), $('#hero9')
    ];
    const status = [
        $('#stat0'), $('#stat1'), $('#stat2'), $('#stat3'), $('#stat4'),
        $('#stat5'), $('#stat6'), $('#stat7'), $('#stat8'), $('#stat9')
    ];

    let index = 0;
    db.collection('users').get().then((querySnapshot) => {
        let users = [];
        querySnapshot.forEach((doc) => {
            console.log(`${doc.id} => ${doc.data()}`);
            let user = {
                id: doc.id,
                name: doc.data().name
            };
            users.push(user);
        });
        $('#randomResult').prepend('---------------------------------------------------------<br>');
        let count = 0;
        players.forEach(player => {
            console.log(`getRandom index:${index} player:${player.val()} status:${status[index].val()}`);
            if (player.val() === '' || player.val() === undefined || player.val() === null) {
                index++;
                return;
            }
            count++;
            let filteredChampions = status[index].val() === 'All' ? champions : champions.filter(champion => champion.primary === status[index].val());
            let rangeMax = status[index].val() === 'All' ? 70 : status[index].val() === '지' ? 22 : 24;
            let random = Math.floor((Math.random() * rangeMax));
            console.log(`random:${random} filtered:${JSON.stringify(filteredChampions)}`);
            heroes[index].val(filteredChampions[random].name);
            heroes[index].trigger('change');
            console.log(`getRandom index:${index} random:${random} hero:${filteredChampions[random].name}`);
            const date = $('#date').val();

            let user = users.find(user => user.id === player.val());
            let result = {date: getNow(), name: user.name, id: player.val(), result: heroes[index].val()};
            db.collection('randoms').add(result);
            $('#randomResult').prepend(`<span style="background-color: #ffeeff">${result.date} ${result.name}(${result.id}) -> ${result.result}</span><br>`);
            index++;
        });
        if (count === 0) {
            alert('플레이어를 선택하세요');
        } else {
            alert('랜덤 생성 완료!');
        }
    });
}