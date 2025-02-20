// Dummy Customer Segmentation Data
const ctx = document.getElementById('customerChart').getContext('2d');
const customerChart = new Chart(ctx, {
    type: 'pie',
    data: {
        labels: ['High-Value Customers', 'Churn Risks', 'New Users', 'Returning Users'],
        datasets: [{
            label: 'Customer Segmentation',
            data: [30, 20, 25, 25],
            backgroundColor: ['#0073e6', '#ff4d4d', '#ffcc00', '#66cc99']
        }]
    }
});

// Chatbot Integration
async function sendMessage() {
    let userInput = document.getElementById("user-input").value;
    let chatLog = document.getElementById("chat-log");

    if (userInput.trim() === "") return;

    chatLog.innerHTML += `<p><strong>You:</strong> ${userInput}</p>`;

    // Fetch AI response (Using Dummy API for Watson Assistant)
    let response = await fetch("https://api.example.com/chatbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userInput })
    });

    let data = await response.json();
    chatLog.innerHTML += `<p><strong>Bot:</strong> ${data.reply}</p>`;

    document.getElementById("user-input").value = "";
}
