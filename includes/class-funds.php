<?php
// Funds logic
class School_MS_Pro_Funds {
    public static function add_fund($data) {
        global $wpdb;
        $table = $wpdb->prefix . 'schoolms_funds';
        $wpdb->insert($table, $data);
        return $wpdb->insert_id;
    }
    public static function update_fund($fund_id, $data) {
        global $wpdb;
        $table = $wpdb->prefix . 'schoolms_funds';
        return $wpdb->update($table, $data, ['id' => $fund_id]);
    }
    public static function delete_fund($fund_id) {
        global $wpdb;
        $table = $wpdb->prefix . 'schoolms_funds';
        return $wpdb->delete($table, ['id' => $fund_id]);
    }
    public static function get_funds($filters = []) {
        global $wpdb;
        $table = $wpdb->prefix . 'schoolms_funds';
        $where = '1=1';
        foreach ($filters as $key => $val) {
            $where .= $wpdb->prepare(" AND `$key` = %s", $val);
        }
        return $wpdb->get_results("SELECT * FROM $table WHERE $where");
    }
}
