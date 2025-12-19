# Wellbore Schematic Visualization (FE-1)

## 📌 Overview

This task focuses on building a **vertical wellbore schematic** using frontend visualization techniques. The schematic visually represents **casing strings** and **geological formations** along a depth axis, mimicking standard oil & gas wellbore diagrams.

The goal is to demonstrate **data-driven SVG/graphics rendering**, correct axis orientation, and proportional scaling.

---

## 🎯 Problem Statement

Write frontend code (using **Plotly.js, D3.js, or SVG**) to draw a **vertical wellbore schematic** using the following data:

```json
{
  "casing": [
    { "size": 30, "top": 0, "bottom": 350 },
    { "size": 20, "top": 0, "bottom": 2500 },
    { "size": 13.375, "top": 0, "bottom": 5500 },
    { "size": 9.625, "top": 0, "bottom": 8360 }
  ],
  "formations": [
    { "name": "Sandstone", "depth": 1200 },
    { "name": "Shale", "depth": 4100 },
    { "name": "Limestone", "depth": 7000 }
  ]
}
```

### Requirements

* Depth plotted on the **Y-axis (inverted)**
* **Casing width scaled** proportionally by casing size
* **Formation markers** clearly displayed

---

## 🧩 Visualization Approach

### Coordinate System

* **Y-axis:** Depth (increases downward)
* **X-axis:** Used only for visual width (not quantitative)

Depth inversion ensures the schematic matches real-world wellbore representations, where deeper sections appear lower.

---

## 🛢️ Casing Representation

* Each casing is rendered as a **vertical rectangle**
* Rectangle height = `bottom - top`
* Rectangle width = proportional to `casing.size`
* Casings are centered horizontally for visual clarity

## 🪨 Formation Markers

* Each formation is represented by:

  * A horizontal line or marker across the wellbore
  * A text label showing the formation name
* Positioned using the formation’s depth value

This helps correlate casing placement with geological layers.

---

## 🛠️ Tech Stack

* **Visualization:** SVG 
* **Framework:** Next.js
* **Styling:** Tailwind CSS
* **Data Source:** Static JSON

---

## 📂 Project Structure

```bash
app/
├── page.tsx/
components/
├── wellborehole-schematics.tsx 
---

## 🚀 Running the Project

```bash
pnpm install
pnpm run dev
```

Navigate to `http://localhost:3000` to view the wellbore schematic.

---

## 🧠 Assumptions & Design Decisions

* All depths are measured in the same unit (feet or meters).
* Casing tops start at surface level (0 depth).
* Width scaling is linear to maintain visual simplicity.
* Static SVG rendering is used for clarity and performance.

---

## 🔄 Possible Enhancements

* Add depth gridlines and scale labels
* Color-code casings by size or type
* Add hover tooltips for casing and formation details
* Support dynamic or API-driven data
* Animate casing installation sequence

---

## 👤 Author

**Adebayo Akerele**
Frontend Developer
