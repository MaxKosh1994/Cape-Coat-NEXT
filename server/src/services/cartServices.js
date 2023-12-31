const { Cart, CartItem, Promocode, UserPromocode } = require('../../db/models');
const { findUserByEmail } = require('./userService');

module.exports.findUserCart = async (userId) => {
  try {
    const userCart = await Cart.findOrCreate({
      where: {
        user_id: userId,
      },
      raw: true,
    });
    const [userCartData, isCreated] = userCart;
    return userCartData;
  } catch (error) {
    return null;
  }
};

module.exports.getOrCreateUserCart = async (userId) => {
  try {
    const cart = await Cart.findOrCreate({
      where: {
        user_id: userId,
      },
    });
    return cart;
  } catch (error) {
    return null;
  }
};

module.exports.createUserCart = async (userId) => {
  try {
    const userCart = await Cart.create({
      user_id: userId,
    });
    return { success: true, userCart };
  } catch (error) {
    return null;
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
    return null;
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
    return null;
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
    return null;
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
    return null;
  }
};
