const jwt = require('jsonwebtoken');
const  User  = require('../models/userModel.js');

const adminMiddelware = async (req, res, next) => {
    const role = req.user.role;
    if(role === 'admin'){
        next();
    }else{
        res.status(401).send({ error: 'Bạn không có quyền truy cập' });
    }
}

module.exports = adminMiddelware;