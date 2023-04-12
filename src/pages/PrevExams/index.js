import React, { useState, useEffect, useRef, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
//Material ui
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import { Box, Button } from '@mui/material';

import ImgExam from 'src/Setup/Assets/Images/exam';

import { getRequest } from 'src/Setup/AxiosClient';

import { AuthContext } from 'src/Components/Contexts/AuthContext';

import MySnackbar from 'src/Components/Util/SnackBar';

const PrevExams = () => {
    const [loading, setLoading] = useState(false);
    const [examsList, setExamslist] = useState([]);
    const [error, setError] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    useEffect(() => {
        getExams()
    }, [])

    const getExams = async () => {
        setLoading(true); // Start loading
        const response = await getRequest('prevexams'); // Fetch Data
        setLoading(false)
        if (response.status === 200) {
            setExamslist(response.data);
        } else {
            setError(true)
            setErrorMsg(response.data.message)
        }

    }
    return (
        <section>

            <h1 style={{ margin: '0' }}>Previous Exams</h1>
            <p style={{ textAlign: 'center' }}>Here you can find previous exams and get inspiration for your preparation.</p>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>

                {
                    !error ?
                        loading ? <>Loading..</> :
                            examsList.map((exam, index) => (
                                <ExamCard {...exam} key={index} />
                            )) :
                        <div> {errorMsg} </div>

                }

            </Box>
        </section>

    );
}

const ExamCard = ({ id, year }) => {

    const navigate = useNavigate()

    let snakkebarRef = useRef('');

    var authContext = useContext(AuthContext);

    const authState = authContext.authState;

    // Calling handleSnakkebarAction function from snakkebar component 
    const snakkebarAction = (actionObject) => {
        snakkebarRef.current.handleSnakkebarAction(actionObject); // This function is in SnackBar.js
    }

    const handleClick = (season) => {

        if (authState.status && parseInt(authState.noOfTests) > 0) {
            navigate(`/prevexams/${year}/${season}`);
        } else {
            // call function to show snakkebar along with following data        
            const snakkebarObject = {
                severity: 'info',
                message: 'Please login or purchase/upgrade your package'
            }
            snakkebarAction(snakkebarObject)
        }


    }
    return (
        
            <Card variant='outlined' sx={{ padding: '1em', margin: '1em' }}>
                <CardHeader avatar={
                    <Avatar aria-label="Exam">
                        <img src={ImgExam} style={{ width: 'inherit' }} alt='exam' />
                    </Avatar>
                } title={year} titleTypographyProps={{ variant: 'h4' }} />
                <CardActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Button size="small" variant='outlined' component="label" onClick={() => handleClick('Summer')}>
                        Summer
                    </Button>
                    <Button size="small" variant='outlined' component="label" onClick={() => handleClick('Winter')}>
                        Winter
                    </Button>
                </CardActions>
                <MySnackbar ref={snakkebarRef} />
            </Card>                    
    )
}
export default PrevExams