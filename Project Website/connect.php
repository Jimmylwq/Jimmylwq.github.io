<?php
if($_SERVER["REQUEST_METHOD"]=='POST'){
    $name=$_POST['name'];
    $password=$_POST['password'];
    $email=$_POST['email'];
    $gender=$_POST['gender'];

$con=new mysqli('localhost','root','','furninest')
;
if($con){
    //echo"Connection Successful";
    $sql="insert into `customer`(Name,email,password,gender)values('$name','$password','$email','$gender')";
    $result=mysqli_query($con,$sql);
    if($result){
        echo"Data inserted successfully";      
    }else{
        die(mysqli_error($con));
    }
}else{
    die(mysqli_error($con));
}
}

?>