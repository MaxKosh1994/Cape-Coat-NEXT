const { Op } = require('sequelize');
const { Material, Item, Cart, CartItem, Photo } = require('../../db/models');
const { findUserCart } = require('./cartServices');

module.exports.getUserCartItems = async (userId) => {
  try {
    const cartItems = await Item.findAll({
      include: [
        { model: Cart, where: { user_id: userId } },
        { model: Material },
        { model: Photo, limit: 1 },
      ],
    });
    return cartItems;
  } catch (error) {
    return null;
  }
};

module.exports.getItemsInUserCart = async (userId) => {
  try {
    const userCart = await findUserCart(userId);
    const allItems = await CartItem.findAll({
      where: {
        cart_id: userCart.id,
      },
      raw: true,
    });

    return allItems;
  } catch (error) {
    return null;
  }
};

module.exports.checkStockItemAsPurchased = async (itemIds) => {
  try {
    await Item.update(
      { purchased: true },
      { where: { id: itemIds, in_stock: true } },
    );
  } catch (error) {
    return null;
  }
};

module.exports.getItemIdsInCart = async (cartId) => {
  try {
    const allItems = await CartItem.findAll({
      where: {
        cart_id: cartId,
      },
      attributes: ['item_id'],
      raw: true,
    });

    return allItems;
  } catch (error) {
    return null;
  }
};

module.exports.findCartItem = async (cartId, itemId) => {
  try {
    const cartItem = await CartItem.findOne({
      where: {
        cart_id: cartId,
        item_id: itemId,
      },
    });
    return cartItem;
  } catch (error) {
    return null;
  }
};

module.exports.createCartItem = async (cartId, itemId, materialName) => {
  try {
    const newCartItem = await CartItem.create({
      cart_id: cartId,
      item_id: itemId,
      selected_material: materialName,
    });
    return newCartItem;
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
