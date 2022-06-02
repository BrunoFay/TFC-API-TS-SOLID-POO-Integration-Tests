import * as sinon from 'sinon';
import * as chai from 'chai';
import { app } from '../app';
import Example from '../database/models/ExampleModel';

import { Response } from 'superagent';
import { mockUser, mockUserReturn, User } from './mocks/login';
import Users from '../database/models/Users';
// @ts-ignore
import chaiHttp = require('chai-http');
import { matchesKeys } from './mocks/matches';


chai.use(chaiHttp);

const { expect } = chai;

describe.only('/matches ', () => {

  let chaiHttpResponse: Response;

  it('verifica se retorna um array de partidas e o status 200 na rota /matches ', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .get("/matches")
    console.log(chaiHttpResponse.body);
    expect(chaiHttpResponse.body).to.be.an('array');
    expect(chaiHttpResponse.body[0]).to.be.an('object');
    expect(chaiHttpResponse.body[0]).to.have.deep.keys(matchesKeys);
    expect(chaiHttpResponse).to.have.status(200);
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
