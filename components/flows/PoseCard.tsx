"use client";

import Image from "next/image";
import { useState } from "react";

import { PoseCardModal } from "./PoseCardModal";

interface PoseCardProps {
  pose: {
    type: string;
    pose_id?: string;
    name_german?: string;
    name_english?: string;
    breath?: string | null;
    equipment?: string | null;
    text?: string;
  };
  onPoseUpdate?: (updatedPose: any) => void;
  onPoseDelete?: () => void;
}

export function PoseCard({ pose, onPoseUpdate, onPoseDelete }: PoseCardProps) {
  const [currentPose, setCurrentPose] = useState(pose);

  const handlePoseChange = (poseId: string) => {
    const updatedPose = { ...currentPose, pose_id: poseId };

    setCurrentPose(updatedPose);
    if (onPoseUpdate) {
      onPoseUpdate(updatedPose);
    }
  };

  /* const handleBreathChange = (breath: string | null) => {
    const updatedPose = { ...currentPose, breath };
    setCurrentPose(updatedPose);
    if (onPoseUpdate) {
      onPoseUpdate(updatedPose);
    }
  };

  const handleEquipmentChange = (equipment: string | null) => {
    const updatedPose = { ...currentPose, equipment };
    setCurrentPose(updatedPose);
    if (onPoseUpdate) {
      onPoseUpdate(updatedPose);
    }
  }; */

  const handleDelete = () => {
    if (onPoseDelete) {
      onPoseDelete();
    }
  };

  const renderCardContent = () => {
    if (currentPose.type === "pose") {
      return (
        <div className="flex flex-col items-center p-4 h-full w-full">
          {currentPose.pose_id && (
            <div className="w-32 h-32 relative mb-4">
              <Image
                fill
                alt={
                  currentPose.name_german ||
                  currentPose.name_english ||
                  "Yoga Pose"
                }
                className="object-contain"
                src={`https://kbmjjri0rfvoollc.public.blob.vercel-storage.com/poses/${currentPose.pose_id}.svg`}
              />
            </div>
          )}

          <div className="flex flex-col gap-1 text-center">
            {currentPose.name_german && (
              <p className="font-medium text-lg">{currentPose.name_german}</p>
            )}

            {currentPose.breath && (
              <p className="text-sm text-default-600 mt-1">
                {currentPose.breath}
              </p>
            )}

            {currentPose.equipment && (
              <p className="text-sm text-default-600">
                <span className="font-medium">Hilfsmittel: </span>
                {currentPose.equipment}
              </p>
            )}
          </div>
        </div>
      );
    }

    if (currentPose.type === "text") {
      return (
        <div className="p-4 h-full w-full flex items-center">
          <p>{currentPose.text}</p>
        </div>
      );
    }

    return null;
  };

  return (
    <PoseCardModal
      currentBreath={currentPose.breath || null}
      currentEquipment={currentPose.equipment || null}
      currentPoseId={currentPose.pose_id}
      onDelete={handleDelete}
      onPoseChange={handlePoseChange}
    >
      <div
        className={`border border-gray-100 rounded-lg cursor-pointer transition-colors hover:border-primary h-full w-full ${
          currentPose.type === "text" ? "bg-default-50" : ""
        }`}
      >
        {renderCardContent()}
      </div>
    </PoseCardModal>
  );
}
