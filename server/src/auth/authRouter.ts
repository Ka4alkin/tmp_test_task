import { getMe, login, signup } from './authController';
import { Router } from 'express';
import { checkAuth } from '../middlewares';


const router = Router();

router.post('/signup', signup);
router.post('/signin-with-password', login);
router.get( '/get-me', checkAuth, getMe);

module.exports = router;
