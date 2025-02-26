import { title } from "@/components/primitives";
import { getYogaFlowById } from "@/services/supabaseService";
import { Button } from "@heroui/button";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Divider } from "@heroui/divider";
import { ArrowLeft, Edit, Trash } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function FlowDetailPage({ params }: { params: { id: string } }) {
  // Ensure params is fully resolved before accessing id
  const { id } = await params;
  
  const flow = await getYogaFlowById(id);
  
  if (!flow) {
    notFound();
  }

  console.log(flow);

  // Format the date to a readable string
  const formattedDate = flow.createdAt.toLocaleDateString("de-DE", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="container mx-auto px-6 py-8">
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

      <div className="flex flex-col gap-8">
        <div className="flex justify-between items-start">
          <div>
            <h1 className={title({ size: "sm" })}>{flow.name}</h1>
            <p className="text-default-500">Erstellt am {formattedDate}</p>
          </div>
          <div className="flex gap-2">
            <Button 
              as={Link}
              href={`/flows/${flow.id}/edit`}
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
            >
              Löschen
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <h2 className="text-xl font-semibold">Beschreibung</h2>
          </CardHeader>
          <CardBody>
            <p>{flow.description || "Keine Beschreibung vorhanden."}</p>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Posen</h2>
              <p className="text-default-500">
                {flow.poses?.length || 0} {flow.poses?.length === 1 ? "Pose" : "Posen"}
              </p>
            </div>
          </CardHeader>
          <Divider />
          <CardBody>
            {!flow.poses || flow.poses.length === 0 ? (
              <p className="text-default-500">Keine Posen hinzugefügt.</p>
            ) : (
              <div className="flex flex-col gap-4">
                {flow.poses.map((pose, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                      {index + 1}
                    </div>
                    <div className="flex-grow">
                      <p className="font-medium">{pose}</p>
                    </div>
                    <span className="text-xs px-2 py-1 rounded-full bg-primary-100 text-primary-700">
                      {index === 0 ? "Start" : index === flow.poses!.length - 1 ? "Ende" : "Übergang"}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </CardBody>
        </Card>
      </div>
    </div>
  );
} 