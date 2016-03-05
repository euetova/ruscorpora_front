function parse_attrs(str, level) {
  var grams = str.split(/[&|,()]/);
  var elems = document.getElementsByTagName('input');
  for (i = 0; i < grams.length; i++) {
   grams[i] = grams[i].replace(/^\s+|\s+$/g,"");
   for (j = 0; j < elems.length; j++) {
    el = elems[j];
    if (el && el.getAttribute('l') == level && el.value == grams[i])
     el.checked=true;
   }
  }
}

function check(item) {
 var elems = document.getElementsByName(item.name);
 for (var i = 0; i < elems.length; i++) {
  var el = elems[i];
  if (el != item && el.value == item.value && el.name == item.name)
   el.checked = item.checked
 }
}

function contains(arr, val) {
 for (var j = 0; j < arr.length; ++j)
  if (arr[j] == val)
   return true;
 return false;
}


function collect() {
 pwin = window.opener;
 if (!pwin || pwin.closed)
   return;

 var form = window.activeForm;
 var els = form.elements;

 var attrs = form.getAttribute('id').split('2');
 var mainId = attrs[0];
 var slaveId = attrs[1];

 var values = [];
 for (var i = 0; i < els.length; ++i) {
  var el = els[i];
  if (el.getAttribute('l') != 0) continue;
  if (el.type != 'checkbox') continue;
  if (el.checked) {
   if (contains(values, el.value)) continue;
   values.push(el.value);
  }
 }
 var strval = values.join(" | ");
 pwin.document.getElementById(mainId).value = strval;


 values = [];
 for (var i = 0; i < els.length; i++) {
  var el = els[i];
  if (el.getAttribute('l') != 1) continue;
  if (el.type != 'checkbox') continue;
  if (el.checked) {
   if (contains(values, el.value)) continue;
   values.push(el.value);
  }
 }
 strval = values.join(" | ");
 pwin.document.getElementById(slaveId).value = strval;

 pwin.onInputChange('acts');
 pwin.onInputChange('gestures');

 window.close();
}

function inverse(group) {
 var form = window.activeForm;
 var els = form.elements;
 for (var i = 0; i < els.length; i++) {
  var el = els[i];
  if (el.type != 'checkbox') continue;
  if (el.name == group) el.checked = !el.checked;
 }
}

function show1form() {
 // select form
 var attr = window.name;
 var form = document.getElementById(attr);
 if (!form) return;
 window.activeForm = form;
 form.style.display = '';
}
