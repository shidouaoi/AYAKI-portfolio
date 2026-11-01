/* 原本的hover会导致文章底部的分类链接有大黑块大绿块，取消掉 */
/* import SmartLink from '@/components/SmartLink'

export default function CategoryItem ({ selected, category, categoryCount }) {
  return (
    <SmartLink
      href={`/category/${category}`}
      passHref
      className={(selected
        ? 'hover:text-white dark:hover:text-white bg-green-600 text-white '
        : 'dark:text-green-400 text-gray-500 hover:text-white dark:hover:text-white hover:bg-green-600') +
      ' flex text-sm items-center duration-300 cursor-pointer py-1 font-light px-2 whitespace-nowrap'}>

      <div><i className={`mr-2 fas ${selected ? 'fa-folder-open' : 'fa-folder'}`} />{category} {categoryCount && `(${categoryCount})`}
      </div>

    </SmartLink>
  );
}*/
import SmartLink from '@/components/SmartLink'

export default function CategoryItem ({
  selected,
  category,
  categoryCount,
  noHover = false
}) {
  return (
    <SmartLink
      href={`/category/${category}`}
      passHref
      className={
        (
          noHover
            ? 'dark:text-gray-400 text-gray-500 '
            : selected
              ? 'hover:text-white dark:hover:text-white bg-green-600 text-white '
              : 'dark:text-green-400 text-gray-500 hover:text-white dark:hover:text-white hover:bg-green-600'
        ) +
        (
          noHover
            ? ' flex text-sm items-center cursor-pointer font-light whitespace-nowrap '
            : ' flex text-sm items-center duration-300 cursor-pointer py-1 px-2 font-light whitespace-nowrap '
        )
      }>

      <div>
        {!noHover && (
          <i
            className={`mr-2 fas ${
              selected ? 'fa-folder-open' : 'fa-folder'
            }`}
          />
        )}

        {category} {categoryCount && `(${categoryCount})`}
      </div>

    </SmartLink>
  )
}
