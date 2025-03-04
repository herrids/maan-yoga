"use client";

import Image from "next/image";

interface PoseCardProps {
  flowPose: any;
}

export function PoseCard({ flowPose }: PoseCardProps) {
  const renderCardContent = () => {
    if (flowPose.pose_id == null && flowPose.text == null) {
      return (
        <div className="p-4 h-full w-full flex items-center justify-center">
          <p className="text-sm text-default-400 text-center">
            Klicken zum Bearbeiten
          </p>
        </div>
      );
    }

    if (flowPose.type === "image") {
      return (
        <div className="flex flex-col items-center p-4 h-full w-full">
          {flowPose.pose && flowPose.pose.id && (
            <>
              <div className="w-32 h-32 relative mb-4">
                <Image
                  fill
                  alt={
                    flowPose.pose.name_german ||
                    flowPose.pose.name_english ||
                    "Yoga Pose"
                  }
                  className="object-contain"
                  src={`https://kbmjjri0rfvoollc.public.blob.vercel-storage.com/poses/${flowPose.pose_id}.svg`}
                />
              </div>
              <div className="flex flex-col gap-1 text-center">
                {flowPose.pose.name_german && (
                  <p className="font-medium text-md">
                    {flowPose.pose.name_german}
                  </p>
                )}

                {flowPose.breath && (
                  <p className="text-sm text-default-600 mt-1">
                    {flowPose.breath}
                  </p>
                )}

                {flowPose.equipment && (
                  <p className="text-sm text-default-600">
                    <span className="font-medium">Hilfsmittel: </span>
                    {flowPose.equipment}
                  </p>
                )}

                {flowPose.text && (
                  <p className="text-sm text-default-500 mt-2 italic">
                    {flowPose.text}
                  </p>
                )}
              </div>
            </>
          )}
        </div>
      );
    }

    if (flowPose.type === "text") {
      return (
        <div className="p-4 h-full w-full flex flex-col">
          <p>{flowPose.text}</p>
          {flowPose.note && (
            <p className="text-sm text-default-500 mt-2 italic">
              {flowPose.note}
            </p>
          )}
        </div>
      );
    }
  };

  return (
    <div
      className={`border border-gray-100 rounded-lg transition-colors hover:border-gray-400 h-full w-full ${
        flowPose.type === "text" ? "bg-default-50" : ""
      }`}
    >
      {renderCardContent()}
    </div>
  );
}
