import List "mo:core/List";
import Time "mo:core/Time";
import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import Common "../types/common";
import AcademicTypes "../types/academics";
import TeacherTypes "../types/teachers";
import StudentTypes "../types/students";
import AcademicsLib "../lib/academics";
import StudentLib "../lib/students";

mixin (
  accessControlState : AccessControl.AccessControlState,
  teachers : List.List<TeacherTypes.Teacher>,
  students : List.List<StudentTypes.Student>,
  subjects : List.List<AcademicTypes.Subject>,
  exams : List.List<AcademicTypes.Exam>,
  marks : List.List<AcademicTypes.Mark>,
  nextSubjectId : { var value : Nat },
  nextExamId : { var value : Nat },
  nextMarkId : { var value : Nat },
) {
  // Subject management (admin only)
  public query ({ caller }) func listSubjects() : async [AcademicTypes.SubjectView] {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    AcademicsLib.listSubjects(subjects);
  };

  public shared ({ caller }) func createSubject(req : AcademicTypes.CreateSubjectRequest) : async AcademicTypes.SubjectView {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can create subjects");
    };
    let id = nextSubjectId.value;
    nextSubjectId.value += 1;
    let subject = AcademicsLib.createSubject(subjects, id, req, Time.now());
    AcademicsLib.subjectToView(subject);
  };

  public shared ({ caller }) func updateSubject(id : Common.SubjectId, req : AcademicTypes.CreateSubjectRequest) : async AcademicTypes.SubjectView {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can update subjects");
    };
    switch (AcademicsLib.findSubjectById(subjects, id)) {
      case (?s) {
        s.name := req.name;
        s.code := req.code;
        AcademicsLib.subjectToView(s);
      };
      case null { Runtime.trap("Subject not found") };
    };
  };

  public shared ({ caller }) func deleteSubject(id : Common.SubjectId) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can delete subjects");
    };
    let filtered = subjects.filter(func(s) { s.id != id });
    subjects.clear();
    subjects.append(filtered);
  };

  // Exam management (admin only)
  public query ({ caller }) func listExams() : async [AcademicTypes.ExamView] {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    AcademicsLib.listExams(exams);
  };

  public shared ({ caller }) func createExam(req : AcademicTypes.CreateExamRequest) : async AcademicTypes.ExamView {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can create exams");
    };
    let id = nextExamId.value;
    nextExamId.value += 1;
    let exam = AcademicsLib.createExam(exams, id, req, Time.now());
    AcademicsLib.examToView(exam);
  };

  public shared ({ caller }) func updateExam(id : Common.ExamId, req : AcademicTypes.CreateExamRequest) : async AcademicTypes.ExamView {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can update exams");
    };
    switch (AcademicsLib.findExamById(exams, id)) {
      case (?e) {
        e.name := req.name;
        e.date := req.date;
        e.examType := req.examType;
        e.maxMarks := req.maxMarks;
        AcademicsLib.examToView(e);
      };
      case null { Runtime.trap("Exam not found") };
    };
  };

  public shared ({ caller }) func deleteExam(id : Common.ExamId) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can delete exams");
    };
    let filtered = exams.filter(func(e) { e.id != id });
    exams.clear();
    exams.append(filtered);
  };

  // Mark entry (teacher and admin)
  public shared ({ caller }) func upsertMark(req : AcademicTypes.UpsertMarkRequest) : async AcademicTypes.MarkView {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    let (mark, isNew) = AcademicsLib.upsertMark(marks, nextMarkId.value, req, caller, Time.now());
    if (isNew) { nextMarkId.value += 1 };
    AcademicsLib.markToView(mark);
  };

  public query ({ caller }) func listMarksForStudent(studentId : Common.StudentId) : async [AcademicTypes.MarkView] {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    AcademicsLib.listMarksForStudent(marks, studentId);
  };

  // Reports
  public query ({ caller }) func getStudentReport(studentId : Common.StudentId) : async ?AcademicTypes.StudentReport {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    switch (StudentLib.findById(students, studentId)) {
      case (?student) {
        ?AcademicsLib.buildStudentReport(
          studentId,
          student.name,
          student.rollNumber,
          student.className,
          marks,
          subjects,
          exams,
        );
      };
      case null { null };
    };
  };

  public query ({ caller }) func getClassReport(className : Text, examId : Common.ExamId) : async AcademicTypes.ClassReport {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    let studentSlices = students
      .filter(func(s) { s.className == className })
      .map<StudentTypes.Student, { id : Common.StudentId; name : Text; rollNumber : Text; className : Text }>(
        func(s) { { id = s.id; name = s.name; rollNumber = s.rollNumber; className = s.className } }
      );
    AcademicsLib.buildClassReport(className, examId, studentSlices, marks, subjects, exams);
  };
};
