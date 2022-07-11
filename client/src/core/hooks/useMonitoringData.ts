import { useEffect, useState } from "react"

export const useMonitoringData = () => {

    const [monitoringData, setMonitoringData] = useState({
        data: {
            botOnline: true,
            maintenance: false
        },
        loading: true,
        error: null,
    })

    // useEffect(() => {
    //     const fetchData = async () => {
    //         const response = await fetch(`${process.env.REACT_APP_API_URL}/monitoring`);
    //         const data = await response.json();
    //         setMonitoringData({
    //             data,
    //             loading: false,
    //             error: null,
    //         });
    //     };
    //     fetchData();
    // }, []);

    return monitoringData
}