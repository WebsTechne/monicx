"use client";

import { useState } from "react";
import { useForm } from "react-hook-form"; // <- added
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import Link from "next/link";
import { AppleIcon, GoogleIcon } from "@/components/icons/social-icons";
import { Eye, EyeClosed, Loader2 } from "lucide-react";
import { useTheme } from "next-themes";
import FormHeading from "@/components/elements/form-heading";

import {
    Form,
    FormField,
    FormItem,
    FormControl,
    FormDescription,
    FormMessage,
} from "@/components/ui/form";
import z from "zod";
import parsePhoneNumberFromString from "libphonenumber-js";
import { zodResolver } from "@hookform/resolvers/zod";

export default function Page() {
    const { resolvedTheme } = useTheme();

    const formSchema = z.object({
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
        password: z
            .string()
            .min(6, { message: "Password must be at least 6 characters." }),
        firstName: z
            .string()
            .trim()
            .min(1, { message: "First name is required." }),
        lastName: z
            .string()
            .trim()
            .min(1, { message: "Last name is required." }),
    });
    type FormValues = z.infer<typeof formSchema>;

    const {
        formState: { errors, isSubmitting },
    } = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            phone: "",
            email: "",
            password: "",
            firstName: "",
            lastName: "",
        },
    });

    const onSubmit = () => {
        if (
            !(
                info.firstName &&
                info.lastName &&
                info.email &&
                info.phone &&
                info.password.value
            )
        ) {
            toast.warning("Fill in all required fields.", {
                description: "Cannot submit form.",
            });
            return;
        }

        if (info.password.value.length < 6) {
            toast.warning("Password must be at least 6 characters.", {
                description: "Cannot submit form.",
            });
            return;
        }

        // now submit (fetch / next-auth sign-in / form action, whatever you use)
        // example: fetch('/api/auth/sign-up', { method: 'POST', body: JSON.stringify({ firstName: info.firstName, ... }) })
    };

    const [info, setInfo] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        password: { value: "", visible: false },
    });

    // Minimal addition: create form object and pass it to <Form {...form}>
    const form = useForm({
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            // keep password as empty string in form state; you're still using local state for visibility & value
            password: "",
        },
    });

    return (
        <div className="p-4.5 pt-7 pb-4">
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="mx-auto flex w-full flex-col items-center gap-5"
                    role="form"
                    aria-labelledby="signup-heading"
                >
                    <FormHeading title="Sign up" titleId="signup-heading" />

                    <div className="input-group w-full">
                        <label htmlFor="email" className="input-label">
                            Email Address
                        </label>

                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormControl className="flex-1">
                                        <Input
                                            className="input required size-full"
                                            id="email"
                                            {...field}
                                            value={info.email}
                                            onChange={(e) =>
                                                setInfo((prev) => ({
                                                    ...prev,
                                                    email: e.target.value,
                                                }))
                                            }
                                            type="email"
                                            autoComplete="email"
                                            spellCheck={false}
                                            placeholder="you@example.com"
                                            aria-describedby="email-desc form-error"
                                            aria-invalid={!!errors.email}
                                        />
                                    </FormControl>

                                    <FormMessage />

                                    <FormDescription>
                                        <span
                                            id="identifier-desc"
                                            className="sr-only"
                                        >
                                            Enter your email address.
                                        </span>
                                    </FormDescription>
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="input-group w-full">
                        <label htmlFor="phone" className="input-label">
                            Phone number
                        </label>

                        <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormControl className="flex-1">
                                        <Input
                                            className="input required size-full"
                                            id="phone"
                                            {...field}
                                            value={info.phone}
                                            onChange={(e) =>
                                                setInfo((prev) => ({
                                                    ...prev,
                                                    phone: e.target.value,
                                                }))
                                            }
                                            type="tel"
                                            autoComplete="tel"
                                            spellCheck={false}
                                            placeholder="+234 801 234 5678  "
                                            aria-describedby="phone-desc form-error"
                                            aria-invalid={!!errors.phone}
                                        />
                                    </FormControl>

                                    <FormMessage />

                                    <FormDescription>
                                        <span
                                            id="identifier-desc"
                                            className="sr-only"
                                        >
                                            Enter your phone number including
                                            country code.
                                        </span>
                                    </FormDescription>
                                </FormItem>
                            )}
                        />
                    </div>

                    {/* Password with visibility toggle */}
                    <div className="input-group w-full">
                        <label htmlFor="password" className="input-label">
                            Password
                        </label>

                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <div className="relative flex h-max w-full items-center">
                                        <FormControl className="flex-1">
                                            <Input
                                                className="input required size-full"
                                                id="password"
                                                {...field}
                                                type={
                                                    info.password.visible
                                                        ? "text"
                                                        : "password"
                                                }
                                                value={info.password.value}
                                                onChange={(e) =>
                                                    setInfo((prev) => ({
                                                        ...prev,
                                                        password: {
                                                            ...prev.password,
                                                            value: e.target
                                                                .value,
                                                        },
                                                    }))
                                                }
                                                autoComplete="new-password"
                                                spellCheck={false}
                                                placeholder="Your password"
                                                aria-describedby="password-desc form-error"
                                                aria-invalid={!!errors.password}
                                            />
                                        </FormControl>

                                        <button
                                            type="button"
                                            aria-label={
                                                info.password.visible
                                                    ? "Hide password"
                                                    : "Show password"
                                            }
                                            aria-pressed={info.password.visible}
                                            className="aspect-1 absolute top-1/2 right-0 grid h-full -translate-y-1/2 place-items-center"
                                            onClick={() =>
                                                setInfo((prev) => ({
                                                    ...prev,
                                                    password: {
                                                        ...prev.password,
                                                        visible:
                                                            !prev.password
                                                                .visible,
                                                    },
                                                }))
                                            }
                                        >
                                            {info.password.visible ? (
                                                <EyeClosed
                                                    size={20}
                                                    className="animate-in fade-in text-muted-foreground"
                                                />
                                            ) : (
                                                <Eye
                                                    size={20}
                                                    className="animate-in fade-in text-muted-foreground"
                                                />
                                            )}
                                        </button>
                                    </div>

                                    <FormMessage />

                                    <FormDescription>
                                        <span
                                            id="password-desc"
                                            className="sr-only"
                                            aria-live="polite"
                                        >
                                            {info.password.visible
                                                ? "Password is visible"
                                                : "Password is hidden"}
                                            . Password must be at least 6
                                            characters.
                                        </span>
                                    </FormDescription>
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="input-group w-full">
                        <label htmlFor="firstName" className="input-label">
                            First name
                        </label>

                        <FormField
                            control={form.control}
                            name="firstName"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormControl className="flex-1">
                                        <Input
                                            className="input required size-full"
                                            id="firstName"
                                            {...field}
                                            value={info.firstName}
                                            onChange={(e) =>
                                                setInfo((prev) => ({
                                                    ...prev,
                                                    firstName: e.target.value,
                                                }))
                                            }
                                            type="text"
                                            autoComplete="given-name"
                                            spellCheck={false}
                                            placeholder="John"
                                            aria-describedby="firstName-desc form-error"
                                            aria-invalid={!!errors.firstName}
                                        />
                                    </FormControl>

                                    <FormMessage />

                                    <FormDescription>
                                        <span
                                            id="identifier-desc"
                                            className="sr-only"
                                        >
                                            Enter your first name as it appears
                                            on official documents.
                                        </span>
                                    </FormDescription>
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="input-group w-full">
                        <label htmlFor="lastName" className="input-label">
                            Last name
                        </label>

                        <FormField
                            control={form.control}
                            name="lastName"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormControl className="flex-1">
                                        <Input
                                            className="input required size-full"
                                            id="lastName"
                                            {...field}
                                            value={info.lastName}
                                            onChange={(e) =>
                                                setInfo((prev) => ({
                                                    ...prev,
                                                    lastName: e.target.value,
                                                }))
                                            }
                                            type="text"
                                            autoComplete="family-name"
                                            spellCheck={false}
                                            placeholder="Doe"
                                            aria-describedby="lastName-desc form-error"
                                            aria-invalid={!!errors.lastName}
                                        />
                                    </FormControl>

                                    <FormMessage />

                                    <FormDescription>
                                        <span
                                            id="identifier-desc"
                                            className="sr-only"
                                        >
                                            Enter your family name or surname.
                                        </span>
                                    </FormDescription>
                                </FormItem>
                            )}
                        />
                    </div>

                    <Button
                        className="button w-full"
                        type="submit"
                        disabled={isSubmitting}
                    >
                        {!isSubmitting ? (
                            "Sign up"
                        ) : (
                            <Loader2 className="size-5 animate-spin" />
                        )}
                    </Button>

                    <div className="flex w-full max-w-120 items-center justify-center gap-5 px-6 py-2.5">
                        <Separator className="flex-1" />
                        <span className="text-muted-foreground text-sm">
                            Or sign up with
                        </span>
                        <Separator className="flex-1" />
                    </div>

                    <div className="grid w-full max-w-120 grid-cols-2 gap-2">
                        <Button variant="outline" className="button w-full">
                            <GoogleIcon />
                            Google
                        </Button>
                        <Button variant="outline" className="button w-full">
                            <AppleIcon
                                size={28}
                                fill={
                                    resolvedTheme === "light"
                                        ? "black"
                                        : "white"
                                }
                            />
                            Apple
                        </Button>
                    </div>

                    <div className="item-center text-foreground flex flex-wrap items-center justify-center gap-1">
                        Have an account?
                        <Button variant="link" asChild>
                            <Link
                                href="/auth/sign-in"
                                className="!px-2 font-semibold"
                            >
                                Sign in
                            </Link>
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
}
