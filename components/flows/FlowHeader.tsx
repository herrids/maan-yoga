import { title } from "@/components/primitives";
import { Button } from "@heroui/button";
import { ArrowLeft, Edit, Trash } from "lucide-react";
import Link from "next/link";

interface FlowHeaderProps {
  id: string;
  name: string;
  formattedDate: string;
  onDelete?: () => void;
}

export function FlowHeader({ id, name, formattedDate, onDelete }: FlowHeaderProps) {
  return (
    <>
      <div className="mb-6">
        <Button 
          as={Link} 
          href="/flows" 
          variant="light" 
          color="default" 
          startContent={<ArrowLeft size={18} />}
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
            href={`/flows/${id}/edit`}
            variant="flat" 
            color="primary"
            startContent={<Edit size={18} />}
          >
            Bearbeiten
          </Button>
          <Button 
            variant="flat" 
            color="danger"
            startContent={<Trash size={18} />}
            onPress={onDelete}
          >
            Löschen
          </Button>
        </div>
      </div>
    </>
  );
} 