<?php
// Fee Management Module
class School_MS_Pro_Fee_Management {
    private $wpdb;
    private $table_fees;
    private $table_payments;
    public function __construct() {
        global $wpdb;
        $this->wpdb = $wpdb;
        $this->table_fees = $wpdb->prefix . 'schoolms_fees';
        $this->table_payments = $wpdb->prefix . 'schoolms_payments';
    }
    // Get all fees for a class
    public function get_fees($class_id) {
        $sql = $this->wpdb->prepare("SELECT * FROM {$this->table_fees} WHERE class_id = %d ORDER BY due_date ASC", intval($class_id));
        return $this->wpdb->get_results($sql, ARRAY_A);
    }
    // Get payments for a student
    public function get_payments($student_id) {
        $sql = $this->wpdb->prepare("SELECT * FROM {$this->table_payments} WHERE student_id = %d ORDER BY paid_at DESC", intval($student_id));
        return $this->wpdb->get_results($sql, ARRAY_A);
    }
    // Add a new fee
    public function add_fee($data) {
        $inserted = $this->wpdb->insert($this->table_fees, [
            'class_id' => intval($data['class_id']),
            'title' => sanitize_text_field($data['title']),
            'amount' => floatval($data['amount']),
            'due_date' => sanitize_text_field($data['due_date'])
        ]);
        return $inserted ? $this->wpdb->insert_id : false;
    }
    // Add a payment
    public function add_payment($data) {
        $inserted = $this->wpdb->insert($this->table_payments, [
            'student_id' => intval($data['student_id']),
            'fee_id' => intval($data['fee_id']),
            'amount' => floatval($data['amount']),
            'paid_at' => current_time('mysql')
        ]);
        return $inserted ? $this->wpdb->insert_id : false;
    }
}
