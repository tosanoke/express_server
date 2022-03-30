import express, { Response, Request } from 'express';
const router = express.Router();

/* GET home page. */
router.get('/', function(_req: Request,res: Response) {
  res.render('index', { title: 'Express' });
});



export default router;
