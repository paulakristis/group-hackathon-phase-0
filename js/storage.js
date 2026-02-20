// storage.js — localStorage helpers

const STORAGE_KEY = 'crud_expenses';

/**
 * Return all records from localStorage (array).
 */
function getAll() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw);
  } catch (e) {
    console.warn('crud_expenses: localStorage data is corrupted, resetting.', e);
    localStorage.removeItem(STORAGE_KEY);
    return [];
  }
}

/**
 * Persist the full records array to localStorage.
 */
function saveAll(records) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
}

/**
 * Add a new record. Returns the created record with a generated id.
 */
function addRecord(record) {
  const records = getAll();
  record.id = Date.now().toString(36) + Math.random().toString(36).slice(2);
  records.push(record);
  saveAll(records);
  return record;
}

/**
 * Update an existing record by id. Returns the updated record or null.
 */
function updateRecord(id, updated) {
  const records = getAll();
  const idx = records.findIndex(r => r.id === id);
  if (idx === -1) return null;
  records[idx] = { ...records[idx], ...updated, id };
  saveAll(records);
  return records[idx];
}

/**
 * Delete a record by id. Returns true if deleted, false if not found.
 */
function deleteRecord(id) {
  const records = getAll();
  const filtered = records.filter(r => r.id !== id);
  if (filtered.length === records.length) return false;
  saveAll(filtered);
  return true;
}
