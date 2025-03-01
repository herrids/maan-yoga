import { Button } from "@heroui/button";
import Link from "next/link";
import { Plus } from "lucide-react";

import { FlowCard } from "@/components/ui/FlowCard";

interface FlowsListProps {
  flows: any[];
}

export function FlowsList({ flows }: FlowsListProps) {
  return (
    <div>
      {!flows || flows.length === 0 ? (
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
