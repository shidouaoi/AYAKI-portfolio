import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

// Keep the original Notion renderer, including synced children and link formatting.
export function purchaseCallouts(recordMap) {
  const blocks = recordMap?.block || {}
  const value = id => blocks[id]?.value
  const text = block =>
    (block?.properties?.title || []).map(part => part[0]).join('')
  const normalize = str => str.trim().replace(/[：:！!。\s]+$/g, '')
  return Object.values(blocks).flatMap(entry => {
    const block = entry?.value
    if (block?.type !== 'callout') return []
    const icon = block.format?.page_icon || ''
    if (!icon.includes('shopping-cart') && !icon.includes('🛒')) return []
    const heading = text(block) ? block : value(block.content?.[0])
    if (normalize(text(heading)) !== 'ご購入はこちら') return []
    return [
      {
        id: block.id.replace(/-/g, ''),
        headingId: heading === block ? null : heading.id.replace(/-/g, '')
      }
    ]
  })
}
export default function PurchaseCalloutStyle({ post }) {
  const boxes = purchaseCallouts(post?.blockMap)
  if (!boxes.length) return null
  const rules = boxes
    .map(({ id, headingId }) => {
      const selector =
        '#theme-haru #article-wrapper .notion-callout.notion-block-' + id
      return `
      ${selector} {
        position: relative;
        display: block !important;
        isolation: isolate;
        width: 100%;
        box-sizing: border-box;
        margin: 66px 0 30px !important;
        padding: 85px 12% 48px !important;
        border: 0 !important;
        border-radius: 0 !important;
        background: transparent !important;
        color: #605d66;
      }
      ${selector} > .haru-purchase-frame {
        position: absolute;
        inset: 0;
        z-index: -1;
        width: 100%;
        height: 100%;
        overflow: visible;
        pointer-events: none;
      }
      ${selector}::after {
        content: '';
        position: absolute;
        left: 7%;
        top: -29px;
        width: min(76%, 390px);
        aspect-ratio: 600 / 171;
        background: url('/haru/purchase-title.png') left top / contain no-repeat;
        pointer-events: none;
      }
      ${selector} > :is(.notion-page-icon, .notion-page-icon-hero, .notion-page-icon-inline, .notion-page-icon-image, .notion-page-icon-span) { display: none !important; }
      ${selector} > .notion-callout-text { padding: 0 !important; width: 100%; min-width: 0; }
      ${headingId ? selector + ' > .notion-callout-text > .notion-block-' + headingId : selector + ' > .notion-callout-text'} {
        ${headingId ? 'display:none !important;' : 'font-size:0;'}
      }
      ${selector} > .notion-callout-text > * { font-size: 14px; }
      ${selector} a { overflow-wrap: anywhere; }
      @media(max-width:580px) {
        ${selector} { padding: 65px 10% 30px !important; margin-top: 54px !important; }
        ${selector}::after { top:-18px; width:86%; left:5%; }
      }
    `
    })
    .join('\n')
  return (
    <>
      <style>{rules}</style>
      <PurchaseFrames boxes={boxes} />
    </>
  )
}

function PurchaseFrames({ boxes }) {
  const [targets, setTargets] = useState([])
  const ids = boxes.map(box => box.id).join(',')
  useEffect(() => {
    const find = () => {
      const next = ids
        .split(',')
        .filter(Boolean)
        .map(id =>
          document.querySelector(
            '#article-wrapper .notion-callout.notion-block-' + id
          )
        )
        .filter(Boolean)
      setTargets(previous =>
        previous.length === next.length &&
        previous.every((target, index) => target === next[index])
          ? previous
          : next
      )
    }
    find()
    const root = document.getElementById('article-wrapper')
    if (!root) return
    const observer = new MutationObserver(find)
    observer.observe(root, { childList: true, subtree: true })
    return () => observer.disconnect()
  }, [ids])
  return targets.map(target =>
    createPortal(<PurchaseFrame target={target} />, target, target.className)
  )
}

function PurchaseFrame({ target }) {
  const [size, setSize] = useState({
    width: target.clientWidth,
    height: target.clientHeight
  })
  useEffect(() => {
    const update = () => {
      const width = target.clientWidth
      const height = target.clientHeight
      setSize(previous =>
        previous.width === width && previous.height === height
          ? previous
          : { width, height }
      )
    }
    update()
    const observer = new ResizeObserver(update)
    observer.observe(target)
    return () => observer.disconnect()
  }, [target])
  const { width: w, height: h } = size
  if (!w || !h) return null
  // Caps depend on width, never on content height. Only the side segments extend.
  const cap = Math.min(w * 0.16, 80, h / 3)
  const left = 4
  const right = w - 4
  const top = 5
  const bottom = h - 5
  const sideCurve = (x, from, to, inward) => {
    const segments = Math.max(1, Math.round(Math.abs(to - from) / 280))
    const step = (to - from) / segments
    const amplitude = Math.min(w * 0.014, 7)
    const commands = []
    for (let i = 0; i < segments; i++) {
      const y = from + step * i
      const bend = x + inward * amplitude
      commands.push(
        'C',
        x,
        y + step * 0.2,
        bend,
        y + step * 0.3,
        bend,
        y + step * 0.5,
        'C',
        bend,
        y + step * 0.7,
        x,
        y + step * 0.8,
        x,
        y + step
      )
    }
    return commands
  }
  const d = [
    'M',
    left,
    cap,
    'C',
    left,
    cap * 0.35,
    w * 0.065,
    top,
    w * 0.18,
    top,
    'C',
    w * 0.3,
    1,
    w * 0.38,
    11,
    w * 0.5,
    8,
    'C',
    w * 0.65,
    4,
    w * 0.72,
    2,
    w * 0.83,
    7,
    'C',
    w * 0.95,
    11,
    right,
    cap * 0.35,
    right,
    cap,
    ...sideCurve(right, cap, h - cap, -1),
    'C',
    right,
    h - cap * 0.3,
    w * 0.95,
    bottom,
    w * 0.83,
    bottom,
    'C',
    w * 0.7,
    h - 1,
    w * 0.62,
    h - 12,
    w * 0.5,
    h - 9,
    'C',
    w * 0.36,
    h - 6,
    w * 0.28,
    h - 1,
    w * 0.17,
    bottom,
    'C',
    w * 0.05,
    bottom,
    left,
    h - cap * 0.3,
    left,
    h - cap,
    ...sideCurve(left, h - cap, cap, 1),
    'Z'
  ].join(' ')
  return (
    <svg
      className='haru-purchase-frame'
      viewBox={'0 0 ' + w + ' ' + h}
      preserveAspectRatio='none'
      aria-hidden='true'
    >
      <path
        d={d}
        fill='white'
        stroke='#e3d7d2'
        strokeWidth='3'
        vectorEffect='non-scaling-stroke'
        strokeLinejoin='round'
      />
    </svg>
  )
}
