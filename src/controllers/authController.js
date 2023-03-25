
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

        // Tạo token
        const token = gentoken(user.id);

        res.json({ token });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Lỗi máy chủ');
    }

}

module.exports = { registerUser, loginUser };