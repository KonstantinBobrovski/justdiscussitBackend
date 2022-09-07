const { Hobby } = require('../models/index.js')
class HobbyController {
    GetHobbies(req, res) {
       


        Hobby.findAll({ where: {} }).then(rows => {
            res.json(rows)
        })
    }
}

module.exports = new HobbyController();