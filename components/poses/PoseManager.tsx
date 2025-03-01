"use client";

import { useCallback } from "react";

import { trpc } from "@/utils/trpc";

export function usePoseManager() {
  const utils = trpc.useContext();

  // Get all poses
  const getAllPoses = () => {
    return trpc.pose.getAllPoses.useQuery();
  };

  // Get a specific pose
  const getPose = (poseId: string) => {
    return trpc.pose.getPose.useQuery({ poseId });
  };

  // Create a new pose
  const createPoseMutation = trpc.pose.createPose.useMutation({
    onSuccess: () => {
      // Invalidate queries to refetch data
      utils.pose.getAllPoses.invalidate();
    },
  });

  const createPose = useCallback(
    async (data: any) => {
      return createPoseMutation.mutateAsync(data);
    },
    [createPoseMutation],
  );

  // Update a pose
  const updatePoseMutation = trpc.pose.updatePose.useMutation({
    onSuccess: () => {
      // Invalidate queries to refetch data
      utils.pose.getAllPoses.invalidate();
    },
  });

  const updatePose = useCallback(
    async (data: any) => {
      return updatePoseMutation.mutateAsync(data);
    },
    [updatePoseMutation],
  );

  // Delete a pose
  const deletePoseMutation = trpc.pose.deletePose.useMutation({
    onSuccess: () => {
      // Invalidate queries to refetch data
      utils.pose.getAllPoses.invalidate();
    },
  });

  const deletePose = useCallback(
    async (poseId: string) => {
      return deletePoseMutation.mutateAsync({ poseId });
    },
    [deletePoseMutation],
  );

  return {
    getAllPoses,
    getPose,
    createPose,
    updatePose,
    deletePose,
    isLoading:
      createPoseMutation.isLoading ||
      updatePoseMutation.isLoading ||
      deletePoseMutation.isLoading,
  };
}
