import { Logo } from "@/components/logo";

export default function Loading() {
  return (
    <div className="bg-background fixed top-0 left-0 z-50 flex h-[100dvh] w-[100vw] items-center justify-center">
      <div className="aspect-1 absolute top-1/2 left-1/2 flex -translate-1/2 flex-col items-center">
        <Logo className="w-15 animate-pulse" />
      </div>
    </div>
  );
}
