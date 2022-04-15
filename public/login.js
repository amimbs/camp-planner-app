console.log('hello world');
let login = document.getElementById('login-button');

login.addEventListener('click', (e) => {
  e.preventDefault();
  console.log(e);
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;

  let body = {
    email: email,
    password: password
  }

  fetch('/sign-in', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  }).then(res => res.json()).then(data => {
    console.log(data)

    location.href = "/dashboard";
  })
})