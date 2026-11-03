export { default } from '@/components/ArchiveIndex'

export async function getStaticProps(context) {
  const { getArchiveProps } = await import('@/lib/gallery/archive.server')
  return getArchiveProps(context)
}
