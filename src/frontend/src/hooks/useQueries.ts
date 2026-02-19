import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { MeetingSession, Participant } from '../backend';
import { Principal } from '@icp-sdk/core/principal';

export function useSignUp() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (username: string) => {
      if (!actor) throw new Error('Actor not initialized');
      await actor.signUp(username);
    },
    onSuccess: async () => {
      // Wait for cache invalidation to complete
      await queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });
}

export function useStartMeeting() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, participants }: { id: string; participants: Participant[] }) => {
      if (!actor) throw new Error('Actor not initialized');
      return await actor.startMeeting(id, participants);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['meetings'] });
    },
  });
}

export function useEndMeeting() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      if (!actor) throw new Error('Actor not initialized');
      return await actor.endMeeting(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['meetings'] });
    },
  });
}

export function useUpdateSentiment() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, score }: { id: string; score: number }) => {
      if (!actor) throw new Error('Actor not initialized');
      await actor.updateSentiment(id, score);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['meetings'] });
    },
  });
}

export function useUpdateCost() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, cost }: { id: string; cost: number }) => {
      if (!actor) throw new Error('Actor not initialized');
      await actor.updateCost(id, cost);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['meetings'] });
    },
  });
}

export function useGetMeeting(id: string) {
  const { actor, isFetching } = useActor();

  return useQuery<MeetingSession>({
    queryKey: ['meeting', id],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not initialized');
      return await actor.getMeeting(id);
    },
    enabled: !!actor && !isFetching && !!id,
  });
}

export function useGetAllMeetings() {
  const { actor, isFetching } = useActor();

  return useQuery<MeetingSession[]>({
    queryKey: ['meetings'],
    queryFn: async () => {
      if (!actor) return [];
      return await actor.getAllMeetings();
    },
    enabled: !!actor && !isFetching,
  });
}
