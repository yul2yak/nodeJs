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
        th, td {
            text-align: center;
            border: 1px gray solid;
        }
    </style>
    <script src="https://code.jquery.com/jquery-1.12.4.min.js"
            integrity="sha256-ZosEbRLbNQzLpnKIkEdrPv7lOy9C27hHQ+Xp8a4MxAQ="
            crossorigin="anonymous"></script>
    <script>
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
        
        let data = [];
        
        const rawData = JSON.parse('${strGames}');
        for (let i=0; i<rawData.length; i++) {
            data.push(rawData[i].game);
        }
        
        window.onload = function () {            
            var tree = $("#tree");
            var header = $("<br><h1>Yka Chaos Battle History</h1><br>").appendTo(tree);
            var table = $("<table>").appendTo(tree);
            table.css({"border-collapse": "collapse", "border": "1px gray solid"});

            var tr = $("<tr>").appendTo(table);//.appendTo(div);
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


            /*$.each(data, function (index, row) {
                var tr = $("<tr>").appendTo(table);
                $.each(option, function (i, fieldInfo) {
                    var td = $("<td>").appendTo(tr);
                    td.html(row[fieldInfo.field]);
                    td.css({"width": fieldInfo.width + "px", "border": "1px gray solid"});
                });
            });*/
        }
    </script>
</head>

<div id="tree"></div>`;

        res.send(output);
    });
});

module.exports = router;
