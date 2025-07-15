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
  
  .krrn-particle-inner {
    display: block;
  }
  
  .krrn-wrapper {
    display: inline-block;
    position: relative;
    width: fit-content;
  }
  
  /* アニメーション定義 */
  @keyframes krrn-comeInOut {
    0% { 
      transform: scale(0);
      opacity: 1;
    }
    50% { 
      transform: scale(1);
      opacity: 1;
    }
    100% { 
      transform: scale(0);
      opacity: 0;
    }
  }
  
  @keyframes krrn-spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  
  @keyframes krrn-yurayura {
    0%, 100% { transform: translateX(0) rotate(0deg); }
    25% { transform: translateX(-3px) rotate(-2deg); }
    75% { transform: translateX(3px) rotate(2deg); }
  }
  
  @keyframes krrn-powanFly {
    0% {
      transform: translate(0, 0) scale(0);
      opacity: 1;
    }
    10% {
      transform: translate(0, -5px) scale(1);
      opacity: 1;
    }
    90% {
      transform: translate(0, -30px) scale(1.2);
      opacity: 1;
    }
    100% {
      transform: translate(0, -40px) scale(1.5);
      opacity: 0;
    }
  }
  
  @keyframes krrn-powanScale {
    0% { transform: scale(1); }
    50% { transform: scale(1.3); }
    100% { transform: scale(1.6); }
  }
  
  @keyframes krrn-baloon {
    0% {
      transform: translate(0, 0) scale(0);
      opacity: 1;
    }
    20% {
      transform: translate(0, -10px) scale(1);
      opacity: 1;
    }
    80% {
      transform: translate(0, -50px) scale(1.1);
      opacity: 0.8;
    }
    100% {
      transform: translate(0, -80px) scale(1.2);
      opacity: 0;
    }
  }
  
  /* パーティクルタイプ別のアニメーション */
  .krrn-animate-kirakira {
    animation: krrn-comeInOut 900ms forwards;
  }
  
  .krrn-animate-yurayura {
    animation: krrn-comeInOut 4800ms forwards;
  }
  
  .krrn-animate-powan {
    animation: krrn-powanFly 2800ms ease forwards;
  }
  
  .krrn-animate-baloon {
    animation: krrn-baloon 3000ms ease forwards;
  }
  
  /* インナーアニメーション */
  .krrn-inner-spin {
    animation: krrn-spin 1200ms linear;
  }
  
  .krrn-inner-spin-reverse {
    animation: krrn-spin 1200ms linear reverse;
  }
  
  .krrn-inner-yurayura {
    animation: krrn-yurayura 1200ms linear infinite;
  }
  
  .krrn-inner-yurayura-reverse {
    animation: krrn-yurayura 1200ms linear infinite reverse;
  }
  
  .krrn-inner-powan-scale {
    animation: krrn-powanScale 2800ms linear forwards;
  }
  
  .krrn-inner-powan-scale-reverse {
    animation: krrn-powanScale 2800ms linear forwards reverse;
  }
`

// アニメーション設定
export const lifetimes = {
  kirakira: 900,
  yurayura: 4800,
  powan: 2800,
  baloon: 3000,
}

export type AnimationType = keyof typeof lifetimes

// パーティクルクラス名生成関数
export const getParticleClassName = (type: AnimationType) => 
  `krrn-particle krrn-animate-${type}`

export const getParticleInnerClassName = (type: AnimationType, reverse: boolean = false) => {
  const baseClass = 'krrn-particle-inner'
  const reverseStr = reverse ? '-reverse' : ''
  
  switch (type) {
    case 'kirakira':
      return `${baseClass} krrn-inner-spin${reverseStr}`
    case 'yurayura':
      return `${baseClass} krrn-inner-yurayura${reverseStr}`
    case 'powan':
      return `${baseClass} krrn-inner-powan-scale${reverseStr}`
    case 'baloon':
      return baseClass
    default:
      return baseClass
  }
}