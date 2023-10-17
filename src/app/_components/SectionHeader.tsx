import type { FC } from "react"

type SectionHeaderProps = {
  title: string
}

const SectionHeader: FC<SectionHeaderProps> = ({title}) => {
  return (
    <h2 className='text-xl font-bold md:text-3xl'>{title}</h2>
  )
}

export default SectionHeader