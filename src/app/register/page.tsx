"use client";
import { redirect } from 'next/navigation';
import { useEffect } from 'react';

export default function RegisterPage() {
  useEffect(() => {
    redirect('/chatbot');
  }, []);

  return null; // Or some loading indicator if preferred
}
