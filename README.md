# Coy — Mutual Discovery & Privacy-First Social App

Full-stack take-home assignment implementing **Coy's** double-opt-in discovery experience alongside a product and privacy analysis of `https://app.getcoy.com`.

---

## Part A: Product & Privacy Analysis (`app.getcoy.com`)

Exploring the onboarding and core loop of Coy (Phone OTP verification → adding crushes → email verification → invite links → extra-slot unlocks) highlights a clear design philosophy: **zero-embarrassment, symmetric disclosure**. Unlike conventional dating apps that monetize asymmetry ("See who liked you"), Coy protects social deniability—if a crush is unreciprocated, the other person never knows.

### Proposed Core Features

#### 1. Anonymized Mutual-Signal Nudges ("Someone in your circle added a crush")
* **What it is:** A privacy-preserving push/SMS notification triggered when a user receives an incoming crush from someone in their synced contacts or verified campus/organization domain, without revealing sender identity, count, or timing precision.
* **Why it is required:** Double-opt-in products suffer from **cold-start passivity**. If User A adds User B as a crush, and User B never opens Coy or fills their crush slots, neither user ever experiences the core "mutual match" magic moment. An anonymized nudge (*"Someone in your circle recently added a crush on Coy—add your top 3 to see if it's mutual"*) drives symmetric activation and solves retention without breaking plausible deniability.

#### 2. Guided Ephemeral Icebreakers & Crush-Slot Anti-Enumeration Rate Limits
* **What it is:** (a) Contextual, low-pressure conversation prompts unlocked immediately upon a mutual match, paired with (b) cryptographic contact-hashing and strict per-account slot/cooldown rate limits.
* **Why it is required:**
  * **Post-match activation:** Because Coy matches frequently occur between people who already share real-world social overlap (college, workplace, mutual friends), social stakes are high and users often freeze on the first message. Structured prompts lower the friction of starting the conversation.
  * **Privacy hardening:** Coy gates extra crush slots behind invites. Without strict server-side slot caps and hashed contact lookups, an attacker could cycle through phone numbers/emails to brute-force enumerate who has a crush on them. Rate-limiting slot edits and never returning incoming-like state on client payloads preserves the core privacy invariant.

---

## Part B: Discover Tab Architecture & Privacy Guarantees

### Tech Stack
* **Framework:** Next.js 16 (App Router, TypeScript, Tailwind CSS)
* **Database & ORM:** SQLite + Prisma 6 (`User`, `Swipe`, `Match` with `@@unique` constraints)
* **Animations & UI:** Framer Motion (spring drag gestures + `LIKE`/`NOPE` overlays), Lucide Icons
* **Testing:** Vitest (automated backend & privacy invariant tests)

### Core Privacy Invariant
* `GET /api/feed` queries `discovery.service.ts#getFeed()`, which **explicitly projects only public profile fields** (`id`, `name`, `age`, `bio`, `location`, `occupation`, `interests`, `photos`).
* Incoming swipe records (`receivedSwipes`) are never joined or serialized in feed responses—inspecting the browser Network tab reveals zero distinction between profiles that have already swiped right on `demo-user-001` (`profile-001` through `profile-010`) and those that have not (`profile-011` through `profile-032`).
* A `Match` record is created inside a Prisma transaction **only** when a reciprocal `"RIGHT"` swipe already exists in the `Swipe` table.

### API Endpoints
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/feed` | Returns unswiped public profiles for `demo-user-001` (strips all incoming-like metadata). |
| `POST` | `/api/swipe` | Body: `{ swipedId, direction: "LEFT" \| "RIGHT" }`. Persists swipe and returns `{ isMatch, matchedUser }`. |
| `GET` | `/api/matches` | Returns all confirmed mutual matches for `demo-user-001`. |
| `POST` | `/api/reset` | Re-seeds the SQLite database (32 mock profiles + 10 pre-seeded incoming likes) for demo convenience. |

---

## Local Setup & Running

1. **Install dependencies:**
   ```bash
   npm install