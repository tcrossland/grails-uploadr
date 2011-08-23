/**
 *  Uploadr, a multi-file uploader plugin
 *  Copyright (C) 2011 Jeroen Wesbeek
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *  http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 *
 *  $Author$
 *  $Rev$
 *  $Date$
 */
(function(b){var a={playNotification:function(c){if(c.workvars.notificationSoundEffect){c.workvars.notificationSoundEffect.play()}},playError:function(c){if(c.workvars.errorSoundEffect){c.workvars.errorSoundEffect.play()}},playDelete:function(c){if(c.workvars.deleteSoundEffect){c.workvars.deleteSoundEffect.play()}},cancel:function(c){if(c.preventDefault){c.preventDefault();c.stopPropagation()}return false},dragOver:function(c){a.cancel(c)},dragEnter:function(e,f,d,g,c){f.addClass(g);a.cancel(e,f,d,g,c);if(!c.workvars.gotFiles){b(".placeholder",f).hide()}},dragLeave:function(e,f,d,g,c){if(e.target&&e.target==f[0]){f.removeClass(g)}a.cancel(e);b(".placeholder",f).html(c.placeholderText);if(!c.workvars.gotFiles){b(".placeholder",f).show()}},addFile:function(d,f,c){var g=a.addFileElements(d,f,c,false);var e=b(g);a.onProgressHandler(e,f,100,c.labelDone);b(".placeholder",d).hide();c.workvars.gotFiles=true;a.addButtons(f,e,c)},addFileElements:function(o,t,f,r){var c=(f.id+"File"+f.workvars.files.length);var p=document.createElement("div");p.setAttribute("class","file");var n=document.createElement("div");n.setAttribute("class","background");var g=document.createElement("div");g.setAttribute("class","progress");var k=document.createElement("div");k.setAttribute("class","info");var d=document.createElement("div");d.setAttribute("class","details");var s=document.createElement("div");s.setAttribute("class","buttons");var h=document.createElement("div");h.setAttribute("class","spinner");h.style.display="none";var j=document.createElement("div");j.setAttribute("class","name");j.setAttribute("id",c);var q=document.createElement("span");q.setAttribute("class","fileName");q.innerHTML=a.shortenFileName(f.maxFileNameLength,t.fileName);var e=document.createElement("div");e.setAttribute("class","size");e.innerHTML=a.bytesToSize(t.fileSize);var m=document.createElement("div");m.setAttribute("class","percentage");m.innerHTML=((r)?"0%":f.labelDone);var l=document.createElement("div");l.setAttribute("class","speed");k.appendChild(d);k.appendChild(s);k.appendChild(h);j.appendChild(q);d.appendChild(j);d.appendChild(e);d.appendChild(m);d.appendChild(l);p.appendChild(n);p.appendChild(g);p.appendChild(k);var i=b(".files",o)[0];if(f.insertDirection=="down"){i.appendChild(p)}else{i.insertBefore(p,i.childNodes[0])}a.addFileTooltip(b(".fileName",b("#"+c)),t);if(f.insertDirection=="up"){f.workvars.files.unshift(p);if(f.workvars.viewing>0){f.workvars.viewing++}}else{if(!(f.workvars.files.length>0&&f.workvars.viewing<(f.workvars.files.length-1))){f.workvars.viewing=f.workvars.files.length}f.workvars.files.push(p)}a.handlePagination(o,f);return p},removeFileElement:function(d,c){var e=d.parent();a.playDelete(c);d.animate({height:"0px"},200,"swing",function(){for(var f=0;f<c.workvars.files.length;f++){if(c.workvars.files[f]==d.get(0)){c.workvars.files.splice(f,1);break}}if(c.insertDirection=="up"){c.workvars.viewing=(f>0)?f-1:0}else{c.workvars.viewing=(f>(c.workvars.files.length-1))?(c.workvars.files.length-1):f}d.remove();if(b(".info",e).size()<1){b(".placeholder",e).show()}a.handlePagination(c.workvars.uploadrDiv,c)})},handleBadge:function(d,c){c.workvars.uploading+=d;if(c.workvars.uploading<0){c.workvars.uploading=0}var f=c.workvars.badgeDiv,e=c.workvars.uploading;f.html(e);if(e<1&&d<0){f.animate({opacity:0},{duration:1000})}else{if(e==1&&d>0){f.animate({opacity:1},{duration:700})}}},handlePagination:function(d,p){var f,e,i,n,l,m,k,o,h,j=b(".pagination",d),g="",c=p.workvars.files;if(p.maxVisible==0){if(j.is(":visible")){j.hide()}return}if(c.length>p.maxVisible||j.is(":visible")){e=Math.ceil(c.length/p.maxVisible);i=Math.ceil((p.workvars.viewing+1)/p.maxVisible);m=((p.maxVisible*i)-1);l=(m-p.maxVisible+1);for(n=0;n<c.length;n++){f=b(c[n]);if(n<l||n>m){if(f.is(":visible")){f.hide()}}else{if(f.is(":hidden")){f.show()}}}}if(!i||!e||e==1){if(j.is(":visible")){j.hide()}}else{k=p.workvars.prevButton;o=p.workvars.nextButton;h=p.workvars.pagesDiv;if(j.is(":hidden")){j.show()}for(n=1;n<=e;n++){g+="<li"+((n==i)?' class="current"':"")+">"+n+"</li>"}h.html(g);if(i==1){k.hide();o.show()}else{if(i==e){k.show();o.hide()}else{k.show();o.show()}}}},addFileTooltip:function(c,d){c.tipTip({content:"name: "+d.fileName+"<br/>size: "+a.bytesToSize(d.fileSize)+((d.fileDate)?("<br/>date: "+d.fileDate):"")})},drop:function(g,h,e,i,d){var f=g.dataTransfer.files;var c=h;c.removeClass(i);if(g.preventDefault){g.preventDefault();g.stopPropagation()}if(typeof f!=="undefined"){b(".placeholder",h).hide();d.workvars.gotFiles=true;b.each(f,function(j,k){var l={fileName:k.fileName,fileSize:k.fileSize,startTime:new Date().getTime()};var m=a.addFileElements(e,l,d);a.startUpload(k,l,b(m),d)})}return false},startUpload:function(g,h,f,e){var c="";a.handleBadge(1,e);e.onStart(h);if(e.maxSize&&g.fileSize>e.maxSize){return false}var j=new XMLHttpRequest(),d=j.upload,i=b(".progress",f);a.addButton(f,"cancel","cancel.png","click to abort file transfer","are you sure you would like to abort this tranfer?",e,function(k){c="abort";j.abort()});d.addEventListener("progress",function(k){if(e.onProgress(h,f,Math.ceil((k.loaded/k.total)*100))){a.onProgressHandler(f,h,Math.ceil((k.loaded/k.total)*100))}},false);d.addEventListener("error",function(k){a.playError(e);if(e.onProgress(h,f,100)){a.onProgressHandler(f,h,100,e.labelFailed);a.handleBadge(-1,e)}i.addClass("failed")},false);d.addEventListener("abort",function(k){if(e.errorSound){new Audio(e.errorSound).play()}if(e.onProgress(h,f,100)){a.onProgressHandler(f,h,100,e.labelAborted)}i.addClass("failed");e.onAbort(h,f);a.addButton(f,"delete","delete.png","click to remove this aborted transfer from your view","",e,function(){a.removeFileElement(f,e)})},false);j.onreadystatechange=function(){if(j.readyState!=4){return}var k=(j.responseText)?JSON.parse(j.responseText):{};if(k.fileName&&h.fileName!=k.fileName){h.fileName=k.fileName;a.addFileTooltip(b(".fileName",f).html(a.shortenFileName(e.maxFileNameLength,k.fileName)),h)}if(j.status==200){if(e.onProgress(h,f,100)){a.onProgressHandler(f,h,100)}var l=b(".spinner",f);l.show("slow");e.onSuccess(h,f,function(){l.hide();a.onProgressHandler(f,h,100,e.labelDone);a.playNotification(e);a.handleBadge(-1,e);a.addButtons(h,f,e)})}else{a.playError(e);if(e.onProgress(h,f,100)){a.onProgressHandler(f,h,100,e.labelFailed,k.statusText);a.handleBadge(-1,e)}i.addClass("failed");e.onFailure(h,f);if(c!="abort"){e.onDelete(h,f)}return}};j.open("POST",e.uri);j.setRequestHeader("Cache-Control","no-cache");j.setRequestHeader("X-Requested-With","XMLHttpRequest");j.setRequestHeader("X-File-Name",g.fileName);j.setRequestHeader("X-File-Size",g.fileSize);j.setRequestHeader("X-Uploadr-Name",e.id);j.setRequestHeader("Content-Type",g.contentType);j.send(g)},onProgressHandler:function(d,k,o,n,l){var c=d.parent().width();var j=b(".progress",d);var g,m,i,f,e,h;if(k.startTime&&o<100){g=new Date().getTime();m=Math.ceil((g-k.startTime)/1000);i=((k.fileSize/100)*o)/m;if(k.avg){e=Math.round((k.avg+i)/2);k.avg=e}else{k.avg=i;e=i}h=Math.ceil((k.fileSize/e)-m);f=a.bytesToSize(e)+"/s (about "+a.secondsToTime(h)+" to go)"}else{f=""}b(".speed",d).html(f);j.width((c/100)*o);b(".percentage",d).html((n)?n:o+"%");if(n&&l){b(".percentage",d).tipTip({content:l})}if(o>=100){j.addClass("complete");b(".cancel",d).hide();k.speed=null}},addButtons:function(e,d,c){a.addButton(d,"delete","delete.png","click to delete this file","are you sure you want to delete this file?",c,function(){if(c.onDelete(e,d)){a.removeFileElement(d,c)}});a.addButton(d,"download","page_link.png","click to download this file","",c,function(){c.onDownload(e,d)});a.addButton(d,"view","magnifier.png","click to view this file","",c,function(){c.onView(e,d)})},addButton:function(c,i,d,g,f,m,l){var j=document.createElement("div");j.setAttribute("class","button "+i);j.setAttribute("style","display: none");var k=document.createElement("img");k.setAttribute("src",m.famfamfam+"/"+d);j.appendChild(k);var h=b(".buttons",c);h[0].appendChild(j);var e=b("."+i,c);if(g){e.tipTip({content:g})}e.bind("click",function(n){if(!f||(confirm&&confirm(f))){l()}});e.show("slow");return e},bytesToSize:function(c){var e=["B","KB","MB","GB","TB"];if(c==0){return"n/a"}var d=parseInt(Math.floor(Math.log(c)/Math.log(1024)));return Math.round(c/Math.pow(1024,d),2)+" "+e[d]},secondsToTime:function(e){var d=[" seconds","minutes","hours"];if(e==0){return"n/a"}var c=parseInt(Math.floor(Math.log(e)/Math.log(60)));return Math.round(e/Math.pow(60,c),2)+" "+d[c]},shortenFileName:function(g,c){var i="",h="",e="",f=0,d=c.lastIndexOf(".");if(c.length<=g){return c}else{if(d){i=c.substring(0,d);h=c.substring(d+1,c.length);f=(g-4-h.length);if(i.match(/\-\d+$/)){d=i.lastIndexOf("-");e=i.substring(d+1,i.length);i=i.substring(0,d);f-=e.length}}else{i=c}}return i.substring(0,f)+((e)?("..."+e+"."):"....")+h},addFileUploadField:function(h,g,f){var i=document.createElement("input");i.setAttribute("type","file");i.multiple=true;var c=document.createElement("div");c.setAttribute("class","message");c.innerHTML=f.fileSelectText;var e=document.createElement("div");e.setAttribute("class","fileinput");e.appendChild(c);e.appendChild(i);g.appendChild(e);var d=b("input[type=file]",h);b(".message",h).bind("click",function(){d[0].click()});d.bind("change",function(){if(typeof this.files!=="undefined"){b(".placeholder",g).hide();f.workvars.gotFiles=true;b.each(this.files,function(j,k){var l={fileName:k.fileName,fileSize:k.fileSize};var m=a.addFileElements(g,l,f);a.startUpload(k,l,b(m),f)})}})}};b.fn.uploadr=function(c){var d={placeholderText:"drag and drop your files here to upload...",fileSelectText:"Select files to upload",labelDone:"done",labelFailed:"failed",labelAborted:"aborted",dropableClass:"uploadr-dropable",hoverClass:"uploadr-hover",uri:"/upload/uri",id:"uploadr",famfamfam:"/images/icons",maxFileNameLength:34,maxSize:0,maxVisible:5,files:[],uploadField:true,insertDirection:"down",notificationSound:"",errorSound:"",deleteSound:"",workvars:{gotFiles:false,files:[],notificationSoundEffect:null,errorSoundEffect:null,deleteSoundEffect:null,viewing:0,uploading:0,badgeDiv:null,uploadrDiv:null,paginationDiv:null,pagesDiv:null,nextButton:null,prevButton:null},onStart:function(e){},onProgress:function(g,f,e){return true},onSuccess:function(f,e,g){g()},onFailure:function(f,e){return true},onAbort:function(f,e){return true},onView:function(f,e){return true},onDownload:function(f,e){return true},onDelete:function(f,e){return true}};var c=b.extend(d,c);return this.each(function(){var j=b(this);var n=j.get(0);if(c.uploadField){a.addFileUploadField(j,n,c)}var i=document.createElement("div");i.setAttribute("class","badge hidden");var f=document.createElement("div");f.setAttribute("class","placeholder");f.innerHTML=d.placeholderText;var h=document.createElement("div");h.setAttribute("class","files "+d.dropableClass);h.appendChild(f);var o=document.createElement("div");o.setAttribute("class","pagination");var m=document.createElement("div");m.setAttribute("class","previous");var l=document.createElement("div");l.setAttribute("class","pages");var g=document.createElement("div");g.setAttribute("class","next");o.appendChild(m);o.appendChild(l);o.appendChild(g);n.appendChild(i);n.appendChild(h);n.appendChild(o);c.workvars.uploadrDiv=n;c.workvars.badgeDiv=b(i);c.workvars.paginationDiv=b(o);c.workvars.pagesDiv=b(l);c.workvars.nextButton=b(g);c.workvars.prevButton=b(m);c.workvars.badgeDiv.css({opacity:0});c.workvars.paginationDiv.hide();h.addEventListener("dragover",a.dragOver,false);h.addEventListener("dragenter",function(e){a.dragEnter(e,b(this),n,d.hoverClass,c)},false);h.addEventListener("dragleave",function(e){a.dragLeave(e,b(this),n,d.hoverClass,c)},false);h.addEventListener("drop",function(e){a.drop(e,b(this),n,d.hoverClass,c)},false);b(m).bind("click",function(){c.workvars.viewing=c.workvars.viewing-c.maxVisible;a.handlePagination(n,c)});b(g).bind("click",function(){c.workvars.viewing=c.workvars.viewing+c.maxVisible;a.handlePagination(n,c)});a.handlePagination(n,c);if(c.files){for(var k in c.files){a.addFile(n,c.files[k],c)}}if(c.notificationSound){c.workvars.notificationSoundEffect=new Audio(c.notificationSound)}if(c.errorSound){c.workvars.errorSoundEffect=new Audio(c.errorSound)}if(c.deleteSound){c.workvars.deleteSoundEffect=new Audio(c.deleteSound)}})}})(jQuery);