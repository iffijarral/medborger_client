import React from 'react';
import parse from 'html-react-parser';
// Data to display
import { IntroData } from 'src/Setup/Data';
// Styles
import './styles.scss';

export default function Tips() {               

    const { TipsData } = IntroData()

    return (
        <div className="tips">            
            { parse(TipsData.data) }
        </div>
    );
}