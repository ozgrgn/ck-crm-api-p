const PERMISSONS = {
  ownerships: {
    systemAdmin: "system_admin",
  },

  permissions: {
    read_permissions: "read_permissions",
  },

  patients: {
    create_patient: "create_patient",
    read_patients: "read_patients",
    read_patient: "read_patient",
    update_patient: "update_patient",
    delete_patient: "delete_patient",
  },
  referenceCats: {
    create_referenceCat: "create_referenceCat",
    read_referenceCats: "read_referenceCats",
    read_referenceCat: "read_referenceCat",
    update_referenceCat: "update_referenceCat",
    delete_referenceCat: "delete_referenceCat",
  },
  wpTexts: {
    create_wpText: "create_wpText",
    read_wpTexts: "read_wpTexts",
    read_wpText: "read_wpText",
    update_wpText: "update_wpText",
    delete_wpText: "delete_wpText",
  },
  mailTexts: {
    create_mailText: "create_mailText",
    read_mailTexts: "read_mailTexts",
    read_mailText: "read_mailText",
    update_mailText: "update_mailText",
    delete_mailText: "delete_mailText",
  },
  patientMails: {
    create_patientMail: "create_patientMail",
    read_patientMails: "read_patientMails",
    read_patientMail: "read_patientMail",
    update_patientMail: "update_patientMail",
    delete_patientMail: "delete_patientMail",
  },
  notes: {
    create_note: "create_note",
    read_notes: "read_notes",
    read_note: "read_note",
    update_note: "update_note",
    delete_note: "delete_note",
  },
  priceNotes: {
    create_priceNote: "create_priceNote",
    read_priceNotes: "read_priceNotes",
    read_priceNote: "read_priceNote",
    update_priceNote: "update_priceNote",
    delete_priceNote: "delete_priceNote",
  },
  tickets: {
    create_ticket: "create_ticket",
    read_tickets: "read_tickets",
    read_ticket: "read_ticket",
    update_ticket: "update_ticket",
    delete_ticket: "delete_ticket",
  },
  payments: {
    create_payment: "create_payment",
    read_payments: "read_payments",
    read_payment: "read_payment",
    update_payment: "update_payment",
    delete_payment: "delete_payment",
  },
  references: {
    create_reference: "create_reference",
    read_references: "read_references",
    read_reference: "read_reference",
    update_reference: "update_reference",
    delete_reference: "delete_reference",
  },
  hotels: {
    create_hotel: "create_hotel",
    read_hotels: "read_hotels",
    read_hotel: "read_hotel",
    update_hotel: "update_hotel",
    delete_hotel: "delete_hotel",
  },
  tasks: {
    create_task: "create_task",
    read_tasks: "read_tasks",
    read_task: "read_task",
    update_task: "update_task",
    delete_task: "delete_task",
  },
  staffs: {
    create_staff: "create_staff",
    read_staffs: "read_staffs",
    read_staff: "read_staff",
    update_staff: "update_staff",
    delete_staff: "delete_staff",
  },
  cars: {
    create_car: "create_car",
    read_cars: "read_cars",
    read_car: "read_car",
    update_car: "update_car",
    delete_car: "delete_car",
  },
  bags: {
    create_bag: "create_bag",
    read_bags: "read_bags",
    read_bag: "read_bag",
    update_bag: "update_bag",
    delete_bag: "delete_bag",
  },
  timelineItems: {
    create_timelineItem: "create_timelineItem",
    read_timelineItems: "read_timelineItems",
    read_timelineItem: "read_timelineItem",
    update_timelineItem: "update_timelineItem",
    delete_timelineItem: "delete_timelineItem",
  },
  appointmentItems: {
    create_appointmentItem: "create_appointmentItem",
    read_appointmentItems: "read_appointmentItems",
    read_appointmentItem: "read_appointmentItem",
    update_appointmentItem: "update_appointmentItem",
    delete_appointmentItem: "delete_appointmentItem",
  },
  requests: {
    create_request: "create_request",
    read_requests: "read_requests",
    read_request: "read_request",
    update_request: "update_request",
    delete_request: "delete_request",
  },
  treatments: {
    create_treatment: "create_treatment",
    read_treatments: "read_treatments",
    read_treatment: "read_treatment",
    update_treatment: "update_treatment",
    delete_treatment: "delete_treatment",
  },

  landingPages: {
    create_landingPage: "create_landingPage",
    read_landingPages: "read_landingPages",
    read_landingPage: "read_landingPage",
    update_landingPage: "update_landingPage",
    delete_landingPage: "delete_landingPage",
  },
  permissionGroups: {
    create_permissionGroup: "create_permissionGroup",
    read_permissionGroups: "read_permissionGroups",
    read_permissionGroup: "read_permissionGroup",
    update_permissionGroup: "update_permissionGroup",
    delete_permissionGroup: "delete_permissionGroup",
  },
  admins: {
    update_admin_permissionGroup: "update_admin_permissionGroup",
    update_admin_status: "update_admin_status",
    write_admin: "write_admin",
    read_admins: "read_admins",
    read_admin: "read_admin",
    update_admin: "update_admin",
    delete_admin: "delete_admin",
  },

  logs: {
    read_userLogs: "read_userLogs",
    read_systemLogs: "read_systemLogs",
    read_adminLogs: "read_adminLogs",
  },

  groups: {
    create_group: "create_group",
    read_groups: "read_groups",
    read_group: "read_group",
    update_group: "update_group",
    delete_group: "delete_group",
  },

  reservations: {
    create_reservation: "create_reservation",
    create_reservations: "create_reservations",
    read_reservations: "read_reservations",
    read_reservation: "read_reservation",
    update_reservation: "update_reservation",
    delete_reservation: "delete_reservation",
  },
};

export default {
  ...PERMISSONS,
};
