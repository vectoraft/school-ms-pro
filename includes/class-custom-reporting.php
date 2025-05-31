<?php
// Custom Reporting Module
class School_MS_Pro_Custom_Reporting {
    private $wpdb;
    public function __construct() {
        global $wpdb;
        $this->wpdb = $wpdb;
    }
    // Generate a custom report (example: students with low attendance)
    public function students_with_low_attendance($threshold = 0.75) {
        $sql = "SELECT student_id, COUNT(*) as total, SUM(status = 'present') as present
                FROM {$this->wpdb->prefix}schoolms_attendance
                GROUP BY student_id
                HAVING (SUM(status = 'present') / COUNT(*)) < %f";
        return $this->wpdb->get_results($this->wpdb->prepare($sql, $threshold), ARRAY_A);
    }
    // Generate a custom report (example: top performing students)
    public function top_performing_students($limit = 10) {
        $sql = "SELECT student_id, AVG(marks) as avg_marks
                FROM {$this->wpdb->prefix}schoolms_exam_results
                GROUP BY student_id
                ORDER BY avg_marks DESC
                LIMIT %d";
        return $this->wpdb->get_results($this->wpdb->prepare($sql, $limit), ARRAY_A);
    }
}
