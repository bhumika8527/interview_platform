// import { isAuthenticated } from '@/lib/actions/auth.actions';
// import { redirect } from 'next/navigation';
// import  { ReactNode} from 'react'

// const Authlayout =async  ({children} : {children : ReactNode}) => {
//    const isUserAuthenticated = await isAuthenticated();
//     if(!isUserAuthenticated){
//       redirect('/sign-in')
//     }
//   return (
//     <div className='auth-layout'>{children}</div>
//   )
// }

import { ReactNode } from "react";
import { isAuthenticated } from "@/lib/actions/auth.actions";
import { redirect } from "next/navigation";

export default async function ProtectedLayout({ children }: { children: ReactNode }) {
  const isUserAuthenticated = await isAuthenticated();

  if (!isUserAuthenticated) {
    redirect("/sign-in");
  }

  return <div className="auth-layout">{children}</div>;
}


