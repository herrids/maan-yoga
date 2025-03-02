"use client";

import { useState, useMemo, useEffect } from "react";
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

interface PoseCardModalProps {
  children: React.ReactNode;
  allPoses: any[];
  flowPose: any;
  updateFlowPose: (flowPose: any) => void;
  deleteFlowPose: (id: string) => void;
  addNew?: boolean;
}

export function PoseCardModal({
  children,
  allPoses = [],
  flowPose,
  updateFlowPose,
  deleteFlowPose,
}: PoseCardModalProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [tempText, setTempText] = useState(flowPose.text || "");

  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("pose");
  const [topPoses, setTopPoses] = useState<any[]>([]);
  const [isShowingAllPoses, setIsShowingAllPoses] = useState(false);
  const DEFAULT_POSE_LIMIT = 3;

  // Filter poses based on search query
  const filteredPoses = useMemo(() => {
    if (!searchQuery.trim()) return allPoses;

    return allPoses.filter((pose) =>
      [
        pose.name_german || "",
        pose.name_english || "",
        pose.name_sanskrit || "",
      ].some((name) => name.toLowerCase().includes(searchQuery.toLowerCase())),
    );
  }, [allPoses, searchQuery]);

  useEffect(() => {
    setTopPoses(
      isShowingAllPoses
        ? filteredPoses
        : filteredPoses.slice(0, DEFAULT_POSE_LIMIT),
    );
  }, [filteredPoses, isShowingAllPoses]);

  // Update handlers
  const handleDetailsChange = (keys: any, type: "breath" | "equipment") => {
    const keysArray = Array.from(keys);
    const newValue = keysArray.length === 0 ? null : (keysArray[0] as string);

    updateFlowPose({ ...flowPose, [type]: newValue });
  };

  const handleSaveText = () => {
    if (flowPose.type === "text") {
      updateFlowPose({
        ...flowPose,
        breath: null,
        equipment: null,
        pose_id: null,
        type: "text",
        text: tempText || null,
      });
    } else {
      updateFlowPose({ ...flowPose, text: tempText || null });
    }
  };

  const handleToggleChange = (isChecked: boolean) => {
    updateFlowPose({ ...flowPose, type: isChecked ? "image" : "text" });
  };

  const handlePoseChange = (pose: any) => {
    const updatedPose = { ...flowPose, pose_id: pose.id, pose };

    updateFlowPose(updatedPose);
  };

  const handleDeleteFlowPose = () => {
    deleteFlowPose(flowPose.id);
    setIsOpen(false);
  };

  const showAllPoses = () => {
    setIsShowingAllPoses(!isShowingAllPoses);
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
              isDisabled={flowPose.type === "text"}
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
                        isSelected={flowPose.type === "image"}
                        size="md"
                        startContent={<ImageIcon size={18} />}
                        onValueChange={handleToggleChange}
                      />
                      <span className="text-sm text-gray-500">
                        {flowPose.type === "image" ? "Image" : "Text"}
                      </span>
                    </div>
                  </div>

                  {flowPose.type === "image" ? (
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
                        <div className="grid grid-cols-3 gap-2 mt-2 max-h-[350px] overflow-y-auto">
                          {topPoses.map((pose) => (
                            <div
                              key={pose.id}
                              className={`cursor-pointer rounded-md overflow-hidden border-2 p-1 flex flex-col items-center ${pose.id === flowPose.pose_id ? "border-primary" : "border-transparent"}`}
                              role="button"
                              tabIndex={0}
                              onClick={() => handlePoseChange(pose)}
                              onKeyDown={(e) => {
                                if (e.key === "Enter" || e.key === " ") {
                                  handlePoseChange(pose);
                                }
                              }}
                            >
                              <div className="w-full aspect-square bg-gray-100 rounded-md overflow-hidden relative">
                                <Image
                                  fill
                                  alt={pose.name_german || pose.name_english}
                                  className="object-contain"
                                  src={`https://kbmjjri0rfvoollc.public.blob.vercel-storage.com/poses/${pose.id}.svg`}
                                />
                              </div>
                              <span className="text-xs mt-1 text-center truncate w-full">
                                {pose.name_german || pose.name_english}
                              </span>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-sm text-gray-500 mt-2">
                          No poses found
                        </p>
                      )}
                      <div className="flex justify-center">
                        <span
                          className="cursor-pointer text-sm text-gray-500 mt-2 hover:text-primary"
                          role="button"
                          tabIndex={0}
                          onClick={() => showAllPoses()}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                              showAllPoses();
                            }
                          }}
                        >
                          {isShowingAllPoses
                            ? "Zeige weniger Posen"
                            : "Alle Posen anzeigen"}
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-2">
                      <Textarea
                        className="w-full"
                        placeholder="Enter custom pose text..."
                        value={tempText}
                        onChange={(e) => setTempText(e.target.value)}
                      />
                      <div className="flex gap-2">
                        <Button
                          color="primary"
                          size="sm"
                          onPress={handleSaveText}
                        >
                          Save
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </Tab>
              <Tab
                key="details"
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
                      selectedKeys={flowPose.breath ? [flowPose.breath] : []}
                      selectionMode="single"
                      variant="flat"
                      onSelectionChange={(keys) =>
                        handleDetailsChange(keys, "breath")
                      }
                    >
                      <ListboxSection>
                        <ListboxItem key="Einatmen" className="text-gray-500">
                          Einatmen
                        </ListboxItem>
                        <ListboxItem key="Ausatmen" className="text-gray-500">
                          Ausatmen
                        </ListboxItem>
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
                        flowPose.equipment ? [flowPose.equipment] : []
                      }
                      selectionMode="single"
                      variant="flat"
                      onSelectionChange={(keys) =>
                        handleDetailsChange(keys, "equipment")
                      }
                    >
                      <ListboxSection>
                        <ListboxItem key="Block" className="text-gray-500">
                          Block
                        </ListboxItem>
                        <ListboxItem key="Strap" className="text-gray-500">
                          Strap
                        </ListboxItem>
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
                    minRows={2}
                    placeholder="Add notes about this pose..."
                    value={tempText}
                    onChange={(e) => setTempText(e.target.value)}
                  />
                  <div className="flex gap-2">
                    <Button color="primary" size="sm" onPress={handleSaveText}>
                      Save
                    </Button>
                  </div>
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
              onPress={handleDeleteFlowPose}
            >
              Delete Pose
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
