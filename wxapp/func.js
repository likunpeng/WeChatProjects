var func = {
    decodeScene: function(e) {
        if (e.scene) for (var n = e, c = decodeURIComponent(e.scene).split("&"), t = 0; t < c.length; t++) {
            var o = c[t].split("=");
            n[o[0]] = o[1];
        } else n = e;
        return n;
    }
};

module.exports = func;