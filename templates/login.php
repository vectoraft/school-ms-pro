<?php
// Login template for all roles
?><!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>School MS Pro Login</title>
  <link rel="stylesheet" href="/wp-content/plugins/school-ms-pro/assets/css/main.css">
  <link rel="stylesheet" href="/wp-content/plugins/school-ms-pro/assets/css/custom-theme.css">
  <style>
    .login-bg { background: linear-gradient(135deg, #2563eb 0%, #f59e42 100%); min-height: 100vh; display: flex; align-items: center; justify-content: center; }
    .login-card { background: #fff; border-radius: 1rem; box-shadow: 0 4px 24px 0 rgba(37,99,235,0.12); padding: 2.5rem 2rem; max-width: 400px; width: 100%; }
    .login-card h2 { color: #2563eb; margin-bottom: 1.5rem; }
    .login-card input { width: 100%; margin-bottom: 1rem; padding: 0.75rem; border: 1px solid #e5e7eb; border-radius: 0.5rem; }
    .login-card button { width: 100%; background: #2563eb; color: #fff; border: none; padding: 0.75rem; border-radius: 0.5rem; font-weight: 700; font-size: 1rem; transition: background 0.2s; }
    .login-card button:hover { background: #1e40af; }
    .login-card .role-select { margin-bottom: 1rem; }
  </style>
</head>
<body class="login-bg">
  <form class="login-card" method="post" action="<?php echo esc_url( site_url('wp-login.php', 'login_post') ); ?>">
    <h2>School MS Pro Login</h2>
    <input type="text" name="log" placeholder="Username or Email" required />
    <input type="password" name="pwd" placeholder="Password" required />
    <select name="role" class="role-select">
      <option value="">Select Role</option>
      <option value="super_admin">Super Admin</option>
      <option value="admin">Admin</option>
      <option value="staff">Staff</option>
      <option value="parent">Parent</option>
      <option value="student">Student</option>
    </select>
    <button type="submit">Login</button>
    <div style="margin-top:1rem;text-align:center;font-size:0.95rem;color:#888;">&copy; <?php echo date('Y'); ?> School MS Pro</div>
  </form>
</body>
</html>
