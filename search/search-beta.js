var settings = {
  parentBlock : new Array('0_words', '1_words'),
  newId : new Array(1, 1),

  tempId : "temp_id",

  helpImage : '<img src="i/help2.gif" style="vertical-align:bottom;" alt="[?]" width="18" height="18" border="0" />',
  addBrotherImage : '<img title="' + language.addWord + '" alt="' + language.addWord + '" src="i/add_sibling.gif" border="0" width="18" height="18" />',
  addSonImage : '<img title="' + language.addSibling + '" alt="' + language.addSibling + '" src="i/add_son.gif" border="0" width="18" height="18" />',
  killImage : '<img title="' + language.deleteWord + '" alt="' + language.deleteWord + '" src="i/kill.gif" border="0" width="18" height="18" />',
  defaultMin : '1',
  defaultMax : '1',
  defaultType : '',
  disableTree : false,
  disableFirstLevel : false, // disable 1st level sisters
  disableSecondTable : false,
  semModifiers : false,
  orphoStructure: false,
  accentStructure: false,

  grammName : "reqgrm.html",
  grammSize : "width=650, height=600",
  grammHelp : "help-lexic-gram.html",

  semName : "reqsem.html",
  semSize : "width=800, height=750",
  semHelp : "help-lexic-sem.html",
  semHelpAdditional : "help-lexic-sem-add.html",

  flagsName : "n-reqflags.html",
  flagsSize : "width=450, height=420",
  flagsHelp : "help-flags.html",

  orphoHelp : "help-orpho.html",

  accentName : "reqaccents.html",
  accentSize : "width=470, height=280",
  accentHelp : "help-accent.html",

  linksName : "reqrel-syntax.html",
  linksSize : "width=800, height=900",
  linksHelp : "help-syntax-links.html",

  attrsName : "reqattrs.html",
  attrsSize : "width=900, height=400",
  attrsHelp : "help-attrs.html",

  murcoActsName : "attrs-murco-acts.html",
  murcoActsMixedName : "attrs-murco-acts-mixed.html",

  murcoGesturesName : "attrs-murco-gestures.html",
  murcoGesturesMixedName : "attrs-murco-gestures-mixed.html",
  murcoMixedSize : "width=1000, height=900",


  helpLexicWord : "help-lexic-word.html",

  mode : "main",
  blocksCount : 0
}

function openPopup(name, val, str) {
  dialog = window.open(name, val, "scrollbars=yes, resizable=yes, " + str);
  dialog.focus();
}

function getGramm(name) {
  openPopup(settings.grammName, "gramm" + name, settings.grammSize);
}

function getSem(name) {
  openPopup(settings.semName, "sem" + name, settings.semSize);
}

function getFlags(name) {
  openPopup(settings.flagsName, "flags" + name, settings.flagsSize);
}

function getAccents(name) {
  openPopup(settings.accentName, "strAccent" + name, settings.accentSize);
}

function getLinks(name) {
  openPopup(settings.linksName, "type" + name, settings.linksSize);
}

function getAttr(name) {
  openPopup(settings.attrsName, name, settings.attrsSize);
}

function getMurcoAttr(name) {
  if (name.substr(0, 4) == 'act_')
   openPopup(settings.murcoActsName, name, settings.murcoSize);
  else
   openPopup(settings.murcoGesturesName, name, settings.murcoSize);
}

function getMurcoAttrMixed(name) {
  if (name.substr(0, 4) == 'act_')
   openPopup(settings.murcoActsMixedName, name, settings.murcoMixedSize);
  else
   openPopup(settings.murcoGesturesMixedName, name, settings.murcoMixedSize);
}



function get_id(block, name) {
  return "c" + block + "_" + name;
}

function setSuggest (block, id) {
  var ctrl = document.getElementById(get_id(block, "lex") + id);
  if (ctrl)
    suggest = new Suggest(ctrl, { site: "ruscorp" });
}

function add_sibling ( block, id ) {
  var caller = null;
  if ( id != 0 ) {
    caller = document.getElementById( get_id(block, "word") + id );
  }
  var newword = document.createElement ("DIV");
  newword.id = get_id(block, "word") + settings.newId[block];
  var currparent = id == 0 ? 0 : document.getElementById(get_id(block, "parent") + id).value;
  var currlevel = 0;
  if ( id != 0 ) {
    currlevel = parseInt(document.getElementById(get_id(block, "level") + id).value);
    newword.style.marginLeft = (currlevel*20) + "px";
  } else {
    currlevel = 0;
    newword.style.marginLeft = "0px";
  }
  if (currlevel == 0)
    settings.blocksCount++;
  newword.innerHTML = draw_word ( block, settings.newId[block], currparent, currlevel );
  var nextword = caller == null ? null : count_nextbroth(caller, parseInt(caller.getElementsByTagName("INPUT")[1].value));
  settings.parentBlock[block].insertBefore( newword, nextword );
  setSuggest (block, settings.newId[block]);
  settings.newId[block]++;
}

function count_nextbroth( caller, parentlevel ) { // search for the next word of the same level
  if ( caller.nextSibling == null || ( parseInt(caller.nextSibling.getElementsByTagName("INPUT")[1].value) <= parentlevel )) {
    return caller.nextSibling;
  }
  else return count_nextbroth(caller.nextSibling, parentlevel);
}

function add_child ( block, id ) {
  var caller = null;
  if ( id != 0 ) {
    caller = document.getElementById( get_id(block, "word") + id );
  }
  var newword = document.createElement ("DIV");
  newword.id = get_id(block, "word") + settings.newId[block];
  var currparent = id == 0 ? 0 : id;
  var currlevel = 0;
  if ( id != 0 ) {
    currlevel = parseInt(document.getElementById(get_id(block, "level") + id).value) + 1;
    newword.style.marginLeft = (currlevel*20) + "px";
  }
  else {
    currlevel = 0;
    newword.style.marginLeft = "0px";
  }
  newword.innerHTML = draw_word ( block, settings.newId[block], currparent, currlevel );
  settings.parentBlock[block].insertBefore( newword, caller == null ? null : caller.nextSibling );
  setSuggest (block, settings.newId[block]);
  settings.newId[block]++;
}

function kill ( block, id ){
  var caller = document.getElementById(get_id(block, "word") + id);
  if (caller) {
    var parentlevel = parseInt(caller.getElementsByTagName("INPUT")[1].value);
    if (parentlevel == 0) {
  if (settings.blocksCount == 1) return;
  settings.blocksCount--;
  }
    var nextword = caller.nextSibling;
    settings.parentBlock[block].removeChild(caller);
    while ( nextword != null && ( parseInt(nextword.getElementsByTagName("INPUT")[1].value) > parentlevel ) ) {
      nextnextword = nextword.nextSibling;
      settings.parentBlock[block].removeChild(nextword);
      nextword = nextnextword;
    }
  }
}

function ed_syntaxrel(link) {
  if(link.checked) {
    link.nextSibling.nextSibling.disabled = false;
    link.nextSibling.nextSibling.style.background = "";
  }
  else {
    link.nextSibling.nextSibling.disabled = true;
    link.nextSibling.nextSibling.style.background = "#e0e0e0";
  }
}

function draw_word ( block, id, parentid, level ) {
  var no_words = settings.parentBlock[block].innerHTML == '' ? 1 : 0;
  var kill_link = (no_words == -1) ?
    '<img src="/i/dot.gif" width="16" height="16" alt="" />' :
    '<a id="' + get_id(block, "linkkill") + id + '" href="javascript:kill(' + block + ', \'' + id + '\')">' + settings.killImage + '</a>';
  var addbrth_link = (level == 0 && settings.disableFirstLevel) ?
    '<img src="/i/dot.gif" width="16" height="16" alt="" />' :
    '<a id="' + get_id(block, "linkaddbroth") + id + '" href="javascript:add_sibling(' + block + ', \'' + id + '\')">' + settings.addBrotherImage + '</a>';
  var addson_link = (!settings.disableTree) ?
    '<a id="' + get_id(block, "linkaddson") + id + '" href="javascript:add_child(' + block + ', \'' + id + '\')">' + settings.addSonImage + '</a>' :
    '';

  var innercode = '';
  innercode += '<input type="hidden" id="' + get_id(block, "parent") + '' + id + '" name="parent" value="' + parentid + '"/>';
  innercode += '<input type="hidden" id="' + get_id(block, "level") + '' + id + '" name="level" value="' + level + '"/>';

  if (block == 0) {
    if ( no_words == 0 ) {
      innercode +=
        '<table class="distreq"><tr><td>' + language.distance +  (settings.disableTree?'':language.fromParent) + ':'+
          ' ' + language.from + ' <input type="text" id="' + get_id(block, "min") + id + '" name="min' + id + '" size="4" value="' + settings.defaultMin + '" class="text" />'+
          ' ' + language.to + ' <input type="text" id="' + get_id(block, "max") + id + '" name="max' + id + '" size="4" value="' + settings.defaultMax + '" class="text" />'+
          ' <a href="help-lexic-order.html" onClick="return showhelp(\'help-lexic-order.html\',0.7)">' + settings.helpImage + '</a>'+
          '</td></tr>';
      if ( settings.linksName ) {
        innercode +=
          '<tr><td>' +
          '<input type="checkbox" id="' + get_id(block, "link") + id + '" name="link' + id + '" checked="checked" onclick="ed_syntaxrel(this)" />' +
          language.syntacticRelationship + ' <input type="text" id="' + get_id(block, "type") + id + '" name="type' + id + '" value="' + settings.defaultType + '" class="text" size="60" /> ' +
          ' <a href="' + settings.linksHelp + '" onClick="return showhelp(\'' + settings.linksHelp + '\',0.7)">' + settings.helpImage + '</a> '+
          '<a href="javascript:getLinks(' + id + ')">' + language.select + '</a>' +
          '</td></tr>';
      }
      innercode += '</table>';
    }
    var widthSettings = (settings.semName) ? "wordreqtext" : "wordreqtext50";
    innercode +=
      '<table class="wordreq" width="100%">' +
        '<tr valign="bottom">' +
          '<td class="' + widthSettings + '">' +
            language.word + ' ' +
            ' <a href="help-lexic-word.html" onClick="return showhelp(\'help-lexic-word.html\',516)">' + settings.helpImage + '</a>'+
            ' <a href="#" onClick="return getVkb(\'lex' + id + '\' )"><img style="vertical-align:bottom;" src="i/keyboard.gif" alt="Virtual keyboard" title="Virtual keyboard" width="42" height="21" border="0"></a>' +
          '</td>' +
          '<td class="' + widthSettings + '">' +
            language.grammFeatures + ' ' +
            ' <a href="' + settings.grammHelp + '" onClick="return showhelp(\'' + settings.grammHelp + '\',0.8)">' + settings.helpImage + '</a>'+
            ' <a href="javascript:getGramm(' + id + ')">' + language.select + '</a>'+
          '</td>';
    if (settings.semName) {
      innercode +=
          '<td class="' + widthSettings + '">' +
            language.semFeatures + ' ' +
            ' <a href="' + settings.semHelp + '" onClick="return showhelp(\'' + settings.semHelp + '\',0.8)">' + settings.helpImage+'</a>'+
            ' <a href="javascript:getSem(' + id + ')">' + language.select + '</a>&nbsp;'+
          '</td>';
    }
    var zind = (100-id).toString();
    innercode +=
          '<td>&nbsp;</td>' +
        '</tr><tr>' +
          '<td class="wordreqinput" style="z-index:' + zind + '">' +
           '<div attr="suggest" style="position:relative"i style="z-index:' + zind + '">' +
            '<input type="text" autocomplete="off" id="' + get_id(block, "lex") + id + '" name="lex' + id + '" class="text100" style="z-index:' + zind + '">' +
            '<div attr="suggest" class="results" style="background-color:window;z-index:5000;display:none;position:absolute;top:24px;left:0px;min-width:300px">' +
             '<div attr="suggest">$text</div>' +
            '</div>' +
           '</div>' +
          '</td>'+
          '<td class="wordreqinput">'+
            '<input type="text" id="' + get_id(block, "gramm") + id + '" name="gramm' + id + '" class="text100">'+
          '</td>';
    if (settings.semName) {
      innercode +=
        '<td class="wordreqinput">' +
          '<input type="text" id="' + get_id(block, "sem") + id + '" name="sem' + id + '" class="text100">' +
        '</td>';
    }
    innercode +=
          '<td valign=bottom style="padding:0 10px 10px 0"><nobr>' +
            addbrth_link +
            addson_link +
            kill_link +
          '</nobr></td>' +
        '</tr>';

   if (settings.mode != 'murco') {

    if (settings.flagsName) {
      innercode +=
        '<tr>'+
          '<td class="wordreqtext" style="padding:0 10px 10px 10px">'+
            language.additionalFeatures + ' ' +
            ' <a href="' + settings.flagsHelp + '" onClick="return showhelp(\'' + settings.flagsHelp + '\',0.8)">' + settings.helpImage + '</a>'+
            ' <a href="javascript:getFlags(' + id + ')">' + language.select + '</a>'+
          '</td>'+
          '<td class="wordreqinput">'+
            '<input type="text" id="' + get_id(block, "flags") + id + '" name="flags' + id + '" class="text100">'+
          '</td>';
      if (settings.semModifiers) {
        innercode +=
          '<td class="wordreqtext" style="padding:0 10px 10px 10px">'+
            '<input type="checkbox" id="' + get_id(block, "sem-mod") + id + '" name="sem-mod' + id + '" value="sem" checked>' + language.sem + '&nbsp;' +
            '<input type="checkbox" id="' + get_id(block, "sem-mod") + id + '" name="sem-mod' + id + '" value="sem2" checked>' + language.sem2 + '&nbsp;' +
            '<input type="checkbox" id="' + get_id(block, "sem-mod") + id + '" name="sem-mod' + id + '" value="semf">' + language.semf + '&nbsp;' +
            '<input type="checkbox" id="' + get_id(block, "sem-mod") + id + '" name="sem-mod' + id + '" value="semf2">' + language.semf2 + '&nbsp;' +
            ' <a href="' + settings.semHelpAdditional + '" onClick="return showhelp(\'' + settings.semHelpAdditional + '\',0.8)">' + settings.helpImage + '</a>'+
          '</td>';
      }
      innercode += '</tr>';
    }

   } else {

//  ÌÓÐÊÀ
      innercode +=
        '<tr valign="bottom">'+
          '<td class="wordreqtext">'+
            language.additionalFeatures + ' ' +
            ' <a href="' + settings.flagsHelp + '" onClick="return showhelp(\'' + settings.flagsHelp + '\',0.8)">' + settings.helpImage + '</a>'+
            ' <a href="javascript:getFlags(' + id + ')">' + language.select + '</a>'+
          '</td>';
      innercode +=
          '<td class="wordreqtext">'+
            language.orphoMarkup + ' ' +
            ' <a href="' + settings.orphoHelp + '" onClick="return showhelp(\'' + settings.orphoHelp + '\',0.8)">' + settings.helpImage + '</a>'+
          '</td>';
      innercode +=
          '<td class="wordreqtext">'+
            language.accentMarkup + ' ' +
            ' <a href="' + settings.accentHelp + '" onClick="return showhelp(\'' + settings.accentHelp + '\',0.8)">' + settings.helpImage + '</a>'+
            ' <a href="javascript:getAccents(' + id + ')">' + language.select + '</a>'+
          '</td>'+
        '</tr>';
      innercode +=
        '<tr valign="top">'+
          '<td class="wordreqinput">'+
            '<input type="text" id="' + get_id(block, "flags") + id + '" name="flags' + id + '" class="text100">'+
          '</td>';
      innercode +=
          '<td class="wordreqinput">'+
            '<input type="text" id="' + get_id(block, "orpho") + id + '" name="orpho' + id + '" class="text100">'+
          '</td>';
      innercode +=
          '<td class="wordreqinput">'+
            '<input type="text" id="' + get_id(block, "strAccent") + id + '" name="strAccent' + id + '" class="text100">'+
          '</td>'+
         '</tr>';
      innercode += 
          '<input type="hidden" id="' + get_id(block, "accent") + id + '" name="accent' + id + '"/>';
      innercode += 
          '<input type="hidden" id="' + get_id(block, "before") + id + '" name="before' + id + '"/>';
      innercode += 
          '<input type="hidden" id="' + get_id(block, "after") + id + '" name="after' + id + '"/>';
      innercode += 
          '<input type="hidden" id="' + get_id(block, "number") + id + '" name="number' + id + '"/>';
    }
// End of ÌÓÐÊÀ

    innercode += '</table>';
    return innercode;
  } else {
    if ( no_words == 0 ) {
      innercode += '<br/>';
    }
    var widthSettings = "wordreqtext50";
    innercode +=
      '<table class="wordreq">' +
        '<tr valign="bottom">' +
          '<td class="' + widthSettings + '">' +
            language.feature + ' ' +
            ' <a href="' + settings.attrsHelp + '" onClick="return showhelp(\'' + settings.attrsHelp + ' \',0.8)">' + settings.helpImage + '</a>'+
            ' <a href="javascript:getAttr(' + id + ')">' + language.select + '</a>'+
          '</td>' +
          '<td class="' + widthSettings + '"/>';
    innercode +=
          '<td>&nbsp;</td>' +
        '</tr><tr>' +
          '<td class="wordreqinput">'+
            '<input type="text" id="' + get_id(block, "attr") + id + '" name="attr' + id + '" class="text100">'+
          '</td>'+
          '<td class="wordreqinput">'+
            '<input type="text" id="' + get_id(block, "val") + id + '" name="val' + id + '" class="text100">'+
          '</td>';
    innercode +=
          '<td valign=bottom style="padding:0 10px 10px 0"><nobr>' +
            addbrth_link +
            addson_link +
            kill_link +
          '</nobr></td>' +
        '</tr>';
    innercode += '</table>';
  }

  return innercode;
}


function expandAccent(s) {
  if (s == parseInt(s)) {
    var res = 'à' + s + '|å' + s + '|è' + s + '|î' + s + '|ó' + s + '|ý' + s + '|þ' + s + '|ÿ' + s;
    return res;
  }
  if (s.length == 1 && s != parseInt(s)) {
    var res = '';
    for (var i = 1; i <= 10; i++) {
      if (res != '') res += '|';
      res += s + i;
    }
    return res;
  }
  return s;
}

function parseMurcoMarkup(block, id) {
  if (settings.mode == 'murco') {
    strOrpho = document.getElementById(get_id(block, 'orpho') + id).value;
    strOrpho = strOrpho.replace(/[,]/g,'|');
    strOrpho = strOrpho.replace(/[\+=#]/g, '_')

    strAccent = document.getElementById(get_id(block, 'strAccent') + id).value;
    //strAccent = strAccent.replace(/[,]/g,'|');
    strAccent = strAccent.replace(/[\+=#]/g,'/');
    var data = strAccent.split('/');
    var accent = (data.length >= 1) ? expandAccent(data[0]) : '';
    var before = (data.length >= 2) ? expandAccent(data[1]) : '';
    var after =  (data.length >= 3) ? expandAccent(data[2]) : '';
    var number = (data.length >= 4) ? data[3] : '';

    document.getElementById(get_id(block, 'accent') + id).value = accent;
    document.getElementById(get_id(block, 'before') + id).value = before;
    document.getElementById(get_id(block, 'after') + id).value = after;
    document.getElementById(get_id(block, 'number') + id).value = number;

  }
}



function swap_fields(block, name, first, second) {
  var id = get_id(block, name);
  var fid = document.getElementById(id + first);
  var sid = document.getElementById(id + second);

  if (sid) {
    sid.id = settings.tempId;
  }
  if (fid) {
    fid.id = id + second
  }
  sid = document.getElementById(settings.tempId)
  if (sid) {
    sid.id = id + first;
  }

  fid = document.getElementById(id + first);
  sid = document.getElementById(id + second);
  if (fid) {
    fid.name = name + first;
  }
  if (sid) {
    sid.name = name + second;
  }
}

function swap_words(block, curid, newid) {
  var level = document.getElementById(get_id(block, "level") + curid).value;
  var tmp;
  if (document.getElementById(get_id(block, "word") + curid).previousSibling != null ) {
    swap_fields(block, "min", curid, newid);
    swap_fields(block, "max", curid, newid);
    if ( level != 0 && settings.linksName ) {
      swap_fields(block, "type", curid, newid);
      swap_fields(block, "link", curid, newid);
    }
    swap_fields(block, "linkkill", curid, newid);
    if (tmp = document.getElementById(get_id(block, "linkkill") + curid)) {
      tmp.href = 'javascript:kill(' + block + ', \'' + curid + '\')';
    }
    if (tmp = document.getElementById(get_id(block, "linkkill") + newid)) {
      tmp.href = 'javascript:kill(' + block + ', \'' + newid + '\')';
    }
  }
  swap_fields(block, "parent", curid, newid);
  swap_fields(block, "level", curid, newid);
  swap_fields(block, "lex", curid, newid);
  swap_fields(block, "gramm", curid, newid);
  swap_fields(block, "sem", curid, newid);
  swap_fields(block, "flags", curid, newid);
  swap_fields(block, "attr", curid, newid);
  swap_fields(block, "val", curid, newid);
  if ( !settings.disableFirstLevel || level != 0 ) {
    swap_fields(block, "linkaddbroth", curid, newid);
    if (tmp = document.getElementById(get_id(block, "linkaddbroth") + curid)) {
      tmp.href = 'javascript:add_sibling(' + block + ', \'' + curid + '\')';
    }
    if (tmp = document.getElementById(get_id(block, "linkaddbroth") + newid)) {
      tmp.href = 'javascript:add_sibling(' + block + ', \'' + newid + '\')';
    }
  }
  if ( !settings.disableTree) {
    swap_fields(block, "linkaddson", curid, newid);
    if (tmp = document.getElementById(get_id(block, "linkaddson") + curid)) {
      tmp.href = 'javascript:add_child(' + block + ', \'' + curid + '\')';
    }
    if (tmp = document.getElementById(get_id(block, "linkaddson") + newid)) {
      tmp.href = 'javascript:add_child(' + block + ', \'' + newid + '\')';
    }
  }
  swap_fields(block, "word", curid, newid);
}

function order_indexes_main (block) {
  var words = settings.parentBlock[block].getElementsByTagName("DIV");
  var parents = new Array("0");
  var nextword = words[0];
  for(var i = 0; i < words.length; i++) {
    if (words[i].hasAttribute("attr") && words[i].getAttribute("attr") == "suggest") continue;
    parseMurcoMarkup(block, i+1);
    words[i].getElementsByTagName("INPUT")[0].value = parents[parents.length - 1];
    currlevel = words[i].getElementsByTagName("INPUT")[1].value;
    nextword = words[i].nextSibling;
    if(nextword != null) {
      nextwordlevel = nextword.getElementsByTagName("INPUT")[1].value;
      if(currlevel < nextwordlevel) parents.push(i+1);
      if(currlevel > nextwordlevel) for(j = 0; j < (currlevel-nextwordlevel); j++) {
        parents.pop();
      }
    }
    curid = words[i].id.substr(get_id(block, "word").length);
    swap_words(block, curid, i+1)
  }
}

function order_indexes () {
  //order_indexes_main(0);
  if (!settings.disableSecondTable) {
    order_indexes_main(1);
  }
}

function get_cookie(str) {
  var beg = document.cookie.indexOf(str + "=");
  if(beg==-1)
    return "";
  var end = document.cookie.indexOf(";", beg + str.length);
  if(end==-1)
    end = document.cookie.length;
  return document.cookie.substring(beg + str.length + 1, end);
}

function set_cookie_params() {
  var x = get_cookie(settings.mode)
  if (x) {
    x = x.split("&");
    if (x.length > 0) {
      document.reqForm.mycorp.value = x[0];
      document.exactForm.mycorp.value = x[0];
    }
    if (x.length > 1) {
      document.reqForm.mysent.value = x[1];
      document.exactForm.mysent.value = x[1];
    }
    if (x.length > 2) {
      document.reqForm.mysize.value = x[2];
      document.exactForm.mysize.value = x[2];
    }
    if (x.length > 3) {
      document.reqForm.mysentsize.value = x[3];
      document.exactForm.mysentsize.value = x[3];
    }
  } else {
    document.reqForm.mycorp.value = "";
    document.exactForm.mycorp.value = "";
    document.reqForm.mysent.value = "";
    document.exactForm.mysent.value = "";
    document.reqForm.mysize.value = "";
    document.exactForm.mysize.value = "";
    document.reqForm.mysentsize.value = "";
    document.exactForm.mysentsize.value = "";
  }
  x = get_cookie("dpp");
  document.reqForm.dpp.value = x;
  document.exactForm.dpp.value = x;

  x = get_cookie("spp");
  document.reqForm.spp.value = x;
  document.exactForm.spp.value = x;

  x = get_cookie("spd");
  document.reqForm.spd.value = x;
  document.exactForm.spd.value = x;
}

function init(){
  settings.parentBlock[0] = document.getElementById(settings.parentBlock[0]);

  add_sibling (0, 0 );
  if (!settings.disableTree) {
    add_child (0, 1 );
  }
  if (!settings.disableFirstLevel) {
    add_sibling (0, 0 );
  }

  if (!settings.disableSecondTable) {
    settings.parentBlock[1] = document.getElementById(settings.parentBlock[1]);
    add_sibling (1, 0 );
    add_sibling (1, 0 );
  }
  set_cookie_params();
}

function get_params(form) {
  for(var i=0; i<form.elements.length; ++i) {
    alert(form.elements[i].value);
  }
}
