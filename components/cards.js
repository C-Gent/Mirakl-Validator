export function renderStats(stats) {
  const panel = document.getElementById("stats-panel");

  panel.innerHTML = `
    <h2>Validation Stats</h2>
    <div class ="stats-grid">
      <div class="stat-card">
        <h3>Total Rows</h3>
        <p>${stats.totalRows}</p>
      </div>
      
     <div class="stat-card">
        <h3>Valid Rows</h3>
        <p>${stats.validRows}</p>
      </div>

      <div class="stat-card">
        <h3>Invalid Rows</h3>
        <p>${stats.invalidRows}</p>
      </div>

      <div class="stat-card">
        <h3>Duplicate Codes</h3>
        <p>${stats.duplicates}</p>
      </div>

      <div class="stat-card">
        <h3>Missing Parents</h3>
        <p>${stats.missingParents}</p>
      </div>

      <div class="stat-card">
        <h3>Circular References</h3>
        <p>${stats.circularRefs}</p>
      </div>
    </div>
    `;
}
