"use client";

import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import Link from "next/link";
import {
    AppleIcon,
    FacebookIcon,
    GoogleIcon,
} from "@/components/icons/social-icons";
import { Eye, EyeClosed } from "lucide-react";
import { useTheme } from "next-themes";
import FormHeading from "@/components/elements/form-heading";

export default function Page() {
    const { resolvedTheme } = useTheme();

    const [id, setId] = useState("");
    const [password, setPassword] = useState({ value: "", visible: false });
    const [error, setError] = useState("");

    // trim before checking so leading spaces don't confuse keyboards
    const inputMode = /^[+\d]/.test(id) ? "tel" : "email";

    const isEmail = (v: string) => /^\S+@\S+\.\S+$/.test(v);
    const isPhone = (v: string) => /^[+\d][\d ()\-]{6,}$/.test(v); // permissive

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        setError("");
        if (!isEmail(id) && !isPhone(id)) {
            setError(
                "Enter a valid email or phone number (include country code).",
            );
        }
        if (password.value.length < 6) {
            setError("Password must be at least 6 characters.");
            return;
        }
        if (!id.trim() || !password.value.trim()) {
            setError("All fields are required. Fill in all fields.");
            toast.warning("Fill in all required fields.", {
                description: "Cannot submit form.",
            });
            return;
        }

        // now submit (fetch / next-auth sign-in / form action, whatever you use)
        // example: fetch('/api/auth/sign-in', { method: 'POST', body: JSON.stringify({ identifier: id.trim(), password }) })
    };

    return (
        <div className="p-4.5 pt-7 pb-4">
            <form
                onSubmit={handleSubmit}
                className="mx-auto flex w-full max-w-[800px] flex-col items-center gap-5"
                role="form"
                aria-labelledby="sign-in-heading"
            >
                <FormHeading title="Sign in" titleId="sign-in-heading" />

                <div className="input-group">
                    <label htmlFor="identifier" className="input-label">
                        Email or Phone
                    </label>
                    <Input
                        id="identifier"
                        name="identifier"
                        type="text"
                        inputMode={inputMode}
                        value={id}
                        onChange={(e) => setId(e.target.value)}
                        autoComplete="username"
                        spellCheck={false}
                        placeholder="you@example.com / +234 801 234 5678"
                        className="input required"
                        aria-describedby="identifier-desc form-error"
                        aria-invalid={!!error && !isEmail(id) && !isPhone(id)}
                    />
                    <div id="identifier-desc" className="sr-only">
                        Enter your email address or phone number including
                        country code.
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
                            type={password.visible ? "text" : "password"}
                            value={password.value}
                            onChange={(e) =>
                                setPassword((prev) => ({
                                    ...prev,
                                    value: e.target.value,
                                }))
                            }
                            autoComplete=" current-password"
                            spellCheck={false}
                            placeholder="Your password"
                            className="input required"
                            aria-describedby="password-desc form-error"
                            aria-invalid={!!error && password.value.length < 6}
                        />
                        <button
                            type="button"
                            aria-label={
                                password.visible
                                    ? "Hide password"
                                    : "Show password"
                            }
                            aria-pressed={password.visible}
                            aria-controls="password"
                            className="aspect-1 absolute top-1/2 right-0 grid h-full -translate-y-1/2 place-items-center"
                            onClick={() =>
                                setPassword((prev) => ({
                                    ...prev,
                                    visible: !password.visible,
                                }))
                            }
                        >
                            {password.visible ? (
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
                            {password.visible
                                ? "Password is visible"
                                : "Password is hidden"}
                            . Password must be at least 6 characters.
                        </div>
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
                    Sign in
                </Button>

                <div className="flex w-full max-w-120 items-center justify-center gap-5 px-6 py-2.5">
                    <Separator className="max-w-54 flex-1" />
                    <span className="text-muted-foreground text-sm">
                        Or sign in with
                    </span>
                    <Separator className="max-w-54 flex-1" />
                </div>

                <div className="grid w-full max-w-120 grid-cols-3 gap-4">
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
                    <Button variant="outline" className="button w-full">
                        <FacebookIcon />
                        Facebook
                    </Button>
                </div>

                <div className="item-center text-foreground flex flex-wrap items-center justify-center gap-1">
                    Don&apos;t have any account?
                    <Button variant="link" asChild>
                        <Link
                            href="/auth/sign-up"
                            className="!px-2 font-semibold"
                        >
                            Sign up
                        </Link>
                    </Button>
                </div>
            </form>
        </div>
    );
}
