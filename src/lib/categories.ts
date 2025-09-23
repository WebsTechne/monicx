export const categories = [
    { name: "All", slug: "all", iconName: "ShoppingBasket" },
    { name: "T-shirts", slug: "t-shirts", iconName: "Shirt" },
    { name: "Shoes", slug: "shoes", iconName: "Footprints" },
    { name: "Accessories", slug: "accessories", iconName: "Glasses" },
    { name: "Bags", slug: "bags", iconName: "Briefcase" },
    { name: "Dresses", slug: "dresses", iconName: "Venus" },
    { name: "Jackets", slug: "jackets", iconName: "Shirt" },
    { name: "Gloves", slug: "gloves", iconName: "Hand" },
];

// Note: icons referenced by name so this file stays server-safe.
// UI client code will rehydrate icons locally.
export type Category = (typeof categories)[number];
