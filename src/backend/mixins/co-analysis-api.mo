import List "mo:core/List";
import Time "mo:core/Time";
import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import CoTypes "../types/co-analysis";
import CoLib "../lib/co-analysis";

mixin (
  accessControlState : AccessControl.AccessControlState,
  performanceRecords : List.List<CoTypes.PerformanceRecord>,
  nextRecordId : { var value : Nat },
) {
  // Upload one or more performance records (Admin + Teacher)
  public shared ({ caller }) func uploadPerformanceData(
    requests : [CoTypes.UploadRecordRequest]
  ) : async [CoTypes.PerformanceRecordView] {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    let now = Time.now();
    let resultList = List.empty<CoTypes.PerformanceRecordView>();
    for (req in requests.values()) {
      let id = nextRecordId.value;
      nextRecordId.value += 1;
      let record = CoLib.newRecord(id, caller, now, req);
      performanceRecords.add(record);
      resultList.add(CoLib.toView(record));
    };
    resultList.toArray();
  };

  // List uploaded performance records with optional filters (query)
  public shared query ({ caller }) func listUploadedPerformance(
    subjectCode : ?Text,
    studentId : ?Nat,
  ) : async [CoTypes.PerformanceRecordView] {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    CoLib.listRecords(performanceRecords, subjectCode, studentId);
  };

  // Get CO-wise attainment analysis for a subject (query)
  public shared query ({ caller }) func getCoAttainmentAnalysis(
    subjectCode : Text
  ) : async CoTypes.CoAttainmentAnalysis {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    CoLib.computeCoAttainment(performanceRecords, subjectCode);
  };

  // Delete an uploaded record by id (Admin only)
  public shared ({ caller }) func deleteUploadedRecord(id : Nat) : async Bool {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can delete performance records");
    };
    let sizeBefore = performanceRecords.size();
    let filtered = performanceRecords.filter(func(r) { r.id != id });
    performanceRecords.clear();
    performanceRecords.append(filtered);
    performanceRecords.size() < sizeBefore;
  };
};
