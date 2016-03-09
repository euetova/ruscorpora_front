function getParam(name) {
    lexDialog = window.open("reqparam.html","param" +name,"width=330,height=270,resizable=no");
    return void(0);
}

function getAttr(attr) {
    path = "reqattr-school.html";

    var w, h;
    switch (attr)
    {
        case 'genre_fi':    { w = 255; h = 250; break;  }
        case 'typeF':   { w = 255; h = 385; break;  }
        case 'typeNF':  { w = 900; h = 800; break;  }
        case 'typeSN':  { w = 400; h = 500; break;  }
        case 'sphere':  { w = 300; h = 300; break;  }
        case 'topic':   { w = 700; h = 700; break;  }
        case 'topic_spoken':   { w = 700; h = 700; break;  }
        case 'chronotop':   { w = 700; h = 450; break; }
        case 'chronotop_spoken':   { w = 700; h = 450; break; }
        case 'rime':    { w = 500; h = 450; break; }
        case 'extra':   { w = 500; h = 450; break; }
        default:    { w = 500; h = 450; }
    }
    dialog = window.open(path, attr, "width=" + w + ", height=" + h + ", resizable=yes, scrolling=auto");
    return void(0);
}
