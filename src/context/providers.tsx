// context/providers.tsx
import { createDataProvider } from "@/lib/create-data-provider";
import type { CategoryMinimal } from "@/lib/get-categories";
import type { CollectionMinimal } from "@/lib/get-collections";
import type { SizeMinimal } from "@/lib/get-sizes";
import type { ColorMinimal } from "@/lib/get-colors";

export const Categories = createDataProvider<CategoryMinimal[]>("categories");
export const Collections =
    createDataProvider<CollectionMinimal[]>("collections");
export const Sizes = createDataProvider<SizeMinimal[]>("sizes");
export const Colors = createDataProvider<ColorMinimal[]>("colors");

// Exports for ergonomic imports
export const { Provider: CategoriesProvider, useData: useCategoriesData } =
    Categories;
export const { Provider: CollectionsProvider, useData: useCollectionsData } =
    Collections;
export const { Provider: SizesProvider, useData: useSizesData } = Sizes;
export const { Provider: ColorsProvider, useData: useColorsData } = Colors;
