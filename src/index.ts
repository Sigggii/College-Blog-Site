import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();
const app: Express = express();
const port = process.env.PORT || 3000;

app.set('view engine', 'ejs');

app.get('/', (req: Request, res: Response) => {
  res.render('index');
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
