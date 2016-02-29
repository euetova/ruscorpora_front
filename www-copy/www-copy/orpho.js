var groupsInfo = [
 ["C",   "бвгджзйклмнпрстфхцччшщъь","согласные"],
 ["NVC", "бвгджзй",                 "шумные звонкие согласные"],
 ["NUC", "пфхктшщсцч",              "шумные глухие согласные"],
 ["LC",  "бмпфв",                   "губные согласные"],
 ["RC",  "рлймн",                   "сонорные согласные"],
 ["LLC", "бпм",                     "губно-губные согласные"],
 ["LDC", "вф",                      "губно-зубные согласные"],
 ["VC",  "гкх",                     "задне€зычные согласные"],
 ["PC",  "тдсзцнлчшжр",             "передне€зычные согласные"],
 ["OC",  "бпдтгк",                  "смычные согласные"],
 ["FC",  "вфсзшжхй",                "щелевые согласные"],
 ["A",   "цч",                      "аффрикаты"],
 ["NC",  "мн",                      "носовые согласные"],
 ["HC",  "жшщ",                     "шип€щие согласные"],
 ["V",   "аеЄиоуыэю€",              "гласные"],
 ["CLV", "иыую",                    "гласные верхнего подъема"],
 ["MV",  "еоэЄ",                    "гласные среднего подъема"],
 ["FV",  "иеэ",                     "гласные переднего р€да"],
 ["BV",  "уоюЄ",                    "гласные заднего р€да"],
 ["CV",  "аы€",                     "гласные среднего р€да"],
 ["VS",  "€июЄе",                   "гласные после м€гкого согласного"],
 ["VH",  "аыуоэ",                   "гласные после твердого согласного"],
];

function makeArray(s) {
  var arr = [];
  for (var i = 0; i < s.length; ++i)
    arr.push(s.charAt(i));
  return arr;
}

function getOrphoScheme(s) {
  var scheme = new Array();
  var gStart = 0;
  var inGroup = false;
  for (var i = 0; i < s.length; ++i) {
    var c = s.charAt(i);
    if (c == "[" || c == "(" || c == "{") {
      inGroup = true;
      if (i > gStart) {
        scheme.push([s.substring(gStart, i)]);
        gStart = i;
      }
    } else if (c ==  "]" || c == ")" || c == "}") {
      if (inGroup) {
        inGroup = false;
        gr = s.substring(gStart + 1, i);
        scheme.push(makeArray(gr));
        gStart = i + 1;
      } else
        scheme.push([c]);
    }
  }
  i = s.length;
  if (i > gStart)
    scheme.push([s.substring(gStart, i)]);
  return scheme;
}


function expandOrphoGroups(s) {
  var scheme = getOrphoScheme(s);
  var n = 1;
  for (var i = 0; i < scheme.length; ++i)
    n *= scheme[i].length;

  var terms = [];
  for (var k = 0; k < n; ++k) {
    var term = "";
    var d = k;
    for (var i = 0; i < scheme.length; ++i) {
      var elem = scheme[i];
      if (elem.length <= 1)
        term += elem[0];
      else {
        var ind = d % elem.length;
        term += elem[ind];
        d = (d - ind) / elem.length;
      }
    }
    terms.push(term);
  }
  
  return terms.join(" | "); 
}

function pushGroup(id) {
  var inp = document.getElementById("inp1");
  if (inp.value != '')
    inp = document.getElementById("inp2");
  if (inp.value != '')
    inp = document.getElementById("inp3");
  if (inp.value != '')
    return;
  inp.value = "[" + id + "]";
}

function getHref(group) {
  return '<a href="javascript:pushGroup(\'' + group[1] + '\')">';
}


function makeTable() {
  for (var i = 0; i < groupsInfo.length; ++i) {
    group = groupsInfo[i];
    var elem = document.getElementById(group[0]);
    if (!elem) continue;
    var str = group[2];
    if (str == "гласные" || str == "согласные")
      inner = "<b>" + getHref(group) + str + "</a></b> <span class='orpho'>[" + group[1] + "]</span>";
    else {
      str = str.replace("согласные", "").replace("гласные", "")
      while (str[0] == ' ') str = str.substr(1);
      while (str[str.length-1] == ' ') str = str.substr(0, str.length - 1);
      inner = "&nbsp;&nbsp;&ndash;&nbsp;" + getHref(group) + str + "</a> <span class='orpho'>[" + group[1] + "]</span>";
    }
    elem.innerHTML = inner;
  }
}