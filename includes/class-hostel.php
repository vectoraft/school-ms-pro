<?php
// Hostel Management Module
class School_MS_Pro_Hostel {
    private $wpdb;
    private $table_rooms;
    private $table_assignments;
    public function __construct() {
        global $wpdb;
        $this->wpdb = $wpdb;
        $this->table_rooms = $wpdb->prefix . 'schoolms_hostel_rooms';
        $this->table_assignments = $wpdb->prefix . 'schoolms_hostel_assignments';
    }
    // Get all hostel rooms
    public function get_hostel_rooms() {
        $sql = "SELECT * FROM {$this->table_rooms} ORDER BY room_number";
        return $this->wpdb->get_results($sql, ARRAY_A);
    }
    // Assign a student to a room
    public function assign_room($student_id, $room_id) {
        $student_id = intval($student_id);
        $room_id = intval($room_id);
        $assigned = $this->wpdb->insert(
            $this->table_assignments,
            [
                'student_id' => $student_id,
                'room_id' => $room_id,
                'assigned_at' => current_time('mysql')
            ]
        );
        return $assigned ? $this->wpdb->insert_id : false;
    }
    // Get hostel occupancy (room and student count)
    public function get_hostel_occupancy() {
        $sql = "SELECT r.room_number, COUNT(a.student_id) as occupancy FROM {$this->table_rooms} r LEFT JOIN {$this->table_assignments} a ON r.id = a.room_id GROUP BY r.id ORDER BY r.room_number";
        return $this->wpdb->get_results($sql, ARRAY_A);
    }
}
