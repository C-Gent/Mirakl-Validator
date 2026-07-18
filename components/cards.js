export function renderStats(stats) {
  const panel = document.getElementById("stats-panel");
  const grid = document.getElementById("stats-grid");

  grid.innerHTML = ""

  const items = [
    {
      icon: "📊",
      label: "Total Rows",
      value: stats.totalRows,
      type: "success"
    },
    {
      icon: "✔",
      label: "Valid Rows",
      value: stats.validRows,
      type: "success"
    },
    {
      icon: "⚠",
      label: "Invalid Rows",
      value: stats.invalidRows,
      type: stats.invalidRows > 0 ? "warning" : "success"
    },
    {
      icon: "♻",
      label: "Duplicates",
      value: stats.duplicates,
      type: stats.duplicates > 0 ? "warning" : "success"
    },
    {
      icon: "🏷",
      label: "Missing Parents",
      value: stats.missingParents,
      type: stats.missingParents > 0 ? "error" : "success"
    },
    {
      icon: "🔄",
      label: "Circular Refs",
      value: stats.circularRefs,
      type: stats.circularRefs > 0 ? "error" : "success"
    }
  ];

  items.forEach((item) => {
    const card = document.createElement("div");
    card.className = `stats-card ${item.type}`;

    card.innerHTML = `
      <div class="stats-card-icon">${item.icon}</div>
      <div class="stats-card-label">${item.label}</div>
      <div class="stats-card-value">${item.value}</div>
    `;

    grid.appendChild(card);
  });

  panel.classList.remove("hidden");
}
