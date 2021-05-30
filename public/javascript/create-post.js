async function createPostHandler(event) {
	// stop the page from reloading on submit
	event.preventDefault();

	// get the title and content
	const title = document.querySelector("#post-title").value.trim();
	const post_text = document.querySelector("#post-content").value.trim();

	// send a POST request to create the new post
	const response = await fetch("/api/posts", {
		method: "post",
		body: JSON.stringify({
			title,
			post_text,
		}),
		headers: {
			"Content-Type": "application/json",
		},
	});

	if (response.ok) {
		document.location.replace("/dashboard");
	} else {
		alert(response.statusText);
	}
}

document
	.querySelector("#create-post-form")
	.addEventListener("submit", createPostHandler);
