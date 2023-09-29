exports.id = 466;
exports.ids = [466];
exports.modules = {

/***/ 864:
/***/ ((module) => {

// Exports
module.exports = {
	"mainContainer": "sureModal_mainContainer__slDQc",
	"box": "sureModal_box__z6eDO",
	"questionContainer": "sureModal_questionContainer__LCWBw",
	"buttonContainer": "sureModal_buttonContainer__0x1_l",
	"buttonExit": "sureModal_buttonExit__rpXvK",
	"button": "sureModal_button__BShyu"
};


/***/ }),

/***/ 466:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (/* binding */ SureModal)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5893);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _mui_material_Box__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(19);
/* harmony import */ var _mui_material_Box__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_mui_material_Box__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _mui_material_Button__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(3819);
/* harmony import */ var _mui_material_Button__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_mui_material_Button__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _mui_material_Modal__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(9564);
/* harmony import */ var _mui_material_Modal__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_mui_material_Modal__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _sureModal_module_css__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(864);
/* harmony import */ var _sureModal_module_css__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_sureModal_module_css__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _app_thunkActionsAuth__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(3014);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(6022);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _app_sessionSlice__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(194);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(9925);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_8__);










function SureModal({ open, setOpen }) {
    const dispatch = (0,react_redux__WEBPACK_IMPORTED_MODULE_6__.useDispatch)();
    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_8__.useRouter)();
    const [info, setInfo] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)("");
    const logOutHandler = async (event)=>{
        event.preventDefault();
        try {
            // TODO проблема типизации
            await dispatch((0,_app_thunkActionsAuth__WEBPACK_IMPORTED_MODULE_5__/* .signOutUserThunk */ .Ew)());
            setInfo("Вы вышли из аккаунта");
            setOpen(false);
            dispatch((0,_app_sessionSlice__WEBPACK_IMPORTED_MODULE_7__/* .checkSession */ .bV)({
                isLogin: false,
                user: "",
                isAdmin: false
            }));
            router.push("/");
        } catch (Error) {
            console.log(Error);
        }
    };
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((_mui_material_Modal__WEBPACK_IMPORTED_MODULE_4___default()), {
        open: open,
        onClose: ()=>setOpen(false),
        "aria-labelledby": "modal-modal-title",
        "aria-describedby": "modal-modal-description",
        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((_mui_material_Box__WEBPACK_IMPORTED_MODULE_2___default()), {
            className: (_sureModal_module_css__WEBPACK_IMPORTED_MODULE_9___default().box),
            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: (_sureModal_module_css__WEBPACK_IMPORTED_MODULE_9___default().mainContainer),
                children: [
                    info.length > 0 && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                        children: info
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                        className: (_sureModal_module_css__WEBPACK_IMPORTED_MODULE_9___default().questionContainer),
                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h3", {
                            children: "Вы уверены, что хотите выйти из аккаунта?"
                        })
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: (_sureModal_module_css__WEBPACK_IMPORTED_MODULE_9___default().buttonContainer),
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((_mui_material_Button__WEBPACK_IMPORTED_MODULE_3___default()), {
                                onClick: ()=>setOpen(false),
                                className: (_sureModal_module_css__WEBPACK_IMPORTED_MODULE_9___default().button),
                                type: "submit",
                                variant: "contained",
                                color: "secondary",
                                children: "Отмена"
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((_mui_material_Button__WEBPACK_IMPORTED_MODULE_3___default()), {
                                onClick: logOutHandler,
                                className: (_sureModal_module_css__WEBPACK_IMPORTED_MODULE_9___default().buttonExit),
                                type: "submit",
                                variant: "contained",
                                color: "primary",
                                children: "Выйти"
                            })
                        ]
                    })
                ]
            })
        })
    });
}


/***/ })

};
;