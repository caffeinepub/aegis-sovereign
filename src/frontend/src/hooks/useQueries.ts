import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { MeetingLog, PanicEvent, UserProfile, UserRole } from '../backend';
import { Principal } from '@icp-sdk/core/principal';

export function useGetCallerUserProfile() {
  const { actor, isFetching: actorFetching } = useActor();

  const query = useQuery<UserProfile | null>({
    queryKey: ['currentUserProfile'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getCallerUserProfile();
    },
    enabled: !!actor && !actorFetching,
    retry: false,
  });

  return {
    ...query,
    isLoading: actorFetching || query.isLoading,
    isFetched: !!actor && query.isFetched,
  };
}

export function useSaveCallerUserProfile() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (profile: UserProfile) => {
      if (!actor) throw new Error('Actor not initialized');
      await actor.saveCallerUserProfile(profile);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['currentUserProfile'] });
    },
  });
}

export function useGetCallerUserRole() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<UserRole>({
    queryKey: ['currentUserRole'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getCallerUserRole();
    },
    enabled: !!actor && !actorFetching,
    retry: false,
  });
}

export function useIsCallerAdmin() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<boolean>({
    queryKey: ['isAdmin'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.isCallerAdmin();
    },
    enabled: !!actor && !actorFetching,
    retry: false,
  });
}

export function useAssignCallerUserRole() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ user, role }: { user: Principal; role: UserRole }) => {
      if (!actor) throw new Error('Actor not initialized');
      await actor.assignCallerUserRole(user, role);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['currentUserRole'] });
      queryClient.invalidateQueries({ queryKey: ['isAdmin'] });
    },
  });
}

export function useGetAllMeetingLogs() {
  const { actor, isFetching } = useActor();

  return useQuery<MeetingLog[]>({
    queryKey: ['meetingLogs'],
    queryFn: async () => {
      if (!actor) return [];
      return await actor.getAllMeetingLogs();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAddMeetingLog() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (log: MeetingLog) => {
      if (!actor) throw new Error('Actor not initialized');
      await actor.addMeetingLog(log);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['meetingLogs'] });
    },
  });
}

export function useTriggerPanic() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (triggerType: string) => {
      if (!actor) throw new Error('Actor not initialized');
      await actor.triggerPanic(triggerType);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['panicHistory'] });
    },
  });
}

export function useGetPanicHistory() {
  const { actor, isFetching } = useActor();

  return useQuery<PanicEvent[]>({
    queryKey: ['panicHistory'],
    queryFn: async () => {
      if (!actor) return [];
      return await actor.getPanicHistory();
    },
    enabled: !!actor && !isFetching,
  });
}
