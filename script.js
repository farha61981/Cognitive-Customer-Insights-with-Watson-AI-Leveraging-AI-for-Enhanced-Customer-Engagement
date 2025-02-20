
// Predict Customer Churn
async function predictChurn() {
    let customerData = {
        "input_data": [{
            "fields": ["tenure", "monthly_charges", "contract_type"],
            "values": [
                [
                    document.getElementById("tenure").value,
                    document.getElementById("monthlyCharges").value,
                    parseInt(document.getElementById("contract").value)
                ]
            ]
        }]
    };

    let response = await fetch(FLASK_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(customerData)
    });

    let data = await response.json();
    document.getElementById("result").innerHTML =
        `Prediction: ${data.predictions[0].values[0][0]} <br> Probability: ${(data.predictions[0].values[0][1] * 100).toFixed(2)}%`;
}

// Dummy Data for Customer Segmentation Chart
const ctx = document.getElementById('customerChart').getContext('2d');
const customerChart = new Chart(ctx, {
    type: 'pie',
    data: {
        labels: ['High-Value Customers', 'Churn Risks', 'New Users', 'Returning Users'],
        datasets: [{
            data: [30, 20, 25, 25],
            backgroundColor: ['#0073e6', '#ff4d4d', '#ffcc00', '#66cc99']
        }]
    }
});
