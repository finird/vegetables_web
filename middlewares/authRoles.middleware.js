const expressJwt = require('express-jwt');

function authRole(roles = []) {
    if(typeof roles === 'string'){
        roles = [roles];
    }
    const secret = process.env.JWT_SECRET;
    return [
        expressJwt({secret}),
        (req, res, next) => {
            if(roles.length && !roles.includes(req.auth.roles)){
                return res.status(401).json({
                    message: "Unauthorized"
                });
            }
            next();
        }
    ]
}
module.exports = authRole;