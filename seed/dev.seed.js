const seedDb = require('./seed');
const mongoose = require('mongoose');

const topicData = require('./devData/topics');
const userData = require('./devData/users');
const articleData = require('./devData/articles');

mongoose
  .connect('mongodb://localhost:27017/northcoders_news')
  .then(() => seedDb(topicData, userData, articleData))
  .then(([topicDocs, userDocs, articleDocs]) => {
    console.log(`📖 ${topicDocs.length} Topic inserted 📖`);
    console.log(`👦 ${userDocs.length} Users inserted 👧`);
    console.log(`📒 ${articleDocs.length} Articles inserted 📒`);
  })
  .then(() => mongoose.disconnect())
  .catch(console.log);
