const { Cart, CartItem, Item } = require('../../db/models');
const { findUserByEmail } = require('../services/userService');
const {
  getUserCartItems,
  getItemIdsInCart,
  findCartItem,
  createCartItem,
} = require('../services/cartItemService');
const {
  delUserCartItem,
  validatePromoCode,
  emptyUserCart,
  findUserCart,
  getOrCreateUserCart,
  createUserCart,
} = require('../services/cartServices');

module.exports.getCart = async (req, res) => {
  try {
    const userEmail = req.session.user;
    const user = await findUserByEmail(userEmail);

    if (user) {
      const cartItems = await getUserCartItems(user.id);
      res.json(cartItems);
    } else {
      res.status(401).json({ message: 'Unauthorized' });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};

module.exports.getCartInCat = async (req, res) => {
  try {
    const { user } = req.session;
    const currUser = await findUserByEmail(user);
    if (!currUser) {
      res.status(404).json({ message: 'Пользователь не найден' });
      return;
    }
    const cart = await getOrCreateUserCart(currUser.id);
    const allItems = await getItemIdsInCart(cart[0].id);
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
    const { user, id } = req.params;
    const currUser = await findUserByEmail(user);
    const userCart = await findUserCart(currUser.id);
    const delCartItemResult = await delUserCartItem(userCart.id, id);
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
    console.log(err);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};

module.exports.emptyCart = async (req, res) => {
  try {
    const userEmail = req.params.user;
    const currUser = await findUserByEmail(userEmail);
    const emptyUserCartResult = emptyUserCart(currUser.id);
    res.json(emptyUserCartResult);
  } catch (err) {
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};

module.exports.addMeasures = async (req, res) => {
  try {
    const { user } = req.session;
    const { id } = req.params;
    const {
      height,
      length,
      sleeve,
      bust,
      waist,
      hips,
      saddle,
      loops,
      buttons,
      lining,
    } = req.body;
    const currUser = await findUserByEmail(user);
    const userCart = await findUserCart(currUser.id);
    if (userCart) {
      const updMeasures = await CartItem.update(
        {
          height,
          length,
          sleeve,
          bust,
          waist,
          hips,
          saddle,
          loops: Boolean(loops),
          buttons,
          lining,
          added: true,
        },
        { where: { item_id: id } },
      );
      if (updMeasures) {
        const updCartItem = await CartItem.findOne({
          where: { item_id: id },
        });

        res.status(200).json(updCartItem);
      } else {
        res
          .status(500)
          .json({ message: 'Что-то пошло не так, попробуйте позже' });
      }
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports.addToCart = async (req, res) => {
  try {
    const email = req?.session?.user;

    const { id } = req.params;
    // eslint-disable-next-line camelcase
    const { material_name } = req.body;

    if (email) {
      const currUser = await findUserByEmail(email);
      const userCart = await findUserCart(currUser.id);
      const newCartItem = await createCartItem(userCart.id, id, material_name);
      res.status(200).json(newCartItem);
    } else {
      res.status(401).json({ message: 'Unauthorized' });
    }
  } catch (error) {
    console.log('cart error', error);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};

module.exports.checkCart = async (req, res) => {
  try {
    const { email } = req.params;

    if (email) {
      const currUser = await findUserByEmail(email);
      const userCart = await findUserCart(currUser.id);

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
    const currUser = await findUserByEmail(user);

    const findCart = await Cart.findOrCreate({
      where: {
        user_id: currUser.id,
      },
      raw: true,
      nest: true,
    });

    const itemCart = await CartItem.findOrCreate({
      where: {
        cart_id: findCart[0].id,
        item_id: cardInCart.id,
        selected_material: cardInCart.material_name,
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

    const currUser = await findUserByEmail(user);

    const cart = await Cart.findOne({
      where: {
        user_id: currUser.id,
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
      const deleteUserItem = currUser.email;

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
