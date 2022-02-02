import express from 'express';
import path from 'path';
import { body, validationResult } from 'express-validator';
import powershellInstance from './powershell.mjs';

const __dirname = path.resolve();
const HOST = 'localhost';
const PORT = 3000;
const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(
  express.urlencoded({
    extended: true,
  })
);

function homeCtrl(req, res) {
  res.render('index', {
    name: 'Run Some Powershell!',
    title: 'Run Script 1',
    status: req.dataProcessed?.status || 'clean',
    error: req.dataProcessed?.error || null,
    parameterA: req.dataProcessed?.parameterA || null,
    parameterB: req.dataProcessed?.parameterB || null,
  });
}

async function scriptCtrl(req, _, next) {
  const errors = validationResult(req);
  const { parameterA, parameterB } = req.body;
  req.dataProcessed = {};
  if (!errors.isEmpty()) {
    req.dataProcessed.parameterA = parameterA;
    req.dataProcessed.parameterB = parameterB;
    req.dataProcessed.status = 'error';
    req.dataProcessed.error = errors.array();
    return next();
  }
  const result = await powershellInstance(parameterA);
  const resultToString = result.stdout.toString('utf-8');
  console.log(resultToString);

  req.dataProcessed.parameterA = parameterA;
  req.dataProcessed.parameterB = parameterB;
  req.dataProcessed.status = 'success';
  req.dataProcessed.error = null;
  return next();
}

app.get('/', homeCtrl);

app.post(
  '/',
  body('parameterA').isLength({ min: 5 }),
  body('parameterB').isLength({ min: 5 }),
  scriptCtrl,
  homeCtrl
);

app.listen(PORT, HOST, function () {
  console.log(`Example app listening at http://${HOST}:${PORT}`);
});
