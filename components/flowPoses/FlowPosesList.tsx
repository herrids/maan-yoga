"use client";

import { Card, CardBody, CardHeader } from "@heroui/card";
import { Divider } from "@heroui/divider";
import { Plus, GripVertical } from "lucide-react";
import { useEffect, useState } from "react";
import { FlowPose } from "@prisma/client";
import { addToast } from "@heroui/toast";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragStartEvent,
  DragOverlay,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import { PoseCardModal } from "../flows/PoseCardModal";

import { PoseCard } from "./FlowPoseCard";

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

// Sortable item component that wraps the PoseCard
function SortablePoseCard({
  flowPose,
  onOpenModal,
}: {
  flowPose: FlowPose;
  onOpenModal: (id: string) => void;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: flowPose.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 10 : 1,
    opacity: isDragging ? 0.8 : 1,
  };

  // Separate the drag handle from the clickable content
  return (
    <div
      ref={setNodeRef}
      className={`flex flex-col relative group ${isDragging ? "ring-2 ring-primary ring-offset-2" : ""}`}
      style={style}
    >
      {/* Drag handle is applied only to the grip icon - only visible on hover or when dragging */}
      <div
        className="absolute top-0 right-0 z-10 p-2 rounded-tr-lg rounded-bl-lg bg-gray-50 hover:bg-gray-100 cursor-grab active:cursor-grabbing transition-colors opacity-0 group-hover:opacity-100 group-focus-within:opacity-100"
        style={{ opacity: isDragging ? 1 : undefined }}
        {...attributes}
        {...listeners}
        title="Drag to reorder"
      >
        <GripVertical className="text-gray-500" size={16} />
      </div>

      {/* The card itself is clickable but not draggable */}
      <div
        className="cursor-pointer w-full h-full"
        role="button"
        tabIndex={0}
        onClick={() => {
          if (!isDragging) {
            onOpenModal(flowPose.id);
          }
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            onOpenModal(flowPose.id);
          }
        }}
      >
        <PoseCard flowPose={flowPose} />
      </div>
    </div>
  );
}

export function PosesList({ initialFlowPoses, flowId }: PosesListProps) {
  const [allPoses, setAllPoses] = useState<any[]>([]);
  const [flowPoses, setFlowPoses] = useState<FlowPose[]>(initialFlowPoses);
  const [openModalId, setOpenModalId] = useState<string | null>(null);
  const [activeId, setActiveId] = useState<string | null>(null);

  const poseCount = flowPoses?.length || 0;

  // Set up sensors for drag and drop
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

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
      setOpenModalId(data.id);
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
  const updateFlowPosePositionsMutation =
    trpc.flowPose.updateFlowPosePositions.useMutation({
      onError: () => {
        addToast({
          title: "Fehler beim Aktualisieren der Positionen",
          description: "Bitte versuche es erneut.",
          color: "danger",
        });
      },
    });

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

  const handleOpenModal = (id: string) => {
    setOpenModalId(id);
  };

  const handleCloseModal = () => {
    setOpenModalId(null);
  };

  const handleAddNewFlowPose = () => {
    const newFlowPose = emptyFlowPose(flowId, poseCount + 1);

    addFlowPose(newFlowPose);
  };

  // Handle drag start event
  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  // Handle drag end event
  const handleDragEnd = (event: DragEndEvent) => {
    setActiveId(null);

    const { active, over } = event;

    if (over && active.id !== over.id) {
      setFlowPoses((items) => {
        // Find the indices of the dragged item and the drop target
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);

        // Reorder the array
        const newItems = arrayMove(items, oldIndex, newIndex);

        // Update positions based on new order
        const updatedItems = newItems.map((item, index) => ({
          ...item,
          position: index + 1,
        }));

        // Save the new positions to the database
        updateFlowPosePositionsMutation.mutate({
          poses: updatedItems.map((item) => ({
            id: item.id,
            position: item.position,
          })),
        });

        return updatedItems;
      });
    }
  };

  // Sort the flow poses by position
  const sortedFlowPoses = [...flowPoses].sort(
    (a, b) => a.position - b.position,
  );

  // Find the active flow pose
  const activeFlowPose = activeId
    ? flowPoses.find((pose) => pose.id === activeId)
    : null;

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
        <DndContext
          collisionDetection={closestCenter}
          sensors={sensors}
          onDragEnd={handleDragEnd}
          onDragStart={handleDragStart}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
            <SortableContext
              items={sortedFlowPoses.map((pose) => pose.id)}
              strategy={horizontalListSortingStrategy}
            >
              {poseCount > 0 &&
                sortedFlowPoses.map((flowPose, index) => (
                  <div key={flowPose.id}>
                    <SortablePoseCard
                      flowPose={flowPose}
                      onOpenModal={handleOpenModal}
                    />
                    <PoseCardModal
                      allPoses={allPoses}
                      deleteFlowPose={deleteFlowPose}
                      flowPose={flowPose}
                      isOpen={openModalId === flowPose.id}
                      updateFlowPose={updateFlowPose}
                      onClose={handleCloseModal}
                    />
                  </div>
                ))}
            </SortableContext>
            <div className="flex flex-col items-center justify-center">
              <div
                className="h-full min-h-[150px] w-full flex flex-col items-center justify-center border border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-primary"
                role="button"
                tabIndex={0}
                onClick={handleAddNewFlowPose}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    handleAddNewFlowPose();
                  }
                }}
              >
                <Plus className="text-gray-400" size={24} />
                <span className="mt-2 text-default-500">Pose hinzufügen</span>
              </div>
            </div>
          </div>

          {/* Drag overlay for visual feedback */}
          <DragOverlay adjustScale={true}>
            {activeId && activeFlowPose ? (
              <div className="opacity-80 transform scale-105 shadow-lg rounded-lg relative">
                <div className="absolute top-0 right-0 z-10 p-2 rounded-tr-lg rounded-bl-lg bg-gray-100">
                  <GripVertical className="text-gray-500" size={16} />
                </div>
                <PoseCard flowPose={activeFlowPose} />
              </div>
            ) : null}
          </DragOverlay>
        </DndContext>
      </CardBody>
    </Card>
  );
}
