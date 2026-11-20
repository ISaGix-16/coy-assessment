# Coy — Mutual Discovery Tab

Full-stack implementation of **Coy's** double-opt-in **Discover** experience built with Next.js, React.js, TypeScript, Tailwind CSS, Node.js, and Prisma.

---

## Architecture & Privacy Guarantees

### Tech Stack
- **Frontend:** Next.js 16 (App Router), React.js, TypeScript, Tailwind CSS, Responsive Design
- **Backend:** Node.js, RESTful APIs
- **Database & ORM:** Prisma (`User`, `Swipe`, `Match` with `@@unique` constraints)
- **Tools:** Git, GitHub

### Core Privacy Invariant
- `GET /api/feed` queries `discovery.service.ts#getFeed()`, which **explicitly projects only public profile fields** (`id`, `name`, `age`, `bio`, `location`, `occupation`, `interests`, `photos`).
- Incoming swipe records (`receivedSwipes`) are never joined or serialized in feed responses—inspecting the browser Network tab reveals zero distinction between profiles that have already swiped right on `demo-user-001` (`profile-001` through `profile-010`) and those that have not (`profile-011` through `profile-032`).
- A `Match` record is created inside an atomic Prisma `$transaction` **only** when a reciprocal `"RIGHT"` swipe already exists in the `Swipe` table.

### API Endpoints
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/feed` | Returns unswiped public profiles for `demo-user-001` (strips all incoming-like metadata). |
| `POST` | `/api/swipe` | Body: `{ swipedId, direction: "LEFT" \| "RIGHT" }`. Persists swipe and returns `{ isMatch, matchedUser }`. |
| `GET` | `/api/matches` | Returns all confirmed mutual matches for `demo-user-001`. |
| `POST` | `/api/reset` | Re-seeds the database (32 mock profiles + 10 pre-seeded incoming likes) for demo convenience. |

---

## Local Setup & Running

1. **Install dependencies:**
   ```bash
   npm install