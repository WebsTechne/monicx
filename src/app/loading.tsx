import Image from "next/image";
import IMAGES from "@/assets/images";
import { Logo } from "@/components/logo";

export default function Loading() {
  return (
    <div className="bg-background fixed top-0 left-0 z-50 flex h-[100dvh] w-[100vw] items-center justify-center">
      <div className="aspect-1 absolute top-1/2 left-1/2 flex max-w-[150px] -translate-1/2 flex-col items-center">
        {/* <Image
          src={IMAGES.logo.circleDark}
          alt="logo"
          width={150}
          height={150}
          className="animate-pulse object-cover"
        /> */}
        <Logo className="text-foreground w-17" />
      </div>
    </div>
  );
}
