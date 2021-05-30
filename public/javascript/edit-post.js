async function editPostHandler(event) {
	// stop the page from reloading on submit
	event.preventDefault();

	// get the post id from the url
	const id = window.location.toString().split("/")[
		window.location.toString().split("/").length - 1
	];

	// get the modified values for the title and the content
	const title = document.querySelector("#post-title").value.trim();
	const post_text = document.querySelector("#post-content").value.trim();

	// send a put request to update the post
	const response = await fetch(`/api/posts/${id}`, {
		method: "put",
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
	.querySelector("#edit-post-form")
	.addEventListener("submit", editPostHandler);
