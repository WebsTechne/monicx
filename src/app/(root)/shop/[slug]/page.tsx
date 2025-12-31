import { CSSProperties, Suspense } from "react";
import MonicxBreadcrumbs from "@/components/products/monicx-breadcrumbs";
import ProductInteraction from "@/components/products/product-interaction";
import { findProduct, products } from "@/lib/products";
import type { ProductType } from "@/types";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Heart, MessageCircle } from "lucide-react";
import { defaultOGImage, metadataBase, siteName } from "@/app/metadata-base";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug: raw } = await params;
  const slug = decodeURIComponent(raw);
  // Example server call - implement to return product details
  const product = await findProduct(slug);
  if (!product) {
    return {
      title: `Product not found`,
      description: `Product not found.`,
      metadataBase,
      robots: { index: false, follow: false },
    };
  }

  const title = `${product.name}`;
  const description =
    product.description ??
    product.shortDescription ??
    `Buy ${product.name} on ${siteName}.`;

  const firstColor = product.colors?.[0];
  const firstImage = firstColor
    ? new URL(product.images[firstColor], metadataBase).toString()
    : null;

  const canonicalUrl = new URL(`/shop/${slug}`, metadataBase).toString();

  return {
    title,
    description,
    metadataBase,
    keywords: [
      product.name,
      product.category,
      ...(product.colors ?? []),
    ].filter(Boolean),
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName,
      images: [firstImage ?? defaultOGImage],
      // type: "product",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [firstImage ?? defaultOGImage],
    },
    alternates: { canonical: canonicalUrl },
  };
}

export default async function ProductPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: { size?: string; color?: string };
}) {
  const { slug: raw } = await params;
  const slug = decodeURIComponent(raw);
  const product: ProductType | undefined = await findProduct(slug);
  if (!product) return notFound();

  const ldJson = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    image: Object.values(product.images ?? {}).map((img) =>
      new URL(img, "https://monicxed.com").toString(),
    ),
    description: product.description || product.shortDescription,
    // sku: product.sku || undefined,
    // mpn: product.sku || undefined,
    brand: { "@type": "Brand", name: /* product.brand || */ "Monicx" },
    offers: {
      "@type": "Offer",
      url: `https://monicxed.com/shop/${product.slug}`,
      priceCurrency: "NGN", // change to your currency
      price: product.price?.toFixed(2),
      availability: "https://schema.org/InStock",
      itemCondition: "https://schema.org/NewCondition",
    },
  };

  const { size, color } = searchParams;
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
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 37.5vw"
            priority
            className="rounded-xl object-cover"
          />
        </div>
        {/* DETAILS */}

        <section className="flex h-max w-full flex-col lg:w-75/120">
          <div className="flex flex-row items-center justify-between gap-1 px-4 sm:items-center sm:gap-0">
            <div className="flex items-center gap-1">
              <span
                className="rating inline-block aspect-5/1 h-3.5 md:h-4.5"
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
                <Heart className="text-primary size-4! md:size-6!" />
              </Button>

              <Button variant="ghost" className="aspect-1! rounded-full p-0!">
                <MessageCircle className="text-primary size-4! md:size-6!" />
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

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ldJson) }}
      />
    </>
  );
}
