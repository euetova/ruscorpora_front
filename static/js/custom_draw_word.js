function draw_distance(block, id) {
  code =
    '<div class="row"><div class="col-xs-3"><div class="form-group distreq">' +
                    '<div class="input-group input-group-sm">'+
                      '<div class="input-group-addon">' + language.distance +  (settings.disableTree?'':language.fromParent) + ': '+ language.from + '</div>'+
                      '<input type="text" class="form-control" id="' + get_id(block, "min") + id + '" placeholder="1" name="min' + id + '" value="' + settings.defaultMin + '" />'+
                      '<div class="input-group-addon">' + language.to + '</div>' +
                        '<input type="text" class="form-control" id="' + get_id(block, "max") + id + '" placeholder="1" name="max' + id + '" value="' + settings.defaultMax + '" />' +
          '</div></div></div>' +
          '<div class="col-xs-1"><a href="../../help/help-lexic-order.html" onClick="return showhelp(\'../../help/help-lexic-order.html\',0.7)">' + settings.helpImage + '</a></div></div>';
  return code;
}

function ff(elem) {
  alert(elem.value);
}

function draw_form_field(block, id) {
  var font = (settings.mode == "old_rus" ? "font-family: BukyVede" : "");
  var zind = (100-id).toString();
  code =
    '<div class="row wordreq">' +
          '<div class="col-sm-3" style="z-index:' + zind + '"><label>' + language.word + ' ' +
            ' <a href="../help/help-lexic-word.html" onClick="return showhelp(\'help-lexic-word.html\',516)">' + settings.helpImage + '</a>'+ ' <a href="#" onClick="return getVkb(\'lex' + id + '\' )"><img style="vertical-align:bottom;" src="../static/img/keyboard.gif" alt="Virtual keyboard" title="Virtual keyboard" width="42" height="21" border="0"></a>' + '<div class="wordreqinput" attr="suggest" style="position:relative"i style="z-index:' + zind + '">' +
            '<input type="text" autocomplete="off" id="' + get_id(block, "lex") + id + '" name="lex' + id + '" class="form-control input-sm" style="z-index:' + zind + '">' +
            '<div attr="suggest" class="results" style="background-color:window;z-index:5000;display:none;position:absolute;top:24px;left:0px;min-width:300px">' +
             '<div attr="suggest">$text</div>' +
            '</div>' +
           '</div>' + '</label></div>';
  return code;
}


function draw_generic_field(block, id, name, selector) {
  field = settings[name];
  var code = '<div class="col-sm-3 wordreqinput"><label>' + field.caption + ' ' +
            (field.nohelp ? '' : (' <a href="' + field.help + '" onClick="return showhelp(\'' + field.help + '\',0.8)">' + settings.helpImage + '</a>')) +
            (field.noselect ? '' : (' <a href="javascript:' + selector + '(' + id + ')">' + language.select + '</a>')) +
          '<input type="text" id="' + get_id(block, name) + id + '" name="' + name + id + '" class="form-control input-sm">'+
            '</label></div>';
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
    '<img src="../img/dot.gif" width="16" height="16" alt="" />' :
    '<a id="' + get_id(block, "linkkill") + id + '" href="javascript:kill(' + block + ', \'' + id + '\')">' + settings.killImage + '</a>';
  var addbrth_link = (level == 0 && settings.disableFirstLevel) ?
    '<img src="../img/dot.gif" width="16" height="16" alt="" />' :
    '<a id="' + get_id(block, "linkaddbroth") + id + '" href="javascript:add_sibling(' + block + ', \'' + id + '\')">' + settings.addBrotherImage + '</a>';
  var addson_link = (!settings.disableTree) ?
    '<a id="' + get_id(block, "linkaddson") + id + '" href="javascript:add_child(' + block + ', \'' + id + '\')">' + settings.addSonImage + '</a>' :
    '';
  var addlinks = '<div class="col-sm-2"><nobr>' + addbrth_link + addson_link + kill_link + '</nobr></div>';

  var innercode = '';
  innercode += '<input type="hidden" id="' + get_id(block, "parent") + '' + id + '" name="parent" value="' + parentid + '"/>';
  innercode += '<input type="hidden" id="' + get_id(block, "level") + '' + id + '" name="level" value="' + level + '"/>';

  if (block == 0) {
    if (no_words == 0) {
      innercode += draw_distance(block, id);
    }

    if (settings.oneLine) {
      innercode += '<div class="well"><div class="row">';
      //innercode += '<tr><td>'
      innercode += draw_form_field(block, id);
      //innercode += '</td>';
      if (settings.grammName) {
        //innercode += '<td>';
        innercode += draw_gramm_field(block, id);
        //innercode += '</td>';
      }
      if (settings.flagsName) {
        //innercode += '<td>';
        innercode += draw_flags_field(block, id);
        //innercode += '</td>';
      }
      if (settings.semName) {
        //innercode += '<td>';
        innercode += draw_sem_field(block, id);
        //innercode += '</td>';
      }
      innercode += '<div class="col-xs-2"><nobr>' + addbrth_link + addson_link + kill_link + '</nobr></div>';
      //innercode += '</tr>';
      innercode += '</div></div>';
     } else {
      innercode += '<div class="well"><div class="row">';
      //innercode += '<tr><td width="50%">'
      innercode += draw_form_field(block, id);
      //innercode += '</td><td width="50%">';
      innercode += draw_gramm_field(block, id);
      //innercode += '</td>';
      innercode += addlinks;
      //innercode += '</tr>';
      //innercode += '<tr><td width="50%">';
      innercode += draw_flags_field(block, id);
      //innercode += '</td><td width="50%">';
      innercode += draw_sem_field(block, id);
      //innercode += '</td></tr>';
      innercode += '</div></div>';
    }
  }

  return innercode;
}

