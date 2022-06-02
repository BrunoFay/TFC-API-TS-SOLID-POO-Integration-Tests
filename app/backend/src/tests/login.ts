import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Example from '../database/models/ExampleModel';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('/login ', () => {
 

   let chaiHttpResponse: Response;

   before(async () => {
     sinon
       .stub(Example, "findOne")
       .resolves({
         ...<Seu mock>
       } as Example);
   });

   after(()=>{
     (Example.findOne as sinon.SinonStub).restore();
   })

   it('...', async () => {
     chaiHttpResponse = await chai
        .request(app)
        ...

     expect(...)
   });

  it('Seu sub-teste', () => {
    expect(false).to.be.eq(true);
  });
});
function before(arg0: () => Promise<void>) {
  throw new Error('Function not implemented.');
}

function after(arg0: () => void) {
  throw new Error('Function not implemented.');
}

