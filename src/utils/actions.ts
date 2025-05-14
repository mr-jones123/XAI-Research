"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

type Provider = "google" | "github";
//ssr

const signInWith = (provider: Provider) => async (): Promise<void> => {
  const supabase = await createClient();

  const auth_callback_url = `${process.env.SITE_URL}/auth/callback`;

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: auth_callback_url,
    },
  });

  if (error) {
    console.error(`Error signing in with ${provider}:`, error.message);
    return;
  }

  console.log("Sign-in data:", data);

  if (data.url) {
    redirect(data.url);
  } else {
    redirect("/error");
  }
};

const signInWithGithub = signInWith("github");

const signInWithGoogle = signInWith("google");

const signOut = async () => {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/");
};

const signInWithEmail = async (formData: FormData) => {
  const supabase = await createClient();

  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signUp(data);

  if (error) {
    redirect("/error");
  }
};

export {
  signInWith,
  signInWithGithub,
  signInWithGoogle,
  signInWithEmail,
  signOut,
};
