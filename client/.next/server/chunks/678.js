"use strict";
exports.id = 678;
exports.ids = [678];
exports.modules = {

/***/ 678:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MO: () => (/* binding */ updateOrderItemFieldFetch),
/* harmony export */   Zg: () => (/* binding */ dataAxios),
/* harmony export */   _P: () => (/* binding */ allOrderDataFetch),
/* harmony export */   eQ: () => (/* binding */ updateOrderFieldFetch)
/* harmony export */ });
/* unused harmony export updateOrderDataFetch */
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2167);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);

// TODO нужна типизация, any заглушка
const dataAxios = async (setContent, setMessage, address, formData = undefined, url = undefined, id = undefined)=>{
    try {
        if (url === `create-${address}`) {
            //!POST
            const response = await axios__WEBPACK_IMPORTED_MODULE_0___default().post(`${"http://77.222.53.48:3377/api/"}admin/${address}/${url}`, formData, {
                withCredentials: true,
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });
            const responseData = await response.data;
            // TODO типизация
            setMessage((prev)=>responseData.message);
            setContent((prev)=>[
                    ...prev,
                    responseData.res
                ]);
            return responseData;
        } else if (url === `delete-${address}`) {
            //!DELETE
            const response = await axios__WEBPACK_IMPORTED_MODULE_0___default()["delete"](`${"http://77.222.53.48:3377/api/"}admin/${address}/${url}/${id}`, {
                withCredentials: true
            });
            const responseData = await response.data;
            // TODO типизация
            setContent((prev)=>[
                    ...prev.filter((el)=>el.id !== id)
                ]);
            setMessage((prev)=>responseData.message);
            return responseData;
        } else if (url === `update-${address}`) {
            //!PATCH
            const response = await axios__WEBPACK_IMPORTED_MODULE_0___default().patch(`${"http://77.222.53.48:3377/api/"}admin/${address}/${url}/${id}`, formData, {
                withCredentials: true,
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });
            const responseData = await response.data;
            // TODO типизация
            setContent((prev)=>{
                const updatedContent = prev.map((item)=>{
                    if (item.id === id) {
                        return {
                            ...responseData.res,
                            Photos: item.Photos
                        };
                    } else {
                        return item;
                    }
                });
                return updatedContent;
            });
            // TODO типизация
            setMessage((prev)=>responseData.message);
            return responseData;
        } else if (url === undefined) {
            //!GET
            const response = await axios__WEBPACK_IMPORTED_MODULE_0___default().get(`${"http://77.222.53.48:3377/api/"}admin/${address}/read-${address}`, {
                withCredentials: true
            });
            const responseData = await response.data;
            setContent(responseData.res);
            // setMessage((prev) => responseData.message);
            return responseData;
        }
    } catch (error) {
        console.log(error);
    }
};
// TODO нужна типизация, any заглушка
const allOrderDataFetch = async (setOrder)=>{
    try {
        const response = await fetch(`${"http://77.222.53.48:3377/api/"}admin/order/allorder`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include"
        });
        const data = await response.json();
        setOrder(data.allOrder);
    } catch (error) {
        console.log(error);
    }
};
// TODO нужна типизация, any заглушка
const updateOrderDataFetch = async (id, status, setMessage)=>{
    try {
        const response = await fetch(`${"http://77.222.53.48:3377/api/"}admin/order/update/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify({
                status: status
            })
        });
        const data = await response.json();
        // TODO типизация
        setMessage((prev)=>data.message);
    } catch (error) {
        console.log(error);
    }
};
const updateOrderFieldFetch = async (id, fieldName, fieldValue)=>{
    const response = await fetch(`${"http://77.222.53.48:3377/api/"}admin/order/updateOrderField/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({
            [fieldName]: fieldValue
        })
    });
    return await response.json();
};
const updateOrderItemFieldFetch = async (id, itemId, fieldName, fieldValue)=>{
    const response = await fetch(`${"http://77.222.53.48:3377/api/"}admin/order/updateOrderItemField/${id}/${itemId}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({
            [fieldName]: fieldValue
        })
    });
    return await response.json();
};


/***/ })

};
;