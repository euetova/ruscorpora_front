settings.linksName = false;
settings.disableTree = true;
settings.disableSecondTable = true;
settings.murcoSize = "width=450, height=400";
settings.mode = "murco";
settings.orphoStructure = true;
settings.accentStructure = true;
settings.helpLexicWord = "help-lexic-word-accent.html";
settings.flagsName = "reqflags.html";
settings.grammName = "reqgrm.html";


function toggle(id) {
  var el = document.getElementById(id);
  if (!el) return;
  if (el.style.display == "none") {
    el.style.display = "";
    return true;
  } else {
    el.style.display = "none";
    return false;
  }
}

function ensureShow(id) {
 var el = document.getElementById(id);
 if (!el) return;
 el.style.display = "";
}

function ensureHide(id) {
 var el = document.getElementById(id);
 if (!el) return;
 el.style.display = "none";
}

function clearActs() {
}

function areEmpty(s) {
  var elem = document.getElementById(s + "_table");
  var inputs = elem.getElementsByTagName("input");
  for (var i = 0; i < inputs.length; i++) {
    if (inputs[i].value != '')
      return false;
  }
  return true;
}

function onToggle(s) {
  var visible = toggle(s + "_table");
  var toggleElem = document.getElementById("toggle_" + s);
  var statusElem = document.getElementById(s + "_status");
  if (visible) {
    toggleElem.innerHTML = "свернуть";
    ensureShow("additional_ok");
  } else {
    if (statusElem.innerHTML == "заданы")
      toggleElem.innerHTML = "изменить";
    else
      toggleElem.innerHTML = "задать";
  }
}


function onInputChange(s) {
  var st = areEmpty (s);
  var statusElem = document.getElementById(s + "_status");
  var clearElem = document.getElementById("clear_" + s);
  if (!st) {
   if (statusElem.innerHTML != "заданы") {
    statusElem.innerHTML = "заданы";
    statusElem.style.color = "red";
    clearElem.className = "deep_clear";
   }
  } else if (statusElem.innerHTML == "заданы") {
    statusElem.innerHTML = "не&nbsp;заданы";
    statusElem.style.color = "green";
    clearElem.className = "deep_clear_disabled";
  }
}

function onClearInputs(s) {
  var elem = document.getElementById(s + "_table");
  var inputs = elem.getElementsByTagName("input");
  for (var i = 0; i < inputs.length; i++)
    inputs[i].value = '';
  onInputChange(s);
  var toggleElem = document.getElementById("toggle_" + s);
  if (toggleElem.innerHTML == "изменить")
    toggleElem.innerHTML = "задать";
}
