"use client";

import { useState } from "react";
import Link from "next/link";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import { useTheme } from "next-themes";

import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

import { Eye, EyeClosed } from "lucide-react";
import { GoogleIcon, AppleIcon } from "@/components/icons/social-icons";

import { signInSocial } from "@/lib/actions/auth-actions";
import { authClient } from "@/lib/auth-client";
import { Spinner } from "@/components/ui/spinner";
import { AuthHeader } from "../_components/auth-header";
import { getPublicErrorMessage, reportErrorToServer } from "@/lib/error-utils";
import { toast } from "sonner";
import { AuthMessage } from "../_components/auth-message";

// validation: identifier must be email, password 6+ chars
const formSchema = z.object({
  email: z.email("Please enter a valid email address."),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters." })
    .max(72, "Password must be at most 72 characters."),
  rememberMe: z.boolean().optional(),
});
type FormValues = z.infer<typeof formSchema>;

export function SignInClient() {
  const { resolvedTheme } = useTheme();
  const { replace } = useRouter();
  const searchParams = useSearchParams();
  const raw = searchParams.get("returnTo") ?? "";
  const returnTo =
    raw && raw.startsWith("/") && !raw.startsWith("//") ? raw : "/";

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [error, setError] = useState("");

  const handleSocialAuth = async (
    provider: "google" | "apple",
    callbackURL: string,
  ) => {
    setError("");

    try {
      await signInSocial({ provider, callbackURL });
    } catch (err) {
      const publicMsg = getPublicErrorMessage(err);
      const ref = await reportErrorToServer(err);
      setError(`${publicMsg} (ref: ${ref})`);
    }
  };

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: "", password: "", rememberMe: false },
  });

  const emailError = form.formState.errors.email;
  const passwordError = form.formState.errors.password;

  const {
    formState: { isSubmitting },
  } = form;

  const onSubmit = async (data: FormValues) => {
    const payload = { ...data, email: data.email.toLowerCase().trim() };

    setError("");

    try {
      const result = await authClient.signIn.email(payload);

      if (result.error) {
        switch (result.error.code) {
          case "INVALID_CREDENTIALS":
            setError("Incorrect email or password.");
            return;

          case "EMAIL_NOT_VERIFIED":
            setError("Please verify your email before signing in.");
            return;

          case "RATE_LIMITED":
            setError("Too many attempts. Please try again later.");
            return;

          default:
            setError(result.error.message ?? "Failed to sign in.");
            return;
        }
      }

      // No error means sign-in succeeded
      toast.success(`Welcome back, ${result.data.user.name ?? "User"}!`);
      replace(decodeURIComponent(returnTo));
    } catch (err) {
      // Only network / unexpected errors land here
      setError(
        err instanceof Error ? err.message : "Unexpected authentication error",
      );
    }
  };

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="mx-auto flex max-w-115 flex-col items-center gap-5"
      role="form"
      aria-labelledby="sign-in-heading"
    >
      <AuthHeader />
      <FieldGroup className="gap-4.5!">
        {/* Title */}
        <AuthMessage
          id="sign-in-heading"
          title="Welcome back"
          description="Sign in with your email and password"
        />

        {/* Email */}
        <Field data-invalid={!!emailError} className="input-group gap-1.5!">
          <FieldLabel htmlFor="form-rhf-email" className="input-label">
            Email
          </FieldLabel>
          <Input
            {...form.register("email")}
            id="form-rhf-email"
            aria-invalid={!!emailError}
            aria-describedby={emailError ? "form-rhf-email-error" : undefined}
            autoComplete="email"
            className="input required"
            type="email"
            placeholder="j@example.com"
          />
          <FieldError
            errors={[emailError]}
            id="form-rhf-email-error"
            role="alert"
          />
        </Field>

        {/* Password with visibility toggle */}
        <Field data-invalid={!!passwordError} className="input-group gap-1.5!">
          <FieldLabel
            htmlFor="form-rhf-password"
            className="input-label gap-1.5!"
          >
            Password
          </FieldLabel>

          <div className="relative flex h-max w-full items-center">
            <Input
              {...form.register("password")}
              id="form-rhf-password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              aria-invalid={!!passwordError}
              aria-describedby={
                passwordError ? "form-rhf-password-error" : undefined
              }
              className="input required"
            />

            <button
              type="button"
              aria-label={showPassword ? "Hide password" : "Show password"}
              aria-pressed={showPassword}
              className="aspect-1 absolute top-1/2 right-0 grid h-full -translate-y-1/2 place-items-center"
              onClick={() => setShowPassword((v) => !v)}
            >
              {showPassword ? (
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

          <FieldError
            errors={[passwordError]}
            id="form-rhf-password-error"
            role="alert"
          />
          <FieldDescription>
            <span id="password-desc" className="sr-only" aria-live="polite">
              {showPassword ? "Password is visible" : "Password is hidden"}.
              Password must be at least 6 characters.
            </span>
          </FieldDescription>
        </Field>

        <div className="text-muted-foreground flex w-full items-center justify-between text-sm">
          <span className="flex items-center gap-1">
            <Controller
              control={form.control}
              name="rememberMe"
              render={({ field }) => (
                <Checkbox
                  id="rememberMe"
                  checked={!!field.value}
                  onCheckedChange={(val) => field.onChange(Boolean(val))}
                  className="size-4"
                />
              )}
            />

            <label htmlFor="rememberMe">Keep me signed in</label>
          </span>

          <Button variant="link" type="button" asChild>
            <Link href="/auth/forgot-password">Forgot password?</Link>
          </Button>
        </div>

        <Button className="button w-full" type="submit" disabled={isSubmitting}>
          {isSubmitting ? <Spinner /> : "Sign in"}
        </Button>

        {/* Error field */}
        {error && (
          <Field>
            <p className="w-full rounded-lg border border-red-500/50 bg-red-300/50 p-2 text-[15px] text-red-500 dark:bg-red-500/25">
              {error}
            </p>
          </Field>
        )}

        <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card my-2">
          Or continue with
        </FieldSeparator>

        <Field className="grid w-full grid-cols-2 gap-4">
          <Button
            variant="secondary"
            className="button w-full"
            type="button"
            onClick={(e) => {
              e.preventDefault();
              handleSocialAuth("google", returnTo);
            }}
          >
            <GoogleIcon />
            Google
          </Button>
          <Button
            variant="secondary"
            className="button w-full"
            type="button"
            onClick={(e) => {
              e.preventDefault();
              handleSocialAuth("apple", returnTo);
            }}
          >
            <AppleIcon size={28} fill="black" />
            Apple
          </Button>
        </Field>

        <div className="item-center text-foreground flex-center flex flex-wrap gap-1">
          Don&apos;t have any account?
          <Button variant="link" asChild>
            <Link href="/auth/sign-up" className="!px-2 font-semibold">
              Sign up
            </Link>
          </Button>
        </div>
      </FieldGroup>
    </form>
  );
}
