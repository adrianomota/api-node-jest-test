const express = require('express')

const routes = express.Router()

const authMiddleware = require('./app/middlewares/auth')

// const controllers = require('./app/controllers')

const SessionController = require('./app/controllers/SessionController')
const DashboardController = require('./app/controllers/DashboardController')

// routes.get('/api/v1/users/me', UserController.Index)

routes.post('/api/v1/sessions', SessionController.Store)

routes.use(authMiddleware)

routes.get('/api/v1/dashboard', DashboardController.Index)

module.exports = routes
