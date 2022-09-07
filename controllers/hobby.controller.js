const { Hobby } = require('../models/hobby')
class HobbyController {
    GetHobbies(req, res) {
        return res.json([
            'football',
            "programming",
            "swimming"
        ])
        Hobby.findAll().then(rows=>{
            res.json(rows)
        })
    }
}

module.exports=new HobbyController();