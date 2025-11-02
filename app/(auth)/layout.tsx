import  { ReactNode} from 'react'

const Authlayout = ({children} : {children : ReactNode}) => {
  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('/auth-bg.jpg')" }}
    >
      {children}
    </div>
  );
}
export default Authlayout;
