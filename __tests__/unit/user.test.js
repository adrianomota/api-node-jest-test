const bcrypt = require('bcrypt')
const truncate = require('../utils/truncate')
const factory = require('../factory/factories')

describe('User', () => {
  beforeEach(async () => {
    await truncate()
  })

  it('should encrypt user password', async () => {
    const user = await factory.create('User', {
      password: '123456'
    })

    const expectedPassValue = user.password

    const compareHash = await bcrypt.compare(
      expectedPassValue,
      user.password_hash
    )

    expect(compareHash).toBe(true)
  })
})
