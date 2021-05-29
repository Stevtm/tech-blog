async function loginFormHandler(event) {
	// stop the page from reloading on submit
	event.preventDefault();

	// get the username and password details
	const username = document.getElementById("username-login");
	const password = document.getElementById("password-login");

	// if both fields are entered, send a fetch request to confirm that the parameters match the info in the database
	if (username && password) {
		// send request to login post route
		const response = await fetch("/api/users/login", {
			method: "post",
			body: JSON.stringify({
				username,
				password,
			}),
			headers: { "Content-Type": "application/json" },
		});

		if (response.ok) {
			console.log("success");
			document.location.replace("/dashboard");
		} else {
			alert(response.statusText);
		}
	}
}

document
	.getElementById("#login-form")
	.addEventListener("submit", loginFormHandler);
