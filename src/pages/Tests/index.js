import React, { useRef } from 'react'
import { Link } from 'react-router-dom'
import { TestLogic } from './TestLogic'
import MySnackbar from 'src/Components/Util/SnackBar';
import './styles.scss'

function Tests() {    
    
    let snakkebarRef = useRef('');

    // Calling handleSnakkebarAction function from snakkebar component 
    const snakkebarAction = (actionObject) => {        
        snakkebarRef.current.handleSnakkebarAction(actionObject); // This function is in SnackBar.js
    }

    const { testsList, handleClick } = TestLogic({snakkebarAction})

    return (
        <section>
            <div className="tests">
                <h1 style={{margin: '0'}}>Available Tests</h1>
                <div>
                    {
                        testsList.map((test, index) => (
                            <Link                                
                                // to={`/tests/${test.id}`}
                                id={index}
                                key={test.id}                                
                                onClick={(event) => { event.preventDefault(); handleClick(index+1, test.id); }}
                            >
                                Test {index + 1}
                            </Link>
                        ))
                    }                    
                </div>
            </div>
            <MySnackbar ref={snakkebarRef} />
        </section>
    );
}

export default Tests;