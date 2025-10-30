'use server';

import { db } from "@/firebase/admin";
import { auth } from "firebase-admin";
import { getAuth } from "firebase-admin/auth";
import { cookies } from "next/headers";

const ONE_WEEK = 60 * 60* 24*7

export async function signUp(params :SignUpParams ){
    const {uid, name, email} = params;

    try{ 
     const userRecord = await db.collection('users').doc(uid).get();

     if(userRecord.exists){
        return {
        success: false,
        message: "User already exists.Please sign in instead."
        }
     }

    await db.collection('users').doc(uid).set({
        name, email
    })


    }catch(e:any){
     console.error('Error creating a user', e)
     if(e.code === 'auth/email-already-exists'){
        return {
            success:false,
            message: 'This email is already in use.'
        }
     }
    }
     return {
        success:false,
        message: 'Failed to Create an account.'
     }
}

export async function signIn(params :SignInParams){
   const{ email, idToken} = params;
   try{
          const adminAuth = getAuth();

   const userRecord = await adminAuth.getUserByEmail(email);
   
   if(!userRecord){
      return{
         success:false,
         message:'User does not exist. Create an Account instead.'
      }
   }
  await setSessionCookie(idToken);

   }catch(e){
    console.log(e);

    return{
      success: false,
      messahe:"Failed to log iinto an Account"
    }
   }
}








export async function setSessionCookie(idToken : string){
   const cookieStore = await cookies();
const adminAuth = getAuth(); 
   const sessionCookie = await adminAuth.createSessionCookie(idToken, {
      expiresIn :ONE_WEEK *1000,

   })

   cookieStore.set('session' , sessionCookie, {
      maxAge :ONE_WEEK,
      httpOnly:true,
      secure:process.env.NODE_ENV === 'production',
      path:'/',
      sameSite:'lax'


   })
}