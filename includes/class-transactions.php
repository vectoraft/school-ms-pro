<?php
// Transaction logic, CSV export
class School_MS_Pro_Transactions {
    public static function create_transaction($data) {
        global $wpdb;
        $table = $wpdb->prefix . 'schoolms_transactions';
        $wpdb->insert($table, $data);
        return $wpdb->insert_id;
    }
    public static function update_transaction($transaction_id, $data) {
        global $wpdb;
        $table = $wpdb->prefix . 'schoolms_transactions';
        return $wpdb->update($table, $data, ['id' => $transaction_id]);
    }
    public static function delete_transaction($transaction_id) {
        global $wpdb;
        $table = $wpdb->prefix . 'schoolms_transactions';
        return $wpdb->delete($table, ['id' => $transaction_id]);
    }
    public static function get_transactions($filters = []) {
        global $wpdb;
        $table = $wpdb->prefix . 'schoolms_transactions';
        $where = '1=1';
        foreach ($filters as $key => $val) {
            $where .= $wpdb->prepare(" AND `$key` = %s", $val);
        }
        return $wpdb->get_results("SELECT * FROM $table WHERE $where");
    }
    public static function export_csv() {
        // Export transactions as CSV
    }
}
