import IMAGES from "@/assets/images";
import { ThemeToggle } from "@/components/elements/theme-toggle";
import { Logo } from "@/components/logo";
import { Field } from "@/components/ui/field";
import useMounted from "@/hooks/use-mounted";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";

const AuthHeader = () => {
  const mounted = useMounted();

  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  return (
    <Field
      orientation="horizontal"
      className="bg-card/80 sticky top-0 justify-between backdrop-blur-md"
    >
      <Link href="/">
        <Logo className="w-15" />
      </Link>

      <ThemeToggle />
    </Field>
  );
};

export { AuthHeader };
