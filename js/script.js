// 追尾CTA
// ページがスクロールされたときに実行する関数を定義
function toggleFixedClass() {
  // 現在のスクロール位置を取得
  const scrollY = window.scrollY || window.pageYOffset;
  // 対象の要素を取得
  const footerCta = document.querySelector('.p-footer-cta');

  if (footerCta) {
    // スクロール位置が200px以上の場合にvisibleクラスを追加
    if (scrollY >= 200) {
      footerCta.classList.add('visible');
    } else {
      // それ以外の場合にはvisibleクラスを削除
      footerCta.classList.remove('visible');
    }
  }
}

// スクロールイベントリスナーを追加
window.addEventListener('scroll', toggleFixedClass);

// 初期状態でチェック
toggleFixedClass();

// 
// メニュー
// 
const header = document.querySelector('.p-header');
const spNav = document.getElementById('js-spNav');

// ヘッダー高さを反映する関数
function updateSpNavTop() {
  const headerHeight = header.offsetHeight;

  // メニューの top をセット
  spNav.style.top = `${headerHeight}px`;

  // メニューの高さ計算に使う CSS 変数もセット
  document.documentElement.style.setProperty('--header-height', `${headerHeight}px`);
}


// 初期実行
updateSpNavTop();

// ウィンドウリサイズ時も更新
window.addEventListener('resize', updateSpNavTop);


// ハンバーガー開閉処理
const hamburger = document.getElementById('js-hamburger');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  spNav.classList.toggle('active');

  // 背景スクロール制御
  if (spNav.classList.contains('active')) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }
});
// ★★★ SPメニュー内リンククリックで閉じてスクロール補正 ★★★
const spNavLinks = spNav.querySelectorAll('a');

spNavLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    const targetId = link.getAttribute('href');
   
    if (targetId.startsWith('#') && targetId.length > 1) {
      e.preventDefault();
    }

    // まずはメニューを閉じる
    spNav.classList.remove('active');
    hamburger.classList.remove('active');
    document.body.style.overflow = '';

    // 50ms 待ってからヘッダー高さを取得
    setTimeout(() => {
      if (targetId.startsWith('#') && targetId.length > 1) {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          const headerHeight = header.offsetHeight; 
          const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY;

          window.scrollTo({
            top: targetPosition - headerHeight,
            behavior: 'smooth'
          });
        }
      }
    }, 50);
  });
});


// tab
document.addEventListener('DOMContentLoaded', function () {
  const tabItems = document.querySelectorAll('.p-tab__item');
  const tabContents = document.querySelectorAll('.p-tab__contents');

  tabItems.forEach((item, index) => {
    item.addEventListener('click', () => {
      // すべての is-active を外す
      tabItems.forEach(i => i.classList.remove('is-active'));
      tabContents.forEach(c => c.classList.remove('is-active'));

      // クリックしたタブに is-active を付与
      item.classList.add('is-active');
      tabContents[index].classList.add('is-active');
    });
  });
});

// スムーススクロール
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const id = this.getAttribute('href');
    const target = document.querySelector(id);

    if (target) {
      e.preventDefault();

      // スムーススクロール
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });

      // スクロール後にURLを書き換える
      history.pushState(null, null, id);
    }
  });
});