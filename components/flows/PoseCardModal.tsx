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
import { Tabs, Tab } from "@heroui/tabs";
import { Textarea } from "@heroui/input";
import {
  Trash,
  NotebookTabs,
  Search,
  Edit,
  FileText,
  Wind,
  Dumbbell,
  Image as ImageIcon,
  Type as TextIcon,
} from "lucide-react";
import Image from "next/image";
import { Switch } from "@heroui/switch";

import { getAllPoses } from "@/services/supabaseService";

interface PoseCardModalProps {
  children: React.ReactNode;
  onPoseChange?: (poseId: string) => void;
  onDelete?: () => void;
  onNoteChange?: (note: string | null) => void;
  onBreathChange?: (breath: string | null) => void;
  onEquipmentChange?: (equipment: string | null) => void;
  ontextToggleChange?: (istextToggle: boolean) => void;
  onCustomTextChange?: (text: string) => void;
  currentPoseId?: string;
  currentBreath?: string | null;
  currentEquipment?: string | null;
  currentNote?: string | null;
  istextToggle?: boolean;
  customText?: string;
}

export function PoseCardModal({
  children,
  onPoseChange,
  onDelete,
  onNoteChange,
  onBreathChange,
  onEquipmentChange,
  ontextToggleChange,
  onCustomTextChange,
  currentPoseId = "",
  currentBreath = null,
  currentEquipment = null,
  currentNote = null,
  istextToggle = true,
  customText = "",
}: PoseCardModalProps) {
  const [selectedBreath, setSelectedBreath] = React.useState<string | null>(
    currentBreath,
  );
  const [selectedEquipment, setSelectedEquipment] = React.useState<
    string | null
  >(currentEquipment);
  const [note, setNote] = React.useState<string | null>(currentNote);
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
  const [activeTab, setActiveTab] = React.useState("pose");
  const [textToggle, settextToggle] = React.useState<boolean>(istextToggle);
  const [poseText, setPoseText] = React.useState<string>(customText);

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

  // Update handlers
  const handleBreathChange = (keys: any) => {
    const keysArray = Array.from(keys);
    const newBreath = keysArray.length === 0 ? null : (keysArray[0] as string);

    setSelectedBreath(newBreath);
    if (onBreathChange) {
      onBreathChange(newBreath);
    }
  };

  const handleEquipmentChange = (keys: any) => {
    const keysArray = Array.from(keys);
    const newEquipment =
      keysArray.length === 0 ? null : (keysArray[0] as string);

    setSelectedEquipment(newEquipment);
    if (onEquipmentChange) {
      onEquipmentChange(newEquipment);
    }
  };

  const handleNoteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newNote = e.target.value || null;

    setNote(newNote);
    if (onNoteChange) {
      onNoteChange(newNote);
    }
  };

  const handletextToggleChange = (isChecked: boolean) => {
    settextToggle(isChecked);
    if (ontextToggleChange) {
      ontextToggleChange(isChecked);
    }
  };

  const handleCustomTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPoseText(e.target.value);
    if (onCustomTextChange) {
      onCustomTextChange(e.target.value);
    }
  };

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

      <Modal isOpen={isOpen} placement="top" onOpenChange={setIsOpen}>
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            <h3 className="text-lg font-medium">Modify Pose</h3>
          </ModalHeader>
          <ModalBody>
            <Tabs
              aria-label="Pose options"
              className="w-full"
              classNames={{
                tabList: "w-full grid grid-cols-3 gap-2",
                tab: "flex-1 justify-center",
              }}
              isDisabled={!textToggle}
              selectedKey={activeTab}
              onSelectionChange={(key) => setActiveTab(key as string)}
            >
              <Tab
                key="pose"
                title={
                  <div className="flex items-center gap-2">
                    <Edit size={16} />
                    <span>Pose</span>
                  </div>
                }
              >
                <div className="flex flex-col gap-4 mt-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <Switch
                        color="primary"
                        endContent={<TextIcon size={18} />}
                        isSelected={textToggle}
                        size="md"
                        startContent={<ImageIcon size={18} />}
                        onValueChange={handletextToggleChange}
                      />
                      <span className="text-sm text-gray-500">
                        {textToggle ? "Image" : "Text"}
                      </span>
                    </div>
                  </div>

                  {textToggle ? (
                    <div className="flex flex-col gap-2">
                      <Input
                        className="w-full"
                        placeholder="Search poses..."
                        startContent={
                          <Search className="text-gray-400" size={16} />
                        }
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
                              onClick={() =>
                                onPoseChange && onPoseChange(pose.id)
                              }
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
                        <p className="text-sm text-gray-500 mt-2">
                          No poses found
                        </p>
                      )}
                    </div>
                  ) : (
                    <div className="flex flex-col gap-2">
                      <Input
                        className="w-full"
                        placeholder="Enter custom pose text..."
                        value={poseText}
                        onChange={handleCustomTextChange}
                      />
                    </div>
                  )}
                </div>
              </Tab>
              <Tab
                key="breath"
                title={
                  <div className="flex items-center gap-2">
                    <NotebookTabs size={16} />
                    <span>Details</span>
                  </div>
                }
              >
                <div className="flex flex-col sm:flex-row gap-4 mt-4">
                  <div className="flex flex-col gap-2 sm:flex-1">
                    <h4 className="text-sm font-medium flex items-center gap-1">
                      <Wind size={16} />
                      Breath Instructions
                    </h4>
                    <Listbox
                      aria-label="Select Breath"
                      disallowEmptySelection={false}
                      selectedKeys={selectedBreath ? [selectedBreath] : []}
                      selectionMode="single"
                      variant="flat"
                      onSelectionChange={handleBreathChange}
                    >
                      <ListboxSection>
                        <ListboxItem key="Einatmen">Einatmen</ListboxItem>
                        <ListboxItem key="Ausatmen">Ausatmen</ListboxItem>
                      </ListboxSection>
                    </Listbox>
                  </div>

                  <div className="flex flex-col gap-2 sm:flex-1">
                    <h4 className="text-sm font-medium flex items-center gap-1">
                      <Dumbbell size={16} />
                      Equipment
                    </h4>
                    <Listbox
                      aria-label="Select Equipment"
                      disallowEmptySelection={false}
                      selectedKeys={
                        selectedEquipment ? [selectedEquipment] : []
                      }
                      selectionMode="single"
                      variant="flat"
                      onSelectionChange={handleEquipmentChange}
                    >
                      <ListboxSection>
                        <ListboxItem key="Block">Block</ListboxItem>
                        <ListboxItem key="Strap">Strap</ListboxItem>
                      </ListboxSection>
                    </Listbox>
                  </div>
                </div>
              </Tab>
              <Tab
                key="notes"
                title={
                  <div className="flex items-center gap-2">
                    <FileText size={16} />
                    <span>Notes</span>
                  </div>
                }
              >
                <div className="flex flex-col gap-2 mt-4">
                  <h4 className="text-sm font-medium">Add Notes</h4>
                  <Textarea
                    className="w-full"
                    minRows={4}
                    placeholder="Add notes about this pose..."
                    value={note || ""}
                    onChange={handleNoteChange}
                  />
                </div>
              </Tab>
            </Tabs>
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
