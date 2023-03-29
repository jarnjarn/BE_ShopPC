
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const gentoken = require('../common/token.js');
const User = require('../models/userModel.js');

// Create and Save a new User
const registerUser = async (req, res) => {
    try {
        const existingUser = await User.findOne({ phone : req.body.phone });
        if (existingUser) {
            return res.status(400).json({ message: 'phone đã được sử dụng' });
        }
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            password: hashedPassword,
            role: "user",
            address : red.body.address,
            createAt: Date.now(),
            updateAt: Date.now()
        });
        const result = await user.save();
        const token = gentoken(result.id);
        res.status(201).json({ result, token });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

//login user
const loginUser = async (req, res) => {

    const { phone, password } = req.body;

    try {
        // Tìm người dùng dựa trên phone
        const user = await User.findOne({ phone });
        if (!user) {
            return res.status(400).json({ msg: 'phone hoặc mật khẩu không chính xác' });
        }
        // Xác thực mật khẩu
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: ' mật khẩu không chính xác' });
        }
        // Tạo token trả về thông tin người dùng và token
        const token = gentoken(user.id);
        const succsec = "thanhcong";
        res.json({
            succsec,
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                role: user.role
            }
        }) ;
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Lỗi máy chủ');
    }

}

module.exports = { registerUser, loginUser };