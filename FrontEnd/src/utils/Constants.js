//SJSU CMPE 138 Spring2020 TEAM7
export const LoginUrl = "operator_login";
export const AdminLoginUrl = "admin_login";
export const GuestBloodUnitUrl = "guest_user/blood";
export const AddBloodUnitUrl = ":operator_id/blood";
export const ExpiredBloodUnitUrl = ":operator_id/expired_blood";
export const BloodLimitUrl = ":operator_id/blood_limit";
export const AddBloodBankUrl = "bloodbank";
export const AddDonorUrl = "bloodbank/donor/add";
export const UpdateDonorUrl = "bloodbank/donor/update";
export const DeleteDonorUrl = "bloodbank/donor/delete";
export const GetDonorByEmailIdUrl = "bloodbank/donor";
export const AddOperatorUrl = "operator/signup";
export const UpdateOpeatorUrl = "operator";
export const AddEventUrl = "blood_donation_event";
export const GetAllEventsUrl = "/:operator_id/blood_donation_event/all";
export const AddBranchUrl = ":operator_id/branches";
export const GetBranchDetailUrl = ":operator_id/branch_info";
export const GetAllActiveEventsUrl = "active_blood_donation_event";
export const GetParticularEventUrl = "blood_donation_event";
export const SendNotificationUrl = ":operator_id/send_notification";
export const NotifyForLowBloodUrl = ":operator_id/limit_notified";
export const AddEmergencyContactUrl = "bloodbank/donor/econtact";
export const UpdateEmergencyContactUrl = "bloodbank/donor/econtact/update";
export const DeleteEmergencyContactUrl = "bloodbank/donor/econtact/delete";
export const GetAllEmergencyContactOfDonorUrl = "bloodbank/donor/econtact";
export const GetParticularEmergencyContactOfDonorUrl =
  "bloodbank/donor/contact";
