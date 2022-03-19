const router = require("express").Router();
const userCtrl = require("../controllers/userCtrl");

router.post("/register", userCtrl.register);

router.get("/refresh_token", userCtrl.refreshToken);

router.post('/login',userCtrl.login);

router.get('/logout', userCtrl.logout);   //!Get hay Post đều được

module.exports = router;
