# group-hackathon-phase-0 — Expense Tracker CRUD App

A single-page CRUD web application built with plain HTML, Bootstrap 5, and Vanilla JavaScript.
All data is persisted in the browser's `localStorage` — no server, no framework, no external APIs.

---

## Features

| Feature | Description |
|---|---|
| **Create** | Fill in the form and click **Add Expense** to add a new record. |
| **Read** | All expenses are listed in a sortable table immediately below the form. |
| **Update** | Click **Edit** on any row to populate the form; click **Save Changes** to apply. |
| **Delete** | Click **Delete** on any row (a confirmation prompt prevents accidents). |
| **Summary** | Live totals at a glance: record count, total amount, and average amount. |

---

## Project Structure

```
group-hackathon-phase-0/
├── index.html          # Single-page app shell + Bootstrap layout
├── css/
│   └── style.css       # Light custom styles (on top of Bootstrap)
└── js/
    ├── storage.js      # localStorage helpers (getAll / addRecord / updateRecord / deleteRecord)
    ├── render.js       # DOM rendering (renderTable, renderSummary)
    └── app.js          # Event handlers & CRUD orchestration
```

---

## Setup

No build step required — this is a pure static site.

### Option 1 — Open directly in a browser

```bash
# Clone the repository
git clone https://github.com/paulakristis/group-hackathon-phase-0.git
cd group-hackathon-phase-0

# Open index.html in your default browser (macOS / Linux / Windows)
open index.html        # macOS
xdg-open index.html    # Linux
start index.html       # Windows
```

### Option 2 — Serve locally (recommended for development)

Any static file server works. Examples:

```bash
# Python 3
python -m http.server 8080
# then open http://localhost:8080

# Node (npx)
npx serve .
# then open http://localhost:3000
```

---

## Usage

1. **Add an expense** — Enter a description, select a category, enter the amount and date, then click **Add Expense**.
2. **Edit an expense** — Click **Edit** on any table row; the form is pre-filled. Modify the fields and click **Save Changes**.
3. **Cancel editing** — Click **Cancel** to discard changes and return to add mode.
4. **Delete an expense** — Click **Delete** on any row and confirm the prompt.
5. **View totals** — The three summary cards update instantly after every change.

---

## Tech Stack

- **HTML5** — semantic markup
- **Bootstrap 5.3** — responsive layout and components (loaded from CDN)
- **Vanilla JavaScript (ES6)** — no framework, no library
- **localStorage** — client-side data persistence

---

## License

MIT

