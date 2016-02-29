var get = new Array();

function parseGET() {
  var tmp = new Array();
  var tmp2 = new Array();
  var url = location.search;
  if(url != '') {
    tmp = (url.substr(1)).split('&');
    for(var i=0; i < tmp.length; i++) {
      tmp2 = tmp[i].split('=');
      get[tmp2[0]] = tmp2[1];
    }
  }
}


function fillParams() {
  parseGET();
  for (var name in get) {
    document.getElementById("0_lex1").value = get[name];
  }
}
