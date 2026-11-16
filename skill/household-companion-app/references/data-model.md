# Data model and balance rules

## Suggested state

```js
{
  members: ["Member A", "Member B"],
  tasks: [],
  entries: [],
  rewards: [],
  redemptions: [],
  tips: [],
  rewardComments: [],
  notifications: []
}
```

## Task

```js
{
  id, name, category, icon, points,
  assignee: "共同" | memberName,
  active: true
}
```

## Entry

```js
{
  id, taskId?, name, category, icon, points, actor, at,
  temporary?: true,
  pendingRating?: true,
  ratedBy?, ratedAt?,
  note?,
  reactions?: { [memberName]: emoji }
}
```

Normal entries snapshot their task fields. Temporary entries start at zero and become score-bearing only after the other member rates them.

## Reward

```js
{
  id, name, icon, cost,
  type: "共同" | "个人",
  progress: 0,
  progressByActor: {},
  redeemed: false,
  redeemedByActor: {}
}
```

For shared rewards, use `progress`. For individual rewards, use `progressByActor[member]`.

## Contribution ledger

```js
{ id, rewardId, name, actor, cost, type: "个人", at }
```

The ledger is the source of truth for committed points and contribution history. A reward’s progress fields are display aggregates and must stay consistent with the ledger.

## Tip

```js
{ id, entryId, entryName, from, to, amount, note, at }
```

A tip is a transfer, not newly minted score. It changes available balances but not earned-score comparisons.

## Available balance

```js
earned(entries, actor)
  - contributed(redemptions, actor)
  + receivedTips(tips, actor)
  - sentTips(tips, actor)
```

Before accepting a contribution or tip, calculate the balance on the server and reject amounts above it.

## Rename migration

When member names change, migrate all references in:

- Entry actors and raters.
- Task assignees.
- Contribution actors.
- Tip senders and receivers.
- Thanks, comments, reactions, and notifications.
- Individual wish progress and completion maps.

## Delete behavior

- Deleting a task preserves historical entries.
- Deleting an entry reverses its score, linked tips, reactions, and notifications.
- Deleting a reward deletes its contribution ledger, which refunds contributors, and removes comments.
- Never silently rewrite old entry snapshots after editing a task.
