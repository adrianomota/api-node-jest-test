const req = require('supertest')
const app = require('../../src/server')
const truncate = require('../utils/truncate')
const factory = require('../factory/factories')

describe('Authentication', () => {
  beforeEach(async () => {
    await truncate()
  })

  it('should be able to authenticate with valid credentials ', async () => {
    const user = await factory.create('User', {
      password: '123456'
    })

    const resp = await req(app)
      .post('/api/v1/sessions')
      .send({
        email: user.email,
        password: user.password
      })

    expect(resp.status).toBe(200)
  })

  it('should not be able to authenticate with valid credentials ', async () => {
    const user = await factory.create('User', {
      password: '123456'
    })

    const resp = await req(app)
      .post('/api/v1/sessions')
      .send({
        email: user.email,
        password: '12345'
      })

    expect(resp.status).toBe(401)
  })

  it('should return jwt token when authenticate', async () => {
    const user = await factory.create('User', {
      password: '123456'
    })

    const resp = await req(app)
      .post('/api/v1/sessions')
      .send({
        email: user.email,
        password: '123456'
      })

    expect(resp.body).toHaveProperty('access_token')
  })

  it('should be able to access private routes when authenticated', async () => {
    const user = await factory.create('User')

    const res = await req(app)
      .get('/api/v1/dashboard')
      .set('Authorization', `Bearer ${user.generateToken()}`)

    expect(res.status).toBe(200)
    expect(res.body).toEqual({ success: true })
  })

  it('should not be able to access private routes when not authenticated', async () => {
    const resp = await req(app).get('/api/v1/dashboard')

    const objExpect = { success: false, message: 'Token not provided' }

    expect(resp.status).toBe(401)
    expect(resp.body).toEqual(objExpect)
  })

  it('should not be able to access private routes when token bad formatted', async () => {
    const res = await req(app)
      .get('/api/v1/dashboard')
      .set('Authorization', `Bearer 1q2w3e4r`)

    expect(res.status).toBe(401)
    expect(res.body).toEqual({ success: false, message: 'Token invalid' })
  })
})
