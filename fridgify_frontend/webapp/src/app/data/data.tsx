'use client';

import Navbar from "../../components/Navbar/Navbar";

import "./../globals.css"
import { useEffect, useState } from "react";
import Item, { ItemProps } from "@/components/Item/Item";

// staic data json in public 
import dataFile from "./../../../public/fridgify_test.json"

function Data() {
    // let item: ItemProps | null = null;
    // let data: ItemProps[] | undefined = []

    let fridgeData : any = []

    const [data, setData] = useState({fridge: fridgeData})    
    const userId = '12345'

    // fetch function
    const fetchData = async (path: string, settingFunction: Function ) => {
        return fetch(path).then(res => {
                console.log(res)
                return res.json()
            }).then(dataObject => {
                settingFunction(dataObject)
            }).catch(err => {
                console.log(err, "Error occured when fetching data from JSON.")
                }
            )
    }

    // to prevent the effect hook from updating continiously creating an infinite loop
    useEffect(()=> {
        // fetchData("@/fridgify_test.json", setData);
        setData({fridge: dataFile["data"]})
    }, [])

    return (
        <div className='dataPageContainer'>
            <Navbar/>
            <div className="page-body">
                <h1 className="page-welcome-message">Welcome to Data Page of Fridgify</h1>
                <h3 className="page-message"> What will you analyse today? </h3>
                {
                    data?.fridge ? 
                    <div> 
                        {
                            data.fridge.map((item: ItemProps ) => {
                                return Item(item)
                            })
                        }
                    </div>
                    :
                    <h4>Sorry data couldn't load</h4>
                }
            </div>
        </div>
    );
};

export default Data;