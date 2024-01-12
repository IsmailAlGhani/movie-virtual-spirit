import {
  Popover,
  PopoverContent,
  PopoverHandler,
} from "@material-tailwind/react";
import { useState } from "react";

interface Props {
  children: string | JSX.Element | JSX.Element[];
  text: string | number;
}

const PopoverText = ({ children, text }: Props) => {
  const [openPopover, setOpenPopover] = useState<boolean>(false);

  const triggers = {
    onMouseEnter: () => setOpenPopover(true),
    onMouseLeave: () => setOpenPopover(false),
  };

  return (
    <Popover open={openPopover} handler={setOpenPopover}>
      <PopoverHandler {...triggers}>{children}</PopoverHandler>
      <PopoverContent placeholder={""} {...triggers}>
        {text}
      </PopoverContent>
    </Popover>
  );
};

export default PopoverText;
