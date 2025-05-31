<?php
// Inventory Management Module
class School_MS_Pro_Inventory {
    private $wpdb;
    private $table_inventory;
    public function __construct() {
        global $wpdb;
        $this->wpdb = $wpdb;
        $this->table_inventory = $wpdb->prefix . 'schoolms_inventory';
    }
    // Get all inventory items
    public function get_items() {
        $sql = "SELECT * FROM {$this->table_inventory} ORDER BY name";
        return $this->wpdb->get_results($sql, ARRAY_A);
    }
    // Add a new inventory item
    public function add_item($data) {
        $inserted = $this->wpdb->insert($this->table_inventory, [
            'name' => sanitize_text_field($data['name']),
            'quantity' => intval($data['quantity']),
            'location' => sanitize_text_field($data['location'])
        ]);
        return $inserted ? $this->wpdb->insert_id : false;
    }
}
