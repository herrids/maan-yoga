import { useState, useRef, useEffect } from "react";
import { Button } from "@heroui/react";
import { Check, Pencil } from "lucide-react";

import { title as titleClass } from "@/components/primitives";
interface EditableNameProps {
  value: string;
  size?: "sm" | "md" | "lg";
  className?: string;
  updateFlow: (flow: object) => void;
}

export function EditableName({
  value,
  size = "sm",
  className = "",
  updateFlow,
}: EditableNameProps) {
  const [name, setName] = useState(value);
  const [isEditing, setIsEditing] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  useEffect(() => {
    setName(value);
  }, [value]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleSave = () => {
    if (name.trim() !== "") {
      setIsEditing(false);
      updateFlow({ name: name });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSave();
    } else if (e.key === "Escape") {
      setName(value);
      setIsEditing(false);
    }
  };

  return (
    <>
      {isEditing ? (
        <div className="flex items-center gap-2">
          <input
            ref={inputRef}
            className={`${titleClass({ size })} bg-transparent border-b border-primary focus:outline-none px-1 ${className}`}
            type="text"
            value={name}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />
          <Button
            isIconOnly
            aria-label="Save name"
            size="sm"
            variant="light"
            onPress={handleSave}
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
          <h1 className={`${titleClass({ size })} ${className}`}>{name}</h1>
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
    </>
  );
}
