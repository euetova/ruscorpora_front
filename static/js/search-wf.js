var settings = {
  parentBlock : new Array('0_words', '1_words'),
  newId : new Array(1, 1),

  tempId : "temp_id",

  helpImage : '<span class="glyphicon glyphicon-question-sign" aria-hidden="true"></span>',
  addBrotherImage : '<span class="glyphicon glyphicon-circle-arrow-down" aria-hidden="true" title="' + language.addWord + '" alt="' + language.addWord + '"></span>',
  addSonImage : '<span class="glyphicon glyphicon-circle-arrow-right" aria-hidden="true" title="' + language.addSibling + '" alt="' + language.addSibling + '"></span>',
  killImage : '<span class="glyphicon glyphicon-remove-sign" aria-hidden="true" title="' + language.deleteWord + '" alt="' + language.deleteWord + '"></span>',
  defaultMin : '1',
  defaultMax : '1',
  defaultType : '',
  disableTree : false,
  disableFirstLevel : false, // disable 1st level sisters
  disableSecondTable : false,
  semModifiers : false,
  orphoStructure: false,
  accentStructure: false,

  grammName : "req/reqgrm.html",
  grammSize : "width=650, height=600",
  grammHelp : "help/help-lexic-gram.html",

  semName : "req/reqsem.html",
  semSize : "width=800, height=750",
  semHelp : "help/help-lexic-sem.html",
  semHelpAdditional : "help/help-lexic-sem-add.html",

  flagsName : "req/reqflags.html",
  flagsSize : "width=400, height=490",
  flagsHelp : "help/help-flags.html",

  orphoName : "req/reqorpho.html",
  orphoSize : "width=780, height=370",
  orphoHelp : "help/help-orpho.html",

  accentName : "req/reqaccents.html",
  accentSize : "width=470, height=280",
  accentHelp : "help/help-accent.html",

  linksName : "req/reqrel-syntax.html",
  linksSize : "width=800, height=900",
  linksHelp : "help/help-syntax-links.html",

  attrsName : "req/reqattrs.html",
  attrsSize : "width=900, height=400",
  attrsHelp : "help/help-attrs.html",

  wfName : "req/reqwf.html",
  wfSize : "width=350, height=220",
  wfHelp : "help/help-wf.html",

  murcoActsName : "attrs-murco/attrs-murco-acts.html",
  murcoActsMixedName : "attrs-murco/attrs-murco-acts-mixed.html",

  murcoGesturesName : "attrs-murco/attrs-murco-gestures.html",
  murcoGesturesMixedName : "attrs-murco/attrs-murco-gestures-mixed.html",
  murcoMixedSize : "width=1000, height=900",


  helpLexicWord : "help/help-lexic-word.html",

  mode : "main",
  blocksCount : 0
};

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

function getOrpho(name) {
  openPopup(settings.orphoName, "orphoGr" + name, settings.orphoSize);
}

function getAccents(name) {
  openPopup(settings.accentName, "strAccent" + name, settings.accentSize);
}

function getWf(name) {
  openPopup(settings.wfName, "m" + name, settings.wfSize);
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
    '<img src="../img/dot.gif" width="16" height="16" alt="" />' :
    '<a id="' + get_id(block, "linkkill") + id + '" href="javascript:kill(' + block + ', \'' + id + '\')">' + settings.killImage + '</a>';
  var addbrth_link = (level == 0 && settings.disableFirstLevel) ?
    '<img src="../img/dot.gif" width="16" height="16" alt="" />' :
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
          '<div class="row"><div class="col-xs-3"><div class="form-group distreq">' +
                    '<div class="input-group input-group-sm">'+
                      '<div class="input-group-addon">' + language.distance +  (settings.disableTree?'':language.fromParent) + ': '+ language.from + '</div>'+
                      '<input type="text" class="form-control" id="' + get_id(block, "min") + id + '" placeholder="1" name="min' + id + '" value="' + settings.defaultMin + '" />'+
                      '<div class="input-group-addon">' + language.to + '</div>' +
                        '<input type="text" class="form-control" id="' + get_id(block, "max") + id + '" placeholder="1" name="max' + id + '" value="' + settings.defaultMax + '" />' +
          '</div></div></div>' +
          '<div class="col-xs-1"><a href="../../help/help-lexic-order.html" onClick="return showhelp(\'help/help-lexic-order.html\',0.7)">' + settings.helpImage + '</a></div></div>';
      if ( settings.linksName ) {
        innercode +=
          '<div class="row"><div class="col-xs-6">' +
          '<input type="checkbox" id="' + get_id(block, "link") + id + '" name="link' + id + '" checked="checked" onclick="ed_syntaxrel(this)" />' +
          language.syntacticRelationship + ' <input type="text" id="' + get_id(block, "type") + id + '" name="type' + id + '" value="' + settings.defaultType + '" class="text" size="60" /> ' +
          ' <a href="' + settings.linksHelp + '" onClick="return showhelp(\'' + settings.linksHelp + '\',0.7)">' + settings.helpImage + '</a> '+
          '<a href="javascript:getLinks(' + id + ')">' + language.select + '</a>' +
          '</div></div>';
      }
      //innercode += '</table>';
    }
    var widthSettings = (settings.semName) ? "wordreqtext" : "wordreqtext50";
      var zind = (100-id).toString();
    innercode +=
      '<div class="well"><div class="row wordreq">' +
        '<div class="row">' +
          //'<td class="' + widthSettings + '">' +
          '<div class="col-sm-3" style="z-index:' + zind + '"><label>' + language.word + ' ' +
            ' <a href="help-lexic-word.html" onClick="return showhelp(\'help-lexic-word.html\',516)">' + settings.helpImage + '</a>'+ ' <a href="#" onClick="return getVkb(\'lex' + id + '\' )"><img style="vertical-align:bottom;" src="static/img/keyboard.gif" alt="Virtual keyboard" title="Virtual keyboard" width="42" height="21" border="0"></a>' + '<div class="wordreqinput" attr="suggest" style="position:relative"i style="z-index:' + zind + '">' +
            '<input type="text" autocomplete="off" id="' + get_id(block, "lex") + id + '" name="lex' + id + '" class="form-control input-sm" style="z-index:' + zind + '">' +
            '<div attr="suggest" class="results" style="background-color:window;z-index:5000;display:none;position:absolute;top:24px;left:0px;min-width:300px">' +
             '<div attr="suggest">$text</div>' +
            '</div>' +
           '</div>' + '</label></div>' +
          //'<td class="' + widthSettings + '">' +
            '<div class="col-sm-3 wordreqinput"><label>' + language.grammFeatures + ' ' +
            ' <a href="' + settings.grammHelp + '" onClick="return showhelp(\'' + settings.grammHelp + '\',0.8)">' + settings.helpImage + '</a>'+
            ' <a href="javascript:getGramm(' + id + ')">' + language.select + '</a>'+
          '<input type="text" id="' + get_id(block, "gramm") + id + '" name="gramm' + id + '" class="form-control input-sm">'+
            '</label></div>';
    if (settings.semName) {
      innercode +=
          //'<td class="' + widthSettings + '">' +
            '<div class="col-sm-3 wordreqinput"><label>' + language.semFeatures + ' ' +
            ' <a href="' + settings.semHelp + '" onClick="return showhelp(\'' + settings.semHelp + '\',0.8)">' + settings.helpImage+'</a>'+
            ' <a href="javascript:getSem(' + id + ')">' + language.select + '</a>&nbsp;'+
                '<input type="text" id="' + get_id(block, "sem") + id + '" name="sem' + id + '" class="form-control input-sm">' +
          '</label></div>';
    }

    innercode +=
          '<div class="col-sm-2"><nobr>' +
            addbrth_link +
            addson_link +
            kill_link +
          '</nobr></div>' +
        '</div>';

   if (settings.mode != 'murco') {

   innercode += '<div class="row">';

   if (settings.flagsName)
      innercode += // Flags caption
        '<div class="col-sm-3 wordreqinput"><label>'+
          language.additionalFeatures + ' ' +
          ' <a href="' + settings.flagsHelp + '" onClick="return showhelp(\'' + settings.flagsHelp + '\',0.8)">' + settings.helpImage + '</a>'+
          ' <a href="javascript:getFlags(' + id + ')">' + language.select + '</a>'+
            '<input type="text" id="' + get_id(block, "flags") + id + '" name="flags' + id + '" class="form-control input-sm">'+
        '</label></div>';
   else innercode += '<div class="col-sm-3"><label></label></div>';
   if (settings.wordFormationName)
      innercode += // Word formation caption
         '<div class="col-sm-3 wordreqinput"><label>'+
           language.wordFormation + ' ' +
           //' <a href="' + settings.wfHelp + '" onClick="return showhelp(\'' + settings.wfHelp + '\',0.8)">' + settings.helpImage + '</a>' +
           ' <a href="javascript:getWf(' + id + ')">' + language.select + '</a>'+
             '<input type="text" id="' + get_id(block, "m") + id + '" name="m' + id + '" class="form-control input-sm">' +
         '</label></div>';
   else innercode += '<div class="col-sm-3"><label></label></div>';
   if (settings.semModifiers)
      innercode += // Semantics additional checkboxes
         '<div class="col-sm-4">'+
           '<input type="checkbox" id="' + get_id(block, "sem-mod") + id + '" name="sem-mod' + id + '" value="sem" checked>' + language.sem + '&nbsp;' +
           '<input type="checkbox" id="' + get_id(block, "sem-mod") + id + '" name="sem-mod' + id + '" value="sem2" checked>' + language.sem2 + '&nbsp;' +
           '<input type="checkbox" id="' + get_id(block, "sem-mod") + id + '" name="sem-mod' + id + '" value="semf">' + language.semf + '&nbsp;' +
           '<input type="checkbox" id="' + get_id(block, "sem-mod") + id + '" name="sem-mod' + id + '" value="semf2">' + language.semf2 + '&nbsp;' +
           ' <a href="' + settings.semHelpAdditional + '" onClick="return showhelp(\'' + settings.semHelpAdditional + '\',0.8)">' + settings.helpImage + '</a>'+
         '</div>';
   else innercode += '<td />';
   innercode += '</div>';
  
  } else {

//  murco
      innercode +=
        '<div class="row">'+
          '<td class="wordreqtext">'+
            language.additionalFeatures + ' ' +
            ' <a href="' + settings.flagsHelp + '" onClick="return showhelp(\'' + settings.flagsHelp + '\',0.8)">' + settings.helpImage + '</a>'+
            ' <a href="javascript:getFlags(' + id + ')">' + language.select + '</a>'+
          '</td>';
      innercode +=
          '<td class="wordreqtext">'+
            language.orphoMarkup + ' ' +
            ' <a href="' + settings.orphoHelp + '" onClick="return showhelp(\'' + settings.orphoHelp + '\',0.8)">' + settings.helpImage + '</a>'+
            ' <a href="javascript:getOrpho(' + id + ')">' + language.select + '</a>'+
          '</td>';
      innercode +=
          '<td class="wordreqtext">'+
            language.accentMarkup + ' ' +
            ' <a href="' + settings.accentHelp + '" onClick="return showhelp(\'' + settings.accentHelp + '\',0.8)">' + settings.helpImage + '</a>'+
            ' <a href="javascript:getAccents(' + id + ')">' + language.select + '</a>'+
          '</td>'+
        '</div>';
      innercode +=
        '<div class="row">'+
          '<td class="wordreqinput">'+
            '<input type="text" id="' + get_id(block, "flags") + id + '" name="flags' + id + '" class="form-control input-sm">'+
          '</td>';
      innercode +=
          '<td class="wordreqinput">'+
            '<input type="text" id="' + get_id(block, "orphoGr") + id + '" name="orphoGr' + id + '" class="form-control input-sm">'+
            '<input type="hidden" id="' + get_id(block, "orpho") + id + '" name="orpho' + id + '"/>'+
          '</td>';
      innercode +=
          '<td class="wordreqinput">'+
            '<input type="text" id="' + get_id(block, "strAccent") + id + '" name="strAccent' + id + '" class="form-control input-sm">'+
          '</td>'+
         '</div>';
      innercode += 
          '<input type="hidden" id="' + get_id(block, "accent") + id + '" name="accent' + id + '"/>';
      innercode += 
          '<input type="hidden" id="' + get_id(block, "before") + id + '" name="before' + id + '"/>';
      innercode += 
          '<input type="hidden" id="' + get_id(block, "after") + id + '" name="after' + id + '"/>';
      innercode += 
          '<input type="hidden" id="' + get_id(block, "number") + id + '" name="number' + id + '"/>';
    }
// End of murco

    innercode += '</div></div>';
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
            '<input type="text" id="' + get_id(block, "attr") + id + '" name="attr' + id + '" class="form-control input-sm">'+
          '</td>'+
          '<td class="wordreqinput">'+
            '<input type="text" id="' + get_id(block, "val") + id + '" name="val' + id + '" class="form-control input-sm">'+
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
    var res = '�' + s + ' | �' + s + ' | �' + s + ' | �' + s + ' | �' + s + ' | �' + s + ' | �' + s + ' | �' + s;
    return res;
  }
  if (s.length == 1 && s != parseInt(s)) {
    var res = '';
    for (var i = 1; i <= 10; i++) {
      if (res != '') res += ' | ';
      res += s + i;
    }
    return res;
  }
  return s;
}

function parseMurcoMarkup(block, id) {
  if (settings.mode == 'murco') {
    var voc_accent = "";
    var voc_before = "";
    var voc_after = "";
    var voc_number = "";

    strAccent = document.getElementById(get_id(block, 'strAccent') + id).value;
    if (strAccent) {
      strAccent = strAccent.replace(/[\+=#]/g,'/');
      var data = strAccent.split('/');
      voc_accent = (data.length >= 1) ? expandAccent(data[0]) : '';
      voc_before = (data.length >= 2) ? expandAccent(data[1]) : '';
      voc_after =  (data.length >= 3) ? expandAccent(data[2]) : '';
      voc_number = (data.length >= 4) ? data[3] : '';
    }

    document.getElementById(get_id(block, 'accent') + id).value = voc_accent;
    document.getElementById(get_id(block, 'before') + id).value = voc_before;
    document.getElementById(get_id(block, 'after') + id).value = voc_after;
    document.getElementById(get_id(block, 'number') + id).value = voc_number;

    var orphoGr = document.getElementById(get_id(block, 'orphoGr') + id);
    var orpho = document.getElementById(get_id(block, 'orpho') + id);
    if (orphoGr && orpho) {
      orpho.value = expandOrphoGroups(orphoGr.value);
    } else {
      orpho.value = "";
    }
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
  var divs = settings.parentBlock[block].getElementsByTagName("DIV");
  var words = [];
  for (var i = 0; i < divs.length; ++i) {
    if (divs[i].hasAttribute("attr") && divs[i].getAttribute("attr") == "suggest") continue;
    words.push(divs[i]);
  }
  var parents = new Array("0");
  var nextword = words[0];
  for (var i = 0; i < words.length; ++i) {
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
    swap_words(block, curid, i+1);
  }
}

function order_indexes () {
  order_indexes_main(0);
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
    if (x.length > 4) {
      document.reqForm.mydocsize.value = x[4];
      document.exactForm.mydocsize.value = x[4];
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
    document.reqForm.mydocsize.value = "";
    document.exactForm.mydocsize.value = "";
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

  add_sibling (0, 0);

  if (!settings.disableTree) {
    add_child (0, 1);
  }
  if (!settings.disableFirstLevel) {
    add_sibling (0, 0);
  }

  if (!settings.disableSecondTable) {
    settings.parentBlock[1] = document.getElementById(settings.parentBlock[1]);
    add_sibling (1, 0);
    add_sibling (1, 0);
  }
  set_cookie_params();
}

function clearSubcorpus() {
  document.cookie = settings.mode + "=;domain=ruscorpora.ru;path=/";
  var el = document.getElementById("clearSubcorpusLink");
  el.style.display="none";
  set_cookie_params();
}

function clearSubcorpusLink() {
  if (get_cookie(settings.mode) != "")
    document.write ('<span id="clearSubcorpusLink">&nbsp;&nbsp;&nbsp;<a href="javascript:clearSubcorpus()">�������� ���������</a></span>');
}

