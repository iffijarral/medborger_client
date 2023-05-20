import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import parse from 'html-react-parser';
// custom library to fetch data
import { getRequest } from 'src/Setup/AxiosClient';
// Data to display
import { IntroData } from 'src/Setup/Data';
// Styles
import './styles.scss';

export default function About() {
    const { action } = useParams();

    const [examData, setExamData] = useState({
        "examDate": '',
        "registrationDate": "",
        "fee": ""
    })

    useEffect(() => {
        const getExamData = async () => {
            try {
                // setLoading(true); // Start loading
    
                const response = await getRequest('exam') // Fetch Data
    
                // setLoading(false); // Start loading            
    
                if (response.status === 200) {
                    setExamData((prevState) => ({
                        ...prevState,
                        "examDate": response.data[0].examdate,
                        "registrationDate": response.data[0].registrationdate,
                        "fee": response.data[0].fee,
                    }));
    
                }
                else {
                    // setMessage(response.data.message)
                }
    
            } catch (error) {
                console.log(error)
                // setMessage('Sorry for inconvenience, please contact the admin. Thanks')
            }
        }
        getExamData()
    }, []);

    

    const { aboutData } = IntroData(examData)

    return (
        <div className="about">
            {
                aboutData.map((data, index) => {

                    if (data.title === action) {

                        return parse(data.longDescription);
                    }
                    return ''
                }
                )

            }
        </div>
    );
}