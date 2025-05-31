<?php
// Payroll Management Module
class School_MS_Pro_Payroll {
    private $wpdb;
    private $table_payroll;
    public function __construct() {
        global $wpdb;
        $this->wpdb = $wpdb;
        $this->table_payroll = $wpdb->prefix . 'schoolms_payroll';
    }
    // Get all payroll records for a staff member
    public function get_payroll($staff_id) {
        $sql = $this->wpdb->prepare("SELECT * FROM {$this->table_payroll} WHERE staff_id = %d ORDER BY paid_at DESC", intval($staff_id));
        return $this->wpdb->get_results($sql, ARRAY_A);
    }
    // Add a payroll record
    public function add_payroll($data) {
        $inserted = $this->wpdb->insert($this->table_payroll, [
            'staff_id' => intval($data['staff_id']),
            'amount' => floatval($data['amount']),
            'paid_at' => current_time('mysql'),
            'notes' => sanitize_text_field($data['notes'])
        ]);
        return $inserted ? $this->wpdb->insert_id : false;
    }
}
