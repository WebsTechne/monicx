"use client";

import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import Link from "next/link";
import { AppleIcon, GoogleIcon } from "@/components/icons/social-icons";
import { Eye, EyeClosed } from "lucide-react";
import { useTheme } from "next-themes";
import FormHeading from "@/components/elements/form-heading";

export default function Page() {
    const { resolvedTheme } = useTheme();

    const [info, setInfo] = useState({
        firstName: "",
        lastName: "",
        email: "",
        number: "",
        password: { value: "", visible: false },
    });
    const [error, setError] = useState("");

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        setError("");

        if (
            !(
                info.firstName &&
                info.lastName &&
                info.email &&
                info.number &&
                info.password.value
            )
        ) {
            setError("Fill in all required fields.");
            toast.warning("Fill in all required fields.", {
                description: "Cannot submit form.",
            });
            return;
        }

        if (info.password.value.length < 6) {
            setError("Password must be at least 6 characters.");
            return;
        }

        // now submit (fetch / next-auth signIn / form action, whatever you use)
        // example: fetch('/api/auth/signin', { method: 'POST', body: JSON.stringify({ identifier: id.trim(), password }) })
    };

    return (
        <div className="p-4.5 pt-7 pb-4">
            <form
                onSubmit={handleSubmit}
                className="mx-auto flex w-full max-w-[800px] flex-col items-center gap-5"
                role="form"
                aria-labelledby="signup-heading"
            >
                <FormHeading title="Sign up" titleId="signup-heading" />

                <div className="input-group">
                    <label htmlFor="email" className="input-label">
                        Email Address
                    </label>
                    <Input
                        id="email"
                        name="email"
                        type="email"
                        value={info.email}
                        onChange={(e) =>
                            setInfo((prev) => ({
                                ...prev,
                                email: e.target.value,
                            }))
                        }
                        autoComplete="email"
                        spellCheck={false}
                        placeholder="you@example.com"
                        className="input required"
                        aria-describedby="email-desc form-error"
                        aria-invalid={!!error && !info.email}
                    />
                    <div id="email-desc" className="sr-only">
                        We'll use this email to sign you in and for account
                        recovery.
                    </div>
                </div>

                <div className="input-group">
                    <label htmlFor="number" className="input-label">
                        Phone number
                    </label>
                    <Input
                        id="number"
                        name="number"
                        type="tel"
                        value={info.number}
                        onChange={(e) =>
                            setInfo((prev) => ({
                                ...prev,
                                number: e.target.value,
                            }))
                        }
                        autoComplete="tel"
                        spellCheck={false}
                        placeholder="+234 801 234 5678"
                        className="input required"
                        aria-describedby="number-desc form-error"
                        aria-invalid={!!error && !info.number}
                    />
                    <div id="number-desc" className="sr-only">
                        Include country code, for example +234 801 234 5678.
                    </div>
                </div>

                <div className="input-group">
                    <label htmlFor="password" className="input-label">
                        Password
                    </label>
                    <div className="relative h-max w-full">
                        <Input
                            id="password"
                            name="password"
                            type={info.password.visible ? "text" : "password"}
                            value={info.password.value}
                            onChange={(e) =>
                                setInfo((prev) => ({
                                    ...prev,
                                    password: {
                                        ...prev.password,
                                        value: e.target.value,
                                    },
                                }))
                            }
                            autoComplete="new-password"
                            spellCheck={false}
                            placeholder="Your password"
                            className="input required"
                            aria-describedby="password-desc form-error"
                            aria-invalid={
                                !!error && info.password.value.length < 6
                            }
                        />
                        <button
                            type="button"
                            aria-label={
                                info.password.visible
                                    ? "Hide password"
                                    : "Show password"
                            }
                            aria-pressed={info.password.visible}
                            aria-controls="password"
                            className="aspect-1 absolute top-1/2 right-0 grid h-full -translate-y-1/2 place-items-center"
                            onClick={() =>
                                setInfo((prev) => ({
                                    ...prev,
                                    password: {
                                        ...prev.password,
                                        visible: !prev.password.visible,
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
                        <div
                            id="password-desc"
                            className="sr-only"
                            aria-live="polite"
                        >
                            {info.password.visible
                                ? "Password is visible"
                                : "Password is hidden"}
                            . Password must be at least 6 characters.
                        </div>
                    </div>
                </div>

                <div className="input-group">
                    <label htmlFor="firstName" className="input-label">
                        First Name
                    </label>
                    <Input
                        id="firstName"
                        name="firstName"
                        type="text"
                        value={info.firstName}
                        onChange={(e) =>
                            setInfo((prev) => ({
                                ...prev,
                                firstName: e.target.value,
                            }))
                        }
                        autoComplete="given-name"
                        spellCheck={false}
                        placeholder="John"
                        className="input required"
                        aria-describedby="firstName-desc form-error"
                        aria-invalid={!!error && !info.firstName}
                    />
                    <div id="firstName-desc" className="sr-only">
                        Enter your first name as it appears on official
                        documents.
                    </div>
                </div>

                <div className="input-group">
                    <label htmlFor="lastName" className="input-label">
                        Last name
                    </label>
                    <Input
                        id="lastName"
                        name="lastName"
                        type="text"
                        value={info.lastName}
                        onChange={(e) =>
                            setInfo((prev) => ({
                                ...prev,
                                lastName: e.target.value,
                            }))
                        }
                        autoComplete="family-name"
                        spellCheck={false}
                        placeholder="Doe"
                        className="input required"
                        aria-describedby="lastName-desc form-error"
                        aria-invalid={!!error && !info.lastName}
                    />
                    <div id="lastName-desc" className="sr-only">
                        Enter your family name or surname.
                    </div>
                </div>

                {error && (
                    <div
                        id="form-error"
                        role="alert"
                        aria-live="assertive"
                        className="text-sm text-red-600"
                    >
                        {error}
                    </div>
                )}

                <div className="text-muted-foreground flex w-full max-w-120 items-center justify-between text-sm">
                    <span className="flex items-center gap-1">
                        <Checkbox
                            id="rememberMe"
                            name="rememberMe"
                            className="size-4"
                        />
                        <label htmlFor="rememberMe">Remember me</label>
                    </span>

                    <Button variant="link" type="button" asChild>
                        <Link href="/auth/forgot-password" className="">
                            Forgot password?
                        </Link>
                    </Button>
                </div>

                <Button className="button w-full" type="submit">
                    Sign up
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
                            fill={resolvedTheme === "light" ? "black" : "white"}
                        />
                        Apple
                    </Button>
                </div>

                <div className="item-center text-foreground flex flex-wrap items-center justify-center gap-1">
                    Have an account?
                    <Button variant="link" asChild>
                        <Link
                            href="/auth/signin"
                            className="!px-2 font-semibold"
                        >
                            Sign in
                        </Link>
                    </Button>
                </div>
            </form>
        </div>
    );
}
