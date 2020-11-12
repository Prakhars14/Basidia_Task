import React, {useEffect, useState} from 'react'
import { readRemoteFile } from 'react-papaparse';
import statecsv from '../assets/state_wise_data.csv';
import CoronaTable from './CoronaTable';

const Home = () => {

    const [data,setData]=useState({});

    useEffect(() => {
        readRemoteFile(statecsv, {
            complete: (results) => {
                console.log(results);
              setData(results);
            },
          });
    }, [])
    console.log(data);
    return (
        <>
            {data.data&&data.data.length&&<CoronaTable data={data.data}/>}
        </>
    )
}

export default Home
