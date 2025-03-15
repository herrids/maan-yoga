export const dynamic = "force-dynamic";

import { NewFlowButton } from "@/components/flows/newFlowButton";
import { FlowsList } from "@/components/flows/FlowsList";
import { title } from "@/components/common/primitives";
import { getUserFlows } from "@/services/flowService";
import { createClient } from "@/utils/supabase/server";

export default async function FlowsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const flows = await getUserFlows(user?.email);

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-8">
        <h1 className={title({ size: "sm" })}>Meine Yoga Flows</h1>
        <NewFlowButton flowCount={flows.length} userEmail={user?.email} />
      </div>
      <FlowsList flows={flows} />
    </div>
  );
}
