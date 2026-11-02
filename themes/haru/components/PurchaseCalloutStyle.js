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
    const find = () =>
      setTargets(
        boxes
          .map(({ id }) =>
            document.querySelector(
              '#article-wrapper .notion-callout.notion-block-' + id
            )
          )
          .filter(Boolean)
      )
    find()
    const root = document.getElementById('article-wrapper')
    if (!root) return
    const observer = new MutationObserver(find)
    observer.observe(root, { childList: true, subtree: true })
    return () => observer.disconnect()
  }, [ids])
  return targets.map(target =>
    createPortal(
      <svg
        className='haru-purchase-frame'
        viewBox='0 0 880 590'
        preserveAspectRatio='none'
        aria-hidden='true'
      >
        <path
          d='M145 14 C260 4 325 20 440 17 C555 14 650 5 741 18 C823 30 860 67 865 139 C871 219 857 259 861 333 C865 406 877 476 841 525 C805 577 749 579 663 574 C555 568 497 575 402 577 C297 580 223 587 140 577 C58 568 18 529 15 456 C12 384 26 330 20 260 C13 186 4 132 34 83 C57 45 94 20 145 14 Z'
          fill='white'
          stroke='#e3d7d2'
          strokeWidth='3'
          vectorEffect='non-scaling-stroke'
          strokeLinejoin='round'
        />
      </svg>,
      target,
      target.className
    )
  )
}
