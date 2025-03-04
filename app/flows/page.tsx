export const dynamic = "force-dynamic";

import { NewFlowButton } from "@/components/newFlowButton";
import { FlowsList } from "@/components/flows/FlowsList";
import { title } from "@/components/primitives";
import { getUserFlows } from "@/services/flowService";

export default async function FlowsPage() {
  const userEmail = "nassimeisenbach@googlemail.com";
  const flows = await getUserFlows(userEmail);

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-8">
        <h1 className={title({ size: "sm" })}>Meine Yoga Flows</h1>
        <NewFlowButton flowCount={flows.length} userEmail={userEmail} />
      </div>
      <FlowsList flows={flows} />
    </div>
  );
}
