import * as sinon from 'sinon';
import * as chai from 'chai';
import { app } from '../app';

import { Response } from 'superagent';
// @ts-ignore
import chaiHttp = require('chai-http');
import { matchesKeys } from './mocks/matches';


chai.use(chaiHttp);

const { expect } = chai;

describe('/matches ', () => {

  let chaiHttpResponse: Response;

  it('verifica se retorna um array de partidas e o status 200 na rota /matches ', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .get("/matches")
    expect(chaiHttpResponse.body).to.be.an('array');
    expect(chaiHttpResponse.body[0]).to.be.an('object');
    expect(chaiHttpResponse.body[0]).to.have.deep.keys(matchesKeys);
    expect(chaiHttpResponse).to.have.status(200);
  });
  
})

