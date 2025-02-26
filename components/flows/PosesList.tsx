import { Card, CardBody, CardHeader } from "@heroui/card";
import { Divider } from "@heroui/divider";

import { PoseCard } from "./PoseCard";

interface PosesListProps {
  poses: any[] | null;
}

export function PosesList({ poses }: PosesListProps) {
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
          <p className="text-default-500">Keine Posen hinzugefügt.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {poses.map((pose, index) => (
              <div key={index} className="flex flex-col">
                <PoseCard pose={pose} />
              </div>
            ))}
          </div>
        )}
      </CardBody>
    </Card>
  );
}
