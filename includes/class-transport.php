<?php
// Transport Management Module
class School_MS_Pro_Transport {
    private $wpdb;
    private $table_routes;
    private $table_assignments;
    public function __construct() {
        global $wpdb;
        $this->wpdb = $wpdb;
        $this->table_routes = $wpdb->prefix . 'schoolms_transport_routes';
        $this->table_assignments = $wpdb->prefix . 'schoolms_transport_assignments';
    }
    // Get all transport routes
    public function get_routes() {
        $sql = "SELECT * FROM {$this->table_routes} ORDER BY route_name";
        return $this->wpdb->get_results($sql, ARRAY_A);
    }
    // Assign a student to a route
    public function assign_route($student_id, $route_id) {
        $student_id = intval($student_id);
        $route_id = intval($route_id);
        $assigned = $this->wpdb->insert(
            $this->table_assignments,
            [
                'student_id' => $student_id,
                'route_id' => $route_id,
                'assigned_at' => current_time('mysql')
            ]
        );
        return $assigned ? $this->wpdb->insert_id : false;
    }
    // Get transport occupancy (route and student count)
    public function get_transport_occupancy() {
        $sql = "SELECT r.route_name, COUNT(a.student_id) as occupancy FROM {$this->table_routes} r LEFT JOIN {$this->table_assignments} a ON r.id = a.route_id GROUP BY r.id ORDER BY r.route_name";
        return $this->wpdb->get_results($sql, ARRAY_A);
    }
    // ...existing code...
}
