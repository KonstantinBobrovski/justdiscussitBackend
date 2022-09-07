const jwt = require('jsonwebtoken')
const secret= "asdasdasdoj14jp123i12kla;sdasmda;sd"
class JwtService {
    async CreateAccessToken(object, expiresIn) {
        return new Promise((resolve, reject) => {


            jwt.sign({ data:object },secret, function(err, token) {
                if (err) {
                    console.log(err);
                    reject(err);
                } else {
                    resolve(token);
                }
            });
        });

    }

    async ReadToken(string){
        return new Promise((resolve,reject)=>{
            jwt.verify(string,secret, function (err, decoded) {
                if (err) {
                   reject(err)
                } else {
                   resolve(decoded)
                }
            });
        })
       
    }
}

module.exports = new JwtService();