var EnrollmentStatus = /* @__PURE__ */ ((EnrollmentStatus2) => {
  EnrollmentStatus2["active"] = "active";
  EnrollmentStatus2["inactive"] = "inactive";
  EnrollmentStatus2["graduated"] = "graduated";
  EnrollmentStatus2["suspended"] = "suspended";
  return EnrollmentStatus2;
})(EnrollmentStatus || {});
var ExamType = /* @__PURE__ */ ((ExamType2) => {
  ExamType2["final_"] = "final";
  ExamType2["practical"] = "practical";
  ExamType2["assignment"] = "assignment";
  ExamType2["quiz"] = "quiz";
  ExamType2["midterm"] = "midterm";
  return ExamType2;
})(ExamType || {});
var TeacherRole = /* @__PURE__ */ ((TeacherRole2) => {
  TeacherRole2["admin"] = "admin";
  TeacherRole2["teacher"] = "teacher";
  return TeacherRole2;
})(TeacherRole || {});
export {
  EnrollmentStatus as E,
  TeacherRole as T,
  ExamType as a
};
