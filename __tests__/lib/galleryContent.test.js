import { bodyExcerpt, countContentImages } from '@/lib/gallery/content'
const block = (type, content = [], text = '', format = {}) => ({
  value: { type, content, properties: { title: [[text]] }, format }
})
describe('gallery body extraction', () => {
  it('reads synced text once, avoids cycles and excludes purchase callouts and nested pages', () => {
    const map = {
      block: {
        root: block('page', ['ref', 'ref', 'purchase', 'nested']),
        ref: block('transclusion_reference', [], '', {
          transclusion_reference_pointer: { id: 'source' }
        }),
        source: block('transclusion_container', ['text', 'ref']),
        text: block('text', [], '本文のテキスト'),
        purchase: block('callout', ['ad']),
        ad: block('text', [], '購入リンク'),
        nested: block('page', ['secret']),
        secret: block('text', [], '別の記事')
      }
    }
    expect(bodyExcerpt(map, 'root')).toBe('本文のテキスト')
    expect(bodyExcerpt(map, 'root', 3)).toBe('本文の…')
  })
  it('counts synced images once and excludes nested page images', () => {
    const map = {
      block: {
        root: block('page', ['image', 'ref', 'nested']),
        image: block('image'),
        ref: block('transclusion_reference', [], '', {
          transclusion_reference_pointer: { id: 'source' }
        }),
        source: block('transclusion_container', ['image', 'image2', 'ref']),
        image2: block('image'),
        nested: block('page', ['image3']),
        image3: block('image')
      }
    }
    expect(countContentImages(map, 'root')).toBe(2)
  })
})
