async function createCommentHandler(event) {
	// prevent the default behaviour of page reload
	event.preventDefault();

	// get the contents of the comment from the form
	const comment_text = document.querySelector("#comment-text").value.trim();

	// get the post id from the path (user id is taken from the session)
	const post_id = window.location.toString().split("/")[
		window.location.toString().split("/").length - 1
	];

	// send POST request to create comment
	const response = await fetch("/api/comments", {
		method: "post",
		body: JSON.stringify({
			comment_text,
			post_id,
		}),
		headers: {
			"Content-Type": "application/json",
		},
	});

	if (response.ok) {
		document.location.reload();
	} else {
		alert(response.statusText);
	}
}

document
	.querySelector("#create-comment-form")
	.addEventListener("submit", createCommentHandler);
