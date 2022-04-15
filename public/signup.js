const res = require("express/lib/response");

console.log('hello world')
let signup = document.getElementById('signup-button');

signup.addEventListener('click', (e) => {
  e.preventDefault();
  console.log(e);
  let first_name = document.getElementById("first-name").value;
  let last_name = document.getElementById("last-name").value;
  let password = document.getElementById("password").value;
  let email = document.getElementById("email").value;

  let body = {
    email: email,
    password: password,
    first_name: first_name,
    last_name: last_name,
  }

  fetch('/sign-up', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  }).then(res => res.json()).then(data => {
    console.log(data)

    let login_body = {
        email: email,
        password: password
    }
    

    fetch('/sign-in', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(login_body)
      }).then(res => res.json()).then(data => {
        console.log(data)
    
        location.href = "/dashboard";

      })
    // if (data.error) {
    //   let errors = data.error.map((error) => {
    //     return error
    //   })
    //    }

    //   document.getElementById('errors').innerHTML = errors
    // location.href = "/dashboard";
   
  })
})
