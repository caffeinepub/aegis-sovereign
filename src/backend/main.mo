import Map "mo:core/Map";
import Float "mo:core/Float";
import Text "mo:core/Text";
import Array "mo:core/Array";
import Order "mo:core/Order";
import Time "mo:core/Time";
import Iter "mo:core/Iter";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";

import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

// No changes required - all subscription logic handled in frontend/local JS.

actor {
  public type User = Principal;

  type MeetingSession = {
    id : Text;
    startTime : Time.Time;
    endTime : ?Time.Time;
    participants : [User];
    sentimentScore : Float;
    cost : Float;
  };

  module MeetingSession {
    public func compare(a : MeetingSession, b : MeetingSession) : Order.Order {
      Text.compare(a.id, b.id);
    };
  };

  public type PanicEvent = {
    timestamp : Time.Time;
    triggerType : Text;
    user : User;
  };

  public type MeetingLog = {
    title : Text;
    summary : Text;
    participants : [User];
    sentiment : Float;
    cost : Float;
    duration : Int;
    owner : User;
  };

  public type UserProfile = {
    name : Text;
  };

  // Compliance Audit Log Entry
  public type AuditLogEntry = {
    timestamp : Time.Time;
    action : Text;
    user : User;
    details : Text;
    success : Bool;
  };

  public type SessionRecording = {
    id : Text;
    title : Text;
    recordingData : Blob;
    metadata : Text;
    owner : User;
    timestamp : Time.Time;
    duration : Int;
    bookmarks : [Int];
  };

  public type SystemHealthMetrics = {
    cyclesBalance : Nat;
    heapMemory : Nat;
    stableMemory : Nat;
    queryCallCount : Nat;
    updateCallCount : Nat;
  };

  // Authorization system with role-based access control
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  let meetingLogs = Map.empty<Text, MeetingLog>();
  var panicEvents = Map.empty<Text, PanicEvent>();
  let userProfiles = Map.empty<Principal, UserProfile>();
  var auditLog = Map.empty<Text, AuditLogEntry>();
  let sessionRecordings = Map.empty<Text, SessionRecording>();
  var queryCallCount : Nat = 0;
  var updateCallCount : Nat = 0;

  // Helper function to log audit events
  func logAuditEvent(action : Text, user : User, details : Text, success : Bool) {
    let entry : AuditLogEntry = {
      timestamp = Time.now();
      action;
      user;
      details;
      success;
    };
    let key = action.concat(Time.now().toText()).concat(user.toText());
    auditLog.add(key, entry);
  };

  // User Profile Management
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    queryCallCount += 1;
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      logAuditEvent("GET_CALLER_PROFILE", caller, "Unauthorized access attempt", false);
      Runtime.trap("Unauthorized: Only users can view profiles");
    };
    logAuditEvent("GET_CALLER_PROFILE", caller, "Profile accessed", true);
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    queryCallCount += 1;
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      logAuditEvent("GET_USER_PROFILE", caller, "Unauthorized access to user: " # user.toText(), false);
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    logAuditEvent("GET_USER_PROFILE", caller, "Accessed profile of: " # user.toText(), true);
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    updateCallCount += 1;
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      logAuditEvent("SAVE_PROFILE", caller, "Unauthorized save attempt", false);
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
    logAuditEvent("SAVE_PROFILE", caller, "Profile saved", true);
  };

  // Override assignRole to add audit logging
  public shared ({ caller }) func assignRole(user : Principal, role : AccessControl.UserRole) : async () {
    updateCallCount += 1;
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      logAuditEvent("ASSIGN_ROLE", caller, "Unauthorized role assignment attempt for: " # user.toText(), false);
      Runtime.trap("Unauthorized: Only admins can assign roles");
    };
    AccessControl.assignRole(accessControlState, caller, user, role);
    let roleText = switch (role) {
      case (#admin) { "admin" };
      case (#user) { "user" };
      case (#guest) { "guest" };
    };
    logAuditEvent("ASSIGN_ROLE", caller, "Assigned role " # roleText # " to: " # user.toText(), true);
  };

  // Meeting Log Management
  public shared ({ caller }) func addMeetingLog(log : MeetingLog) : async () {
    updateCallCount += 1;
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      logAuditEvent("ADD_MEETING_LOG", caller, "Unauthorized add attempt", false);
      Runtime.trap("Unauthorized: Only users can add logs");
    };

    // Verify caller is the owner
    if (log.owner != caller) {
      logAuditEvent("ADD_MEETING_LOG", caller, "Attempted to create log as different owner", false);
      Runtime.trap("Unauthorized: Can only create logs as yourself");
    };

    meetingLogs.add(log.title, log);
    logAuditEvent("ADD_MEETING_LOG", caller, "Added log: " # log.title, true);
  };

  public shared ({ caller }) func updateMeetingLog(title : Text, updatedLog : MeetingLog) : async () {
    updateCallCount += 1;
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      logAuditEvent("UPDATE_MEETING_LOG", caller, "Unauthorized update attempt", false);
      Runtime.trap("Unauthorized: Only users can update logs");
    };

    // Check if log exists and verify ownership
    switch (meetingLogs.get(title)) {
      case null {
        logAuditEvent("UPDATE_MEETING_LOG", caller, "Log not found: " # title, false);
        Runtime.trap("Log not found");
      };
      case (?existingLog) {
        if (existingLog.owner != caller and not AccessControl.isAdmin(accessControlState, caller)) {
          logAuditEvent("UPDATE_MEETING_LOG", caller, "Unauthorized update of log: " # title, false);
          Runtime.trap("Unauthorized: Can only update your own logs");
        };

        // Ensure owner cannot be changed
        if (updatedLog.owner != existingLog.owner) {
          logAuditEvent("UPDATE_MEETING_LOG", caller, "Attempted to change owner of log: " # title, false);
          Runtime.trap("Unauthorized: Cannot change log owner");
        };

        meetingLogs.add(title, updatedLog);
        logAuditEvent("UPDATE_MEETING_LOG", caller, "Updated log: " # title, true);
      };
    };
  };

  public shared ({ caller }) func deleteMeetingLog(title : Text) : async () {
    updateCallCount += 1;
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      logAuditEvent("DELETE_MEETING_LOG", caller, "Unauthorized delete attempt", false);
      Runtime.trap("Unauthorized: Only users can delete logs");
    };

    // Check if log exists and verify ownership
    switch (meetingLogs.get(title)) {
      case null {
        logAuditEvent("DELETE_MEETING_LOG", caller, "Log not found: " # title, false);
        Runtime.trap("Log not found");
      };
      case (?existingLog) {
        if (existingLog.owner != caller and not AccessControl.isAdmin(accessControlState, caller)) {
          logAuditEvent("DELETE_MEETING_LOG", caller, "Unauthorized delete of log: " # title, false);
          Runtime.trap("Unauthorized: Can only delete your own logs");
        };
        meetingLogs.remove(title);
        logAuditEvent("DELETE_MEETING_LOG", caller, "Deleted log: " # title, true);
      };
    };
  };

  public query ({ caller }) func getMeetingLog(title : Text) : async ?MeetingLog {
    queryCallCount += 1;
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      logAuditEvent("GET_MEETING_LOG", caller, "Unauthorized access attempt", false);
      Runtime.trap("Unauthorized: Only users can view logs");
    };

    switch (meetingLogs.get(title)) {
      case null {
        logAuditEvent("GET_MEETING_LOG", caller, "Log not found: " # title, false);
        null;
      };
      case (?log) {
        // Users can only view their own logs or logs they participated in, admins can view all
        if (
          log.owner == caller or log.participants.any<User>(func(p) { p == caller }) or AccessControl.isAdmin(accessControlState, caller)
        ) {
          logAuditEvent("GET_MEETING_LOG", caller, "Accessed log: " # title, true);
          ?log;
        } else {
          logAuditEvent("GET_MEETING_LOG", caller, "Unauthorized access to log: " # title, false);
          Runtime.trap("Unauthorized: Can only view logs you own or participated in");
        };
      };
    };
  };

  public query ({ caller }) func getAllMeetingLogs() : async [MeetingLog] {
    queryCallCount += 1;
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      logAuditEvent("GET_ALL_MEETING_LOGS", caller, "Unauthorized access attempt", false);
      Runtime.trap("Unauthorized: Only users can view logs");
    };

    // Admins can see all logs, users only see their own or ones they participated in
    let logs = if (AccessControl.isAdmin(accessControlState, caller)) {
      meetingLogs.values().toArray();
    } else {
      meetingLogs.values()
        .filter(func(log : MeetingLog) : Bool {
          log.owner == caller or log.participants.any<User>(func(p) { p == caller });
        })
        .toArray();
    };
    logAuditEvent("GET_ALL_MEETING_LOGS", caller, "Accessed " # logs.size().toText() # " logs", true);
    logs;
  };

  // Panic Protocol Management
  public shared ({ caller }) func triggerPanic(triggerType : Text) : async () {
    updateCallCount += 1;
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      logAuditEvent("TRIGGER_PANIC", caller, "Unauthorized panic trigger attempt", false);
      Runtime.trap("Unauthorized: Only users can trigger panic");
    };

    let event : PanicEvent = {
      timestamp = Time.now();
      triggerType;
      user = caller;
    };

    panicEvents.add(triggerType.concat(Time.now().toText()), event);
    logAuditEvent("TRIGGER_PANIC", caller, "Panic triggered: " # triggerType, true);
  };

  public query ({ caller }) func getPanicHistory() : async [PanicEvent] {
    queryCallCount += 1;
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      logAuditEvent("GET_PANIC_HISTORY", caller, "Unauthorized access attempt", false);
      Runtime.trap("Unauthorized: Only users can view panic history");
    };

    // Admins can see all events, users only see their own
    let events = if (AccessControl.isAdmin(accessControlState, caller)) {
      panicEvents.values().toArray();
    } else {
      panicEvents.values()
        .filter(func(event : PanicEvent) : Bool {
          event.user == caller;
        })
        .toArray();
    };
    logAuditEvent("GET_PANIC_HISTORY", caller, "Accessed " # events.size().toText() # " panic events", true);
    events;
  };

  public shared ({ caller }) func clearPanicHistory() : async () {
    updateCallCount += 1;
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      logAuditEvent("CLEAR_PANIC_HISTORY", caller, "Unauthorized clear attempt", false);
      Runtime.trap("Unauthorized: Only admins can clear history");
    };
    panicEvents := Map.empty<Text, PanicEvent>();
    logAuditEvent("CLEAR_PANIC_HISTORY", caller, "Panic history cleared", true);
  };

  // Compliance Audit Logger
  public query ({ caller }) func getAuditLog() : async [AuditLogEntry] {
    queryCallCount += 1;
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      logAuditEvent("GET_AUDIT_LOG", caller, "Unauthorized audit log access attempt", false);
      Runtime.trap("Unauthorized: Only admins can view audit logs");
    };
    logAuditEvent("GET_AUDIT_LOG", caller, "Audit log accessed", true);
    auditLog.values().toArray();
  };

  public query ({ caller }) func getAuditLogForUser(user : Principal) : async [AuditLogEntry] {
    queryCallCount += 1;
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      logAuditEvent("GET_AUDIT_LOG_USER", caller, "Unauthorized audit log access attempt", false);
      Runtime.trap("Unauthorized: Only admins can view audit logs");
    };
    logAuditEvent("GET_AUDIT_LOG_USER", caller, "Audit log accessed for user: " # user.toText(), true);
    auditLog.values()
      .filter(func(entry : AuditLogEntry) : Bool {
        entry.user == user;
      })
      .toArray();
  };

  // Session Recording Archive
  public shared ({ caller }) func saveSessionRecording(recording : SessionRecording) : async () {
    updateCallCount += 1;
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      logAuditEvent("SAVE_SESSION_RECORDING", caller, "Unauthorized save attempt", false);
      Runtime.trap("Unauthorized: Only users can save recordings");
    };

    if (recording.owner != caller) {
      logAuditEvent("SAVE_SESSION_RECORDING", caller, "Attempted to save recording as different owner", false);
      Runtime.trap("Unauthorized: Can only save recordings as yourself");
    };

    sessionRecordings.add(recording.id, recording);
    logAuditEvent("SAVE_SESSION_RECORDING", caller, "Saved recording: " # recording.id, true);
  };

  public query ({ caller }) func getSessionRecording(id : Text) : async ?SessionRecording {
    queryCallCount += 1;
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      logAuditEvent("GET_SESSION_RECORDING", caller, "Unauthorized access attempt", false);
      Runtime.trap("Unauthorized: Only users can view recordings");
    };

    switch (sessionRecordings.get(id)) {
      case null {
        logAuditEvent("GET_SESSION_RECORDING", caller, "Recording not found: " # id, false);
        null;
      };
      case (?recording) {
        if (recording.owner != caller and not AccessControl.isAdmin(accessControlState, caller)) {
          logAuditEvent("GET_SESSION_RECORDING", caller, "Unauthorized access to recording: " # id, false);
          Runtime.trap("Unauthorized: Can only view your own recordings");
        };
        logAuditEvent("GET_SESSION_RECORDING", caller, "Accessed recording: " # id, true);
        ?recording;
      };
    };
  };

  public query ({ caller }) func getAllSessionRecordings() : async [SessionRecording] {
    queryCallCount += 1;
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      logAuditEvent("GET_ALL_SESSION_RECORDINGS", caller, "Unauthorized access attempt", false);
      Runtime.trap("Unauthorized: Only users can view recordings");
    };

    let recordings = if (AccessControl.isAdmin(accessControlState, caller)) {
      sessionRecordings.values().toArray();
    } else {
      sessionRecordings.values()
        .filter(func(recording : SessionRecording) : Bool {
          recording.owner == caller;
        })
        .toArray();
    };
    logAuditEvent("GET_ALL_SESSION_RECORDINGS", caller, "Accessed " # recordings.size().toText() # " recordings", true);
    recordings;
  };

  public shared ({ caller }) func deleteSessionRecording(id : Text) : async () {
    updateCallCount += 1;
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      logAuditEvent("DELETE_SESSION_RECORDING", caller, "Unauthorized delete attempt", false);
      Runtime.trap("Unauthorized: Only users can delete recordings");
    };

    switch (sessionRecordings.get(id)) {
      case null {
        logAuditEvent("DELETE_SESSION_RECORDING", caller, "Recording not found: " # id, false);
        Runtime.trap("Recording not found");
      };
      case (?recording) {
        if (recording.owner != caller and not AccessControl.isAdmin(accessControlState, caller)) {
          logAuditEvent("DELETE_SESSION_RECORDING", caller, "Unauthorized delete of recording: " # id, false);
          Runtime.trap("Unauthorized: Can only delete your own recordings");
        };
        sessionRecordings.remove(id);
        logAuditEvent("DELETE_SESSION_RECORDING", caller, "Deleted recording: " # id, true);
      };
    };
  };

  // System Health Monitor
  public query ({ caller }) func getSystemHealthMetrics() : async SystemHealthMetrics {
    queryCallCount += 1;
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      logAuditEvent("GET_SYSTEM_HEALTH", caller, "Unauthorized health metrics access attempt", false);
      Runtime.trap("Unauthorized: Only admins can view system health metrics");
    };
    logAuditEvent("GET_SYSTEM_HEALTH", caller, "System health metrics accessed", true);

    // Use dummy values for cyclesBalance, heapMemory, and stableMemory as system metrics are not available in Motoko
    {
      cyclesBalance = 1000000;
      heapMemory = 500000;
      stableMemory = 200000;
      queryCallCount;
      updateCallCount;
    };
  };
};
