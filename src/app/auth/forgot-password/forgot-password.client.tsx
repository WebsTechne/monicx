"use client";

import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { CharacterSitting } from "@/components/icons/svg-pictures";
import MagicLinkDialog from "@/components/screens/magic-link-dialog";
import FormHeading from "@/components/elements/form-heading";

export function ForgotPasswordClient() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const isEmail = (v: string) => /^\S+@\S+\.\S+$/.test(v);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError("");
    if (!isEmail(email)) {
      setError("Enter a valid email or phone number (include country code).");
      return;
    }
  };

  return (
    <div className="p-4.5 pt-7 pb-4">
      <form
        onSubmit={handleSubmit}
        className="mx-auto flex w-full max-w-[800px] flex-col items-center gap-5"
        role="form"
        aria-labelledby="forgot-password-heading"
      >
        <FormHeading
          title="Forgot password"
          titleId="forgot-password-heading"
          description="Don't worry! It happens. Please enter the email
                        address linked with your account"
        />

        <div className="relative w-full">
          <CharacterSitting
            className="mx-auto w-9/10 max-w-md"
            fill="var(--primary)"
            aria-hidden="true"
            focusable={false}
          />
        </div>

        <div className="input-group">
          <label htmlFor="email" className="input-label">
            Email Address
          </label>
          <Input
            id="email"
            name="email"
            type="text"
            inputMode="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            spellCheck={false}
            placeholder="you@example.com"
            className="input required"
            aria-describedby="email-desc form-error"
            aria-invalid={!!error}
          />
          <div id="email-desc" className="sr-only">
            Enter the email address associated with your account. We will send a
            magic link to this address.
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

        <MagicLinkDialog email={email}>
          <Button className="button w-full" type="submit">
            Submit
          </Button>
        </MagicLinkDialog>

        <div className="item-center text-foreground flex-center flex flex-wrap gap-1">
          <Button variant="link" asChild>
            <Link href="/auth/sign-in">Back to Sign in</Link>
          </Button>
        </div>
      </form>
    </div>
  );
}
