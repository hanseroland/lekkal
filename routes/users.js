const router = require('express').Router();
const authController = require('../controllers/auth.controller');
const userContoller = require('../controllers/user.controller');
const { verifyToken } = require('./verifyToken');





//auth
router.post("/register",authController.signUp);
router.post("/login",authController.signIn);
router.get("/logout",verifyToken,authController.logout);

//crud
router.get("/", userContoller.getAllUsers);
router.get("/count", userContoller.countUser);
router.get("/stats", userContoller.countUser);
router.get("/:id",userContoller.getUserInfo);
router.put("/:id",userContoller.updateUserInfo);
router.delete("/:id",userContoller.deleteUser);



module.exports = router;
