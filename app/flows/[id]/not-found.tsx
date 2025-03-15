import { Button } from "@heroui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

import { title } from "@/components/common/primitives";

export default function FlowNotFound() {
  return (
    <div className="container mx-auto px-6 py-12 text-center">
      <h1 className={title({ size: "sm" })}>Flow nicht gefunden</h1>
      <p className="text-default-500 mt-4 mb-8">
        Der gesuchte Yoga Flow existiert nicht oder wurde gelöscht.
      </p>
      <Button
        as={Link}
        color="primary"
        href="/flows"
        startContent={<ArrowLeft size={18} />}
      >
        Zurück zur Übersicht
      </Button>
    </div>
  );
}
