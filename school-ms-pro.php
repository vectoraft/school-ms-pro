<?php
/*
Plugin Name: School MS Pro
Description: Professional school management system plugin with full React dashboard, Elementor integration, and advanced features.
Version: 1.0.0
Author: Your Name
*/
// Bootstrapper will load all includes, assets, and initialize plugin

// Load includes
foreach (glob(__DIR__ . '/includes/class-*.php') as $file) {
    require_once $file;
}

// Register REST API endpoints for all major features
add_action('init', function() {
    if (class_exists('School_MS_Pro_API')) {
        School_MS_Pro_API::register_endpoints();
        // Example: extend with more API classes if modularized
    }
});

// Register shortcodes
add_action('init', function() {
    if (class_exists('School_MS_Pro_Shortcodes')) {
        School_MS_Pro_Shortcodes::register_shortcodes();
    }
});

// Register Elementor widgets
add_action('init', function() {
    if (class_exists('School_MS_Pro_Shortcodes')) {
        School_MS_Pro_Shortcodes::register_elementor_widgets();
    }
});

// Register plugin settings (example: global options)
add_action('admin_init', function() {
    register_setting('schoolms_options', 'schoolms_global_settings');
    add_settings_section('schoolms_main', 'School MS Pro Settings', null, 'schoolms');
    add_settings_field('schoolms_theme', 'Theme', function() {
        $options = get_option('schoolms_global_settings');
        echo '<input type="text" name="schoolms_global_settings[theme]" value="' . esc_attr($options['theme'] ?? '') . '" />';
    }, 'schoolms', 'schoolms_main');
    add_settings_field('schoolms_logo', 'Logo URL', function() {
        $options = get_option('schoolms_global_settings');
        echo '<input type="text" name="schoolms_global_settings[logo]" value="' . esc_attr($options['logo'] ?? '') . '" />';
    }, 'schoolms', 'schoolms_main');
    add_settings_field('schoolms_color', 'Primary Color', function() {
        $options = get_option('schoolms_global_settings');
        echo '<input type="color" name="schoolms_global_settings[color]" value="' . esc_attr($options['color'] ?? '#2563eb') . '" />';
    }, 'schoolms', 'schoolms_main');
});

// Add settings page to admin menu
add_action('admin_menu', function() {
    add_options_page('School MS Pro', 'School MS Pro', 'manage_options', 'schoolms', function() {
        echo '<div class="wrap"><h1>School MS Pro Settings</h1><form method="post" action="options.php">';
        settings_fields('schoolms_options');
        do_settings_sections('schoolms');
        submit_button();
        echo '</form></div>';
    });
});

// Add School MS Pro dashboard to admin menu for superadmin, principal, staff, teacher
add_action('admin_menu', function() {
    // Only show for allowed roles
    if (!is_user_logged_in()) return;
    $user = wp_get_current_user();
    $allowed = array('administrator', 'super_admin', 'principal', 'staff', 'teacher');
    $user_roles = (array) $user->roles;
    $is_super_admin = function_exists('is_super_admin') && is_super_admin();
    $has_role = array_intersect($allowed, $user_roles);
    if ($is_super_admin || $has_role) {
        add_menu_page(
            'School MS Pro',
            'School MS Pro',
            'read',
            'schoolms-dashboard',
            function() {
                echo '<div id="school-ms-pro-root" data-schoolms-page="dashboard"></div>';
                echo '<script src="/wp-content/plugins/school-ms-pro/assets/js/main.js"></script>';
            },
            'dashicons-welcome-learn-more',
            2
        );
        // Add submenus for all features
        $features = [
            'students' => 'Students',
            'teachers' => 'Teachers',
            'parents' => 'Parents',
            'library' => 'Library',
            'fees' => 'Fees',
            'notifications' => 'Notifications',
            'messages' => 'Messages',
            'analytics' => 'Analytics',
            'audit' => 'Audit Log',
            'roles' => 'Roles',
            'settings' => 'Settings',
        ];
        foreach ($features as $slug => $label) {
            add_submenu_page(
                'schoolms-dashboard',
                $label,
                $label,
                'read',
                'schoolms-' . $slug,
                function() use ($slug) {
                    echo '<div id="school-ms-pro-root" data-schoolms-page="' . esc_attr($slug) . '"></div>';
                    echo '<script src="/wp-content/plugins/school-ms-pro/assets/js/main.js"></script>';
                }
            );
        }
        // Add submenu for shortcode/Elementor guide
        add_submenu_page(
            'schoolms-dashboard',
            'Shortcodes & Elementor Guide',
            'Shortcodes & Guide',
            'read',
            'schoolms-shortcodes-guide',
            function() {
                if (isset($_GET['download']) && $_GET['download'] === '1') {
                    if (class_exists('School_MS_Pro_Shortcodes')) {
                        School_MS_Pro_Shortcodes::output_shortcode_guide();
                    }
                }
                echo '<div class="wrap"><h1>School MS Pro Shortcodes & Elementor Guide</h1>';
                echo '<p>Copy and paste these shortcodes into any page, post, or Elementor Shortcode widget.</p>';
                echo '<a class="button button-primary" href="?page=schoolms-shortcodes-guide&download=1">Download Guide (txt)</a>';
                echo '<pre style="margin-top:2em;background:#f8f8f8;padding:1em;border-radius:6px;">';
                echo esc_html("[schoolms_dashboard] — Main dashboard (React)\n[schoolms_login] — Login form\n[schoolms_students] — Students table\n[schoolms_teachers] — Teachers table\n[schoolms_parents] — Parents table\n[schoolms_library] — Library/books\n[schoolms_fees] — Fees/payments\n[schoolms_notifications] — Notifications\n[schoolms_messages] — Messaging\n[schoolms_analytics] — Analytics\n[schoolms_audit] — Audit log\n[schoolms_roles] — Roles/permissions\n\nUsage: Paste any shortcode into a page, post, or widget. For Elementor, use the Shortcode widget and paste the code.");
                echo '</pre></div>';
            }
        );
        // Add submenu for user guide
        add_submenu_page(
            'schoolms-dashboard',
            'User Guide',
            'User Guide',
            'read',
            'schoolms-user-guide',
            function() {
                if (isset($_GET['download']) && $_GET['download'] === '1') {
                    header('Content-Type: text/plain');
                    header('Content-Disposition: attachment; filename="USER_GUIDE.txt"');
                    readfile(plugin_dir_path(__FILE__) . 'USER_GUIDE.txt');
                    exit;
                }
                echo '<div class="wrap"><h1>School MS Pro User Guide</h1>';
                echo '<p>Download the full user guide for instructions on all features, shortcodes, Elementor, and more.</p>';
                echo '<a class="button button-primary" href="?page=schoolms-user-guide&download=1">Download User Guide (txt)</a>';
                echo '</div>';
            }
        );
        // Add submenu for audit log download
        add_submenu_page(
            'schoolms-dashboard',
            'Download Audit Log',
            'Download Audit Log',
            'manage_options',
            'schoolms-audit-log',
            function() {
                if (isset($_GET['download']) && $_GET['download'] === '1') {
                    if (class_exists('School_MS_Pro_Audit')) {
                        School_MS_Pro_Audit::download_log_csv();
                    }
                }
                echo '<div class="wrap"><h1>Download Audit Log</h1>';
                echo '<a class="button button-primary" href="?page=schoolms-audit-log&download=1">Download Audit Log (CSV)</a>';
                echo '</div>';
            }
        );
    }
});

// Enqueue React app assets only on School MS Pro dashboard admin page
add_action('admin_enqueue_scripts', function($hook) {
    // Only load on our dashboard page
    if (isset($_GET['page']) && $_GET['page'] === 'schoolms-dashboard') {
        $plugin_url = plugin_dir_url(__FILE__);
        wp_enqueue_style('schoolms-main', $plugin_url . 'assets/css/main.css', [], filemtime(__DIR__ . '/assets/css/main.css'));
        wp_enqueue_style('schoolms-theme', $plugin_url . 'assets/css/custom-theme.css', [], filemtime(__DIR__ . '/assets/css/custom-theme.css'));
        wp_enqueue_script('schoolms-react', $plugin_url . 'assets/js/main.js', ['wp-element'], filemtime(__DIR__ . '/assets/js/main.js'), true);
    }
});

// Run installer on plugin activation
register_activation_hook(__FILE__, ['School_MS_Pro_Installer', 'install']);
// Run upgrade on plugin update
add_action('upgrader_process_complete', function() {
    if (class_exists('School_MS_Pro_Installer')) {
        School_MS_Pro_Installer::upgrade();
    }
});
// Run uninstall on plugin uninstall
register_uninstall_hook(__FILE__, ['School_MS_Pro_Installer', 'uninstall']);
