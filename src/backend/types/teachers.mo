import Common "common";

module {
  public type TeacherRole = {
    #admin;
    #teacher;
  };

  public type Teacher = {
    id : Common.UserId;
    var name : Text;
    var role : TeacherRole;
    createdAt : Common.Timestamp;
  };

  public type TeacherView = {
    id : Common.UserId;
    name : Text;
    role : TeacherRole;
    createdAt : Common.Timestamp;
  };

  public type CreateTeacherRequest = {
    principal : Common.UserId;
    name : Text;
    role : TeacherRole;
  };

  public type UpdateTeacherRequest = {
    name : Text;
    role : TeacherRole;
  };
};
