"use client";

import { Button } from "@heroui/react";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

import { trpc } from "@/utils/trpc";

interface NewFlowButtonProps {
  userEmail: string;
  flowCount: number;
}

export function NewFlowButton({ userEmail, flowCount }: NewFlowButtonProps) {
  const router = useRouter();
  const createFlowMutation = trpc.flow.createFlow.useMutation({
    onSuccess: (data) => {
      router.push(`/flows/${data.id}`);
    },
  });

  const handleCreateFlow = async () => {
    await createFlowMutation.mutateAsync({
      user_email: userEmail,
      name: `Flow ${flowCount + 1}`,
    });
  };

  return (
    <Button
      color="primary"
      isLoading={createFlowMutation.isLoading}
      startContent={<Plus size={20} />}
      onPress={handleCreateFlow}
    >
      Flow erstellen
    </Button>
  );
}
