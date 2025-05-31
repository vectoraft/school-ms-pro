<?php
// Files: upload, download, and manage files (WordPress DB integration)
class School_MS_Pro_Files {
    public static function upload_file($file, $meta = []) {
        // Use WordPress media uploader for real implementation
        if (!function_exists('wp_handle_upload')) {
            require_once(ABSPATH . 'wp-admin/includes/file.php');
        }
        $uploaded = wp_handle_upload($file, ['test_form' => false]);
        if (isset($uploaded['error'])) {
            return new WP_Error('upload_error', $uploaded['error']);
        }
        // Optionally insert as attachment
        $attachment = [
            'post_mime_type' => $uploaded['type'],
            'post_title' => sanitize_file_name($uploaded['file']),
            'post_content' => '',
            'post_status' => 'inherit',
        ];
        $attach_id = wp_insert_attachment($attachment, $uploaded['file']);
        require_once(ABSPATH . 'wp-admin/includes/image.php');
        $attach_data = wp_generate_attachment_metadata($attach_id, $uploaded['file']);
        wp_update_attachment_metadata($attach_id, $attach_data);
        // Save file info to schoolms_files table
        global $wpdb;
        $table = $wpdb->prefix . 'schoolms_files';
        $wpdb->insert($table, [
            'file_url' => $uploaded['url'],
            'meta' => maybe_serialize($meta),
            'uploaded_at' => current_time('mysql'),
        ]);
        return [
            'file_url' => $uploaded['url'],
            'attachment_id' => $attach_id,
            'db_id' => $wpdb->insert_id,
        ];
    }
    public static function download_file($file_id) {
        global $wpdb;
        $table = $wpdb->prefix . 'schoolms_files';
        return $wpdb->get_row($wpdb->prepare("SELECT * FROM $table WHERE id = %d", $file_id));
    }
    public static function delete_file($file_id) {
        global $wpdb;
        $table = $wpdb->prefix . 'schoolms_files';
        return $wpdb->delete($table, ['id' => $file_id]);
    }
    public static function get_files($filters = []) {
        global $wpdb;
        $table = $wpdb->prefix . 'schoolms_files';
        $where = '1=1';
        foreach ($filters as $key => $val) {
            $where .= $wpdb->prepare(" AND `$key` = %s", $val);
        }
        return $wpdb->get_results("SELECT * FROM $table WHERE $where");
    }
}
