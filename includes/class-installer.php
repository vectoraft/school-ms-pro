<?php
// Handles plugin installation, upgrade, and uninstallation logic
class School_MS_Pro_Installer {
    public static function install() {
        global $wpdb;
        require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
        $charset_collate = $wpdb->get_charset_collate();

        // Books
        $books = $wpdb->prefix . 'schoolms_books';
        $sql_books = "CREATE TABLE $books (
            id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
            title VARCHAR(255),
            author VARCHAR(255),
            category_id BIGINT UNSIGNED,
            isbn VARCHAR(64),
            status VARCHAR(32),
            PRIMARY KEY (id)
        ) $charset_collate;";

        // Categories
        $categories = $wpdb->prefix . 'schoolms_categories';
        $sql_categories = "CREATE TABLE $categories (
            id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
            name VARCHAR(255),
            PRIMARY KEY (id)
        ) $charset_collate;";

        // Lending
        $lending = $wpdb->prefix . 'schoolms_lending';
        $sql_lending = "CREATE TABLE $lending (
            id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
            book_id BIGINT UNSIGNED,
            user_id BIGINT UNSIGNED,
            lend_date DATETIME,
            return_date DATETIME,
            PRIMARY KEY (id)
        ) $charset_collate;";

        // Notifications
        $notifications = $wpdb->prefix . 'schoolms_notifications';
        $sql_notifications = "CREATE TABLE $notifications (
            id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
            user_id BIGINT UNSIGNED,
            message TEXT,
            type VARCHAR(32),
            created_at DATETIME,
            read TINYINT(1) DEFAULT 0,
            PRIMARY KEY (id)
        ) $charset_collate;";

        // Groups
        $groups = $wpdb->prefix . 'schoolms_groups';
        $sql_groups = "CREATE TABLE $groups (
            id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
            name VARCHAR(255),
            status VARCHAR(32),
            PRIMARY KEY (id)
        ) $charset_collate;";
        $group_members = $wpdb->prefix . 'schoolms_group_members';
        $sql_group_members = "CREATE TABLE $group_members (
            id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
            group_id BIGINT UNSIGNED,
            user_id BIGINT UNSIGNED,
            PRIMARY KEY (id)
        ) $charset_collate;";

        // Messages
        $messages = $wpdb->prefix . 'schoolms_messages';
        $sql_messages = "CREATE TABLE $messages (
            id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
            from_user BIGINT UNSIGNED,
            to_user BIGINT UNSIGNED,
            message TEXT,
            sent_at DATETIME,
            read TINYINT(1) DEFAULT 0,
            PRIMARY KEY (id)
        ) $charset_collate;";

        // Events
        $events = $wpdb->prefix . 'schoolms_events';
        $sql_events = "CREATE TABLE $events (
            id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
            name VARCHAR(255),
            date DATE,
            location VARCHAR(255),
            description TEXT,
            PRIMARY KEY (id)
        ) $charset_collate;";
        $event_participants = $wpdb->prefix . 'schoolms_event_participants';
        $sql_event_participants = "CREATE TABLE $event_participants (
            id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
            event_id BIGINT UNSIGNED,
            user_id BIGINT UNSIGNED,
            PRIMARY KEY (id)
        ) $charset_collate;";

        // Timetable
        $periods = $wpdb->prefix . 'schoolms_periods';
        $sql_periods = "CREATE TABLE $periods (
            id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
            class_id BIGINT UNSIGNED,
            subject VARCHAR(255),
            start_time TIME,
            end_time TIME,
            teacher_id BIGINT UNSIGNED,
            PRIMARY KEY (id)
        ) $charset_collate;";

        // Files
        $files = $wpdb->prefix . 'schoolms_files';
        $sql_files = "CREATE TABLE $files (
            id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
            file_url TEXT,
            meta TEXT,
            uploaded_at DATETIME,
            PRIMARY KEY (id)
        ) $charset_collate;";

        // Parents
        $parents = $wpdb->prefix . 'schoolms_parents';
        $sql_parents = "CREATE TABLE $parents (
            id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
            name VARCHAR(255),
            email VARCHAR(255),
            phone VARCHAR(32),
            PRIMARY KEY (id)
        ) $charset_collate;";
        $parent_students = $wpdb->prefix . 'schoolms_parent_students';
        $sql_parent_students = "CREATE TABLE $parent_students (
            id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
            parent_id BIGINT UNSIGNED,
            student_id BIGINT UNSIGNED,
            PRIMARY KEY (id)
        ) $charset_collate;";

        // PDFs
        $pdfs = $wpdb->prefix . 'schoolms_pdfs';
        $sql_pdfs = "CREATE TABLE $pdfs (
            id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
            file_url TEXT,
            created_at DATETIME,
            PRIMARY KEY (id)
        ) $charset_collate;";

        // Audit
        $audit = $wpdb->prefix . 'schoolms_audit';
        $sql_audit = "CREATE TABLE $audit (
            id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
            user_id BIGINT UNSIGNED,
            action VARCHAR(255),
            details TEXT,
            created_at DATETIME,
            PRIMARY KEY (id)
        ) $charset_collate;";

        // Run all table creations
        dbDelta($sql_books);
        dbDelta($sql_categories);
        dbDelta($sql_lending);
        dbDelta($sql_notifications);
        dbDelta($sql_groups);
        dbDelta($sql_group_members);
        dbDelta($sql_messages);
        dbDelta($sql_events);
        dbDelta($sql_event_participants);
        dbDelta($sql_periods);
        dbDelta($sql_files);
        dbDelta($sql_parents);
        dbDelta($sql_parent_students);
        dbDelta($sql_pdfs);
        dbDelta($sql_audit);
    }
    public static function upgrade() {
        // Upgrade logic (call install for now)
        self::install();
    }
    public static function uninstall() {
        global $wpdb;
        // Optionally drop tables or clean up options
        // Example: $wpdb->query("DROP TABLE IF EXISTS ...");
    }
}
