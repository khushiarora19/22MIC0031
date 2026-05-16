import axios from "axios";
import dotenv from "dotenv";

dotenv.config({ path: "./.env" });

type NotificationType = "Placement" | "Result" | "Event";

interface Notification {
  ID: string;
  Type: NotificationType;
  Message: string;
  Timestamp: string;
}

const priorityWeight: Record<NotificationType, number> = {
  Placement: 3,
  Result: 2,
  Event: 1,
};

async function fetchNotifications() {
  try {
    const response = await axios.get(
      "http://4.224.186.213/evaluation-service/notifications",
      {
        headers: {
          Authorization: `Bearer ${String(process.env.ACCESS_TOKEN)}`,
        },
      }
    );

    const notifications: Notification[] =
      response.data.notifications;

    const sortedNotifications = notifications.sort((a, b) => {
      const weightDifference =
        priorityWeight[b.Type] - priorityWeight[a.Type];

      if (weightDifference !== 0) {
        return weightDifference;
      }

      return (
        new Date(b.Timestamp).getTime() -
        new Date(a.Timestamp).getTime()
      );
    });

    const top10 = sortedNotifications.slice(0, 10);

    console.table(top10);
  } catch (error) {
    throw error;
  }
}

fetchNotifications();