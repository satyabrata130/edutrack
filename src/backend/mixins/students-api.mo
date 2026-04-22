import List "mo:core/List";
import Time "mo:core/Time";
import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import Common "../types/common";
import StudentTypes "../types/students";
import StudentLib "../lib/students";

mixin (
  accessControlState : AccessControl.AccessControlState,
  students : List.List<StudentTypes.Student>,
  nextStudentId : { var value : Nat },
) {
  public query ({ caller }) func listStudents() : async [StudentTypes.StudentView] {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    StudentLib.listAll(students);
  };

  public query ({ caller }) func searchStudents(term : Text) : async [StudentTypes.StudentView] {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    StudentLib.search(students, term);
  };

  public query ({ caller }) func getStudent(id : Common.StudentId) : async ?StudentTypes.StudentView {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    switch (StudentLib.findById(students, id)) {
      case (?s) { ?StudentLib.toView(s) };
      case null { null };
    };
  };

  public shared ({ caller }) func createStudent(req : StudentTypes.CreateStudentRequest) : async StudentTypes.StudentView {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    let id = nextStudentId.value;
    nextStudentId.value += 1;
    let student = StudentLib.create(students, id, req, Time.now());
    StudentLib.toView(student);
  };

  public shared ({ caller }) func updateStudent(id : Common.StudentId, req : StudentTypes.UpdateStudentRequest) : async StudentTypes.StudentView {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    switch (StudentLib.findById(students, id)) {
      case (?s) {
        StudentLib.update(s, req);
        StudentLib.toView(s);
      };
      case null { Runtime.trap("Student not found") };
    };
  };

  public shared ({ caller }) func deleteStudent(id : Common.StudentId) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can delete students");
    };
    let filtered = students.filter(func(s) { s.id != id });
    students.clear();
    students.append(filtered);
  };
};
