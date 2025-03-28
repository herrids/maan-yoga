"use client";

import { useState, useMemo, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Button, Card, CardBody, CardHeader, CardFooter } from "@heroui/react";
import { Listbox, ListboxItem, ListboxSection } from "@heroui/react";
import { Input } from "@heroui/react";
import { Tabs, Tab } from "@heroui/react";
import { Textarea } from "@heroui/react";
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
  X,
} from "lucide-react";
import { Switch } from "@heroui/react";
import { FlowPose, Pose } from "@prisma/client";

import PoseImage from "../common/PoseImage";

interface FlowPoseEditProps {
  allPoses: Pose[];
  flowPose: FlowPose;
  updateFlowPose: (flowPose: FlowPose) => void;
  deleteFlowPose: (id: string) => void;
  addNew?: boolean;
  isOpen: boolean;
  onClose: () => void;
}

export function FlowPoseEdit({
  allPoses = [],
  flowPose,
  updateFlowPose,
  deleteFlowPose,
  isOpen,
  onClose,
}: FlowPoseEditProps) {
  const t = useTranslations("flowPoses");
  const locale = useLocale();
  const [searchQuery, setSearchQuery] = useState("");
  const [localFlowPose, setLocalFlowPose] = useState<FlowPose>(flowPose);

  const [activeTab, setActiveTab] = useState("pose");
  const [topPoses, setTopPoses] = useState<Pose[]>([]);
  const [isShowingAllPoses, setIsShowingAllPoses] = useState(false);
  const DEFAULT_POSE_LIMIT = 3;

  // Filter poses based on search query
  const filteredPoses = useMemo(() => {
    if (!searchQuery.trim()) {
      if (localFlowPose.pose_id) {
        const currentPose = allPoses.find(
          (pose) => pose?.id === localFlowPose.pose_id,
        );

        return [
          currentPose,
          ...allPoses.filter((pose) => pose?.id !== localFlowPose.pose_id),
        ];
      }

      return allPoses;
    }

    return allPoses.filter((pose) =>
      [
        pose.name_german || "",
        pose.name_english || "",
        pose.name_sanskrit || "",
      ].some((name) => name.toLowerCase().includes(searchQuery.toLowerCase())),
    );
  }, [allPoses, searchQuery, isOpen]);

  useEffect(() => {
    setTopPoses(
      isShowingAllPoses
        ? filteredPoses
        : filteredPoses.slice(0, DEFAULT_POSE_LIMIT),
    );
  }, [filteredPoses, isShowingAllPoses]);

  // Reset tempText and localFlowPose when flowPose changes or modal opens
  useEffect(() => {
    setLocalFlowPose(flowPose);
  }, [flowPose, isOpen]);

  // Update handlers
  const handleDetailsChange = (keys: any, type: "breath" | "equipment") => {
    const keysArray = Array.from(keys);
    const newValue = keysArray.length === 0 ? null : (keysArray[0] as string);

    setLocalFlowPose({ ...localFlowPose, [type]: newValue });
  };

  const handleToggleChange = (isChecked: boolean) => {
    setLocalFlowPose({ ...localFlowPose, type: isChecked ? "image" : "text" });
  };

  const handlePoseChange = (pose: any) => {
    setLocalFlowPose({ ...localFlowPose, pose_id: pose.id });
  };

  const handleDeleteFlowPose = () => {
    deleteFlowPose(flowPose.id);
    onClose();
  };

  const showAllPoses = () => {
    setIsShowingAllPoses(!isShowingAllPoses);
  };

  const handleSaveAndClose = () => {
    updateFlowPose(localFlowPose);
    onClose();
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 px-4 sm:px-0">
          <div
            className="fixed inset-0 bg-black/50"
            role="button"
            tabIndex={0}
            onClick={onClose}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                onClose();
              }
            }}
          />
          <Card className="rounded-lg shadow-lg w-full max-w-md z-10 max-h-[90vh] overflow-auto">
            <CardHeader className="justify-between">
              <div>
                <h3 className="text-lg font-medium">{t("edit.modifyPose")}</h3>
              </div>
              <div>
                <button
                  className="p-1 rounded-full hover:bg-gray-100"
                  onClick={onClose}
                >
                  <X size={18} />
                </button>
              </div>
            </CardHeader>
            <CardBody>
              <Tabs
                aria-label={t("edit.poseOptions")}
                className="w-full"
                classNames={{
                  tabList: "w-full grid grid-cols-3 gap-2",
                  tab: "flex-1 justify-center",
                }}
                isDisabled={localFlowPose.type === "text"}
                selectedKey={activeTab}
                onSelectionChange={(key) => setActiveTab(key as string)}
              >
                <Tab
                  key="pose"
                  title={
                    <div className="flex items-center gap-2">
                      <Edit size={16} />
                      <span>{t("pose")}</span>
                    </div>
                  }
                >
                  <div className="flex flex-col gap-4 mt-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <span
                          className={`text-sm cursor-pointer ${
                            localFlowPose.type === "text"
                              ? "text-gray-500"
                              : "text-gray-300"
                          }`}
                          role="button"
                          tabIndex={0}
                          onClick={() => handleToggleChange(false)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                              handleToggleChange(false);
                            }
                          }}
                        >
                          {t("edit.text")}
                        </span>
                        <Switch
                          color="primary"
                          endContent={<TextIcon size={18} />}
                          isSelected={localFlowPose.type === "image"}
                          size="md"
                          startContent={<ImageIcon size={18} />}
                          onValueChange={handleToggleChange}
                        />
                        <span
                          className={`text-sm cursor-pointer ${
                            localFlowPose.type === "image"
                              ? "text-gray-500"
                              : "text-gray-300"
                          }`}
                          role="button"
                          tabIndex={0}
                          onClick={() => handleToggleChange(true)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                              handleToggleChange(true);
                            }
                          }}
                        >
                          {t("edit.image")}
                        </span>
                      </div>
                    </div>

                    {localFlowPose.type === "image" ? (
                      <div className="flex flex-col gap-2">
                        <Input
                          className="w-full"
                          placeholder={t("edit.searchPoses")}
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
                                key={pose?.id}
                                className={`cursor-pointer rounded-md overflow-hidden border-2 p-1 flex flex-col items-center ${pose?.id === localFlowPose.pose_id ? "border-primary" : "border-transparent"}`}
                                role="button"
                                tabIndex={0}
                                onClick={() => handlePoseChange(pose)}
                                onKeyDown={(e) => {
                                  if (e.key === "Enter" || e.key === " ") {
                                    handlePoseChange(pose);
                                  }
                                }}
                              >
                                <div className="w-full aspect-square bg-gray-100 dark:bg-gray-800 rounded-md overflow-hidden relative">
                                  <PoseImage
                                    name={
                                      pose.name_german ||
                                      pose.name_english ||
                                      "Yoga Pose"
                                    }
                                    poseId={pose.id}
                                  />
                                </div>
                                <span className="text-xs mt-1 text-center truncate w-full">
                                  {locale === "de"
                                    ? pose.name_german
                                    : pose.name_english}
                                </span>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-sm text-gray-500 mt-2">
                            {t("edit.noPosesFound")}
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
                              ? t("edit.showLessPoses")
                              : t("edit.showAllPoses")}
                          </span>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col gap-2">
                        <Textarea
                          className="w-full"
                          placeholder="Enter custom pose text..."
                          value={localFlowPose.text || ""}
                          onChange={(e) =>
                            setLocalFlowPose({
                              ...localFlowPose,
                              text: e.target.value,
                            })
                          }
                        />
                      </div>
                    )}
                  </div>
                </Tab>
                <Tab
                  key="details"
                  title={
                    <div className="flex items-center gap-2">
                      <NotebookTabs size={16} />
                      <span>{t("edit.details")}</span>
                    </div>
                  }
                >
                  <div className="flex flex-col sm:flex-row gap-4 mt-4">
                    <div className="flex flex-col gap-2 sm:flex-1">
                      <h4 className="text-sm font-medium flex items-center gap-1">
                        <Wind size={16} />
                        {t("edit.breathInstructions")}
                      </h4>
                      <Listbox
                        aria-label="Select Breath"
                        disallowEmptySelection={false}
                        selectedKeys={
                          localFlowPose.breath ? [localFlowPose.breath] : []
                        }
                        selectionMode="single"
                        variant="flat"
                        onSelectionChange={(keys) =>
                          handleDetailsChange(keys, "breath")
                        }
                      >
                        <ListboxSection>
                          <ListboxItem key="Einatmen" className="text-gray-500">
                            {t("edit.inhale")}
                          </ListboxItem>
                          <ListboxItem key="Ausatmen" className="text-gray-500">
                            {t("edit.exhale")}
                          </ListboxItem>
                        </ListboxSection>
                      </Listbox>
                    </div>

                    <div className="flex flex-col gap-2 sm:flex-1">
                      <h4 className="text-sm font-medium flex items-center gap-1">
                        <Dumbbell size={16} />
                        {t("edit.equipment")}
                      </h4>
                      <Listbox
                        aria-label="Select Equipment"
                        disallowEmptySelection={false}
                        selectedKeys={
                          localFlowPose.equipment
                            ? [localFlowPose.equipment]
                            : []
                        }
                        selectionMode="single"
                        variant="flat"
                        onSelectionChange={(keys) =>
                          handleDetailsChange(keys, "equipment")
                        }
                      >
                        <ListboxSection>
                          <ListboxItem key="Block" className="text-gray-500">
                            {t("edit.block")}
                          </ListboxItem>
                          <ListboxItem key="Strap" className="text-gray-500">
                            {t("edit.strap")}
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
                      <span>{t("edit.notes")}</span>
                    </div>
                  }
                >
                  <div className="flex flex-col gap-2 mt-4">
                    <h4 className="text-sm font-medium">
                      {t("edit.addNotes")}
                    </h4>
                    <Textarea
                      className="w-full"
                      minRows={2}
                      placeholder={t("edit.addNotesPlaceholder")}
                      value={localFlowPose.text || ""}
                      onChange={(e) =>
                        setLocalFlowPose({
                          ...localFlowPose,
                          text: e.target.value,
                        })
                      }
                    />
                  </div>
                </Tab>
              </Tabs>
            </CardBody>
            <CardFooter className="p-4 border-t flex justify-between">
              <Button
                color="danger"
                size="sm"
                startContent={<Trash size={16} />}
                variant="light"
                onPress={handleDeleteFlowPose}
              >
                {t("edit.deletePose")}
              </Button>
              <Button color="primary" size="sm" onPress={handleSaveAndClose}>
                {t("edit.save")}
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}
    </>
  );
}
