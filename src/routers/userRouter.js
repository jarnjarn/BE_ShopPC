const express = require('express')
const router = express.Router()
const authController = require('../controllers/authController.js')
const userController = require('../controllers/userController.js')
const authMiddleware = require('../middlewares/authMiddleware.js')
const adminMiddleware = require('../middlewares/adminMiddleware.js')
const phoneMiddleware = require('../middlewares/phoneMiddleware.js')
const emailMiddleware = require('../middlewares/emailMiddleware.js')

//đăng ký
router.post('/register',emailMiddleware,phoneMiddleware, authController.registerUser)
//đăng nhập
router.post('/login', authController.loginUser)
//lấy tất cả thông tin user (admin)
router.get('/',authMiddleware,adminMiddleware, userController.getAllUsers)
//lấy thông tin user theo id (admin , user)
router.get('/:id',authMiddleware, userController.getUser)
//cập nhật thông tin user theo id ( user)
router.put('/:id', authMiddleware, userController.updateUser)
//cập nhật thông tin user theo id (admin)
router.put("/admin/:id", authMiddleware, adminMiddleware, userController.updateUserByadmin)
//xóa user theo id (admin)
router.delete('/:id', authMiddleware, adminMiddleware, userController.deleteUser)
//đổi mật khẩu
router.post("/change-password", authMiddleware, userController.changePassword)


module.exports = router