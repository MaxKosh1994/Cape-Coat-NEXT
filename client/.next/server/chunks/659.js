exports.id = 659;
exports.ids = [659];
exports.modules = {

/***/ 3105:
/***/ ((module) => {

// Exports
module.exports = {
	"ContainerOneCard": "Favorites_ContainerOneCard__ia5Jt",
	"ProductCardsContainer": "Favorites_ProductCardsContainer__nQvt3",
	"infoContainer": "Favorites_infoContainer__K_Le0",
	"infoP": "Favorites_infoP__mluPk"
};


/***/ }),

/***/ 4659:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (/* binding */ Favorites)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5893);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Favorites_module_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(3105);
/* harmony import */ var _Favorites_module_css__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_Favorites_module_css__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6022);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _app_hooks__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1754);
/* harmony import */ var _app_thunkActionsFavourite__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(2158);
/* harmony import */ var _components_ProductCard_ProductCard__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(9670);



// import ProductCard from '../../ProductCard/ProductCard';




function Favorites() {
    let itemData = (0,react_redux__WEBPACK_IMPORTED_MODULE_2__.useSelector)((state)=>state.favouriteSlice.favoriteItemList);
    const { user } = (0,react_redux__WEBPACK_IMPORTED_MODULE_2__.useSelector)((state)=>state.sessionSlice);
    const dispatch = (0,_app_hooks__WEBPACK_IMPORTED_MODULE_3__/* .useAppDispatch */ .T)();
    const [favoriteItems, setFavoriteItems] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        dispatch((0,_app_thunkActionsFavourite__WEBPACK_IMPORTED_MODULE_4__/* .fetchAllFavorites */ .P2)());
    }, []);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        const favoritesFromStorage = JSON.parse(localStorage.getItem("favorites")) || "[]";
        const fetchData = async ()=>{
            const fetchedItems = [];
            for (const id of favoritesFromStorage){
                try {
                    const response = await fetch("http://77.222.53.48:3377/api/" + "item/" + id, {
                        credentials: "include"
                    });
                    if (response.status === 200) {
                        let itemData = await response.json();
                        fetchedItems.push(itemData);
                    } else if (response.status === 404) {
                        console.log("Товар не найден");
                    }
                } catch (err) {
                    console.log(err);
                }
            }
            setFavoriteItems(fetchedItems);
        };
        fetchData();
    }, []);
    if (!user) {
        itemData = [];
    }
    const renderProductCards = itemData && Array.isArray(itemData) ? itemData.map((item)=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ProductCard_ProductCard__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .Z, {
            id: item.id,
            material_name: item.Material.name,
            article: item.article,
            photo: item.Photos[0].photo,
            name: item.name,
            price: item.price,
            newPrice: item.new_price,
            isFavorite: item.isFavorite,
            isCart: item.isCart
        }, item.id)) : null;
    const renderProductCardsLocal = favoriteItems && Array.isArray(favoriteItems) ? favoriteItems.map((item)=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ProductCard_ProductCard__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .Z, {
            id: item.item.id,
            material_name: item.item.Material.name,
            article: item.item.article,
            photo: item.item.Photos[0].photo,
            name: item.item.name,
            price: item.item.price,
            newPrice: item.item.new_price,
            isFavorite: item.item.isFavorite,
            isCart: item.isCart
        }, item.item.id)) : null;
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: itemData?.length > 0 ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
            className: (_Favorites_module_css__WEBPACK_IMPORTED_MODULE_6___default().ContainerOneCard),
            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                className: (_Favorites_module_css__WEBPACK_IMPORTED_MODULE_6___default().ProductCardsContainer),
                children: renderProductCards
            })
        }) : favoriteItems?.length > 0 ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
            className: (_Favorites_module_css__WEBPACK_IMPORTED_MODULE_6___default().ContainerOneCard),
            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                className: (_Favorites_module_css__WEBPACK_IMPORTED_MODULE_6___default().ProductCardsContainer),
                children: renderProductCardsLocal
            })
        }) : /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
            className: (_Favorites_module_css__WEBPACK_IMPORTED_MODULE_6___default().infoContainer),
            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                className: (_Favorites_module_css__WEBPACK_IMPORTED_MODULE_6___default().infoP),
                children: "У вас пока нет товаров в избранном"
            })
        })
    });
}


/***/ })

};
;