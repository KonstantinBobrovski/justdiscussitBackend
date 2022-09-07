const express = require('express')
const router = express.Router();
const UserController = require('./controllers/user.controller');
const JWT = require('./services/JWT.service')
const HobbyController=require('./controllers/hobby.controller')
router.use(async (req, res, next) => {
   
    const token = req.get('auth')
   
    if (token) {
        return JWT.ReadToken(token).then((user) => {
            
            req.user=user.data.user;
            next()
        }).catch((err)=>console.log(err)||next())
    }
   
    next()
})

router.get('/test', (req, res) => {
    res.json({ 'Work': 'bar' })
})

router.post('/auth/register', (req, res) => UserController.Register(req, res))
router.post('/auth/login', (req, res) => UserController.Login(req, res))
router.get('/user/:userId', (req, res) => UserController.GetUser(req, res))
router.put('/user/', (req, res) => UserController.ChangeMyFrofile(req, res))
router.get('/user/', (req, res) => UserController.GetAllUser(req, res))


router.get('/hobby',(req,res)=>HobbyController.GetHobbies(req,res))

module.exports = router;