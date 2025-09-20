import express from 'express';
import {registerUser, loginUser} from "../controllers/authController.js"
import wrapAsync from "../utils/wrapAsync.js"

const router = express.Router();

router.post('/register', wrapAsync(registerUser));
router.post('/login', wrapAsync(loginUser)); 

export default router;