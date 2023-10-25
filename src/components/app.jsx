import {LaunchList} from "./launchList";
import {Map} from "./map";
import {useEffect, useState} from "react";
import {SpaceX} from "../api/spacex";

function App(){

    const [launches, setLaunches] = useState([]);
    const [launchpads, setLaunchpads] = useState([]);
    const spacex = new SpaceX();
    useEffect(()=>{
        spacex.launches().then(data =>{
            setLaunches(data);
        })
        spacex.launchpads().then(data =>{
            setLaunchpads(data);
        })
    },[]);

    return(
        <main className='main'>
            <LaunchList launches = {launches}/>
            <Map launchpads = {launchpads}/>
        </main>
    )
}

export {App};
