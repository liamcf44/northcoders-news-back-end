const seedDb = require('./seed');
const mongoose = require('mongoose');

const topicData = require('./devData/topics');
const userData = require('./devData/users');

mongoose
  .connect('mongodb://localhost:27017/northcoders_news')
  .then(() => seedDb(topicData, userData))
  .then(([topicDocs, userDocs]) => {
    console.log(`${topicDocs.length} Topic inserted`);
    console.log(`${userDocs.length} Users inserted`);
  })
  .then(() => mongoose.disconnect())
  .catch(console.log);
