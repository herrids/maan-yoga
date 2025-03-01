import { Card, CardBody, CardHeader } from "@heroui/card";
import { Divider } from "@heroui/divider";
import { Button } from "@heroui/button";
import { Plus } from "lucide-react";

import { PoseCard } from "./PoseCard";
import { PoseCardModal } from "./PoseCardModal";

interface PosesListProps {
  poses: any[] | null;
  onAddPose?: () => void;
}

export function PosesList({ poses, onAddPose }: PosesListProps) {
  const poseCount = poses?.length || 0;

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
        {!poses || poses.length === 0 ? (
          <div className="flex flex-col items-center gap-4">
            <p className="text-default-500">Keine Posen hinzugefügt.</p>
            <Button
              color="primary"
              startContent={<Plus size={18} />}
              onPress={onAddPose}
            >
              Pose hinzufügen
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
            {poses.map((pose, index) => (
              <div key={index} className="flex flex-col">
                <PoseCard pose={pose} />
              </div>
            ))}
            <div className="flex flex-col items-center justify-center">
              <PoseCardModal>
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
