const { Cart, CartItem, Promocode, UserPromocode } = require('../../db/models');
const { findUserByEmail } = require('./userService');

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

module.exports.checkUserUsedPromocode = async (code, userEmail) => {
  try {
    const promoId = await Promocode.findOne({
      where: { code },
      raw: true,
    });

    const userId = await findUserByEmail(userEmail);
    const wasPCused = await UserPromocode.findOne({
      where: { user_id: userId.id, promocode_id: promoId.id },
    });
    if (!wasPCused) {
      const usedPromocode = await UserPromocode.create({
        user_id: userId.id,
        promocode_id: promoId.id,
      });
      return { success: true };
    }
    return { success: false, message: 'Вы уже использовали этот промокод' };
  } catch (error) {
    console.log(error);
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
