const { User } = require('../models')

class SessionController {
  async Store (req, res) {
    const { email, password } = req.body

    const user = await User.findOne({ where: { email } })

    if (!user) {
      return res
        .status(401)
        .json({ succcess: false, message: 'Invalid operation' })
    }

    if (!(await user.checkPass(password))) {
      return res
        .status(401)
        .json({ succcess: false, message: 'Invalid operation' })
    }
    return res.status(200).json({
      success: true,
      access_token: await user.generateToken(),
      message: 'User created sucessfully'
    })
  }
}

module.exports = new SessionController()
