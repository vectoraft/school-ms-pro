<?php
// Events Calendar Module
class School_MS_Pro_Events_Calendar {
    private $wpdb;
    private $table_events;
    public function __construct() {
        global $wpdb;
        $this->wpdb = $wpdb;
        $this->table_events = $wpdb->prefix . 'schoolms_events';
    }
    // Get all events
    public function get_events($start = null, $end = null) {
        $where = '';
        if ($start && $end) {
            $where = $this->wpdb->prepare('WHERE date BETWEEN %s AND %s', $start, $end);
        }
        $sql = "SELECT * FROM {$this->table_events} $where ORDER BY date ASC";
        return $this->wpdb->get_results($sql, ARRAY_A);
    }
    // Add a new event
    public function add_event($data) {
        $inserted = $this->wpdb->insert($this->table_events, [
            'title' => sanitize_text_field($data['title']),
            'date' => sanitize_text_field($data['date']),
            'description' => sanitize_textarea_field($data['description'])
        ]);
        return $inserted ? $this->wpdb->insert_id : false;
    }
}
