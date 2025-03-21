# [**高速ご挨拶クイズ**](https://high-speed-greetings-quiz.vercel.app/)
[![Image from Gyazo](https://i.gyazo.com/459e9a399414cd8a4e5fa2f101b6b09f.png)](https://high-speed-greetings-quiz.vercel.app/)
- React（JavaScript）をキャッチアップし始めて３日後、４日間（20時間）で作ったミニアプリです！
- 「**Reactのキャッチアップの為、"書く力"より先に"読み取って修正する力"をつけるため**のミニアプリ」です。    
  なので、このクイズアプリのコードは一部 V0 という AI に書かせました。  
  そこから手動で修正やコンポーネント化を加えたり、基礎的なJavaScriptの書き方を模写して学んでゆきました。
  - **なぜAIに書かせたのか**  
    Github内でReact(JavaScript)のコードを検索して読もうとはしたのですが  
    純粋なReactだけのコードを探し出すのは難しかったので、一旦AIに書かせた次第です。
    
## 当サービス概要
- **とにかく高速でご挨拶をして、好かれてください！！**  
  <img src="https://i.gyazo.com/f93c87e8ebf9e5fdb0110e38394d9aba.gif" alt="Image from Gyazo" height="500"/>
- 遊んでいただいた皆様の感想はこちら → [#高速ご挨拶クイズ](https://x.com/search?q=%23高速ご挨拶クイズ&src=recent_search_click&f=live)  
  <img src="https://gyazo.com/c02a5eabaf5791b331600f1c6ba07635.gif" alt="Image from Gyazo" width="500"/>

|       | 技術スタック                         |
|---------|------------------------------|
| 技術    | React、CSS    |
| デプロイ| Vercel                      |
| 機能    | Xシェア機能、OGP機能      |

## 今回のアプリで、Reactキャッチアップとして学んだ事
- Reactのコンポーネント化の際に渡す`props`の存在と渡し方
- コンポーネントの呼び出し方（エクスポートの仕方）
- コンポーネント化すると、１つのファイルの中でHTML/CSS/JavaScriptの記載がまとまっており、管理しやすいと感じた
  - ボタンのスタイル等もコンポーネント化しておくと、共通化できて便利！
- ライブラリ`react-share`を使うと、X以外にもあらゆる媒体のシェアボタンが実装できる
- OGPの設定は、HTMLに追記することで事足りる
