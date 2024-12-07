import Link from "next/link";
import { styled } from "@mui/material";
import Image from "next/image";

const LinkStyled = styled(Link)(() => ({
  height: "70px",
  width: "170px",
  overflow: "hidden",
  display: "block",
}));

const Logo = () => {
  return (
    <LinkStyled href="/">
      <Image
        src="/images/logos/I-TRUCK-LOGO.svg"
        alt="logo"
        height={70}
        width={174}
        priority
      />
    </LinkStyled>
  );
};

export default Logo;
