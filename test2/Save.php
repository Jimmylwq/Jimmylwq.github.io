<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $password = $_POST['password'];

    $data = "Name: $name\n Email: $email\n Password: $password\n\n";

    $file = 'Sign in.txt';

    if (file_put_contents($file, $data, FILE_APPEND | LOCK_EX)) {
        echo 'Data has been saved to data.txt';
    } else {
        echo 'Failed to save data.';
    }
}
?>
