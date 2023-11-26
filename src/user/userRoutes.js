const router = require('express').Router();
const { registerUser, loginUser, getUsers, keepMeLoggedIn } = require('../user/userController');
const { authenticateToken } = require('../middlewares/auth');

router.get('/', authenticateToken, getUsers)
router.post('/register', registerUser);
router.post('/login', loginUser)
router.get('/keepMeLoggedIn', authenticateToken, keepMeLoggedIn)

module.exports = router;