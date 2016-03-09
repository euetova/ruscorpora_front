function parse_attrs(str) {
  var grams = str.split(/[&|,()]/);
  var elems = document.getElementsByTagName('input');
  for (i = 0; i < grams.length; i++) {
   grams[i] = grams[i].replace(/^\s+|\s+$/g,"");
   for (j = 0; j < elems.length; j++) {
    el = elems[j];
    if (el && el.value == grams[i])
     el.checked=true;
   }
  }
}

function collect() {
 var form = window.activeForm;
 var attr = form.id;
 var els = form.elements;
 var strval = "";
 for (var i = 0; i < els.length; i++) {
  var el = els[i];
  if (el.type != 'checkbox') continue;
  if (el.checked) {
   if (strval != "") strval += " | ";
   strval += el.value;
  }
 }
 pwin = window.opener;
 if (pwin && !pwin.closed) {
  pwin.document.getElementById(attr).value = strval;
  pwin.onInputChange('acts');
  pwin.onInputChange('gestures');
 }
 window.close();
}

function inverse(group) {
 var form = window.activeForm;
 var els = form.elements;
 for (var i = 0; i < els.length; i++) {
  var el = els[i];
  if (el.type != 'checkbox') continue;
  //if (el.name == group) 
  el.checked = !el.checked;
 }
}

function show1form() {
 // select form
 var attr = window.name;
 var form = document.getElementById(attr);
 if (!form) return;
 window.activeForm = form;
 form.style.display = "block";
 if (document.height) {
  window.innerHeight = document.height + 100;
  if (window.innerHeight + 40 > window.screen.availHeight) {
   window.innerHeight = window.screen.availHeight - 40;
   netscape.security.PrivilegeManager.enablePrivilege("UniversalBrowserWrite");
   window.scrollbars.visible = true;
  }
 } else {
  var h = document.body.scrollHeight + 100;
  var w = document.body.clientWidth + 16;
  if (h > window.screen.availHeight) {
   h = window.screen.availHeight; w = w + 20;
   document.body.scroll = "yes";
  }
  window.resizeTo(w, h);
 }
}
