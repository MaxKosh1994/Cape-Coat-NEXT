(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[1412],{1412:function(a,e,t){"use strict";t.d(e,{Z:function(){return l}});var c=t(85893),r=t(9008),s=t.n(r),i=t(87049),n=t.n(i),o=t(8638);function l(a){let{pageName:e,itemsArr:t}=a;return(0,c.jsxs)(c.Fragment,{children:[(0,c.jsxs)(s(),{children:[(0,c.jsxs)("title",{children:["Cape&Coat | ",e]}),(0,c.jsx)("meta",{name:"title",content:"Cape and Coat"}),(0,c.jsx)("meta",{name:"viewport",content:"width=device-width, initial-scale=1"}),(0,c.jsx)("meta",{name:"title",content:"Cape and Coat - Индивидуальная одежда на заказ"}),(0,c.jsx)("meta",{name:"keywords",content:"пошив одежды, пошив одежды рядом, на заказ, Cape&Coat, одежда по меркам, женская одежда на заказ, пошив на заказ для женщин, пошив платья, пошив платья на заказ, пошив пальто, пошив женских пальто, пошив костюма, пошив костюма на заказ, пошив женских костюмов, пошив брюк женских, пошив брюк, пошив юбок, пошив на заказ, пошив тренча, пошив шуб, пошив шуб на заказ, пошив искусственных шуб, индивидуальный пошив шубы, пошив женского пиджака, пошив пиджака, пошив одежды цена"}),(0,c.jsx)("meta",{name:"viewport",content:"width=device-width, initial-scale=1"}),(0,c.jsx)("link",{rel:"icon",href:"/favicon.ico"})]}),(0,c.jsxs)("div",{className:n().pageContainer,children:[(0,c.jsx)("h3",{className:n().header,children:e}),(0,c.jsx)("div",{className:n().cardsContainer,children:t.map(a=>{var e;return(0,c.jsx)(o.Z,{material_name:a.Material.name,id:a.id,article:a.article,photo:(null==a?void 0:a.photo)||(null==a?void 0:null===(e=a.Photos[0])||void 0===e?void 0:e.photo),name:a.name,price:a.price,isFavorite:a.isFavorite,isCart:a.isCart,newPrice:a.new_price},a.id)})})]})]})}},8638:function(a,e,t){"use strict";t.d(e,{Z:function(){return J}});var c=t(85893),r=t(67294),s=t(82268),i=t.n(s),n=t(14477),o=t(9473),l=t(45930),d=t(6154);let m=async a=>{try{let e=await d.Z.post("".concat("http://77.222.53.48:3377/api/","favorite/add"),a,{headers:{"Content-Type":"application/json"},withCredentials:!0});if(200===e.status)return e.data}catch(a){throw a}},h=async a=>{try{let e=await d.Z.delete("".concat("http://77.222.53.48:3377/api/","favorite/del"),{data:a,headers:{"Content-Type":"application/json"},withCredentials:!0});if(200===e.status)return e.data}catch(a){throw a}},g=async a=>{console.log({data:a});try{let e=await d.Z.post("".concat("http://77.222.53.48:3377/api/","cart/item/add"),a,{headers:{"Content-Type":"application/json"},withCredentials:!0});if(200===e.status)return e.data}catch(a){throw a}},C=async a=>{try{let e=await d.Z.delete("".concat("http://77.222.53.48:3377/api/","cart/item/del"),{data:a,headers:{"Content-Type":"application/json"},withCredentials:!0});if(200===e.status)return e.data}catch(a){throw a}};var p=t(82991),u=t(11352),f=t(54357),_=(a,e,t,c,s,i,d,_,I,j)=>{let w=(0,n.T)(),[N,v]=(0,r.useState)(d),[x,S]=(0,r.useState)(_),[y,P]=(0,r.useState)(),{user:O}=(0,o.v9)(a=>a.sessionSlice),Z=async()=>{if(O){v(!N);try{let r=N?h:m,n=await r({id:a,material_name:e,article:t,photo:c,name:s,newPrice:I,price:i,isFavorite:!N,isCart:x});P(n),await w((0,p.j_)()),await w((0,f.qC)(!N))}catch(a){console.log(a)}}else{let e=JSON.parse(localStorage.getItem("favorites"))||[],t=e.includes(a);if(t){let t=e.filter(e=>e!==a);localStorage.setItem("favorites",JSON.stringify(t)),v(!N),await w((0,f.Ou)(t))}else{let t=[...e,a];localStorage.setItem("favorites",JSON.stringify(t)),v(!N),await w((0,f.Ou)(t))}}},k=async()=>{if(O){S(!x);try{let r={id:a,material_name:e,article:t,photo:c,name:s,newPrice:I,price:i,isFavorite:N,isCart:!x};if(x)await C(r),await w((0,u.SM)()),S(!1);else{let a=await g(r),e=a[1];S(e),await w((0,u.SM)())}}catch(a){console.log(a)}}else{let t=JSON.parse(localStorage.getItem("cartItems"))||[],c=t.find(e=>e.id===a);if(c){let e=t.filter(e=>e.id!==a);localStorage.setItem("cartItems",JSON.stringify(e)),S(!x),await w((0,u.gn)(e))}else{let c=[...t,{id:a,material_name:e,in_stock:!!I}];localStorage.setItem("cartItems",JSON.stringify(c)),S(!x),await w((0,u.gn)(c))}}};return(0,r.useEffect)(()=>{if(O){let e=JSON.parse(localStorage.getItem("cartItems"))||[];e.length>0&&Promise.all(e.map(async a=>{let e={id:a.id,material_name:a.material_name};return console.log({cartData:e}),g(e)})).then(()=>{localStorage.removeItem("cartItems"),w((0,u.SM)())}).catch(a=>{console.error("Error while adding item in cart:",a)});let t=async()=>{try{let e=await fetch("http://77.222.53.48:3377/api/cart/cartInCat",{method:"GET",credentials:"include"});if(200===e.status){let t=await e.json(),c=t.includes(a);S(c)}w((0,l.l6)(a))}catch(a){console.log(a)}};t()}else{let e=JSON.parse(localStorage.getItem("cartItems")||"[]");(async function(a){try{await w((0,u.gn)(a))}catch(a){console.error("Error while fetching cart items:",a)}})(e);let t=e.some(e=>e.id===a);S(t)}},[O]),(0,r.useEffect)(()=>{if(O){let e=JSON.parse(localStorage.getItem("favorites"))||[];e.length>0&&Promise.all(e.map(async a=>m({id:a}))).then(()=>{localStorage.removeItem("favorites"),w((0,p.j_)())}).catch(a=>{console.error("Error while adding favorites:",a)});let t=async()=>{try{let e=await fetch("http://77.222.53.48:3377/api/favorite",{method:"GET",credentials:"include"});if(200===e.status){let t=await e.json(),c=t.includes(a);v(c)}w((0,l.mN)(a))}catch(a){console.log(a)}};t()}else{let e=JSON.parse(localStorage.getItem("favorites")||"[]"),t=localStorage.getItem("cartItems");if(null!==t){let a=JSON.parse(t);w((0,u.gn)(a))}w((0,f.Ou)(e));let c=e.includes(a);v(c)}},[O]),{isFavorite:N,isCart:x,favoriteHandler:Z,cartHandler:k,urlName:j}},I=t(93946),j=t(58151),w=t(36111),N=a=>{let{isFavorite:e,onClick:t,itemId:r}=a;return(0,c.jsx)(I.Z,{className:i().IconImage,"aria-label":"Add to favorites",onClick:t,children:e?(0,c.jsx)(w.Z,{className:i().IconImage,style:{color:"rgb(0 0 0 / 70%)"}}):(0,c.jsx)(j.Z,{className:i().IconImage})})},v=t(6965),x=t(13659),S=a=>{let{isCart:e,onClick:t,itemId:r}=a;return(0,c.jsx)(I.Z,{className:i().IconImage,onClick:t,"aria-label":"Add to cart",children:e?(0,c.jsx)(v.Z,{className:i().IconImage,style:{color:"rgb(0 0 0 / 70%)"}}):(0,c.jsx)(x.Z,{className:i().IconImage})})},y=t(11163),P=t(41664),O=t.n(P),Z=t(92077),k=t.n(Z),J=a=>{let{id:e,material_name:t,article:r,photo:s,name:n,price:o,isFavorite:l,isCart:d,newPrice:m,isItemInFavoritesState:h,urlName:g}=a,{isFavorite:C,isCart:p,favoriteHandler:u,cartHandler:f}=_(e,t,r,s,n,o,l,d,m,g),I=(0,y.useRouter)(),j=I.asPath.replace(/^\/catalog|\/\d+$/g,"");return(0,c.jsxs)("div",{className:i().Card,children:["/"===j[0]?(0,c.jsxs)(O(),{href:"/"===I.pathname?"/".concat(g,"/").concat(e):"/catalog".concat(j,"/").concat(e),as:"/"===I.pathname?"/catalog/".concat(g,"/").concat(e):"/catalog".concat(j,"/").concat(e),children:[(0,c.jsx)("span",{className:i().CardMedia,children:(0,c.jsx)("img",{src:"".concat("http://localhost:3377/items/").concat(s),alt:n,className:i().Image})}),(0,c.jsx)("h1",{className:i().NameCard,children:n})]}):(0,c.jsxs)(O(),{href:"/"===I.pathname?"/".concat(g,"/").concat(e):"/catalog".concat(j,"/").concat(e),as:"/"===I.pathname?"/catalog/".concat(g,"/").concat(e):"/catalog/".concat(j,"/").concat(e),children:[(0,c.jsx)("span",{className:i().CardMedia,children:(0,c.jsx)("img",{src:"".concat("http://localhost:3377/items/").concat(s),alt:n,className:i().Image})}),(0,c.jsx)("h1",{className:i().NameCard,children:n})]}),m?(0,c.jsxs)("div",{className:i().CardContent,children:[(0,c.jsxs)("h3",{className:i().NewPrice,children:[k()(m).format("0,0")," ₽"]}),(0,c.jsxs)("h3",{className:i().OldPrice,children:[k()(o).format("0,0")," ₽"]}),(0,c.jsxs)("div",{className:i().Icons,children:[(0,c.jsx)(N,{isFavorite:C,onClick:u,itemId:e}),(0,c.jsx)(S,{isCart:p,onClick:f,itemId:e})]})]}):(0,c.jsxs)("div",{className:i().CardContent,children:[(0,c.jsxs)("h3",{className:i().PriceOne,children:[k()(o).format("0,0")," ₽"]}),(0,c.jsxs)("div",{className:i().Icons,children:[(0,c.jsx)(N,{isFavorite:C,onClick:u,itemId:e}),(0,c.jsx)(S,{isCart:p,onClick:f,itemId:e})]})]})]},e)}},82268:function(a){a.exports={Card:"ProductCard_Card__jOQhm",CardMedia:"ProductCard_CardMedia__9rZlI",Image:"ProductCard_Image__SDc8f",NameCard:"ProductCard_NameCard__hi5AD",CardContent:"ProductCard_CardContent__4sZLG",Price:"ProductCard_Price__v5AwF",OldPrice:"ProductCard_OldPrice__RN8OD",NewPrice:"ProductCard_NewPrice__p3_er",PriceOne:"ProductCard_PriceOne__GM4gL",Icons:"ProductCard_Icons__WehvY",IconImage:"ProductCard_IconImage__8Snbm"}},87049:function(a){a.exports={pageContainer:"BasePage_pageContainer__z9jas",header:"BasePage_header__nYr4K",cardsContainer:"BasePage_cardsContainer__OQVEc"}}}]);