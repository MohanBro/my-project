const loadBtn = document.getElementById("loadButton");
const message = document.getElementById("message");
const output = document.getElementById("output");

loadBtn.addEventListener("click", loadData);

async function loadData() {
    try {
        // Disable button so users cannot click it again
        loadBtn.disabled = true;

        // Show loading message while waiting for API
        message.textContent = "Loading...";

        // Clear old data
        output.innerHTML = "";

        // Request data from Random User API
        const res = await fetch(
            "https://randomuser.me/api/?results=5"
        );

        // Check if request was successful
        if (!res.ok) {
            throw new Error(`HTTP Error: ${res.status}`);
        }

        // Convert API response into JavaScript object
        const data = await res.json();

        // Show success message
        message.textContent = "Users loaded successfully!";

        // Display the users on the webpage
        output.innerHTML = data.results
            .map(
                user => `
                <div class="user-card">
                    <!-- User full name -->
                    <p>Name: ${user.name.first} ${user.name.last}</p>

                    <!-- User email -->
                    <p>Email: ${user.email}</p>

                    <!-- User phone number -->
                    <p>Phone: ${user.phone}</p>

                    <!-- User city -->
                    <p>City: ${user.location.city}</p>

                    <!-- User country -->
                    <p>Country: ${user.location.country}</p>
                </div>
            `
            )
            .join("");

    } catch (err) {
        // Print error in browser console
        console.log(err.message);

        // Show friendly error message to user
        message.textContent =
            "Sorry, the data could not be loaded.";
    } finally {
        // Runs whether the request succeeded or failed
        loadBtn.disabled = false;
    }
}