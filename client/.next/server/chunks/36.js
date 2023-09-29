exports.id = 36;
exports.ids = [36];
exports.modules = {

/***/ 6089:
/***/ ((module) => {

// Exports
module.exports = {
	"pageContainer": "BasePage_pageContainer__z9jas",
	"header": "BasePage_header__nYr4K",
	"cardsContainer": "BasePage_cardsContainer__OQVEc"
};


/***/ }),

/***/ 4036:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (/* binding */ BasePage)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5893);
/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(968);
/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_head__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _styles_BasePage_module_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(6089);
/* harmony import */ var _styles_BasePage_module_css__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_styles_BasePage_module_css__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _components_ProductCard_ProductCard__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(9670);




function BasePage({ pageName, itemsArr }) {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)((next_head__WEBPACK_IMPORTED_MODULE_1___default()), {
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("title", {
                        children: [
                            "Cape&Coat | ",
                            pageName
                        ]
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("meta", {
                        name: "title",
                        content: "Cape and Coat"
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("meta", {
                        name: "viewport",
                        content: "width=device-width, initial-scale=1"
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("meta", {
                        name: "title",
                        content: "Cape and Coat - Индивидуальная одежда на заказ"
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("meta", {
                        name: "keywords",
                        content: "пошив одежды, пошив одежды рядом, на заказ, Cape&Coat, одежда по меркам, женская одежда на заказ, пошив на заказ для женщин, пошив платья, пошив платья на заказ, пошив пальто, пошив женских пальто, пошив костюма, пошив костюма на заказ, пошив женских костюмов, пошив брюк женских, пошив брюк, пошив юбок, пошив на заказ, пошив тренча, пошив шуб, пошив шуб на заказ, пошив искусственных шуб, индивидуальный пошив шубы, пошив женского пиджака, пошив пиджака, пошив одежды цена"
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("meta", {
                        name: "viewport",
                        content: "width=device-width, initial-scale=1"
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("link", {
                        rel: "icon",
                        href: "/favicon.ico"
                    })
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: (_styles_BasePage_module_css__WEBPACK_IMPORTED_MODULE_3___default().pageContainer),
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h3", {
                        className: (_styles_BasePage_module_css__WEBPACK_IMPORTED_MODULE_3___default().header),
                        children: pageName
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                        className: (_styles_BasePage_module_css__WEBPACK_IMPORTED_MODULE_3___default().cardsContainer),
                        children: itemsArr.map((item)=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ProductCard_ProductCard__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z, {
                                material_name: item.Material.name,
                                id: item.id,
                                article: item.article,
                                photo: item?.photo || item?.Photos[0]?.photo,
                                name: item.name,
                                price: item.price,
                                isFavorite: item.isFavorite,
                                isCart: item.isCart,
                                newPrice: item.new_price
                            }, item.id))
                    })
                ]
            })
        ]
    });
}


/***/ })

};
;