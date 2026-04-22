import List "mo:core/List";
import CoTypes "../types/co-analysis";
import Common "../types/common";

module {
  // Calculate the sum of all CO marks within a CoMarks record
  public func coMarksTotal(marks : CoTypes.CoMarks) : Nat {
    marks.co1 + marks.co2 + marks.co3 + marks.co4 + marks.co5;
  };

  // Calculate the total mark for a record: sum of all component totals
  public func calcTotalMark(
    midsem : CoTypes.CoMarks,
    quiz : CoTypes.CoMarks,
    assignment : CoTypes.CoMarks,
    attendance : CoTypes.CoMarks,
  ) : Nat {
    coMarksTotal(midsem) + coMarksTotal(quiz) + coMarksTotal(assignment) + coMarksTotal(attendance);
  };

  // Get the score for a specific CO index (0-based: 0=CO1, 1=CO2, ..., 4=CO5) across all four components
  public func coScoreForIndex(record : CoTypes.PerformanceRecord, coIndex : Nat) : Nat {
    let getCoValue = func(marks : CoTypes.CoMarks) : Nat {
      switch coIndex {
        case 0 { marks.co1 };
        case 1 { marks.co2 };
        case 2 { marks.co3 };
        case 3 { marks.co4 };
        case _ { marks.co5 };
      };
    };
    getCoValue(record.midsem) + getCoValue(record.quiz) + getCoValue(record.assignment) + getCoValue(record.attendance);
  };

  // Max possible score for a specific CO across all four components
  // Per CO: midsem=4, quiz=1, assignment=2, attendance=1 → total max per CO = 8
  // Pass threshold = 50% of 8 = 4; student passes if co_total > 4
  public func maxCoScoreForIndex(_coIndex : Nat) : Nat {
    8;
  };

  // Determine attainment level from pass percentage
  // Level 1: <60%, Level 2: 60–75%, Level 3: >75%
  public func attainmentLevel(passPercent : Float) : CoTypes.AttainmentLevel {
    if (passPercent > 75.0) { #level3 }
    else if (passPercent >= 60.0) { #level2 }
    else { #level1 };
  };

  // Compute CO-wise attainment analysis for all records matching subjectCode
  public func computeCoAttainment(
    records : List.List<CoTypes.PerformanceRecord>,
    subjectCode : Text,
  ) : CoTypes.CoAttainmentAnalysis {
    let filtered = records.filter(func(r) { r.subjectCode == subjectCode });
    let total = filtered.size();
    let coNames = ["CO1", "CO2", "CO3", "CO4", "CO5"];

    let coAttainments = coNames.mapEntries(
      func(coName, idx) {
        let passCount = filtered.foldLeft(
          0,
          func(acc, r) {
            let score = coScoreForIndex(r, idx);
            if (score > 4) { acc + 1 } else { acc };
          },
        );
        let passPercent : Float = if (total == 0) {
          0.0;
        } else {
          (passCount.toFloat() / total.toFloat()) * 100.0;
        };
        {
          co = coName;
          passPercentage = passPercent;
          attainmentLevel = attainmentLevel(passPercent);
        };
      }
    );

    {
      subjectCode;
      totalStudents = total;
      coAttainments;
    };
  };

  // Convert internal record to shared view (identical shape, no mutable fields)
  public func toView(record : CoTypes.PerformanceRecord) : CoTypes.PerformanceRecordView {
    {
      id = record.id;
      studentId = record.studentId;
      subjectCode = record.subjectCode;
      midsem = record.midsem;
      quiz = record.quiz;
      assignment = record.assignment;
      attendance = record.attendance;
      totalMark = record.totalMark;
      uploadedBy = record.uploadedBy;
      uploadedAt = record.uploadedAt;
    };
  };

  // Build a new PerformanceRecord from upload request
  public func newRecord(
    id : Nat,
    caller : Common.UserId,
    timestamp : Common.Timestamp,
    req : CoTypes.UploadRecordRequest,
  ) : CoTypes.PerformanceRecord {
    let total = calcTotalMark(req.midsem, req.quiz, req.assignment, req.attendance);
    {
      id;
      studentId = req.studentId;
      subjectCode = req.subjectCode;
      midsem = req.midsem;
      quiz = req.quiz;
      assignment = req.assignment;
      attendance = req.attendance;
      totalMark = total;
      uploadedBy = caller;
      uploadedAt = timestamp;
    };
  };

  // List all records, optionally filtered by subjectCode and/or studentId
  public func listRecords(
    records : List.List<CoTypes.PerformanceRecord>,
    subjectCode : ?Text,
    studentId : ?Common.StudentId,
  ) : [CoTypes.PerformanceRecordView] {
    let filtered = records.filter(func(r) {
      let matchSubject = switch subjectCode {
        case (?code) { r.subjectCode == code };
        case null { true };
      };
      let matchStudent = switch studentId {
        case (?sid) { r.studentId == sid };
        case null { true };
      };
      matchSubject and matchStudent;
    });
    filtered.map<CoTypes.PerformanceRecord, CoTypes.PerformanceRecordView>(
      func(r) { toView(r) }
    ).toArray();
  };
};
