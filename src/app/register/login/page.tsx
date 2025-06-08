"use client";
import { redirect } from 'next/navigation';
import { useEffect } from 'react';

export default function LoginPage() {
  useEffect(() => {
    redirect('/chatbot');
  }, []);

  return null; // Or some loading indicator if preferred
}
