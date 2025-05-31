<?php
// Timetable: manage class schedules, periods, and assignments (WordPress DB integration)
class School_MS_Pro_Timetable {
    public static function create_period($data) {
        global $wpdb;
        $table = $wpdb->prefix . 'schoolms_periods';
        $wpdb->insert($table, $data);
        return $wpdb->insert_id;
    }
    public static function update_period($period_id, $data) {
        global $wpdb;
        $table = $wpdb->prefix . 'schoolms_periods';
        return $wpdb->update($table, $data, ['id' => $period_id]);
    }
    public static function delete_period($period_id) {
        global $wpdb;
        $table = $wpdb->prefix . 'schoolms_periods';
        return $wpdb->delete($table, ['id' => $period_id]);
    }
    public static function get_timetable($class_id) {
        global $wpdb;
        $table = $wpdb->prefix . 'schoolms_periods';
        return $wpdb->get_results($wpdb->prepare("SELECT * FROM $table WHERE class_id = %d ORDER BY start_time ASC", $class_id));
    }
    public static function assign_teacher($period_id, $teacher_id) {
        global $wpdb;
        $table = $wpdb->prefix . 'schoolms_periods';
        return $wpdb->update($table, ['teacher_id' => $teacher_id], ['id' => $period_id]);
    }
    public static function get_timetable_by_teacher($teacher_id) {
        global $wpdb;
        $table = $wpdb->prefix . 'schoolms_periods';
        return $wpdb->get_results($wpdb->prepare("SELECT * FROM $table WHERE teacher_id = %d ORDER BY start_time ASC", $teacher_id));
    }
}
