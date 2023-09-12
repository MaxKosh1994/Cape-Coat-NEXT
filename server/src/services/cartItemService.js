const { Op } = require('sequelize');
const { Material, Item, Cart, CartItem, Photo } = require('../../db/models');
const { findUserCart } = require('./cartServices');

module.exports.getUserCartItems = async (userId) => {
  const cartItems = await Item.findAll({
    include: [
      { model: Cart, where: { user_id: userId } },
      { model: Material },
      { model: Photo, limit: 1 },
    ],
  });
  return cartItems;
};

module.exports.getItemsInUserCart = async (userId) => {
  // TODO исправить после введения рабочего локалсторедж
  const userCart = await findUserCart(userId);
  const allItems = await CartItem.findAll({
    where: {
      cart_id: userCart.id,
    },
    raw: true,
  });

  return allItems;
};

module.exports.checkStockItemAsPurchased = async (itemIds) => {
  await Item.update(
    { purchased: true },
    { where: { id: itemIds, in_stock: true } },
  );
};

module.exports.getItemIdsInCart = async (cartId) => {
  const allItems = await CartItem.findAll({
    where: {
      cart_id: cartId,
    },
    attributes: ['item_id'],
    raw: true,
  });

  return allItems;
};

module.exports.findCartItem = async (cartId, itemId) => {
  const cartItem = await CartItem.findOne({
    where: {
      cart_id: cartId,
      item_id: itemId,
    },
  });
  return cartItem;
};

module.exports.createCartItem = async (cartId, itemId, materialName) => {
  const newCartItem = await CartItem.create({
    cart_id: cartId,
    item_id: itemId,
    selected_material: materialName,
  });
  return newCartItem;
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
