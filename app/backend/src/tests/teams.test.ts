import * as sinon from 'sinon';
import * as chai from 'chai';
import { app } from '../app';

import { Response } from 'superagent';
// @ts-ignore
import chaiHttp = require('chai-http');


chai.use(chaiHttp);

const { expect } = chai;

describe('/teams ', () => {
  let chaiHttpResponse: Response;

  it('verifica se retorna um array de times e o status 200 na rota /teams ', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .get("/teams")
    expect(chaiHttpResponse.body).to.be.an('array');
    expect(chaiHttpResponse.body[0]).to.have.deep.keys('id','teamName');
    expect(chaiHttpResponse.body[0]).to.be.an('object');
    expect(chaiHttpResponse).to.have.status(200);
  });
  it('verifica se retorna um time e o status 200 na rota /teams/:id ', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .get("/teams/1")
    expect(chaiHttpResponse.body).to.be.an('object');
    expect(chaiHttpResponse.body).to.have.deep.keys('id','teamName');
    expect(chaiHttpResponse).to.have.status(200);
  });
})

