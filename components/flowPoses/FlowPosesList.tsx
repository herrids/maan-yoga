"use client";

import { Card, CardBody, CardHeader } from "@heroui/card";
import { Divider } from "@heroui/divider";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { FlowPose } from "@prisma/client";
import { addToast } from "@heroui/toast";

import { PoseCard } from "../flows/PoseCard";
import { PoseCardModal } from "../flows/PoseCardModal";

import { trpc } from "@/utils/trpc";

interface PosesListProps {
  initialFlowPoses: FlowPose[] | [];
  flowId: string;
}

const emptyFlowPose = (flowId: string, position: number): FlowPose => ({
  id: "",
  created_at: new Date(),
  pose_id: null,
  breath: null,
  equipment: null,
  text: null,
  flow_id: flowId,
  position: position,
  type: "image",
});

export function PosesList({ initialFlowPoses, flowId }: PosesListProps) {
  const [allPoses, setAllPoses] = useState<any[]>([]);
  const [flowPoses, setFlowPoses] = useState<FlowPose[]>(initialFlowPoses);

  const poseCount = flowPoses?.length || 0;

  const { data: poses } = trpc.pose.getAllPoses.useQuery();
  const updateFlowPoseMutation = trpc.flowPose.updateFlowPose.useMutation({
    onSuccess: (data) => {
      setFlowPoses(
        flowPoses.map((pose) => (pose.id === data.id ? data : pose)),
      );
    },
    onError: () => {
      addToast({
        title: "Fehler beim Aktualisieren der Pose",
        description: "Bitte versuche es erneut.",
        color: "danger",
      });
    },
  });
  const createFlowPoseMutation = trpc.flowPose.createFlowPose.useMutation({
    onSuccess: (data) => {
      setFlowPoses([...flowPoses, data]);
    },
    onError: () => {
      addToast({
        title: "Fehler beim Erstellen der Pose",
        description: "Bitte versuche es erneut.",
        color: "danger",
      });
    },
  });
  const deleteFlowPoseMutation = trpc.flowPose.deleteFlowPose.useMutation();

  useEffect(() => {
    if (poses) {
      setAllPoses(poses);
    }
  }, [poses]);

  const addFlowPose = (flowPose: FlowPose) => {
    createFlowPoseMutation.mutate(flowPose);
  };

  const updateFlowPose = (flowPose: FlowPose) => {
    if (flowPose.id) {
      updateFlowPoseMutation.mutate(flowPose);
    }
  };

  const deleteFlowPose = (id: string) => {
    const updatedFlowPoses = flowPoses.filter((pose) => pose.id !== id);

    setFlowPoses(updatedFlowPoses);

    deleteFlowPoseMutation.mutate({ id });
  };

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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
          {poseCount > 0 &&
            flowPoses.map((flowPose, index) => (
              <div key={index} className="flex flex-col">
                <PoseCardModal
                  allPoses={allPoses}
                  deleteFlowPose={deleteFlowPose}
                  flowPose={flowPose}
                  updateFlowPose={updateFlowPose}
                >
                  <PoseCard flowPose={flowPose} />
                </PoseCardModal>
              </div>
            ))}
          <div className="flex flex-col items-center justify-center">
            <div
              className="h-full min-h-[150px] w-full flex flex-col items-center justify-center border border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-primary"
              role="button"
              tabIndex={0}
              onClick={() => addFlowPose(emptyFlowPose(flowId, poseCount + 1))}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  addFlowPose(emptyFlowPose(flowId, poseCount + 1));
                }
              }}
            >
              <Plus className="text-gray-400" size={24} />
              <span className="mt-2 text-default-500">Pose hinzufügen</span>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
