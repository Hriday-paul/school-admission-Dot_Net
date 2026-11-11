# AI Usage & Architectural Oversight

## Overview
The backend and frontend codebase of this project was generated and scaffolded with the assistance of **AI (Google Antigravity / Gemini)**. However, the entire **system architecture, business rules, admission flow, and code structuring were strictly guided, reviewed, and refined by human architectural decisions**.

---

## 🛠️ AI Tools & Scope of Utilization

| Tool | Project Area | Scope of Usage |
| :--- | :--- | :--- |
| **Google Antigravity (Gemini)** | **Backend** (ASP.NET Core 10 Web API) | Generated initial boilerplate for controllers (`ClassController`, `HoldController`), EF Core entities, repositories, and Dockerfile. |
| **Google Antigravity (Gemini)** | **Frontend** (Next.js 14 + Redux Toolkit) | Drafted UI routes (`/`, `/classes`, `/classes/[id]`, `/holds`, `/holds/[id]`, `/admin/classes`), RTK Query API endpoints, and Ant Design wrappers. |

---

## 🔍 Mistakes Made by AI & How They Were Caught and Corrected

While AI accelerated rapid prototyping, it made several architectural, structural, and security mistakes. As human architect and lead developer, I identified these flaws and guided the necessary corrections:

### 1. Monolithic / Single-File Bloat ("Garbage Code" in a Single File)
* **AI's Mistake:** The AI initially dumped hundreds of lines of unorganized, monolithic code into single `page.tsx` files—combining state logic, modals, tables, countdown cards, and action buttons in one place.
* **How I Caught & Corrected It:** Recognized this as unmaintainable code that violates single-responsibility principles. I enforced a clean, modular structure by having components polished and segregated into dedicated subcomponents under `_components/` (e.g., `ClassHeader.tsx`, `SeatAvailabilityCard.tsx`, `HoldTimerCard.tsx`, `ClassesList.tsx`, `AddClassModal.tsx`).

### 2. Hardcoded 10-Minute Hold Duration
* **AI's Mistake:** Seeing backend sample constants, the AI hardcoded "10 minutes" across UI copy, labels, and timer intervals.
* **How I Caught & Corrected It:** Identified that hold duration is a dynamic environment configuration (`HOLD_DURATION_SECONDS`). I instructed the removal of all hardcoded "10-minute" assumptions, ensuring the system dynamically computes remaining time directly from the backend's `expiresAt` response.

### 3. Exposing Sensitive Technical Content (`x-apikey`) in Public UI
* **AI's Mistake:** The AI openly displayed raw headers like `x-apikey: <certificate_id>` in UI tags and cards as if it were public debug text.
* **How I Caught & Corrected It:** Caught this privacy and security violation immediately. I directed that `x-apikey` is an internal transport header and must never be exposed publicly. Sensitive birth certificate identifiers were masked (e.g., `ABC••••123`), and all technical header labels were stripped from user-facing screens.

### 4. Missing Identity Validation on Action Buttons
* **AI's Mistake:** The AI allowed "Apply & Hold Seat", "Confirm Admission", and "Release Hold" buttons to remain visible and clickable even when no student birth certificate ID was present in state.
* **How I Caught & Corrected It:** Audited the student workflow and noted this bypassed authentication logic. I mandated that all action buttons must be hidden if the student's birth certificate ID is missing, prompting the user to enter their certificate ID first.

### 5. Countdown Timer Flaws & Code Duplication
* **AI's Mistake:** The AI implemented basic `MM:SS` countdown logic that failed when hold durations exceeded 60 minutes, and duplicated identical timer logic across several different pages.
* **How I Caught & Corrected It:** Identified the formatting limitation and redundant code. I required a centralized, reusable `CountdownTimer.tsx` component supporting full **Hours, Minutes, and Seconds (`HH:MM:SS`)** with dynamic status styling, shared across all pages.

---

## 📌 Summary
AI served as a high-velocity code drafting tool, but **the system flow, modular architecture, security hardening, and clean separation of concerns were completely driven and polished by human engineering oversight**.
