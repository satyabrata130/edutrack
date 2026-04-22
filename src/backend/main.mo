import List "mo:core/List";
import AccessControl "mo:caffeineai-authorization/access-control";
import MixinAuthorization "mo:caffeineai-authorization/MixinAuthorization";
import StudentTypes "types/students";
import TeacherTypes "types/teachers";
import AcademicTypes "types/academics";
import CoTypes "types/co-analysis";
import StudentsMixin "mixins/students-api";
import TeachersMixin "mixins/teachers-api";
import AcademicsMixin "mixins/academics-api";
import CoAnalysisMixin "mixins/co-analysis-api";

actor {
  // Authorization state
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // Students state
  let students = List.empty<StudentTypes.Student>();
  let nextStudentId = { var value : Nat = 1 };

  // Teachers/user accounts state
  let teachers = List.empty<TeacherTypes.Teacher>();

  // Subjects state
  let subjects = List.empty<AcademicTypes.Subject>();
  let nextSubjectId = { var value : Nat = 1 };

  // Exams state
  let exams = List.empty<AcademicTypes.Exam>();
  let nextExamId = { var value : Nat = 1 };

  // Marks state
  let marks = List.empty<AcademicTypes.Mark>();
  let nextMarkId = { var value : Nat = 1 };

  // CO analysis state
  let performanceRecords = List.empty<CoTypes.PerformanceRecord>();
  let nextRecordId = { var value : Nat = 1 };

  // Include domain mixins
  include StudentsMixin(accessControlState, students, nextStudentId);
  include TeachersMixin(accessControlState, teachers);
  include AcademicsMixin(
    accessControlState,
    teachers,
    students,
    subjects,
    exams,
    marks,
    nextSubjectId,
    nextExamId,
    nextMarkId,
  );
  include CoAnalysisMixin(accessControlState, performanceRecords, nextRecordId);
};
