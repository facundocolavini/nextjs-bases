import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { AppBar, IconButton, Toolbar } from "@mui/material";
import Typography from "@mui/material/Typography";
import { useContext } from "react";
import { UIContext } from "../../context/ui";
import Link from "next/link";

export const Navbar = () => {
  const { openSidemenu } = useContext(UIContext);
  return (
    <AppBar position="sticky">
      <Toolbar>
        <IconButton size="large" edge="start" onClick={openSidemenu}>
          <MenuOutlinedIcon />
        </IconButton>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1 }}
        >
          
          <Link href="/" passHref style={{
            textDecoration: "none",
            color: "white"
          }}
          >
            Board Jira
          </Link>
        </Typography>
      </Toolbar>
    </AppBar>
  );
};
