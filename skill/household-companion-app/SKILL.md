---
name: household-companion-app
description: Build or extend a two-person household contribution, points, wishes, reactions, statements, and iPhone PWA app. Use when a user wants a couples chore tracker, shared home points system, partner rewards, temporary contributions, monthly statements, annual summaries, or GitHub Pages/iOS installation.
---

# Household Companion App

Build a warm, collaborative household app for two people. Treat points as a relationship aid, not a punishment system. Preserve historical accounting and make every balance change explainable.

## Start by defining the household model

Use exactly two configurable member names. Never hard-code roles such as “husband” or “wife”. Keep member renames linked across entries, contributions, tips, comments, notifications, and task ownership.

Model these records separately:

- `tasks`: reusable household library items.
- `entries`: completed chores and temporary footprints.
- `rewards`: wishes with individual or shared contribution modes.
- `redemptions`: points committed to wishes.
- `tips`: point transfers between members tied to a specific footprint.
- `rewardComments`: comments attached to a wish.
- `notifications`: reactions, ratings, tips, and other partner events.

Read [references/data-model.md](references/data-model.md) before changing balances or storage.

## Core interaction rules

### Household library

Provide a dedicated management mode. Normal mode focuses on completing chores; management mode exposes add, edit, archive, restore, delete, category, icon, score, and ownership controls.

Allow each task to belong to:

- Both people (`共同`).
- Member A.
- Member B.

Show common tasks plus the current member’s assigned tasks on their quick-action view. A member-specific task must credit its assigned member.

Preserve the original icon while editing. Changing a category must not silently replace an existing icon. For a new task, selecting a known category may suggest that category’s icon.

Use real `<select>` elements on iPhone instead of relying on `datalist`. Wrap category filters onto multiple lines rather than requiring fragile horizontal scrolling.

### Permanent and temporary footprints

A normal task completion immediately creates an entry with its configured score.

A temporary footprint records an unplanned contribution without creating a reusable task. It starts as `pendingRating: true` with zero points. Only the other member may assign or revise its official score. The official score affects totals, the comparison scale, monthly statements, and annual summaries.

Keep tipping separate from rating. A tip transfers available points from the giver to the receiver and should be attached to the specific footprint that prompted it.

### Reactions and notifications

Offer lightweight reactions such as 👍, 👎, 😠, and 😑 on each footprint. Store reactions by actor so one person can change their own reaction without duplicating it.

Create an in-app notification for the entry owner when the partner reacts, rates a temporary footprint, or tips it. Browser notifications require explicit permission. Without a Web Push subscription service, promise notifications only while the PWA is running or able to poll—not after it has been fully terminated.

### Wishes

Separate wishes into:

- Shared contribution: both members’ deposits advance one combined progress value.
- Individual contribution: each member has an independent progress value.

Earning points never automatically advances a wish. Every contribution requires a chosen wish, a manually entered amount, and confirmation.

Each wish needs:

- Edit and delete controls.
- Contribution history showing actor, amount, and time.
- A comment section.
- A details view accessible from both the wish page and statements.

Allow type changes only before the first contribution. Do not allow a target to be lowered below already contributed progress. Deleting a wish removes its contribution ledger so the committed points are refunded, and removes its comments.

### Statements

Add a dedicated statement tab, separate from the daily screen.

Monthly view:

- Month navigation.
- One row per chore name.
- Completion count and earned score for each member.
- Monthly totals.
- Wish contribution records for the selected month.

Annual view:

- Year navigation.
- Total completions and scores per member.
- Most frequently completed chore per member.
- A twelve-month completion trend.
- Wish contribution records for the selected year.

Use immutable entry snapshots (`name`, `category`, `icon`, `points`, `actor`, `at`) so editing a task does not rewrite historical statements.

## Accounting invariants

Calculate available points as:

`earned chore points - wish contributions + tips received - tips sent`

Never display or persist an unexplained negative balance.

When deleting a footprint:

- Remove the earned score.
- Remove footprint reactions and notifications.
- Reverse tips tied to that footprint.
- If necessary, roll back the latest affected wish contributions so the actor’s available balance remains valid.

Do not use the available balance as a wish’s visual progress. The progress bar must represent actual manually committed points. Show available points separately as “currently available to contribute”.

Keep the household comparison scale based on earned chore scores only. Wish contributions and tips must not tilt it. Fix the center post and base; rotate only the beam and pans. Clamp tilt and leave enough space so both scores remain visible.

## iPhone PWA and hosting

For the simplest installation, build a responsive PWA and host the static frontend on GitHub Pages. Use a public HTTPS API for shared state when no login or access key is requested.

Include:

- `manifest.webmanifest`.
- App icon.
- `apple-mobile-web-app-capable` metadata.
- A service worker with network-first HTML behavior so updates are not trapped by an old cache.
- Relative asset paths for GitHub project pages.

Installation instructions: open the GitHub Pages URL in Safari, tap Share, choose “Add to Home Screen”, and confirm.

If the API is public, explicitly warn that anyone who knows the URL can read or modify the household data.

## Implementation workflow

1. Inspect the existing data model and deployment audience.
2. Preserve unrelated user changes.
3. Implement frontend and backend changes together when an interaction mutates shared data.
4. Add backward-compatible defaults for new arrays and fields (`|| []`, `|| {}`, or migration logic).
5. Validate server syntax, embedded client syntax, and accounting invariants.
6. Test a reversible create → mutate → delete flow without touching user records.
7. Publish the backend first, then synchronize the GitHub Pages frontend.
8. Verify the production HTML contains the new UI and that the API accepts the new action.
9. Tell the user to fully close and reopen the Home Screen PWA when Safari is retaining an older process.

Read [references/qa-checklist.md](references/qa-checklist.md) before publishing.

## Design direction

Use a warm, calm, domestic visual language rather than a competitive scoreboard aesthetic. Prefer soft green, cream, peach, rounded cards, clear touch targets, and plain Chinese labels. Keep destructive actions behind an in-app confirmation sheet. Avoid floating buttons that cover completion actions.

Make competition playful and bounded: show comparisons and progress, but also gratitude, reactions, comments, and shared wishes.
