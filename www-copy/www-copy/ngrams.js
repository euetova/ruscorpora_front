settings.mode = "ngrams_2";

settings.linksName = false;
settings.disableTree = true;
settings.disableSecondTable = true;

settings.semName = false;
settings.semModifiers = false;

settings.flagsName = "reqflags-filtered.html";
settings.flagsSize = "width=600, height=450";

settings.suggest = false;

settings.wordFormationName = false;
settings.customDraw = true;
settings.oneLine = true;


function toggleMode(lexgramm) {
  var use_lexgr = document.getElementById("use_lexgr");
  var use_punct = document.getElementById("use_punct");
  var mode = settings.mode;
  if ((use_lexgr.checked || lexgramm) && use_punct.checked)
    mode += "_lexgr_punct";
  else if ((use_lexgr.checked || lexgramm) && !use_punct.checked)
    mode += "_lexgr";
  else if (!(use_lexgr.checked || lexgramm) && use_punct.checked)
    mode += "_punct";
  else
    mode += "_forms";

  document.exactForm.mode.value = mode;
  document.reqForm.mode.value = mode;
}

