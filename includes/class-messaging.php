<?php
// Messaging Module
class School_MS_Pro_Messaging {
    private $wpdb;
    private $table_messages;
    public function __construct() {
        global $wpdb;
        $this->wpdb = $wpdb;
        $this->table_messages = $wpdb->prefix . 'schoolms_messages';
    }
    // Get all messages for a user
    public function get_messages($user_id) {
        $sql = $this->wpdb->prepare("SELECT * FROM {$this->table_messages} WHERE user_id = %d ORDER BY sent_at DESC", intval($user_id));
        return $this->wpdb->get_results($sql, ARRAY_A);
    }
    // Send a message
    public function send_message($data) {
        $inserted = $this->wpdb->insert($this->table_messages, [
            'user_id' => intval($data['user_id']),
            'sender_id' => intval($data['sender_id']),
            'content' => sanitize_textarea_field($data['content']),
            'sent_at' => current_time('mysql')
        ]);
        return $inserted ? $this->wpdb->insert_id : false;
    }
}
