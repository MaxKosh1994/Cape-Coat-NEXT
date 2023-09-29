exports.id = 670;
exports.ids = [670];
exports.modules = {

/***/ 8258:
/***/ ((module) => {

// Exports
module.exports = {
	"Card": "ProductCard_Card__jOQhm",
	"CardMedia": "ProductCard_CardMedia__9rZlI",
	"Image": "ProductCard_Image__SDc8f",
	"NameCard": "ProductCard_NameCard__hi5AD",
	"CardContent": "ProductCard_CardContent__4sZLG",
	"Price": "ProductCard_Price__v5AwF",
	"OldPrice": "ProductCard_OldPrice__RN8OD",
	"NewPrice": "ProductCard_NewPrice__p3_er",
	"PriceOne": "ProductCard_PriceOne__GM4gL",
	"Icons": "ProductCard_Icons__WehvY",
	"IconImage": "ProductCard_IconImage__8Snbm"
};


/***/ }),

/***/ 9670:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  Z: () => (/* binding */ ProductCard_ProductCard)
});

// EXTERNAL MODULE: ./node_modules/react/jsx-runtime.js
var jsx_runtime = __webpack_require__(5893);
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(6689);
// EXTERNAL MODULE: ./src/components/ProductCard/ProductCard.module.css
var ProductCard_module = __webpack_require__(8258);
var ProductCard_module_default = /*#__PURE__*/__webpack_require__.n(ProductCard_module);
// EXTERNAL MODULE: ./src/app/hooks.ts
var hooks = __webpack_require__(1754);
// EXTERNAL MODULE: external "react-redux"
var external_react_redux_ = __webpack_require__(6022);
// EXTERNAL MODULE: ./src/app/CategorySlice.tsx
var CategorySlice = __webpack_require__(1853);
// EXTERNAL MODULE: external "axios"
var external_axios_ = __webpack_require__(2167);
var external_axios_default = /*#__PURE__*/__webpack_require__.n(external_axios_);
;// CONCATENATED MODULE: ./src/components/ProductCard/thunkProduct.ts

const addToFavorites = async (data)=>{
    try {
        const response = await external_axios_default().post(`${"http://localhost:3377/api/"}favorite/add`, data, {
            headers: {
                "Content-Type": "application/json"
            },
            withCredentials: true
        });
        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        throw error;
    }
};
const removeFromFavorites = async (data)=>{
    try {
        const response = await external_axios_default()["delete"](`${"http://localhost:3377/api/"}favorite/del`, {
            data,
            headers: {
                "Content-Type": "application/json"
            },
            withCredentials: true
        });
        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        throw error;
    }
};
const addToCart = async (data)=>{
    console.log({
        data
    });
    try {
        const response = await external_axios_default().post(`${"http://localhost:3377/api/"}cart/item/add`, data, {
            headers: {
                "Content-Type": "application/json"
            },
            withCredentials: true
        });
        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        throw error;
    }
};
const addToCartItem = async (data)=>{
    try {
        const response = await axios.post(`${"http://localhost:3377/api/"}cart/item/add`, data, {
            headers: {
                "Content-Type": "application/json"
            },
            withCredentials: true
        });
        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        throw error;
    }
};
const removeFromCart = async (data)=>{
    try {
        const response = await external_axios_default()["delete"](`${"http://localhost:3377/api/"}cart/item/del`, {
            data,
            headers: {
                "Content-Type": "application/json"
            },
            withCredentials: true
        });
        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        throw error;
    }
};

// EXTERNAL MODULE: ./src/app/thunkActionsFavourite.tsx
var thunkActionsFavourite = __webpack_require__(2158);
// EXTERNAL MODULE: ./src/app/thunkActionsCart.ts
var thunkActionsCart = __webpack_require__(3831);
// EXTERNAL MODULE: ./src/app/favouriteSlice.tsx
var favouriteSlice = __webpack_require__(5031);
;// CONCATENATED MODULE: ./src/components/ProductCard/useProductCardLogic.ts








const useProductCardLogic = (id, material_name, article, photo, name, price, initialIsFavorite, initialIsCart, newPrice, urlName)=>{
    const dispatch = (0,hooks/* useAppDispatch */.T)();
    const [isFavorite, setIsFavorite] = (0,external_react_.useState)(initialIsFavorite);
    const [isCart, setIsCart] = (0,external_react_.useState)(initialIsCart);
    const [favCard, setFavCard] = (0,external_react_.useState)();
    const { user } = (0,external_react_redux_.useSelector)((state)=>state.sessionSlice);
    const favoriteHandler = async ()=>{
        if (!user) {
            const favoritesFromStorage = JSON.parse(localStorage.getItem("favorites")) || [];
            const isItemInFavorites = favoritesFromStorage.includes(id);
            if (isItemInFavorites) {
                const updatedFavorites = favoritesFromStorage.filter((favId)=>favId !== id);
                localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
                setIsFavorite(!isFavorite);
                await dispatch((0,favouriteSlice/* setFavourites */.Ou)(updatedFavorites));
            } else {
                const updatedFavorites = [
                    ...favoritesFromStorage,
                    id
                ];
                localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
                setIsFavorite(!isFavorite);
                await dispatch((0,favouriteSlice/* setFavourites */.Ou)(updatedFavorites));
            }
        } else {
            setIsFavorite(!isFavorite);
            try {
                const favoriteData = {
                    id,
                    material_name,
                    article,
                    photo,
                    name,
                    newPrice,
                    price,
                    isFavorite: !isFavorite,
                    isCart
                };
                const favoriteAction = isFavorite ? removeFromFavorites : addToFavorites;
                const favorite = await favoriteAction(favoriteData);
                setFavCard(favorite);
                await dispatch((0,thunkActionsFavourite/* fetchFavouritesData */.j_)());
                await dispatch((0,favouriteSlice/* setLikedStatus */.qC)(!isFavorite));
            } catch (err) {
                console.log(err);
            }
        }
    };
    const cartHandler = async ()=>{
        if (!user) {
            const cartItemsFromStorage = JSON.parse(localStorage.getItem("cartItems")) || [];
            const isItemInCart = cartItemsFromStorage.find((item)=>item.id === id);
            if (isItemInCart) {
                const updatedCartItems = cartItemsFromStorage.filter((item)=>item.id !== id);
                localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
                setIsCart(!isCart);
                await dispatch((0,thunkActionsCart/* getCartItemsByIdThunk */.gn)(updatedCartItems));
            } else {
                const updatedCartItems = [
                    ...cartItemsFromStorage,
                    {
                        id,
                        material_name,
                        in_stock: newPrice ? true : false
                    }
                ];
                localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
                setIsCart(!isCart);
                await dispatch((0,thunkActionsCart/* getCartItemsByIdThunk */.gn)(updatedCartItems));
            }
        } else {
            setIsCart(!isCart);
            try {
                const cartData = {
                    id,
                    material_name,
                    article,
                    photo,
                    name,
                    newPrice,
                    price,
                    isFavorite,
                    isCart: !isCart
                };
                if (!isCart) {
                    const inCart = await addToCart(cartData);
                    const itemInCart = inCart[1];
                    setIsCart(itemInCart);
                    await dispatch((0,thunkActionsCart/* getCartItemsThunk */.SM)());
                } else {
                    const delCart = await removeFromCart(cartData);
                    await dispatch((0,thunkActionsCart/* getCartItemsThunk */.SM)());
                    setIsCart(false);
                }
            } catch (err) {
                console.log(err);
            }
        }
    };
    (0,external_react_.useEffect)(()=>{
        if (user) {
            //TODO если ничего не меняет, то проще так оставить : одна строка вместо кучи кода
            // const cartItemsFromStorage = localStorage.getItem('cartItems');
            const cartItemsFromStorage = JSON.parse(localStorage.getItem("cartItems")) || [];
            // let cartFromStorage = [];
            // console.log('!!!!!!', cartItemsFromStorage);
            // console.log('typeof', typeof cartItemsFromStorage);
            // if (cartItemsFromStorage) {
            //   try {
            //     cartFromStorage = JSON.parse(cartItemsFromStorage);
            //   } catch (error) {
            //     console.error('Error parsing cartItems from localStorage:', error);
            //   }
            if (cartItemsFromStorage.length > 0) {
                Promise.all(cartItemsFromStorage.map(async (cartId)=>{
                    const cartData = {
                        id: cartId.id,
                        material_name: cartId.material_name
                    };
                    console.log({
                        cartData
                    });
                    return addToCart(cartData);
                })).then(()=>{
                    localStorage.removeItem("cartItems");
                    dispatch((0,thunkActionsCart/* getCartItemsThunk */.SM)());
                }).catch((error)=>{
                    console.error("Error while adding item in cart:", error);
                });
            }
            const fetchData = async ()=>{
                try {
                    const response = await fetch("http://localhost:3377/api/" + "cart/cartInCat", {
                        method: "GET",
                        credentials: "include"
                    });
                    if (response.status === 200) {
                        const allItemInCart = await response.json();
                        const isProductInCart = allItemInCart.includes(id);
                        setIsCart(isProductInCart);
                    }
                    dispatch((0,CategorySlice/* toggleCart */.l6)(id));
                } catch (err) {
                    console.log(err);
                }
            };
            fetchData();
        // }
        } else {
            const cartFromStorage = JSON.parse(localStorage.getItem("cartItems") || "[]");
            async function fetchUpdCartItems(cartFromStorage) {
                try {
                    await dispatch((0,thunkActionsCart/* getCartItemsByIdThunk */.gn)(cartFromStorage));
                } catch (error) {
                    console.error("Error while fetching cart items:", error);
                }
            }
            fetchUpdCartItems(cartFromStorage);
            const isItemInCart = cartFromStorage.some((element)=>element.id === id);
            setIsCart(isItemInCart);
        }
    }, [
        user
    ]);
    (0,external_react_.useEffect)(()=>{
        if (user) {
            const favoritesFromStorage = JSON.parse(localStorage.getItem("favorites")) || [];
            if (favoritesFromStorage.length > 0) {
                Promise.all(favoritesFromStorage.map(async (favId)=>{
                    const favoriteData = {
                        id: favId
                    };
                    return addToFavorites(favoriteData);
                })).then(()=>{
                    // Удалить данные из localStorage после успешной отправки
                    localStorage.removeItem("favorites");
                    // Запросить обновленные данные об избранных с сервера
                    dispatch((0,thunkActionsFavourite/* fetchFavouritesData */.j_)());
                }).catch((error)=>{
                    console.error("Error while adding favorites:", error);
                });
            }
            const fetchData = async ()=>{
                try {
                    const response = await fetch("http://localhost:3377/api/" + "favorite", {
                        method: "GET",
                        credentials: "include"
                    });
                    if (response.status === 200) {
                        const favorites = await response.json();
                        const isProductFavorite = favorites.includes(id);
                        setIsFavorite(isProductFavorite);
                    }
                    dispatch((0,CategorySlice/* toggleFavorite */.mN)(id));
                } catch (err) {
                    console.log(err);
                }
            };
            fetchData();
        } else {
            const favoritesFromStorage = JSON.parse(localStorage.getItem("favorites") || "[]");
            const itemsLocal = localStorage.getItem("cartItems");
            if (itemsLocal !== null) {
                const parsedItems = JSON.parse(itemsLocal);
                dispatch((0,thunkActionsCart/* getCartItemsByIdThunk */.gn)(parsedItems));
            }
            dispatch((0,favouriteSlice/* setFavourites */.Ou)(favoritesFromStorage));
            const isItemInFavorites = favoritesFromStorage.includes(id);
            setIsFavorite(isItemInFavorites);
        }
    }, [
        user
    ]);
    return {
        isFavorite,
        isCart,
        favoriteHandler,
        cartHandler,
        urlName
    };
};
/* harmony default export */ const ProductCard_useProductCardLogic = (useProductCardLogic);

// EXTERNAL MODULE: external "@mui/material"
var material_ = __webpack_require__(5692);
// EXTERNAL MODULE: external "@mui/icons-material/FavoriteBorderOutlined"
var FavoriteBorderOutlined_ = __webpack_require__(5967);
var FavoriteBorderOutlined_default = /*#__PURE__*/__webpack_require__.n(FavoriteBorderOutlined_);
// EXTERNAL MODULE: external "@mui/icons-material/Favorite"
var Favorite_ = __webpack_require__(7372);
var Favorite_default = /*#__PURE__*/__webpack_require__.n(Favorite_);
;// CONCATENATED MODULE: ./src/components/ProductCard/FavoriteIconButton.tsx






const FavoriteIconButton = ({ isFavorite, onClick, itemId })=>{
    return /*#__PURE__*/ jsx_runtime.jsx(material_.IconButton, {
        className: (ProductCard_module_default()).IconImage,
        "aria-label": "Add to favorites",
        onClick: onClick,
        children: isFavorite ? /*#__PURE__*/ jsx_runtime.jsx((Favorite_default()), {
            className: (ProductCard_module_default()).IconImage,
            style: {
                color: "rgb(0 0 0 / 70%)"
            }
        }) : /*#__PURE__*/ jsx_runtime.jsx((FavoriteBorderOutlined_default()), {
            className: (ProductCard_module_default()).IconImage
        })
    });
};
/* harmony default export */ const ProductCard_FavoriteIconButton = (FavoriteIconButton);

// EXTERNAL MODULE: external "@mui/icons-material/AddTask"
var AddTask_ = __webpack_require__(9560);
var AddTask_default = /*#__PURE__*/__webpack_require__.n(AddTask_);
// EXTERNAL MODULE: external "@mui/icons-material/AddShoppingCart"
var AddShoppingCart_ = __webpack_require__(1747);
var AddShoppingCart_default = /*#__PURE__*/__webpack_require__.n(AddShoppingCart_);
;// CONCATENATED MODULE: ./src/components/ProductCard/CartIconButton.tsx






const CartIconButton = ({ isCart, onClick, itemId })=>{
    return /*#__PURE__*/ jsx_runtime.jsx(material_.IconButton, {
        className: (ProductCard_module_default()).IconImage,
        onClick: onClick,
        "aria-label": "Add to cart",
        children: isCart ? /*#__PURE__*/ jsx_runtime.jsx((AddTask_default()), {
            className: (ProductCard_module_default()).IconImage,
            style: {
                color: "rgb(0 0 0 / 70%)"
            }
        }) : /*#__PURE__*/ jsx_runtime.jsx((AddShoppingCart_default()), {
            className: (ProductCard_module_default()).IconImage
        })
    });
};
/* harmony default export */ const ProductCard_CartIconButton = (CartIconButton);

// EXTERNAL MODULE: external "next/router"
var router_ = __webpack_require__(9925);
// EXTERNAL MODULE: ./node_modules/next/link.js
var next_link = __webpack_require__(1664);
var link_default = /*#__PURE__*/__webpack_require__.n(next_link);
// EXTERNAL MODULE: external "numeral"
var external_numeral_ = __webpack_require__(8032);
var external_numeral_default = /*#__PURE__*/__webpack_require__.n(external_numeral_);
;// CONCATENATED MODULE: ./src/components/ProductCard/ProductCard.tsx









const ProductCard = ({ id, material_name, article, photo, name, price, isFavorite: initialIsFavorite, isCart: initialIsCart, newPrice, isItemInFavoritesState, urlName })=>{
    const { isFavorite, isCart, favoriteHandler, cartHandler } = ProductCard_useProductCardLogic(id, material_name, article, photo, name, price, initialIsFavorite, initialIsCart, newPrice, urlName);
    const router = (0,router_.useRouter)();
    const linkToShow = router.asPath.replace(/^\/catalog|\/\d+$/g, "");
    return /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
        className: (ProductCard_module_default()).Card,
        children: [
            linkToShow[0] === "/" ? /*#__PURE__*/ (0,jsx_runtime.jsxs)((link_default()), {
                href: router.pathname === "/" ? `/${urlName}/${id}` : `/catalog${linkToShow}/${id}`,
                as: router.pathname === "/" ? `/catalog/${urlName}/${id}` : `/catalog${linkToShow}/${id}`,
                children: [
                    /*#__PURE__*/ jsx_runtime.jsx("span", {
                        className: (ProductCard_module_default()).CardMedia,
                        children: /*#__PURE__*/ jsx_runtime.jsx("img", {
                            src: `${"http://localhost:3377/items/"}${photo}`,
                            alt: name,
                            className: (ProductCard_module_default()).Image
                        })
                    }),
                    /*#__PURE__*/ jsx_runtime.jsx("h1", {
                        className: (ProductCard_module_default()).NameCard,
                        children: name
                    })
                ]
            }) : /*#__PURE__*/ (0,jsx_runtime.jsxs)((link_default()), {
                href: router.pathname === "/" ? `/${urlName}/${id}` : `/catalog${linkToShow}/${id}`,
                as: router.pathname === "/" ? `/catalog/${urlName}/${id}` : `/catalog/${linkToShow}/${id}`,
                children: [
                    /*#__PURE__*/ jsx_runtime.jsx("span", {
                        className: (ProductCard_module_default()).CardMedia,
                        children: /*#__PURE__*/ jsx_runtime.jsx("img", {
                            src: `${"http://localhost:3377/items/"}${photo}`,
                            alt: name,
                            className: (ProductCard_module_default()).Image
                        })
                    }),
                    /*#__PURE__*/ jsx_runtime.jsx("h1", {
                        className: (ProductCard_module_default()).NameCard,
                        children: name
                    })
                ]
            }),
            newPrice ? /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                className: (ProductCard_module_default()).CardContent,
                children: [
                    /*#__PURE__*/ (0,jsx_runtime.jsxs)("h3", {
                        className: (ProductCard_module_default()).NewPrice,
                        children: [
                            external_numeral_default()(newPrice).format("0,0"),
                            " ₽"
                        ]
                    }),
                    /*#__PURE__*/ (0,jsx_runtime.jsxs)("h3", {
                        className: (ProductCard_module_default()).OldPrice,
                        children: [
                            external_numeral_default()(price).format("0,0"),
                            " ₽"
                        ]
                    }),
                    /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                        className: (ProductCard_module_default()).Icons,
                        children: [
                            /*#__PURE__*/ jsx_runtime.jsx(ProductCard_FavoriteIconButton, {
                                isFavorite: isFavorite,
                                onClick: favoriteHandler,
                                itemId: id
                            }),
                            /*#__PURE__*/ jsx_runtime.jsx(ProductCard_CartIconButton, {
                                isCart: isCart,
                                onClick: cartHandler,
                                itemId: id
                            })
                        ]
                    })
                ]
            }) : /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                className: (ProductCard_module_default()).CardContent,
                children: [
                    /*#__PURE__*/ (0,jsx_runtime.jsxs)("h3", {
                        className: (ProductCard_module_default()).PriceOne,
                        children: [
                            external_numeral_default()(price).format("0,0"),
                            " ₽"
                        ]
                    }),
                    /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                        className: (ProductCard_module_default()).Icons,
                        children: [
                            /*#__PURE__*/ jsx_runtime.jsx(ProductCard_FavoriteIconButton, {
                                isFavorite: isFavorite,
                                onClick: favoriteHandler,
                                itemId: id
                            }),
                            /*#__PURE__*/ jsx_runtime.jsx(ProductCard_CartIconButton, {
                                isCart: isCart,
                                onClick: cartHandler,
                                itemId: id
                            })
                        ]
                    })
                ]
            })
        ]
    }, id);
};
/* harmony default export */ const ProductCard_ProductCard = (ProductCard);


/***/ })

};
;