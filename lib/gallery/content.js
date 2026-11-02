export function bodyExcerpt(recordMap, pageId, length = 120) {
  const blocks = recordMap?.block || {}
  const visited = new Set()
  const parts = []
  const walk = id => {
    if (visited.has(id) || parts.join(' ').length >= length) return
    visited.add(id)
    const block = blocks[id]?.value
    if (!block) return
    if (
      id !== pageId &&
      ['page', 'collection_view', 'collection_view_page', 'callout'].includes(
        block.type
      )
    )
      return
    if (
      [
        'text',
        'header',
        'sub_header',
        'sub_sub_header',
        'bulleted_list',
        'numbered_list',
        'quote',
        'to_do'
      ].includes(block.type)
    ) {
      const text = (block.properties?.title || [])
        .map(part => part[0])
        .join('')
        .replace(/\s+/g, ' ')
        .trim()
      if (text) parts.push(text)
    }
    for (const child of block.content || []) walk(child)
    const source = block.format?.transclusion_reference_pointer?.id
    if (source) walk(source)
  }
  walk(pageId)
  const text = parts.join(' ')
  return text.length > length ? text.slice(0, length).trimEnd() + '…' : text
}

export function countContentImages(recordMap, pageId) {
  const blocks = recordMap?.block || {}
  const visited = new Set()
  const walk = id => {
    if (visited.has(id)) return 0
    visited.add(id)
    const block = blocks[id]?.value
    if (!block) return 0
    if (
      id !== pageId &&
      ['page', 'collection_view', 'collection_view_page'].includes(block.type)
    )
      return 0
    let count = block.type === 'image' ? 1 : 0
    for (const child of block.content || []) count += walk(child)
    const source = block.format?.transclusion_reference_pointer?.id
    if (source) count += walk(source)
    return count
  }
  return walk(pageId)
}
