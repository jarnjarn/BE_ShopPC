const User = require('../models/userModel.js');

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json({
            status: 'success',
            data: {
                users
            }
        });
    }
    catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err
        });
    }
};

const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        res.status(200).json({
            status: 'success',
            data: {
                // trả về tất cả thông tin trừ password
                user: {
                    id : user._id,
                    name : user.name,
                    email : user.email,
                    phone : user.phone,
                    isAdmin : user.isAdmin
                }
            }
        });
    }
    catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err
        });
    }
}

const updateUserByadmin = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        res.status(200).json({
            status: 'success',
            data: {
                user
            }
        });
    }
    catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err
        });
    }
};
const updateUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (user) {
            user.name = req.body.name || user.name;
            user.email = req.body.email || user.email;
            user.phone = req.body.phone || user.phone;
            const updatedUser = await user.save();
            res.json({
                _id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email,
                phone: updatedUser.phone,
                isAdmin: updatedUser.isAdmin
            });
        } else {
            res.status(404);
            throw new Error('User not found');
        }
    }
    catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err
        });
    }
}

const changePassword = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (user) {
            user.password = req.body.password || user.password;
            const updatedUser = await user.save();
            res.json({
                _id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email,
                phone: updatedUser.phone,
                isAdmin: updatedUser.isAdmin
            });
        } else {
            res.status(404);
            throw new Error('User not found');
        }
    }
    catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err
        });
    }
}

const deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        res.status(200).json({
            status: 'success',
            data: {
                user
            }
        });
    }
    catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err
        });
    }
}

module.exports = { getAllUsers, getUser, updateUserByadmin, updateUser, changePassword, deleteUser };
