"use client"

import {zodResolver} from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"
import {z} from "zod"
import { Button } from "@/components/ui/button"
import Image from "next/image";
import {
  Form,
 
} from "@/components/ui/form"

import Link from "next/link"
import { toast } from "sonner"
import ControlledField from "./FormField"
import { useRouter } from "next/navigation"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "@/firebase/client"
import { signIn, signUp } from "@/lib/actions/auth.actions"



const authFormSchema = (type : FormType) =>{
  return z.object({
    name : type === 'sign-up' ? z.string().min(3) : z.string().optional(),
    email: z.string().email(),
    password: z.string().min(3),
    })
}



const AuthForm = ({type} :{type:FormType}) => {
  const router = useRouter()
  const formSchema= authFormSchema(type);
  // Define your form 

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email:"",
      password: "",
    },
  })


  //2. define submit handler

  

  async function onSubmit(values: z.infer<typeof formSchema>){
  try{
    if(type === 'sign-up'){
    const{ name,email,password}= values;

    const userCredentials= await createUserWithEmailAndPassword(auth,email,password)
    
    const result = await signUp({
      uid: userCredentials.user.uid, 
      name: name!,
      email,
   password,
    })
       
    if(!result.success){
      toast.error(result?.message);
      return;
    }

      toast.success('Account created Successfully.Please Sign in.')
      router.push('/sign-in')

    }else{

      const {email,password}= values;
      const userCredential = await signInWithEmailAndPassword(auth,email,password);
    const idToken = await userCredential.user.getIdToken();
    if(!idToken){
      toast.error('Sign in Failed');
      return;

    }
    await signIn({
      email,idToken
    })

     toast.success('Sign in Successfully.')
     router.push('/')
    }

  }catch(error){
    console.log(error);
    toast.error(`There was an error`)
  }
  }

  const isSignIn = type ==='sign-in';




return (
  <div className="w-full max-w-md rounded-xl shadow-lg p-8 
     bg-gradient-to-br from-[#0A0F2D] via-[#111936] to-[#1B2347] 
     text-white">
    <div className="flex flex-col gap-6">
      
      {/* Logo + Title */}
      <div className="flex flex-col items-center text-center gap-2">
        <div className="flex items-center gap-2">
          <Image src="/logo1.png" alt="logo" height={32} width={38} />
          <h2 className="text-primary-100 text-xl font-semibold">Mockify.ai</h2>
        </div>
        <h3 className="text-base font-medium text-black-700">
          Practice job interview with Mockify.ai
        </h3>
      </div>

      {/* FORM */}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-5 mt-4"
        >
          {!isSignIn && (
            <ControlledField
              control={form.control}
              name="name"
              label="Username"
              placeholder="Enter Your Name"
            />
          )}

          <ControlledField
            control={form.control}
            name="email"
            label="Email"
            placeholder="Enter Your Email"
          />

          <ControlledField
            control={form.control}
            name="password"
            label="Password"
            placeholder="Enter Your Password"
            type="password"
          />

          <Button className="btn w-full" type="submit">
            {isSignIn ? "Sign in" : "Create an Account"}
          </Button>
        </form>
      </Form>

      {/* Footer */}
      <p className="text-center text-sm">
        {isSignIn ? "No account yet?" : "Have an account already?"}
        <Link
          href={!isSignIn ? "/sign-in" : "/sign-up"}
          className="font-bold text-user-primary ml-1"
        >
          {!isSignIn ? "Sign in" : "Sign up"}
        </Link>
      </p>
    </div>
  </div>
)}
export default AuthForm