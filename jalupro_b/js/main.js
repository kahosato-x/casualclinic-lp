/* 予約CTAのクリックを dataLayer へ送る。
   GTM側で event="cta_click" をトリガーにすれば、LPごとの到達→クリックを比較できる。 */
(function () {
  var VARIANT = document.documentElement.getAttribute("data-variant") || "";
  window.dataLayer = window.dataLayer || [];

  document.addEventListener("click", function (e) {
    var a = e.target.closest ? e.target.closest('a[data-cta="reservation"]') : null;
    if (!a) return;
    window.dataLayer.push({
      event: "cta_click",
      lp_variant: VARIANT,
      cta_position: a.getAttribute("data-pos") || "unknown"
    });
  });

  /* スクロール到達も1回ずつ送る（どこまで読まれたかで訴求の強弱を見る） */
  var marks = [25, 50, 75, 100], done = {};
  window.addEventListener("scroll", function () {
    var h = document.documentElement.scrollHeight - window.innerHeight;
    if (h <= 0) return;
    var p = (window.scrollY / h) * 100;
    for (var i = 0; i < marks.length; i++) {
      var m = marks[i];
      if (p >= m && !done[m]) {
        done[m] = true;
        window.dataLayer.push({ event: "scroll_depth", lp_variant: VARIANT, depth: m });
      }
    }
  }, { passive: true });
})();
