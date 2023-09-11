const bcrypt = require('bcrypt');
const { User } = require('../../db/models');

module.exports.findUserByEmail = async (email) => {
  const currUser = await User.findOne({
    where: { email },
    raw: true,
  });
  console.log(currUser);
  return currUser;
};

module.exports.findOrCreateUserByEmail = async (
  full_name,
  email,
  phone,
  password,
  telegram_instagram,
) => {
  const currUser = await User.findOrCreate({
    where: { email },
    defaults: {
      full_name,
      email,
      phone,
      password,
      telegram_instagram,
    },
  });
  return currUser;
};

module.exports.updUserPass = async (email, password) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const [alteredFields, _] = await User.update(
    { password: hashedPassword },
    { where: { email } },
  );
  if (alteredFields === 0) {
    return { success: false, message: 'Не получилось обновить пароль' };
  }
  return { success: true, message: 'Пароль обновлен' };
};
