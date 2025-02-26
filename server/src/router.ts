import {Router} from 'express';
import {body, validationResult} from 'express-validator'
import { createAccount, getUser, login, profile, updateProfile, upload } from './controllers/user.controller';
import { validateLogin, validateProfileForm, validateUserCreation } from './utils/validation';
import { verifyToken } from './utils/authentication';
import multer from 'multer';

const router = Router()

const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, "user" + Date.now() + "-" + file.originalname)
    },
})

const uploads = multer({storage})

router.post('/auth/register', validateUserCreation, handleValidationErrors, createAccount)
router.post('/auth/login', validateLogin, handleValidationErrors, login)
router.get('/auth/profile',verifyToken, profile)
router.patch('/auth/profile' , verifyToken, validateProfileForm, updateProfile)
router.post('/auth/upload', verifyToken, uploads.single("file"), upload)
router.get('/:username',  getUser)





export default router;