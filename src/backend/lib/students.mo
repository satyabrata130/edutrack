import List "mo:core/List";
import Common "../types/common";
import StudentTypes "../types/students";

module {
  public func toView(student : StudentTypes.Student) : StudentTypes.StudentView {
    {
      id = student.id;
      name = student.name;
      rollNumber = student.rollNumber;
      className = student.className;
      contact = student.contact;
      enrollmentStatus = student.enrollmentStatus;
      createdAt = student.createdAt;
    };
  };

  public func create(
    students : List.List<StudentTypes.Student>,
    nextId : Nat,
    req : StudentTypes.CreateStudentRequest,
    now : Common.Timestamp,
  ) : StudentTypes.Student {
    let student : StudentTypes.Student = {
      id = nextId;
      var name = req.name;
      var rollNumber = req.rollNumber;
      var className = req.className;
      var contact = req.contact;
      var enrollmentStatus = req.enrollmentStatus;
      createdAt = now;
    };
    students.add(student);
    student;
  };

  public func update(
    student : StudentTypes.Student,
    req : StudentTypes.UpdateStudentRequest,
  ) {
    student.name := req.name;
    student.rollNumber := req.rollNumber;
    student.className := req.className;
    student.contact := req.contact;
    student.enrollmentStatus := req.enrollmentStatus;
  };

  public func findById(
    students : List.List<StudentTypes.Student>,
    id : Common.StudentId,
  ) : ?StudentTypes.Student {
    students.find(func(s) { s.id == id });
  };

  public func search(
    students : List.List<StudentTypes.Student>,
    term : Text,
  ) : [StudentTypes.StudentView] {
    let lower = term.toLower();
    students
      .filter(func(s) {
        s.name.toLower().contains(#text lower) or
        s.rollNumber.toLower().contains(#text lower) or
        s.className.toLower().contains(#text lower)
      })
      .map<StudentTypes.Student, StudentTypes.StudentView>(func(s) { toView(s) })
      .toArray();
  };

  public func listAll(students : List.List<StudentTypes.Student>) : [StudentTypes.StudentView] {
    students.map<StudentTypes.Student, StudentTypes.StudentView>(func(s) { toView(s) }).toArray();
  };
};
