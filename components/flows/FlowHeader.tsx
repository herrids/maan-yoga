"use client";

import { Button } from "@heroui/button";
import { ArrowLeft, MoreVertical, Trash, Pencil, Check } from "lucide-react";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { Popover, PopoverTrigger, PopoverContent } from "@heroui/popover";

import { ConfirmationModal } from "../modals/ConfirmationModal";

import { title } from "@/components/primitives";

interface FlowHeaderProps {
  name: string;
  formattedDate: string;
  onDelete?: () => void;
  onNameChange?: (newName: string) => void;
}

export function FlowHeader({
  name,
  formattedDate,
  onDelete,
  onNameChange,
}: FlowHeaderProps) {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(name);
  const [isHovering, setIsHovering] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleDeleteClick = () => {
    setIsPopoverOpen(false);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (onDelete) {
      onDelete();
    }
    setIsDeleteModalOpen(false);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedName(e.target.value);
  };

  const handleSaveName = () => {
    if (editedName.trim() !== "" && onNameChange) {
      onNameChange(editedName);
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSaveName();
    } else if (e.key === "Escape") {
      setEditedName(name);
      setIsEditing(false);
    }
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
          {isEditing ? (
            <div className="flex items-center gap-2">
              <input
                ref={inputRef}
                className={`${title({ size: "sm" })} bg-transparent border-b border-primary focus:outline-none px-1`}
                type="text"
                value={editedName}
                onChange={handleNameChange}
                onKeyDown={handleKeyDown}
              />
              <Button
                isIconOnly
                aria-label="Save name"
                size="sm"
                variant="light"
                onPress={handleSaveName}
              >
                <Check className="text-primary" size={18} />
              </Button>
            </div>
          ) : (
            <div
              className="flex items-center gap-2 group relative"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              <h1 className={title({ size: "sm" })}>{name}</h1>
              <Button
                isIconOnly
                aria-label="Edit name"
                className="opacity-70 hover:opacity-100"
                size="sm"
                variant="light"
                onPress={handleEditClick}
              >
                <Pencil
                  className={`${isHovering ? "opacity-100" : "opacity-0"} transition-opacity`}
                  size={16}
                />
              </Button>
            </div>
          )}
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
