const {
  Item,
  Cart,
  User,
  CartItem,
  Promocode,
  Photo,
} = require('../../db/models');

module.exports.getUserCartItems = async (userEmail) => {
  try {
    const currUser = await User.findOne({
      where: { email: userEmail },
    });
    const cartItems = await Item.findAll({
      include: [
        { model: Cart, where: { user_id: currUser.id } },
        { model: Photo, limit: 1 },
      ],
    });
    return { success: true, cartItems };
  } catch (error) {
    throw new Error('Ошибка сервера');
  }
};

module.exports.delUserCartItem = async (userEmail, itemId) => {
  try {
    const currUser = await User.findOne({
      where: { email: userEmail },
    });
    const currCart = await Cart.findOne({
      where: { user_id: currUser.id },
    });
    const delCartItem = await CartItem.destroy({
      where: {
        item_id: itemId,
        cart_id: currCart.id,
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

module.exports.emptyUserCart = async (userEmail) => {
  try {
    const currUser = await User.findOne({
      where: { email: userEmail },
    });
    const emptyCart = await Cart.destroy({
      where: { user_id: currUser.id },
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
