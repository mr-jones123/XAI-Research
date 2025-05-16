"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import Image from "next/image";
import {
  signInWithGithub,
  signInWithGoogle,
  signInWithEmail,
} from "@/utils/actions";

const RegisterUI = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold">Register</h2>
          <p className="text-muted-foreground mt-2">
            Create an account to get started
          </p>
        </div>

        <div className="space-y-3">
          <Button
            variant="outline"
            className="w-full flex items-center justify-center gap-2"
            type="button"
            onClick={signInWithGoogle}
          >
            <Image
              src="/google-icon-logo-svgrepo-com.svg"
              alt="Google"
              width={24}
              height={24}
              className="h-6 w-6"
            />
            Continue with Google
          </Button>

          <Button
            variant="outline"
            className="w-full flex items-center justify-center gap-2"
            type="button"
            onClick={signInWithGithub}
          >
            <Image
              src="/github.svg"
              alt="GitHub"
              width={24}
              height={24}
              className="h-6 w-6"
            />
            Continue with GitHub
          </Button>
        </div>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border"></div>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>

        <form className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Email"
              name="email"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" name="password" required />
          </div>
          {/*
          <div className="space-y-2">
            <Label htmlFor="confirm-password">Confirm Password</Label>
            <Input id="confirm-password" type="password" required />
          </div>
          */}
          <Button className="w-full" type="submit" formAction={signInWithEmail}>
            Register
          </Button>
        </form>
        <p className="text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link
            href="/register/login"
            className="text-primary font-medium hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterUI;
