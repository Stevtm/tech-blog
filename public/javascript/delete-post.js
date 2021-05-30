async function deletePostHandler(event) {
	// stop the default on-click behaviour of page reload
	event.preventDefault();

	// get the post id from the url
	const id = window.location.toString().split("/")[
		window.location.toString().split("/").length - 1
	];

	// send DELETE request to delete the post
	const response = await fetch(`/api/posts/${id}`, {
		method: "delete",
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
	.querySelector("#delete-button")
	.addEventListener("click", deletePostHandler);
