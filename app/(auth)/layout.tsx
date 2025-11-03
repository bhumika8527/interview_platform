// import  { ReactNode} from 'react'

// const Authlayout = ({children} : {children : ReactNode}) => {
//   return (
//     <div
//       className="w-full flex items-center justify-center bg-cover bg-center"
//       style={{ backgroundImage: "url('/auth-bg.jpg')" }}
//     >
//       {children}
//     </div>
//   );
// }
// export default Authlayout;

import { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div
      className="min-h-screen w-full flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('/auth-bg.jpg')" }}
    >
      {children}
    </div>
  );
}
