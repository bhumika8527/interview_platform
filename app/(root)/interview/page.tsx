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



