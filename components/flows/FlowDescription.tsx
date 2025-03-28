"use client";

import { Card, CardBody } from "@heroui/react";
import { Textarea } from "@heroui/react";
import { Button } from "@heroui/react";
import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Pencil } from "lucide-react";

import { trpc } from "@/utils/trpc";

interface FlowDescriptionProps {
  id: string;
  value: string | null;
}

export function FlowDescription({ id, value }: FlowDescriptionProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [description, setDescription] = useState(value || "");
  const [isHovering, setIsHovering] = useState(false);
  const flowMutation = trpc.flow.updateFlow.useMutation();
  const t = useTranslations("flows");

  useEffect(() => {
    if (isEditing) {
      //textareaRef.current.focus();
    }
  }, [isEditing]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    flowMutation.mutate({ id, description });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setDescription(value || "");
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
              placeholder={t("descriptionPlaceholder")}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <div className="flex gap-2">
              <Button color="primary" size="sm" onPress={handleSave}>
                {t("save")}
              </Button>
              <Button size="sm" variant="bordered" onPress={handleCancel}>
                {t("cancel")}
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <span className={`${description ? "" : "text-gray-500"}`}>
              {description || t("noDescription")}
            </span>
            <Button
              isIconOnly
              aria-label={t("editDescription")}
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
