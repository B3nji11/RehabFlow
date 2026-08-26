import wordmark from '../../assets/rehabflow-wordmark.png'
import mark from '../../assets/rehabflow-mark.png'

/**
 * Brand logo.
 * variant: 'wordmark' (default, mark + "rehabflow") | 'mark' (symbol only)
 *
 * Both assets are transparent PNGs sized for retina. They are dark-on-light,
 * so if the logo ever needs to sit on a dark background, export a white
 * version and add it as a third variant rather than filtering this one.
 */
const assets = {
  wordmark: { src: wordmark, width: 725, height: 120, size: 'h-7 sm:h-8' },
  mark: { src: mark, width: 402, height: 256, size: 'h-9' },
}

export default function Logo({ variant = 'wordmark', className = '' }) {
  const { src, width, height, size } = assets[variant] ?? assets.wordmark

  return (
    <img
      src={src}
      alt="RehabFlow"
      width={width}
      height={height}
      className={`w-auto ${size} ${className}`}
    />
  )
}
