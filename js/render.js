// render.js — DOM rendering helpers

/**
 * Render all expense records into the table body.
 * @param {Array} records
 * @param {Function} onEdit   - called with record id when Edit is clicked
 * @param {Function} onDelete - called with record id when Delete is clicked
 */
function renderTable(records, onEdit, onDelete) {
  const tbody = document.getElementById('expense-tbody');
  tbody.innerHTML = '';

  if (records.length === 0) {
    const tr = document.createElement('tr');
    tr.innerHTML = '<td colspan="5" class="text-center text-muted">No records yet. Add one above!</td>';
    tbody.appendChild(tr);
    return;
  }

  records.forEach(record => {
    const tr = document.createElement('tr');
    tr.dataset.id = record.id;
    tr.innerHTML = `
      <td>${escapeHtml(record.description)}</td>
      <td>${escapeHtml(record.category)}</td>
      <td class="text-end">$${escapeHtml(isNaN(parseFloat(record.amount)) ? '0.00' : parseFloat(record.amount).toFixed(2))}</td>
      <td>${escapeHtml(record.date)}</td>
      <td class="text-center">
        <button class="btn btn-sm btn-outline-primary me-1 btn-edit" data-id="${record.id}">Edit</button>
        <button class="btn btn-sm btn-outline-danger btn-delete" data-id="${record.id}">Delete</button>
      </td>
    `;
    tbody.appendChild(tr);
  });

  // Attach event listeners
  tbody.querySelectorAll('.btn-edit').forEach(btn => {
    btn.addEventListener('click', () => onEdit(btn.dataset.id));
  });
  tbody.querySelectorAll('.btn-delete').forEach(btn => {
    btn.addEventListener('click', () => onDelete(btn.dataset.id));
  });
}

/**
 * Render summary totals below the table.
 * @param {Array} records
 */
function renderSummary(records) {
  const total = records.reduce((sum, r) => sum + parseFloat(r.amount || 0), 0);
  const count = records.length;
  const avg = count > 0 ? total / count : 0;

  document.getElementById('summary-count').textContent = count;
  document.getElementById('summary-total').textContent = '$' + total.toFixed(2);
  document.getElementById('summary-avg').textContent = '$' + avg.toFixed(2);
}

/**
 * Escape HTML special characters to prevent XSS.
 */
function escapeHtml(str) {
  const div = document.createElement('div');
  div.appendChild(document.createTextNode(String(str)));
  return div.innerHTML;
}
