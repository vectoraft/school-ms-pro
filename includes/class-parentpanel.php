<?php
// Parent panel: manage parent accounts, link to students, and communication (WordPress DB integration)
class School_MS_Pro_ParentPanel {
    public static function add_parent($data) {
        global $wpdb;
        $table = $wpdb->prefix . 'schoolms_parents';
        $wpdb->insert($table, $data);
        return $wpdb->insert_id;
    }
    public static function update_parent($parent_id, $data) {
        global $wpdb;
        $table = $wpdb->prefix . 'schoolms_parents';
        return $wpdb->update($table, $data, ['id' => $parent_id]);
    }
    public static function delete_parent($parent_id) {
        global $wpdb;
        $table = $wpdb->prefix . 'schoolms_parents';
        return $wpdb->delete($table, ['id' => $parent_id]);
    }
    public static function link_student($parent_id, $student_id) {
        global $wpdb;
        $table = $wpdb->prefix . 'schoolms_parent_students';
        $wpdb->insert($table, [
            'parent_id' => $parent_id,
            'student_id' => $student_id
        ]);
        return $wpdb->insert_id;
    }
    public static function get_parents($filters = []) {
        global $wpdb;
        $table = $wpdb->prefix . 'schoolms_parents';
        $where = '1=1';
        foreach ($filters as $key => $val) {
            $where .= $wpdb->prepare(" AND `$key` = %s", $val);
        }
        return $wpdb->get_results("SELECT * FROM $table WHERE $where");
    }
    public static function get_linked_students($parent_id) {
        global $wpdb;
        $table = $wpdb->prefix . 'schoolms_parent_students';
        return $wpdb->get_results($wpdb->prepare("SELECT * FROM $table WHERE parent_id = %d", $parent_id));
    }
}
