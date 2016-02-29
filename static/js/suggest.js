function Suggest(ctrl, args) {
    args = args || {};
    ctrl.suggestRef = this;
    this.site = args.site || "";
    this.ctrl = ctrl;
    this.elem = args.elem || ctrl.parentNode.getElementsByTagName("DIV")[0];
    this.itemNode = this.elem.getElementsByTagName("DIV")[0];
    this.nextNode = this.itemNode.nextSibling;
    this.box = this.itemNode.parentNode;
    this.box.removeChild(this.itemNode);
    this.items = [];
    this.cache = {};
    this.init();
    this.reset();
    this.blur = args.blur || function(e) {};
}

Suggest.URL = "http://sitesuggest.yandex.ru/suggest.json/get";
Suggest.URL2 = "http://search-beta.ruscorpora.ru/suggest.xml";
//Suggest.URL = "http://achelata.yandex.ru:8009/";
Suggest.KEY_ESC = 27;
Suggest.KEY_UP = 38;
Suggest.KEY_DOWN = 40;
Suggest.DELAY = 300;
Suggest.c = {};

Suggest.close = function(id) {
    document.getElementById(id).suggestRef.close();
    return false;
}

Suggest.send = function(ref, text) {
    var id = ref.ctrl.id;
    this.c[id] || (this.c[id] = function(result) { ref.onResult(result) });
    var script = document.createElement("SCRIPT");
    script.type = "text/javascript";
    script.charset = "utf-8";
    var url = this.URL;
    if (ref.site == "old_rus")
        url = "http://ruscorpora.ru:8009"
    else if (ref.site == "birchbark")
        url = "http://ruscorpora.ru:8008"
    script.src = url + "?q=" + encodeURIComponent(text) + "&site=" + encodeURIComponent(ref.site);
    script.src += "&callback=Suggest.c." + id;
    document.body.appendChild(script);
}

Suggest.prototype.init = function() {
    var ref = this;
    this.ctrl.onblur = function(e) { ref.reset(); ref.blur(ref.ctrl) }
    this.ctrl.onkeydown = function(e) { return ref.onkeydown(e || event) }
    this.ctrl.onkeyup = function(e){ return ref.onkeyup(e || event) }
}

Suggest.prototype.close = function() {
    this.reset();
    this.ctrl.onblur = this.ctrl.onkeydown = this.ctrl.onkeyup = null;
}

Suggest.prototype.strip = function(s) {
    return s.replace(/^\s+/, "").replace(/\s+/g, " ");
}

Suggest.prototype.selectItem = function(index, select) {
    if (index < -1)
        index = this.items.length - 1;
    if (index >= this.items.length)
        index = -1;
    if (index != this.index) {
        if (this.index >= 0)
            this.items[this.index].className = this.itemNode.className;
        if (index >= 0)
            this.items[index].className = this.items[index].className + " selected";
    }
    if (select) {
        var text = (index >= 0 ? this.data[index] : this.value);
        this.ctrl.value = text;
    }
    this.index = index;
}

Suggest.prototype.reset = function() {
    this.show(false);
    this.value = "";
    this.setData(null);
    this.index = -1;
}

Suggest.prototype.update = function() {
    var text = this.strip(this.ctrl.value);
    if (!text) {
        this.reset();
        return;
    }

    if (!this.cache[text]) {
        this.send(text);
        return;
    }

    this.value = this.ctrl.value;
    this.setData(this.cache[text]);
    this.show(this.items.length > 0);
}

Suggest.prototype.send = function(text) {
    if (text) {
        if (this.busy) {
            var ref = this;
            this.queue = text;
            this.timer && clearTimeout(this.timer);
            this.timer = setTimeout(function() { ref.send() }, Suggest.DELAY);
            return;
        }
    }
    else {
        this.busy = false;
        text = this.queue; this.queue = "";
        if (!text)
            return;
        clearTimeout(this.timer); this.timer = 0;
    }
    this.busy = true;
    Suggest.send(this, text);
}

Suggest.prototype.onResult = function(result) {
    this.cache[result.q] = result.data;
    if (result.q == this.strip(this.ctrl.value))
        this.update();
    this.send();
}

Suggest.prototype.setData = function(data) {
    data = data || [];
    if (data == this.data)
        return;

    var ref = this;
    for (var i = 0; i < this.items.length; ++i)
        this.box.removeChild(this.items[i]);
    this.items = [];
    this.data = data;
    for (var i = 0; i < data.length; ++i) {
        var item = this.itemNode.cloneNode(true);
        item.innerHTML = item.innerHTML.replace("$text", Suggest.htmlEncode(data[i]));
        item.i = i;
        item.onmousemove = function() { ref.selectItem(this.i) }
        item.onmousedown = function() { ref.selectItem(this.i, true) }
        this.items.push(item);
        this.box.insertBefore(item, this.nextNode);
    }
}

Suggest.prototype.show = function(visible) {
    this.elem.style.display = visible ? "block" : "none";
}

Suggest.htmlEncode = function(str) {
    return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace (/>/g, "&gt;");
}

Suggest.prototype.onkeydown = function(e) {
    switch (e.keyCode) {
        case Suggest.KEY_ESC:
            this.reset();
            return false;
        case Suggest.KEY_UP:
            this.selectItem(this.index - 1, true);
            return false;
        case Suggest.KEY_DOWN:
            this.selectItem(this.index + 1, true);
            return false;
    }
}

Suggest.prototype.onkeyup = function(e) {
    if (e.keyCode == Suggest.KEY_ESC)
        return false;

    var value = (this.index >= 0 ? this.data[this.index] : this.value);
    if (value != this.ctrl.value)
        this.update();
}
