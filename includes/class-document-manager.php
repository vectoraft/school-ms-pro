<?php
// Document Manager Module
class School_MS_Pro_Document_Manager {
    private $wpdb;
    private $table_documents;
    public function __construct() {
        global $wpdb;
        $this->wpdb = $wpdb;
        $this->table_documents = $wpdb->prefix . 'schoolms_documents';
    }
    // Get all documents
    public function get_documents($type = null) {
        $where = $type ? $this->wpdb->prepare('WHERE type = %s', $type) : '';
        $sql = "SELECT * FROM {$this->table_documents} $where ORDER BY uploaded_at DESC";
        return $this->wpdb->get_results($sql, ARRAY_A);
    }
    // Add a new document record (metadata only)
    public function add_document($data) {
        $inserted = $this->wpdb->insert($this->table_documents, [
            'title' => sanitize_text_field($data['title']),
            'type' => sanitize_text_field($data['type']),
            'url' => esc_url_raw($data['url']),
            'uploaded_by' => intval($data['uploaded_by']),
            'uploaded_at' => current_time('mysql')
        ]);
        return $inserted ? $this->wpdb->insert_id : false;
    }
}
