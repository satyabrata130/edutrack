import Common "common";

module {
  public type ExamType = {
    #midterm;
    #final;
    #quiz;
    #assignment;
    #practical;
  };

  public type Subject = {
    id : Common.SubjectId;
    var name : Text;
    var code : Text;
    createdAt : Common.Timestamp;
  };

  public type SubjectView = {
    id : Common.SubjectId;
    name : Text;
    code : Text;
    createdAt : Common.Timestamp;
  };

  public type Exam = {
    id : Common.ExamId;
    var name : Text;
    var date : Text;
    var examType : ExamType;
    var maxMarks : Nat;
    createdAt : Common.Timestamp;
  };

  public type ExamView = {
    id : Common.ExamId;
    name : Text;
    date : Text;
    examType : ExamType;
    maxMarks : Nat;
    createdAt : Common.Timestamp;
  };

  public type Mark = {
    id : Common.MarkId;
    studentId : Common.StudentId;
    subjectId : Common.SubjectId;
    examId : Common.ExamId;
    var marksObtained : Nat;
    var remarks : Text;
    enteredBy : Common.UserId;
    createdAt : Common.Timestamp;
  };

  public type MarkView = {
    id : Common.MarkId;
    studentId : Common.StudentId;
    subjectId : Common.SubjectId;
    examId : Common.ExamId;
    marksObtained : Nat;
    remarks : Text;
    enteredBy : Common.UserId;
    createdAt : Common.Timestamp;
  };

  public type CreateSubjectRequest = {
    name : Text;
    code : Text;
  };

  public type CreateExamRequest = {
    name : Text;
    date : Text;
    examType : ExamType;
    maxMarks : Nat;
  };

  public type UpsertMarkRequest = {
    studentId : Common.StudentId;
    subjectId : Common.SubjectId;
    examId : Common.ExamId;
    marksObtained : Nat;
    remarks : Text;
  };

  // Performance report types
  public type StudentExamPerformance = {
    examId : Common.ExamId;
    examName : Text;
    subjectId : Common.SubjectId;
    subjectName : Text;
    marksObtained : Nat;
    maxMarks : Nat;
    passed : Bool;
  };

  public type StudentReport = {
    studentId : Common.StudentId;
    studentName : Text;
    rollNumber : Text;
    className : Text;
    performances : [StudentExamPerformance];
    averageScore : Float;
    overallPassed : Bool;
  };

  public type ClassSubjectSummary = {
    subjectId : Common.SubjectId;
    subjectName : Text;
    averageScore : Float;
    topStudent : ?Text;
    bottomStudent : ?Text;
  };

  public type ClassReport = {
    className : Text;
    examId : Common.ExamId;
    examName : Text;
    subjectSummaries : [ClassSubjectSummary];
    topPerformers : [Text];
    bottomPerformers : [Text];
  };
};
