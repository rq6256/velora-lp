/* =========================================================
   VELORA LP
   ========================================================= */

/**
 * 予約ページのURL（予約システム / LINE公式アカウントの友だち追加URL など）
 * ここを差し替えるだけで、LP内のすべての予約ボタンのリンク先が変わります。
 * 空のままだとページ最下部の予約セクションへスクロールします。
 */
const RESERVE_URL = '';

/** 予約ボタンを新しいタブで開くか */
const OPEN_IN_NEW_TAB = false;

(() => {
  // ---- 予約ボタンのリンク先を一括設定 ----
  const ctas = document.querySelectorAll('[data-reserve]');
  if (RESERVE_URL) {
    // 広告のUTMパラメータ（utm_source 等）や gclid を予約ページへ引き継ぐ
    const params = new URLSearchParams(location.search);
    const passKeys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'gclid', 'yclid', 'ldtag_cl'];
    let url;
    try {
      url = new URL(RESERVE_URL, location.href);
      passKeys.forEach((k) => {
        if (params.has(k) && !url.searchParams.has(k)) url.searchParams.set(k, params.get(k));
      });
    } catch (e) {
      url = null;
    }
    ctas.forEach((a) => {
      a.href = url ? url.toString() : RESERVE_URL;
      if (OPEN_IN_NEW_TAB) {
        a.target = '_blank';
        a.rel = 'noopener';
      }
    });
  }

  // ---- クリック計測（Googleタグマネージャー用 dataLayer） ----
  window.dataLayer = window.dataLayer || [];
  ctas.forEach((a) => {
    a.addEventListener('click', () => {
      window.dataLayer.push({
        event: 'cta_click',
        cta_position: a.dataset.cta || 'unknown',
      });
    });
  });

  // ---- ふわっと表示 ----
  const targets = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('is-in');
          io.unobserve(e.target);
        }
      });
    }, { rootMargin: '0px 0px -10% 0px' });
    targets.forEach((el) => io.observe(el));
  } else {
    targets.forEach((el) => el.classList.add('is-in'));
  }
})();
