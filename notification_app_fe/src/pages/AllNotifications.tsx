import { useEffect, useState } from "react";
import {
  Container,
  Typography,
  MenuItem,
  Select,
  Pagination,
} from "@mui/material";

import API from "../services/api";
import NotificationCard from "../components/NotificationCard";

export default function AllNotifications() {
  const [notifications, setNotifications] = useState([]);
  const [page, setPage] = useState(1);
  const [type, setType] = useState("");

  const viewedNotifications =
    JSON.parse(
      localStorage.getItem("viewedNotifications") || "[]"
    );

  const fetchNotifications = async () => {
    try {
      let url = `/notifications?page=${page}&limit=10`;

      if (type) {
        url += `&notification_type=${type}`;
      }

      const response = await API.get(url);

      setNotifications(response.data.notifications);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, [page, type]);

  const markAsViewed = (id: string) => {
    const updated = [...viewedNotifications, id];

    localStorage.setItem(
      "viewedNotifications",
      JSON.stringify(updated)
    );
  };

  return (
    <Container sx={{ marginTop: 4 }}>
      <Typography variant="h4" gutterBottom>
        All Notifications
      </Typography>

      <Select
        value={type}
        onChange={(e) => setType(e.target.value)}
        displayEmpty
        sx={{ marginBottom: 3, minWidth: 200 }}
      >
        <MenuItem value="">All Types</MenuItem>
        <MenuItem value="Placement">
          Placement
        </MenuItem>
        <MenuItem value="Result">
          Result
        </MenuItem>
        <MenuItem value="Event">
          Event
        </MenuItem>
      </Select>

      {notifications.map((notification: any) => (
        <div
          key={notification.ID}
          onClick={() => markAsViewed(notification.ID)}
        >
          <NotificationCard
            notification={notification}
            viewed={viewedNotifications.includes(
              notification.ID
            )}
          />
        </div>
      ))}

      <Pagination
        count={10}
        page={page}
        onChange={(_, value) => setPage(value)}
        sx={{ marginTop: 3 }}
      />
    </Container>
  );
}