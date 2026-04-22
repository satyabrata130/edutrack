import Common "common";

module {
  public type EnrollmentStatus = {
    #active;
    #inactive;
    #graduated;
    #suspended;
  };

  public type Student = {
    id : Common.StudentId;
    var name : Text;
    var rollNumber : Text;
    var className : Text;
    var contact : Text;
    var enrollmentStatus : EnrollmentStatus;
    createdAt : Common.Timestamp;
  };

  public type StudentView = {
    id : Common.StudentId;
    name : Text;
    rollNumber : Text;
    className : Text;
    contact : Text;
    enrollmentStatus : EnrollmentStatus;
    createdAt : Common.Timestamp;
  };

  public type CreateStudentRequest = {
    name : Text;
    rollNumber : Text;
    className : Text;
    contact : Text;
    enrollmentStatus : EnrollmentStatus;
  };

  public type UpdateStudentRequest = {
    name : Text;
    rollNumber : Text;
    className : Text;
    contact : Text;
    enrollmentStatus : EnrollmentStatus;
  };
};
