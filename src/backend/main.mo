import Map "mo:core/Map";
import Text "mo:core/Text";
import Array "mo:core/Array";
import Iter "mo:core/Iter";
import Order "mo:core/Order";
import Time "mo:core/Time";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";

import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

// Data migration via with clause referencing migration module

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

  // Authorization system with role-based access control
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  let meetingLogs = Map.empty<Text, MeetingLog>();
  var panicEvents = Map.empty<Text, PanicEvent>();
  let userProfiles = Map.empty<Principal, UserProfile>();

  // User Profile Management
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only users can view profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Meeting Log Management
  public shared ({ caller }) func addMeetingLog(log : MeetingLog) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only users can add logs");
    };

    // Verify caller is the owner
    if (log.owner != caller) {
      Runtime.trap("Unauthorized: Can only create logs as yourself");
    };

    meetingLogs.add(log.title, log);
  };

  public shared ({ caller }) func updateMeetingLog(title : Text, updatedLog : MeetingLog) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only users can update logs");
    };

    // Check if log exists and verify ownership
    switch (meetingLogs.get(title)) {
      case null { Runtime.trap("Log not found") };
      case (?existingLog) {
        if (existingLog.owner != caller and not AccessControl.isAdmin(accessControlState, caller)) {
          Runtime.trap("Unauthorized: Can only update your own logs");
        };

        // Ensure owner cannot be changed
        if (updatedLog.owner != existingLog.owner) {
          Runtime.trap("Unauthorized: Cannot change log owner");
        };

        meetingLogs.add(title, updatedLog);
      };
    };
  };

  public shared ({ caller }) func deleteMeetingLog(title : Text) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only users can delete logs");
    };

    // Check if log exists and verify ownership
    switch (meetingLogs.get(title)) {
      case null { Runtime.trap("Log not found") };
      case (?existingLog) {
        if (existingLog.owner != caller and not AccessControl.isAdmin(accessControlState, caller)) {
          Runtime.trap("Unauthorized: Can only delete your own logs");
        };
        meetingLogs.remove(title);
      };
    };
  };

  public query ({ caller }) func getMeetingLog(title : Text) : async ?MeetingLog {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only users can view logs");
    };

    switch (meetingLogs.get(title)) {
      case null { null };
      case (?log) {
        // Users can only view their own logs or logs they participated in, admins can view all
        if (
          log.owner == caller or log.participants.any<User>(func(p) { p == caller }) or AccessControl.isAdmin(accessControlState, caller)
        ) {
          ?log;
        } else {
          Runtime.trap("Unauthorized: Can only view logs you own or participated in");
        };
      };
    };
  };

  public query ({ caller }) func getAllMeetingLogs() : async [MeetingLog] {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only users can view logs");
    };

    // Admins can see all logs, users only see their own or ones they participated in
    if (AccessControl.isAdmin(accessControlState, caller)) {
      meetingLogs.values().toArray();
    } else {
      meetingLogs.values()
        .filter(func(log : MeetingLog) : Bool {
          log.owner == caller or log.participants.any<User>(func(p) { p == caller });
        })
        .toArray();
    };
  };

  // Panic Protocol Management
  public shared ({ caller }) func triggerPanic(triggerType : Text) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only users can trigger panic");
    };

    let event : PanicEvent = {
      timestamp = Time.now();
      triggerType;
      user = caller;
    };

    panicEvents.add(triggerType.concat(Time.now().toText()), event);
  };

  public query ({ caller }) func getPanicHistory() : async [PanicEvent] {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only users can view panic history");
    };

    // Admins can see all events, users only see their own
    if (AccessControl.isAdmin(accessControlState, caller)) {
      panicEvents.values().toArray();
    } else {
      panicEvents.values()
        .filter(func(event : PanicEvent) : Bool {
          event.user == caller;
        })
        .toArray();
    };
  };

  public shared ({ caller }) func clearPanicHistory() : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admins can clear history");
    };
    panicEvents := Map.empty<Text, PanicEvent>();
  };
};
