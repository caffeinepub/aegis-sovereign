import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import { UserProfile, MeetingLog, PanicEvent, UserRole, AuditLogEntry, SystemHealthMetrics } from '../backend';
import { Principal } from '@dfinity/principal';

// User Profile Queries
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
      if (!actor) throw new Error('Actor not available');
      return actor.saveCallerUserProfile(profile);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['currentUserProfile'] });
    },
  });
}

// Role Management Queries
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
    queryKey: ['isCallerAdmin'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.isCallerAdmin();
    },
    enabled: !!actor && !actorFetching,
  });
}

export function useAssignCallerUserRole() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ user, role }: { user: Principal; role: UserRole }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.assignCallerUserRole(user, role);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['currentUserRole'] });
      queryClient.invalidateQueries({ queryKey: ['isCallerAdmin'] });
    },
  });
}

// Meeting Log Queries
export function useGetAllMeetingLogs() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<MeetingLog[]>({
    queryKey: ['meetingLogs'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllMeetingLogs();
    },
    enabled: !!actor && !actorFetching,
  });
}

export function useAddMeetingLog() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (log: MeetingLog) => {
      if (!actor) throw new Error('Actor not available');
      return actor.addMeetingLog(log);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['meetingLogs'] });
    },
  });
}

export function useDeleteMeetingLog() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (title: string) => {
      if (!actor) throw new Error('Actor not available');
      return actor.deleteMeetingLog(title);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['meetingLogs'] });
    },
  });
}

// Panic Protocol Queries
export function useTriggerPanic() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (triggerType: string) => {
      if (!actor) throw new Error('Actor not available');
      return actor.triggerPanic(triggerType);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['panicHistory'] });
    },
  });
}

export function useGetPanicHistory() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<PanicEvent[]>({
    queryKey: ['panicHistory'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getPanicHistory();
    },
    enabled: !!actor && !actorFetching,
  });
}

// Audit Log Queries
export function useGetAuditLog() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<AuditLogEntry[]>({
    queryKey: ['auditLog'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAuditLog();
    },
    enabled: !!actor && !actorFetching,
  });
}

export function useGetAuditLogForUser() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (user: Principal) => {
      if (!actor) throw new Error('Actor not available');
      return actor.getAuditLogForUser(user);
    },
  });
}

// System Health Metrics Queries
export function useGetSystemHealthMetrics() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<SystemHealthMetrics>({
    queryKey: ['systemHealthMetrics'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getSystemHealthMetrics();
    },
    enabled: !!actor && !actorFetching,
    refetchInterval: 30000, // Auto-refetch every 30 seconds
  });
}
