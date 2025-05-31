<?php
// Notifications: send, schedule, and manage notifications (WordPress DB integration)
class School_MS_Pro_Notifications {
    public static function send_notification($user_id, $message, $type = 'info') {
        global $wpdb;
        $table = $wpdb->prefix . 'schoolms_notifications';
        $wpdb->insert($table, [
            'user_id' => $user_id,
            'message' => $message,
            'type' => $type,
            'created_at' => current_time('mysql'),
            'read' => 0
        ]);
        return $wpdb->insert_id;
    }
    public static function schedule_notification($user_id, $message, $send_at) {
        global $wpdb;
        $table = $wpdb->prefix . 'schoolms_notifications';
        $wpdb->insert($table, [
            'user_id' => $user_id,
            'message' => $message,
            'type' => 'scheduled',
            'created_at' => $send_at,
            'read' => 0
        ]);
        return $wpdb->insert_id;
    }
    public static function get_notifications($user_id) {
        global $wpdb;
        $table = $wpdb->prefix . 'schoolms_notifications';
        return $wpdb->get_results($wpdb->prepare("SELECT * FROM $table WHERE user_id = %d ORDER BY created_at DESC", $user_id));
    }
    public static function mark_as_read($notification_id) {
        global $wpdb;
        $table = $wpdb->prefix . 'schoolms_notifications';
        return $wpdb->update($table, ['read' => 1], ['id' => $notification_id]);
    }
    public static function delete_notification($notification_id) {
        global $wpdb;
        $table = $wpdb->prefix . 'schoolms_notifications';
        return $wpdb->delete($table, ['id' => $notification_id]);
    }
    public static function add_notification($data) {
        global $wpdb;
        $table = $wpdb->prefix . 'schoolms_notifications';
        $wpdb->insert($table, [
            'user_id' => $data['user_id'] ?? null,
            'message' => $data['message'],
            'type' => $data['type'] ?? 'info',
            'priority' => $data['priority'] ?? 'normal',
            'scheduled_at' => $data['scheduled_at'] ?? current_time('mysql'),
            'created_at' => current_time('mysql'),
            'read' => 0,
        ]);
        return $wpdb->insert_id;
    }
    // Send notification email using WP SMTP settings
    public static function send_email($to, $subject, $message, $headers = array(), $attachments = array()) {
        // Use WordPress wp_mail (uses SMTP if configured)
        return wp_mail($to, $subject, $message, $headers, $attachments);
    }
}
