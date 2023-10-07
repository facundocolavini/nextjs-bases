import AllInboxOutlinedIcon from "@mui/icons-material/AllInboxOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import {
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
const menuItems = [
  "Inbox",
  "Mails",

];

export const Sidebar = () => {
  return (
    <Drawer anchor="left" open={false} onClose={() => console.log("cerrando")}>
      <Box sx={{ width: "250px" }}>
        <Box sx={{ padding: "5px 10px" }}>
          <Typography variant="h4" sx={{ flexGrow: 1 }}>
            Menú
          </Typography>
        </Box>
        <List>
          {menuItems.map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                {index % 2 ? <AllInboxOutlinedIcon /> : <EmailOutlinedIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider/>
        <List>
          {menuItems.map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                {index % 2 ? <AllInboxOutlinedIcon /> : <EmailOutlinedIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};
