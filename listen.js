const app = require('./app');

const { PORT = 4444 } = process.env;

app.listen(PORT, err => {
  if (err) throw err;
  console.log(`listening on port ${PORT}`);
});
