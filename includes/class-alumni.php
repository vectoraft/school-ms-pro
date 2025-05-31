<?php
// Alumni Management Module
class School_MS_Pro_Alumni {
    private $wpdb;
    private $table_alumni;
    public function __construct() {
        global $wpdb;
        $this->wpdb = $wpdb;
        $this->table_alumni = $wpdb->prefix . 'schoolms_alumni';
    }
    // Get alumni list for a given year
    public function get_alumni_list($year) {
        $year = intval($year);
        $sql = $this->wpdb->prepare(
            "SELECT * FROM {$this->table_alumni} WHERE graduation_year = %d ORDER BY last_name, first_name",
            $year
        );
        return $this->wpdb->get_results($sql, ARRAY_A);
    }
    // Add a new alumni record
    public function add_alumni($data) {
        $inserted = $this->wpdb->insert(
            $this->table_alumni,
            [
                'first_name' => sanitize_text_field($data['first_name']),
                'last_name' => sanitize_text_field($data['last_name']),
                'email' => sanitize_email($data['email']),
                'graduation_year' => intval($data['graduation_year']),
                'phone' => sanitize_text_field($data['phone']),
                'current_position' => sanitize_text_field($data['current_position'])
            ]
        );
        return $inserted ? $this->wpdb->insert_id : false;
    }
    // Export alumni contacts (CSV or JSON)
    public function export_alumni_contacts($year, $format = 'csv') {
        $alumni = $this->get_alumni_list($year);
        if ($format === 'json') {
            return json_encode($alumni);
        } else {
            $csv = "First Name,Last Name,Email,Phone,Current Position\n";
            foreach ($alumni as $a) {
                $csv .= sprintf(
                    '"%s","%s","%s","%s","%s"\n',
                    $a['first_name'], $a['last_name'], $a['email'], $a['phone'], $a['current_position']
                );
            }
            return $csv;
        }
    }
    // ...existing code...
}
