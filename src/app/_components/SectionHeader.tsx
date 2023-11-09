type Props = {
  title: string;
};

const SectionHeader = ({ title }: Props) => {
  return <h2 className="text-xl font-bold md:text-3xl">{title}</h2>;
};

export default SectionHeader;
