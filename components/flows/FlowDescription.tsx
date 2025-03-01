"use client";

import { Card, CardBody } from "@heroui/card";
import { Textarea } from "@heroui/input";
import { Button } from "@heroui/button";
import { useState, useEffect } from "react";
import { Pencil } from "lucide-react";

interface FlowDescriptionProps {
  description: string | null;
  onDescriptionChange?: (newDescription: string) => void;
}

export function FlowDescription({
  description,
  onDescriptionChange,
}: FlowDescriptionProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedDescription, setEditedDescription] = useState(description || "");
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    if (isEditing) {
      //textareaRef.current.focus();
    }
  }, [isEditing]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    if (onDescriptionChange) {
      onDescriptionChange(editedDescription);
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedDescription(description || "");
    setIsEditing(false);
  };

  return (
    <Card>
      <CardBody
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        {isEditing ? (
          <div className="space-y-2">
            <Textarea
              minRows={2}
              placeholder="Enter your description"
              value={editedDescription}
              onChange={(e) => setEditedDescription(e.target.value)}
            />
            <div className="flex gap-2">
              <Button color="primary" size="sm" onClick={handleSave}>
                Speichern
              </Button>
              <Button size="sm" variant="bordered" onClick={handleCancel}>
                Abbrechen
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <span className={`${description ? "" : "text-gray-500"}`}>
              {description || "Keine Beschreibung vorhanden. "}
            </span>
            <Button
              isIconOnly
              aria-label="Beschreibung bearbeiten"
              className="opacity-70 hover:opacity-100"
              size="sm"
              variant="light"
              onPress={handleEdit}
            >
              <Pencil
                className={`${isHovering ? "opacity-100" : "opacity-0"} transition-opacity`}
                size={16}
              />
            </Button>
          </div>
        )}
      </CardBody>
    </Card>
  );
}
