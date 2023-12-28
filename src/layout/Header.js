import { AppBar, Button, Toolbar, Typography } from '@mui/material';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import FilterAltIcon from '@mui/icons-material/FilterAlt';

export const Header = ({ OpenSidebar }) => {
    const name = useParams();
    const navigate = useNavigate();
    return (
        <div>
            <AppBar
                position="static"
                color="default"
                elevation={0}
                sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
            >
                <Toolbar sx={{ flexWrap: 'wrap' }}>
                    <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1, fontWeight: 'bold' }}>
                        Movie Catalog Application
                    </Typography>
                    {name.title ?
                        <Button variant="outlined" onClick={() => navigate('/')} sx={{ color: 'white', backgroundColor: '#2a52be' }}>
                            Back
                        </Button>
                        :
                        <FilterAltIcon variant="outlined" onClick={() => OpenSidebar(true)} sx={{ color: 'white', backgroundColor: '#2a52be' }}>
                            Open Sidebar
                        </FilterAltIcon>
                    }
                </Toolbar>
            </AppBar>
        </div>
    )
}
