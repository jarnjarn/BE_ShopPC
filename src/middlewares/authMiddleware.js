
const jwt = require('jsonwebtoken');
const User = require('../models/userModel.js');

const authMiddleware = async (req, res, next) => {
    const token = req.headers.authorization?.replace('Bearer ', '');

    if (!token) {
        res.status(401).send({ error: 'Please authenticate. 1' });
    }
    try {

        const decoded = jwt.verify(token, process.env.JWT_SECRET);



        const user = await User.findOne({ _id: decoded.id });
        if (!user) {
            throw new Error();
        }
        req.user = user;
        req.token = token;
        next();
    } catch (error) {
        console.log(error);
        res.status(401).send({ error: 'Please authenticate. 2' });
    }
}
module.exports = authMiddleware;
