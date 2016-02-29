function printSelector() {
 var S = "";
 S += '<table width="100%" border="1" cellpadding="5" style="border-width:1px"><tr><td><small>Сервер: порт</small></td><td><small>Окружение</small></td><td><small>Выдача</small></td></tr>';
 S += '<tr><td valign="top"><small><input type="radio" name="server" id="balancer"/>балансер: боевой</small><br/>';
 S += '<input type="radio" name="server" id="lingvist"/><small>лингвист: тестовый</small><br/>';
 S += '<input type="radio" name="server" checked="checked" id="langust"/><small>лангуст: тестовый</small><br/></td>';
 //S += '<td valign="top"><input type="radio" name="port" id="main"/><small>боевой</small><br/>';
 //S += '<input type="radio" name="port" checked="checked" id="test"/><small>тестовый</small><br/></td>';
 S += '<td valign="top"><input type="radio" name="environ" id="search"/><small>search.ruscorpora.ru</small><br/>';
 S += '<input type="radio" name="environ" id="search-beta"/><small>search-beta.ruscorpora.ru</small><br/>';
 S += '<input type="radio" name="environ" id="graymantle" checked="checked"/><small>search.ruscorpora.graymantle.yandex.ru</small><br/></td>';
 S += '<td valign="top"><input type="radio" name="xslt" id="xslt" checked="checked"/><small>XSLT</small><br/>';
 S += '<input type="radio" name="xslt" id="xml"/><small>XML</small><br/></td>';
 S += '</tr></table>';
 document.write(S);
}

function getPath() {
 var S = "http://";
 if (document.getElementById("search").checked)
   S += "search.ruscorpora.ru";
 else if (document.getElementById("search-beta").checked)
   S += "search-beta.ruscorpora.ru";
 else if (document.getElementById("graymantle").checked)
   S += "search.ruscorpora.graymantle.yandex.ru";
 if (document.getElementById("xml").checked)
   S += ":8080";
 S += "/search.xml?";
 return S;
}

function getEnv() {
 if (document.getElementById("lingvist").checked)
   return "beta";
 else if (document.getElementById("langust").checked)
   return "test";
 return "";
}


function setPath(obj) {
 obj.action = getPath();
 obj.env.value = getEnv();
}
