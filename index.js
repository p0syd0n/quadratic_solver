const express = require('express');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();


// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
const port = process.env.PORT;

const app = express();
app.use(express.json());
app.set('views', path.join(__dirname, 'public', 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));


app.get('/', (req, res) => {
  res.render('main.ejs');
});

app.get('/test', (req, res) => {
  res.render('test.ejs');
});

app.listen(port);