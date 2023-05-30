import Head from 'next/head';
import Image from 'next/image';
import { Inter } from 'next/font/google';
import Homepage from './homepage';
import Login from './login';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <>
      <Head>
        <link rel="icon" href="/public/favicon.ico" />
      </Head>
      <Login />
    </>
  );
}
