<?php
// Messages: send, receive, and manage messages between users (WordPress DB integration)
class School_MS_Pro_Messages {
    public static function send_message($from_user, $to_user, $message) {
        global $wpdb;
        $table = $wpdb->prefix . 'schoolms_messages';
        $wpdb->insert($table, [
            'from_user' => $from_user,
            'to_user' => $to_user,
            'message' => $message,
            'sent_at' => current_time('mysql'),
            'read' => 0
        ]);
        return $wpdb->insert_id;
    }
    public static function get_inbox($user_id) {
        global $wpdb;
        $table = $wpdb->prefix . 'schoolms_messages';
        return $wpdb->get_results($wpdb->prepare("SELECT * FROM $table WHERE to_user = %d ORDER BY sent_at DESC", $user_id));
    }
    public static function get_sent($user_id) {
        global $wpdb;
        $table = $wpdb->prefix . 'schoolms_messages';
        return $wpdb->get_results($wpdb->prepare("SELECT * FROM $table WHERE from_user = %d ORDER BY sent_at DESC", $user_id));
    }
    public static function delete_message($message_id) {
        global $wpdb;
        $table = $wpdb->prefix . 'schoolms_messages';
        return $wpdb->delete($table, ['id' => $message_id]);
    }
    public static function mark_as_read($message_id) {
        global $wpdb;
        $table = $wpdb->prefix . 'schoolms_messages';
        return $wpdb->update($table, ['read' => 1], ['id' => $message_id]);
    }
    public static function get_messages($filters = []) {
        global $wpdb;
        $table = $wpdb->prefix . 'schoolms_messages';
        $where = '1=1';
        $params = [];
        if (isset($filters['student_id'])) {
            $where .= $wpdb->prepare(" AND to_user = %d", $filters['student_id']);
        }
        if (isset($filters['parent_id'])) {
            $where .= $wpdb->prepare(" AND to_user = %d", $filters['parent_id']);
        }
        if (isset($filters['teacher_id'])) {
            $where .= $wpdb->prepare(" AND to_user = %d", $filters['teacher_id']);
        }
        return $wpdb->get_results("SELECT * FROM $table WHERE $where");
    }
}
