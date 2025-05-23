"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { confirmPassword } from "./validate";
import { error } from "console";

type Provider = "google" | "github";
//ssr

const signInWith = (provider: Provider) => async (): Promise<void> => {
  const supabase = await createClient();

  // Determine the callback URL dynamically based on the environment
  const isLocalEnv = process.env.NODE_ENV === 'development';
  const auth_callback_url = isLocalEnv 
    ? `${process.env.PRODUCTION_SITE_URL || 'http://localhost:3000'}/auth/callback`
    : `/auth/callback`; // Use relative URL in production for better portability

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: auth_callback_url,
      queryParams:{
        prompt:"select_account",
      }
    },
  });

  if (error) {
    redirect("/error");
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

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    await supabase.auth.signOut();
  }

  redirect("/")
};

const signInWithEmail = async (formData: FormData) => {
  const supabase = await createClient();

  const passwordObj = {
    password: formData.get("password") as string,
    confirmPass: formData.get("confirm-password") as string
  }

  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  console.log(data);
  console.log(passwordObj);

  if(confirmPassword(passwordObj)){
    const { error } = await supabase.auth.signUp(data);
    if(error){
      console.error("SignUp Error:", error.message)
      redirect("/error");
    }
  }else {
    console.log("Password does not match");
  }

 

   revalidatePath('/', 'layout');
   redirect('/');
};


const login = async (formData: FormData) => {
  const supabase = await createClient();


  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string, 
  }

  const { error } = await supabase.auth.signInWithPassword(data);


  if(error){
    redirect('/error');
  }

  
   revalidatePath('/', 'layout');
   redirect('/');
}

export { signInWith, signInWithGithub, signInWithGoogle, signInWithEmail, login , signOut};
