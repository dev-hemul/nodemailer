const FEEDBACK_FORM = document.getElementById("feedback-form");
const input_name = document.getElementById("name");
const input_phone = document.getElementById("phone");
const input_message = document.getElementById("message");

function sendFeedback(feedback) {
	fetch("/api/feedback", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(feedback),
	}).then((response) => response.json()).then((data) => {
		console.log(data);
		alert("Повідомлення успішно відправлено!");
	}).catch((error) => {
		console.error(error);
		alert("Повідомлення не відправлено!");
	})
}

FEEDBACK_FORM.addEventListener('submit', (e) => {
	e.preventDefault();
	const feedbackFormData = new FormData(e.target);
	console.log('feedbackFormData', feedbackFormData);
	const feedback = Object.fromEntries(feedbackFormData);
	console.log('feedback', feedback);

	sendFeedback(feedback);
	input_name.value = "";
	input_phone.value = "";
	input_message.value = "";
})