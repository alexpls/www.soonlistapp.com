!function(){"use strict";function e(e){function o(){u++,u>i.length-1&&(u=0),console.log("showing slide"+u);for(var e=0;e<i.length;e++){var n=i[e];n.classList.remove("active"),e===u&&n.classList.add("active")}a.style.marginLeft=-(u*c)+"px"}function s(){l++,l===r&&(c=i[0].width,setInterval(o,n-t))}for(var a=e.getElementsByClassName("images")[0],i=e.getElementsByTagName("img"),r=i.length,l=0,u=0,c=i[0].width,m=0;m<i.length;m++){var d=i[m];d.complete?s():d.addEventListener("load",s,!1)}}for(var n=5e3,t=250,o=document.getElementsByClassName("phone-carousel"),s=0;s<o.length;s++){var a=o[s];new e(a)}}(),function(){"use strict";function e(){r.disabled=0===i.value.length}function n(e){return/.+\@.+\..+/gi.test(e)}function t(e){var n={to:e,subject:"Download Soonlist!",body:["Dear future me,","","Please remember to download Soonlist for iPhone","","Regards,","Past me"].join("\n")};return["mailto:?",o(n)].join("")}function o(e){var n=[];for(var t in e)if(e.hasOwnProperty(t)){var o=t,s=e[t];n.push(encodeURIComponent(o)+"="+encodeURIComponent(s))}return n.join("&")}function s(){return/i(Phone|Pod)/i.test(navigator.userAgent)}var a=document.forms["remind-myself"],i=a.email,r=a.submit;if(s()){var l=document.getElementsByClassName("not-on-iphone");[].forEach.call(l,function(e){e.parentNode.removeChild(e)})}a&&!s()&&(a.classList.remove("hide"),e(),a.addEventListener("submit",function(e){e.preventDefault();var o=i.value;console.log("Email submitted: ",o),n(o)?(console.log("Validation was successful"),i.value="",document.location.href=t(o)):(console.log("Validation unsuccessful"),a.getElementsByClassName("input-with-error")[0].classList.add("showing-error"))},!1),i.addEventListener("keyup",e,!1))}();