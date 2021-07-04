
window.console.debug = function () { };
window.nuru = {},
  window.nuru.onloadEvents = [],
  window.nuru.utility = {},
  window.nuru.startTopAnimation = function () { },
  window.nuru.stopTopAnimation = function () { },
  function () {
    var a = window.nuru.utility,
      b = function () {
        document.removeEventListener("DOMContentLoaded", b, !1), window.removeEventListener("load", b, !1);
        for (var a = window.nuru.onloadEvents, c = 0; c < a.length; c++)a[c]()
      };
    document.addEventListener("DOMContentLoaded", b, !1),
      window.addEventListener("load", b, !1),
      a.hasContain = function (a, b) {
        if (!a || !b) return !1;
        for (var c = 0; c < a.length; c++)if (a[c] === b) return !0; return !1
      },
      a.trim = function (a) {
        if (!a || !a.lastIndexOf || !a.indexOf) return a;
        for (; ;) { if (0 !== a.indexOf(" ")) break; a = a.substring(1, a.length) } for (; ;) { if (a.lastIndexOf(" ") !== a.length - 1) break; a = a.substring(0, a.length - 1) } return a
      },
      a.addClass = function (b, c) {
        var d = b; 
        void 0 === b.length && void 0 === b.item && (d = [b]); 
        for (var e = 0; e < d.length; e++)
          for (var f = d[e], g = f.className.split(" "), h = c.split(" "),i = 0; i < h.length; i++) { 
            var j = h[i]; a.hasContain(g, j) === !1 && (f.className += " " + j) 
          }
      },
       a.removeClass = function (b, c) {
        var d = b;
        void 0 === b.length && void 0 === b.item && (d = [b]);
        for (var e = 0; e < d.length; e++)
          for (var f = d[e], g = c.split(" "), h = 0;h < g.length; h++) { 
            var i = g[h]; f.className = a.trim(f.className.replace(i, "")) 
          }
      };
    var c = document.querySelectorAll(".page");
    a.toPage = function (b) {
      var d = document.getElementById(b);
      console.debug("targetPage: ", b), d && (a.addClass(c, "transparent"), a.removeClass(d, "transparent"),
        "top" === b ? window.nuru.startTopAnimation() : window.nuru.stopTopAnimation())
    }
  }();
!function () {
  var a, b, c, d, e, f = 25, g = .9, h = 0, i = .1, j = "40px Arial", k = "Wataru Nuruki's Portfolio", l = Math.floor, m = !1, n = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame, o = n || window.setTimeout, p = function () {
    m = !1, a = document.getElementById("topCanvas"), b = a.getContext("2d");
    var e = document.documentElement.clientWidth, f = document.documentElement.clientHeight; a.style.width = e + "px", a.style.height = f + "px", c = a.width = e, d = a.height = f, q(k), a.onmousemove = y, a.ontouchstart = A, a.ontouchmove = B, a.ontouchend = C, window.onresize = z, window.onorientationchange = z, r()
  },
  q = function (a) {
    b.font = j, b.textAlign = "center", b.fillText(a, 0, 0);
    var f = b.getImageData(0, 0, c, d), g = f.data; console.debug("data.length: ", g.length);
    for (var h = 0, i = -1, k = 0, m = g.length; m > k; k += 4) {
      var n = (g[k], g[k + 1], g[k + 2], g[k + 3]);
      if (n > 0) {
        var o = l(k / 4 / c); o > i && (i = o, h++)
      }
    }
    console.debug("textHeight: ", h), b.clearRect(0, 0, c, d), b.fillText(a, c / 2, l((d - h) / 2));
    for (var f = b.getImageData(0, 0, c, d), g = f.data, p = [], k = 0, m = g.length; m > k; k += 4) {
      var n = (g[k], g[k + 1], g[k + 2], g[k + 3]);
      if (n > 0) {
        var q = l(k / 4 % c), o = l(k / 4 / c);
        p.push(new x(q, o, 1, 1, n / 255))
      }
    }
    console.debug("points.length: ", p.length), e = new w(p), b.clearRect(0, 0, c, d), e.draw()
  }, r = function () { m || (t(), u(), o(r, 1e3 / f)) }, s = function () { m = !0 }, t = function () { b.clearRect(0, 0, c, d), e && e.draw() }, u = function () { e && e.update() }, v = function (a, b, c) { this.x = a, this.y = b, this.z = c || 1 }, w = function (a) {
    this.points = a, this.mousePos = void 0, this.update = function () {
      if (void 0 !== this.mousePos) for (var b = 0, c = this.points.length; c > b; b++) {
        var d = a[b], e = this.mousePos.x - d.curPos.x, f = this.mousePos.y - d.curPos.y, g = e * e + f * f, h = Math.sqrt(g);
        100 > h ? (d.targetPos.x = d.curPos.x - e, d.targetPos.y = d.curPos.y - f) : (d.targetPos.x = d.orgnPos.x, d.targetPos.y = d.orgnPos.y), d.update()
      }
    }, this.draw = function () { for (var a = 0, b = this.points.length; b > a; a++)this.points[a].draw() }
  }, x = function (a, c, d, e, f) {
    //色指定できる
    this.orgnPos = new v(a, c, d), this.curPos = new v(a, c, d), this.targetPos = new v(a, c, d), this.radius = e/3, this.size = e/3, this.friction = g, this.rotationForce = h, this.springStrength = i, this.velocity = new v(0, 0, 0), f = void 0 === f ? 1 : f, this.color = "rgba(10,0,23," + f + ")", this.update = function () {
      var a = this.targetPos.x - this.curPos.x, b = this.targetPos.y - this.curPos.y, c = a * this.springStrength - this.rotationForce * b, d = b * this.springStrength - this.rotationForce * a; this.velocity.x += c, this.velocity.x *= this.friction, this.curPos.x += this.velocity.x, this.velocity.y += d, this.velocity.y *= this.friction, this.curPos.y += this.velocity.y;
      var e = this.orgnPos.x - this.curPos.x, f = this.orgnPos.y - this.curPos.y, g = e * e + f * f, h = Math.sqrt(g); this.targetPos.z = h / 30 + 1;
      var i = this.targetPos.z - this.curPos.z, j = i * this.springStrength; this.velocity.z += j, this.velocity.z *= this.friction, this.curPos.z = this.velocity.z, this.radius = this.size * this.curPos.z, this.radius < 1 && (this.radius = 1)
    }, 
    //ここで描画しているっぽい！！
    this.draw = function () { b.fillStyle = this.color, b.beginPath(), b.arc(this.curPos.x, this.curPos.y, this.radius, 0, 2 * Math.PI), b.fill() }
  }, y = function (a) { e.mousePos = new v(a.offsetX, a.offsetY) }, z = function () { e = null, p() }, A = function (a) { a.preventDefault() }, B = function (a) { a.preventDefault(), e.mousePos = new v(a.targetTouches[0].pageX, a.targetTouches[0].pageY) }, C = function (a) { a.preventDefault(), e.mousePos = new v(0, 0) }; p(), window.nuru.onloadEvents.push(p), window.nuru.startTopAnimation = p, window.nuru.stopTopAnimation = s
}();
!function () {
  var a = window.nuru.utility, b = function () {
    for (var b = document.querySelectorAll('[data-event="togglePage"]'), c = 0; c < b.length; c++)b[c].addEventListener("click", function () { var b = this.getAttribute("href").replace("#", ""); a.toPage(b) });
    var d = window.location.hash.replace("#", ""); a.toPage(d);
    for (var e = document.querySelectorAll("img[data-src]"), c = 0; c < e.length; c++) {
      var f = e[c], g = f.getAttribute("data-src");
      f.setAttribute("src", g), console.debug("image lazy load: ", g)
    }
  };
  window.nuru.onloadEvents.push(b)
}();




var tabs = document.getElementById('tabcontrol').getElementsByTagName('a');
var pages = document.getElementById('tabbody').getElementsByTagName('div');

// ---------------------------
// ▼B：タブの切り替え処理
// ---------------------------
function changeTab() {
   // ▼B-1. href属性値から対象のid名を抜き出す
   var targetid = this.href.substring(this.href.indexOf('#')+1,this.href.length);

   // ▼B-2. 指定のタブページだけを表示する
   for(var i=0; i<pages.length; i++) {
      if( pages[i].id != targetid ) {
         pages[i].style.display = "none";
      }
      else {
         pages[i].style.display = "block";
      }
   }

   // ▼B-3. クリックされたタブを前面に表示する
   for(var i=0; i<tabs.length; i++) {
      tabs[i].style.zIndex = "0";
   }
   this.style.zIndex = "10";

   // ▼B-4. ページ遷移しないようにfalseを返す
   return false;
}

// ---------------------------
// ▼C：すべてのタブに対して、クリック時にchangeTab関数が実行されるよう指定する
// ---------------------------
for(var i=0; i<tabs.length; i++) {
   tabs[i].onclick = changeTab;
}

// ---------------------------
// ▼D：最初は先頭のタブを選択しておく
// ---------------------------
tabs[0].onclick();