<?php
// Events: create, update, delete, and manage school events (WordPress DB integration)
class School_MS_Pro_Events {
    public static function create_event($data) {
        global $wpdb;
        $table = $wpdb->prefix . 'schoolms_events';
        $wpdb->insert($table, $data);
        return $wpdb->insert_id;
    }
    public static function update_event($event_id, $data) {
        global $wpdb;
        $table = $wpdb->prefix . 'schoolms_events';
        return $wpdb->update($table, $data, ['id' => $event_id]);
    }
    public static function delete_event($event_id) {
        global $wpdb;
        $table = $wpdb->prefix . 'schoolms_events';
        return $wpdb->delete($table, ['id' => $event_id]);
    }
    public static function get_events($filters = []) {
        global $wpdb;
        $table = $wpdb->prefix . 'schoolms_events';
        $where = '1=1';
        foreach ($filters as $key => $val) {
            $where .= $wpdb->prepare(" AND `$key` = %s", $val);
        }
        return $wpdb->get_results("SELECT * FROM $table WHERE $where");
    }
    public static function add_participant($event_id, $user_id) {
        global $wpdb;
        $table = $wpdb->prefix . 'schoolms_event_participants';
        $wpdb->insert($table, [
            'event_id' => $event_id,
            'user_id' => $user_id
        ]);
        return $wpdb->insert_id;
    }
    public static function remove_participant($event_id, $user_id) {
        global $wpdb;
        $table = $wpdb->prefix . 'schoolms_event_participants';
        return $wpdb->delete($table, [
            'event_id' => $event_id,
            'user_id' => $user_id
        ]);
    }
    public static function get_event_participants($event_id) {
        global $wpdb;
        $table = $wpdb->prefix . 'schoolms_event_participants';
        return $wpdb->get_results($wpdb->prepare("SELECT * FROM $table WHERE event_id = %d", $event_id));
    }
}
