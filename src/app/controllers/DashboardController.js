class DashboardController {
  async Index (req, res) {
    return res.status(200).json({
      success: true
    })
  }
}

module.exports = new DashboardController()
