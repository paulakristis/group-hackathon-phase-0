// app.js — event handlers and CRUD orchestration

(function () {
  // ── State ──────────────────────────────────────────────────────────────────
  let editingId = null; // null = create mode; string id = edit mode

  // ── DOM references ─────────────────────────────────────────────────────────
  const form        = document.getElementById('expense-form');
  const inputDesc   = document.getElementById('input-description');
  const inputCat    = document.getElementById('input-category');
  const inputAmt    = document.getElementById('input-amount');
  const inputDate   = document.getElementById('input-date');
  const btnSubmit   = document.getElementById('btn-submit');
  const btnCancel   = document.getElementById('btn-cancel');
  const alertBox    = document.getElementById('alert-box');

  // ── Helpers ────────────────────────────────────────────────────────────────
  function refresh() {
    const records = getAll();
    renderTable(records, handleEdit, handleDelete);
    renderSummary(records);
  }

  function showAlert(message, type = 'success') {
    alertBox.textContent = message;
    alertBox.className = `alert alert-${type} alert-dismissible`;
    alertBox.classList.remove('d-none');
    setTimeout(() => alertBox.classList.add('d-none'), 3000);
  }

  function resetForm() {
    form.reset();
    editingId = null;
    btnSubmit.textContent = 'Add Expense';
    btnCancel.classList.add('d-none');
    inputDesc.focus();
  }

  function populateForm(record) {
    inputDesc.value  = record.description;
    inputCat.value   = record.category;
    inputAmt.value   = record.amount;
    inputDate.value  = record.date;
    editingId        = record.id;
    btnSubmit.textContent = 'Save Changes';
    btnCancel.classList.remove('d-none');
    inputDesc.focus();
    form.scrollIntoView({ behavior: 'smooth' });
  }

  // ── Handlers ───────────────────────────────────────────────────────────────
  function handleEdit(id) {
    const record = getAll().find(r => r.id === id);
    if (record) populateForm(record);
  }

  function handleDelete(id) {
    if (!confirm('Delete this expense?')) return;
    const deleted = deleteRecord(id);
    if (deleted) {
      showAlert('Expense deleted.');
      refresh();
    }
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const data = {
      description: inputDesc.value.trim(),
      category:    inputCat.value.trim(),
      amount:      parseFloat(inputAmt.value),
      date:        inputDate.value,
    };

    if (!data.description || !data.category || isNaN(data.amount) || !data.date) {
      showAlert('Please fill in all fields correctly.', 'danger');
      return;
    }

    if (data.amount <= 0) {
      showAlert('Amount must be greater than zero.', 'danger');
      return;
    }

    if (editingId) {
      updateRecord(editingId, data);
      showAlert('Expense updated successfully.');
    } else {
      addRecord(data);
      showAlert('Expense added successfully.');
    }

    resetForm();
    refresh();
  });

  btnCancel.addEventListener('click', resetForm);

  // ── Init ───────────────────────────────────────────────────────────────────
  // Set default date to today
  inputDate.value = new Date().toISOString().split('T')[0];
  refresh();
})();
