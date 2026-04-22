import List "mo:core/List";
import Common "../types/common";
import TeacherTypes "../types/teachers";

module {
  public func toView(teacher : TeacherTypes.Teacher) : TeacherTypes.TeacherView {
    {
      id = teacher.id;
      name = teacher.name;
      role = teacher.role;
      createdAt = teacher.createdAt;
    };
  };

  public func create(
    teachers : List.List<TeacherTypes.Teacher>,
    req : TeacherTypes.CreateTeacherRequest,
    now : Common.Timestamp,
  ) : TeacherTypes.Teacher {
    let teacher : TeacherTypes.Teacher = {
      id = req.principal;
      var name = req.name;
      var role = req.role;
      createdAt = now;
    };
    teachers.add(teacher);
    teacher;
  };

  public func update(
    teacher : TeacherTypes.Teacher,
    req : TeacherTypes.UpdateTeacherRequest,
  ) {
    teacher.name := req.name;
    teacher.role := req.role;
  };

  public func findById(
    teachers : List.List<TeacherTypes.Teacher>,
    id : Common.UserId,
  ) : ?TeacherTypes.Teacher {
    teachers.find(func(t) { t.id == id });
  };

  public func listAll(teachers : List.List<TeacherTypes.Teacher>) : [TeacherTypes.TeacherView] {
    teachers.map<TeacherTypes.Teacher, TeacherTypes.TeacherView>(func(t) { toView(t) }).toArray();
  };

  public func isAdmin(
    teachers : List.List<TeacherTypes.Teacher>,
    caller : Common.UserId,
  ) : Bool {
    switch (teachers.find(func(t) { t.id == caller })) {
      case (?t) { t.role == #admin };
      case null { false };
    };
  };

  public func isTeacher(
    teachers : List.List<TeacherTypes.Teacher>,
    caller : Common.UserId,
  ) : Bool {
    switch (teachers.find(func(t) { t.id == caller })) {
      case (?t) { t.role == #teacher or t.role == #admin };
      case null { false };
    };
  };
};
