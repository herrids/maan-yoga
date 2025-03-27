import { notFound } from "next/navigation";

import { FlowHeader } from "@/components/flows/FlowHeader";
import { FlowDescription } from "@/components/flows/FlowDescription";
import { FlowPosesList } from "@/components/flowPoses/FlowPosesList";
import { getFlowById } from "@/services/flowService";

export default async function FlowDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const flowId = (await params).id;

  const flow = await getFlowById(flowId);

  if (!flow) {
    notFound();
  }

  // Format the date to a readable string
  const formattedDate = new Date(flow.created_at).toLocaleDateString("de-DE", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="container mx-auto px-6 py-8">
      <FlowHeader
        formattedDate={formattedDate}
        id={flow.id}
        name={flow.name || ""}
      />

      <div className="flex flex-col gap-8 mt-8">
        <FlowDescription id={flow.id} value={flow.description} />
        <FlowPosesList flowId={flow.id} initialFlowPoses={flow.poses} />
      </div>
    </div>
  );
}
