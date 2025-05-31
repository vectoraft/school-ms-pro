<?php
// Notification Center Module
class School_MS_Pro_Notification_Center {
    private $wpdb;
    private $table_notifications;
    public function __construct() {
        global $wpdb;
        $this->wpdb = $wpdb;
        $this->table_notifications = $wpdb->prefix . 'schoolms_notifications';
    }
    // Get all notifications for a user
    public function get_notifications($user_id) {
        $sql = $this->wpdb->prepare("SELECT * FROM {$this->table_notifications} WHERE user_id = %d ORDER BY sent_at DESC", intval($user_id));
        return $this->wpdb->get_results($sql, ARRAY_A);
    }
    // Send a notification
    public function send_notification($data) {
        $inserted = $this->wpdb->insert($this->table_notifications, [
            'user_id' => intval($data['user_id']),
            'content' => sanitize_textarea_field($data['content']),
            'sent_at' => current_time('mysql')
        ]);
        return $inserted ? $this->wpdb->insert_id : false;
    }
}
