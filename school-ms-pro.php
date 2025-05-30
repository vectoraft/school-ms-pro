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
                echo do_shortcode('[schoolms_dashboard]');
            },
            'dashicons-welcome-learn-more',
            2
        );
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
