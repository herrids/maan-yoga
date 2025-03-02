import { Card, CardBody, CardHeader } from "@heroui/card";
import Link from "next/link";
import { Flow } from "@prisma/client";

interface FlowCardProps {
  flow: Flow;
}

export function FlowCard({ flow }: FlowCardProps) {
  const formattedDate = new Date(flow.created_at).toLocaleDateString("de-DE", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Link className="block" href={`/flows/${flow.id}`}>
      <Card className="max-w-md hover:shadow-md transition-shadow duration-300 cursor-pointer">
        <CardHeader className="flex gap-3">
          <div className="flex flex-col">
            <p className="text-md font-semibold">{flow.name}</p>
            <p className="text-small text-default-500">
              Erstellt am {formattedDate}
            </p>
          </div>
        </CardHeader>
        <CardBody>
          <p>{flow.description || "Keine Beschreibung vorhanden."}</p>
        </CardBody>
      </Card>
    </Link>
  );
}
