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

app.get('/signup', (req: Request, res: Response) => {
  res.render('pages/signup');
});

app.get('/signin', (req: Request, res: Response) => {
  res.render('pages/signin');
});

app.get('/create-post', (req: Request, res: Response) => {
  res.render('pages/create-post');
});

app.get('/admin-console', (req: Request, res: Response) => {
  res.render('pages/admin-console');
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
