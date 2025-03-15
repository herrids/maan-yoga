"use client";

import { Button } from "@heroui/react";
import { ArrowLeft, MoreVertical, Trash } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Popover, PopoverTrigger, PopoverContent } from "@heroui/react";
import { useRouter } from "next/navigation";

import { ConfirmationModal } from "../modals/ConfirmationModal";

import { FlowName } from "./FlowName";

import { trpc } from "@/utils/trpc";

interface FlowHeaderProps {
  id: string;
  name: string;
  formattedDate: string;
}

export function FlowHeader({ id, name, formattedDate }: FlowHeaderProps) {
  const router = useRouter();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const flowUpdateMutation = trpc.flow.updateFlow.useMutation();
  const flowDeleteMutation = trpc.flow.deleteFlow.useMutation({
    onSuccess: () => {
      router.push("/flows");
    },
  });

  const updateFlow = (flow: object) => {
    flowUpdateMutation.mutate({ ...flow, id });
  };

  const handleDeleteClick = () => {
    setIsPopoverOpen(false);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    setIsDeleteModalOpen(false);
    flowDeleteMutation.mutate({ flowId: id });
  };

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
          <FlowName size="sm" updateFlow={updateFlow} value={name} />
          <p className="text-default-500">Erstellt am {formattedDate}</p>
        </div>
        <div>
          <Popover
            isOpen={isPopoverOpen}
            placement="bottom-end"
            onOpenChange={setIsPopoverOpen}
          >
            <PopoverTrigger>
              <Button isIconOnly aria-label="More options" variant="light">
                <MoreVertical size={20} />
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <div className="p-1">
                <Button
                  className="w-full justify-start text-danger"
                  color="danger"
                  startContent={<Trash size={18} />}
                  variant="light"
                  onPress={handleDeleteClick}
                >
                  Löschen
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        cancelLabel="Abbrechen"
        confirmColor="danger"
        confirmLabel="Löschen"
        content={`Bist du sicher, dass du "${name}" löschen möchtest? Diese Aktion kann nicht rückgängig gemacht werden.`}
        isOpen={isDeleteModalOpen}
        title="Flow löschen"
        onConfirm={handleConfirmDelete}
        onOpenChange={setIsDeleteModalOpen}
      />
    </>
  );
}
