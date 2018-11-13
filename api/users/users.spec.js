const should = require('should');
const request = require('supertest');
const app = require('../../app');
const syncDatabase = require('../../bin/sync-database');
const models = require('../../models/models');

describe('TEST /api/users', () => {
    describe('PUT /users/:id', () => {
        it('should return 200 status code', (done) => {
            request(app)
                .put('/api/users/1')
                .send({
                    name: 'foo',
                    userId: 'fooId'
                })
                .end((err, res) => {
                    if (err) throw err;
                    done();
                });
        });
    });

    describe('GET /api/users', () => {
        before('sync database', (done) => {
            syncDatabase().then(() => done());
        });

        const users = [
            {name: 'alice', userId: 'aliceId'},
            {name: 'bek', userId: 'bekId'},
            {name: 'chris', userId: 'chrisId'}
        ];
        before('insert 3 users into database', (done) => {
            models.User.bulkCreate(users).then(() => done());
        });

        after('clear up database', (done) => {
            syncDatabase().then(() => done());
        });

        it('get should return 200 status code', (done) => {
            request(app)
                .get('/api/users')
                .expect(200)
                .end((err, res) => {
                    if (err) throw err;
                    done();
                })
        });

        it('get should return array', (done) => {
            request(app)
                .get('/api/users')
                .expect(200)
                .end((err, res) => {
                    if (err) throw err;
                    res.body.should.be.an.instanceOf(Array);
                    res.body.map(user => {
                        user.should.have.properties('id', 'name', 'userId');
                        user.id.should.be.a.Number();
                        user.name.should.be.a.String();
                        user.userId.should.be.a.String();
                    });
                    done();
                });
        });

        it('get should return 200 status code and has a user', (done) => {
            request(app)
                .get('/api/users/2')
                .expect(200)
                .end((err, res) => {
                    if (err) throw err;
                    res.body.should.be.an.instanceOf(Object);
                    res.body.should.have.properties('id', 'name', 'userId');
                    done();
                })
        });

        it('get should return 404 status code', (done) => {
            request(app)
                .get('/api/users/aaa')
                .expect(404)
                .end((err, res) => {
                    if (err) throw err;
                    done();
                })
        });

        it('get should return 404 status code', (done) => {
            request(app)
                .get('/api/users/4000aa')
                .expect(404)
                .end((err, res) => {
                    res.body.error.should.be.equal('No user');
                    if (err) throw err;
                    done();
                })
        });

        it('delete should return 204 status code', (done) => {
            request(app)
                .delete('/api/users/1')
                .expect(204)
                .end((err, res) => {
                    if (err) throw err;
                    done();
                })
        });

        it('post should return 201 created status code', (done) => {
            request(app)
                .post('/api/users')
                .send('name=daniel')
                .expect(201)
                .end((err, res) => {
                    if (err) throw err;
                    done();
                })
        })
    });
});

