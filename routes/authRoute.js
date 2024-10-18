import express from 'express'
import { registerController, loginController, admin, forgetPasswordController, updateProfileController } from '../controllers/authController.js';
import { requireSignIn, isAdmin } from '../middlewares/authMiddleware.js';

const router = express.Router();


// register route
router.post('/register', registerController);

// login route
router.post('/login', loginController);

//forget-password
router.post('/forgot-password', forgetPasswordController);


// user-auth route for checking webToken -> authorization
router.get('/auth-user', requireSignIn, (req, res) =>{
    res.status(200).json({
        ok: true
    })
})

// admin-auth for checking whethen the use is admin or not
router.get('/auth-admin', requireSignIn, isAdmin, (req, res)=>{
    res.status(200).send({
        ok: true
    })
})

// update profiile
router.put('/profile', requireSignIn, updateProfileController)

export default router;