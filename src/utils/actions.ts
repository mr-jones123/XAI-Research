"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

type Provider = "google" | "github";
//ssr

const signInWith = (provider: Provider) => async (): Promise<void> => {
  const supabase = await createClient();

  const auth_callback_url = `${process.env.SITE_URL}/auth/callback`;

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

/*const signOut = async () => {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    await supabase.auth.signOut();
  }
};*/

const signInWithEmail = async (formData: FormData) => {
  const supabase = await createClient();

  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  console.log(data)

  const { error } = await supabase.auth.signUp(data);

  if (error) {
     console.error("SignUp Error:", error.message)
    redirect("/error");
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

export { signInWith, signInWithGithub, signInWithGoogle, signInWithEmail, login };
