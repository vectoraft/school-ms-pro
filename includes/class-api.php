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
        });
    }
    // Books
    public static function get_books($request) {
        require_once __DIR__ . '/class-library.php';
        $filters = $request->get_params();
        $books = School_MS_Pro_Library::get_books($filters);
        return rest_ensure_response($books);
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
}
