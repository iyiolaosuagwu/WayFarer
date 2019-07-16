// const assert = require('assert');

// describe('Array', () => {
//   describe('#indexOf()', () => {
//     it('should return -1 when the value is not present', () => {
//       assert.equal([1, 2, 3].indexOf(4), -1);
//     });
//   });
// });


beforeEach(async () => {
  await db.clear();
  await db.save([tobi, loki, jane]);
});

describe('#find()', () => {
  it('responds with matching records', async () => {
    const users = await db.find({ type: 'User' });
    users.should.have.length(3);
  });
});
