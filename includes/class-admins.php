<?php
// Admin logic
class School_MS_Pro_Admins {
    public static function add_admin($data) {
        global $wpdb;
        $table = $wpdb->prefix . 'schoolms_admins';
        $wpdb->insert($table, $data);
        return $wpdb->insert_id;
    }
    public static function update_admin($admin_id, $data) {
        global $wpdb;
        $table = $wpdb->prefix . 'schoolms_admins';
        return $wpdb->update($table, $data, ['id' => $admin_id]);
    }
    public static function delete_admin($admin_id) {
        global $wpdb;
        $table = $wpdb->prefix . 'schoolms_admins';
        return $wpdb->delete($table, ['id' => $admin_id]);
    }
    public static function get_admins($filters = []) {
        global $wpdb;
        $table = $wpdb->prefix . 'schoolms_admins';
        $where = '1=1';
        foreach ($filters as $key => $val) {
            $where .= $wpdb->prepare(" AND `$key` = %s", $val);
        }
        return $wpdb->get_results("SELECT * FROM $table WHERE $where");
    }
}
