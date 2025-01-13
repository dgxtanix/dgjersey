document.addEventListener("DOMContentLoaded", function() {
    // Function to populate jersey numbers dynamically
    function populateJerseyNumbers() {
        fetch('https://your-backend-api.com/api/stock')
            .then(response => response.json())
            .then(stock => {
                const jerseySelect = document.getElementById('jerseyNumber');
                jerseySelect.innerHTML = ''; // Clear any existing options
                stock.forEach(number => {
                    const option = document.createElement('option');
                    option.value = number;
                    option.textContent = number;
                    jerseySelect.appendChild(option);
                });
            })
            .catch(error => console.log('Error fetching stock:', error));
    }

    // Call function to populate jersey numbers when the page loads
    populateJerseyNumbers();

    // Handle form submission
    document.getElementById("orderForm").addEventListener("submit", function (event) {
        event.preventDefault();

        const formData = {
            from_name: document.getElementById('name').value,
            reply_to: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            jersey_name: document.getElementById('jerseyName').value,
            jersey_number: document.getElementById('jerseyNumber').value,
            note: document.getElementById('note').value,
        };

        // Send order data to your backend API
        fetch('https://your-backend-api.com/api/select-jersey', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ jerseyNumber: formData.jersey_number }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.message === 'Jersey selected successfully') {
                alert("Your order has been submitted successfully! The jersey is now out of stock.");
                populateJerseyNumbers(); // Refresh jersey numbers
            } else {
                alert("Sorry, this jersey is out of stock.");
            }
        })
        .catch(error => console.error('Error:', error));
    });
});
