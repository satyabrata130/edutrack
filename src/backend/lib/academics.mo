import List "mo:core/List";
import Array "mo:core/Array";
import Nat "mo:core/Nat";
import Common "../types/common";
import AcademicTypes "../types/academics";

module {
  // Subject operations
  public func createSubject(
    subjects : List.List<AcademicTypes.Subject>,
    nextId : Nat,
    req : AcademicTypes.CreateSubjectRequest,
    now : Common.Timestamp,
  ) : AcademicTypes.Subject {
    let subject : AcademicTypes.Subject = {
      id = nextId;
      var name = req.name;
      var code = req.code;
      createdAt = now;
    };
    subjects.add(subject);
    subject;
  };

  public func subjectToView(subject : AcademicTypes.Subject) : AcademicTypes.SubjectView {
    {
      id = subject.id;
      name = subject.name;
      code = subject.code;
      createdAt = subject.createdAt;
    };
  };

  public func findSubjectById(
    subjects : List.List<AcademicTypes.Subject>,
    id : Common.SubjectId,
  ) : ?AcademicTypes.Subject {
    subjects.find(func(s) { s.id == id });
  };

  public func listSubjects(subjects : List.List<AcademicTypes.Subject>) : [AcademicTypes.SubjectView] {
    subjects.map<AcademicTypes.Subject, AcademicTypes.SubjectView>(func(s) { subjectToView(s) }).toArray();
  };

  // Exam operations
  public func createExam(
    exams : List.List<AcademicTypes.Exam>,
    nextId : Nat,
    req : AcademicTypes.CreateExamRequest,
    now : Common.Timestamp,
  ) : AcademicTypes.Exam {
    let exam : AcademicTypes.Exam = {
      id = nextId;
      var name = req.name;
      var date = req.date;
      var examType = req.examType;
      var maxMarks = req.maxMarks;
      createdAt = now;
    };
    exams.add(exam);
    exam;
  };

  public func examToView(exam : AcademicTypes.Exam) : AcademicTypes.ExamView {
    {
      id = exam.id;
      name = exam.name;
      date = exam.date;
      examType = exam.examType;
      maxMarks = exam.maxMarks;
      createdAt = exam.createdAt;
    };
  };

  public func findExamById(
    exams : List.List<AcademicTypes.Exam>,
    id : Common.ExamId,
  ) : ?AcademicTypes.Exam {
    exams.find(func(e) { e.id == id });
  };

  public func listExams(exams : List.List<AcademicTypes.Exam>) : [AcademicTypes.ExamView] {
    exams.map<AcademicTypes.Exam, AcademicTypes.ExamView>(func(e) { examToView(e) }).toArray();
  };

  // Mark operations
  public func upsertMark(
    marks : List.List<AcademicTypes.Mark>,
    nextId : Nat,
    req : AcademicTypes.UpsertMarkRequest,
    caller : Common.UserId,
    now : Common.Timestamp,
  ) : (AcademicTypes.Mark, Bool) {
    // Try to find an existing mark for this (student, subject, exam) triple
    switch (marks.find(func(m) {
      m.studentId == req.studentId and
      m.subjectId == req.subjectId and
      m.examId == req.examId
    })) {
      case (?existing) {
        existing.marksObtained := req.marksObtained;
        existing.remarks := req.remarks;
        (existing, false);
      };
      case null {
        let mark : AcademicTypes.Mark = {
          id = nextId;
          studentId = req.studentId;
          subjectId = req.subjectId;
          examId = req.examId;
          var marksObtained = req.marksObtained;
          var remarks = req.remarks;
          enteredBy = caller;
          createdAt = now;
        };
        marks.add(mark);
        (mark, true);
      };
    };
  };

  public func markToView(mark : AcademicTypes.Mark) : AcademicTypes.MarkView {
    {
      id = mark.id;
      studentId = mark.studentId;
      subjectId = mark.subjectId;
      examId = mark.examId;
      marksObtained = mark.marksObtained;
      remarks = mark.remarks;
      enteredBy = mark.enteredBy;
      createdAt = mark.createdAt;
    };
  };

  public func listMarksForStudent(
    marks : List.List<AcademicTypes.Mark>,
    studentId : Common.StudentId,
  ) : [AcademicTypes.MarkView] {
    marks
      .filter(func(m) { m.studentId == studentId })
      .map<AcademicTypes.Mark, AcademicTypes.MarkView>(func(m) { markToView(m) })
      .toArray();
  };

  // Performance calculations
  public func buildStudentReport(
    studentId : Common.StudentId,
    studentName : Text,
    rollNumber : Text,
    className : Text,
    marks : List.List<AcademicTypes.Mark>,
    subjects : List.List<AcademicTypes.Subject>,
    exams : List.List<AcademicTypes.Exam>,
  ) : AcademicTypes.StudentReport {
    let studentMarks = marks.filter(func(m) { m.studentId == studentId });

    let performances = studentMarks
      .map<AcademicTypes.Mark, AcademicTypes.StudentExamPerformance>(func(m) {
        let subjectName = switch (subjects.find(func(s) { s.id == m.subjectId })) {
          case (?s) { s.name };
          case null { "Unknown" };
        };
        let (examName, maxMarks) = switch (exams.find(func(e) { e.id == m.examId })) {
          case (?e) { (e.name, e.maxMarks) };
          case null { ("Unknown", 100) };
        };
        {
          examId = m.examId;
          examName;
          subjectId = m.subjectId;
          subjectName;
          marksObtained = m.marksObtained;
          maxMarks;
          passed = m.marksObtained * 100 >= maxMarks * 50; // 50% passing threshold
        };
      })
      .toArray();

    let totalMarks = performances.foldLeft(
      0,
      func(acc, p) { acc + p.marksObtained },
    );
    let totalMax = performances.foldLeft(
      0,
      func(acc, p) { acc + p.maxMarks },
    );

    let averageScore : Float = if (totalMax == 0) {
      0.0;
    } else {
      totalMarks.toFloat() / totalMax.toFloat() * 100.0;
    };

    let overallPassed = performances.all(
      func(p) { p.passed },
    );

    {
      studentId;
      studentName;
      rollNumber;
      className;
      performances;
      averageScore;
      overallPassed;
    };
  };

  public func buildClassReport(
    className : Text,
    examId : Common.ExamId,
    students : List.List<{ id : Common.StudentId; name : Text; rollNumber : Text; className : Text }>,
    marks : List.List<AcademicTypes.Mark>,
    subjects : List.List<AcademicTypes.Subject>,
    exams : List.List<AcademicTypes.Exam>,
  ) : AcademicTypes.ClassReport {
    let examName = switch (exams.find(func(e) { e.id == examId })) {
      case (?e) { e.name };
      case null { "Unknown" };
    };

    // All marks for this exam
    let examMarks = marks.filter(func(m) { m.examId == examId });

    // Build per-subject summaries
    let subjectSummaries = subjects
      .map<AcademicTypes.Subject, AcademicTypes.ClassSubjectSummary>(func(subj) {
        let subjectMarks = examMarks.filter(func(m) { m.subjectId == subj.id }).toArray();

        let totalObtained = subjectMarks.foldLeft(0, func(acc, m) { acc + m.marksObtained });
        let count = subjectMarks.size();

        let avgScore : Float = if (count == 0) 0.0 else totalObtained.toFloat() / count.toFloat();

        // Find top and bottom student for this subject
        let sortedMarks = subjectMarks.sort(
          func(a, b) {
            if (a.marksObtained > b.marksObtained) { #less }
            else if (a.marksObtained < b.marksObtained) { #greater }
            else { #equal };
          },
        );

        let topStudent : ?Text = if (sortedMarks.size() == 0) {
          null;
        } else {
          switch (students.find(func(s) { s.id == sortedMarks[0].studentId })) {
            case (?s) { ?s.name };
            case null { null };
          };
        };

        let bottomStudent : ?Text = if (sortedMarks.size() == 0) {
          null;
        } else {
          let last = sortedMarks.size() - 1;
          switch (students.find(func(s) { s.id == sortedMarks[last].studentId })) {
            case (?s) { ?s.name };
            case null { null };
          };
        };

        {
          subjectId = subj.id;
          subjectName = subj.name;
          averageScore = avgScore;
          topStudent;
          bottomStudent;
        };
      })
      .toArray();

    // Compute total score per student for this exam across all subjects
    let classStudents = students.filter(func(s) { s.className == className }).toArray();

    let studentScores = classStudents.map(
      func(s) {
        let total = examMarks.filter(func(m) { m.studentId == s.id }).toArray().foldLeft(
          0,
          func(acc, m) { acc + m.marksObtained },
        );
        (s.name, total);
      },
    );

    let sortedByScore = studentScores.sort(
      func(a, b) {
        if (a.1 > b.1) { #less }
        else if (a.1 < b.1) { #greater }
        else { #equal };
      },
    );

    let topCount = if (sortedByScore.size() < 3) sortedByScore.size() else 3;
    let bottomCount = if (sortedByScore.size() < 3) sortedByScore.size() else 3;

    let topPerformers = sortedByScore.sliceToArray(0, topCount).map(
      func(entry) { entry.0 },
    );

    let bottomStart = if (sortedByScore.size() <= bottomCount) 0 else sortedByScore.size() - bottomCount;
    let bottomPerformers = sortedByScore.sliceToArray(bottomStart, sortedByScore.size()).map(
      func(entry) { entry.0 },
    );

    {
      className;
      examId;
      examName;
      subjectSummaries;
      topPerformers;
      bottomPerformers;
    };
  };
};
