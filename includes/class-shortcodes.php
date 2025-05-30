<?php
// Handles all plugin shortcodes and Elementor integration
class School_MS_Pro_Shortcodes {
    public static function register_shortcodes() {
        // Dashboard shortcode
        add_shortcode('schoolms_dashboard', function($atts) {
            ob_start();
            echo '<div id="school-ms-pro-root"></div>';
            echo '<script src="/wp-content/plugins/school-ms-pro/assets/js/main.js"></script>';
            return ob_get_clean();
        });
        // Login shortcode
        add_shortcode('schoolms_login', function($atts) {
            ob_start();
            include plugin_dir_path(__FILE__) . '../templates/login.php';
            return ob_get_clean();
        });
    }
}
