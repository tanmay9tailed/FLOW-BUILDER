# FLOW-Builder

**Live Demo:** [https://flowbuilder-gamma.vercel.app/](https://flowbuilder-gamma.vercel.app/)

FLOW-Builder is an interactive flow creation tool where you can visually design and connect different nodes to build custom workflows.  
Currently, the builder supports creating **Message Nodes**, but more node types will be added in the future.

---

## ✨ Features

- **Add Nodes** – Create new message nodes in the flow.
- **Add Edges** – Connect nodes with directional edges.
- **Remove Nodes & Edges** – Delete unwanted elements from the flow.
- **Drag & Position** – Move nodes freely to organize your layout.
- **Save Your Flow** – Store your flow in local storage and load it later.
- **Validation** – Ensures that every node (except the first) has at least one incoming edge before saving.

---

## 🚀 Future Plans

- Add different types of nodes (e.g., Decision Node, API Call Node, Delay Node, etc.).
- Allow exporting and importing flows in JSON format.
- Add styling options for nodes and edges.
- Implement collaborative real-time flow editing.

---

## 🛠 Tech Stack

- **Frontend:** React, React Flow
- **Deployment:** Vercel

---

## 📸 Screenshots

_(not available)_

---

## 📦 Installation

```bash
# Clone the repository
git clone <your-repo-url>

# Navigate into the project directory
cd flow-builder

# Install dependencies
npm install

# Start the development server
npm start
```
