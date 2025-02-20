document.getElementById("satisfaction").addEventListener("input", function() {
    document.getElementById("satisfactionValue").innerText = this.value;
});

async function analyzeCustomer() {
    let age = document.getElementById("age").value;
    let income = document.getElementById("income").value;
    let satisfaction = document.getElementById("satisfaction").value;

    if (!age || !income || !satisfaction) {
        alert("⚠️ Please fill all fields.");
        return;
    }

    document.getElementById("loading").style.display = "block"; // Show Loading

    let payload = {
        "input_data": [{
            "fields": ["Age", "Income", "Satisfaction"],
            "values": [[parseInt(age), parseInt(income), parseInt(satisfaction)]]
        }]
    };

    let response = await fetch("https://your-ngrok-url.ngrok-free.app/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
    });

    document.getElementById("loading").style.display = "none"; // Hide Loading

    let data = await response.json();
    document.getElementById("predictionResult").innerText = `✅ Predicted Segment: ${data.predictions[0].values[0][0]}`;
}
