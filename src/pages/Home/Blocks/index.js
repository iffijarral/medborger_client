import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Material UI
import DescriptionIcon from '@mui/icons-material/Description';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ListAltIcon from '@mui/icons-material/ListAlt';

// custom library to fetch data
import { getRequest } from 'src/Setup/AxiosClient';
// Data to display
import { IntroData } from 'src/Setup/Data';

// styles
import './styles.scss';
import { Avatar, Box, Card, CardContent, CardHeader, Typography } from '@mui/material';

export default function Blocks() {

    const [examData, setExamData] = useState({
        "examDate": '',
        "registrationDate": "",
        "fee": ""
    })
    const [message, setMessage] = useState('')

    useEffect(() => {
        getExamData()
    }, []);

    const getExamData = async () => {
        try {
            const response = await getRequest('exam') // Fetch Data                   

            if (response.status === 200) {
                setExamData((prevState) => ({
                    ...prevState,
                    "examDate": response.data[0].examdate,
                    "registrationDate": response.data[0].registrationdate,
                    "fee": response.data[0].fee,
                }));

            }
            else {
                setMessage(response.data.message)
            }

        } catch (error) {
            console.log(error)
            setMessage('Sorry for inconvenience, please contact the admin. Thanks')
        }
    }

    const { BlocksData } = IntroData(examData)

    return (
        <section className="blocksWrapper">

            <div className="blocksContainer">
                {
                    BlocksData.map((data, index) => (

                        <Block key={index} {...data} />

                    ))
                }

            </div>

        </section>
    );
}

function Block(props) {
    const navigate = useNavigate()

    const handleClick = (to) => {
        navigate(to)
    }
    return (
        <Box sx={{ display: 'flex', flexWrap: 'wrap' }} >
            <Card variant='outlined' sx={{ borderColor: 'white', backgroundColor: 'transparent', cursor: 'pointer' }} onClick={() => handleClick(props.to)}>
                <CardContent sx={{ textAlign: 'center' }}>
                    {
                        (props.icon === 'DescriptionIcon')
                            ? <DescriptionIcon style={{ color: 'white', fontSize: '3rem' }} />
                            : (props.icon === 'ShoppingCartIcon')
                                ? <ShoppingCartIcon style={{ color: 'white', fontSize: '3rem' }} />
                                : <ListAltIcon style={{ color: 'white', fontSize: '3rem' }} />
                    }                    
                    <Typography variant='h2' sx={{ fontFamily: 'Poppins', fontSize: '2rem', padding: '0.5em 0', color: 'white', textAlign: 'center' }}>{props.heading}</Typography>
                    <Typography variant='p' mt={2} sx={{ color: 'white', fontFamily: 'Poppins' }}>{props.description}</Typography>
                </CardContent>
            </Card>
        </Box>        
    );
}
