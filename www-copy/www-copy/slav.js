settings.linksName = false;
settings.disableTree = true;
settings.disableSecondTable = true;
settings.grammName = "reqgrm-slav.html";
settings.grammSize = "width=700, height=600";
settings.semName = false;
settings.flagsName = false;
settings.mode = "slav";

function get_params_slav(form) {
 var url = "";
 var fe = document.getElementById("fe").checked;
 for(var i = 0; i < form.elements.length; i++) {
   var elem = form.elements[i];
   var name = elem.name;
   var value = elem.value;
   if (name != "" && value != "") {
     if (elem.type != "checkbox" && elem.type != "radio" || elem.checked) {
       if (!fe && name=="text" && value=="lexform") value = "lexgramm";
       if (name=="req" && !fe) {
        var words = value.split(" ");
        for (var j = 0; j < words.length; ++j) {
         if (url != "") url += "&";
         url += "form" + (j+1).toString();
         url += "=";
         url += words[j];
        }
       } else {
        if (url != "") url += "&";
        url += name;
        url += "=";
        //if (name != "req")
        //  value = utf8_decode(value);
        url += value;
       }
     }
   }
 }
 return url;
}

function submitSlav(form) {
 var url = get_params_slav(form);
 if (document.getElementById("fi").checked) {
   url = url.replace(/&lex/g, "&lexi");
   url = url.replace(/&form/g, "&formi");
 } else if (document.getElementById("fm").checked) {
   url = url.replace(/&lex/g, "&lexm");
   url = url.replace(/&form/g, "&formm");
 }
 window.open("http://search.ruscorpora.ru/search.xml?" + url);
}
