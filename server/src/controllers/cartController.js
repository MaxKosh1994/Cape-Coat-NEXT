const {
  Item,
  Cart,
  User,
  CartItem,
  Promocode,
  Photo,
} = require('../../db/models');
const {
  getUserCartItems,
  delUserCartItem,
  validatePromoCode,
  emptyUserCart,
} = require('../services/cartServices');

module.exports.getCart = async (req, res) => {
  try {
    const getUserCartResult = await getUserCartItems(req.params.user);
    if (getUserCartResult.success) {
      res.json(getUserCartResult.cartItems);
    }
  } catch (err) {
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};

module.exports.getCartInCat = async (req, res) => {
  try {
    const { user } = req.session;
    const userId = await User.findOne({
      where: {
        email: user,
      },
      raw: true,
    });

    if (!userId) {
      res.status(404).json({ message: 'Пользователь не найден' });
      return;
    }
    const cart = await Cart.findOrCreate({
      where: {
        user_id: userId.id,
      },
    });

    const allItems = await CartItem.findAll({
      where: {
        cart_id: cart[0].id,
      },
      attributes: ['item_id'],
      raw: true,
    });

    const itemsInCart = allItems.map((items) => items.item_id);

    if (!allItems || !itemsInCart) {
      res.status(403).json({ message: 'У вас пока нет товаров в корзине' });
    }

    res.status(200).json(itemsInCart);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};

module.exports.delItemFromCart = async (req, res) => {
  try {
    const delCartItemResult = await delUserCartItem(
      req.params.user,
      req.params.id,
    );
    if (delCartItemResult.success) {
      res.sendStatus(200);
    } else {
      res.sendStatus(500);
    }
  } catch (err) {
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};

module.exports.checkPromoCode = async (req, res) => {
  try {
    const validatePromoCodeResult = await validatePromoCode(req.params.code);
    if (validatePromoCodeResult.success) {
      res.status(200).json(validatePromoCodeResult.isValidPromo);
    } else {
      res.status(404).json(validatePromoCodeResult.message);
    }
  } catch (err) {
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};

module.exports.emptyCart = async (req, res) => {
  try {
    const emptyUserCartResult = emptyUserCart(req.params.user);
    res.json(emptyUserCartResult);
  } catch (err) {
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};

module.exports.addToCart = async (req, res) => {
  try {
    const email = req?.session?.user;
    const { id } = req.params;
    if (email) {
      const user = await User.findOne({
        where: { email },
        raw: true,
      });
      const userCart = await Cart.findOne({
        where: {
          user_id: user.id,
        },
        raw: true,
      });

      if (userCart) {
        const existingCartItem = await CartItem.findOne({
          where: {
            cart_id: userCart.id,
            item_id: id,
          },
        });

        const newCartItem = await CartItem.create({
          cart_id: userCart.id,
          item_id: id,
        });
        res.status(200).json({ newCartItem });
      } else {
        const newCart = await Cart.create({
          user_id: user.id,
        });
        const newCartItem = await CartItem.create({
          cart_id: newCart.id,
          item_id: id,
        });
        res.status(200).json({ newCartItem });
      }
    } else {
      res.status(401).json({ message: 'Unauthorized' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};

module.exports.checkCart = async (req, res) => {
  try {
    const email = req.session.user;
    const { id } = req.params;
    if (email) {
      const user = await User.findOne({
        where: { email },
        raw: true,
      });
      const userCart = await Cart.findOne({
        where: {
          user_id: user.id,
        },

        raw: true,
      });

      if (userCart) {
        const cartItem = await CartItem.findAll({
          where: {
            cart_id: userCart.id,
          },
          raw: true,
        });
        res.status(200).json({ cartItem });
      } else {
        res.status(200).json({ cartItem: [] });
      }
    } else {
      res.status(401).json({ message: 'Unauthorized' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports.addToCartInOneCat = async (req, res) => {
  try {
    const { user } = req.session;
    const cardInCart = req.body;

    const userId = await User.findOne({
      where: {
        email: user,
      },
      raw: true,
    });

    const findCart = await Cart.findAll({
      where: {
        user_id: userId.id,
      },
      raw: true,
      nest: true,
    });

    const itemCart = await CartItem.findOrCreate({
      where: {
        cart_id: findCart[0].id,
        item_id: cardInCart.id,
      },
      plain: true,
    });
    if (itemCart) {
      res.status(200).json(itemCart);
    } else {
      res.status(404);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};

module.exports.delToCartInOneCat = async (req, res) => {
  try {
    const { user } = req.session;
    const delCard = req.body;

    const userId = await User.findOne({
      where: {
        email: user,
      },
      raw: true,
    });
    const cart = await Cart.findOne({
      where: {
        user_id: userId.id,
      },
      raw: true,
      nest: true,
    });

    const delItemInCart = await CartItem.findOne({
      where: {
        cart_id: cart.id,
        item_id: delCard.id,
      },
    });

    if (delItemInCart) {
      const deletedItemId = delItemInCart.item_id;
      const deleteUserItem = userId.email;

      await delItemInCart.destroy();
      res.status(200).json({ item_id: deletedItemId, user: deleteUserItem });
    } else {
      res.status(404);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};
