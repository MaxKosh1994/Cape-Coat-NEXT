const {
  Item,
  Cart,
  User,
  CartItem,
  Promocode,
  Photo,
} = require('../../db/models');

module.exports.findUserCart = async (userId) => {
  try {
    const userCart = await Cart.findOne({
      where: {
        user_id: userId,
      },
      raw: true,
    });
    return userCart;
  } catch (error) {
    throw new Error('Ошибка сервера');
  }
};

module.exports.getOrCreateUserCart = async (userId) => {
  const cart = await Cart.findOrCreate({
    where: {
      user_id: userId,
    },
  });
  return cart;
};

module.exports.createUserCart = async (userId) => {
  try {
    const userCart = await Cart.create({
      user_id: userId,
    });
    return { success: true, userCart };
  } catch (error) {
    throw new Error('Ошибка сервера');
  }
};

module.exports.emptyUserCart = async (userId) => {
  try {
    const emptyCart = await Cart.destroy({
      where: { user_id: userId },
    });
    if (emptyCart !== 0) {
      return {
        success: true,
        message: 'Корзина удалена',
      };
    }
    return { success: false, message: 'Ошибка сервера' };
  } catch (error) {
    throw new Error('Ошибка сервера');
  }
};

module.exports.validatePromoCode = async (code) => {
  try {
    const isValidPromo = await Promocode.findOne({
      where: { code },
      raw: true,
    });
    if (isValidPromo) {
      return { success: true, isValidPromo };
    }
    return { success: false, message: 'Такого промокода не существует' };
  } catch (error) {
    throw new Error('Ошибка сервера');
  }
};

module.exports.delUserCartItem = async (cartId, itemId) => {
  try {
    const delCartItem = await CartItem.destroy({
      where: {
        item_id: itemId,
        cart_id: cartId,
      },
      raw: true,
    });
    if (delCartItem) {
      return { success: true };
    }
    return { success: false };
  } catch (error) {
    throw new Error('Ошибка сервера');
  }
};
