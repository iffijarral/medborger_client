import { useState, useEffect } from 'react';
import { getRequest } from 'src/Setup/AxiosClient';

export const PackageLogic = () => {
    const [loading, setLoading] = useState(false);
    const [packagesList, setPackagesList] = useState([]);
    const [error, setError] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    
    useEffect(() => {

        const getPackages = async () => {
            try {
                setLoading(true); // Start loading

                const response = await getRequest('packages'); // Fetch Data
            
                setLoading(false); // Stop loading

                if (response.status === 200) {
                    setPackagesList(response.data);
                }
                else {

                    setLoading(false); // Stop loading in case of error

                    setError(true);

                    setErrorMsg(response.data);
                }

            }
            catch (error) {
                
                setError(true);

                setErrorMsg(error.message);
            }
        }
        getPackages()
    }, []);

    return {
        loading,
        setLoading,
        packagesList,
        error,
        errorMsg
    }
}