 var designW = 750;  //设计稿宽750px
 var font_rate = 100; //适配的比例，font-size为100px
!function(n){
var e=n.document,

t=e.documentElement,

i=720,

d=i/100,

o="orientationchange"in n?"orientationchange":"resize",

a=function(){

var n=t.clientWidth||320;n>720&&(n=720);

t.style.fontSize=n/d+"px"

};
a()
e.addEventListener&&(n.addEventListener(o,a,!1),e.addEventListener("DOMContentLoaded",a,!1))

}(window);