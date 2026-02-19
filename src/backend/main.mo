import Text "mo:core/Text";
import Principal "mo:core/Principal";
import Order "mo:core/Order";
import Array "mo:core/Array";
import Iter "mo:core/Iter";
import Runtime "mo:core/Runtime";
import Map "mo:core/Map";
import Time "mo:core/Time";

actor {
  type User = Principal;
  type Participant = User;

  type MeetingSession = {
    id : Text;
    startTime : Time.Time;
    endTime : ?Time.Time;
    participants : [Participant];
    sentimentScore : Float;
    cost : Float;
  };

  module MeetingSession {
    public func compare(a : MeetingSession, b : MeetingSession) : Order.Order {
      Text.compare(a.id, b.id);
    };
  };

  let users = Map.empty<User, Text>();
  let sessions = Map.empty<Text, MeetingSession>();

  public shared ({ caller }) func signUp(_ : Text) : async () {
    if (users.containsKey(caller)) { Runtime.trap("User already exists.") };
    users.add(caller, "");
  };

  public shared ({ caller }) func startMeeting(id : Text, participants : [Participant]) : async Time.Time {
    if (sessions.containsKey(id)) { Runtime.trap("Meeting ID already exists.") };

    let session : MeetingSession = {
      id;
      startTime = Time.now();
      endTime = null;
      participants;
      sentimentScore = 0.0;
      cost = 0.0;
    };
    sessions.add(id, session);
    session.startTime;
  };

  public shared ({ caller }) func endMeeting(id : Text) : async Int {
    switch (sessions.get(id)) {
      case (null) { Runtime.trap("Meeting not found.") };
      case (?session) {
        if (session.endTime != null) { Runtime.trap("Meeting already ended.") };
        let endTime = Time.now();
        let duration = endTime - session.startTime;
        let updatedSession : MeetingSession = {
          id = session.id;
          startTime = session.startTime;
          endTime = ?endTime;
          participants = session.participants;
          sentimentScore = session.sentimentScore;
          cost = session.cost;
        };
        sessions.add(id, updatedSession);
        duration;
      };
    };
  };

  public shared ({ caller }) func updateSentiment(id : Text, score : Float) : async () {
    switch (sessions.get(id)) {
      case (null) { Runtime.trap("Meeting not found.") };
      case (?session) {
        let updatedSession : MeetingSession = {
          id = session.id;
          startTime = session.startTime;
          endTime = session.endTime;
          participants = session.participants;
          sentimentScore = score;
          cost = session.cost;
        };
        sessions.add(id, updatedSession);
      };
    };
  };

  public shared ({ caller }) func updateCost(id : Text, cost : Float) : async () {
    switch (sessions.get(id)) {
      case (null) { Runtime.trap("Meeting not found.") };
      case (?session) {
        let updatedSession : MeetingSession = {
          id = session.id;
          startTime = session.startTime;
          endTime = session.endTime;
          participants = session.participants;
          sentimentScore = session.sentimentScore;
          cost;
        };
        sessions.add(id, updatedSession);
      };
    };
  };

  public query ({ caller }) func getMeeting(id : Text) : async MeetingSession {
    switch (sessions.get(id)) {
      case (null) { Runtime.trap("Meeting not found.") };
      case (?session) { session };
    };
  };

  public query ({ caller }) func getAllMeetings() : async [MeetingSession] {
    let iter = sessions.values();
    iter.toArray().sort();
  };
};
