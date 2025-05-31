<?php
// Handles REST API endpoints for React frontend
class School_MS_Pro_API {
    public static function register_endpoints() {
        add_action('rest_api_init', function() {
            // Books (already present)
            register_rest_route('schoolms/v1', '/books', [
                'methods' => 'GET',
                'callback' => [self::class, 'get_books'],
                'permission_callback' => '__return_true',
            ]);
            register_rest_route('schoolms/v1', '/books', [
                'methods' => 'POST',
                'callback' => [self::class, 'add_book'],
                'permission_callback' => function() { return current_user_can('manage_options'); },
            ]);
            // Students
            register_rest_route('schoolms/v1', '/students', [
                'methods' => 'GET',
                'callback' => [self::class, 'get_students'],
                'permission_callback' => '__return_true',
            ]);
            // Accounts
            register_rest_route('schoolms/v1', '/accounts', [
                'methods' => 'GET',
                'callback' => [self::class, 'get_accounts'],
                'permission_callback' => '__return_true',
            ]);
            // Admins
            register_rest_route('schoolms/v1', '/admins', [
                'methods' => 'GET',
                'callback' => [self::class, 'get_admins'],
                'permission_callback' => '__return_true',
            ]);
            // Transactions
            register_rest_route('schoolms/v1', '/transactions', [
                'methods' => 'GET',
                'callback' => [self::class, 'get_transactions'],
                'permission_callback' => '__return_true',
            ]);
            // Funds
            register_rest_route('schoolms/v1', '/funds', [
                'methods' => 'GET',
                'callback' => [self::class, 'get_funds'],
                'permission_callback' => '__return_true',
            ]);
            // Groups
            register_rest_route('schoolms/v1', '/groups', [
                'methods' => 'GET',
                'callback' => [self::class, 'get_groups'],
                'permission_callback' => '__return_true',
            ]);
            // Roles
            register_rest_route('schoolms/v1', '/roles', [
                'methods' => 'GET',
                'callback' => [self::class, 'get_roles'],
                'permission_callback' => '__return_true',
            ]);
            // Analytics (example: return summary)
            register_rest_route('schoolms/v1', '/analytics', [
                'methods' => 'GET',
                'callback' => [self::class, 'get_analytics'],
                'permission_callback' => '__return_true',
            ]);
            // Admins CRUD
            register_rest_route('schoolms/v1', '/admins', [
                'methods' => 'POST',
                'callback' => [self::class, 'add_admin'],
                'permission_callback' => function() { return current_user_can('manage_options'); },
            ]);
            register_rest_route('schoolms/v1', '/admins/(?P<id>\\d+)', [
                'methods' => 'PUT',
                'callback' => [self::class, 'update_admin'],
                'permission_callback' => function() { return current_user_can('manage_options'); },
            ]);
            register_rest_route('schoolms/v1', '/admins/(?P<id>\\d+)', [
                'methods' => 'DELETE',
                'callback' => [self::class, 'delete_admin'],
                'permission_callback' => function() { return current_user_can('manage_options'); },
            ]);
            // Accounts CRUD
            register_rest_route('schoolms/v1', '/accounts', [
                'methods' => 'POST',
                'callback' => [self::class, 'add_account'],
                'permission_callback' => function() { return current_user_can('manage_options'); },
            ]);
            register_rest_route('schoolms/v1', '/accounts/(?P<id>\\d+)', [
                'methods' => 'PUT',
                'callback' => [self::class, 'update_account'],
                'permission_callback' => function() { return current_user_can('manage_options'); },
            ]);
            register_rest_route('schoolms/v1', '/accounts/(?P<id>\\d+)', [
                'methods' => 'DELETE',
                'callback' => [self::class, 'delete_account'],
                'permission_callback' => function() { return current_user_can('manage_options'); },
            ]);
            // Transactions CRUD
            register_rest_route('schoolms/v1', '/transactions', [
                'methods' => 'POST',
                'callback' => [self::class, 'add_transaction'],
                'permission_callback' => function() { return current_user_can('manage_options'); },
            ]);
            register_rest_route('schoolms/v1', '/transactions/(?P<id>\\d+)', [
                'methods' => 'PUT',
                'callback' => [self::class, 'update_transaction'],
                'permission_callback' => function() { return current_user_can('manage_options'); },
            ]);
            register_rest_route('schoolms/v1', '/transactions/(?P<id>\\d+)', [
                'methods' => 'DELETE',
                'callback' => [self::class, 'delete_transaction'],
                'permission_callback' => function() { return current_user_can('manage_options'); },
            ]);
            // Funds CRUD
            register_rest_route('schoolms/v1', '/funds', [
                'methods' => 'POST',
                'callback' => [self::class, 'add_fund'],
                'permission_callback' => function() { return current_user_can('manage_options'); },
            ]);
            register_rest_route('schoolms/v1', '/funds/(?P<id>\\d+)', [
                'methods' => 'PUT',
                'callback' => [self::class, 'update_fund'],
                'permission_callback' => function() { return current_user_can('manage_options'); },
            ]);
            register_rest_route('schoolms/v1', '/funds/(?P<id>\\d+)', [
                'methods' => 'DELETE',
                'callback' => [self::class, 'delete_fund'],
                'permission_callback' => function() { return current_user_can('manage_options'); },
            ]);
            // Groups CRUD
            register_rest_route('schoolms/v1', '/groups', [
                'methods' => 'POST',
                'callback' => [self::class, 'add_group'],
                'permission_callback' => function() { return current_user_can('manage_options'); },
            ]);
            register_rest_route('schoolms/v1', '/groups/(?P<id>\\d+)', [
                'methods' => 'PUT',
                'callback' => [self::class, 'update_group'],
                'permission_callback' => function() { return current_user_can('manage_options'); },
            ]);
            register_rest_route('schoolms/v1', '/groups/(?P<id>\\d+)', [
                'methods' => 'DELETE',
                'callback' => [self::class, 'delete_group'],
                'permission_callback' => function() { return current_user_can('manage_options'); },
            ]);
            // Roles CRUD
            register_rest_route('schoolms/v1', '/roles', [
                'methods' => 'POST',
                'callback' => [self::class, 'add_role'],
                'permission_callback' => function() { return current_user_can('manage_options'); },
            ]);
            register_rest_route('schoolms/v1', '/roles/(?P<id>\\d+)', [
                'methods' => 'PUT',
                'callback' => [self::class, 'update_role'],
                'permission_callback' => function() { return current_user_can('manage_options'); },
            ]);
            register_rest_route('schoolms/v1', '/roles/(?P<id>\\d+)', [
                'methods' => 'DELETE',
                'callback' => [self::class, 'delete_role'],
                'permission_callback' => function() { return current_user_can('manage_options'); },
            ]);
            // CSV Import/Export REST endpoints
            register_rest_route('schoolms/v1', '/import_csv', [
                'methods' => 'POST',
                'callback' => [self::class, 'handle_import_csv'],
                'permission_callback' => function() { return current_user_can('manage_options'); },
            ]);
            register_rest_route('schoolms/v1', '/export_csv', [
                'methods' => 'GET',
                'callback' => [self::class, 'handle_export_csv'],
                'permission_callback' => function() { return current_user_can('manage_options'); },
            ]);
            // Global search endpoint
            register_rest_route('schoolms/v1', '/search', [
                'methods' => 'GET',
                'callback' => [self::class, 'global_search'],
                'permission_callback' => function() { return is_user_logged_in(); },
            ]);
            // Teacher details
            register_rest_route('schoolms/v1', '/admins/(?P<id>\d+)', [
                'methods' => 'GET',
                'callback' => [self::class, 'get_admin'],
                'permission_callback' => '__return_true',
            ]);
            // Timetable for teacher
            register_rest_route('schoolms/v1', '/timetable', [
                'methods' => 'GET',
                'callback' => [self::class, 'get_timetable'],
                'permission_callback' => '__return_true',
            ]);
            // Subjects for teacher
            register_rest_route('schoolms/v1', '/subjects', [
                'methods' => 'GET',
                'callback' => [self::class, 'get_subjects'],
                'permission_callback' => '__return_true',
            ]);
            // Google Calendar integration (view URL)
            register_rest_route('schoolms/v1', '/calendar', [
                'methods' => 'GET',
                'callback' => [self::class, 'get_calendar'],
                'permission_callback' => '__return_true',
            ]);
            // Google Calendar OAuth (redirect)
            register_rest_route('schoolms/v1', '/calendar_auth', [
                'methods' => 'GET',
                'callback' => [self::class, 'calendar_auth'],
                'permission_callback' => function() { return is_user_logged_in(); },
            ]);
            // Parent details
            register_rest_route('schoolms/v1', '/parents/(?P<id>\d+)', [
                'methods' => 'GET',
                'callback' => [self::class, 'get_parent'],
                'permission_callback' => '__return_true',
            ]);
            // Linked students for parent
            register_rest_route('schoolms/v1', '/parents/(?P<id>\d+)/students', [
                'methods' => 'GET',
                'callback' => [self::class, 'get_linked_students'],
                'permission_callback' => '__return_true',
            ]);
            // Messages with filters
            register_rest_route('schoolms/v1', '/messages', [
                'methods' => 'GET',
                'callback' => [self::class, 'get_messages'],
                'permission_callback' => '__return_true',
            ]);
            // Files with filters
            register_rest_route('schoolms/v1', '/files', [
                'methods' => 'GET',
                'callback' => [self::class, 'get_files'],
                'permission_callback' => '__return_true',
            ]);
            // Attendance Analytics Endpoints
            register_rest_route('schoolms/v1', '/attendance/summary', [
                'methods' => 'GET',
                'callback' => function($request) {
                    $class_id = intval($request['class_id']);
                    $start = sanitize_text_field($request['start']);
                    $end = sanitize_text_field($request['end']);
                    require_once __DIR__ . '/class-attendance-analytics.php';
                    $aa = new School_MS_Pro_Attendance_Analytics();
                    return $aa->get_attendance_summary($class_id, ['start' => $start, 'end' => $end]);
                },
                'permission_callback' => '__return_true',
            ]);
            register_rest_route('schoolms/v1', '/attendance/trends', [
                'methods' => 'GET',
                'callback' => function($request) {
                    $student_id = intval($request['student_id']);
                    require_once __DIR__ . '/class-attendance-analytics.php';
                    $aa = new School_MS_Pro_Attendance_Analytics();
                    return $aa->get_student_attendance_trends($student_id);
                },
                'permission_callback' => '__return_true',
            ]);
            // Alumni Endpoints
            register_rest_route('schoolms/v1', '/alumni/list', [
                'methods' => 'GET',
                'callback' => function($request) {
                    $year = intval($request['year']);
                    require_once __DIR__ . '/class-alumni.php';
                    $alumni = new School_MS_Pro_Alumni();
                    return $alumni->get_alumni_list($year);
                },
                'permission_callback' => '__return_true',
            ]);
            register_rest_route('schoolms/v1', '/alumni/export', [
                'methods' => 'GET',
                'callback' => function($request) {
                    $year = intval($request['year']);
                    $format = sanitize_text_field($request['format'] ?? 'csv');
                    require_once __DIR__ . '/class-alumni.php';
                    $alumni = new School_MS_Pro_Alumni();
                    return $alumni->export_alumni_contacts($year, $format);
                },
                'permission_callback' => '__return_true',
            ]);
            // Hostel Endpoints
            register_rest_route('schoolms/v1', '/hostel/rooms', [
                'methods' => 'GET',
                'callback' => function() {
                    require_once __DIR__ . '/class-hostel.php';
                    $hostel = new School_MS_Pro_Hostel();
                    return $hostel->get_hostel_rooms();
                },
                'permission_callback' => '__return_true',
            ]);
            register_rest_route('schoolms/v1', '/hostel/occupancy', [
                'methods' => 'GET',
                'callback' => function() {
                    require_once __DIR__ . '/class-hostel.php';
                    $hostel = new School_MS_Pro_Hostel();
                    return $hostel->get_hostel_occupancy();
                },
                'permission_callback' => '__return_true',
            ]);
            register_rest_route('schoolms/v1', '/hostel/assign', [
                'methods' => 'POST',
                'callback' => function($request) {
                    $student_id = intval($request['student_id']);
                    $room_id = intval($request['room_id']);
                    require_once __DIR__ . '/class-hostel.php';
                    $hostel = new School_MS_Pro_Hostel();
                    return $hostel->assign_room($student_id, $room_id);
                },
                'permission_callback' => '__return_true',
            ]);
            // Transport Endpoints
            register_rest_route('schoolms/v1', '/transport/routes', [
                'methods' => 'GET',
                'callback' => function() {
                    require_once __DIR__ . '/class-transport.php';
                    $transport = new School_MS_Pro_Transport();
                    return $transport->get_routes();
                },
                'permission_callback' => '__return_true',
            ]);
            register_rest_route('schoolms/v1', '/transport/occupancy', [
                'methods' => 'GET',
                'callback' => function() {
                    require_once __DIR__ . '/class-transport.php';
                    $transport = new School_MS_Pro_Transport();
                    return $transport->get_transport_occupancy();
                },
                'permission_callback' => '__return_true',
            ]);
            register_rest_route('schoolms/v1', '/transport/assign', [
                'methods' => 'POST',
                'callback' => function($request) {
                    $student_id = intval($request['student_id']);
                    $route_id = intval($request['route_id']);
                    require_once __DIR__ . '/class-transport.php';
                    $transport = new School_MS_Pro_Transport();
                    return $transport->assign_route($student_id, $route_id);
                },
                'permission_callback' => '__return_true',
            ]);
            // Exam Endpoints
            register_rest_route('schoolms/v1', '/exam/list', [
                'methods' => 'GET',
                'callback' => function($request) {
                    $class_id = intval($request['class_id']);
                    require_once __DIR__ . '/class-exam.php';
                    $exam = new School_MS_Pro_Exam();
                    return $exam->get_exams($class_id);
                },
                'permission_callback' => '__return_true',
            ]);
            register_rest_route('schoolms/v1', '/exam/results', [
                'methods' => 'GET',
                'callback' => function($request) {
                    $exam_id = intval($request['exam_id']);
                    require_once __DIR__ . '/class-exam.php';
                    $exam = new School_MS_Pro_Exam();
                    return $exam->get_results($exam_id);
                },
                'permission_callback' => '__return_true',
            ]);
            register_rest_route('schoolms/v1', '/exam/add', [
                'methods' => 'POST',
                'callback' => function($request) {
                    $data = $request->get_params();
                    require_once __DIR__ . '/class-exam.php';
                    $exam = new School_MS_Pro_Exam();
                    return $exam->add_exam($data);
                },
                'permission_callback' => '__return_true',
            ]);
            register_rest_route('schoolms/v1', '/exam/result/add', [
                'methods' => 'POST',
                'callback' => function($request) {
                    $data = $request->get_params();
                    require_once __DIR__ . '/class-exam.php';
                    $exam = new School_MS_Pro_Exam();
                    return $exam->add_result($data);
                },
                'permission_callback' => '__return_true',
            ]);
            // Inventory Endpoints
            register_rest_route('schoolms/v1', '/inventory/list', [
                'methods' => 'GET',
                'callback' => function() {
                    require_once __DIR__ . '/class-inventory.php';
                    $inv = new School_MS_Pro_Inventory();
                    return $inv->get_items();
                },
                'permission_callback' => '__return_true',
            ]);
            register_rest_route('schoolms/v1', '/inventory/add', [
                'methods' => 'POST',
                'callback' => function($request) {
                    $data = $request->get_params();
                    require_once __DIR__ . '/class-inventory.php';
                    $inv = new School_MS_Pro_Inventory();
                    return $inv->add_item($data);
                },
                'permission_callback' => '__return_true',
            ]);
            // Events Calendar Endpoints
            register_rest_route('schoolms/v1', '/events/list', [
                'methods' => 'GET',
                'callback' => function($request) {
                    $start = sanitize_text_field($request['start']);
                    $end = sanitize_text_field($request['end']);
                    require_once __DIR__ . '/class-events-calendar.php';
                    $events = new School_MS_Pro_Events_Calendar();
                    return $events->get_events($start, $end);
                },
                'permission_callback' => '__return_true',
            ]);
            register_rest_route('schoolms/v1', '/events/add', [
                'methods' => 'POST',
                'callback' => function($request) {
                    $data = $request->get_params();
                    require_once __DIR__ . '/class-events-calendar.php';
                    $events = new School_MS_Pro_Events_Calendar();
                    return $events->add_event($data);
                },
                'permission_callback' => '__return_true',
            ]);
            // Timetable Generator Endpoints
            register_rest_route('schoolms/v1', '/timetable/get', [
                'methods' => 'GET',
                'callback' => function($request) {
                    $class_id = intval($request['class_id']);
                    require_once __DIR__ . '/class-timetable-generator.php';
                    $tt = new School_MS_Pro_Timetable_Generator();
                    return $tt->get_timetable($class_id);
                },
                'permission_callback' => '__return_true',
            ]);
            register_rest_route('schoolms/v1', '/timetable/set', [
                'methods' => 'POST',
                'callback' => function($request) {
                    $data = $request->get_params();
                    require_once __DIR__ . '/class-timetable-generator.php';
                    $tt = new School_MS_Pro_Timetable_Generator();
                    return $tt->set_timetable_entry($data);
                },
                'permission_callback' => '__return_true',
            ]);
            // Messaging Endpoints
            register_rest_route('schoolms/v1', '/messages/list', [
                'methods' => 'GET',
                'callback' => function($request) {
                    $user_id = intval($request['user_id']);
                    require_once __DIR__ . '/class-messaging.php';
                    $msg = new School_MS_Pro_Messaging();
                    return $msg->get_messages($user_id);
                },
                'permission_callback' => '__return_true',
            ]);
            register_rest_route('schoolms/v1', '/messages/send', [
                'methods' => 'POST',
                'callback' => function($request) {
                    $data = $request->get_params();
                    require_once __DIR__ . '/class-messaging.php';
                    $msg = new School_MS_Pro_Messaging();
                    return $msg->send_message($data);
                },
                'permission_callback' => '__return_true',
            ]);
            // Notification Center Endpoints
            register_rest_route('schoolms/v1', '/notifications/list', [
                'methods' => 'GET',
                'callback' => function($request) {
                    $user_id = intval($request['user_id']);
                    require_once __DIR__ . '/class-notification-center.php';
                    $noti = new School_MS_Pro_Notification_Center();
                    return $noti->get_notifications($user_id);
                },
                'permission_callback' => '__return_true',
            ]);
            register_rest_route('schoolms/v1', '/notifications/send', [
                'methods' => 'POST',
                'callback' => function($request) {
                    $data = $request->get_params();
                    require_once __DIR__ . '/class-notification-center.php';
                    $noti = new School_MS_Pro_Notification_Center();
                    return $noti->send_notification($data);
                },
                'permission_callback' => '__return_true',
            ]);
            // Document Manager Endpoints
            register_rest_route('schoolms/v1', '/documents/list', [
                'methods' => 'GET',
                'callback' => function($request) {
                    $type = sanitize_text_field($request['type']);
                    require_once __DIR__ . '/class-document-manager.php';
                    $doc = new School_MS_Pro_Document_Manager();
                    return $doc->get_documents($type);
                },
                'permission_callback' => '__return_true',
            ]);
            register_rest_route('schoolms/v1', '/documents/add', [
                'methods' => 'POST',
                'callback' => function($request) {
                    $data = $request->get_params();
                    require_once __DIR__ . '/class-document-manager.php';
                    $doc = new School_MS_Pro_Document_Manager();
                    return $doc->add_document($data);
                },
                'permission_callback' => '__return_true',
            ]);
            // Advanced Analytics Endpoints
            register_rest_route('schoolms/v1', '/analytics/student-performance', [
                'methods' => 'GET',
                'callback' => function($request) {
                    $student_id = intval($request['student_id']);
                    require_once __DIR__ . '/class-advanced-analytics.php';
                    $aa = new School_MS_Pro_Advanced_Analytics();
                    return $aa->get_student_performance($student_id);
                },
                'permission_callback' => '__return_true',
            ]);
            register_rest_route('schoolms/v1', '/analytics/class-performance', [
                'methods' => 'GET',
                'callback' => function($request) {
                    $class_id = intval($request['class_id']);
                    require_once __DIR__ . '/class-advanced-analytics.php';
                    $aa = new School_MS_Pro_Advanced_Analytics();
                    return $aa->get_class_performance($class_id);
                },
                'permission_callback' => '__return_true',
            ]);
            register_rest_route('schoolms/v1', '/analytics/attendance-performance', [
                'methods' => 'GET',
                'callback' => function($request) {
                    $class_id = intval($request['class_id']);
                    require_once __DIR__ . '/class-advanced-analytics.php';
                    $aa = new School_MS_Pro_Advanced_Analytics();
                    return $aa->get_attendance_performance_correlation($class_id);
                },
                'permission_callback' => '__return_true',
            ]);
            // Fee Management Endpoints
            register_rest_route('schoolms/v1', '/fees/list', [
                'methods' => 'GET',
                'callback' => function($request) {
                    $class_id = intval($request['class_id']);
                    require_once __DIR__ . '/class-fee-management.php';
                    $fee = new School_MS_Pro_Fee_Management();
                    return $fee->get_fees($class_id);
                },
                'permission_callback' => '__return_true',
            ]);
            register_rest_route('schoolms/v1', '/fees/payments', [
                'methods' => 'GET',
                'callback' => function($request) {
                    $student_id = intval($request['student_id']);
                    require_once __DIR__ . '/class-fee-management.php';
                    $fee = new School_MS_Pro_Fee_Management();
                    return $fee->get_payments($student_id);
                },
                'permission_callback' => '__return_true',
            ]);
            register_rest_route('schoolms/v1', '/fees/add', [
                'methods' => 'POST',
                'callback' => function($request) {
                    $data = $request->get_params();
                    require_once __DIR__ . '/class-fee-management.php';
                    $fee = new School_MS_Pro_Fee_Management();
                    return $fee->add_fee($data);
                },
                'permission_callback' => '__return_true',
            ]);
            register_rest_route('schoolms/v1', '/fees/payment/add', [
                'methods' => 'POST',
                'callback' => function($request) {
                    $data = $request->get_params();
                    require_once __DIR__ . '/class-fee-management.php';
                    $fee = new School_MS_Pro_Fee_Management();
                    return $fee->add_payment($data);
                },
                'permission_callback' => '__return_true',
            ]);
            // Parent Portal Endpoints
            register_rest_route('schoolms/v1', '/parent/info', [
                'methods' => 'GET',
                'callback' => function($request) {
                    $parent_id = intval($request['parent_id']);
                    require_once __DIR__ . '/class-parent-portal.php';
                    $portal = new School_MS_Pro_Parent_Portal();
                    return $portal->get_parent($parent_id);
                },
                'permission_callback' => '__return_true',
            ]);
            register_rest_route('schoolms/v1', '/parent/children', [
                'methods' => 'GET',
                'callback' => function($request) {
                    $parent_id = intval($request['parent_id']);
                    require_once __DIR__ . '/class-parent-portal.php';
                    $portal = new School_MS_Pro_Parent_Portal();
                    return $portal->get_children($parent_id);
                },
                'permission_callback' => '__return_true',
            ]);
            // Payroll Endpoints
            register_rest_route('schoolms/v1', '/payroll/list', [
                'methods' => 'GET',
                'callback' => function($request) {
                    $staff_id = intval($request['staff_id']);
                    require_once __DIR__ . '/class-payroll.php';
                    $payroll = new School_MS_Pro_Payroll();
                    return $payroll->get_payroll($staff_id);
                },
                'permission_callback' => '__return_true',
            ]);
            register_rest_route('schoolms/v1', '/payroll/add', [
                'methods' => 'POST',
                'callback' => function($request) {
                    $data = $request->get_params();
                    require_once __DIR__ . '/class-payroll.php';
                    $payroll = new School_MS_Pro_Payroll();
                    return $payroll->add_payroll($data);
                },
                'permission_callback' => '__return_true',
            ]);
            // Custom Reporting Endpoints
            register_rest_route('schoolms/v1', '/report/low-attendance', [
                'methods' => 'GET',
                'callback' => function($request) {
                    $threshold = floatval($request['threshold'] ?? 0.75);
                    require_once __DIR__ . '/class-custom-reporting.php';
                    $cr = new School_MS_Pro_Custom_Reporting();
                    return $cr->students_with_low_attendance($threshold);
                },
                'permission_callback' => '__return_true',
            ]);
            register_rest_route('schoolms/v1', '/report/top-students', [
                'methods' => 'GET',
                'callback' => function($request) {
                    $limit = intval($request['limit'] ?? 10);
                    require_once __DIR__ . '/class-custom-reporting.php';
                    $cr = new School_MS_Pro_Custom_Reporting();
                    return $cr->top_performing_students($limit);
                },
                'permission_callback' => '__return_true',
            ]);
        });
    }
    // Books
    public static function get_books($request) {
        require_once __DIR__ . '/class-library.php';
        $filters = $request->get_params();
        return rest_ensure_response(School_MS_Pro_Library::get_books($filters));
    }
    public static function add_book($request) {
        require_once __DIR__ . '/class-library.php';
        $data = $request->get_json_params();
        $book_id = School_MS_Pro_Library::add_book($data);
        return rest_ensure_response(['id' => $book_id]);
    }
    // Students
    public static function get_students($request) {
        require_once __DIR__ . '/class-students.php';
        $filters = $request->get_params();
        $students = School_MS_Pro_Students::get_students($filters);
        return rest_ensure_response($students);
    }
    // Accounts
    public static function get_accounts($request) {
        require_once __DIR__ . '/class-accounts.php';
        $filters = $request->get_params();
        $accounts = School_MS_Pro_Accounts::get_accounts($filters);
        return rest_ensure_response($accounts);
    }
    // Admins
    public static function get_admins($request) {
        require_once __DIR__ . '/class-admins.php';
        $filters = $request->get_params();
        $admins = School_MS_Pro_Admins::get_admins($filters);
        return rest_ensure_response($admins);
    }
    // Transactions
    public static function get_transactions($request) {
        require_once __DIR__ . '/class-transactions.php';
        $filters = $request->get_params();
        $transactions = School_MS_Pro_Transactions::get_transactions($filters);
        return rest_ensure_response($transactions);
    }
    // Funds
    public static function get_funds($request) {
        require_once __DIR__ . '/class-funds.php';
        $filters = $request->get_params();
        $funds = School_MS_Pro_Funds::get_funds($filters);
        return rest_ensure_response($funds);
    }
    // Groups
    public static function get_groups($request) {
        require_once __DIR__ . '/class-groups.php';
        $filters = $request->get_params();
        $groups = School_MS_Pro_Groups::get_groups($filters);
        return rest_ensure_response($groups);
    }
    // Roles
    public static function get_roles($request) {
        require_once __DIR__ . '/class-roles.php';
        $filters = $request->get_params();
        $roles = School_MS_Pro_Roles::get_roles($filters);
        return rest_ensure_response($roles);
    }
    // Analytics (dynamic summary)
    public static function get_analytics($request) {
        global $wpdb;
        // Students count
        $students = $wpdb->get_var("SELECT COUNT(*) FROM {$wpdb->prefix}schoolms_students");
        // Funds sum
        $funds = $wpdb->get_var("SELECT SUM(amount) FROM {$wpdb->prefix}schoolms_funds");
        // Staff count (admins table)
        $staff = $wpdb->get_var("SELECT COUNT(*) FROM {$wpdb->prefix}schoolms_admins");
        // Graduates count (students table, where status = 'graduated')
        $graduates = $wpdb->get_var($wpdb->prepare("SELECT COUNT(*) FROM {$wpdb->prefix}schoolms_students WHERE status = %s", 'graduated'));
        return rest_ensure_response([
            'students' => intval($students),
            'funds' => floatval($funds),
            'staff' => intval($staff),
            'graduates' => intval($graduates)
        ]);
    }
    // Admins handlers
    public static function add_admin($request) {
        require_once __DIR__ . '/class-admins.php';
        $data = $request->get_json_params();
        $id = School_MS_Pro_Admins::add_admin($data);
        return rest_ensure_response(['id' => $id]);
    }
    public static function update_admin($request) {
        require_once __DIR__ . '/class-admins.php';
        $id = $request['id'];
        $data = $request->get_json_params();
        $result = School_MS_Pro_Admins::update_admin($id, $data);
        return rest_ensure_response(['updated' => $result]);
    }
    public static function delete_admin($request) {
        require_once __DIR__ . '/class-admins.php';
        $id = $request['id'];
        $result = School_MS_Pro_Admins::delete_admin($id);
        return rest_ensure_response(['deleted' => $result]);
    }
    // Accounts handlers
    public static function add_account($request) {
        require_once __DIR__ . '/class-accounts.php';
        $data = $request->get_json_params();
        $id = School_MS_Pro_Accounts::create_account($data);
        return rest_ensure_response(['id' => $id]);
    }
    public static function update_account($request) {
        require_once __DIR__ . '/class-accounts.php';
        $id = $request['id'];
        $data = $request->get_json_params();
        $result = School_MS_Pro_Accounts::update_account($id, $data);
        return rest_ensure_response(['updated' => $result]);
    }
    public static function delete_account($request) {
        require_once __DIR__ . '/class-accounts.php';
        $id = $request['id'];
        $result = School_MS_Pro_Accounts::delete_account($id);
        return rest_ensure_response(['deleted' => $result]);
    }
    // Transactions handlers
    public static function add_transaction($request) {
        require_once __DIR__ . '/class-transactions.php';
        $data = $request->get_json_params();
        $id = School_MS_Pro_Transactions::create_transaction($data);
        return rest_ensure_response(['id' => $id]);
    }
    public static function update_transaction($request) {
        require_once __DIR__ . '/class-transactions.php';
        $id = $request['id'];
        $data = $request->get_json_params();
        $result = School_MS_Pro_Transactions::update_transaction($id, $data);
        return rest_ensure_response(['updated' => $result]);
    }
    public static function delete_transaction($request) {
        require_once __DIR__ . '/class-transactions.php';
        $id = $request['id'];
        $result = School_MS_Pro_Transactions::delete_transaction($id);
        return rest_ensure_response(['deleted' => $result]);
    }
    // Funds handlers
    public static function add_fund($request) {
        require_once __DIR__ . '/class-funds.php';
        $data = $request->get_json_params();
        $id = School_MS_Pro_Funds::add_fund($data);
        return rest_ensure_response(['id' => $id]);
    }
    public static function update_fund($request) {
        require_once __DIR__ . '/class-funds.php';
        $id = $request['id'];
        $data = $request->get_json_params();
        $result = School_MS_Pro_Funds::update_fund($id, $data);
        return rest_ensure_response(['updated' => $result]);
    }
    public static function delete_fund($request) {
        require_once __DIR__ . '/class-funds.php';
        $id = $request['id'];
        $result = School_MS_Pro_Funds::delete_fund($id);
        return rest_ensure_response(['deleted' => $result]);
    }
    // Groups handlers
    public static function add_group($request) {
        require_once __DIR__ . '/class-groups.php';
        $data = $request->get_json_params();
        $id = School_MS_Pro_Groups::create_group($data);
        return rest_ensure_response(['id' => $id]);
    }
    public static function update_group($request) {
        require_once __DIR__ . '/class-groups.php';
        $id = $request['id'];
        $data = $request->get_json_params();
        $result = School_MS_Pro_Groups::update_group($id, $data);
        return rest_ensure_response(['updated' => $result]);
    }
    public static function delete_group($request) {
        require_once __DIR__ . '/class-groups.php';
        $id = $request['id'];
        $result = School_MS_Pro_Groups::delete_group($id);
        return rest_ensure_response(['deleted' => $result]);
    }
    // Roles handlers
    public static function add_role($request) {
        require_once __DIR__ . '/class-roles.php';
        $data = $request->get_json_params();
        $id = School_MS_Pro_Roles::create_role($data['name'], $data['permissions']);
        return rest_ensure_response(['id' => $id]);
    }
    public static function update_role($request) {
        require_once __DIR__ . '/class-roles.php';
        $id = $request['id'];
        $data = $request->get_json_params();
        $result = School_MS_Pro_Roles::update_role($id, $data['permissions']);
        return rest_ensure_response(['updated' => $result]);
    }
    public static function delete_role($request) {
        require_once __DIR__ . '/class-roles.php';
        $id = $request['id'];
        $result = School_MS_Pro_Roles::delete_role($id);
        return rest_ensure_response(['deleted' => $result]);
    }
    // CSV Import/Export for students, teachers, staff, subjects, classes, library
    public static function import_csv($type, $csv_path) {
        global $wpdb;
        $table_map = [
            'students' => $wpdb->prefix . 'schoolms_students',
            'teachers' => $wpdb->prefix . 'schoolms_admins',
            'staff' => $wpdb->prefix . 'schoolms_admins',
            'subjects' => $wpdb->prefix . 'schoolms_subjects',
            'classes' => $wpdb->prefix . 'schoolms_classes',
            'library' => $wpdb->prefix . 'schoolms_books',
        ];
        $table = $table_map[$type] ?? null;
        if (!$table) return false;
        if (($handle = fopen($csv_path, 'r')) !== false) {
            $header = fgetcsv($handle);
            while (($row = fgetcsv($handle)) !== false) {
                $data = array_combine($header, $row);
                $wpdb->insert($table, $data);
            }
            fclose($handle);
            return true;
        }
        return false;
    }
    public static function export_csv($type, $file_path) {
        global $wpdb;
        $table_map = [
            'students' => $wpdb->prefix . 'schoolms_students',
            'teachers' => $wpdb->prefix . 'schoolms_admins',
            'staff' => $wpdb->prefix . 'schoolms_admins',
            'subjects' => $wpdb->prefix . 'schoolms_subjects',
            'classes' => $wpdb->prefix . 'schoolms_classes',
            'library' => $wpdb->prefix . 'schoolms_books',
        ];
        $table = $table_map[$type] ?? null;
        if (!$table) return false;
        $results = $wpdb->get_results("SELECT * FROM $table", ARRAY_A);
        if (!$results) return false;
        $fp = fopen($file_path, 'w');
        fputcsv($fp, array_keys($results[0]));
        foreach ($results as $row) {
            fputcsv($fp, $row);
        }
        fclose($fp);
        return true;
    }
    // CSV Import handler
    public static function handle_import_csv($request) {
        $type = $request->get_param('type');
        $csv_path = $request->get_file_params()['file']['tmp_name'] ?? null;
        if (!$type || !$csv_path) return new WP_Error('invalid', 'Missing type or file', ['status' => 400]);
        require_once __DIR__ . '/class-api.php';
        $result = self::import_csv($type, $csv_path);
        return rest_ensure_response(['imported' => $result]);
    }
    // CSV Export handler
    public static function handle_export_csv($request) {
        $type = $request->get_param('type');
        $file_path = tempnam(sys_get_temp_dir(), 'schoolms_export_') . '.csv';
        require_once __DIR__ . '/class-api.php';
        $result = self::export_csv($type, $file_path);
        if (!$result) return new WP_Error('export_failed', 'Export failed', ['status' => 500]);
        $csv = file_get_contents($file_path);
        @unlink($file_path);
        return new WP_REST_Response($csv, 200, [
            'Content-Type' => 'text/csv',
            'Content-Disposition' => 'attachment; filename="' . $type . '.csv"',
        ]);
    }
    // Global search
    public static function global_search($request) {
        global $wpdb;
        $q = '%' . $wpdb->esc_like($request['q']) . '%';
        $results = [];
        // Students
        $students = $wpdb->get_results($wpdb->prepare("SELECT id, name FROM {$wpdb->prefix}schoolms_students WHERE name LIKE %s OR email LIKE %s LIMIT 10", $q, $q));
        foreach ($students as $s) {
            $results[] = [ 'type' => 'Student', 'label' => $s->name, 'url' => '/student-profile/' . $s->id ];
        }
        // Teachers (admins)
        $teachers = $wpdb->get_results($wpdb->prepare("SELECT id, name FROM {$wpdb->prefix}schoolms_admins WHERE name LIKE %s OR email LIKE %s LIMIT 10", $q, $q));
        foreach ($teachers as $t) {
            $results[] = [ 'type' => 'Teacher', 'label' => $t->name, 'url' => '/teacher-profile/' . $t->id ];
        }
        // Parents
        $parents = $wpdb->get_results($wpdb->prepare("SELECT id, name FROM {$wpdb->prefix}schoolms_parents WHERE name LIKE %s OR email LIKE %s LIMIT 10", $q, $q));
        foreach ($parents as $p) {
            $results[] = [ 'type' => 'Parent', 'label' => $p->name, 'url' => '/parent-profile/' . $p->id ];
        }
        // Messages
        $messages = $wpdb->get_results($wpdb->prepare("SELECT id, message FROM {$wpdb->prefix}schoolms_messages WHERE message LIKE %s LIMIT 10", $q));
        foreach ($messages as $m) {
            $results[] = [ 'type' => 'Message', 'label' => mb_strimwidth($m->message, 0, 60, '...'), 'url' => '/messages/' . $m->id ];
        }
        return rest_ensure_response($results);
    }
    public static function get_admin($request) {
        require_once __DIR__ . '/class-admins.php';
        $id = $request['id'];
        $admins = School_MS_Pro_Admins::get_admins(['id' => $id]);
        return rest_ensure_response($admins ? $admins[0] : null);
    }
    public static function get_timetable($request) {
        require_once __DIR__ . '/class-timetable.php';
        $teacher_id = $request->get_param('teacher_id');
        return rest_ensure_response(School_MS_Pro_Timetable::get_timetable_by_teacher($teacher_id));
    }
    public static function get_subjects($request) {
        require_once __DIR__ . '/class-roles.php';
        $teacher_id = $request->get_param('teacher_id');
        return rest_ensure_response(School_MS_Pro_Roles::get_subjects_by_teacher($teacher_id));
    }
    public static function get_calendar($request) {
        // For demo, return a sample public Google Calendar embed URL
        $teacher_id = $request->get_param('teacher_id');
        // In production, fetch/store teacher's calendar URL/token
        return rest_ensure_response(['url' => 'https://calendar.google.com/calendar/embed?src=en.indian%23holiday%40group.v.calendar.google.com&ctz=Asia/Kolkata']);
    }
    public static function calendar_auth($request) {
        // For demo, redirect to Google Calendar OAuth (not implemented)
        wp_redirect('https://accounts.google.com/o/oauth2/v2/auth');
        exit;
    }
    public static function get_parent($request) {
        require_once __DIR__ . '/class-parentpanel.php';
        $id = $request['id'];
        $parents = School_MS_Pro_ParentPanel::get_parents(['id' => $id]);
        return rest_ensure_response($parents ? $parents[0] : null);
    }
    public static function get_linked_students($request) {
        require_once __DIR__ . '/class-parentpanel.php';
        $parent_id = $request['id'];
        return rest_ensure_response(School_MS_Pro_ParentPanel::get_linked_students($parent_id));
    }
    public static function get_messages($request) {
        require_once __DIR__ . '/class-messages.php';
        $filters = $request->get_params();
        return rest_ensure_response(School_MS_Pro_Messages::get_messages($filters));
    }
    public static function get_files($request) {
        require_once __DIR__ . '/class-files.php';
        $filters = $request->get_params();
        return rest_ensure_response(School_MS_Pro_Files::get_files($filters));
    }
    public static function add_notification($request) {
        require_once __DIR__ . '/class-notifications.php';
        $data = $request->get_json_params();
        $id = School_MS_Pro_Notifications::add_notification($data);
        return rest_ensure_response(['id' => $id]);
    }
}
