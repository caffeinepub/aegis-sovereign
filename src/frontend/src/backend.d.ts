import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type Participant = Principal;
export interface MeetingSession {
    id: string;
    startTime: Time;
    participants: Array<Participant>;
    sentimentScore: number;
    endTime?: Time;
    cost: number;
}
export type Time = bigint;
export interface backendInterface {
    endMeeting(id: string): Promise<bigint>;
    getAllMeetings(): Promise<Array<MeetingSession>>;
    getMeeting(id: string): Promise<MeetingSession>;
    signUp(arg0: string): Promise<void>;
    startMeeting(id: string, participants: Array<Participant>): Promise<Time>;
    updateCost(id: string, cost: number): Promise<void>;
    updateSentiment(id: string, score: number): Promise<void>;
}
