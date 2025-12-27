"use client";

import { useState } from "react";
import Link from "next/link";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Controller } from "react-hook-form";

import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import FormHeading from "@/components/elements/form-heading";

import { Eye, EyeClosed } from "lucide-react";
import { GoogleIcon, AppleIcon } from "@/components/icons/social-icons";
import { useTheme } from "next-themes";
import { toast } from "sonner";

// validation: identifier must be email OR phone, password 6+
const identifierSchema = z
  .string()
  .min(1, { message: "Please enter your email or phone number." })
  .refine((v) => /^\S+@\S+\.\S+$/.test(v) || /^[+\d][\d ()\-]{6,}$/.test(v), {
    message: "Enter a valid email or phone number (include country code).",
  });

const formSchema = z.object({
  identifier: identifierSchema,
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters." }),
  rememberMe: z.boolean().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export function SignInClient() {
  const { resolvedTheme } = useTheme();

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { identifier: "", password: "", rememberMe: false },
  });

  const {
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { identifier: "", password: "", rememberMe: false },
  });

  const identifierValue = watch("identifier");

  function onSubmit(values: FormValues) {
    // real submission goes here (fetch / next-auth / API)
    console.log("submitting:", values);
    // If you want a global error example:
    // setError("identifier", { type: "manual", message: "Invalid credentials." });
  }

  // determine inputMode like your previous code
  const inputMode = /^[+\d]/.test(identifierValue || "") ? "tel" : "email";

  return (
    <div className="p-4.5 pt-7 pb-4">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mx-auto flex w-full flex-col items-center gap-5"
          role="form"
          aria-labelledby="sign-in-heading"
        >
          <FormHeading title="Sign in" titleId="sign-in-heading" />

          {/* Identifier */}
          <div className="input-group">
            <label htmlFor="identifier" className="input-label">
              Email or Phone
            </label>

            <FormField
              control={form.control}
              name="identifier"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input
                      id="identifier"
                      {...field}
                      inputMode={inputMode}
                      autoComplete="username"
                      spellCheck={false}
                      placeholder="you@example.com / +234 801 234 5678"
                      className="input required"
                      aria-describedby="identifier-desc form-error"
                      aria-invalid={!!errors.identifier}
                    />
                  </FormControl>

                  <FormMessage />
                  <FormDescription>
                    <span id="identifier-desc" className="sr-only">
                      Enter your email address or phone number including country
                      code.
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
                        type={showPassword ? "text" : "password"}
                        autoComplete="current-password"
                        spellCheck={false}
                        placeholder="Your password"
                        aria-describedby="password-desc form-error"
                        aria-invalid={!!errors.password}
                      />
                    </FormControl>

                    <button
                      type="button"
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
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

                  <FormMessage />

                  <FormDescription>
                    <span
                      id="password-desc"
                      className="sr-only"
                      aria-live="polite"
                    >
                      {showPassword
                        ? "Password is visible"
                        : "Password is hidden"}
                      . Password must be at least 6 characters.
                    </span>
                  </FormDescription>
                </FormItem>
              )}
            />
          </div>

          <div className="text-muted-foreground flex w-full max-w-120 items-center justify-between text-sm">
            <span className="flex items-center gap-1">
              <Controller
                control={form.control}
                name="rememberMe"
                render={({ field }) => (
                  <>
                    <Checkbox
                      id="rememberMe"
                      checked={!!field.value}
                      onCheckedChange={(val) => field.onChange(Boolean(val))}
                      className="size-4"
                    />
                    <label htmlFor="rememberMe">Remember me</label>
                  </>
                )}
              />
            </span>

            <Button variant="link" type="button" asChild>
              <Link href="/auth/forgot-password">Forgot password?</Link>
            </Button>
          </div>

          <Button
            className="button w-full"
            type="submit"
            disabled={isSubmitting}
          >
            Sign in
          </Button>

          <div className="flex-center flex w-full max-w-120 gap-5 px-6 py-2.5">
            <Separator className="max-w-54 flex-1" />
            <span className="text-muted-foreground text-sm">
              Or sign in with
            </span>
            <Separator className="max-w-54 flex-1" />
          </div>

          <div className="grid w-full max-w-120 grid-cols-2 gap-4">
            <Button
              variant="outline"
              className="button w-full"
              type="button"
              onClick={(e) => {
                e.preventDefault();
                // logIn("google");
              }}
            >
              <GoogleIcon />
              Google
            </Button>
            <Button
              variant="outline"
              className="button w-full"
              type="button"
              onClick={(e) => {
                e.preventDefault();
                // logIn("apple");
              }}
            >
              <AppleIcon
                size={28}
                fill={resolvedTheme === "light" ? "black" : "white"}
              />
              Apple
            </Button>
          </div>

          <div className="item-center text-foreground flex-center flex flex-wrap gap-1">
            Don&apos;t have any account?
            <Button variant="link" asChild>
              <Link href="/auth/sign-up" className="!px-2 font-semibold">
                Sign up
              </Link>
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
