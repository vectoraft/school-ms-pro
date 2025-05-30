<?php
// Account/balance logic
class School_MS_Pro_Accounts {
    public static function create_account($data) {
        global $wpdb;
        $table = $wpdb->prefix . 'schoolms_accounts';
        $wpdb->insert($table, $data);
        return $wpdb->insert_id;
    }
    public static function update_account($account_id, $data) {
        global $wpdb;
        $table = $wpdb->prefix . 'schoolms_accounts';
        return $wpdb->update($table, $data, ['id' => $account_id]);
    }
    public static function delete_account($account_id) {
        global $wpdb;
        $table = $wpdb->prefix . 'schoolms_accounts';
        return $wpdb->delete($table, ['id' => $account_id]);
    }
    public static function get_accounts($filters = []) {
        global $wpdb;
        $table = $wpdb->prefix . 'schoolms_accounts';
        $where = '1=1';
        foreach ($filters as $key => $val) {
            $where .= $wpdb->prepare(" AND `$key` = %s", $val);
        }
        return $wpdb->get_results("SELECT * FROM $table WHERE $where");
    }
}
