const should = require('should');
const request = require('supertest');
const app = require('../../app');
const syncDatabase = require('../../bin/sync-database');
const models = require('../../models/models');

describe('TEST /api/games', () => {
    describe('PUT /games/:id', () => {
        it('should return 200 status code', (done) => {
            request(app)
                .put('/api/games/1')
                .send({
                    name: 'foo'
                })
                .end((err, res) => {
                    if (err) throw err;
                    done();
                });
        });
    });

    describe('GET /api/games', () => {
        before('sync database', (done) => {
            syncDatabase().then(() => done());
        });

        const games = [
            {game: JSON.parse('{"date":"20181112","sequence":"1","scourge":{"result":"승","score":100,"heroes":[{"player":"김문호","playerId":"muno","hero":"스벤"},{"player":"장창우","playerId":"blu","hero":"나즈그렐"}]},"sentinel": {"result":"패","score":0,"heroes":[{"player":"구남도","playerId":"namzzok","hero":"실크"},{"player":"홍재권","playerId":"hjk","hero":"갈리토스"}]}}')},
            {game: JSON.parse('{"date":"20181112","sequence":"2","scourge":{"result":"승","score":100,"heroes":[{"player":"김문호","playerId":"muno","hero":"아가멤논"},{"player":"장창우","playerId":"blu","hero":"우서"}]},"sentinel": {"result":"패","score":0,"heroes":[{"player":"구남도","playerId":"namzzok","hero":"나이샤"},{"player":"홍재권","playerId":"hjk","hero":"탈론"}]}}')},
            {game: JSON.parse('{"date":"20181112","sequence":"3","scourge":{"result":"승","score":100,"heroes":[{"player":"로칸","playerId":"hjk","hero":"로칸"},{"player":"김성율","playerId":"yul2ya","hero":"마누트"}]},"sentinel": {"result":"패","score":0,"heroes":[{"player":"김윤규","playerId":"nanun","hero":"킹죠"},{"player":"김문호","playerId":"muno","hero":"나이샤"}]}}')}
        ];

        before('insert 3 games into database', (done) => {
            models.Game.bulkCreate(games).then(() => done());
        });

        /*after('clear up database', (done) => {
            syncDatabase().then(() => done());
        });*/

        it('get should return 200 status code', (done) => {
            request(app)
                .get('/api/games')
                .expect(200)
                .end((err, res) => {
                    if (err) throw err;
                    done();
                })
        });

        it('get should return array', (done) => {
            request(app)
                .get('/api/games')
                .expect(200)
                .end((err, res) => {
                    if (err) throw err;
                    res.body.should.be.an.instanceOf(Array);
                    res.body.map(game => {
                        game.should.be.a.Object();
                    });
                    done();
                });
        });

        it('get should return 200 status code and has a game', (done) => {
            request(app)
                .get('/api/games/2')
                .expect(200)
                .end((err, res) => {
                    if (err) throw err;
                    res.body.should.be.an.instanceOf(Object);
                    res.body.game.should.be.an.Object()
                    res.body.game.date.should.be.a.String();
                    done();
                })
        });

        it('get should return 404 status code', (done) => {
            request(app)
                .get('/api/games/aaa')
                .expect(404)
                .end((err, res) => {
                    if (err) throw err;
                    done();
                })
        });

        it('get should return 404 status code', (done) => {
            request(app)
                .get('/api/games/4000aa')
                .expect(404)
                .end((err, res) => {
                    res.body.error.should.be.equal('No game');
                    if (err) throw err;
                    done();
                })
        });

        it('delete should return 204 status code', (done) => {
            request(app)
                .delete('/api/games/1')
                .expect(204)
                .end((err, res) => {
                    if (err) throw err;
                    done();
                })
        });

        const data = JSON.parse('{"date":"20181112","sequence":"1","scourge":{"result":"승","score":100,"heroes":[{"player":"김문호","playerId":"muno","hero":"스벤"},{"player":"장창우","playerId":"blu","hero":"나즈그렐"}]},"sentinel": {"result":"패","score":0,"heroes":[{"player":"구남도","playerId":"namzzok","hero":"실크"},{"player":"홍재권","playerId":"hjk","hero":"갈리토스"}]}}');
        it('post should return 201 created status code', (done) => {
            request(app)
                .post('/api/games')
                .set('Content-Type', 'application/json')
                .send({game: JSON.stringify(data)})
                .expect(201)
                .end((err, res) => {
                    if (err) throw err;
                    done();
                })
        })
    });
});

