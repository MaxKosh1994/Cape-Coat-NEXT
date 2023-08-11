const { User } = require('../../db/models');

module.exports.findUserByEmail = async (email) => {
  const currUser = await User.findOne({
    where: { email },
    raw: true,
  });
  return currUser;
};

module.exports.findOrCreateUserByEmail = async (full_name, email, password) => {
  const currUser = await await User.findOrCreate({
    where: { email },
    defaults: { full_name, email, password },
  });
  return currUser;
};
