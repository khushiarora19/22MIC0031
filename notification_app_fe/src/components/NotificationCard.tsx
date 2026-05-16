import {
  Card,
  CardContent,
  Typography,
  Chip,
} from "@mui/material";

interface Props {
  notification: {
    ID: string;
    Type: string;
    Message: string;
    Timestamp: string;
  };
  viewed: boolean;
}

export default function NotificationCard({
  notification,
  viewed,
}: Props) {
  return (
    <Card
      sx={{
        marginBottom: 2,
        borderLeft: viewed
          ? "5px solid gray"
          : "5px solid #1976d2",
      }}
    >
      <CardContent>
        <Typography variant="h6">
          {notification.Message}
        </Typography>

        <Chip
          label={notification.Type}
          sx={{ marginTop: 1 }}
        />

        <Typography
          variant="body2"
          sx={{ marginTop: 1 }}
        >
          {notification.Timestamp}
        </Typography>

        {!viewed && (
          <Chip
            label="NEW"
            color="primary"
            sx={{ marginTop: 1 }}
          />
        )}
      </CardContent>
    </Card>
  );
}