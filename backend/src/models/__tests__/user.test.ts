import User from '../user';

describe('User Model', () => {
  test('create & save user successfully', async () => {
    const userData = {
      firstName: 'Test',
      lastName: 'User',
      email: 'test@example.com',
      password: 'Password123!'
    };
    
    const validUser = new User(userData);
    const savedUser = await validUser.save();
    
    expect(savedUser._id).toBeDefined();
    expect(savedUser.firstName).toBe(userData.firstName);
    expect(savedUser.lastName).toBe(userData.lastName);
    expect(savedUser.email).toBe(userData.email);
    // Password should be hashed
    expect(savedUser.password).not.toBe(userData.password);
    expect(savedUser.password.length).toBeGreaterThan(10);
  });

  test('should fail to create user without required fields', async () => {
    const userData = {
      firstName: 'Test',
      // Missing lastName, email, password
    };
    
    const invalidUser = new User(userData);
    
    await expect(invalidUser.save()).rejects.toThrow();
  });

  test('should fail to create user with duplicate email', async () => {
    const userData = {
      firstName: 'Test',
      lastName: 'User',
      email: 'duplicate@example.com',
      password: 'Password123!'
    };
    
    const user1 = new User(userData);
    await user1.save();
    
    const user2 = new User(userData);
    await expect(user2.save()).rejects.toThrow();
  });
}); 