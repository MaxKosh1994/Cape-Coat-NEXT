exports.id = 33;
exports.ids = [33];
exports.modules = {

/***/ 8526:
/***/ ((module) => {

// Exports
module.exports = {
	"mainDiv": "NavAdminComp_mainDiv__nDAGz",
	"routesDiv": "NavAdminComp_routesDiv__XCXCB",
	"button": "NavAdminComp_button__yXVpz",
	"active": "NavAdminComp_active__OeWo_",
	"hideText": "NavAdminComp_hideText__yGaFu"
};


/***/ }),

/***/ 3033:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (/* binding */ NavAdminComp)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5893);
/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(968);
/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_head__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _NavAdminComp_module_css__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(8526);
/* harmony import */ var _NavAdminComp_module_css__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_NavAdminComp_module_css__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5692);
/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_mui_material__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(1664);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(9925);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _mui_icons_material_Logout__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(9801);
/* harmony import */ var _mui_icons_material_Logout__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_mui_icons_material_Logout__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _accComp_sureModal_SureModal__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(466);









function NavAdminComp() {
    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_5__.useRouter)();
    const [open, setOpen] = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(false);
    const handleOpen = ()=>setOpen(true);
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)((next_head__WEBPACK_IMPORTED_MODULE_1___default()), {
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("title", {
                        children: "Cape&Coat | Кабинет администратора"
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("meta", {
                        name: "title",
                        content: "Cape and Coat"
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
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                className: (_NavAdminComp_module_css__WEBPACK_IMPORTED_MODULE_8___default().mainDiv),
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: (_NavAdminComp_module_css__WEBPACK_IMPORTED_MODULE_8___default().routesDiv),
                    children: [
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_link__WEBPACK_IMPORTED_MODULE_4___default()), {
                            href: "/admin/promo",
                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mui_material__WEBPACK_IMPORTED_MODULE_3__.Button, {
                                className: `${(_NavAdminComp_module_css__WEBPACK_IMPORTED_MODULE_8___default().button)} ${router.pathname === "/admin/promo" ? (_NavAdminComp_module_css__WEBPACK_IMPORTED_MODULE_8___default().active) : ""}`,
                                children: "Промокоды"
                            })
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_link__WEBPACK_IMPORTED_MODULE_4___default()), {
                            href: "/admin/content",
                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mui_material__WEBPACK_IMPORTED_MODULE_3__.Button, {
                                className: `${(_NavAdminComp_module_css__WEBPACK_IMPORTED_MODULE_8___default().button)} ${router.pathname === "/admin/content" ? (_NavAdminComp_module_css__WEBPACK_IMPORTED_MODULE_8___default().active) : ""}`,
                                children: "Добавить контент"
                            })
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_link__WEBPACK_IMPORTED_MODULE_4___default()), {
                            href: "/admin/ordersHistory",
                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mui_material__WEBPACK_IMPORTED_MODULE_3__.Button, {
                                className: `${(_NavAdminComp_module_css__WEBPACK_IMPORTED_MODULE_8___default().button)} ${router.pathname === "/admin/ordersHistory" ? (_NavAdminComp_module_css__WEBPACK_IMPORTED_MODULE_8___default().active) : ""}`,
                                children: "История заказов"
                            })
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_link__WEBPACK_IMPORTED_MODULE_4___default()), {
                            href: "/admin/tasks",
                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mui_material__WEBPACK_IMPORTED_MODULE_3__.Button, {
                                className: `${(_NavAdminComp_module_css__WEBPACK_IMPORTED_MODULE_8___default().button)} ${router.pathname === "/admin/tasks" ? (_NavAdminComp_module_css__WEBPACK_IMPORTED_MODULE_8___default().active) : ""}`,
                                children: "Заказы в работе"
                            })
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_link__WEBPACK_IMPORTED_MODULE_4___default()), {
                            href: "/admin/newOrder",
                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mui_material__WEBPACK_IMPORTED_MODULE_3__.Button, {
                                className: `${(_NavAdminComp_module_css__WEBPACK_IMPORTED_MODULE_8___default().button)} ${router.pathname === "/admin/newOrder" ? (_NavAdminComp_module_css__WEBPACK_IMPORTED_MODULE_8___default().active) : ""}`,
                                children: "Создать заказ"
                            })
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_link__WEBPACK_IMPORTED_MODULE_4___default()), {
                            href: "#",
                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_mui_material__WEBPACK_IMPORTED_MODULE_3__.Button, {
                                onClick: handleOpen,
                                className: (_NavAdminComp_module_css__WEBPACK_IMPORTED_MODULE_8___default().button),
                                type: "button",
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((_mui_icons_material_Logout__WEBPACK_IMPORTED_MODULE_6___default()), {}),
                                    "Выйти"
                                ]
                            })
                        })
                    ]
                })
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_accComp_sureModal_SureModal__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .Z, {
                open: open,
                setOpen: setOpen
            })
        ]
    });
}


/***/ })

};
;