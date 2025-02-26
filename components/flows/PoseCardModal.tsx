"use client";

import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@heroui/modal";
import { Button } from "@heroui/button";
import { Listbox, ListboxItem, ListboxSection } from "@heroui/listbox";
import { Input } from "@heroui/input";
import { Divider } from "@heroui/divider";
import { Trash, Edit, Wind, Dumbbell, Search } from "lucide-react";
import Image from "next/image";

import { getAllPoses } from "@/services/supabaseService";

interface PoseCardModalProps {
  children: React.ReactNode;
  onPoseChange?: (poseId: string) => void;
  onDelete?: () => void;
  currentPoseId?: string;
  currentBreath?: string | null;
  currentEquipment?: string | null;
}

export function PoseCardModal({
  children,
  onPoseChange,
  onDelete,
  currentPoseId = "",
  currentBreath = null,
  currentEquipment = null,
}: PoseCardModalProps) {
  const [selectedBreath, setSelectedBreath] = React.useState<string | null>(
    currentBreath,
  );
  const [selectedEquipment, setSelectedEquipment] = React.useState<
    string | null
  >(currentEquipment);
  const [searchQuery, setSearchQuery] = React.useState<string>("");
  const [allPoses, setAllPoses] = React.useState<
    Array<{
      id: string;
      name: string;
      name_german?: string;
      name_english?: string;
      name_sanskrit?: string;
    }>
  >([]);
  const [isOpen, setIsOpen] = React.useState(false);

  React.useEffect(() => {
    if (isOpen) {
      const fetchPoses = async () => {
        try {
          const poses = await getAllPoses();

          setAllPoses(poses);
        } catch (error) {
          throw new Error(
            "Error fetching poses: " +
              (error instanceof Error ? error.message : String(error)),
          );
        }
      };

      fetchPoses();
    }
  }, [isOpen]);

  // Get display name for each pose (prefer German, fallback to English)
  const getPoseName = (pose: any) => {
    return (
      pose.name_german ||
      pose.name_english ||
      pose.name ||
      pose.name_sanskrit ||
      "Unnamed Pose"
    );
  };

  // Filter poses based on search query
  const filteredPoses = React.useMemo(() => {
    if (!searchQuery.trim()) return allPoses;

    const query = searchQuery.toLowerCase();

    return allPoses.filter((pose) => {
      const germanName = (pose.name_german || "").toLowerCase();
      const englishName = (pose.name_english || "").toLowerCase();
      const sanskritName = (pose.name_sanskrit || "").toLowerCase();
      const name = (pose.name || "").toLowerCase();

      return (
        germanName.includes(query) ||
        englishName.includes(query) ||
        sanskritName.includes(query) ||
        name.includes(query)
      );
    });
  }, [allPoses, searchQuery]);

  // Get the first 3 matching poses
  const topPoses = filteredPoses.slice(0, 3);

  return (
    <>
      <div
        className="cursor-pointer w-full h-full"
        role="button"
        tabIndex={0}
        onClick={() => setIsOpen(true)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            setIsOpen(true);
          }
        }}
      >
        {children}
      </div>

      <Modal isOpen={isOpen} placement="center" onOpenChange={setIsOpen}>
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            <h3 className="text-lg font-medium">Modify Pose</h3>
          </ModalHeader>
          <ModalBody>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <Edit size={16} />
                Change Pose
                {/* Search input for poses */}
                <Input
                  className="w-full"
                  placeholder="Search poses..."
                  startContent={<Search className="text-gray-400" size={16} />}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                {/* Display top 3 matching poses as images */}
                {topPoses.length > 0 ? (
                  <div className="grid grid-cols-3 gap-2 mt-2">
                    {topPoses.map((pose) => (
                      <div
                        key={pose.id}
                        className={`cursor-pointer rounded-md overflow-hidden border-2 p-1 flex flex-col items-center ${currentPoseId === pose.id ? "border-primary" : "border-transparent"}`}
                        role="button"
                        tabIndex={0}
                        onClick={() => onPoseChange && onPoseChange(pose.id)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            onPoseChange && onPoseChange(pose.id);
                          }
                        }}
                      >
                        <div className="w-full aspect-square bg-gray-100 rounded-md overflow-hidden relative">
                          <Image
                            fill
                            alt={getPoseName(pose)}
                            className="object-contain"
                            src={`https://kbmjjri0rfvoollc.public.blob.vercel-storage.com/poses/${pose.id}.svg`}
                          />
                        </div>
                        <span className="text-xs mt-1 text-center truncate w-full">
                          {getPoseName(pose)}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-500 mt-2">No poses found</p>
                )}
              </div>

              <Divider className="my-1" />

              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex flex-col gap-2 sm:flex-1">
                  <Wind size={16} />
                  Breath Instructions
                  <Listbox
                    aria-label="Select Breath"
                    disallowEmptySelection={false}
                    selectedKeys={selectedBreath ? [selectedBreath] : []}
                    selectionMode="single"
                    variant="flat"
                    onSelectionChange={(keys) => {
                      const keysArray = Array.from(keys);

                      if (keysArray.length === 0) {
                        setSelectedBreath(null);
                      } else {
                        setSelectedBreath(keysArray[0] as string);
                      }
                    }}
                  >
                    <ListboxSection>
                      <ListboxItem key="Einatmen">Einatmen</ListboxItem>
                      <ListboxItem key="Ausatmen">Ausatmen</ListboxItem>
                    </ListboxSection>
                  </Listbox>
                </div>

                <div className="flex flex-col gap-2 sm:flex-1">
                  <Dumbbell size={16} />
                  Equipment
                  <Listbox
                    aria-label="Select Equipment"
                    disallowEmptySelection={false}
                    selectedKeys={selectedEquipment ? [selectedEquipment] : []}
                    selectionMode="single"
                    variant="flat"
                    onSelectionChange={(keys) => {
                      const keysArray = Array.from(keys);

                      if (keysArray.length === 0) {
                        setSelectedEquipment(null);
                      } else {
                        setSelectedEquipment(keysArray[0] as string);
                      }
                    }}
                  >
                    <ListboxSection>
                      <ListboxItem key="Block">Block</ListboxItem>
                      <ListboxItem key="Strap">Strap</ListboxItem>
                    </ListboxSection>
                  </Listbox>
                </div>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button
              color="danger"
              size="sm"
              startContent={<Trash size={16} />}
              variant="light"
              onPress={onDelete}
            >
              Delete Pose
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
