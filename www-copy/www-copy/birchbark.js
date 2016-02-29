settings.linksName = false;
settings.disableTree = true;
settings.disableSecondTable = true;
settings.grammName = "gramsel-old_rus.html";
settings.grammSize = "width=700, height=600";
//settings.semName = false;
//settings.flagsName = false;
settings.sem.caption = "Значение";
settings.sem.nohelp = true;
settings.sem.noselect = true;
settings.customDraw = true;

settings.suggest = true;
settings.mode = "birchbark";

function collect(add_hidden) {
  var url = "";
  var els = document.metaForm.elements;
  var ar = {};
  for (var i = 0; i != els.length; i++) {
    var el = els[i];
    if (add_hidden && el.type == 'hidden')
      ar[el.name] = el.value;
    if (el.type == 'text') {
      ar[el.name] = el.value;
    } else if (el.type == 'checkbox') {
      if (el.checked) {
        if (!ar[el.name])
          ar[el.name] = '';
        else
          ar[el.name] += '|';
        ar[el.name] += el.value;
      }
    }
  }
  for (i in ar) {
    url += "&" + i + "=" + utf8_decode(ar[i]);
  }
  return url;
}

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

function submitSlav(form, meta) {
 var url = "";
 if (!meta)
   url = get_params_slav(form);
 url += collect(meta);
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

