document.getElementById("predictForm").addEventListener("submit", function(event) {
    event.preventDefault();

    let age = document.getElementById("age").value;
    let income = document.getElementById("income").value;
    let satisfaction = document.getElementById("satisfaction").value;

    let api_url = "https://your-backend-url.onrender.com/predict";  // 🚀 Change to your Flask API URL

    fetch(api_url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            input_data: [{
                fields: ["age", "income", "satisfaction"],
                values: [[age, income, satisfaction]]
            }]
        })
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById("result").innerHTML = 
            "Predicted Segment: " + data.predictions[0].values[0][0];
    })
    .catch(error => console.error("Error:", error));
});
