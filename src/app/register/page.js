"use client"
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Page() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    router.push('/save-info');
    
  };

  return (
    <>
      <div className="w-full h-screen flex sm:p-8">
        <div className="left w-1/3 hidden md:hidden lg:block rounded-2xl">
          <Image
            src="/pexels-andrew-2682452.jpg"
            className="h-full rounded-3xl object-cover"
            priority
            width={500}
            height={500}
            
            alt="image not loaded"
          />
        </div>
        <div className="right w-full  md:w-1/2 flex bg-[url('/pexels-andrew-2682452.jpg')] sm:bg-none bg-cover bg-center items-center justify-center mx-auto">
          <div className="bg-white rounded-xl w-96 p-4 shadow transition hover:shadow-2xl">
            <div className="flex flex-col items-center">
              <Link href="/" className="text-6xl font-bold mb-8 leading-tight">
                Collab.io
              </Link>
              <h1 className="font-bold mt-2 text-xl mb-4 ">Welcome back 👋</h1>
            </div>
            <p className="text-gray-600 mb-6">
              A brand new day is here. Its your day to shape. Register and get
              started on your projects.
            </p>
            <div>
              <form className="mb-4">
                <div className="mb-6 mt-4">
                  <label>Email :</label>
                  <Input placeholder="example@mail.com" className="mb-2" />
                  <label>Username :</label>
                  <Input placeholder="exampleUser" className="mb-2" />
                  <label>Password:</label>
                  <Input placeholder="At least 8 characters" className="mb-2" />
                </div>
                <Button onClick={handleSubmit}>Register</Button>
              </form>
              <div className="flex flex-col items-start"> {/*  Stack links vertically */}
                
                <p>Already have an account?</p>
                <Link href="/login" className="underline text-blue-600">
                  Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}