const express = require('express');
const router = express.Router();

const firebase = require('firebase-admin');
const config = {
    apiKey: "AIzaSyD2RicG0k0M6DioaAKgcxx5daHynAkk4ag",
    authDomain: "ykachaos.firebaseapp.com",
    databaseURL: "https://ykachaos.firebaseio.com",
    storageBucket: "ykachaos.appspot.com"
};
const firebaseApp = firebase.initializeApp(config);
const database = firebase.database();
const db = firebase.firestore(firebaseApp);

/* GET users listing. */
router.get('/', function (req, res, next) {
    let arrayGames = [];
    let arrayUsers = [];
    let gamesCollection, usersCollection;
    db.getCollections().then(collections => {
        collections.forEach(collection => {
            console.log('Found collection with id:', collection.id);
            if (collection.id === 'games') {
                gamesCollection = collection;
            }
            if (collection.id === 'users') {
                usersCollection = collection;
            }
        });
        usersCollection.get().then(usersSnapshot => {
            usersSnapshot.forEach(usersDoc => {
                console.log(usersDoc.id, '=>', usersDoc.data());
                let user = {
                    id: usersDoc.id,
                    name: usersDoc.data().name
                };
                arrayUsers.push(user);
            });
        });
        gamesCollection.get().then(gamesSnapshot => {
            gamesSnapshot.forEach(gamesDoc => {
                console.log(gamesDoc.id, '=>', gamesDoc.data());
                let day = {
                    date: gamesDoc.id,
                    matches: gamesDoc.data().matches
                };
                arrayGames.push(day);
            });
            console.log('=======arrayUsers');
            console.log(arrayUsers);
            const users = JSON.stringify(arrayUsers);
            console.log('=======users');
            console.log(users);
            console.log('=======arrayGames');
            console.log(arrayGames);
            const games = JSON.stringify(arrayGames);
            console.log('=======games');
            console.log(games);
            const output = `
        <!DOCTYPE html>
        <head>
            <meta charset="utf-8">
            <title> yka chaos </title>
            <style>
                div {
                    margin-left: 30px;
                }
                th, td {
                    text-align: center;
                    border: 1px gray solid;
                }
            </style>
            <script src="https://code.jquery.com/jquery-1.12.4.min.js"
                    integrity="sha256-ZosEbRLbNQzLpnKIkEdrPv7lOy9C27hHQ+Xp8a4MxAQ="
                    crossorigin="anonymous"></script>
            <script src="https://cdn.jsdelivr.net/npm/htmlson.js@1.0.4/src/htmlson.js"></script>
            <script>
                        
                window.onload = function () {            
                    const body = $("#body");
                    const title = $("<br><h1>Yka Chaos Battle History</h1><br><h3>Player별 전적</h3>").appendTo(body);
                    
                    const games = JSON.parse('${games}');
                    const users = JSON.parse('${users}');
                    console.log(games);
                    console.log(users);
                    body.append(JSON.stringify(games));
                    body.append(JSON.stringify(users));
                    
                    $("<br><h3>일자별 전적</h3>").appendTo(body);          
                                
                    let table = $("<table>").appendTo(body);
                    table.css({"border-collapse": "collapse", "border": "1px gray solid"});
        
                    const fields = [
                        {"text": "날짜", "width": 100},
                        {"text": "번호", "width": 50},
                        {"text": "플레이어", "width": 100},
                        {"text": "영웅", "width": 100},
                        {"text": "결과", "width": 100},
                        {"text": "플레이어", "width": 100},
                        {"text": "영웅", "width": 100},
                        {"text": "결과", "width": 100}
                    ];
                    
                    let tr, th, td;
                    tr = $("<tr>").appendTo(table);            
                    $.each(fields, function (index, field) {
                        th = $("<th>").appendTo(tr);
                        th.html(field.text);
                        th.css({"width": field.width + "px"});
                    });
                    
                    let seq = 0;
                    let player;
                    $.each(games, function (index, day) {
                        day.matches.forEach(match => {
                            console.log(match);
                            console.log("length:");
                            console.log(match.scourge.players.length);
                            seq++;
                            for (let i=0; i<match.scourge.players.length; i++) {
                                tr = $("<tr>").appendTo(table);
                                td = $("<td>").appendTo(tr);
                                td.html(day.date);
                                td = $("<td>").appendTo(tr);
                                td.html(seq);
                                td = $("<td>").appendTo(tr);
                                player = users.filter(user => {
                                    return user.id === match.scourge.players[i].id;
                                });
                                console.log(player);
                                td.html(player[0].name);
                                td = $("<td>").appendTo(tr);
                                td.html(match.scourge.players[i].hero);
                                td = $("<td>").appendTo(tr);
                                td.html(match.scourge.result);
                                td = $("<td>").appendTo(tr);
                                player = users.filter(user => {
                                    return user.id === match.sentinel.players[i].id;
                                });
                                console.log(player);
                                td.html(player[0].name);                        
                                td = $("<td>").appendTo(tr);
                                td.html(match.sentinel.players[i].hero);
                                td = $("<td>").appendTo(tr);
                                td.html(match.sentinel.result);
                            }
                        });
                    });
                }
                
            </script>
        </head>
        <body>
            <div id="body"></div>    
        </body>`;
            res.send(output);
        });
    });
});

module.exports = router;
