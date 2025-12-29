import IMAGES from "@/assets/images";
import { ThemeToggle } from "@/components/elements/theme-toggle";
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
        {mounted ? (
          <Image
            src={isDark ? IMAGES.logo.dark : IMAGES.logo.light}
            alt="logo"
            className="m-0! aspect-3/2 w-10 object-cover"
          />
        ) : (
          <span className="bg-muted aspect-3/2 w-15 rounded-sm"></span>
        )}
      </Link>

      <ThemeToggle />
    </Field>
  );
};

export { AuthHeader };
