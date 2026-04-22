import List "mo:core/List";
import Time "mo:core/Time";
import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import Common "../types/common";
import TeacherTypes "../types/teachers";
import TeacherLib "../lib/teachers";

mixin (
  accessControlState : AccessControl.AccessControlState,
  teachers : List.List<TeacherTypes.Teacher>,
) {
  public query ({ caller }) func listTeachers() : async [TeacherTypes.TeacherView] {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    TeacherLib.listAll(teachers);
  };

  public query ({ caller }) func getTeacher(id : Common.UserId) : async ?TeacherTypes.TeacherView {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    switch (TeacherLib.findById(teachers, id)) {
      case (?t) { ?TeacherLib.toView(t) };
      case null { null };
    };
  };

  public shared ({ caller }) func createTeacher(req : TeacherTypes.CreateTeacherRequest) : async TeacherTypes.TeacherView {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can create teacher accounts");
    };
    // If teacher already exists, update instead
    switch (TeacherLib.findById(teachers, req.principal)) {
      case (?existing) {
        TeacherLib.update(existing, { name = req.name; role = req.role });
        TeacherLib.toView(existing);
      };
      case null {
        let teacher = TeacherLib.create(teachers, req, Time.now());
        TeacherLib.toView(teacher);
      };
    };
  };

  public shared ({ caller }) func updateTeacher(id : Common.UserId, req : TeacherTypes.UpdateTeacherRequest) : async TeacherTypes.TeacherView {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can update teacher accounts");
    };
    switch (TeacherLib.findById(teachers, id)) {
      case (?t) {
        TeacherLib.update(t, req);
        TeacherLib.toView(t);
      };
      case null { Runtime.trap("Teacher not found") };
    };
  };

  public shared ({ caller }) func deleteTeacher(id : Common.UserId) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can delete teacher accounts");
    };
    let filtered = teachers.filter(func(t) { t.id != id });
    teachers.clear();
    teachers.append(filtered);
  };

  public query ({ caller }) func getCallerTeacherProfile() : async ?TeacherTypes.TeacherView {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    switch (TeacherLib.findById(teachers, caller)) {
      case (?t) { ?TeacherLib.toView(t) };
      case null { null };
    };
  };

  // Auto-register teacher from II principal — first user becomes admin
  public shared ({ caller }) func registerOrUpdateTeacher(name : Text) : async TeacherTypes.TeacherView {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    switch (TeacherLib.findById(teachers, caller)) {
      case (?existing) {
        existing.name := name;
        TeacherLib.toView(existing);
      };
      case null {
        // First registered user becomes admin
        let role : TeacherTypes.TeacherRole = if (teachers.size() == 0) { #admin } else { #teacher };
        let req : TeacherTypes.CreateTeacherRequest = {
          principal = caller;
          name;
          role;
        };
        let teacher = TeacherLib.create(teachers, req, Time.now());
        TeacherLib.toView(teacher);
      };
    };
  };
};
