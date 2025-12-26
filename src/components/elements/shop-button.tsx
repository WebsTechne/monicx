import Link from "next/link";
import { Button } from "../ui/button";

const ShopButton = () => {
  return (
    <Button
      variant="link"
      className="text-muted-foreground hover:text-primary text-sm"
      asChild
    >
      <Link href="/shop">View all products</Link>
    </Button>
  );
};

export { ShopButton };
