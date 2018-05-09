const app = require('./app');

const {PORT=4444} = process.env;

app.listen(4444, (err) => {
  if (err) throw err;
  console.log(`listening on port ${PORT}`);
});