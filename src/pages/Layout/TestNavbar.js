import { useContext, useRef, useState, useEffect, useImperativeHandle, forwardRef } from 'react';
import { Link } from 'react-router-dom';
// Material UI
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
// Navbar state
import { NavbarContext } from 'src/Components/Contexts/NavbarContext';

import './Menubar/styles.scss';

export const TestNavbar = forwardRef((props, ref) => {

    //Navbar context to hide main navbar.
    var contextNavbar = useContext(NavbarContext);

    const clickHandler = () => {
        contextNavbar.setNavbar(true);
    }
    const showOff = () => {

    }

    useImperativeHandle(ref, () => ({ showOff }), []);

    return (
        <div className="testNavbar">
            <Link className="backArrow" to="/tests/" onClick={clickHandler}>
                <ArrowBackIcon />
            </Link>
            <div style={{ width: 115 }}>
                <MyTimer ref={props.timerRef} onStop={props.stopTimer} onComplete={props.timerOnComplete} />
            </div>

        </div>
    );
});

const MyTimer = forwardRef((props, ref) => {

    // initialHours = 10,
    let initialMinutes = 30;
    let initialSeconds = 0;



    const [time, setTime] = useState({
        // h: initialHours,
        m: initialMinutes,
        s: initialSeconds,
    });

    const [timer, setTimer] = useState(null);

    var myInterval;

    useEffect(() => {

        const startTimer = () => {

            

            myInterval = setInterval(() => {

                setTime((time) => {

                    const updatedTime = { ...time };

                    if (time.s > 0) {
                        updatedTime.s--;
                    }

                    if (time.s === 0) {
                        if (time.m === 0) {
                            clearInterval(myInterval);
                            props.onComplete();
                        }
                        else if (time.m > 0) {
                            updatedTime.m--;
                            updatedTime.s = 59;
                        }
                    }

                    return updatedTime;
                });
            }, 1000);
            setTimer(myInterval);
        };

        startTimer();       
        
        return () => {

            cancelTimer();
        }

    }, []);

    // const pauseTimer = () => {
    //     clearInterval(timer);
    // };

    const cancelTimer = () => {
        //clearInterval(timer);
        clearInterval(myInterval);
        setTime({
            // h: initialHours,
            m: initialMinutes,
            s: initialSeconds,
        });
    };

    useImperativeHandle(ref, () => ({ cancelTimer }), []);

    return (
        <div className='timer'>
            <h1>{time.m < 10 ? `0${time.m}` : time.m}: </h1>

            <h1> {time.s < 10 ? `0${time.s}` : time.s} </h1>
        </div>
    );
});
