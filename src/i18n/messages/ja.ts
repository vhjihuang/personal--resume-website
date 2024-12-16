import type { LocaleMessages } from '../types'

const messages: LocaleMessages = {
  nav: {
    home: 'ホーム',
    about: '私について',
    skills: 'スキル',
    portfolio: '作品',
    contact: '連絡'
  },
  home: {
    title: 'こんにちは、黄です',
    subtitle: 'フルスタック開発者',
    introductionShort: 'ウェブ開発に特化しています',
    contactMe: '連絡する',
    scrollDown: 'スクロールダウン'
  },
  about: {
    title: '私について',
    subtitle: '自己紹介',
    description: 'フルスタック開発者として、最新のウェブ技術に関する豊富な知識と経験を活かし、高品質な開発サービスを提供しています。パフォーマンスとユーザー体験を重視し、高速で使いやすい、ベストプラクティスに基づいたレスポンシブウェブサイトを構築します。私の主な専門分野はフロントエンド開発で、中小規模のWebアプリケーション、コンポーネントライブラリの開発、パフォーマンス最適化、アニメーション、インタラクティブなUIデザインを得意としています。また、バックエンド開発やクラウドサービスの展開においても豊富な経験があります。',
    experience: '経験',
    completed: '完了',
    support: 'サポート',
    years: '年',
    hours: '200+',
    projects: 'プロジェクト',
    online: 'オンライン'
  },
  skills: {
    title: '専門スキル',
    subtitle: '技術レベル',
    years: '年',
    frontend: {
      title: 'フロントエンド開発',
      description: 'Vue.js、Reactなどのフロントエンド技術を使用した最新のウェブアプリケーション開発',
      experience: '{count}',
      years: '年',
      skills: [
        'Vue.js / React',
        'TypeScript / JavaScript',
        'HTML5 / CSS3',
        'レスポンシブデザイン',
        'UI/UX ベストプラクティス'
      ]
    },
    backend: {
      title: 'バックエンド開発',
      description: 'スケーラブルなバックエンドサービスとRESTful APIの構築',
      experience: '{count}',
      years: '年',
      skills: [
        'Node.js / Express',
        'Python / Django',
        'データベース設計',
        'API 開発',
        'クラウドサービス'
      ]
    }
  },
  portfolio: {
    title: 'ポートフォリオ',
    subtitle: '最新の作品',
    demo: 'デモ',
    source: 'ソース',
    technologies: '使用技術'
  },
  contact: {
    title: '連絡先',
    subtitle: 'お問い合わせ',
    call: '電話',
    email: 'メール',
    location: '所在地',
    form: {
      title: 'プロジェクトについて書いてください',
      name: '名前',
      email: 'メール',
      message: 'メッセージ',
      send: '送信',
      success: 'メッセージを送信しました！',
      errors: {
        required: '全ての項目を入力してください',
        invalidEmail: '有効なメールアドレスを入力してください',
        submitError: '送信エラーが発生しました。もう一度お試しください。'
      }
    }
  },
  theme: {
    light: 'ライトモード',
    dark: 'ダークモード'
  },
  accessibility: {
    skipToContent: 'コンテンツへスキップ',
    menuButton: 'メニュー切り替え',
    themeButton: 'テーマ切り替え',
    languageButton: '言語切り替え',
    backToTop: 'トップへ戻る',
    loading: '読み込み中'
  },
  meta: {
    title: '黄 - フルスタック開発者',
    description: '黄の個人ポートフォリオサイト、ウェブ開発に特化しています。',
    keywords: 'ウェブ開発者, フルスタック, ポートフォリオ, vue, react, node.js'
  },
  errors: {
    title: 'エラーが発生しました',
    retry: '再試行',
    unknown: '不明なエラーが発生しました'
  }
}

export default messages 