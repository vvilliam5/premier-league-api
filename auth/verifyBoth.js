const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, process.env.JWT_ADMIN_KEY, (err, data) => {
        if (err) {
            jwt.verify(token, process.env.JWT_USER_KEY, (err, userData) => {
                if (err) {
                    return res.status(401).json({
                        message: 'Token Authentication Failed'
                    })
                }
                else {
                    req.userData = userData;
                    next();
                }
            })
        }
        else {
            req.userData = data
            next();
        }
    })
}