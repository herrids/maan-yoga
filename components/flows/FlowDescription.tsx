import { Card, CardBody, CardHeader } from "@heroui/card";

interface FlowDescriptionProps {
  description: string | null;
}

export function FlowDescription({ description }: FlowDescriptionProps) {
  return (
    <Card>
      <CardHeader>
        <h2 className="text-xl font-semibold">Beschreibung</h2>
      </CardHeader>
      <CardBody>
        <p>{description || "Keine Beschreibung vorhanden."}</p>
      </CardBody>
    </Card>
  );
} 