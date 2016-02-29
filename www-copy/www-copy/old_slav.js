settings.linksName = false;
settings.disableTree = true;
settings.disableSecondTable = true;
settings.grammName = "reqgrm-old_slav.html";
settings.grammSize = "width=700, height=600";
settings.semName = false;
settings.flagsName = "reqflags-old_slav.html";
settings.mode = "old_slav";

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
         if (j > 0)
           url += "min" + (j+1).toString() + "=1&max" + (j+1).toString() + "=1&";
         url += "form" + (j+1).toString();
         url += "=";
         url += words[j];
        }
       } else {
        if (url != "") url += "&";
        url += name;
        url += "=";
        if (name == "mycorp")
          value = utf8_decode(value);
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
   url = replace_inner(url);
 } else if (document.getElementById("fm").checked) {
   url = url.replace(/&lex/g, "&lexm");
   url = url.replace(/&form/g, "&formm");
   url = replace_modern(url);
 }
 window.open("http://search-beta.ruscorpora.ru/search.xml?" + url);
}
