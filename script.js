// Function to read CSV file and parse data
function loadCSVData(file) {
    fetch(file)
        .then(response => response.text())
        .then(data => {
            const rows = data.split("\n").slice(1);  // Remove header
            const leaderboardData = [];

            rows.forEach(row => {
                const cols = row.split(",");
                if (cols[0] && cols[cols.length - 1]) {  // Check if data is valid
                    leaderboardData.push({
                        name: cols[0].trim(),  // First column (name)
                        score: parseInt(cols[cols.length - 1].trim())  // Last column (score)
                    });
                }
            });

            // Sort by score in descending order
            leaderboardData.sort((a, b) => b.score - a.score);

            // Populate the leaderboard
            const tableBody = document.querySelector("#leaderboard tbody");
            tableBody.innerHTML = '';  // Clear existing rows

            leaderboardData.forEach((entry, index) => {
                const row = document.createElement("tr");

                const rankCell = document.createElement("td");
                rankCell.textContent = index + 1;
                row.appendChild(rankCell);

                const nameCell = document.createElement("td");
                nameCell.textContent = entry.name;
                row.appendChild(nameCell);

                const scoreCell = document.createElement("td");
                scoreCell.textContent = entry.score;
                row.appendChild(scoreCell);

                // Apply special styles for top 3 and bottom 'n' rows
                if (index === 0) {
                    row.classList.add('gold');
                } else if (index === 1) {
                    row.classList.add('silver');
                } else if (index === 2) {
                    row.classList.add('bronze');
                }

                // Apply bottom 'n' row styling, you can change the value of 'n'
                const n = 0;
                if (index >= leaderboardData.length - n) {
                    row.classList.add('bottom-red');
                }

                tableBody.appendChild(row);
            });
        })
        .catch(error => console.error("Error loading CSV file:", error));
}

// Load CSV data when the page loads
document.addEventListener("DOMContentLoaded", function () {
    loadCSVData("data.csv");  // Replace with your CSV file path
});
