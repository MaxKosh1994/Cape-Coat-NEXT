(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[5405],{15861:function(t,e,a){"use strict";a.d(e,{Z:function(){return v}});var r=a(63366),i=a(87462),n=a(67294),o=a(90512),s=a(39707),c=a(94780),l=a(90948),m=a(33616),d=a(98216),h=a(1588),p=a(34867);function g(t){return(0,p.Z)("MuiTypography",t)}(0,h.Z)("MuiTypography",["root","h1","h2","h3","h4","h5","h6","subtitle1","subtitle2","body1","body2","inherit","button","caption","overline","alignLeft","alignRight","alignCenter","alignJustify","noWrap","gutterBottom","paragraph"]);var u=a(85893);let f=["align","className","component","gutterBottom","noWrap","paragraph","variant","variantMapping"],x=t=>{let{align:e,gutterBottom:a,noWrap:r,paragraph:i,variant:n,classes:o}=t,s={root:["root",n,"inherit"!==t.align&&`align${(0,d.Z)(e)}`,a&&"gutterBottom",r&&"noWrap",i&&"paragraph"]};return(0,c.Z)(s,g,o)},C=(0,l.ZP)("span",{name:"MuiTypography",slot:"Root",overridesResolver:(t,e)=>{let{ownerState:a}=t;return[e.root,a.variant&&e[a.variant],"inherit"!==a.align&&e[`align${(0,d.Z)(a.align)}`],a.noWrap&&e.noWrap,a.gutterBottom&&e.gutterBottom,a.paragraph&&e.paragraph]}})(({theme:t,ownerState:e})=>(0,i.Z)({margin:0},"inherit"===e.variant&&{font:"inherit"},"inherit"!==e.variant&&t.typography[e.variant],"inherit"!==e.align&&{textAlign:e.align},e.noWrap&&{overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"},e.gutterBottom&&{marginBottom:"0.35em"},e.paragraph&&{marginBottom:16})),j={h1:"h1",h2:"h2",h3:"h3",h4:"h4",h5:"h5",h6:"h6",subtitle1:"h6",subtitle2:"h6",body1:"p",body2:"p",inherit:"p"},_={primary:"primary.main",textPrimary:"text.primary",secondary:"secondary.main",textSecondary:"text.secondary",error:"error.main"},N=t=>_[t]||t,y=n.forwardRef(function(t,e){let a=(0,m.Z)({props:t,name:"MuiTypography"}),n=N(a.color),c=(0,s.Z)((0,i.Z)({},a,{color:n})),{align:l="inherit",className:d,component:h,gutterBottom:p=!1,noWrap:g=!1,paragraph:_=!1,variant:y="body1",variantMapping:v=j}=c,I=(0,r.Z)(c,f),w=(0,i.Z)({},c,{align:l,color:n,className:d,component:h,gutterBottom:p,noWrap:g,paragraph:_,variant:y,variantMapping:v}),Z=h||(_?"p":v[y]||j[y])||"span",b=x(w);return(0,u.jsx)(C,(0,i.Z)({as:Z,ref:e,ownerState:w,className:(0,o.Z)(b.root,d)},I))});var v=y},39707:function(t,e,a){"use strict";a.d(e,{Z:function(){return l}});var r=a(87462),i=a(63366),n=a(59766),o=a(44920);let s=["sx"],c=t=>{var e,a;let r={systemProps:{},otherProps:{}},i=null!=(e=null==t||null==(a=t.theme)?void 0:a.unstable_sxConfig)?e:o.Z;return Object.keys(t).forEach(e=>{i[e]?r.systemProps[e]=t[e]:r.otherProps[e]=t[e]}),r};function l(t){let e;let{sx:a}=t,o=(0,i.Z)(t,s),{systemProps:l,otherProps:m}=c(o);return e=Array.isArray(a)?[l,...a]:"function"==typeof a?(...t)=>{let e=a(...t);return(0,n.P)(e)?(0,r.Z)({},l,e):l}:(0,r.Z)({},l,a),(0,r.Z)({},m,{sx:e})}},48312:function(t,e,a){(window.__NEXT_P=window.__NEXT_P||[]).push(["/",function(){return a(6297)}])},8638:function(t,e,a){"use strict";a.d(e,{Z:function(){return O}});var r=a(85893),i=a(67294),n=a(82268),o=a.n(n),s=a(14477),c=a(9473),l=a(45930),m=a(6154);let d=async t=>{try{let e=await m.Z.post("".concat("http://77.222.53.48:3377/api/","favorite/add"),t,{headers:{"Content-Type":"application/json"},withCredentials:!0});if(200===e.status)return e.data}catch(t){throw t}},h=async t=>{try{let e=await m.Z.delete("".concat("http://77.222.53.48:3377/api/","favorite/del"),{data:t,headers:{"Content-Type":"application/json"},withCredentials:!0});if(200===e.status)return e.data}catch(t){throw t}},p=async t=>{console.log({data:t});try{let e=await m.Z.post("".concat("http://77.222.53.48:3377/api/","cart/item/add"),t,{headers:{"Content-Type":"application/json"},withCredentials:!0});if(200===e.status)return e.data}catch(t){throw t}},g=async t=>{try{let e=await m.Z.delete("".concat("http://77.222.53.48:3377/api/","cart/item/del"),{data:t,headers:{"Content-Type":"application/json"},withCredentials:!0});if(200===e.status)return e.data}catch(t){throw t}};var u=a(82991),f=a(11352),x=a(54357),C=(t,e,a,r,n,o,m,C,j,_)=>{let N=(0,s.T)(),[y,v]=(0,i.useState)(m),[I,w]=(0,i.useState)(C),[Z,b]=(0,i.useState)(),{user:P}=(0,c.v9)(t=>t.sessionSlice),S=async()=>{if(P){v(!y);try{let i=y?h:d,s=await i({id:t,material_name:e,article:a,photo:r,name:n,newPrice:j,price:o,isFavorite:!y,isCart:I});b(s),await N((0,u.j_)()),await N((0,x.qC)(!y))}catch(t){console.log(t)}}else{let e=JSON.parse(localStorage.getItem("favorites"))||[],a=e.includes(t);if(a){let a=e.filter(e=>e!==t);localStorage.setItem("favorites",JSON.stringify(a)),v(!y),await N((0,x.Ou)(a))}else{let a=[...e,t];localStorage.setItem("favorites",JSON.stringify(a)),v(!y),await N((0,x.Ou)(a))}}},k=async()=>{if(P){w(!I);try{let i={id:t,material_name:e,article:a,photo:r,name:n,newPrice:j,price:o,isFavorite:y,isCart:!I};if(I)await g(i),await N((0,f.SM)()),w(!1);else{let t=await p(i),e=t[1];w(e),await N((0,f.SM)())}}catch(t){console.log(t)}}else{let a=JSON.parse(localStorage.getItem("cartItems"))||[],r=a.find(e=>e.id===t);if(r){let e=a.filter(e=>e.id!==t);localStorage.setItem("cartItems",JSON.stringify(e)),w(!I),await N((0,f.gn)(e))}else{let r=[...a,{id:t,material_name:e,in_stock:!!j}];localStorage.setItem("cartItems",JSON.stringify(r)),w(!I),await N((0,f.gn)(r))}}};return(0,i.useEffect)(()=>{if(P){let e=JSON.parse(localStorage.getItem("cartItems"))||[];e.length>0&&Promise.all(e.map(async t=>{let e={id:t.id,material_name:t.material_name};return console.log({cartData:e}),p(e)})).then(()=>{localStorage.removeItem("cartItems"),N((0,f.SM)())}).catch(t=>{console.error("Error while adding item in cart:",t)});let a=async()=>{try{let e=await fetch("http://77.222.53.48:3377/api/cart/cartInCat",{method:"GET",credentials:"include"});if(200===e.status){let a=await e.json(),r=a.includes(t);w(r)}N((0,l.l6)(t))}catch(t){console.log(t)}};a()}else{let e=JSON.parse(localStorage.getItem("cartItems")||"[]");(async function(t){try{await N((0,f.gn)(t))}catch(t){console.error("Error while fetching cart items:",t)}})(e);let a=e.some(e=>e.id===t);w(a)}},[P]),(0,i.useEffect)(()=>{if(P){let e=JSON.parse(localStorage.getItem("favorites"))||[];e.length>0&&Promise.all(e.map(async t=>d({id:t}))).then(()=>{localStorage.removeItem("favorites"),N((0,u.j_)())}).catch(t=>{console.error("Error while adding favorites:",t)});let a=async()=>{try{let e=await fetch("http://77.222.53.48:3377/api/favorite",{method:"GET",credentials:"include"});if(200===e.status){let a=await e.json(),r=a.includes(t);v(r)}N((0,l.mN)(t))}catch(t){console.log(t)}};a()}else{let e=JSON.parse(localStorage.getItem("favorites")||"[]"),a=localStorage.getItem("cartItems");if(null!==a){let t=JSON.parse(a);N((0,f.gn)(t))}N((0,x.Ou)(e));let r=e.includes(t);v(r)}},[P]),{isFavorite:y,isCart:I,favoriteHandler:S,cartHandler:k,urlName:_}},j=a(93946),_=a(58151),N=a(36111),y=t=>{let{isFavorite:e,onClick:a,itemId:i}=t;return(0,r.jsx)(j.Z,{className:o().IconImage,"aria-label":"Add to favorites",onClick:a,children:e?(0,r.jsx)(N.Z,{className:o().IconImage,style:{color:"rgb(0 0 0 / 70%)"}}):(0,r.jsx)(_.Z,{className:o().IconImage})})},v=a(6965),I=a(13659),w=t=>{let{isCart:e,onClick:a,itemId:i}=t;return(0,r.jsx)(j.Z,{className:o().IconImage,onClick:a,"aria-label":"Add to cart",children:e?(0,r.jsx)(v.Z,{className:o().IconImage,style:{color:"rgb(0 0 0 / 70%)"}}):(0,r.jsx)(I.Z,{className:o().IconImage})})},Z=a(11163),b=a(41664),P=a.n(b),S=a(92077),k=a.n(S),O=t=>{let{id:e,material_name:a,article:i,photo:n,name:s,price:c,isFavorite:l,isCart:m,newPrice:d,isItemInFavoritesState:h,urlName:p}=t,{isFavorite:g,isCart:u,favoriteHandler:f,cartHandler:x}=C(e,a,i,n,s,c,l,m,d,p),j=(0,Z.useRouter)(),_=j.asPath.replace(/^\/catalog|\/\d+$/g,"");return(0,r.jsxs)("div",{className:o().Card,children:["/"===_[0]?(0,r.jsxs)(P(),{href:"/"===j.pathname?"/".concat(p,"/").concat(e):"/catalog".concat(_,"/").concat(e),as:"/"===j.pathname?"/catalog/".concat(p,"/").concat(e):"/catalog".concat(_,"/").concat(e),children:[(0,r.jsx)("span",{className:o().CardMedia,children:(0,r.jsx)("img",{src:"".concat("http://localhost:3377/items/").concat(n),alt:s,className:o().Image})}),(0,r.jsx)("h1",{className:o().NameCard,children:s})]}):(0,r.jsxs)(P(),{href:"/"===j.pathname?"/".concat(p,"/").concat(e):"/catalog".concat(_,"/").concat(e),as:"/"===j.pathname?"/catalog/".concat(p,"/").concat(e):"/catalog/".concat(_,"/").concat(e),children:[(0,r.jsx)("span",{className:o().CardMedia,children:(0,r.jsx)("img",{src:"".concat("http://localhost:3377/items/").concat(n),alt:s,className:o().Image})}),(0,r.jsx)("h1",{className:o().NameCard,children:s})]}),d?(0,r.jsxs)("div",{className:o().CardContent,children:[(0,r.jsxs)("h3",{className:o().NewPrice,children:[k()(d).format("0,0")," ₽"]}),(0,r.jsxs)("h3",{className:o().OldPrice,children:[k()(c).format("0,0")," ₽"]}),(0,r.jsxs)("div",{className:o().Icons,children:[(0,r.jsx)(y,{isFavorite:g,onClick:f,itemId:e}),(0,r.jsx)(w,{isCart:u,onClick:x,itemId:e})]})]}):(0,r.jsxs)("div",{className:o().CardContent,children:[(0,r.jsxs)("h3",{className:o().PriceOne,children:[k()(c).format("0,0")," ₽"]}),(0,r.jsxs)("div",{className:o().Icons,children:[(0,r.jsx)(y,{isFavorite:g,onClick:f,itemId:e}),(0,r.jsx)(w,{isCart:u,onClick:x,itemId:e})]})]})]},e)}},6297:function(t,e,a){"use strict";a.r(e),a.d(e,{default:function(){return N}});var r=a(85893),i=a(9008),n=a.n(i),o=a(44749),s=a.n(o),c=a(67294),l=a(25675),m=a.n(l),d=a(15861),h=a(41664),p=a.n(h);function g(t){let{blockName:e,imgName:a}=t;return(0,r.jsxs)("div",{className:s().horizontalContainer,children:[(0,r.jsx)(m(),{src:"".concat("http://localhost:3377/main/").concat(a),alt:"",fill:!0,className:s().horizImg}),(0,r.jsxs)("div",{className:s().textHorizImg,children:[(0,r.jsx)(d.Z,{children:(0,r.jsx)("span",{children:e})}),(0,r.jsx)(p(),{href:"/catalog/".concat(e),children:(0,r.jsx)("button",{children:"ПОСМОТРЕТЬ РАЗДЕЛ"})})]})]})}function u(t){let{blockName:e,imgName:a,url:i}=t;return(0,r.jsxs)("div",{className:s().verticalContainer,children:[(0,r.jsx)(m(),{src:"".concat("http://localhost:3377/main/").concat(a),alt:"",fill:!0,className:s().verticalImg}),(0,r.jsx)("div",{className:s().textVerticalImg,children:(0,r.jsxs)(d.Z,{children:[(0,r.jsx)("span",{children:e}),(0,r.jsx)(p(),{href:"/catalog/".concat(i),children:(0,r.jsx)("button",{children:"ПОСМОТРЕТЬ РАЗДЕЛ"})})]})})]})}var f=a(8638),x=a(98396);function C(){let[t,e]=(0,c.useState)([]),a=(0,x.Z)("(max-width: 600px)"),i=(0,x.Z)("(min-width:851px) and (max-width:1200px)");(0,c.useEffect)(()=>{n()},[]);let n=async()=>{try{let t=await fetch("".concat("http://77.222.53.48:3377/api/","item/allItems"),{credentials:"include"}),a=await t.json(),r=a.map(t=>({...t,isFavorite:!1,isCart:!1}));if(200===t.status){let t=r.filter(t=>!1===t.in_stock);e(t)}}catch(t){console.log(t)}};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)("div",{className:s().cardsContainer,children:a?(0,r.jsx)(r.Fragment,{children:t.slice(6,8).map(t=>(0,r.jsx)(f.Z,{material_name:t.Material.name,id:t.id,article:t.article,photo:t.Photos[0].photo,name:t.name,price:t.price,isFavorite:t.isFavorite,isCart:t.isCart,urlName:t.Category?t.Category.urlName:""},t.id))}):i?(0,r.jsx)(r.Fragment,{children:t.slice(4,7).map(t=>(0,r.jsx)(f.Z,{id:t.id,material_name:t.Material.name,article:t.article,photo:t.Photos[0].photo,name:t.name,price:t.price,isFavorite:t.isFavorite,isCart:t.isCart,urlName:t.Category?t.Category.urlName:""},t.id))}):(0,r.jsx)(r.Fragment,{children:t.slice(4,8).map(t=>(0,r.jsx)(f.Z,{id:t.id,material_name:t.Material.name,article:t.article,photo:t.Photos[0].photo,name:t.name,price:t.price,isFavorite:t.isFavorite,isCart:t.isCart,urlName:t.Category?t.Category.urlName:""},t.id))})}),(0,r.jsx)(p(),{href:"catalog/all-items",children:(0,r.jsx)("button",{className:s().allBtn,children:"Смотреть все товары"})})]})}let j={collection:{blockName:"Коллекция Aw-2023",imgName:"VERT1.JPG",url:"collection"},newArrivals:{blockName:"Новинки",imgName:"VERT2.JPG",url:"new-arrivals"}},_={bestsellers:{blockName:"bestsellers",imgName:"HORIZ1.JPG"},sale:{blockName:"sale",imgName:"HORIZ2.JPG"}};var N=()=>(0,r.jsxs)(r.Fragment,{children:[(0,r.jsxs)(n(),{children:[(0,r.jsx)("title",{children:"Cape&Coat"}),(0,r.jsx)("meta",{name:"title",content:"Cape and Coat - Индивидуальная одежда на заказ"}),(0,r.jsx)("meta",{name:"description",content:"Закажите у нас индивидуальную одежду по вашим меркам. Cape&Coat предлагает широкий выбор одежды по индивидуальным заказам."}),(0,r.jsx)("meta",{name:"keywords",content:"заказ одежды, пошив одежды, в нижнем новгороде, пошив одежды рядом, на заказ, Cape&Coat, одежда по меркам, женская одежда на заказ, пошив на заказ для женщин, пошив платья, пошив платья на заказ, пошив пальто, пошив женских пальто, пошив костюма, пошив костюма на заказ, пошив женских костюмов, пошив брюк женских, пошив брюк, пошив юбок, пошив на заказ, пошив тренча, пошив шуб, пошив шуб на заказ, пошив искусственных шуб, индивидуальный пошив шубы, пошив женского пиджака, пошив пиджака, пошив одежды цена"}),(0,r.jsx)("meta",{name:"viewport",content:"width=device-width, initial-scale=1"}),(0,r.jsx)("link",{rel:"apple-touch-icon",sizes:"180x180",href:"/apple-touch-icon.png"}),(0,r.jsx)("link",{rel:"icon",type:"image/png",sizes:"32x32",href:"/favicon-32x32.png"}),(0,r.jsx)("link",{rel:"icon",type:"image/png",sizes:"16x16",href:"/favicon-16x16.png"}),(0,r.jsx)("link",{rel:"manifest",href:"/site.webmanifest"}),(0,r.jsx)("meta",{property:"og:title",content:"Cape&Coat - Одежда на заказ"}),(0,r.jsx)("meta",{property:"og:description",content:"Пошив одежды на заказ. Одежда по вашим меркам."}),(0,r.jsx)("meta",{property:"og:type",content:"website"})]}),(0,r.jsxs)("main",{children:[Object.keys(_).map(t=>(0,r.jsx)(g,{blockName:_[t].blockName,imgName:_[t].imgName},_[t].blockName)),(0,r.jsx)("div",{className:s().blocksContainer,children:Object.keys(j).map(t=>(0,r.jsx)(u,{blockName:j[t].blockName,imgName:j[t].imgName,url:j[t].url},j[t].blockName))}),(0,r.jsx)(C,{})]})]})},82268:function(t){t.exports={Card:"ProductCard_Card__jOQhm",CardMedia:"ProductCard_CardMedia__9rZlI",Image:"ProductCard_Image__SDc8f",NameCard:"ProductCard_NameCard__hi5AD",CardContent:"ProductCard_CardContent__4sZLG",Price:"ProductCard_Price__v5AwF",OldPrice:"ProductCard_OldPrice__RN8OD",NewPrice:"ProductCard_NewPrice__p3_er",PriceOne:"ProductCard_PriceOne__GM4gL",Icons:"ProductCard_Icons__WehvY",IconImage:"ProductCard_IconImage__8Snbm"}},44749:function(t){t.exports={horizontalContainer:"Home_horizontalContainer__fxpHR",horizImg:"Home_horizImg__SfVyj",textHorizImg:"Home_textHorizImg__WXcFk",blocksContainer:"Home_blocksContainer__xwqke",verticalContainer:"Home_verticalContainer__y2uU2",textVerticalImg:"Home_textVerticalImg__nXiCT",verticalImg:"Home_verticalImg__75Bsj",cardsContainer:"Home_cardsContainer__AsEeE",allBtn:"Home_allBtn__ZO01H"}}},function(t){t.O(0,[9236,9774,2888,179],function(){return t(t.s=48312)}),_N_E=t.O()}]);