"use client";

import { Card, CardBody, CardHeader } from "@heroui/card";
import { Divider } from "@heroui/divider";
import { Plus } from "lucide-react";
import { trpc } from "@/utils/trpc";
import { PoseCard } from "./PoseCard";
import { PoseCardModal } from "./PoseCardModal";
import { useEffect, useState } from "react";

interface PosesListProps {
  flowPoses: any[] | null;
}

export function PosesList({ flowPoses }: PosesListProps) {
  const [allPoses, setAllPoses] = useState<any[]>([]);
  const poseCount = flowPoses?.length || 0;

  const { data: poses } = trpc.pose.getAllPoses.useQuery();

  useEffect(() => {
    if (poses) {
      setAllPoses(poses);
    }
  }, [poses]);

  return (
    <Card>
      <CardHeader className="justify-between">
        <h2 className="text-xl font-semibold">Posen</h2>
        <p className="text-default-500 text-right">
          {poseCount} {poseCount === 1 ? "Pose" : "Posen"}
        </p>
      </CardHeader>
      <Divider />
      <CardBody>
        {!flowPoses || flowPoses.length === 0 ? (
          <div className="flex flex-col items-center gap-4">
            <p className="text-default-500">Keine Posen</p>
            <div className="flex flex-col items-center gap-2">
              <PoseCardModal newFlowPose={true} allPoses={allPoses}>
                <div className="flex flex-row items-center gap-2">
                  <Plus className="text-primary" size={16} />
                  <span className="text-primary">Pose hinzufügen</span>
                </div>
              </PoseCardModal>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
            {flowPoses.map((flowPose, index) => (
              <div key={index} className="flex flex-col">
                <PoseCard pose={flowPose} />
              </div>
            ))}
            <div className="flex flex-col items-center justify-center">
              <PoseCardModal allPoses={allPoses}>
                <div
                  className="h-full min-h-[150px] w-full flex flex-col items-center justify-center border border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-primary"
                  role="button"
                  tabIndex={0}
                >
                  <Plus className="text-gray-400" size={24} />
                  <span className="mt-2 text-default-500">Pose hinzufügen</span>
                </div>
              </PoseCardModal>
            </div>
          </div>
        )}
      </CardBody>
    </Card>
  );
}
