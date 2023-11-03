<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewportt" content="width=device-width, initial-scale=1.0">
    <title>Sign in to Furniture</title>
    <link rel="stylesheet" href="sign.css">
</head>
<body>
    <h1>Sign in</h1>
    <div class="container">
        <form action="connect.php" method="post">
        <div>
            <label>Name</label>
            <input type="text" name="name" placeholder="Enter your Name" >
        </div>
        <div>
            <label>Password</label>
            <input type="password" name="password" placeholder="Enter your Password" autocomplete="off">
        </div>
        <div>
            <label>Email</label>
            <input type="email" name="email" placeholder="Enter your Email">
        </div>
        <div class="genderContainer">
            <label>Gender</label>
            <input class="gender1" type="radio" name="gender" value="Male" >Male
            <input class="gender1" type="radio" name="gender" value="Female">Female
        </div>
        <div class="btn">
            <button type="sumbit">Sumbit</button>
        </div>
        </form>
    </div>

</body>
</html>