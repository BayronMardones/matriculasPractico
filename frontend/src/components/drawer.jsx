import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { useNavigate } from "react-router-dom";
import ChecklistRtlIcon from '@mui/icons-material/ChecklistRtl';


export default function TemporaryDrawer({ open, onClose }) {
    const navigate = useNavigate();

    const DrawerList = (
        <Box sx={{ width: 250 }} role="presentation" onClick={onClose}>
            <List>
                <ListItem>
                    <ListItemText > MATRICULAS </ListItemText>
                </ListItem>
                <ListItem key="matriculaPage" disablePadding>
                    <ListItemButton onClick={() => navigate("/matriculaPage")}>
                        <ListItemIcon>
                            <ChecklistRtlIcon />
                        </ListItemIcon>
                        <ListItemText primary="Registrar nuevo" />
                    </ListItemButton>
                </ListItem>
                <ListItem key="matriculaListPage" disablePadding>
                    <ListItemButton onClick={() => navigate("/matriculaListPage")}>
                        <ListItemIcon>
                            <ChecklistRtlIcon />
                        </ListItemIcon>
                        <ListItemText primary="Lista de Matriculas" />
                    </ListItemButton>
                </ListItem>
            </List>
            <Divider />
            <List>
                <ListItem>
                    <ListItemText > CURSOS </ListItemText>
                </ListItem>
                <ListItem key="cursoPage" disablePadding>
                    <ListItemButton onClick={() => navigate("/cursoPage")}>
                        <ListItemIcon>
                            <ChecklistRtlIcon />
                        </ListItemIcon>
                        <ListItemText primary="Cursos" />
                    </ListItemButton>
                </ListItem>
            </List>
            <Divider />
            <List>
            <ListItem>
                    <ListItemText > OTROS </ListItemText>
                </ListItem>
                <ListItem key="testFile" disablePadding>
                    <ListItemButton onClick={() => navigate("/testFile")}>
                        <ListItemIcon>
                            <InboxIcon />
                        </ListItemIcon>
                        <ListItemText primary="pagina test" />
                    </ListItemButton>
                </ListItem>
            </List>
        </Box>
    );

    return (
        <div>
            {/* <MenuIcon onClick={toggleDrawer(true)}/> */}
            {/* <Button onClick={toggleDrawer(true)}>Open drawer</Button> */}
            <Drawer open={open} onClose={onClose}>
                {DrawerList}
            </Drawer>
        </div>
    );
}
