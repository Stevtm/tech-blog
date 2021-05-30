async function signupHandler(event) {
	// stop the default behaviour of page reload
	event.preventDefault();

	// get the values for username and password
	const username = document.querySelector("#username-signup").value.trim();
	const password = document.querySelector("#password-signup").value.trim();

	// only execute logic if both username and password have been populated
	if (username && password) {
		// send post request to create user
		const response = await fetch("/api/users", {
			method: "post",
			body: JSON.stringify({
				username,
				password,
			}),
			headers: {
				"Content-Type": "application/json",
			},
		});

		if (response.ok) {
			document.location.replace("/login");
		} else {
			alert(response.statusText);
		}
	}
}

document
	.querySelector("#signup-form")
	.addEventListener("submit", signupHandler);
