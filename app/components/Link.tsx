import NextLink from "next/link";
import { Link as RadixLink } from "@radix-ui/themes";

interface Props {
  href: string;
  children: string[];
}

const Link = ({ href, children }: Props) => {
  return (
    // Passing passHref and legacyBehavior to be able to use a custom component
    <NextLink href={href} passHref legacyBehavior>
      <RadixLink>{children}</RadixLink>
    </NextLink>
  );
};

export default Link;
