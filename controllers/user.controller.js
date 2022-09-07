const bcrypt = require('bcrypt');
const { Users } = require('../models/index.js')
const JwtService = require('../services/JWT.service')

const NonSensetiveAtrr= ['username', "country", "language",'age','description','time']

class UserController {
    async Register(req, res) {
        const { body } = req;
        const user = body.user
        if (!user) {
            return res.json({
                statut: 400
            })
        }
        if (!user.username || !user.email || !user.password) {
            return res.json({
                statut: 400
            })
        }

        let new_psw = await bcrypt.hash(user.password, 10)
        user.password = new_psw;
        user.email = user.email.toLowerCase()
        try {
            let new_user = await Users.create(user);

            let access = await JwtService.CreateAccessToken({ user: new_user }, '6h');
            return res.json({
                access, user: {
                    ...user, password: ''
                }
            })
        } catch (error) {
            console.log(error);
            res.json({
                error: true
            })
        }

    }
    async Login(req, res, next) {
        const { body } = req;
        let user = await Users.findOne({
            where: {
                email: req.body.email,
            },

        });
        console.log(user);
        if (!user)
            return res.json({
                error: true
            })
        console.log(body);
        let compare_result = await bcrypt.compare(body.password, user.dataValues.password)
        if (compare_result) {
            let access = await JwtService.CreateAccessToken({ user: user }, '');
            return res.json({
                access, user: {
                    ...user.dataValues, password: ''
                }
            })
        }
        return res.json({
            error: true
        })
    }

    async GetUser(req, res) {
        const userId = req.params.userId
        console.log(req.params);
        if (isNaN(+userId)) {
            //return our user
            return res.json({
                user: req.user
            })
        }

        const user = await Users.findOne({
            where: {
                id: +userId
            },
            attributes: NonSensetiveAtrr
        })
        res.json({
            user
        })
    }
    async ChangeMyFrofile(req, res) {
        if (!req.user)
            return res.json({
                status: 400,
                error: true
            })
        const { country, language } = req.body
        console.log(req.user);
        if (!country || !language) {
            return res.json({
                status: 400,
                error: true
            })
        }
        const ress = await Users.update({ country, language }, {
            where: {
                id: req.user.id
            }
        })

        return res.json({
            user: ress
        })
    }

    async GetAllUser(req, res) {
        const users = await Users.findAll({
            attributes: NonSensetiveAtrr
        });
        res.json({ users })
    }
    async AddHobies(req, res) {
       
    }
}

module.exports = new UserController();