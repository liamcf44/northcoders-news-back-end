process.env.NODE_ENV = 'test';

const app = require('../app');
const { expect } = require('chai');
const request = require('supertest')(app);
const mongoose = require('mongoose');
const seedDB = require('../seed/seed');

const {
  topicData,
  userData,
  articleData,
  commentData
} = require('../seed/testData');

describe('/api', () => {
  let topicDocs, userDocs, articleDocs;
  beforeEach(() => {
    return seedDB(topicData, userData, articleData).then(docs => {
      [topicDocs, userDocs, articleDocs] = docs;
    });
  });
  after(() => {
    return mongoose.disconnect();
  });
  describe('/*', () => {
    it('GET on a non-existent route returns a 404 status and an error code', () => {
      return request
        .get('/api/topicsregh')
        .expect(404)
        .then(({ body }) => {
          expect(body.message).to.equal('404: Page not found');
        });
    });
  });
  describe('/topics', () => {
    it('GET returns a 200 status and all the topics', () => {
      return request
        .get('/api/topics')
        .expect(200)
        .then(({ body }) => {
          expect(body.topics[0].slug).to.equal('mitch');
          expect(body.topics[1].title).to.equal('Cats');
        });
    });
    describe('/topics/:topic_id/articles', () => {
      it('GET returns a 200 status and all articles attached to a topic', () => {
        const [testTopic] = topicDocs;
        return request
          .get(`/api/topics/${testTopic._id}/articles`)
          .expect(200)
          .then(({ body }) => {
            expect(body.result[0].title).to.equal(
              'Living in the shadow of a great man'
            );
            expect(body.result[1].belongs_to).to.equal(`${testTopic._id}`);
          });
      });
      it('Wrong GET returns a 400 status and an error message', () => {
        return request
          .get(`/api/topics/rdfgdfefedtth/articles`)
          .expect(400)
          .then(({ body }) => {
            expect(body.message).to.equal('400: Bad Request');
          });
      });
    });
  });
});
