import emailjs from "@emailjs/browser";

const form = document.getElementsByTagName("form")[0];

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const fullName = document.getElementById("name").value;
    const phone = document.getElementById("phone").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;
    const demo = document.getElementById("bookDemo").checked;

    let demoMessage = "This sender does not want a Demo!";

    if (demo) {
        demoMessage = "This sender wants a Demo!";
    }

    const content = `
    <p>Sender Name: <strong>${fullName}</strong></p>
    <p>Sender Email: <strong>${email}</strong></p>
    <p>Phone Number: <strong>${phone}</strong></p>
    <p><strong>${demoMessage}</strong></p>
    <p><strong>Message:</strong></p>
    <p>${message}</p>
    `;

    const submitButton = document.getElementById("submit");
    submitButton.innerText = "Sending...";
    submitButton.classList.remove("bg-primary");
    submitButton.classList.add("bg-primary/70");
    submitButton.disabled = true;

    await emailjs
        .send(
            import.meta.env.VITE_EMAILJS_SERVICE,
            import.meta.env.VITE_EMAILJS_TEMPLATE,
            {
                website: "Michelle's Math",
                content: content,
            },
            import.meta.env.VITE_EMAILJS_PUBLIC
        )
        .then(() => {
            alert("Message Sent Successfully");
            form.reset();
            submitButton.innerText = "Send Message";
            submitButton.classList.add("bg-primary");
            submitButton.classList.remove("bg-primary/70");
            submitButton.disabled = false;
        })
        .catch((e) => {
            alert(e,"Message was not sent");
            submitButton.innerText = "Send Message";
            submitButton.classList.add("bg-primary");
            submitButton.classList.remove("bg-primary/70");
            submitButton.disabled = false;
        });
});
