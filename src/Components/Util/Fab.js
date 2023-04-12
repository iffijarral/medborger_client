// react & react-router-dom
import React from 'react';
import { useNavigate } from "react-router-dom";

//MUI components
import { KeyboardArrowUp } from "@mui/icons-material";
import { Fab, Box } from '@mui/material';

export default function FloatingActionButton() {    
    const [show, setShow] = React.useState(false)

    const navigate = useNavigate();

    const handleClick = () => {
        
        window.scrollTo(0, 0);
    }

    const showScrollToTop = () => { 

        if (window.scrollY > 80) 
        {
            setShow(true);
        } 
        else 
        {
            setShow(false);
        }
    }

    window.addEventListener('scroll', showScrollToTop);

    return (
        show &&
        <Box
          role="presentation"
          sx={{
            position: "fixed",
            bottom: 25,
            right: 25,
            zIndex: 1,            
          }}
        >
            <Fab aria-label="tests" onClick={handleClick}> 
                <KeyboardArrowUp />
            </Fab>            
        </Box>
    );
}