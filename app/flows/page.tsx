import { Button } from "@heroui/button";
import Link from "next/link";
import { Plus } from "lucide-react";

import { title } from "@/components/primitives";
import { FlowCard } from "@/components/ui/FlowCard";
import { getUserFlows } from "@/services/supabaseService";

export default async function FlowsPage() {
  const flows = await getUserFlows("nassimeisenbach@googlemail.com");

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-8">
        <h1 className={title({ size: "sm" })}>Meine Yoga Flows</h1>
        <Button
          as={Link}
          color="primary"
          href="/new"
          startContent={<Plus size={20} />}
        >
          Neuen Flow erstellen
        </Button>
      </div>

      {flows.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-default-500 mb-4">
            Du hast noch keine Yoga Flows erstellt.
          </p>
          <Button
            as={Link}
            color="primary"
            href="/new"
            startContent={<Plus size={20} />}
          >
            Ersten Flow erstellen
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {flows.map((flow) => (
            <FlowCard key={flow.id} flow={flow} />
          ))}
        </div>
      )}
    </div>
  );
}
