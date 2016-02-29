var data = [];
var searchPrefix = "http://search.ruscorpora.ru/search.xml?env=<!--#echo var='ENV'-->&text=meta&mode=poetic";

var sortField = "surname";
var sortAscending = 1;

function init() {
 elem = document.getElementById("table");
 //elem.innerHTML = "Пожалуйста, подождите, пока загружаются данные...";
 setData(data);
}


function trim(str) {
  return str.replace(/^[\s(]+|[\s)]+$/g, '');
}


function encodeWindows1251(str) {
  var res = "";
  for (var i = 0; i < str.length; ++i) {
    var c = str.charCodeAt(i);
    if (0x410 <= c && c <= 0x44F) 
      res += "%" + Number(c - 0x410 + 0xC0).toString(16);
    else
      res += str.charAt(i);
  }
  return res;
}

function setData(res) {
  data = res;
  for (var id in data) {
    var dotPos = data[id].name.lastIndexOf(".") + 1;
    if (dotPos >= data[id].name.length) dotPos = 0;
    data[id].surname = trim(data[id].name.substr(dotPos) + " " + data[id].name.substr(0, dotPos));
    data[id].birthSort = data[id].birth.length > 4 ? data[id].birth.substr(data[id].birth.length - 4) : data[id].birth;
    data[id].deathSort = data[id].death.length > 4 ? data[id].death.substr(data[id].death.length - 4) : data[id].death;
    if (data[id].birth.length > 4) {
      if (/конец XX/.test(data[id].birth)) 
        data[id].birthSort = "2000";
      else if (/конец XIX/.test(data[id].birth))
        data[id].birshSort = "1900";
      else if (/конец XVIII/.test(data[id].birth))
        data[id].birthSort = "1800";
      else if (/начало XX/.test(data[id].birth))
        data[id].birthSort = "1901";
      else if (/начало XIX/.test(data[id].birth))
        data[id].birthSort = "1801";
      else if (/начало XVIII/.test(data[id].birth))
        data[id].birthSort = "1701";
    }
    if (data[id].death.length > 4) {
      if (/конец XX/.test(data[id].death))
        data[id].deathSort = "2000";
      else if (/конец XIX/.test(data[id].death))
        data[id].deashSort = "1900";
      else if (/конец XVIII/.test(data[id].death))
        data[id].deathSort = "1800";
      else if (/начало XX/.test(data[id].death))
        data[id].deathSort = "1901";
      else if (/начало XIX/.test(data[id].death))
        data[id].deathSort = "1801";
      else if (/начало XVIII/.test(data[id].death))
        data[id].deathSort = "1701";
    }
  }
  writeTable();
}


function getSortHref(field, title) {
  var newSortAscending = (sortField == field ? -sortAscending : 1);
  var s = "<a href=\"javascript:writeTable('" + field + "', " + newSortAscending + ");\">" + title + "</a>";
  if (sortField == field) {
    if (sortAscending == 1) {
      s += "&nbsp;&#9650;";
    } else {
      s += "&nbsp;&#9660;";
    }
  } else
    s += "&nbsp;&nbsp;";
  s += "</a>";
  return s;
}


function makeURL(name) {
  return searchPrefix + "&doc_author=" + encodeWindows1251(name);
}


function writeTable(field, asc) {
  var sb = new StringBuilder();
  if (field) sortField = field;
  if (asc) sortAscending = asc;
  data.sort(function(a,b) { return (a[sortField] < b[sortField]) ? -sortAscending : ((a[sortField] > b[sortField]) ? sortAscending : 0); } );
  sb.append('<table class="authorsTable"><tr>');
  sb.append("<td><b>" + getSortHref("surname", "Автор") + "</b></td>");
  sb.append("<td><b>" + getSortHref("birthSort", "Год рождения") + "</b></td>");
  sb.append("<td><b>" + getSortHref("deathSort", "Год смерти") + "</b></td>");
  sb.append("</tr>");
  for (var id in data) {
    sb.append("<tr>");
    sb.append('<td><a href="' + makeURL(data[id].name) + '" alt="hello"><nobr>' + data[id].name + "</nobr></a></td>");
    sb.append("<td>" + data[id].birth + "</td>");
    sb.append("<td>" + data[id].death + "</td>");
    sb.append("</tr>");
  }
  sb.append("</table>");
  var elem = document.getElementById("table");
  elem.innerHTML = sb.toString();
}
