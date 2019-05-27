const { User } = require('../models')

class UserController {
  async Index (req, res) {
    const user = await User.create({
      name: 'adriano mota',
      email: 'adrianowsh@gmail.com',
      password_hash: '123456'
    })
    res.status(200).json({
      success: true,
      data: user,
      message: 'User created successfully'
    })
  }
}
module.exports = new UserController()
