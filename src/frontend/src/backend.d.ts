import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface PanicEvent {
    user: User;
    triggerType: string;
    timestamp: Time;
}
export interface MeetingLog {
    title: string;
    participants: Array<User>;
    duration: bigint;
    owner: User;
    cost: number;
    sentiment: number;
    summary: string;
}
export type Time = bigint;
export interface UserProfile {
    name: string;
}
export type User = Principal;
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addMeetingLog(log: MeetingLog): Promise<void>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    clearPanicHistory(): Promise<void>;
    deleteMeetingLog(title: string): Promise<void>;
    getAllMeetingLogs(): Promise<Array<MeetingLog>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getMeetingLog(title: string): Promise<MeetingLog | null>;
    getPanicHistory(): Promise<Array<PanicEvent>>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    triggerPanic(triggerType: string): Promise<void>;
    updateMeetingLog(title: string, updatedLog: MeetingLog): Promise<void>;
}
