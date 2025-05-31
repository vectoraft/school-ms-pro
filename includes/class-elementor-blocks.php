<?php
// Elementor widgets for all plugin features
class School_MS_Pro_Elementor_Blocks {
    public static function register_widgets() {
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
