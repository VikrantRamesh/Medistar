const cors = require('cors');
const express = require('express');

const app = express();

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

app.get('/', (req, res) => {
  res.cookie('mycookie', 'Hello World!', { maxAge: 900000, httpOnly: true });
  res.send('Cookie set!');
});

app.listen(4000, () => {
  console.log('Server started on port 4000');
});