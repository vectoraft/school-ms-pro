<?php
// Groups management: create, update, delete, assign members (WordPress DB integration)
class School_MS_Pro_Groups {
    public static function create_group($data) {
        global $wpdb;
        $table = $wpdb->prefix . 'schoolms_groups';
        $wpdb->insert($table, $data);
        return $wpdb->insert_id;
    }
    public static function update_group($group_id, $data) {
        global $wpdb;
        $table = $wpdb->prefix . 'schoolms_groups';
        return $wpdb->update($table, $data, ['id' => $group_id]);
    }
    public static function delete_group($group_id) {
        global $wpdb;
        $table = $wpdb->prefix . 'schoolms_groups';
        return $wpdb->delete($table, ['id' => $group_id]);
    }
    public static function add_member($group_id, $user_id) {
        global $wpdb;
        $table = $wpdb->prefix . 'schoolms_group_members';
        $wpdb->insert($table, [
            'group_id' => $group_id,
            'user_id' => $user_id
        ]);
        return $wpdb->insert_id;
    }
    public static function remove_member($group_id, $user_id) {
        global $wpdb;
        $table = $wpdb->prefix . 'schoolms_group_members';
        return $wpdb->delete($table, [
            'group_id' => $group_id,
            'user_id' => $user_id
        ]);
    }
    public static function get_groups($filters = []) {
        global $wpdb;
        $table = $wpdb->prefix . 'schoolms_groups';
        $where = '1=1';
        foreach ($filters as $key => $val) {
            $where .= $wpdb->prepare(" AND `$key` = %s", $val);
        }
        return $wpdb->get_results("SELECT * FROM $table WHERE $where");
    }
    public static function get_group_members($group_id) {
        global $wpdb;
        $table = $wpdb->prefix . 'schoolms_group_members';
        return $wpdb->get_results($wpdb->prepare("SELECT * FROM $table WHERE group_id = %d", $group_id));
    }
}
