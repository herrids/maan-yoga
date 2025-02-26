import { Button } from "@heroui/button";
import { ArrowLeft, Edit, Trash } from "lucide-react";
import Link from "next/link";

import { title } from "@/components/primitives";

interface FlowHeaderProps {
  id: string;
  name: string;
  formattedDate: string;
  onDelete?: () => void;
}

export function FlowHeader({
  id,
  name,
  formattedDate,
  onDelete,
}: FlowHeaderProps) {
  return (
    <>
      <div className="mb-6">
        <Button
          as={Link}
          color="default"
          href="/flows"
          startContent={<ArrowLeft size={18} />}
          variant="light"
        >
          Zurück zur Übersicht
        </Button>
      </div>

      <div className="flex justify-between items-start">
        <div>
          <h1 className={title({ size: "sm" })}>{name}</h1>
          <p className="text-default-500">Erstellt am {formattedDate}</p>
        </div>
        <div className="flex gap-2">
          <Button
            as={Link}
            color="primary"
            href={`/flows/${id}/edit`}
            startContent={<Edit size={18} />}
            variant="flat"
          >
            Bearbeiten
          </Button>
          <Button
            color="danger"
            startContent={<Trash size={18} />}
            variant="flat"
            onPress={onDelete}
          >
            Löschen
          </Button>
        </div>
      </div>
    </>
  );
}
