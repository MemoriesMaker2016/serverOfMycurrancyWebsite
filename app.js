const express = require('express');
const cors = require('cors');
const auth = require('./middleware/auth.middleware');
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/auth', auth, require('./routes/forexOrder.routes'));
app.get('/', (req, res) => {
  res.send('server has been started');
});

module.exports = app;
