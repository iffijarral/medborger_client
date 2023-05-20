import React, { Fragment, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
//Material UI
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import { Box } from '@mui/material';

import { getRequest } from 'src/Setup/AxiosClient';

const ActivePrevExam = () => {

    const { year, season } = useParams();

    const [loading, setLoading] = useState(false);
    const [exam, setExam] = useState({});
    const [error, setError] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    useEffect(() => {
        const getExam = async () => {        
            setLoading(true); // Start loading
            const response = await getRequest('prevexams/'+year+'/'+season); // Fetch Data             
            setLoading(false)        
            if (response.status === 200) {            
                setExam(response.data);
            } else {
                setError(true)
                setErrorMsg(response.data.message)
            }
    
        }
        getExam()
    }, [])

    

    return (
        <Fragment>
            <section>
                <h1 style={{ margin: '0' }}>Exam year: {exam.year} ({exam.season})</h1>
                {/* <p style={{textAlign: 'center'}}>Option having green color is the answer</p> */}
                <Box sx={{ display: 'flex', flexDirection: 'column', flexWrap: 'wrap', justifyContent: 'center' }}>
                    {
                        !error ?
                            loading ? <>Loading..</> :
                                exam.Questions && exam.Questions.map((data, index) => (<PrevExamCard index={index+1} key={index} {...data} />)) :
                            <div> {errorMsg} </div>
                    }
                </Box>
            </section>
        </Fragment>
    )
}

const PrevExamCard = ({ question, op1, op2, op3, answer, index }) => {
    return (
        <Card variant='outlined' sx={{ padding: '1em', margin: '1em' }}>
            <CardHeader title={'Q#'+index+': '+question + '?'} titleTypographyProps={{ color: "#707070", fontFamily: 'Poppins' }} />
            <CardContent>
                <ul>
                    <li style={{color: `${op1 === answer ? 'green' : ''}`, paddingBottom: '.5em'}}> A: {op1} </li>
                                            
                    <li style={{color: `${op2 === answer ? 'green' : ''}`, paddingBottom: '.5em'}}> B: {op2} </li>
                                            
                    { op3 && <li style={{color: `${op3 === answer ? 'green' : ''}`}}> C: {op3} </li> }
                    
                </ul>
            </CardContent>
        </Card>
    )
}
export default ActivePrevExam