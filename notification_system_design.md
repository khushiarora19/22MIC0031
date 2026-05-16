# Stage 1

## Problem Statement

The goal was to implement a Priority Inbox system for campus notifications where the top unread notifications are displayed based on priority and recency.

Priority order:
1. Placement
2. Result
3. Event

More recent notifications should appear before older notifications within the same priority type.

---

## Approach

The solution fetches notifications from the provided Notification API using Axios and Authorization Bearer Token authentication.

Each notification type is assigned a weight:

| Notification Type | Weight |
|-------------------|--------|
| Placement | 3 |
| Result | 2 |
| Event | 1 |

The notifications are sorted using:
1. Higher priority weight first
2. More recent timestamp second

After sorting, the top 10 notifications are selected using:

```ts
slice(0, 10)
```

---

## Time Complexity

Sorting Complexity:

O(n log n)

Selecting top 10:

O(10)

---

## Efficient Maintenance of Top 10

Since new notifications continuously arrive, maintaining a full sorted list repeatedly is inefficient.

A better approach is to use a Min Heap (Priority Queue) of size 10.

### Strategy

- Keep only the top 10 notifications in memory
- Compare every incoming notification with the minimum priority item
- Replace the minimum item if the new notification has higher priority

### Benefits

- Heap insertion/removal: O(log 10)
- Efficient for real-time notification systems
- Avoids sorting the entire dataset repeatedly

---

## Technologies Used

- TypeScript
- Node.js
- Axios
- dotenv