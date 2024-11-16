"use client";

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Navbar from "@/components/Navbar";
import About from '@/components/About';

export default function AboutPage() {
  return (

    <>
      <Navbar />
      <About />
    </>

  );
}