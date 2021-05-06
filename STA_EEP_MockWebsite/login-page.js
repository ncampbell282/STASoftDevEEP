const loginForm = document.getElementById("login-form");
const loginButton = document.getElementById("login-form-submit");
const loginErrorMsg = document.getElementById("login-error-mgs");

loginButton.addEventListener("click", (e) =>
{
  e.preventDefault();
  const username = loginForm.username.value;
  const password = loginForm.password.value;
  
  if (username === "test123" && password === "test123")
  {
      alert("You have sucessfully logged in.");
      location.reload();
  }
  else
      loginErrorMsg.style.opacity = 1;
});


