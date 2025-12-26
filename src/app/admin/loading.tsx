import { LoaderCircle } from "lucide-react";

export default async function Loading() {
  return (
    <div className="flex-center absolute top-1/2 left-1/2 h-full w-full -translate-y-1/2">
      <LoaderCircle className="animate-spin" />
    </div>
  );
}
