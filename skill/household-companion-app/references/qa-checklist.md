# QA checklist

## Household library

- Add, edit, archive, restore, and delete a task.
- Verify edit mode preserves the original icon.
- Verify every category is visible on iPhone without horizontal scrolling.
- Assign tasks to both people and to each individual.
- Confirm member-specific tasks cannot credit the wrong member.

## Footprints

- Complete a normal task and delete it.
- Create a temporary footprint and verify it starts at “待评分”.
- Verify the creator cannot rate it.
- Rate it as the other member, then revise the rating.
- Verify statements and the comparison scale update.

## Reactions, tips, and notifications

- React from the other member and change the reaction.
- Tip a specific footprint and verify sender/receiver balances.
- Delete that footprint and verify the tip reverses.
- Verify the receiver sees an in-app notification.
- Verify notification permission is requested only from a user gesture.

## Wishes

- Contribute manually to a shared wish from both members.
- Contribute to an individual wish and confirm separate progress.
- Confirm earned points do not automatically advance either bar.
- Review contribution history and comments.
- Edit name, icon, and target.
- Verify type is locked after contribution.
- Delete the wish and verify all points are refunded.

## Statements

- Compare per-task counts and scores for both members in a month.
- Navigate across month and year boundaries.
- Verify annual totals, top chores, and monthly trend.
- Open a wish from the statement and read its comments.

## Accounting

- Run a sequence of earn → contribute → tip → delete.
- Confirm no negative unexplained balance appears.
- Confirm comparison score uses earned chore points only.
- Confirm all mutations survive reload and synchronize across two devices.

## PWA and deployment

- Test the GitHub Pages project path, manifest, icon, and service worker.
- Confirm the service worker retrieves fresh HTML when online.
- Install from Safari using Add to Home Screen.
- Fully close and reopen the PWA to verify the current release.
