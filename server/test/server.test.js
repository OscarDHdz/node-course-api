const expect    = require('expect'   );
const request = require('supertest');

const {app}  = require('./../server');
const {Todo} = require('../models/todo');

const todosConst = [{
  text: 'First test todo'
}, {
  text: 'Second test todo'
}]

// Run before each test case
beforeEach((done) => {
  Todo.remove({}).then(() => {
    return Todo.insertMany(todosConst);
  }).then(() => done());
})

describe('POST /todos', () => {

  it('Should create a new todo', (done) => {
    var text = 'Test todo text';

    request(app)
      .post('/todos')
      .send({text})
      .expect(200)
      .expect((res) => {
        expect(res.body.text).toBe(text);
      })
      .end((err, res) => {
        if ( err ) {
          return done(err);
        }
        Todo.find({
          _id: res.body._id
        }).then((todos) => {
          expect(todos.length).toBe(1);
          expect(todos[0].text).toBe(text);
          done();
        }).catch((e) => done(e));
      });
  });

  it('Should not create todo with invalid body data', (done) => {
    request(app)
      .post('/todos')
      .send({
        // Text Missing
      })
      .expect(400)
      .end((err, res) => {
        if ( err ) {
          return done(err);
        }

        Todo.find().then((todos) => {
            expect(todos.length).toBe(todosConst.length);
            done();
        }).catch((e) => done(e));

      })
  });

})

describe('GET /todos', () => {
  it('Should get all todos', (done) => {
    request(app)
      .get('/todos')
      .expect(200)
      .expect((res) => {
        expect(res.body.todos.length).toBe(todosConst.length);
      })
      .end(done)
  })
})