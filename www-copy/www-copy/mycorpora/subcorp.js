function init() {
}

function getParam(name) {
    lexDialog = window.open("reqparam.html","param" +name,"width=330,height=270,resizable=no");
    return void(0);
}

function getAttr(attr) {
    path = "reqattr.html";

    var w = 400, h = 800;
    switch (attr)
    {
        case 'genre_fi':{ w = 255; h = 250; break;  }
        case 'typeF':   { w = 255; h = 385; break;  }
        case 'typeNF':  { w = 900; h = 700; break;  }
        case 'typeNFmain':  { w = 900; h = 700; break;  }
        case 'type_regional':  { w = 900; h = 700; break;  }
        case 'typeSN':  { w = 400; h = 500; break;  }
        case 'sphere':  { w = 300; h = 300; break;  }
        case 'topic':   { w = 700; h = 700; break;  }
        case 'topic_spoken':   { w = 700; h = 700; break;  }
        case 'chronotop':   { w = 700; h = 450; break; }
        case 'chronotop_spoken':   { w = 700; h = 450; break; }
        case 'rime':    { w = 500; h = 450; break; }
        case 'extra':   { w = 500; h = 450; break; }
        case 'genre':   { w = 350; h = 250; break; }
        case 'period':   { w = 350; h = 200; break; }
        case 'mid_rus-genre': { w = 800; h = 520; break; }
        case 'mid_rus-language_variety': { w = 300; h = 220; break; }
        case 'authorsRCGT': { w = 280; h = 300; break; }
        case 'translatorsRCGT': { w = 280; h = 300; break; }
        default:    { w = 500; h = 450; }
    }
    dialog = window.open(path, attr, "width=" + w + ", height=" + h + ", resizable=yes, scrollbars=yes");
    return void(0);
}


function normalize_fields() {
  var author = document.getElementById("author");
  var doc_te_author = document.getElementById("doc_te_author");
  doc_te_author.value = author.value.toLowerCase();
}
