import { getFlow } from "@/services/supabaseService";
import { notFound } from "next/navigation";
import { FlowHeader } from "@/components/flows/FlowHeader";
import { FlowDescription } from "@/components/flows/FlowDescription";
import { PosesList } from "@/components/flows/PosesList";

export default async function FlowDetailPage({ params }: { params: { id: string } }) {
  // Ensure params is fully resolved before accessing id
  const { id } = await params;
  
  const flow = await getFlow(id);
  
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
        id={flow.id}
        name={flow.name}
        formattedDate={formattedDate}
      />

      <div className="flex flex-col gap-8 mt-8">
        <FlowDescription description={flow.description} />
        <PosesList poses={flow.poses} />
      </div>
    </div>
  );
} 