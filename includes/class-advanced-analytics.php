<?php
// Advanced Analytics Module
class School_MS_Pro_Advanced_Analytics {
    private $wpdb;
    public function __construct() {
        global $wpdb;
        $this->wpdb = $wpdb;
    }
    // Get student performance analytics
    public function get_student_performance($student_id) {
        $student_id = intval($student_id);
        $grades = $this->wpdb->get_results($this->wpdb->prepare(
            "SELECT subject, AVG(marks) as avg_marks FROM {$this->wpdb->prefix}schoolms_exam_results WHERE student_id = %d GROUP BY subject",
            $student_id
        ), ARRAY_A);
        return $grades;
    }
    // Get class performance analytics
    public function get_class_performance($class_id) {
        $class_id = intval($class_id);
        $grades = $this->wpdb->get_results($this->wpdb->prepare(
            "SELECT subject, AVG(marks) as avg_marks FROM {$this->wpdb->prefix}schoolms_exam_results WHERE class_id = %d GROUP BY subject",
            $class_id
        ), ARRAY_A);
        return $grades;
    }
    // Get attendance vs performance correlation
    public function get_attendance_performance_correlation($class_id) {
        $class_id = intval($class_id);
        $sql = "SELECT s.student_id, AVG(a.status = 'present') as attendance_rate, AVG(r.marks) as avg_marks
                FROM {$this->wpdb->prefix}schoolms_attendance a
                JOIN {$this->wpdb->prefix}schoolms_exam_results r ON a.student_id = r.student_id
                JOIN {$this->wpdb->prefix}schoolms_students s ON s.id = a.student_id
                WHERE a.class_id = %d
                GROUP BY s.student_id";
        return $this->wpdb->get_results($this->wpdb->prepare($sql, $class_id), ARRAY_A);
    }
}
