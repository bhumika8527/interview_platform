import Link from 'next/link'
import React, { ReactNode } from 'react'
import Image from "next/image";
import { redirect } from 'next/navigation';
import { isAuthenticated } from '@/lib/actions/auth.actions';


 const Rootlayout =async  ({children} : {children : ReactNode}) => {
  const isUserAuthenticated = await isAuthenticated();
  if(!isUserAuthenticated){
    redirect('/sign-in')
  }
  return (
<div className="root-layout">
      <nav className="px-6 py-4 shadow-sm flex items-center justify-between">
      <Link href="/" className='flex items-center gap-2' >
      <Image src= "/logo1.png" alt= "Logo" width={38} height={32}/>
        <h2 className='text-primary-100'>Mockify.ai</h2>

      </Link>
    </nav>

   
              <main className="px-6 py-4">{children}</main>

    </div>
  )
}

export default Rootlayout