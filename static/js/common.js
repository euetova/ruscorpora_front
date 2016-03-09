var dontclosehelp;

function getVkb(name) {
    var path = "";
    if (settings.mode == "orthlib" || settings.mode == "birchbark" || settings.mode == "old_rus") {
      path = "req/reqvkb-slav.html";
      var nm = "";
      if (document.getElementById("fe").checked) nm = "e";
      else if (document.getElementById("fi").checked) nm = "i";
      else nm = "m";
      grmDialog = window.open(path, nm + ";" + name, "width=550, height=300, scrollbars=no, resizable=yes");
      grmDialog.focus();
    } else {
      path = "req/reqvkb.html";
      grmDialog = window.open(path, name, "width=600, height=300, scrollbars=yes, resizable=yes");
      grmDialog.focus();
    }
    return void(0);
}

function adjustIFrameSize (iframeWindow) {
    var frameheight = 500;
    var height = document.body.clientHeight;
    var iframeElement;
    if (iframeWindow.document.height) {
        iframeElement = document.getElementById(iframeWindow.name);
        frameheight = iframeWindow.document.height;
    }
    else if (document.all) {
        iframeElement = document.all[iframeWindow.name];
        if (iframeWindow.document.compatMode && iframeWindow.document.compatMode != 'BackCompat')
            frameheight = iframeWindow.document.documentElement.scrollHeight + 5;
        else
            frameheight = iframeWindow.document.body.scrollHeight + 5;
    }
    if (frameheight > height - 150){
        if (document.getElementById("closeinfoframe")) //opera
            document.getElementById("closeinfoframe").style.top = '30px';
        else if (document.getElementById("closeinfo"))
            document.getElementById("closeinfo").style.top = '98px';
        iframeElement.style.top = '30px';
        if (frameheight > height - 50)
            frameheight = height - 50;
    }
    iframeElement.style.height = frameheight + 'px';
    dontclosehelp = 0;
}

function showhelp(Src,w) {
    if (w == 0)
        w = 0.8;
    if (w < 1)
        w *= document.body.clientWidth;
    var x = (document.body.clientWidth-w)/2;
    var realw = (!document.all || document.compatMode && document.compatMode != 'BackCompat')?w+5:w;
    document.getElementById("info").innerHTML = '<iframe id="infoframe" name="infoframe" src="' + Src + '" width="' + w + '"  height="80%" style="position: absolute; z-index: 100; top: 90px; left: '+ x +'px;"></iframe>';
    document.getElementById("info").style.visibility = "visible";
    if (Src!='help-ngram.html') {
        document.getElementById("closeinfo").style.visibility = "visible";
        document.getElementById("closeinfo").style.left = x + 5 + 'px';
        document.getElementById("closeinfo").style.top = '90px';
    }
    dontclosehelp = 1;
    return false;
}

function closehelp(){
    document.getElementById("closeinfo").style.visibility = "hidden";
    document.getElementById("info").style.visibility = "hidden";
}

function bodyclosehelp(){
    if (dontclosehelp == 0)
        closehelp();
}

function encodeHex(c) {
  var str = "";
  while (c > 0) {
    var d = c % 16;
    if (d < 10)
      str = String.fromCharCode(0x30 + d) + str;
    else
      str = String.fromCharCode(0x41 + d - 10) + str;
    c = (c - d) / 16;
  }
  return "%" + str;
}


function utf8_decode(utftext) {
  var str = "";
  for (var i = 0; i < utftext.length; ++i) {
    var c = utftext.charCodeAt(i);
    if (c < 128) {
      str += encodeURIComponent(String.fromCharCode(c));
    } else if (c >= 0x410 && c <= 0x44F) {
      str += encodeHex(c - 0x410 + 0xC0);
    } else if (c == 0x401) {
      str += encodeHex(0xA8);
    } else if (c == 0x451) {
      str += encodeHex(0xB8);
    } else {
      str += ""; 
    }
  }
  return str;
}

function get_params(form) {
 url = "";
 for(var i = 0; i < form.elements.length; i++) {
   var elem = form.elements[i];
   var name = elem.name;
   var value = elem.value;
   if (name != "" && value != "") {
     if (elem.type != "checkbox" && elem.type != "radio" || elem.checked) {
       if (url != "") url += "&";
       url += name;
       url += "=";
       url += utf8_decode(value);
     }
   }
 }
 return url;
}

function clearCGI(form) {
 url = get_params(form);
 window.open("http://search-beta.ruscorpora.ru/search.xml?" + url);
}



