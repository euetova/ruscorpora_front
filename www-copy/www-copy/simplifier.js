function replace_exact(str) {
  var t = "";
  for (var i = 0; i < str.length; i++) {
    var c = str.charCodeAt(i);
    if (c == 0x300 || c == 0x301)
      t += "";
    else
      t += str.charAt(i);
  }
  return t;
}

function replace_inner(str) {
  var t = "";
  for (var i = 0; i < str.length; i++) {
    var c = str.charCodeAt(i);
    if (c == 0x404) // Ukrainian ie
      t += String.fromCharCode(0x415); //Е;
    else if (c == 0x454)
      t += String.fromCharCode(0x435); //е
    else if (c == 0x47A) // Round omega
      t += String.fromCharCode(0x41E); //О
    else if (c == 0x47B)
      t += String.fromCharCode(0x43E); //о
    else if (c == 0x47C) // Omega with titlo
      t += String.fromCharCode(0x460);
    else if (c == 0x47D)
      t += String.fromCharCode(0x461);
    else if (c == 0x407) // Yi
      t += String.fromCharCode(0x406);
    else if (c == 0x457)
      t += String.fromCharCode(0x456);
    else if (c == 0x476) // Izhitsa with double grave accent
      t += String.fromCharCode(0x474);
    else if (c == 0x477)
      t += String.fromCharCode(0x475);
    else if (c == 0x478 || c == 0xA64A) // Uk
      t += String.fromCharCode(0x423); //У
    else if (c == 0x479 || c == 0xA64B || c == 0xE072)
      t += String.fromCharCode(0x443); //у
    else if (c == 0x466 || c == 0x46A || c == 0xA656 || c == 0xE039) // Little yus
      t += String.fromCharCode(0x42F); // Я
    else if (c == 0x467 || c == 0x46B || c == 0xA657 || c == 0xE089)
      t += String.fromCharCode(0x44F); // я
    else if (c == 0x300 || c == 0x301 || c == 0x302 || c == 0x485 || c == 0x486)
      t += "";
    else if (c == 0x483 || c == 0x484 || c == 0x487) // Titlo
      t += "";
    else if (!(c>0 && c < 0x4FF)) {
      //alert(c);
      //alert(str.charAt(i));
    } else
      t += str.charAt(i);
  }
  return t;
}

function replace_modern(str) {
  var t = "";
  for (var i = 0; i < str.length; i++) {
    var c = str.charCodeAt(i);
    if (c == 0x404 || c == 0x462)   // Ukrainian ie, Yat
      t += String.fromCharCode(0x415); //Е
    else if (c == 0x454 || c == 0x463)
      t += String.fromCharCode(0x435); //е
    else if (c == 0x47A || c == 0x460 || c == 0x47C) // Round omega, Omega, Omega with titlo
      t += String.fromCharCode(0x41E); //О
    else if (c == 0x47B || c == 0x461 || c == 0x47D)
      t += String.fromCharCode(0x43E); //о
    else if (c == 0x47E) // Ot
      t += String.fromCharCode(0x41E) + String.fromCharCode(0x442); //От
    else if (c == 0x47F)
      t += String.fromCharCode(0x43E) + String.fromCharCode(0x442); //от
    else if (c == 0x406 || c == 0x407) // Yi
      t += String.fromCharCode(0x418); //И
    else if (c == 0x456 || c == 0x457)
      t += String.fromCharCode(0x438); //и
    else if (c == 0x474 || c == 0x476) // Izhitsa, Izhitsa with double grave accent
      t += String.fromCharCode(0x418); //И
    else if (c == 0x475 || c == 0x477)
      t += String.fromCharCode(0x438); //и
    else if (c == 0x478 || c == 0xA64A) // Uk
      t += String.fromCharCode(0x423); //У
    else if (c == 0x479 || c == 0xA64B || c == 0xE072)
      t += String.fromCharCode(0x443); //у
    else if (c == 0x466 || c == 0x46A || c == 0xA656 || c == 0xE039) // Little yus
      t += String.fromCharCode(0x42F); //Я
    else if (c == 0x467 || c == 0x46B || c == 0xA657 || c == 0xE089)
      t += String.fromCharCode(0x44F); //я
    else if (c == 0x405) // Dze
      t += String.fromCharCode(0x417); //З
    else if (c == 0x455)
      t += String.fromCharCode(0x437); //з
    else if (c == 0x472) // Fita
      t += String.fromCharCode(0x424); //Ф
    else if (c == 0x473)
      t += String.fromCharCode(0x444); //ф
    else if (c == 0x46E) // Ksi
      t += String.fromCharCode(0x41A) + String.fromCharCode(0x441); //Кс
    else if (c == 0x46F)
      t += String.fromCharCode(0x43A) + String.fromCharCode(0x441); //кс
    else if (c == 0x470) // Psi
      t += String.fromCharCode(0x41F) + String.fromCharCode(0x441); //Пс
    else if (c == 0x471)
      t += String.fromCharCode(0x43F) + String.fromCharCode(0x441); //пс
    else if (c == 0x300 || c == 0x301 || c == 0x302 || c == 0x485 || c == 0x486)
      t += "";
    else if (c == 0x483 || c == 0x484 || c == 0x487) // Titlo
      t += "";
    else if (!(c>0 && c < 1200)) {
      //alert(c);
      //alert(str.charAt(i));
    } else
      t += str.charAt(i);
  }
  if (t.length >= 2 && (t.charCodeAt(t.length - 1) == 0x44A || t.charCodeAt(t.length - 1) == 0x41A))
    t = t.substr(0, t.length - 1);
  t = t.replace(String.fromCharCode(0x44A) + "&", "&");
  t = t.replace(String.fromCharCode(0x41A) + "&", "&");
  return t;
}
