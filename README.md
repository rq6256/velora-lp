# VELORA LP

Figma「VELORA LP（コピー）/ Frame 1」（幅390px・スマホ用）をコーディングしたものです。

## ファイル構成

```
index.html            … LP本体
assets/css/style.css  … スタイル
assets/js/main.js     … 予約ボタンのリンク先設定・クリック計測・表示アニメーション
assets/img/           … 画像（Figmaから書き出し → WebPに圧縮。合計約2MB）
```

ビルド不要です。フォルダごとサーバーにアップロードすれば動きます。
ローカルで見るときは `index.html` をブラウザで開いてください。

## 公開前にやること

1. **予約ボタンのリンク先を設定**
   `assets/js/main.js` 冒頭の `RESERVE_URL` に予約ページ（予約システムやLINE公式アカウントのURL）を入れてください。
   LP内の4つの予約ボタン（FVバナー／中盤ボタン／体験CTAボタン／最下部ボタン）がすべてそのURLに変わります。
   広告から来たときのパラメータ（utm_*／gclid／yclid／ldtag_cl）は自動で予約ページへ引き継がれます。
2. **計測タグ**
   `index.html` の `<head>` 内「計測タグはここに入れる」の位置に GTM・LINE Tag などを貼ってください。
   予約ボタンをクリックすると `dataLayer` に `event: 'cta_click'`（`cta_position` 付き）が送られるので、
   GTMでコンバージョン（または中間CV）として設定できます。
3. **OGP**：公開URLが決まったら `og:image` を絶対URLに差し替えてください。

## 作りについて

- 画面幅に合わせて全体を等倍スケール（スマホ幅いっぱい、PCでは幅430pxの縦長カラムを中央表示）。
- 見出し・本文などFigma上でテキストだった部分はHTMLテキスト（フォント：Shippori Mincho / Google Fonts）。
  Figma上で画像になっている部分は画像のまま使い、内容は `alt` に入れています（SEO・読み上げ用）。
- 要素の位置は `style="--x:..;--y:..;--w:..;--h:.."` にFigmaの数値（セクション内の座標）をそのまま書いています。
  微調整はこの数値を変えるだけでOKです。
