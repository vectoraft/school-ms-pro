<?php
// Exam Management Module
class School_MS_Pro_Exam {
    private $wpdb;
    private $table_exams;
    private $table_results;
    public function __construct() {
        global $wpdb;
        $this->wpdb = $wpdb;
        $this->table_exams = $wpdb->prefix . 'schoolms_exams';
        $this->table_results = $wpdb->prefix . 'schoolms_exam_results';
    }
    // Get all exams for a class
    public function get_exams($class_id) {
        $sql = $this->wpdb->prepare("SELECT * FROM {$this->table_exams} WHERE class_id = %d ORDER BY date DESC", intval($class_id));
        return $this->wpdb->get_results($sql, ARRAY_A);
    }
    // Get results for an exam
    public function get_results($exam_id) {
        $sql = $this->wpdb->prepare("SELECT * FROM {$this->table_results} WHERE exam_id = %d", intval($exam_id));
        return $this->wpdb->get_results($sql, ARRAY_A);
    }
    // Add a new exam
    public function add_exam($data) {
        $inserted = $this->wpdb->insert($this->table_exams, [
            'class_id' => intval($data['class_id']),
            'title' => sanitize_text_field($data['title']),
            'date' => sanitize_text_field($data['date'])
        ]);
        return $inserted ? $this->wpdb->insert_id : false;
    }
    // Add exam result
    public function add_result($data) {
        $inserted = $this->wpdb->insert($this->table_results, [
            'exam_id' => intval($data['exam_id']),
            'student_id' => intval($data['student_id']),
            'marks' => floatval($data['marks'])
        ]);
        return $inserted ? $this->wpdb->insert_id : false;
    }
}
