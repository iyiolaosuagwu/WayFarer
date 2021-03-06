// // import chai from 'chai';
// import * as chai from 'chai';
// import chaiHttp from 'chai-http';
// import server from '../server';


// // const { should } = chai;
// chai.use(chaiHttp);

// Require the dev-dependencies
import chai from 'chai';
import chaiHttp from 'chai-http';
import tripRoute from '../src/routes/trip';
// import userRoute from '../routes/user';
// import busRoute from '../routes/bus';
// import bookingRoute from '../routes/booking';

process.env.NODE_ENV = 'wayfarer';

const { assert, expect } = chai;
const should = chai.should();

chai.use(chaiHttp);

const token = 'ctvudrtr54678fygvyh';

// Get
describe('Trips', () => {
      it('it should GET all the trips', (done) => {
        chai.request(tripRoute)
            .get('api/v1/trips')
            .set('x-auth-token', token)
            .end((err, res) => {
               // // res.should.have.status(200);
               expect(res.body).be.an('object');
               // // expect(res.body.data).be.an('object');
               // assert.equal(res.body.status, 'success');

               console.log(res.status);
               done();
            });
      });
  });


  describe('Array', () => {
  describe('#indexOf()', () => {
    it('should return -1 when the value is not present', () => {
      assert.equal([1, 2, 3].indexOf(4), -1);
    });
  });
});
