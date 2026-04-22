import Common "common";

module {
  // CO marks for a single component (midsem, quiz, assignment, attendance)
  public type CoMarks = {
    co1 : Nat;
    co2 : Nat;
    co3 : Nat;
    co4 : Nat;
    co5 : Nat;
  };

  // A single uploaded performance record for one student
  public type PerformanceRecord = {
    id : Nat;
    studentId : Common.StudentId;
    subjectCode : Text;
    midsem : CoMarks;     // out of 20 total across all COs
    quiz : CoMarks;       // out of 5 total across all COs
    assignment : CoMarks; // out of 10 total across all COs
    attendance : CoMarks; // out of 5 total across all COs
    totalMark : Nat;      // auto-calculated: sum of all component totals (max 40)
    uploadedBy : Common.UserId;
    uploadedAt : Common.Timestamp;
  };

  // Shared view (no var fields — safe for public API boundary)
  public type PerformanceRecordView = {
    id : Nat;
    studentId : Common.StudentId;
    subjectCode : Text;
    midsem : CoMarks;
    quiz : CoMarks;
    assignment : CoMarks;
    attendance : CoMarks;
    totalMark : Nat;
    uploadedBy : Common.UserId;
    uploadedAt : Common.Timestamp;
  };

  // Input payload for uploading a single record
  public type UploadRecordRequest = {
    studentId : Common.StudentId;
    subjectCode : Text;
    midsem : CoMarks;
    quiz : CoMarks;
    assignment : CoMarks;
    attendance : CoMarks;
  };

  // Attainment level per CO: Level 1 (<60%), Level 2 (60-75%), Level 3 (>75%)
  public type AttainmentLevel = { #level1; #level2; #level3 };

  // CO-wise attainment result
  public type CoAttainment = {
    co : Text; // "CO1" .. "CO5"
    passPercentage : Float; // % of students scoring >50% in that CO across all components
    attainmentLevel : AttainmentLevel;
  };

  // Full CO attainment analysis for a subject
  public type CoAttainmentAnalysis = {
    subjectCode : Text;
    totalStudents : Nat;
    coAttainments : [CoAttainment];
  };
};
