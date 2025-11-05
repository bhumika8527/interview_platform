import Agent from '@/components/Agent';
import { getCurrentUser } from "@/lib/actions/auth.actions";

export default async function Page() {
  const user = await getCurrentUser();

  return (
    <div className="pt-24 px-6">
      <h3 className="text-2xl font-semibold mb-8">Interview Generation</h3>

      <Agent
        userName={user?.name ?? ""} 
   userId={user?.id ?? ""} 
   type="generate" 
      />
    </div>
  );
}



// import VapiInterviewWidget from "@/components/VapiInterviewWidget";
// import Agent from '@/components/Agent';
// import { getCurrentUser } from "@/lib/actions/auth.actions";

// export default async function Page() {
//   const user = await getCurrentUser();

//   return (
//     <div className="pt-24 px-6">
//       <h3 className="text-2xl font-semibold mb-8">Interview Generation</h3>

//       <Agent 
//         userName={user?.name ?? ""} 
//         userId={user?.id ?? ""} 
//         type="generate" 
//       />

//       <VapiInterviewWidget
//         assistantId="d7eea6f8-cda2-4b7e-8dc8-c1325f6ff908"
//         publicKey="3b041dc6-b894-4a4e-b48b-d9a1458dac92"
//         workflowId="babeb0a0-8881-4555-9845-fe598b3f17a9"
//       />
//     </div>
//   );
// }

