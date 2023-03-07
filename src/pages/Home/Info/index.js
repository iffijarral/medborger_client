import React from 'react';
import { Link } from 'react-router-dom';

// Material UI components
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

// data
import { IntroData } from "src/Setup/Data"

// Styles
import './styles.scss';

export default function Info() {      

    const { aboutData } = IntroData()

    return (
        <section>
            <div className="introWrapper">
                {
                    aboutData.map((data, index) => (
                        <InfoItem key = {index} {...data} />
                    ))
                }
            </div>
        </section>
    );
}

const InfoItem = (props) => {
    return (
        <Card key={props.title}>
            <CardActionArea to={`about/${props.title}`}>
                <CardMedia
                    className="imgBlock"
                    image={props.img}
                    title={props.title}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {props.title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {props.shortDescription}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>

                <Link to={`about/${props.title}`}>Read More</Link>

            </CardActions>
        </Card>
    )
}