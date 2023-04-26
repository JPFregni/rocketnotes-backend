const UserCreateService = require('./UserCreateService')
const UserRepositoryInMemory = require('../repositories/UserRepositoryInMemory')
const { describe } = require('pm2')
const AppError = require('../utils/AppError')

describe('UserCreateService', () => {
  const userRepository = null
  const userCreateService = null

  beforeEach(() => {
    userRepository = new UserRepositoryInMemory()
    userCreateService = new UserCreateService(userRepository)
  })

  it('user should be create', async () => {
    const user = {
      name: 'User Test',
      email: 'user@test.com',
      password: '123'
    }

    const userCreated = await userCreateService.execute(user)

    expect(userCreated).toHaveProperty('id')
  })

  it('user not should be create with exists email', async () => {
    const user1 = {
      name: 'User Test1',
      email: 'user@test.com',
      password: '123'
    }
    const user2 = {
      name: 'User Test2',
      email: 'user@test.com',
      password: '456'
    }

    await userCreateService.execute(user1)
    await expect(userCreateService.execute(user2)).rejects.toEqual(
      new AppError('Este e-mail já está em uso!')
    )
  })
})
