import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { contentService } from "../services/content.service";
import { toast } from "sonner";

export const useTeacherContent = (teacherId) => {
  return useQuery({
    queryKey: ["teacherContent", teacherId],
    queryFn: () => contentService.getTeacherContent(teacherId),
    enabled: !!teacherId,
  });
};

export const useAllContent = () => {
  return useQuery({
    queryKey: ["allContent"],
    queryFn: () => contentService.getAllContent(),
  });
};

export const usePendingContent = () => {
  return useQuery({
    queryKey: ["pendingContent"],
    queryFn: () => contentService.getPendingContent(),
  });
};

export const useLiveContent = (teacherId) => {
  return useQuery({
    queryKey: ["liveContent", teacherId],
    queryFn: () => contentService.getLiveContent(teacherId),
    enabled: !!teacherId,
    refetchInterval: 10000, // Poll every 10s
  });
};

export const useUploadContent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => contentService.uploadContent(data),
    onSuccess: (data) => {
      toast.success("Content uploaded successfully!");
      queryClient.invalidateQueries(["teacherContent", data.teacherId]);
    },
    onError: (err) => {
      toast.error(err.message || "Failed to upload content");
    }
  });
};

export const useApproveContent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => contentService.approveContent(id),
    onSuccess: () => {
      toast.success("Content approved!");
      queryClient.invalidateQueries(["pendingContent"]);
      queryClient.invalidateQueries(["allContent"]);
    },
    onError: (err) => toast.error(err.message)
  });
};

export const useRejectContent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, reason }) => contentService.rejectContent(id, reason),
    onSuccess: () => {
      toast.success("Content rejected!");
      queryClient.invalidateQueries(["pendingContent"]);
      queryClient.invalidateQueries(["allContent"]);
    },
    onError: (err) => toast.error(err.message)
  });
};
