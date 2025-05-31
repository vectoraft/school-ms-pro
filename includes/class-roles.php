<?php
// Role management logic
class School_MS_Pro_Roles {
    public static function create_role($role_name, $capabilities) {
        // Create new role
    }
    public static function delete_role($role_name) {
        // Delete role
    }
    public static function update_role($role_name, $capabilities) {
        // Update role
    }
    public static function get_roles($filters = []) {
        global $wpdb;
        $table = $wpdb->prefix . 'schoolms_roles';
        $where = '1=1';
        foreach ($filters as $key => $val) {
            $where .= $wpdb->prepare(" AND `$key` = %s", $val);
        }
        return $wpdb->get_results("SELECT * FROM $table WHERE $where");
    }
    public static function get_subjects_by_teacher($teacher_id) {
        global $wpdb;
        $table = $wpdb->prefix . 'schoolms_subjects';
        return $wpdb->get_results($wpdb->prepare("SELECT * FROM $table WHERE teacher_id = %d", $teacher_id));
    }
}
