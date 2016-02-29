function draw_distance(block, id) {
  code =
    '<table class="distreq" cellpadding="5"><tr><td>' + language.distance +  (settings.disableTree?'':language.fromParent) + ':'+
      ' ' + language.from + ' <input type="text" id="' + get_id(block, "min") + id + '" name="min' + id + '" size="4" value="' + settings.defaultMin + '" class="text" />'+
      ' ' + language.to + ' <input type="text" id="' + get_id(block, "max") + id + '" name="max' + id + '" size="4" value="' + settings.defaultMax + '" class="text" />'+
      ' <a href="help-lexic-order.html" onClick="return showhelp(\'help-lexic-order.html\',0.7)">' + settings.helpImage + '</a>'+
      '</td></tr>';
  return code;
}

function ff(elem) {
  alert(elem.value);
}

function draw_form_field(block, id) {
  var font = (settings.mode == "old_rus" ? "font-family: BukyVede" : "");
  var zind = (100-id).toString();
  code =
    '<table width="100%">' +
     '<tr><td class="wordreqtext">' +
      language.word + ' ' +
      ' <a href="help-lexic-word.html" onClick="return showhelp(\'help-lexic-word.html\',516)">' + settings.helpImage + '</a>' +
      ' <a href="#" onClick="return getVkb(\'lex' + id + '\' )"><img style="vertical-align:bottom;" src="i/keyboard.gif" alt="Virtual keyboard" title="Virtual keyboard" width="42" height="21" border="0"></a>' +
     '</td></tr>' +
     '<tr><td class="wordreqinput" style="z-index:' + zind + '">' +
      '<div attr="suggest" style="position:relative; style="z-index:' + zind + '">' +
       '<input type="text" autocomplete="off" id="' + get_id(block, "lex") + id + '" name="lex' + id + '" class="text100" style="z-index:' + zind + ';' + font + '">' +
       '<div attr="suggest" class="results" style="background-color:window;z-index:5000;display:none;position:absolute;top:24px;left:0px;min-width:300px;' + font + '">' +
        '<div attr="suggest">$text</div>' +
       '</div>' +
      '</div>' +
     '</td></tr>' +
   '</table>';

  return code;
}


function draw_generic_field(block, id, name, selector) {
  field = settings[name];
  var code =
    '<table width="100%">' +
     '<tr><td class="wordreqtext">' + field.caption + ' ' +
      (field.nohelp ? '' : (' <a href="' + field.help + '" onClick="return showhelp(\'' + field.help + '\',0.8)">' + settings.helpImage + '</a>')) +
      (field.noselect ? '' : (' <a href="javascript:' + selector + '(' + id + ')">' + language.select + '</a>')) +
     '</td></tr>' +
     '<tr><td class="wordreqinput">' +
      '<input type="text" id="' + get_id(block, name) + id + '" name="' + name + id + '" class="text100">'+
     '</td></tr>' +
    '</table>';
  return code;
}


function draw_gramm_field(block, id) {
  return draw_generic_field(block, id, "gramm", "getGramm");
}


function draw_flags_field(block, id) {
  return draw_generic_field(block, id, "flags", "getFlags");
}


function draw_sem_field(block, id) {
  return draw_generic_field(block, id, "sem", "getSem");
}



function custom_draw_word ( block, id, parentid, level ) {
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
  var addlinks = '<td width="32" rowspan="2" valign="center"><nobr>' + addbrth_link + addson_link + kill_link + '</nobr></td>';

  var innercode = '';
  innercode += '<input type="hidden" id="' + get_id(block, "parent") + '' + id + '" name="parent" value="' + parentid + '"/>';
  innercode += '<input type="hidden" id="' + get_id(block, "level") + '' + id + '" name="level" value="' + level + '"/>';

  if (block == 0) {
    if (no_words == 0) {
      innercode += draw_distance(block, id);
    }

    if (settings.oneLine) {
      innercode += '<table class="wordreq" width="100%" border="1">'
      innercode += '<tr><td>'
      innercode += draw_form_field(block, id);
      innercode += '</td>';
      if (settings.grammName) {
        innercode += '<td>';
        innercode += draw_gramm_field(block, id);
        innercode += '</td>';
      }
      if (settings.flagsName) {
        innercode += '<td>';
        innercode += draw_flags_field(block, id);
        innercode += '</td>';
      }
      if (settings.semName) {
        innercode += '<td>';
        innercode += draw_sem_field(block, id);
        innercode += '</td>';
      }
      innercode += '<td width="32" valign="center"><nobr>' + addbrth_link + addson_link + kill_link + '</nobr></td>';
      innercode += '</tr>';
      innercode += '</table>';
     } else {
      innercode += '<table class="wordreq" width="100%" border="1">'
      innercode += '<tr><td width="50%">'
      innercode += draw_form_field(block, id);
      innercode += '</td><td width="50%">';
      innercode += draw_gramm_field(block, id);
      innercode += '</td>';
      innercode += addlinks;
      innercode += '</tr>';
      innercode += '<tr><td width="50%">';
      innercode += draw_flags_field(block, id);
      innercode += '</td><td width="50%">';
      innercode += draw_sem_field(block, id);
      innercode += '</td></tr>';
      innercode += '</table>';
    }
  }

  return innercode;
}

