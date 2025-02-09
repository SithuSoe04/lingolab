// import * as React from "react";
// import AppBar from "@mui/material/AppBar";
// import Box from "@mui/material/Box";
// import CssBaseline from "@mui/material/CssBaseline";
// import Divider from "@mui/material/Divider";
// import Drawer from "@mui/material/Drawer";
// import IconButton from "@mui/material/IconButton";
// import List from "@mui/material/List";
// import ListItem from "@mui/material/ListItem";
// import ListItemButton from "@mui/material/ListItemButton";
// import ListItemText from "@mui/material/ListItemText";
// import MenuIcon from "@mui/icons-material/Menu";
// import Toolbar from "@mui/material/Toolbar";
// import Typography from "@mui/material/Typography";
// import Button from "@mui/material/Button";
// import {Link} from "react-router-dom"
// import LingoLabLogo from "./LingoLabLogo.png"

// interface Props {
//   /**
//    * Injected by the documentation to work in an iframe.
//    * You won't need it on your project.
//    */
//   window?: () => Window;
// }

// const drawerWidth = 240;
// const navItems = ["File Explorer", "LogIn"];


// export default function Navbar(props: Props) {
//   const { window } = props;
//   const [mobileOpen, setMobileOpen] = React.useState(false);

//   const handleDrawerToggle = () => {
//     setMobileOpen((prevState) => !prevState);
//   };

//   const handleScrollToFooter = () => {
//     const footerElement = document.getElementById("footer"); // assuming the ID of your footer is "footer"
//     if (footerElement) {
//       footerElement.scrollIntoView({ behavior: "smooth" });
//     }
//   };
  
//   const drawer = (
//     <Box
//       onClick={handleDrawerToggle}
//       sx={{ textAlign: "center"}}
//     >
//       <Typography variant="h6" sx={{ my: 2 }}>
//         <Link to="/">
//           {/* <h1 style={{color: 'white'}}>LingoLab</h1> */}
//           <img style={{ width: '80%' }} src={LingoLabLogo}></img>
//         </Link>
//       </Typography>
//       <Divider />
//       <List>
//         {navItems.map((item) => (
//           <ListItem key={item} disablePadding onClick={item === "Contact" ? handleScrollToFooter : undefined}>
//             <ListItemButton sx={{ textAlign: "center" }}>
//             <Link to={`/${item.toLowerCase()}`} style={{ textDecoration: 'none', color: 'inherit' }}>
//                 <ListItemText primary={item} />
//               </Link>
//             </ListItemButton>
//           </ListItem>
//         ))}
//       </List>
//     </Box>
//   );

//   const container =
//     window !== undefined ? () => window().document.body : undefined;

//   return (
//     <Box sx={{ display: "flex" }}>
//       <CssBaseline />
//       <AppBar component="nav">
//         <Toolbar style={{ backgroundColor: "#F9F8F4" }}>
//           <IconButton
//             color="inherit"
//             aria-label="open drawer"
//             edge="start"
//             onClick={handleDrawerToggle}
//             sx={{ mr: 2, display: { sm: "none" } }}
//           >
//             <MenuIcon />
//           </IconButton>
//           <Box sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}>
//             <Link to="/">
//                 {/* <h1 style={{color: 'white'}}>LingoLab</h1> */}
//               <img style={{ maxHeight: "50px" }} src={LingoLabLogo}></img>
//             </Link>
//           </Box>
//           <Box sx={{ display: { xs: "none", sm: "block" } }}>
//             {navItems.map((item) => (
//               <Button key={item} sx={{ color: "black" }}>
//                   <Link to={`/${item.toLowerCase().replaceAll(" ", "")}`} style={{ textDecoration: 'none', color: 'inherit' }}>
//                 <ListItemText primary={item} />
//               </Link>
//               </Button>
//             ))}
//           </Box>
//         </Toolbar>
//       </AppBar>
//       <Box component="nav">
//         <Drawer
//           container={container}
//           variant="temporary"
//           open={mobileOpen}
//           onClose={handleDrawerToggle}
//           ModalProps={{
//             keepMounted: true, 
//           }}
//           sx={{
//             display: { xs: "block", sm: "none" },
//             "& .MuiDrawer-paper": {
//               boxSizing: "border-box",
//               width: drawerWidth,
//             },
//           }}
//         >
//           {drawer}
//         </Drawer>
//       </Box>
//       <Box component="main" sx={{ p: 0 }}>
//         <Toolbar />
//       </Box>
//     </Box>
//   );
// }

import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import LingoLabLogo from "./LingoLabLogo.png"
import {Link} from "react-router-dom"

const pages = [
    { name: 'File Explorer', path: '/fileexplorer' },
    { name: 'Log In', path: '/login' },
  ];

function Navbar() {
  return (
    <AppBar position="static" sx={{width: '100%'}}>
      <Container maxWidth={false} sx={{backgroundColor: "#F9F8F4", margin: '0', width: '100%', }}>
        <Toolbar disableGutters sx={{width: '100%'}}>
        <Link to="/">
          <img style={{ maxHeight: "50px" }} src={LingoLabLogo}></img>
        </Link>
          <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'flex-end' }}>
            {pages.map((page) => (
              <Button
              key={page.name}
              component={Link}
              to={page.path}
              sx={{ my: 2, color: 'black', display: 'block', textTransform: 'none', fontSize: '1rem'}}
            >
              {page.name}
            </Button>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;
