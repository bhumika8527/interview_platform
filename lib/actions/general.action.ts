'use server';

import { db } from "@/firebase/admin";




export async function getInterviewsByUserId(id: string): Promise<Interview | null> {
  const doc = await db.collection("interviews").doc(id).get();

  if (!doc.exists) return null;

  return {
    id: doc.id,
    ...doc.data(),
  } as Interview;
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

export async function getInterviewsById(id: string): Promise<Interview | null> {
  const doc = await db.collection("interviews").doc(id).get();

  if (!doc.exists) return null;

  return {
    id: doc.id,
    ...doc.data(),
  } as Interview;
}



