//Save the data to the webpage
let form = document.querySelector("form")
form.addEventListener("submit", (event) => {
    let Name = event.target.Name.value;
    let Email = event.target.Email.value;
    let Password = event.target.Password.value;

    var userData = JSON.parse(localStorage.getItem("userDetails")) ?? [];
    userData.push({
        'Name': Name,
        'Email': Email,
        'Password': Password
    })

    localStorage.setItem("userDetails", JSON.stringify(userData));
    event.preventDefault();
});


//check you data format one by one
function validateForm() {
    let Name = document.MYFORM.Name.value;
    if (Name == "") {
        alert("Please Enter Your Name 😣");
        return false;
    }
    let Email = document.MYFORM.Email.value;
    let EmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (Email == "") {
        alert("Please enter your email 🤔");
        return false;
    }

    if (!EmailRegex.test(Email)) {
        alert("Please Check Your Email Format 🤓");
        return false;
    }
    let Password = document.MYFORM.Password.value;
    if (Password == "") {
        alert("Please enter your password 😥");
        return false;
    }else{
        alert('Send Data Successfully 🤪');
    }
}


