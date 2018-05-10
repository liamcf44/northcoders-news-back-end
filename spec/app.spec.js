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
    return seedDB(topicData, userData, articleData, commentData).then(docs => {
      [topicDocs, userDocs, articleDocs, commentDocs] = docs;
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
        const [testTopic] = topicDocs;
        return request
          .get(`/api/topics/${testTopic._id}wrong/articles`)
          .expect(400)
          .then(({ body }) => {
            expect(body.message).to.equal('400: Bad Request');
          });
      });
      it('POST returns a 201 status and the article posted', () => {
        const [testTopic] = topicDocs;
        const [testUser] = userDocs;
        let testArticle = {
          title: 'This is a test article',
          body: 'This is a test body',
          belongs_to: `${testTopic._id}`,
          votes: 44,
          created_by: `${testUser._id}`
        };
        return request
          .post(`/api/topics/${testTopic._id}/articles`)
          .send(testArticle)
          .expect(201)
          .then(({ body }) => {
            expect(body.newArticleDoc).to.be.an('object');
            expect(body.newArticleDoc.title).to.equal('This is a test article');
            expect(body.newArticleDoc.created_by).to.equal(`${testUser._id}`);
          });
      });
      it('Wrong POST returns a 400 status and an error message', () => {
        const [testTopic] = topicDocs;
        const [testUser] = userDocs;
        let testArticle = {
          title: 'This is a test article',
          body: 'This is a test body',
          votes: 44,
          created_by: `${testUser._id}44`
        };
        return request
          .post(`/api/topics/${testTopic._id}/articles`)
          .send(testArticle)
          .expect(400)
          .then(({ body }) => {
            expect(body.message).to.equal('400: Bad Request');
          });
      });
    });
  });
  describe('/articles', () => {
    it('GET returns a 200 status and all the articles', () => {
      return request
        .get('/api/articles')
        .expect(200)
        .then(({ body }) => {
          expect(body.articles.length).to.equal(4);
          expect(body.articles[3].title).to.equal(
            'UNCOVERED: catspiracy to bring down democracy'
          );
        });
    });
    describe('/articles/:article_id', () => {
      it('GET returns a 200 status and the relevant article', () => {
        const [testArticle] = articleDocs;
        return request
          .get(`/api/articles/${testArticle._id}`)
          .expect(200)
          .then(({ body }) => {
            expect(body.result[0].body).to.equal(
              'I find this existence challenging'
            );
            expect(body.result[0]._id).to.equal(`${testArticle._id}`);
          });
      });
      it('Wrong GET returns a 400 status and an error message', () => {
        const [testArticle] = articleDocs;
        return request
          .get(`/api/articles/${testArticle._id}liam`)
          .expect(400)
          .then(({ body }) => {
            expect(body.message).to.equal('400: Bad Request');
          });
      });
      describe('/articles/:article_id/comments', () => {
        it('GET returns a 200 status and the relevant comments by article ID', () => {
          const [testArticle] = articleDocs;
          return request
            .get(`/api/articles/${testArticle._id}/comments`)
            .expect(200)
            .then(({ body }) => {
              expect(body.comments[0]).to.be.an('object');
              expect(body.comments[0].belongs_to).to.equal(
                `${testArticle._id}`
              );
            });
        });
        it('Wrong GET returns a 400 status and an error message', () => {
          const [testArticle] = articleDocs;
          return request
            .get(`/api/articles/${testArticle._id}wrong/comments`)
            .expect(400)
            .then(({ body }) => {
              expect(body.message).to.equal('400: Bad Request');
            });
        });
        it('POST returns a 201 status and the article posted', () => {
          const [testArticle] = articleDocs;
          const [testUser] = userDocs;
          let testComment = {
            body: 'This is a test comment',
            belongs_to: `${testArticle._id}`,
            created_at: 44444444444444,
            votes: 44,
            created_by: `${testUser._id}`
          };
          return request
            .post(`/api/articles/${testArticle._id}/comments`)
            .send(testComment)
            .expect(201)
            .then(({ body }) => {
              expect(body.newCommentDoc).to.be.an('object');
              expect(body.newCommentDoc.body).to.equal(
                'This is a test comment'
              );
              expect(body.newCommentDoc.created_by).to.equal(`${testUser._id}`);
              expect(body.newCommentDoc.belongs_to).to.equal(
                `${testArticle._id}`
              );
            });
        });
        it('Wrong POST returns a 400 status and an error message', () => {
          const [testArticle] = articleDocs;
          const [testUser] = userDocs;
          let testComment = {
            body: 'This is a test comment',
            belongs_to: `${testArticle._id}incorrect`,
            created_at: 44444444444444,
            votes: 44,
            created_by: `${testUser._id}wrong`
          };
          return request
            .post(`/api/articles/${testArticle._id}/comments`)
            .send(testComment)
            .expect(400)
            .then(({ body }) => {
              expect(body.message).to.equal('400: Bad Request');
            });
        });
      });
    });
  });
});
