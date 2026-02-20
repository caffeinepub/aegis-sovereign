import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { 
  MeetingLog, 
  PanicEvent, 
  UserProfile, 
  UserRole, 
  AuditLogEntry, 
  SessionRecording,
  SystemHealthMetrics 
} from '../backend';
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

// Audit Log Queries
export function useGetAuditLog() {
  const { actor, isFetching } = useActor();

  return useQuery<AuditLogEntry[]>({
    queryKey: ['auditLog'],
    queryFn: async () => {
      if (!actor) return [];
      return await actor.getAuditLog();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetAuditLogForUser(user: Principal) {
  const { actor, isFetching } = useActor();

  return useQuery<AuditLogEntry[]>({
    queryKey: ['auditLog', user.toString()],
    queryFn: async () => {
      if (!actor) return [];
      return await actor.getAuditLogForUser(user);
    },
    enabled: !!actor && !isFetching,
  });
}

// Session Recording Queries
export function useGetAllSessionRecordings() {
  const { actor, isFetching } = useActor();

  return useQuery<SessionRecording[]>({
    queryKey: ['sessionRecordings'],
    queryFn: async () => {
      if (!actor) return [];
      return await actor.getAllSessionRecordings();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetSessionRecording(id: string) {
  const { actor, isFetching } = useActor();

  return useQuery<SessionRecording | null>({
    queryKey: ['sessionRecording', id],
    queryFn: async () => {
      if (!actor) return null;
      return await actor.getSessionRecording(id);
    },
    enabled: !!actor && !isFetching && !!id,
  });
}

export function useSaveSessionRecording() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (recording: SessionRecording) => {
      if (!actor) throw new Error('Actor not initialized');
      await actor.saveSessionRecording(recording);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sessionRecordings'] });
    },
  });
}

export function useDeleteSessionRecording() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      if (!actor) throw new Error('Actor not initialized');
      await actor.deleteSessionRecording(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sessionRecordings'] });
    },
  });
}

// System Health Metrics
export function useGetSystemHealthMetrics() {
  const { actor, isFetching } = useActor();

  return useQuery<SystemHealthMetrics>({
    queryKey: ['systemHealth'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return await actor.getSystemHealthMetrics();
    },
    enabled: !!actor && !isFetching,
    refetchInterval: 30000, // Auto-refresh every 30 seconds
  });
}
