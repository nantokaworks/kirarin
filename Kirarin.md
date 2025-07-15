# Kirarin 環境独立型ライブラリ化 指示書

## 概要

Kirarinライブラリを、使用する側の環境（Tailwind CSS、Panda CSS、PostCSSなど）に依存しない完全独立型のライブラリに修正する作業指示書です。

## 現状の問題点

1. Panda CSSで生成されたCSSファイルが`@layer`ディレクティブを含んでいる
2. Tailwind CSSを使用しているプロジェクトでインポート時にエラーが発生
3. PostCSSの設定によってはビルドエラーになる

## 目標

- どんな環境でも`import { Kirarin } from 'kirarin'`だけで動作する
- 外部CSSファイルへの依存を排除
- ビルドツールの設定に左右されない

## 実装方針

### 1. CSS-in-JSへの完全移行

現在のPanda CSSベースの実装を、ランタイムCSS-in-JSまたはインラインスタイルに変更します。

### 2. 推奨実装パターン

#### オプション1: スタイル注入方式（推奨）

```typescript
// src/styles/inject.ts
const STYLE_ID = 'kirarin-styles'

export const injectStyles = () => {
  if (typeof document === 'undefined') return
  if (document.getElementById(STYLE_ID)) return
  
  const style = document.createElement('style')
  style.id = STYLE_ID
  style.textContent = getStyles()
  document.head.appendChild(style)
}

const getStyles = () => `
  /* プレフィックス付きのスタイル */
  .krrn-particle {
    position: absolute;
    display: block;
    pointer-events: none;
  }
  
  /* アニメーション定義 */
  @keyframes krrn-comeInOut {
    0% { transform: scale(0); }
    50% { transform: scale(1); }
    100% { transform: scale(0); }
  }
  
  @keyframes krrn-spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(180deg); }
  }
  
  /* 他のアニメーション... */
  
  .krrn-animate-comeInOut {
    animation: krrn-comeInOut 900ms forwards;
  }
  
  .krrn-animate-spin {
    animation: krrn-spin 1200ms linear;
  }
`
```

#### オプション2: インラインスタイル方式

```typescript
// src/styles/inline.ts
export const styles = {
  particle: {
    position: 'absolute' as const,
    display: 'block',
    pointerEvents: 'none' as const,
  },
  wrapper: {
    display: 'inline-block',
    position: 'relative' as const,
    width: 'fit-content',
  },
  // ...
}

// アニメーションはCSS変数として定義
export const animations = {
  comeInOut: {
    animationName: 'krrn-comeInOut',
    animationDuration: '900ms',
    animationFillMode: 'forwards',
  },
  // ...
}
```

### 3. コンポーネントの修正

#### Kirarin.tsx の修正例

```typescript
import React, { useEffect, useRef } from 'react'
import { injectStyles } from './styles/inject'
import { Particle } from './Particle'
import { generateParticles } from './utils/generateParticles'

export interface KirarinProps {
  children: React.ReactNode
  particleType?: 'sparkle' | 'heart' | 'star'
  frequency?: number
  colors?: string[]
  className?: string
  // CSS注入を無効化するオプション（上級者向け）
  disableStyleInjection?: boolean
}

export function Kirarin({
  children,
  particleType = 'sparkle',
  frequency = 0.3,
  colors = ['#FFD700', '#FFA500'],
  className,
  disableStyleInjection = false,
}: KirarinProps) {
  const containerRef = useRef<HTMLSpanElement>(null)
  
  useEffect(() => {
    if (!disableStyleInjection) {
      injectStyles()
    }
  }, [disableStyleInjection])
  
  // パーティクル生成ロジック...
  
  return (
    <span ref={containerRef} className={`krrn-wrapper ${className || ''}`}>
      {children}
      {particles.map((particle) => (
        <Particle key={particle.id} {...particle} />
      ))}
    </span>
  )
}
```

### 4. ビルド設定の修正

#### tsup.config.ts

```typescript
import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  dts: true,
  clean: true,
  minify: true,
  // CSSファイルの生成を無効化
  // injectStyle: false,
  external: ['react', 'react-dom'],
})
```

#### package.json

```json
{
  "name": "kirarin",
  "exports": {
    ".": {
      "import": "./dist/index.js",
      "require": "./dist/index.cjs"
    }
  },
  "main": "./dist/index.cjs",
  "module": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "sideEffects": false,
  "scripts": {
    "build": "tsup",
    "dev": "tsup --watch"
  },
  "peerDependencies": {
    "react": ">=16.8.0",
    "react-dom": ">=16.8.0"
  },
  "devDependencies": {
    // Panda CSS関連の依存を削除
    "tsup": "^8.0.0",
    "typescript": "^5.0.0"
  }
}
```

### 5. 移行手順

1. **新しいブランチを作成**
   ```bash
   git checkout -b feature/environment-independent
   ```

2. **Panda CSS関連ファイルを削除**
   - `panda.config.ts`
   - `postcss.config.js`
   - `styled-system/` ディレクトリ
   - `src/styles/` の既存CSS

3. **スタイル注入システムを実装**
   - `src/styles/inject.ts` を作成
   - すべてのスタイルをJavaScriptに移植

4. **コンポーネントを修正**
   - `css()` 関数の使用箇所をクラス名に置換
   - `cva()` の使用箇所を条件付きクラス名に置換

5. **テストとドキュメントの更新**
   - Storybookでの動作確認
   - 各種フレームワーク（Next.js、Vite、CRA）での動作確認
   - READMEの更新（CSS importの記述を削除）

### 6. 互換性の確保

#### 後方互換性のための対応

```typescript
// src/index.ts
export * from './Kirarin'
export * from './HeartPowan'
export * from './HeartYuraYura'

// 非推奨警告付きでCSSファイルもエクスポート（移行期間用）
if (process.env.NODE_ENV === 'development') {
  console.warn(
    'kirarin: CSS file import is deprecated and will be removed in v1.0.0. ' +
    'Styles are now automatically injected.'
  )
}
```

### 7. テスト項目

- [ ] Next.js (App Router) での動作確認
- [ ] Next.js (Pages Router) での動作確認
- [ ] Vite + React での動作確認
- [ ] Create React App での動作確認
- [ ] Remix での動作確認
- [ ] Tailwind CSS環境での動作確認
- [ ] Panda CSS環境での動作確認
- [ ] CSS Modules環境での動作確認
- [ ] SSRでの動作確認
- [ ] IE11での動作確認（必要な場合）

### 8. リリース計画

1. **v0.1.0-beta**: 環境独立版のベータリリース
2. **v0.2.0**: フィードバックを反映した安定版
3. **v1.0.0**: 旧CSS importを完全に削除したメジャーバージョン

## 注意事項

- パフォーマンスへの影響を最小限にする
- バンドルサイズの増加を抑える（現在より大きくならないこと）
- Tree-shakingが正しく機能することを確認
- TypeScriptの型定義を正確に保つ

## 参考実装

類似のアプローチを取っているライブラリ：
- react-sparkle
- react-confetti
- react-particles

これらのライブラリのソースコードを参考にすることができます。

---

この指示書に従って、Kirarinを完全に環境独立型のライブラリに修正してください。