import * as sinon from 'sinon';
import * as chai from 'chai';
import { app } from '../app';

import { Response } from 'superagent';
// @ts-ignore
import chaiHttp = require('chai-http');
import { leaderboardsKeys } from './mocks/leaderboards';


chai.use(chaiHttp);

const { expect } = chai;

describe('/leaderboard ', () => {
  let chaiHttpResponse: Response;

  it('verifica se retorna um array de classificações e o status 200 na rota /leaderboard ', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .get("/leaderboard")
    expect(chaiHttpResponse.body).to.be.an('array');
    expect(chaiHttpResponse.body[0]).to.be.an('object');
    expect(chaiHttpResponse.body[0]).to.have.deep.keys(leaderboardsKeys);
    expect(chaiHttpResponse).to.have.status(200);
  });
  it('verifica se retorna um array de classificações e o status 200 na rota /leaderboard ', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .get("/leaderboard/home")
    expect(chaiHttpResponse.body).to.be.an('array');
    expect(chaiHttpResponse.body[0]).to.be.an('object');
    expect(chaiHttpResponse.body[0]).to.have.deep.keys(leaderboardsKeys);
    expect(chaiHttpResponse).to.have.status(200);
  });
  it('verifica se retorna um array de classificações e o status 200 na rota /leaderboard ', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .get("/leaderboard/away")
    expect(chaiHttpResponse.body).to.be.an('array');
    expect(chaiHttpResponse.body[0]).to.be.an('object');
    expect(chaiHttpResponse.body[0]).to.have.deep.keys(leaderboardsKeys);
    expect(chaiHttpResponse).to.have.status(200);
  });
  
})

