import * as sinon from 'sinon';
import * as chai from 'chai';
import { app } from '../app';

import { Response } from 'superagent';
// @ts-ignore
import chaiHttp = require('chai-http');


chai.use(chaiHttp);

const { expect } = chai;

describe('/login ', () => {

  let chaiHttpResponse: Response;

  it('verifica se enviar um login certo, retorna um objeto e o status 200', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .post("/login")
      .send({
        email: 'user@user.com',
        password: 'secret_user'
      })
    expect(chaiHttpResponse.body).to.be.an('object');
    expect(chaiHttpResponse.body).to.have.all.keys('user', 'token');
    expect(chaiHttpResponse).to.have.status(200);
  });

  it('verifica se enviar um login sem senha, retorna uma mensagem de erro e o status 400', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .post("/login")
      .send({
        email: 'user@user.com',
      })

    expect(chaiHttpResponse.body).to.be.an('object');
    expect(chaiHttpResponse.body).to.not.have.all.keys('user', 'token');
    expect(chaiHttpResponse.body).to.have.keys('message');
    expect(chaiHttpResponse.body.message).to.equal('All fields must be filled');
    expect(chaiHttpResponse).to.have.status(400);
  });

  it('verifica se enviar um login sem email, retorna uma mensagem de erro e o status 400', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .post("/login")
      .send({
        password: 'secret_user'
      })
    expect(chaiHttpResponse.body).to.be.an('object');
    expect(chaiHttpResponse.body).to.not.have.all.keys('user', 'token');
    expect(chaiHttpResponse.body).to.have.keys('message');
    expect(chaiHttpResponse.body.message).to.equal('All fields must be filled');
    expect(chaiHttpResponse).to.have.status(400);
  });
  it('verifica se enviar um login errado, retorna uma mensagem de erro e o status 401', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .post("/login")
      .send({
        email: 'user@usaer.com',
        password: 'secret_user'
      })
    expect(chaiHttpResponse.body).to.be.an('object');
    expect(chaiHttpResponse.body).to.not.have.all.keys('user', 'token');
    expect(chaiHttpResponse.body).to.have.keys('message');
    expect(chaiHttpResponse.body.message).to.equal('Incorrect email or password');
    expect(chaiHttpResponse).to.have.status(401);
  });
})


describe('/login/validate ', () => {

  let chaiHttpResponse: Response;

  it('verifica se enviar um login certo, retorna um objeto e o status 200', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .post("/login")
      .send({
        email: 'user@user.com',
        password: 'secret_user'
      })
    chaiHttpResponse = await chai
      .request(app)
      .get('/login/validate')
      .set('Authorization', chaiHttpResponse.body.token)


    expect(chaiHttpResponse.body).to.be.an('string');
    expect(chaiHttpResponse.body).to.equals('user');
    expect(chaiHttpResponse).to.have.status(200);
  });

})
