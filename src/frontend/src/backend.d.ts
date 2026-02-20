import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type Time = bigint;
export interface SessionRecording {
    id: string;
    recordingData: Uint8Array;
    title: string;
    duration: bigint;
    owner: User;
    metadata: string;
    bookmarks: Array<bigint>;
    timestamp: Time;
}
export interface SystemHealthMetrics {
    updateCallCount: bigint;
    stableMemory: bigint;
    heapMemory: bigint;
    queryCallCount: bigint;
    cyclesBalance: bigint;
}
export type User = Principal;
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
export interface AuditLogEntry {
    action: string;
    user: User;
    timestamp: Time;
    details: string;
    success: boolean;
}
export interface UserProfile {
    name: string;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addMeetingLog(log: MeetingLog): Promise<void>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    assignRole(user: Principal, role: UserRole): Promise<void>;
    clearPanicHistory(): Promise<void>;
    deleteMeetingLog(title: string): Promise<void>;
    deleteSessionRecording(id: string): Promise<void>;
    getAllMeetingLogs(): Promise<Array<MeetingLog>>;
    getAllSessionRecordings(): Promise<Array<SessionRecording>>;
    getAuditLog(): Promise<Array<AuditLogEntry>>;
    getAuditLogForUser(user: Principal): Promise<Array<AuditLogEntry>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getMeetingLog(title: string): Promise<MeetingLog | null>;
    getPanicHistory(): Promise<Array<PanicEvent>>;
    getSessionRecording(id: string): Promise<SessionRecording | null>;
    getSystemHealthMetrics(): Promise<SystemHealthMetrics>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    saveSessionRecording(recording: SessionRecording): Promise<void>;
    triggerPanic(triggerType: string): Promise<void>;
    updateMeetingLog(title: string, updatedLog: MeetingLog): Promise<void>;
}
