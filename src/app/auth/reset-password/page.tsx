"use client";

import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Eye, EyeClosed } from "lucide-react";
import ChangePasswordDialog from "@/components/screens/reset-password-dialog";
import FormHeading from "@/components/elements/form-heading";

export default function Page() {
    const [password, setPassword] = useState({
        oldPassword: { value: "", visible: false },
        newPassword: { value: "", visible: false },
    });
    const [error, setError] = useState("");

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        setError("");

        // now submit (fetch / next-auth sign-in / form action, whatever you use)
        // example: fetch('/api/auth/sign-in', { method: 'POST', body: JSON.stringify({ identifier: id.trim(), password }) })
    };

    return (
        <div className="p-4.5 pt-7 pb-4">
            <form
                onSubmit={handleSubmit}
                className="mx-auto flex w-full max-w-[800px] flex-col items-center gap-5"
                role="form"
                aria-labelledby="reset-password-heading"
            >
                <FormHeading
                    title="Change password"
                    titleId="reset-password-heading"
                    description="Your new password must be different from the last
                        password you used."
                />

                <div className="input-group">
                    <label htmlFor="password" className="input-label">
                        Password
                    </label>
                    <div className="relative h-max w-full">
                        <Input
                            id="password"
                            name="password"
                            type={
                                password.oldPassword.visible
                                    ? "text"
                                    : "password"
                            }
                            value={password.oldPassword.value}
                            onChange={(e) =>
                                setPassword((prev) => ({
                                    ...prev,
                                    oldPassword: {
                                        ...prev.oldPassword,
                                        value: e.target.value,
                                    },
                                }))
                            }
                            autoComplete="new-password"
                            spellCheck={false}
                            placeholder="New password"
                            className="input required"
                            aria-describedby="oldPassword-desc form-error"
                            aria-invalid={
                                !!error && !password.oldPassword.value
                            }
                        />
                        <span
                            role="button"
                            tabIndex={0}
                            aria-label={
                                password.oldPassword.visible
                                    ? "Hide password"
                                    : "Show password"
                            }
                            aria-pressed={password.oldPassword.visible}
                            aria-controls="password"
                            className="absolute top-1/2 right-3 grid size-[max-content] -translate-y-1/2 place-items-center"
                            onClick={() =>
                                setPassword((prev) => ({
                                    ...prev,
                                    oldPassword: {
                                        ...prev.oldPassword,
                                        visible: !prev.oldPassword.visible,
                                    },
                                }))
                            }
                            onKeyDown={(e) => {
                                if (e.key === "Enter" || e.key === " ") {
                                    e.preventDefault();
                                    setPassword((prev) => ({
                                        ...prev,
                                        oldPassword: {
                                            ...prev.oldPassword,
                                            visible: !prev.oldPassword.visible,
                                        },
                                    }));
                                }
                            }}
                        >
                            {password.oldPassword.visible ? (
                                <EyeClosed
                                    size={20}
                                    className="animate-in zoom-in text-muted-foreground"
                                    aria-hidden="true"
                                />
                            ) : (
                                <Eye
                                    size={20}
                                    className="animate-in zoom-in text-muted-foreground"
                                    aria-hidden="true"
                                />
                            )}
                        </span>
                        <div
                            id="oldPassword-desc"
                            className="sr-only"
                            aria-live="polite"
                        >
                            {password.oldPassword.visible
                                ? "Password is visible"
                                : "Password is hidden"}
                            .
                        </div>
                    </div>
                </div>

                <div className="input-group">
                    <label htmlFor="confirmPassword" className="input-label">
                        Confirm Password
                    </label>
                    <div className="relative h-max w-full">
                        <Input
                            id="confirmPassword"
                            name="confirmPassword"
                            type={
                                password.newPassword.visible
                                    ? "text"
                                    : "password"
                            }
                            value={password.newPassword.value}
                            onChange={(e) =>
                                setPassword((prev) => ({
                                    ...prev,
                                    newPassword: {
                                        ...prev.newPassword,
                                        value: e.target.value,
                                    },
                                }))
                            }
                            autoComplete="new-password"
                            spellCheck={false}
                            placeholder="Confirm password"
                            className="input required"
                            aria-describedby="newPassword-desc form-error"
                            aria-invalid={
                                !!error && !password.newPassword.value
                            }
                        />
                        <button
                            type="button"
                            aria-label={
                                password.newPassword.visible
                                    ? "Hide password"
                                    : "Show password"
                            }
                            aria-pressed={password.newPassword.visible}
                            aria-controls="confirmPassword"
                            className="absolute top-1/2 right-3 grid size-[max-content] -translate-y-1/2 place-items-center"
                            onClick={() =>
                                setPassword((prev) => ({
                                    ...prev,
                                    newPassword: {
                                        ...prev.newPassword,
                                        visible: !prev.newPassword.visible,
                                    },
                                }))
                            }
                        >
                            {password.newPassword.visible ? (
                                <EyeClosed
                                    size={20}
                                    className="animate-in zoom-in text-muted-foreground"
                                    aria-hidden="true"
                                />
                            ) : (
                                <Eye
                                    size={20}
                                    className="animate-in zoom-in text-muted-foreground"
                                    aria-hidden="true"
                                />
                            )}
                        </button>
                        <div
                            id="newPassword-desc"
                            className="sr-only"
                            aria-live="polite"
                        >
                            {password.newPassword.visible
                                ? "Password is visible"
                                : "Password is hidden"}
                            .
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

                <ChangePasswordDialog>
                    <Button className="button w-full" type="submit">
                        Change password
                    </Button>
                </ChangePasswordDialog>

                <div className="item-center text-foreground flex flex-wrap items-center justify-center gap-1">
                    <Button variant="link" asChild>
                        <Link href="/auth/sign-in">Back to Sign in</Link>
                    </Button>
                </div>
            </form>
        </div>
    );
}
