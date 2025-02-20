document.getElementById("analyzeBtn").addEventListener("click", function() {
    const age = document.getElementById("age").value;
    const income = document.getElementById("income").value;
    const satisfaction = document.getElementById("satisfaction").value;
    const predictionText = document.getElementById("prediction");

    // Validate Inputs
    if (age === "" || income === "" || satisfaction === "") {
        predictionText.innerHTML = "❌ Please fill all fields!";
        predictionText.style.color = "red";
        return;
    }

    // Show "Analyzing..." while waiting for response
    predictionText.innerHTML = "Analyzing...";
    predictionText.style.color = "blue";

    // Prepare Data for API
    const requestData = {
        input_data: [{
            fields: ["Age", "Income", "Satisfaction"],
            values: [[parseInt(age), parseInt(income), parseInt(satisfaction)]]
        }]
    };

    // Send API Request to Flask
    fetch("https://your-ngrok-url.ngrok-free.app/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestData)
    })
    .then(response => response.json())
    .then(data => {
        console.log("API Response:", data);
        if (data.predictions && data.predictions[0].values.length > 0) {
            const prediction = data.predictions[0].values[0][0];
            predictionText.innerHTML = `Predicted Customer Segment: <strong>${prediction}</strong>`;
            predictionText.style.color = "green";
        } else {
            predictionText.innerHTML = "Error: No response received.";
            predictionText.style.color = "red";
        }
    })
    .catch(error => {
        console.error("Error:", error);
        predictionText.innerHTML = "Error processing request.";
        predictionText.style.color = "red";
    });
});
