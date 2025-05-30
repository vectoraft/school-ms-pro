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
        // Section shortcodes
        $sections = [
            'students', 'teachers', 'parents', 'library', 'fees', 'notifications', 'messages', 'analytics', 'audit'
        ];
        foreach ($sections as $section) {
            add_shortcode('schoolms_' . $section, function($atts) use ($section) {
                ob_start();
                echo '<div id="school-ms-pro-root" data-section="' . esc_attr($section) . '"></div>';
                echo '<script src="/wp-content/plugins/school-ms-pro/assets/js/main.js"></script>';
                return ob_get_clean();
            });
        }
    }

    public static function shortcode_help_guide() {
        return '<div class="schoolms-help-guide"><h2>School MS Pro Shortcodes & Elementor Blocks</h2>'
            . '<ul>'
            . '<li><b>[schoolms_dashboard]</b> — Main dashboard (React)</li>'
            . '<li><b>[schoolms_login]</b> — Login form</li>'
            . '<li><b>[schoolms_students]</b> — Students table</li>'
            . '<li><b>[schoolms_teachers]</b> — Teachers table</li>'
            . '<li><b>[schoolms_parents]</b> — Parents table</li>'
            . '<li><b>[schoolms_library]</b> — Library/books</li>'
            . '<li><b>[schoolms_fees]</b> — Fees/payments</li>'
            . '<li><b>[schoolms_notifications]</b> — Notifications</li>'
            . '<li><b>[schoolms_messages]</b> — Messaging/inbox</li>'
            . '<li><b>[schoolms_analytics]</b> — Analytics</li>'
            . '<li><b>[schoolms_audit]</b> — Audit log</li>'
            . '</ul>'
            . '<p>To use: Copy any shortcode above and paste it into a WordPress page, post, or Elementor Shortcode widget. For Elementor, search for "Shortcode" or use the School MS Pro blocks if available.</p>'
            . '</div>';
    }
}
