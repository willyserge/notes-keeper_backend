import User from '../../models/user';

const userOne = {
  firstname: 'willy',
  lastname: 'serge',
  email: 'willy@test.com',
  password: 'test123'
};

const setupDatabase = async () => {
  await User.deleteMany();
  await new User(userOne).save();
};

export {
  userOne,
  setupDatabase
};
