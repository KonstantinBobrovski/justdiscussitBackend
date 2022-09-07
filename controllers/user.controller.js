const bcrypt = require('bcrypt');
const { Users, UserHobbies } = require('../models/index.js')
const JwtService = require('../services/JWT.service')

const NonSensetiveAtrr = ['username', "country", "language", 'age', 'description', 'time']

class UserController {
    async Register(req, res) {
        console.log('Register');

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
        console.log('Login');
        console.log(req.body);
        const { body } = req;
        let user = await Users.findOne({
            where: {
                email: req.body.email,
            },

        });
        console.log('Login user', user);
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
            error: true,
            statut: 400
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
                status: 401,
                error: true
            })

        const { country, language, age, time, desc, hobbies } = req.body;
        console.log(req.user);
        if (!country || !language) {
            return res.json({
                status: 400,
                error: true
            })
        }
        console.log('here0');
        const user = await Users.findOne({
            where: {
                id: +req.user.id
            }
        })
        console.log('here5');
        user.language = language;
        user.country = country;
        user.age = age;
        user.time = time;
        user.description = desc;
        console.log('here');
        await user.save()
        console.log('here2');

            //Yep there is potential bug
            (hobbies || []).forEach(el =>
                UserHobbies.create({ hoobbyId: el, userId: req.user.id }));

        return res.json({
            user: user
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