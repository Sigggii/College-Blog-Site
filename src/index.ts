import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();
const app: Express = express();
const port = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', (req: Request, res: Response) => {
  res.render('pages/index');
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
