(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[8572],{8638:function(a,e,t){"use strict";t.d(e,{Z:function(){return J}});var r=t(85893),c=t(67294),s=t(82268),i=t.n(s),o=t(14477),l=t(9473),n=t(45930),d=t(6154);let m=async a=>{try{let e=await d.Z.post("".concat("http://localhost:3377/api/","favorite/add"),a,{headers:{"Content-Type":"application/json"},withCredentials:!0});if(200===e.status)return e.data}catch(a){throw a}},h=async a=>{try{let e=await d.Z.delete("".concat("http://localhost:3377/api/","favorite/del"),{data:a,headers:{"Content-Type":"application/json"},withCredentials:!0});if(200===e.status)return e.data}catch(a){throw a}},u=async a=>{console.log({data:a});try{let e=await d.Z.post("".concat("http://localhost:3377/api/","cart/item/add"),a,{headers:{"Content-Type":"application/json"},withCredentials:!0});if(200===e.status)return e.data}catch(a){throw a}},C=async a=>{try{let e=await d.Z.delete("".concat("http://localhost:3377/api/","cart/item/del"),{data:a,headers:{"Content-Type":"application/json"},withCredentials:!0});if(200===e.status)return e.data}catch(a){throw a}};var f=t(82991),g=t(11352),p=t(54357),_=(a,e,t,r,s,i,d,_,I,v)=>{let N=(0,o.T)(),[j,w]=(0,c.useState)(d),[P,S]=(0,c.useState)(_),[x,y]=(0,c.useState)(),{user:O}=(0,l.v9)(a=>a.sessionSlice),Z=async()=>{if(O){w(!j);try{let c=j?h:m,o=await c({id:a,material_name:e,article:t,photo:r,name:s,newPrice:I,price:i,isFavorite:!j,isCart:P});y(o),await N((0,f.j_)()),await N((0,p.qC)(!j))}catch(a){console.log(a)}}else{let e=JSON.parse(localStorage.getItem("favorites"))||[],t=e.includes(a);if(t){let t=e.filter(e=>e!==a);localStorage.setItem("favorites",JSON.stringify(t)),w(!j),await N((0,p.Ou)(t))}else{let t=[...e,a];localStorage.setItem("favorites",JSON.stringify(t)),w(!j),await N((0,p.Ou)(t))}}},F=async()=>{if(O){S(!P);try{let c={id:a,material_name:e,article:t,photo:r,name:s,newPrice:I,price:i,isFavorite:j,isCart:!P};if(P)await C(c),await N((0,g.SM)()),S(!1);else{let a=await u(c),e=a[1];S(e),await N((0,g.SM)())}}catch(a){console.log(a)}}else{let t=JSON.parse(localStorage.getItem("cartItems"))||[],r=t.find(e=>e.id===a);if(r){let e=t.filter(e=>e.id!==a);localStorage.setItem("cartItems",JSON.stringify(e)),S(!P),await N((0,g.gn)(e))}else{let r=[...t,{id:a,material_name:e,in_stock:!!I}];localStorage.setItem("cartItems",JSON.stringify(r)),S(!P),await N((0,g.gn)(r))}}};return(0,c.useEffect)(()=>{if(O){let e=JSON.parse(localStorage.getItem("cartItems"))||[];e.length>0&&Promise.all(e.map(async a=>{let e={id:a.id,material_name:a.material_name};return console.log({cartData:e}),u(e)})).then(()=>{localStorage.removeItem("cartItems"),N((0,g.SM)())}).catch(a=>{console.error("Error while adding item in cart:",a)});let t=async()=>{try{let e=await fetch("http://localhost:3377/api/cart/cartInCat",{method:"GET",credentials:"include"});if(200===e.status){let t=await e.json(),r=t.includes(a);S(r)}N((0,n.l6)(a))}catch(a){console.log(a)}};t()}else{let e=JSON.parse(localStorage.getItem("cartItems")||"[]");(async function(a){try{await N((0,g.gn)(a))}catch(a){console.error("Error while fetching cart items:",a)}})(e);let t=e.some(e=>e.id===a);S(t)}},[O]),(0,c.useEffect)(()=>{if(O){let e=JSON.parse(localStorage.getItem("favorites"))||[];e.length>0&&Promise.all(e.map(async a=>m({id:a}))).then(()=>{localStorage.removeItem("favorites"),N((0,f.j_)())}).catch(a=>{console.error("Error while adding favorites:",a)});let t=async()=>{try{let e=await fetch("http://localhost:3377/api/favorite",{method:"GET",credentials:"include"});if(200===e.status){let t=await e.json(),r=t.includes(a);w(r)}N((0,n.mN)(a))}catch(a){console.log(a)}};t()}else{let e=JSON.parse(localStorage.getItem("favorites")||"[]"),t=localStorage.getItem("cartItems");if(null!==t){let a=JSON.parse(t);N((0,g.gn)(a))}N((0,p.Ou)(e));let r=e.includes(a);w(r)}},[O]),{isFavorite:j,isCart:P,favoriteHandler:Z,cartHandler:F,urlName:v}},I=t(93946),v=t(58151),N=t(36111),j=a=>{let{isFavorite:e,onClick:t,itemId:c}=a;return(0,r.jsx)(I.Z,{className:i().IconImage,"aria-label":"Add to favorites",onClick:t,children:e?(0,r.jsx)(N.Z,{className:i().IconImage,style:{color:"rgb(0 0 0 / 70%)"}}):(0,r.jsx)(v.Z,{className:i().IconImage})})},w=t(6965),P=t(13659),S=a=>{let{isCart:e,onClick:t,itemId:c}=a;return(0,r.jsx)(I.Z,{className:i().IconImage,onClick:t,"aria-label":"Add to cart",children:e?(0,r.jsx)(w.Z,{className:i().IconImage,style:{color:"rgb(0 0 0 / 70%)"}}):(0,r.jsx)(P.Z,{className:i().IconImage})})},x=t(11163),y=t(41664),O=t.n(y),Z=t(92077),F=t.n(Z),J=a=>{let{id:e,material_name:t,article:c,photo:s,name:o,price:l,isFavorite:n,isCart:d,newPrice:m,isItemInFavoritesState:h,urlName:u}=a,{isFavorite:C,isCart:f,favoriteHandler:g,cartHandler:p}=_(e,t,c,s,o,l,n,d,m,u),I=(0,x.useRouter)(),v=I.asPath.replace(/^\/catalog|\/\d+$/g,"");return(0,r.jsxs)("div",{className:i().Card,children:["/"===v[0]?(0,r.jsxs)(O(),{href:"/"===I.pathname?"/".concat(u,"/").concat(e):"/catalog".concat(v,"/").concat(e),as:"/"===I.pathname?"/catalog/".concat(u,"/").concat(e):"/catalog".concat(v,"/").concat(e),children:[(0,r.jsx)("span",{className:i().CardMedia,children:(0,r.jsx)("img",{src:"".concat("http://localhost:3377/items/").concat(s),alt:o,className:i().Image})}),(0,r.jsx)("h1",{className:i().NameCard,children:o})]}):(0,r.jsxs)(O(),{href:"/"===I.pathname?"/".concat(u,"/").concat(e):"/catalog".concat(v,"/").concat(e),as:"/"===I.pathname?"/catalog/".concat(u,"/").concat(e):"/catalog/".concat(v,"/").concat(e),children:[(0,r.jsx)("span",{className:i().CardMedia,children:(0,r.jsx)("img",{src:"".concat("http://localhost:3377/items/").concat(s),alt:o,className:i().Image})}),(0,r.jsx)("h1",{className:i().NameCard,children:o})]}),m?(0,r.jsxs)("div",{className:i().CardContent,children:[(0,r.jsxs)("h3",{className:i().NewPrice,children:[F()(m).format("0,0")," ₽"]}),(0,r.jsxs)("h3",{className:i().OldPrice,children:[F()(l).format("0,0")," ₽"]}),(0,r.jsxs)("div",{className:i().Icons,children:[(0,r.jsx)(j,{isFavorite:C,onClick:g,itemId:e}),(0,r.jsx)(S,{isCart:f,onClick:p,itemId:e})]})]}):(0,r.jsxs)("div",{className:i().CardContent,children:[(0,r.jsxs)("h3",{className:i().PriceOne,children:[F()(l).format("0,0")," ₽"]}),(0,r.jsxs)("div",{className:i().Icons,children:[(0,r.jsx)(j,{isFavorite:C,onClick:g,itemId:e}),(0,r.jsx)(S,{isCart:f,onClick:p,itemId:e})]})]})]},e)}},48572:function(a,e,t){"use strict";t.d(e,{Z:function(){return m}});var r=t(85893),c=t(67294),s=t(81135),i=t.n(s),o=t(9473),l=t(14477),n=t(82991),d=t(8638);function m(){var a;let e=(0,o.v9)(a=>a.favouriteSlice.favoriteItemList),{user:t}=(0,o.v9)(a=>a.sessionSlice),s=(0,l.T)(),[m,h]=(0,c.useState)([]);(0,c.useEffect)(()=>{s((0,n.P2)())},[]),(0,c.useEffect)(()=>{let a=JSON.parse(localStorage.getItem("favorites"))||"[]",e=async()=>{let e=[];for(let t of a)try{let a=await fetch("http://localhost:3377/api/item/"+t,{credentials:"include"});if(200===a.status){let t=await a.json();e.push(t)}else 404===a.status&&console.log("Товар не найден")}catch(a){console.log(a)}h(e)};e()},[]),t||(e=[]);let u=e&&Array.isArray(e)?e.map(a=>(0,r.jsx)(d.Z,{id:a.id,material_name:a.Material.name,article:a.article,photo:a.Photos[0].photo,name:a.name,price:a.price,newPrice:a.new_price,isFavorite:a.isFavorite,isCart:a.isCart},a.id)):null,C=m&&Array.isArray(m)?m.map(a=>(0,r.jsx)(d.Z,{id:a.item.id,material_name:a.item.Material.name,article:a.item.article,photo:a.item.Photos[0].photo,name:a.item.name,price:a.item.price,newPrice:a.item.new_price,isFavorite:a.item.isFavorite,isCart:a.isCart},a.item.id)):null;return(0,r.jsx)(r.Fragment,{children:(null===(a=e)||void 0===a?void 0:a.length)>0?(0,r.jsx)("div",{className:i().ContainerOneCard,children:(0,r.jsx)("div",{className:i().ProductCardsContainer,children:u})}):(null==m?void 0:m.length)>0?(0,r.jsx)("div",{className:i().ContainerOneCard,children:(0,r.jsx)("div",{className:i().ProductCardsContainer,children:C})}):(0,r.jsx)("div",{className:i().infoContainer,children:(0,r.jsx)("p",{className:i().infoP,children:"У вас пока нет товаров в избранном"})})})}},82268:function(a){a.exports={Card:"ProductCard_Card__jOQhm",CardMedia:"ProductCard_CardMedia__9rZlI",Image:"ProductCard_Image__SDc8f",NameCard:"ProductCard_NameCard__hi5AD",CardContent:"ProductCard_CardContent__4sZLG",Price:"ProductCard_Price__v5AwF",OldPrice:"ProductCard_OldPrice__RN8OD",NewPrice:"ProductCard_NewPrice__p3_er",PriceOne:"ProductCard_PriceOne__GM4gL",Icons:"ProductCard_Icons__WehvY",IconImage:"ProductCard_IconImage__8Snbm"}},81135:function(a){a.exports={ContainerOneCard:"Favorites_ContainerOneCard__ia5Jt",ProductCardsContainer:"Favorites_ProductCardsContainer__nQvt3",infoContainer:"Favorites_infoContainer__K_Le0",infoP:"Favorites_infoP__mluPk"}}}]);