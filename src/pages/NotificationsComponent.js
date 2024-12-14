"use client";
import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

function isSeen(item) {
  return "isSeen" in item;
}

const getTime = (timestamp) => {
  const date = new Date(timestamp);
  return `created on ${
    date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear()
  }`;
};

export default function NotificationsComponent({ unSeenCount, items }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleCard = () => {
    setIsOpen(!isOpen);
  };

  const data = items.map((item, idx) => ({
    id: idx,
    message: item.message.text,
    timestamp: getTime(item.created_on),
    read: isSeen(item),
  }));

  return (
    <>
      {/* Notification Bell Icon (Button) */}
      {!isOpen && (
        <IconButton
          aria-label="notifications"
          onClick={toggleCard}
          sx={{
            position: "fixed",
            top: 16,
            left: 16,
            backgroundColor: "primary.main", // Vibrant background color
            color: "white", // White icon color
            borderRadius: "50%", // Round shape for the bell
            padding: "10px", // Increased padding for a larger clickable area
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Subtle shadow
            transition: "all 0.3s ease", // Smooth transition for hover effects
            "&:hover": {
              backgroundColor: "primary.dark", // Darker color on hover
              transform: "scale(1.1)", // Slightly increase size on hover
            },
          }}
        >
          <NotificationsIcon />
        </IconButton>
      )}

      {/* Notification Window (Card) */}
      {isOpen && (
        <Card
          sx={{
            maxWidth: 350,
            position: "fixed",
            top: 16,
            left: 16,
            zIndex: 9999,
            borderRadius: "10px", // Rounded corners
            boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)", // Stronger shadow for depth
            backgroundColor: "background.paper", // Clean background color
            transition: "all 0.3s ease", // Smooth transition for opening/closing
            opacity: isOpen ? 1 : 0, // Smooth fade-in/fade-out effect
          }}
        >
          <CardHeader
            title="Notifications"
            action={
              <IconButton aria-label="close" onClick={toggleCard}>
                <NotificationsIcon />
              </IconButton>
            }
            sx={{
              backgroundColor: "primary.main", // Vibrant header background
              color: "white", // White text color
              fontWeight: "bold", // Bold header text
            }}
          />
          <CardContent>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "16px",
              }}
            >
              <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                You have {unSeenCount} unseen notifications
              </Typography>
            </div>
            <List sx={{ maxHeight: 300, overflow: "auto" }}>
              {data.map((notification) => (
                <ListItem
                  key={notification.id}
                  alignItems="flex-start"
                  sx={{
                    opacity: notification.read ? 0.6 : 1,
                    padding: "12px", // Increased padding for better spacing
                    "&:hover": {
                      backgroundColor: "action.hover", // Light hover effect on list item
                    },
                  }}
                >
                  <ListItemIcon sx={{ minWidth: "30px" }}>
                    <FiberManualRecordIcon
                      sx={{
                        fontSize: "small",
                        color: notification.read ? "grey.500" : "primary.main",
                      }}
                    />
                  </ListItemIcon>
                  <ListItemText
                    primary={notification.message}
                    secondary={notification.timestamp}
                    primaryTypographyProps={{
                      variant: "body2",
                      sx: { fontWeight: "bold" }, // Bold notification message
                    }}
                    secondaryTypographyProps={{
                      variant: "caption",
                      sx: { color: "text.secondary" }, // Lighter color for timestamp
                    }}
                  />
                </ListItem>
              ))}
            </List>
          </CardContent>
        </Card>
      )}
    </>
  );
}
