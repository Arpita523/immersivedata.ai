# Workflow Document Evaluation System

This repository contains robust solutions for automated workflow document evaluation, including logic for document matching and premium React-based UI components for status visualization.

## Quick Start - View the UI

The simplest way to view the premium dashboard for both Q3 and Q4 is to open the following file directly in your web browser:

👉 **[UI_DASHBOARD.html](./UI_DASHBOARD.html)**

(Right-click the file in your explorer and select "Open with Browser" or "Copy Path" and paste it into your browser).

---

## Question Overviews

### Q3: Workflow Result Component
A premium React component designed to display the outcome of a workflow.
- **Props**: `{ decision: string, reason: string }`
- **Features**: Glowing status badges, glassmorphism design, and color-coded feedback (Success/Failure).

### Q4: Document Evaluator (Fixed & Improved)
A robust evaluation function and its matching UI.

**Manual Bug Identification (Fixes applied):**
1. **TypeError Prevention**: Added existence checks for `invoice` and `purchase_order` to prevent crashes if documents are missing.
2. **Input Validation**: Added `Array.isArray()` to ensure the function only processes valid document arrays.
3. **Logic Transparency**: Improved the return type to include a `reason` string, providing clear feedback on *why* a document was approved or rejected.

---

## CLI Logic Testing

To verify the logic in your terminal, navigate to the `questions` folder and run the following:

```bash
# To test Q3 Logic
node q3.js

# To test Q4 Logic
node q4.js
```

*Note: Terminal execution shows logic results only. Use UI_DASHBOARD.html for the full visual experience.*
