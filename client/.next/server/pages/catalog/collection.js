"use strict";
(() => {
var exports = {};
exports.id = 382;
exports.ids = [382];
exports.modules = {

/***/ 1292:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  config: () => (/* binding */ config),
  "default": () => (/* binding */ next_route_loaderkind_PAGES_page_2Fcatalog_2Fcollection_preferredRegion_absolutePagePath_private_next_pages_2Fcatalog_2Fcollection_tsx_absoluteAppPath_private_next_pages_2F_app_tsx_absoluteDocumentPath_private_next_pages_2F_document_tsx_middlewareConfigBase64_e30_3D_),
  getServerSideProps: () => (/* binding */ next_route_loaderkind_PAGES_page_2Fcatalog_2Fcollection_preferredRegion_absolutePagePath_private_next_pages_2Fcatalog_2Fcollection_tsx_absoluteAppPath_private_next_pages_2F_app_tsx_absoluteDocumentPath_private_next_pages_2F_document_tsx_middlewareConfigBase64_e30_3D_getServerSideProps),
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

// NAMESPACE OBJECT: ./src/pages/catalog/collection.tsx
var collection_namespaceObject = {};
__webpack_require__.r(collection_namespaceObject);
__webpack_require__.d(collection_namespaceObject, {
  "default": () => (collection),
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
// EXTERNAL MODULE: external "@mui/material"
var material_ = __webpack_require__(5692);
;// CONCATENATED MODULE: external "@mui/system"
const system_namespaceObject = require("@mui/system");
// EXTERNAL MODULE: ./src/components/ItemPage/BasePage.tsx
var BasePage = __webpack_require__(4036);
;// CONCATENATED MODULE: ./src/pages/catalog/collection.tsx





const CollectionContainer = (0,system_namespaceObject.styled)("div")({
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "1rem"
});
function CollectionPage({ collectionItems, collectionName }) {
    const itemsPerPage = 4;
    const [currentPage, setCurrentPage] = (0,external_react_.useState)(1);
    const handlePageChange = (event, page)=>{
        setCurrentPage(page);
    };
    const lastIndex = currentPage * itemsPerPage;
    const firstIndex = lastIndex - itemsPerPage;
    const currentItems = collectionItems.slice(firstIndex, lastIndex);
    return /*#__PURE__*/ (0,jsx_runtime.jsxs)(jsx_runtime.Fragment, {
        children: [
            /*#__PURE__*/ jsx_runtime.jsx(BasePage/* default */.Z, {
                pageName: collectionName,
                itemsArr: currentItems
            }),
            /*#__PURE__*/ jsx_runtime.jsx("div", {
                style: {
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "25px",
                    marginBottom: "25px"
                },
                children: /*#__PURE__*/ jsx_runtime.jsx(material_.Pagination, {
                    sx: {
                        alignItems: "center"
                    },
                    count: Math.ceil(collectionItems.length / itemsPerPage),
                    page: currentPage,
                    onChange: handlePageChange,
                    shape: "rounded",
                    size: "large",
                    className: "pagination"
                })
            })
        ]
    });
}
async function getServerSideProps() {
    try {
        const response = await fetch("http://77.222.53.48:3377/api/" + "catalog/collection");
        if (response.status === 200) {
            const collection = await response.json();
            console.log("collection", collection);
            const collectionName = collection[0]?.Collection.name || "";
            return {
                props: {
                    collectionItems: collection,
                    collectionName
                }
            };
        } else {
            return {
                props: {
                    collectionItems: [],
                    collectionName: ""
                }
            };
        }
    } catch (err) {
        console.error(err);
        return {
            props: {
                collectionItems: [],
                collectionName: ""
            }
        };
    }
}
/* harmony default export */ const collection = (CollectionPage);

;// CONCATENATED MODULE: ./node_modules/next/dist/build/webpack/loaders/next-route-loader/index.js?kind=PAGES&page=%2Fcatalog%2Fcollection&preferredRegion=&absolutePagePath=private-next-pages%2Fcatalog%2Fcollection.tsx&absoluteAppPath=private-next-pages%2F_app.tsx&absoluteDocumentPath=private-next-pages%2F_document.tsx&middlewareConfigBase64=e30%3D!
// @ts-ignore this need to be imported from next/dist to be external



// Import the app and document modules.
// @ts-expect-error - replaced by webpack/turbopack loader

// @ts-expect-error - replaced by webpack/turbopack loader

// Import the userland code.
// @ts-expect-error - replaced by webpack/turbopack loader

const PagesRouteModule = pages_module.PagesRouteModule;
// Re-export the component (should be the default export).
/* harmony default export */ const next_route_loaderkind_PAGES_page_2Fcatalog_2Fcollection_preferredRegion_absolutePagePath_private_next_pages_2Fcatalog_2Fcollection_tsx_absoluteAppPath_private_next_pages_2F_app_tsx_absoluteDocumentPath_private_next_pages_2F_document_tsx_middlewareConfigBase64_e30_3D_ = ((0,helpers/* hoist */.l)(collection_namespaceObject, "default"));
// Re-export methods.
const getStaticProps = (0,helpers/* hoist */.l)(collection_namespaceObject, "getStaticProps");
const getStaticPaths = (0,helpers/* hoist */.l)(collection_namespaceObject, "getStaticPaths");
const next_route_loaderkind_PAGES_page_2Fcatalog_2Fcollection_preferredRegion_absolutePagePath_private_next_pages_2Fcatalog_2Fcollection_tsx_absoluteAppPath_private_next_pages_2F_app_tsx_absoluteDocumentPath_private_next_pages_2F_document_tsx_middlewareConfigBase64_e30_3D_getServerSideProps = (0,helpers/* hoist */.l)(collection_namespaceObject, "getServerSideProps");
const config = (0,helpers/* hoist */.l)(collection_namespaceObject, "config");
const reportWebVitals = (0,helpers/* hoist */.l)(collection_namespaceObject, "reportWebVitals");
// Re-export legacy methods.
const unstable_getStaticProps = (0,helpers/* hoist */.l)(collection_namespaceObject, "unstable_getStaticProps");
const unstable_getStaticPaths = (0,helpers/* hoist */.l)(collection_namespaceObject, "unstable_getStaticPaths");
const unstable_getStaticParams = (0,helpers/* hoist */.l)(collection_namespaceObject, "unstable_getStaticParams");
const unstable_getServerProps = (0,helpers/* hoist */.l)(collection_namespaceObject, "unstable_getServerProps");
const unstable_getServerSideProps = (0,helpers/* hoist */.l)(collection_namespaceObject, "unstable_getServerSideProps");
// Create and export the route module that will be consumed.
const routeModule = new PagesRouteModule({
    definition: {
        kind: route_kind/* RouteKind */.x.PAGES,
        page: "/catalog/collection",
        pathname: "/catalog/collection",
        // The following aren't used in production.
        bundlePath: "",
        filename: ""
    },
    components: {
        App: _app["default"],
        Document: _document["default"]
    },
    userland: collection_namespaceObject
});

//# sourceMappingURL=pages.js.map

/***/ }),

/***/ 3013:
/***/ ((module) => {

module.exports = require("@mui/base");

/***/ }),

/***/ 1747:
/***/ ((module) => {

module.exports = require("@mui/icons-material/AddShoppingCart");

/***/ }),

/***/ 9560:
/***/ ((module) => {

module.exports = require("@mui/icons-material/AddTask");

/***/ }),

/***/ 4173:
/***/ ((module) => {

module.exports = require("@mui/icons-material/Close");

/***/ }),

/***/ 8012:
/***/ ((module) => {

module.exports = require("@mui/icons-material/DeleteOutline");

/***/ }),

/***/ 7372:
/***/ ((module) => {

module.exports = require("@mui/icons-material/Favorite");

/***/ }),

/***/ 5967:
/***/ ((module) => {

module.exports = require("@mui/icons-material/FavoriteBorderOutlined");

/***/ }),

/***/ 6920:
/***/ ((module) => {

module.exports = require("@mui/icons-material/FavoriteOutlined");

/***/ }),

/***/ 3365:
/***/ ((module) => {

module.exports = require("@mui/icons-material/Menu");

/***/ }),

/***/ 6324:
/***/ ((module) => {

module.exports = require("@mui/icons-material/Person2");

/***/ }),

/***/ 8017:
/***/ ((module) => {

module.exports = require("@mui/icons-material/Search");

/***/ }),

/***/ 6269:
/***/ ((module) => {

module.exports = require("@mui/icons-material/Telegram");

/***/ }),

/***/ 5692:
/***/ ((module) => {

module.exports = require("@mui/material");

/***/ }),

/***/ 5168:
/***/ ((module) => {

module.exports = require("@mui/material/Badge");

/***/ }),

/***/ 7934:
/***/ ((module) => {

module.exports = require("@mui/material/IconButton");

/***/ }),

/***/ 8855:
/***/ ((module) => {

module.exports = require("@mui/material/InputBase");

/***/ }),

/***/ 8125:
/***/ ((module) => {

module.exports = require("@mui/material/Menu");

/***/ }),

/***/ 9271:
/***/ ((module) => {

module.exports = require("@mui/material/MenuItem");

/***/ }),

/***/ 8442:
/***/ ((module) => {

module.exports = require("@mui/material/styles");

/***/ }),

/***/ 9868:
/***/ ((module) => {

module.exports = require("@mui/material/useMediaQuery");

/***/ }),

/***/ 5184:
/***/ ((module) => {

module.exports = require("@reduxjs/toolkit");

/***/ }),

/***/ 3473:
/***/ ((module) => {

module.exports = require("@vkontakte/icons");

/***/ }),

/***/ 2167:
/***/ ((module) => {

module.exports = require("axios");

/***/ }),

/***/ 3076:
/***/ ((module) => {

module.exports = require("next/dist/server/future/route-modules/route-module.js");

/***/ }),

/***/ 4140:
/***/ ((module) => {

module.exports = require("next/dist/server/get-page-files.js");

/***/ }),

/***/ 9716:
/***/ ((module) => {

module.exports = require("next/dist/server/htmlescape.js");

/***/ }),

/***/ 3100:
/***/ ((module) => {

module.exports = require("next/dist/server/render.js");

/***/ }),

/***/ 6368:
/***/ ((module) => {

module.exports = require("next/dist/server/utils.js");

/***/ }),

/***/ 3918:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/amp-context.js");

/***/ }),

/***/ 5732:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/amp-mode.js");

/***/ }),

/***/ 3280:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/app-router-context.js");

/***/ }),

/***/ 6724:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/constants.js");

/***/ }),

/***/ 5132:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/get-img-props.js");

/***/ }),

/***/ 2796:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/head-manager-context.js");

/***/ }),

/***/ 8743:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/html-context.js");

/***/ }),

/***/ 744:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/image-config-context.js");

/***/ }),

/***/ 5843:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/image-config.js");

/***/ }),

/***/ 8524:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/is-plain-object.js");

/***/ }),

/***/ 4964:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router-context.js");

/***/ }),

/***/ 1751:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/add-path-prefix.js");

/***/ }),

/***/ 3938:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/format-url.js");

/***/ }),

/***/ 1109:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/is-local-url.js");

/***/ }),

/***/ 8854:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/parse-path.js");

/***/ }),

/***/ 3297:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/remove-trailing-slash.js");

/***/ }),

/***/ 7782:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/resolve-href.js");

/***/ }),

/***/ 2470:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/side-effect.js");

/***/ }),

/***/ 9232:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/utils.js");

/***/ }),

/***/ 618:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/utils/warn-once.js");

/***/ }),

/***/ 968:
/***/ ((module) => {

module.exports = require("next/head");

/***/ }),

/***/ 9925:
/***/ ((module) => {

module.exports = require("next/router");

/***/ }),

/***/ 8032:
/***/ ((module) => {

module.exports = require("numeral");

/***/ }),

/***/ 6689:
/***/ ((module) => {

module.exports = require("react");

/***/ }),

/***/ 9779:
/***/ ((module) => {

module.exports = require("react-cookie-consent");

/***/ }),

/***/ 6405:
/***/ ((module) => {

module.exports = require("react-dom");

/***/ }),

/***/ 6022:
/***/ ((module) => {

module.exports = require("react-redux");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [115,79,670,36], () => (__webpack_exec__(1292)));
module.exports = __webpack_exports__;

})();