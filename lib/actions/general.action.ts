'use server';

import { db } from "@/firebase/admin";




export async function getInterviewsByUserId(userId: string): Promise<Interview[]> {
  const interviews= await db
    .collection("interviews")
    .where("userId", "==", userId)
    .orderBy("createdAt", "desc")
    .get();


  return interviews.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Interview[];
}


export async function getLatestInterviews(params:GetLatestInterviewsParams): Promise<Interview[] > {
  const {userId, limit=20} = params

  const interviews = await db
    .collection("interviews")
    .orderBy("createdAt", "desc")
    .where("userId", "!=", userId)
    .where("finalized",'==', true)
    .limit(limit)
    .get();

//   if (interviews.empty) return null;

  return interviews.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Interview[];
}


export async function getInterviewsById(id: string): Promise<Interview[]> {
  const interviews= await db
    .collection("interviews")
    .doc(id)
    .get();

    

  return interviews.data() as Interview[]
}
