var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
    require('../models/models').Game.findAll({raw: true}).then(games => {
        var strGames = JSON.stringify(games);
        var output = `
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
        class User {
            constructor(name) {
                this.name = name;
                this.battles = 0;
                this.win = 0;
                this.lose = 0;
                this.draw = 0;
            }
            get getPoint() {
                    return this.win - this.lose;
            }
            get getRate() {
                if ((this.battles - this.draw) !== 0) {
                    return this.win/(this.battles - this.draw)*100;
                } else {
                    return 0;
                }
            }
            set setResult(result) {
                if (result === "승") this.win++;
                else if (result === "패") this.lose++;
                else this.draw++;
                this.battles++;                
            }
        }
        
        let data = [];
        let userData = [];
        userData.push(new User('김성율'));
        userData.push(new User('장창우'));
        userData.push(new User('홍재권'));
        userData.push(new User('김문호'));
        userData.push(new User('김윤규'));
        userData.push(new User('구남도'));
        
        const rawData = JSON.parse('${strGames}');
        for (let i=0; i<rawData.length; i++) {
            data.push(rawData[i].game);            
        }
        
        data.forEach( function(game, index) {
           game.scourge.heroes.forEach( function(hero, i) {
               let player = userData.filter(function(user) {
                   if (user.name !== hero.player) return;
                   console.log(user);
                   user.setResult = game.scourge.result;   
               });               
           });
           game.sentinel.heroes.forEach( function(hero, i) {
               let player = userData.filter(function(user) {
                   if (user.name !== hero.player) return;
                   console.log(user);
                   user.setResult = game.sentinel.result;   
               });               
           });
        });
        
        
        window.onload = function () {            
            var body = $("#body");
            var header = $("<br><h1>Yka Chaos Battle History</h1><br><h3>Player별 전적</h3>").appendTo(body);
            var summaryTable = $("<table>").appendTo(body);
            summaryTable.css({"border-collapse": "collapse", "border": "1px gray solid"});
            const headerRowTitle = [
                {"text": "플레이어", "width": 70},
                {"text": "경기수", "width": 50},
                {"text": "승", "width": 50},
                {"text": "패", "width": 50},
                {"text": "무", "width": 50},
                {"text": "승점", "width": 50},
                {"text": "승률", "width": 50},
                {"text": "랭킹", "width": 50}
            ];
            const headerRow = $("<tr>").appendTo(summaryTable);
            $.each(headerRowTitle, function (index, field) {
                var th = $("<th>").appendTo(headerRow);
                th.html(field.text);
                th.css({"width": field.width + "px"});
            });
            
            userData.sort(function(a, b) {
                if (a.getPoint === b.getPoint) 
                    return b.getRate - a.getRate;
                /*console.log('for sort');
                console.log(a);
                console.log(b);*/
                return b.getPoint - a.getPoint; 
            });
            
            userData.forEach( function(user, index) {                
                let tr;
                let td;
                tr = $("<tr>").appendTo(summaryTable);
                td = $("<td>").appendTo(tr);
                td.html(user.name);
                td = $("<td>").appendTo(tr);
                td.html(user.battles);
                td = $("<td>").appendTo(tr);
                td.html(user.win);
                td = $("<td>").appendTo(tr);
                td.html(user.lose);
                td = $("<td>").appendTo(tr);
                td.html(user.draw);
                td = $("<td>").appendTo(tr);
                td.html(user.getPoint);
                td = $("<td>").appendTo(tr);
                td.html(user.getRate.toFixed(0) + "%");
                td = $("<td>").appendTo(tr);
                td.html(index+1);
                console.log(user);
                console.log(user.name);
                console.log('-------');
            });
            $("<br><h3>일자별 전적</h3>").appendTo(body);
            
            var table = $("<table>").appendTo(body);
            table.css({"border-collapse": "collapse", "border": "1px gray solid"});

            var fields = [
                {"text": "날짜", "width": 100},
                {"text": "번호", "width": 50},
                {"text": "플레이어", "width": 100},
                {"text": "영웅", "width": 100},
                {"text": "결과", "width": 100},
                {"text": "플레이어", "width": 100},
                {"text": "영웅", "width": 100},
                {"text": "결과", "width": 100}
            ];
            
            var tr = $("<tr>").appendTo(table);
            $.each(fields, function (index, field) {
                var th = $("<th>").appendTo(tr);
                th.html(field.text);
                th.css({"width": field.width + "px"});
            });

            $.each(data, function (index, game) {
                let tr;
                let td;
                let j;
                for (i = 0; i < game.scourge.heroes.length; i++) {
                    j = 0;
                    tr = $("<tr>").appendTo(table);
                    td = $("<td>").appendTo(tr);
                    td.html(game.date);
                    td.css({"width": fields[j++].width + "px"});
                    td = $("<td>").appendTo(tr);
                    td.html(game.sequence);
                    td.css({"width": fields[j++].width + "px"});

                    td = $("<td>").appendTo(tr);
                    td.html(game.scourge.heroes[i].player);
                    td.css({"width": fields[j++].width + "px"});
                    td = $("<td>").appendTo(tr);
                    td.html(game.scourge.heroes[i].hero);
                    td.css({"width": fields[j++].width + "px"});
                    td = $("<td>").appendTo(tr);
                    td.html(game.scourge.result);
                    td.css({"width": fields[j++].width + "px"});

                    td = $("<td>").appendTo(tr);
                    td.html(game.sentinel.heroes[i].player);
                    td.css({"width": fields[j++].width + "px"});
                    td = $("<td>").appendTo(tr);
                    td.html(game.sentinel.heroes[i].hero);
                    td.css({"width": fields[j++].width + "px"});
                    td = $("<td>").appendTo(tr);
                    td.html(game.sentinel.result);
                    td.css({"width": fields[j++].width + "px"});
                }
            });
        }
        
    </script>
</head>
<body>
    <div id="body"></div>    
</body>
`;

        res.send(output);
    });
});

module.exports = router;
