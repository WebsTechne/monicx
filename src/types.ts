import { z } from "zod";
import { parsePhoneNumberFromString } from "libphonenumber-js";

export type ProductType = {
    id: string | number;
    slug?: string;
    category: string;
    name: string;
    shortDescription: string;
    description: string;
    price: number;
    sizes: string[];
    colors: string[];
    images: Record<string, string>;
    rating: { value: number; votes: number };
    wishlist?: boolean;
};
export type ProductsType = ProductType[];

export type CartItemType = ProductType & {
    quantity: number;
    selectedSize: string;
    selectedColor: string;
};
export type CartItemsType = CartItemType[];

export const shippingFormSchema = z.object({
    name: z
        .string()
        .trim()
        .min(2, "Name is required")
        .regex(/^[\p{L}\p{M} .'-]+$/u, "Name contains invalid characters"),

    email: z.string().trim().email("Invalid email format"),

    phone: z
        .string()
        .trim()
        .min(7)
        .max(20)
        .refine(
            (val) => {
                const pn = parsePhoneNumberFromString(val, "NG");
                return !!(pn && pn.isValid());
            },
            { message: "Invalid phone number for Nigeria" },
        )
        // Optionally transform to E.164 when you store:
        .transform((val) => {
            const pn = parsePhoneNumberFromString(val, "NG");
            return pn ? pn.number : val; // pn.number is E.164
        }),

    address: z.string().trim().min(5, "Address is required"),
    city: z.string().trim().min(2, "City is required"),
    state: z.string().trim().min(2, "State is required"),
    postalCode: z.string().optional().nullable(),
    country: z.string().default("Nigeria"),
});
export type ShippingFormInputs = z.infer<typeof shippingFormSchema>;

export const paymentFormSchema = z.object({
    cardHolder: z
        .string()
        .trim()
        .min(2, "Cardholder name is required")
        .regex(
            /^[\p{L}\p{M} .'-]+$/u,
            "Cardholder name contains invalid characters",
        ),

    cardNumber: z
        .string()
        .min(16, "Card number must be 16 digits")
        .max(16, "Card number must be 16 digits"),

    expirationDate: z
        .string()
        .regex(
            /^\s*(0[1-9]|1[0-2])\s*\/\s*(\d{2}|\d{4})\s*$/,
            "Invalid expiration date format",
        ),
    cvv: z
        .string()
        .min(3, "CVV must be 3 digits")
        .max(3, "CVV must be 3 digits"),
});
export type PaymentFormInputs = z.infer<typeof paymentFormSchema>;

export type CartStoreStateType = {
    cart: CartItemsType;
    hasHydrated: boolean;
};

export type CartStoreActionsType = {
    addToCart: (product: CartItemType) => void;
    // removeFromCart: (id: string | number) => void;
    removeFromCart: (product: CartItemType) => void;
    clearCart: () => void;
};

export type User = {
    isUser?: boolean;
    firstName?: string;
    lastName?: string;
    image?: string | null;
    initials: string;
} | null;
