import { CSSProperties, Suspense } from "react";
import MonicxBreadcrumbs from "@/components/products/monicx-breadcrumbs";
import ProductInteraction from "@/components/products/product-interaction";
import { findProduct } from "@/lib/products";
import { ProductType } from "@/types";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Heart, MessageCircle } from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: { slug: string | string[] };
}): Promise<Metadata> {
  const raw = params.slug;
  const slug = Array.isArray(raw) ? raw[0] : raw;
  if (!slug) return { title: "Product not found" };

  const clean = decodeURIComponent(slug);
  const product = findProduct(clean);
  if (!product) return { title: "Product not found" };

  return {
    title: `${product.name} — Monicx`,
    description: product.description, // <-- correct key
    // optionally: openGraph, twitter, etc.
  };
}

export default async function ProductPage({
  params,
  searchParams,
}: {
  params: { slug?: string | string[] };
  searchParams: Promise<{ size: string; color: string }>;
}) {
  const raw = params.slug;
  const slug = Array.isArray(raw) ? raw[0] : raw;
  if (!slug) return notFound();
  const clean = decodeURIComponent(slug);
  const product: ProductType | undefined = findProduct(clean);
  if (!product) return notFound();

  const { size, color } = await searchParams;
  const selectedSize = size || (product.sizes[0] as string);
  const selectedColor = color || (product.colors[0] as string);

  const breadcrumbItems = [
    { name: "Home", href: "/" },
    { name: "Shop", href: "/shop" },
    { name: product.name, href: `/shop/${product.slug}` },
  ];

  return (
    <>
      <div>
        <MonicxBreadcrumbs items={breadcrumbItems} />
      </div>
      <div className="mt-8 flex flex-col gap-4 md:gap-6 lg:flex-row">
        {/* IMAGE */}
        <div className="relative aspect-4/5 max-h-max w-full lg:w-45/120">
          <Image
            src={product.images[selectedColor]}
            alt={product.slug || product.name}
            fill
            className="rounded-xl object-cover"
          />
        </div>
        {/* DETAILS */}

        <section className="flex h-max w-full flex-col lg:w-75/120">
          <div className="flex flex-col items-start justify-between gap-1 px-4 sm:flex-row sm:items-center sm:gap-0">
            <div className="flex items-center gap-1">
              <span
                className="rating inline-block aspect-5/1 h-4.5"
                style={
                  {
                    "--rating": product.rating.value.toFixed(1),
                  } as CSSProperties
                }
                data-rating={product.rating.value.toFixed(1)}
              ></span>
              <span className="text-muted-foreground text-sm leading-tight">
                {product.rating.value.toFixed(1)} — {product.rating.votes}{" "}
                reviews
              </span>
            </div>

            <div className="flex items-center">
              <Button variant="ghost" className="aspect-1! rounded-full p-0!">
                <Heart className="text-primary size-6!" />
              </Button>

              <Button variant="ghost" className="aspect-1! rounded-full p-0!">
                <MessageCircle className="text-primary size-6!" />
              </Button>
            </div>
          </div>
          <div className="flex grow-0 flex-col gap-3.5 p-4 pt-1">
            <h1 className="text-left text-2xl">{product.name}</h1>
            <p className="text-muted-foreground m-0! leading-normal">
              {product.description}
            </p>
            <h2 className="m-0! text-3xl leading-normal font-extrabold">
              ${product.price}
            </h2>
            <Suspense fallback={<div>Loading product controls…</div>}>
              <ProductInteraction
                product={product}
                selectedSize={selectedSize}
                selectedColor={selectedColor}
              />
            </Suspense>
            {/* CARD INFO */}
            <div className="mt-4 flex items-center gap-2">
              <Image
                src="/klarna.png"
                alt="klarna"
                width={50}
                height={25}
                className="rounded-md"
              />
              <Image
                src="/cards.png"
                alt="cards"
                width={50}
                height={25}
                className="rounded-md"
              />
              <Image
                src="/stripe.png"
                alt="stripe"
                width={50}
                height={25}
                className="rounded-md"
              />
            </div>
            <p className="text-muted-foreground m-0! text-sm leading-normal">
              By clicking Pay Now, you agree to our{" "}
              <Link
                href="/legal/terms"
                className="hover:text-foreground underline"
              >
                Terms and Conditions
              </Link>{" "}
              and{" "}
              <Link
                href="/legal/privacy"
                className="hover:text-foreground underline"
              >
                Privacy Policy
              </Link>
              . You authorize us to charge your selected payment method for the
              total amount shown. All sales are subject to our return and{" "}
              <Link
                href="/legal/refund"
                className="hover:text-foreground underline"
              >
                Refund Policy
              </Link>
            </p>
          </div>
        </section>
      </div>
    </>
  );
}
