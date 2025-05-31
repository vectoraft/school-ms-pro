<?php
// Library management: books, categories, lending, returns
class School_MS_Pro_Library {
    // Add a new book to the library
    public static function add_book($data) {
        global $wpdb;
        $table = $wpdb->prefix . 'schoolms_books';
        $wpdb->insert($table, $data);
        return $wpdb->insert_id;
    }
    // Update book details
    public static function update_book($book_id, $data) {
        global $wpdb;
        $table = $wpdb->prefix . 'schoolms_books';
        return $wpdb->update($table, $data, ['id' => $book_id]);
    }
    // Delete a book from the library
    public static function delete_book($book_id) {
        global $wpdb;
        $table = $wpdb->prefix . 'schoolms_books';
        return $wpdb->delete($table, ['id' => $book_id]);
    }
    // Lend a book to a user
    public static function lend_book($book_id, $user_id) {
        global $wpdb;
        $table = $wpdb->prefix . 'schoolms_lending';
        $wpdb->insert($table, [
            'book_id' => $book_id,
            'user_id' => $user_id,
            'lend_date' => current_time('mysql'),
            'return_date' => null
        ]);
        return $wpdb->insert_id;
    }
    // Handle book return
    public static function return_book($book_id, $user_id) {
        global $wpdb;
        $table = $wpdb->prefix . 'schoolms_lending';
        return $wpdb->update($table, [
            'return_date' => current_time('mysql')
        ], [
            'book_id' => $book_id,
            'user_id' => $user_id,
            'return_date' => null
        ]);
    }
    // Get list of books, optionally filtered
    public static function get_books($filters = []) {
        global $wpdb;
        $table = $wpdb->prefix . 'schoolms_books';
        $where = '1=1';
        $params = [];
        if (isset($filters['title'])) {
            $where .= $wpdb->prepare(" AND title LIKE %s", '%' . $wpdb->esc_like($filters['title']) . '%');
        }
        if (isset($filters['author'])) {
            $where .= $wpdb->prepare(" AND author LIKE %s", '%' . $wpdb->esc_like($filters['author']) . '%');
        }
        if (isset($filters['status'])) {
            $where .= $wpdb->prepare(" AND status = %s", $filters['status']);
        }
        return $wpdb->get_results("SELECT * FROM $table WHERE $where");
    }
    // Get all book categories
    public static function get_categories() {
        global $wpdb;
        $table = $wpdb->prefix . 'schoolms_categories';
        return $wpdb->get_results("SELECT * FROM $table");
    }
    // Add a new category
    public static function add_category($name) {
        global $wpdb;
        $table = $wpdb->prefix . 'schoolms_categories';
        $wpdb->insert($table, ['name' => $name]);
        return $wpdb->insert_id;
    }
    // Delete a category
    public static function delete_category($category_id) {
        global $wpdb;
        $table = $wpdb->prefix . 'schoolms_categories';
        return $wpdb->delete($table, ['id' => $category_id]);
    }
}
