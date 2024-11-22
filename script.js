
const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        const navbarToggler = document.getElementById('navbarNav');
        const bsCollapse = new bootstrap.Collapse(navbarToggler, { toggle: false });
        bsCollapse.hide();  // Close the navbar
    });
});

window.changeProfession = function () {
    const professions = [
        " an App Developer",
        "a Data & BI Analyst"
    ];

    let currentIndex = 0;
    const professionElement = document.getElementById('profession');

    if (!professionElement) {
        console.error('Element with ID "profession" not found.');
        return; // Exit if element is not found
    }

    function updateProfession() {
        // Add the "fadeOut" class to start the exit animation
        professionElement.classList.remove('animate__fadeInDownBig');
        professionElement.classList.add('animate__fadeOutDownBig');

        // After the fade-out animation finishes, change the text and trigger the fade-in
        setTimeout(() => {
            currentIndex = (currentIndex + 1) % professions.length;
            professionElement.textContent = professions[currentIndex];

            // Trigger the "fadeIn" animation after updating the text
            professionElement.classList.remove('animate__fadeOutDownBig');
            professionElement.classList.add('animate__fadeInDownBig');
        }, 1000); // Adjust this time to match the animation duration (1000ms = 1s)
    }

    // Change profession every 4 seconds (3000ms + 1000ms for fade-out)
    setInterval(updateProfession, 2000);
};

// Call this function when the page loads
window.onload = function() {
    changeProfession();
};


//clear form
document.getElementById('contactForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    const statusMessage = document.getElementById('statusMessage');

    try {
        const response = await fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });

        if (response.ok) {
            const result = await response.json();
            statusMessage.textContent = 'Form submitted successfully!';
            statusMessage.style.color = 'green';
            form.reset();
        } else {
            const error = await response.json();
            statusMessage.textContent = `Error: ${error.message}`;
            statusMessage.style.color = 'red';
        }
    } catch (error) {
        statusMessage.textContent = 'There was an error submitting the form. Please try again.';
        statusMessage.style.color = 'red';
        console.error('Error:', error);
    }
});