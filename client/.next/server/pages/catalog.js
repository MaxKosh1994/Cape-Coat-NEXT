(() => {
var exports = {};
exports.id = 65;
exports.ids = [65];
exports.modules = {

/***/ 8613:
/***/ ((module) => {

// Exports
module.exports = {
	"headerText": "Catalog_headerText__wg3h9",
	"catalogueContainer": "Catalog_catalogueContainer__qLzc5",
	"categoryContainer": "Catalog_categoryContainer__YAYAE",
	"image": "Catalog_image__22kKR",
	"categoryName": "Catalog_categoryName__kXhmp"
};


/***/ }),

/***/ 5523:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  config: () => (/* binding */ config),
  "default": () => (/* binding */ next_route_loaderkind_PAGES_page_2Fcatalog_preferredRegion_absolutePagePath_private_next_pages_2Fcatalog_2Findex_tsx_absoluteAppPath_private_next_pages_2F_app_tsx_absoluteDocumentPath_private_next_pages_2F_document_tsx_middlewareConfigBase64_e30_3D_),
  getServerSideProps: () => (/* binding */ next_route_loaderkind_PAGES_page_2Fcatalog_preferredRegion_absolutePagePath_private_next_pages_2Fcatalog_2Findex_tsx_absoluteAppPath_private_next_pages_2F_app_tsx_absoluteDocumentPath_private_next_pages_2F_document_tsx_middlewareConfigBase64_e30_3D_getServerSideProps),
  getStaticPaths: () => (/* binding */ getStaticPaths),
  getStaticProps: () => (/* binding */ getStaticProps),
  reportWebVitals: () => (/* binding */ reportWebVitals),
  routeModule: () => (/* binding */ routeModule),
  unstable_getServerProps: () => (/* binding */ unstable_getServerProps),
  unstable_getServerSideProps: () => (/* binding */ unstable_getServerSideProps),
  unstable_getStaticParams: () => (/* binding */ unstable_getStaticParams),
  unstable_getStaticPaths: () => (/* binding */ unstable_getStaticPaths),
  unstable_getStaticProps: () => (/* binding */ unstable_getStaticProps)
});

// NAMESPACE OBJECT: ./src/pages/catalog/index.tsx
var catalog_namespaceObject = {};
__webpack_require__.r(catalog_namespaceObject);
__webpack_require__.d(catalog_namespaceObject, {
  "default": () => (catalog),
  getServerSideProps: () => (getServerSideProps)
});

// EXTERNAL MODULE: ./node_modules/next/dist/server/future/route-modules/pages/module.js
var pages_module = __webpack_require__(3185);
// EXTERNAL MODULE: ./node_modules/next/dist/server/future/route-kind.js
var route_kind = __webpack_require__(5244);
// EXTERNAL MODULE: ./node_modules/next/dist/build/webpack/loaders/next-route-loader/helpers.js
var helpers = __webpack_require__(7182);
// EXTERNAL MODULE: ./src/pages/_document.tsx
var _document = __webpack_require__(1522);
// EXTERNAL MODULE: ./src/pages/_app.tsx + 13 modules
var _app = __webpack_require__(5342);
// EXTERNAL MODULE: ./node_modules/react/jsx-runtime.js
var jsx_runtime = __webpack_require__(5893);
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(6689);
// EXTERNAL MODULE: external "next/router"
var router_ = __webpack_require__(9925);
// EXTERNAL MODULE: ./src/styles/Catalog.module.css
var Catalog_module = __webpack_require__(8613);
var Catalog_module_default = /*#__PURE__*/__webpack_require__.n(Catalog_module);
// EXTERNAL MODULE: ./node_modules/next/image.js
var next_image = __webpack_require__(5675);
var image_default = /*#__PURE__*/__webpack_require__.n(next_image);
;// CONCATENATED MODULE: ./src/components/catalog/CategoryList/categoryList.tsx





function CategoryList({ categoryInfo }) {
    const router = (0,router_.useRouter)();
    const categoryHandler = async (e)=>{
        const target = e.target;
        if (!target) return;
        const pathname = `/catalog/${categoryInfo.urlName}`;
        router.push({
            pathname
        }, undefined, {
            shallow: true
        });
    };
    return /*#__PURE__*/ jsx_runtime.jsx("div", {
        className: "oneCategory",
        id: categoryInfo.id,
        children: /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
            className: (Catalog_module_default()).categoryContainer,
            onClick: categoryHandler,
            children: [
                /*#__PURE__*/ jsx_runtime.jsx((image_default()), {
                    src: `${"http://localhost:3377/category/"}${categoryInfo.photo}`,
                    className: (Catalog_module_default()).image,
                    width: 400,
                    height: 600,
                    alt: categoryInfo.name
                }),
                /*#__PURE__*/ jsx_runtime.jsx("p", {
                    className: (Catalog_module_default()).categoryName,
                    children: categoryInfo.name
                })
            ]
        })
    });
}

// EXTERNAL MODULE: external "@mui/material"
var material_ = __webpack_require__(5692);
// EXTERNAL MODULE: external "next/head"
var head_ = __webpack_require__(968);
var head_default = /*#__PURE__*/__webpack_require__.n(head_);
;// CONCATENATED MODULE: ./src/pages/catalog/index.tsx






function Catalog({ allCategories }) {
    return /*#__PURE__*/ (0,jsx_runtime.jsxs)(jsx_runtime.Fragment, {
        children: [
            /*#__PURE__*/ (0,jsx_runtime.jsxs)((head_default()), {
                children: [
                    /*#__PURE__*/ jsx_runtime.jsx("title", {
                        children: "Cape&Coat | Каталог"
                    }),
                    /*#__PURE__*/ jsx_runtime.jsx("meta", {
                        name: "title",
                        content: "Cape and Coat"
                    }),
                    /*#__PURE__*/ jsx_runtime.jsx("meta", {
                        name: "viewport",
                        content: "width=device-width, initial-scale=1"
                    }),
                    /*#__PURE__*/ jsx_runtime.jsx("link", {
                        rel: "icon",
                        href: "/favicon.ico"
                    })
                ]
            }),
            /*#__PURE__*/ jsx_runtime.jsx(material_.Typography, {
                children: /*#__PURE__*/ jsx_runtime.jsx("span", {
                    className: (Catalog_module_default()).headerText,
                    children: /*#__PURE__*/ jsx_runtime.jsx("strong", {
                        children: "Каталог"
                    })
                })
            }),
            /*#__PURE__*/ jsx_runtime.jsx("div", {
                className: (Catalog_module_default()).catalogueContainer,
                children: allCategories.map((cat)=>/*#__PURE__*/ jsx_runtime.jsx(CategoryList, {
                        categoryInfo: cat
                    }, cat.id))
            })
        ]
    });
}
async function getServerSideProps() {
    try {
        const response = await fetch("http://77.222.53.48:3377/api/" + "catalog/categories", {
            credentials: "include"
        });
        if (response.status === 200) {
            const allCategories = await response.json();
            return {
                props: {
                    allCategories
                }
            };
        } else {
            return {
                props: {
                    allCategories: []
                }
            };
        }
    } catch (err) {
        console.error(err);
        return {
            props: {
                allCategories: []
            }
        };
    }
}
/* harmony default export */ const catalog = (Catalog);

;// CONCATENATED MODULE: ./node_modules/next/dist/build/webpack/loaders/next-route-loader/index.js?kind=PAGES&page=%2Fcatalog&preferredRegion=&absolutePagePath=private-next-pages%2Fcatalog%2Findex.tsx&absoluteAppPath=private-next-pages%2F_app.tsx&absoluteDocumentPath=private-next-pages%2F_document.tsx&middlewareConfigBase64=e30%3D!
// @ts-ignore this need to be imported from next/dist to be external



// Import the app and document modules.
// @ts-expect-error - replaced by webpack/turbopack loader

// @ts-expect-error - replaced by webpack/turbopack loader

// Import the userland code.
// @ts-expect-error - replaced by webpack/turbopack loader

const PagesRouteModule = pages_module.PagesRouteModule;
// Re-export the component (should be the default export).
/* harmony default export */ const next_route_loaderkind_PAGES_page_2Fcatalog_preferredRegion_absolutePagePath_private_next_pages_2Fcatalog_2Findex_tsx_absoluteAppPath_private_next_pages_2F_app_tsx_absoluteDocumentPath_private_next_pages_2F_document_tsx_middlewareConfigBase64_e30_3D_ = ((0,helpers/* hoist */.l)(catalog_namespaceObject, "default"));
// Re-export methods.
const getStaticProps = (0,helpers/* hoist */.l)(catalog_namespaceObject, "getStaticProps");
const getStaticPaths = (0,helpers/* hoist */.l)(catalog_namespaceObject, "getStaticPaths");
const next_route_loaderkind_PAGES_page_2Fcatalog_preferredRegion_absolutePagePath_private_next_pages_2Fcatalog_2Findex_tsx_absoluteAppPath_private_next_pages_2F_app_tsx_absoluteDocumentPath_private_next_pages_2F_document_tsx_middlewareConfigBase64_e30_3D_getServerSideProps = (0,helpers/* hoist */.l)(catalog_namespaceObject, "getServerSideProps");
const config = (0,helpers/* hoist */.l)(catalog_namespaceObject, "config");
const reportWebVitals = (0,helpers/* hoist */.l)(catalog_namespaceObject, "reportWebVitals");
// Re-export legacy methods.
const unstable_getStaticProps = (0,helpers/* hoist */.l)(catalog_namespaceObject, "unstable_getStaticProps");
const unstable_getStaticPaths = (0,helpers/* hoist */.l)(catalog_namespaceObject, "unstable_getStaticPaths");
const unstable_getStaticParams = (0,helpers/* hoist */.l)(catalog_namespaceObject, "unstable_getStaticParams");
const unstable_getServerProps = (0,helpers/* hoist */.l)(catalog_namespaceObject, "unstable_getServerProps");
const unstable_getServerSideProps = (0,helpers/* hoist */.l)(catalog_namespaceObject, "unstable_getServerSideProps");
// Create and export the route module that will be consumed.
const routeModule = new PagesRouteModule({
    definition: {
        kind: route_kind/* RouteKind */.x.PAGES,
        page: "/catalog",
        pathname: "/catalog",
        // The following aren't used in production.
        bundlePath: "",
        filename: ""
    },
    components: {
        App: _app["default"],
        Document: _document["default"]
    },
    userland: catalog_namespaceObject
});

//# sourceMappingURL=pages.js.map

/***/ }),

/***/ 3013:
/***/ ((module) => {

"use strict";
module.exports = require("@mui/base");

/***/ }),

/***/ 1747:
/***/ ((module) => {

"use strict";
module.exports = require("@mui/icons-material/AddShoppingCart");

/***/ }),

/***/ 4173:
/***/ ((module) => {

"use strict";
module.exports = require("@mui/icons-material/Close");

/***/ }),

/***/ 8012:
/***/ ((module) => {

"use strict";
module.exports = require("@mui/icons-material/DeleteOutline");

/***/ }),

/***/ 7372:
/***/ ((module) => {

"use strict";
module.exports = require("@mui/icons-material/Favorite");

/***/ }),

/***/ 5967:
/***/ ((module) => {

"use strict";
module.exports = require("@mui/icons-material/FavoriteBorderOutlined");

/***/ }),

/***/ 6920:
/***/ ((module) => {

"use strict";
module.exports = require("@mui/icons-material/FavoriteOutlined");

/***/ }),

/***/ 3365:
/***/ ((module) => {

"use strict";
module.exports = require("@mui/icons-material/Menu");

/***/ }),

/***/ 6324:
/***/ ((module) => {

"use strict";
module.exports = require("@mui/icons-material/Person2");

/***/ }),

/***/ 8017:
/***/ ((module) => {

"use strict";
module.exports = require("@mui/icons-material/Search");

/***/ }),

/***/ 6269:
/***/ ((module) => {

"use strict";
module.exports = require("@mui/icons-material/Telegram");

/***/ }),

/***/ 5692:
/***/ ((module) => {

"use strict";
module.exports = require("@mui/material");

/***/ }),

/***/ 5168:
/***/ ((module) => {

"use strict";
module.exports = require("@mui/material/Badge");

/***/ }),

/***/ 7934:
/***/ ((module) => {

"use strict";
module.exports = require("@mui/material/IconButton");

/***/ }),

/***/ 8855:
/***/ ((module) => {

"use strict";
module.exports = require("@mui/material/InputBase");

/***/ }),

/***/ 8125:
/***/ ((module) => {

"use strict";
module.exports = require("@mui/material/Menu");

/***/ }),

/***/ 9271:
/***/ ((module) => {

"use strict";
module.exports = require("@mui/material/MenuItem");

/***/ }),

/***/ 8442:
/***/ ((module) => {

"use strict";
module.exports = require("@mui/material/styles");

/***/ }),

/***/ 9868:
/***/ ((module) => {

"use strict";
module.exports = require("@mui/material/useMediaQuery");

/***/ }),

/***/ 5184:
/***/ ((module) => {

"use strict";
module.exports = require("@reduxjs/toolkit");

/***/ }),

/***/ 3473:
/***/ ((module) => {

"use strict";
module.exports = require("@vkontakte/icons");

/***/ }),

/***/ 2167:
/***/ ((module) => {

"use strict";
module.exports = require("axios");

/***/ }),

/***/ 3076:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/future/route-modules/route-module.js");

/***/ }),

/***/ 4140:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/get-page-files.js");

/***/ }),

/***/ 9716:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/htmlescape.js");

/***/ }),

/***/ 3100:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/render.js");

/***/ }),

/***/ 6368:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/utils.js");

/***/ }),

/***/ 3918:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/amp-context.js");

/***/ }),

/***/ 5732:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/amp-mode.js");

/***/ }),

/***/ 3280:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/app-router-context.js");

/***/ }),

/***/ 6724:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/constants.js");

/***/ }),

/***/ 5132:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/get-img-props.js");

/***/ }),

/***/ 2796:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/head-manager-context.js");

/***/ }),

/***/ 8743:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/html-context.js");

/***/ }),

/***/ 744:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/image-config-context.js");

/***/ }),

/***/ 5843:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/image-config.js");

/***/ }),

/***/ 8524:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/is-plain-object.js");

/***/ }),

/***/ 4964:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router-context.js");

/***/ }),

/***/ 1751:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/add-path-prefix.js");

/***/ }),

/***/ 3938:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/format-url.js");

/***/ }),

/***/ 1109:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/is-local-url.js");

/***/ }),

/***/ 8854:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/parse-path.js");

/***/ }),

/***/ 3297:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/remove-trailing-slash.js");

/***/ }),

/***/ 7782:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/resolve-href.js");

/***/ }),

/***/ 2470:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/side-effect.js");

/***/ }),

/***/ 9232:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/utils.js");

/***/ }),

/***/ 618:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/utils/warn-once.js");

/***/ }),

/***/ 968:
/***/ ((module) => {

"use strict";
module.exports = require("next/head");

/***/ }),

/***/ 9925:
/***/ ((module) => {

"use strict";
module.exports = require("next/router");

/***/ }),

/***/ 6689:
/***/ ((module) => {

"use strict";
module.exports = require("react");

/***/ }),

/***/ 9779:
/***/ ((module) => {

"use strict";
module.exports = require("react-cookie-consent");

/***/ }),

/***/ 6405:
/***/ ((module) => {

"use strict";
module.exports = require("react-dom");

/***/ }),

/***/ 6022:
/***/ ((module) => {

"use strict";
module.exports = require("react-redux");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [115,79], () => (__webpack_exec__(5523)));
module.exports = __webpack_exports__;

})();