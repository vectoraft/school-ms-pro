<?php
// Student logic
class School_MS_Pro_Students {
    public static function add_student($data) {
        global $wpdb;
        $table = $wpdb->prefix . 'schoolms_students';
        $wpdb->insert($table, $data);
        return $wpdb->insert_id;
    }
    public static function update_student($student_id, $data) {
        global $wpdb;
        $table = $wpdb->prefix . 'schoolms_students';
        return $wpdb->update($table, $data, ['id' => $student_id]);
    }
    public static function delete_student($student_id) {
        global $wpdb;
        $table = $wpdb->prefix . 'schoolms_students';
        return $wpdb->delete($table, ['id' => $student_id]);
    }
    public static function get_students($filters = []) {
        global $wpdb;
        $table = $wpdb->prefix . 'schoolms_students';
        $where = '1=1';
        foreach ($filters as $key => $val) {
            $where .= $wpdb->prepare(" AND `$key` = %s", $val);
        }
        return $wpdb->get_results("SELECT * FROM $table WHERE $where");
    }
}
