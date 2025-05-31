<?php
// Parent Portal Module
class School_MS_Pro_Parent_Portal {
    private $wpdb;
    private $table_parents;
    private $table_students;
    public function __construct() {
        global $wpdb;
        $this->wpdb = $wpdb;
        $this->table_parents = $wpdb->prefix . 'schoolms_parents';
        $this->table_students = $wpdb->prefix . 'schoolms_students';
    }
    // Get all children for a parent
    public function get_children($parent_id) {
        $sql = $this->wpdb->prepare("SELECT * FROM {$this->table_students} WHERE parent_id = %d", intval($parent_id));
        return $this->wpdb->get_results($sql, ARRAY_A);
    }
    // Get parent info
    public function get_parent($parent_id) {
        $sql = $this->wpdb->prepare("SELECT * FROM {$this->table_parents} WHERE id = %d", intval($parent_id));
        return $this->wpdb->get_row($sql, ARRAY_A);
    }
}
