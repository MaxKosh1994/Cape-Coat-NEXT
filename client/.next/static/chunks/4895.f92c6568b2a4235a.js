"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[4895],{64895:function(e,n,t){t.r(n);var o=t(85893),s=t(67294);n.default=()=>{let e=(0,s.useRef)(null),[n,t]=(0,s.useState)(!1),a=(0,s.useRef)(!1);return(0,s.useEffect)(()=>{window&&window.ymaps&&e.current&&!a.current&&(a.current=!0,window.ymaps.ready(()=>{let o=new window.ymaps.Map(e.current,{center:[56.316843,43.98731],zoom:20}),s=new window.ymaps.Placemark([56.316843,43.98731],{},{balloonContent:"Адрес: Россия, г.Нижний Новгород, ул. Малая Покровская, 20"});s.events.add("mouseenter",()=>{n||(t(!0),o.balloon.open([56.316843,43.98731],{contentBody:"Адрес: Россия, г.Нижний Новгород, ул. Малая Покровская, 20"}))}),s.events.add("mouseleave",()=>{n&&(t(!1),o.balloon.close())}),o.geoObjects.add(s)}))},[]),(0,o.jsx)("div",{style:{height:700,width:600},ref:e})}}}]);