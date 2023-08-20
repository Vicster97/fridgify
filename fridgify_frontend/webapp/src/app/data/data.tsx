'use client';

import Navbar from "../../components/Navbar/Navbar";

import "./../globals.css"
import { useEffect, useState } from "react";

function Data() {
    const [data, setData] = useState(null)
    const userId = '12345'

    // fetch function
    const fetchData = async (path: string, settingFunction: any ) => {
        fetch(path).then(
            function(res){
                return res.json()
            }).then( function(data){
                //console.log("data",data)
                //assigning state variable data to the data from json
                // if (calc) {
                //     calcBonusRows(data, incentivePercentage);
                // }
                settingFunction(data);
            }).catch(
                function(err){
                // print in the console if an error occured
                console.log(err, "Error occured when fetching data from JSON.")
                }
            )
    }

    // to prevent the effect hook from updating continiously creating an infinite loop
    useEffect(()=> {
        fetchData("./fridgify_test.json", setData);
    }, [userId])

    return (
        <div className='dataPageContainer'>
            <Navbar/>
            <div className="page-body">
                <h1 className="page-welcome-message">Welcome to Data Page of WhatIsUp?</h1>
                <h3 className="page-message"> What will you analyse today? </h3>
                {
                    data? 
                    <div>
                        Data is here
                    </div>
                    :
                    <h4>Sorry data couldn't load</h4>
                }
            </div>
        </div>
    );
};

export default Data;