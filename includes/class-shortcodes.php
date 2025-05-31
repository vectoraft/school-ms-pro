<?php
// Handles all plugin shortcodes and Elementor integration
class School_MS_Pro_Shortcodes {
    public static function register_shortcodes() {
        // List of all feature shortcodes
        $features = [
            'dashboard', 'login', 'students', 'teachers', 'parents', 'library', 'fees', 'notifications', 'messages', 'analytics', 'audit', 'roles',
        ];
        foreach ($features as $feature) {
            add_shortcode('schoolms_' . $feature, function($atts) use ($feature) {
                ob_start();
                if ($feature === 'login') {
                    include plugin_dir_path(__FILE__) . '../templates/login.php';
                } else {
                    echo '<div id="school-ms-pro-root" data-schoolms-page="' . esc_attr($feature) . '"></div>';
                    echo '<script src="/wp-content/plugins/school-ms-pro/assets/js/main.js"></script>';
                }
                return ob_get_clean();
            });
        }
    }
    public static function output_shortcode_guide() {
        $guide = "School MS Pro Shortcodes & Elementor Guide\n\n";
        $guide .= "[schoolms_dashboard] — Main dashboard (React)\n";
        $guide .= "[schoolms_login] — Login form\n";
        $guide .= "[schoolms_students] — Students table\n";
        $guide .= "[schoolms_teachers] — Teachers table\n";
        $guide .= "[schoolms_parents] — Parents table\n";
        $guide .= "[schoolms_library] — Library/books\n";
        $guide .= "[schoolms_fees] — Fees/payments\n";
        $guide .= "[schoolms_notifications] — Notifications\n";
        $guide .= "[schoolms_messages] — Messaging\n";
        $guide .= "[schoolms_analytics] — Analytics\n";
        $guide .= "[schoolms_audit] — Audit log\n";
        $guide .= "[schoolms_roles] — Roles/permissions\n";
        $guide .= "\nUsage: Paste any shortcode into a page, post, or widget. For Elementor, use the Shortcode widget and paste the code.\n";
        header('Content-Type: text/plain');
        header('Content-Disposition: attachment; filename="schoolms-shortcodes-guide.txt"');
        echo $guide;
        exit;
    }
    public static function register_elementor_widgets() {
        // Only register if Elementor is active
        if (!did_action('elementor/loaded')) return;
        add_action('elementor/widgets/widgets_registered', function($widgets_manager) {
            $widgets = [
                'dashboard' => 'School MS Pro Dashboard',
                'students' => 'Students Table',
                'teachers' => 'Teachers Table',
                'parents' => 'Parents Table',
                'library' => 'Library/Books',
                'fees' => 'Fees/Payments',
                'notifications' => 'Notifications',
                'messages' => 'Messaging',
                'analytics' => 'Analytics',
                'audit' => 'Audit Log',
                'roles' => 'Roles/Permissions',
            ];
            foreach ($widgets as $feature => $title) {
                $widgets_manager->register(new class($feature, $title) extends \Elementor\Widget_Base {
                    private $feature;
                    private $title;
                    public function __construct($feature, $title) {
                        $this->feature = $feature;
                        $this->title = $title;
                        parent::__construct();
                    }
                    public function get_name() { return 'schoolms_' . $this->feature; }
                    public function get_title() { return $this->title; }
                    public function get_icon() { return 'eicon-site-settings'; }
                    public function get_categories() { return ['general']; }
                    public function render() {
                        echo '<div id="school-ms-pro-root" data-schoolms-page="' . esc_attr($this->feature) . '"></div>';
                        echo '<script src="/wp-content/plugins/school-ms-pro/assets/js/main.js"></script>';
                    }
                });
            }
        });
    }
}
