import React from 'react';
// Child package
import MyPackage from './package';
// Styles
import './styles.scss';

import { PackageLogic } from './logic';

export default function Packages() {

    const { packagesList, error, errorMsg, loading } = PackageLogic()
     
    return (
        <section>
            <h1 style={{margin: '0'}}>Packages</h1>
            <div className="container">
                {
                    !error ?
                    loading ? <>Loading..</> : 
                    packagesList.map((data, index) => (                        
                        <MyPackage key={index} {...data} />
                    ))
                    :
                    <div> {errorMsg} </div>
                }                
            </div>
        </section>
    );
}