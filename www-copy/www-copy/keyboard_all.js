var shift=0;
var caps=0;
var uml = 0;
var circ = 0;
var grave = 0;
var acute = 0;

function ping(capa){
element=eval('this.'+form_name);
var text_ch ="";

switch (capa){
	case "UML" : {uml = (uml==1) ? 0 : 1; return;};
	case "CIRC" : {circ = (circ==1) ? 0 : 1; return;};
	case "GRAVE" : {grave = (grave==1) ? 0 : 1; return;};
	case "ACUTE" : {acute = (acute==1) ? 0 : 1; return;};
	case "CLEAR_ALL" : {element.value="";return;};
	case "BACK" : {var text_ch=element.value; element.value = text_ch.substr(0, (text_ch.length-1)); return;};
	case "ENTER" : {collect();return;};
	case "CAPS" : caps= (caps==0) ? 1 : 0;
	case "SHIFT" : {shift= (shift==1) ? 0 : 1; return;};
	default : {
		if (uml == 1) {
			if(shift == 0) {
				switch (capa) {
					case "a" : element.value += String.fromCharCode(228); break;
					case "e" : element.value += String.fromCharCode(235); break;
					case "i" : element.value += String.fromCharCode(239); break;
					case "o" : element.value += String.fromCharCode(246); break;
					case "u" : element.value += String.fromCharCode(252); break;
					case "y" : element.value += String.fromCharCode(255); break;
					default: element.value += capa;
				}	
			} 
			else {
				switch (capa) {
					case "a" : element.value += String.fromCharCode(196); break;
					case "e" : element.value += String.fromCharCode(203); break;
					case "i" : element.value += String.fromCharCode(207); break;
					case "o" : element.value += String.fromCharCode(214); break;
					case "u" : element.value += String.fromCharCode(220); break;
					default: element.value += capa;
				}	
			}	
			uml = 0;
		}
		else if (circ == 1) {
			if(shift == 0) {
				switch (capa) {
					case "a" : element.value += String.fromCharCode(226); break;
					case "e" : element.value += String.fromCharCode(234); break;
					case "i" : element.value += String.fromCharCode(238); break;
					case "o" : element.value += String.fromCharCode(244); break;
					case "u" : element.value += String.fromCharCode(251); break;
					default: element.value += capa;
				}	
			} 
			else {
				switch (capa) {
					case "a" : element.value += String.fromCharCode(194); break;
					case "e" : element.value += String.fromCharCode(202); break;
					case "i" : element.value += String.fromCharCode(206); break;
					case "o" : element.value += String.fromCharCode(212); break;
					case "u" : element.value += String.fromCharCode(219); break;
					default: element.value += capa;
				}	
			}	
			circ = 0;
		}
		else if (grave == 1) {
			if(shift == 0) {
				switch (capa) {
					case "a" : element.value += String.fromCharCode(224); break;
					case "e" : element.value += String.fromCharCode(232); break;
					case "i" : element.value += String.fromCharCode(236); break;
					case "o" : element.value += String.fromCharCode(242); break;
					case "u" : element.value += String.fromCharCode(249); break;
					default: element.value += capa;
				}	
			} 
			else {
				switch (capa) {
					case "a" : element.value += String.fromCharCode(192); break;
					case "e" : element.value += String.fromCharCode(200); break;
					case "i" : element.value += String.fromCharCode(204); break;
					case "o" : element.value += String.fromCharCode(210); break;
					case "u" : element.value += String.fromCharCode(217); break;
					default: element.value += capa;
				}	
			}	
			grave = 0;
		}
		else if (acute == 1) {
			if(shift == 0) {
				switch (capa) {
					case "a" : element.value += String.fromCharCode(225); break;
					case "e" : element.value += String.fromCharCode(233); break;
					case "i" : element.value += String.fromCharCode(237); break;
					case "o" : element.value += String.fromCharCode(243); break;
					case "u" : element.value += String.fromCharCode(250); break;
					default: element.value += capa;
				}	
			} 
			else {
				switch (capa) {
					case "a" : element.value += String.fromCharCode(193); break;
					case "e" : element.value += String.fromCharCode(201); break;
					case "i" : element.value += String.fromCharCode(205); break;
					case "o" : element.value += String.fromCharCode(211); break;
					case "u" : element.value += String.fromCharCode(218); break;
					default: element.value += capa;
				}	
			}	
			acute = 0;
		}
		else if (shift == 0) element.value=element.value + capa
		else if (shift == 1) {
			switch (capa) {
				case "`" : text_ch="~"; break;
				case "1" : text_ch="!"; break;
				case "2" : text_ch="@"; break;
				case "3" : text_ch="#"; break;
				case "4" : text_ch="$"; break;
				case "5" : text_ch="%"; break;
				case "6" : text_ch="^"; break;
				case "7" : text_ch="&"; break;
				case "8" : text_ch="*"; break;
				case "9" : text_ch="("; break;
				case "0" : text_ch=")"; break;
				case "-" : text_ch="_"; break;
				case "=" : text_ch="+"; break;
				case ";" : text_ch=":"; break;
				case "é" : text_ch="É"; break;
				case "ö" : text_ch="Ö"; break;
				case "ó" : text_ch="Ó"; break;
				case "ê" : text_ch="Ê"; break;
				case "å" : text_ch="Å"; break;
				case "í" : text_ch="Í"; break;
				case "ã" : text_ch="Ã"; break;
				case "ø" : text_ch="Ø"; break;
				case "ù" : text_ch="Ù"; break;
				case "ç" : text_ch="Ç"; break;
				case "õ" : text_ch="Õ"; break;
				case "ú" : text_ch="Ú"; break;
				case "{" : text_ch="}"; break;
				case "ô" : text_ch="Ô"; break;
				case "û" : text_ch="Û"; break;
				case "â" : text_ch="Â"; break;
				case "à" : text_ch="À"; break;
				case "ï" : text_ch="Ï"; break;
				case "ð" : text_ch="Ð"; break;
				case "î" : text_ch="Î"; break;
				case "ë" : text_ch="Ë"; break;
				case "ä" : text_ch="Ä"; break;
				case "æ" : text_ch="Æ"; break;
				case "ý" : text_ch="Ý"; break;
				case "ÿ" : text_ch="ß"; break;
				case "÷" : text_ch="×"; break;
				case "ñ" : text_ch="Ñ"; break;
				case "ì" : text_ch="Ì"; break;
				case "è" : text_ch="È"; break;
				case "ò" : text_ch="Ò"; break;
				case "ü" : text_ch="Ü"; break;
				case "á" : text_ch="Á"; break;
				case "þ" : text_ch="Þ"; break;
				case "¸" : text_ch="¨"; break;
				case "," : text_ch="."; break;
				case "<" : text_ch=">"; break;
				case "'" : text_ch='"'; break;
				case "]" : text_ch="["; break;
				case "/" : text_ch="?"; break;
				case "\\" : text_ch="|"; break;	
				case "q" : text_ch="Q"; break;	
				case "w" : text_ch="W"; break;
				case "e" : text_ch="E"; break;
				case "r" : text_ch="R"; break;
				case "t" : text_ch="T"; break;
				case "y" : text_ch="Y"; break;
				case "u" : text_ch="U"; break;
				case "i" : text_ch="I"; break;
				case "o" : text_ch="O"; break;
				case "p" : text_ch="P"; break;
				case "a" : text_ch="A"; break;
				case "s" : text_ch="S"; break;
				case "d" : text_ch="D"; break;
				case "f" : text_ch="F"; break;
				case "g" : text_ch="G"; break;
				case "h" : text_ch="H"; break;
				case "j" : text_ch="J"; break;
				case "k" : text_ch="K"; break;
				case "l" : text_ch="L"; break;
				case "z" : text_ch="Z"; break;
				case "x" : text_ch="X"; break;
				case "c" : text_ch="C"; break;
				case "v" : text_ch="V"; break;
				case "b" : text_ch="B"; break;
				case "n" : text_ch="N"; break;
				case "m" : text_ch="M"; break;
				case String.fromCharCode(228): text_ch=String.fromCharCode(196); break;
				case String.fromCharCode(246): text_ch=String.fromCharCode(214); break;
				case String.fromCharCode(252): text_ch=String.fromCharCode(220); break;
				case String.fromCharCode(339): text_ch=String.fromCharCode(338); break;
				case String.fromCharCode(231): text_ch=String.fromCharCode(199); break;
				case String.fromCharCode(241): text_ch=String.fromCharCode(209); break;

				default : text_ch=capa
			}
			element.value=element.value + text_ch
		} 
		shift = (caps==1) ? 1 : 0;
	}
	
};
element.focus();
}

	//case "ENTER" : {element.value=element.value + "\n";return;};
