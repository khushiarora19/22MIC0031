import { useEffect, useState } from "react";

import {
  Container,
  Typography,
  Select,
  MenuItem,
} from "@mui/material";

import API from "../services/api";
import NotificationCard from "../components/NotificationCard";

const weights: any = {
  Placement: 3,
  Result: 2,
  Event: 1,
};

export default function PriorityNotifications() {
  const [notifications, setNotifications] =
    useState([]);

  const [limit, setLimit] = useState(10);

  const fetchNotifications = async () => {
    try {
      const response = await API.get(
        `/notifications?limit=50`
      );

      const sorted = response.data.notifications.sort(
        (a: any, b: any) => {
          const weightDiff =
            weights[b.Type] - weights[a.Type];

          if (weightDiff !== 0) {
            return weightDiff;
          }

          return (
            new Date(b.Timestamp).getTime() -
            new Date(a.Timestamp).getTime()
          );
        }
      );

      setNotifications(sorted.slice(0, limit));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, [limit]);

  return (
    <Container sx={{ marginTop: 4 }}>
      <Typography variant="h4" gutterBottom>
        Priority Inbox
      </Typography>

      <Select
        value={limit}
        onChange={(e) =>
          setLimit(Number(e.target.value))
        }
        sx={{ marginBottom: 3 }}
      >
        <MenuItem value={5}>Top 5</MenuItem>
        <MenuItem value={10}>Top 10</MenuItem>
        <MenuItem value={15}>Top 15</MenuItem>
        <MenuItem value={20}>Top 20</MenuItem>
      </Select>

      {notifications.map((notification: any) => (
        <NotificationCard
          key={notification.ID}
          notification={notification}
          viewed={false}
        />
      ))}
    </Container>
  );
}