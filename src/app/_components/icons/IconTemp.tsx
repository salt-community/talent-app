import type { FC } from "react";
import Icon from "@mdi/react";

type IconProps = {
  path: string;
};

const IconTemp: FC<IconProps> = ({ path }: IconProps) => {
  return (
    <Icon
      className="shrink-0"
      path={path}
      title="email"
      size={1}
      rotate={180}
      horizontal
      vertical
      color="black"
    />
  );
};

export default IconTemp;
