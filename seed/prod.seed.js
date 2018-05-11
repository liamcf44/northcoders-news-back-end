const seedDb = require('./seed');
const mongoose = require('mongoose');

const { topicData, userData, articleData } = require('./devData');
const { createComments } = require('../utils');

let commentData = createComments(userData, articleData);

const DB_URL = require('../config');

mongoose
  .connect(DB_URL)
  .then(() => seedDb(topicData, userData, articleData, commentData))
  .then(([topicDocs, userDocs, articleDocs, commentDocs]) => {
    console.log(`📖 ${topicDocs.length} Topic inserted 📖`);
    console.log(`👦 ${userDocs.length} Users inserted 👧`);
    console.log(
      `📒 ${articleDocs.length} Articles inserted with ${
        commentDocs.length
      } comments 📒`
    );
  })
  .then(() => mongoose.disconnect())
  .catch(console.log);
