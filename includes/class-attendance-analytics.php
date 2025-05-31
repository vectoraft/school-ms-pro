<?php
// Advanced Attendance Analytics Module
class School_MS_Pro_Attendance_Analytics {
    private $wpdb;
    private $table_attendance;
    public function __construct() {
        global $wpdb;
        $this->wpdb = $wpdb;
        $this->table_attendance = $wpdb->prefix . 'schoolms_attendance';
    }
    // Get attendance summary for a class and date range
    public function get_attendance_summary($class_id, $date_range) {
        $start = esc_sql($date_range['start']);
        $end = esc_sql($date_range['end']);
        $class_id = intval($class_id);
        $sql = $this->wpdb->prepare(
            "SELECT status, COUNT(*) as count FROM {$this->table_attendance} WHERE class_id = %d AND date BETWEEN %s AND %s GROUP BY status",
            $class_id, $start, $end
        );
        $results = $this->wpdb->get_results($sql, ARRAY_A);
        $summary = [ 'present' => 0, 'absent' => 0, 'late' => 0 ];
        foreach ($results as $row) {
            $summary[$row['status']] = intval($row['count']);
        }
        return $summary;
    }
    // Get attendance trends for a student (for dashboard charts)
    public function get_student_attendance_trends($student_id) {
        $student_id = intval($student_id);
        $sql = $this->wpdb->prepare(
            "SELECT date, status FROM {$this->table_attendance} WHERE student_id = %d ORDER BY date ASC",
            $student_id
        );
        $results = $this->wpdb->get_results($sql, ARRAY_A);
        $trends = [];
        foreach ($results as $row) {
            $trends[] = [
                'date' => $row['date'],
                'status' => $row['status']
            ];
        }
        return $trends;
    }
    // Export attendance report (CSV or JSON)
    public function export_attendance_report($class_id, $date_range, $format = 'csv') {
        $summary = $this->get_attendance_summary($class_id, $date_range);
        if ($format === 'json') {
            return json_encode($summary);
        } else {
            $csv = "Status,Count\n";
            foreach ($summary as $status => $count) {
                $csv .= ucfirst($status) . "," . $count . "\n";
            }
            return $csv;
        }
    }
    // ...existing code...
}
