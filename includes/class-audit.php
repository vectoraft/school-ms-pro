<?php
// Audit: log and retrieve audit events for compliance and tracking (WordPress DB integration)
class School_MS_Pro_Audit {
    public static function log_event($user_id, $action, $details = []) {
        global $wpdb;
        $table = $wpdb->prefix . 'schoolms_audit';
        $wpdb->insert($table, [
            'user_id' => $user_id,
            'action' => $action,
            'details' => maybe_serialize($details),
            'created_at' => current_time('mysql')
        ]);
        return $wpdb->insert_id;
    }
    public static function get_events($filters = []) {
        global $wpdb;
        $table = $wpdb->prefix . 'schoolms_audit';
        $where = '1=1';
        foreach ($filters as $key => $val) {
            $where .= $wpdb->prepare(" AND `$key` = %s", $val);
        }
        return $wpdb->get_results("SELECT * FROM $table WHERE $where ORDER BY created_at DESC");
    }
    public static function delete_event($event_id) {
        global $wpdb;
        $table = $wpdb->prefix . 'schoolms_audit';
        return $wpdb->delete($table, ['id' => $event_id]);
    }
    public static function download_log_csv() {
        global $wpdb;
        $table = $wpdb->prefix . 'schoolms_audit';
        $rows = $wpdb->get_results("SELECT * FROM $table");
        $csv = "id,user_id,action,details,created_at\n";
        foreach ($rows as $row) {
            $csv .= "$row->id,$row->user_id,$row->action,\"" . str_replace('"', '""', $row->details) . "\",$row->created_at\n";
        }
        header('Content-Type: text/csv');
        header('Content-Disposition: attachment; filename="schoolms-audit-log.csv"');
        echo $csv;
        exit;
    }
}
