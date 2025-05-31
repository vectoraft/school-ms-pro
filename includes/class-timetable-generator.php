<?php
// Timetable Generator Module
class School_MS_Pro_Timetable_Generator {
    private $wpdb;
    private $table_timetable;
    public function __construct() {
        global $wpdb;
        $this->wpdb = $wpdb;
        $this->table_timetable = $wpdb->prefix . 'schoolms_timetable';
    }
    // Get timetable for a class
    public function get_timetable($class_id) {
        $sql = $this->wpdb->prepare("SELECT * FROM {$this->table_timetable} WHERE class_id = %d ORDER BY day, period", intval($class_id));
        return $this->wpdb->get_results($sql, ARRAY_A);
    }
    // Add or update a timetable entry
    public function set_timetable_entry($data) {
        $exists = $this->wpdb->get_var($this->wpdb->prepare(
            "SELECT id FROM {$this->table_timetable} WHERE class_id = %d AND day = %s AND period = %d",
            intval($data['class_id']), sanitize_text_field($data['day']), intval($data['period'])
        ));
        if ($exists) {
            $this->wpdb->update($this->table_timetable, [
                'subject' => sanitize_text_field($data['subject']),
                'teacher' => sanitize_text_field($data['teacher'])
            ], [
                'id' => $exists
            ]);
            return $exists;
        } else {
            $inserted = $this->wpdb->insert($this->table_timetable, [
                'class_id' => intval($data['class_id']),
                'day' => sanitize_text_field($data['day']),
                'period' => intval($data['period']),
                'subject' => sanitize_text_field($data['subject']),
                'teacher' => sanitize_text_field($data['teacher'])
            ]);
            return $inserted ? $this->wpdb->insert_id : false;
        }
    }
}
