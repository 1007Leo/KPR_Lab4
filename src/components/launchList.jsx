import * as d3 from "d3";
import {useState} from "react";

function LaunchList(props) {

    const [isHovering, setIsHovering] = useState(false);
    const [hoveringName, setHoveringName] = useState("");

    const handleMouseOver = (id, name) => {
        setIsHovering(true);
        setHoveringName(name);

        d3.select("#mapSvg")
        .selectAll(".pads")
        .filter(function(d) {return d.id === id})
        .raise()
        .select('circle')
        .attr('r', 8)
        .attr('fill', 'red');
    };

    const handleMouseOut = (id) => {
        d3.select("#mapSvg")
        .selectAll(".pads")
        .filter(function(d) {return d.id === id})
        .raise()
        .select('circle')
        .attr('r', 4)
        .attr('fill', 'blue');

        setIsHovering(false);
        setHoveringName("");
    };

    return (
        <aside className="aside" id="launchesContainer">
            <h3>Launches</h3>
            <div id="listContainer">
                <ul>
                    {props.launches.map(launch => {
                        return <li key={launch.id} 
                                   onMouseOver={e => handleMouseOver(launch.launchpad, launch.name)} 
                                   onMouseOut={e => handleMouseOut(launch.launchpad)}
                                > 
                                    {launch.name}
                                </li>
                    })}
                </ul>
            </div>
            <div>
                {isHovering && (
                    <div>
                        {hoveringName}
                    </div>
                )}
            </div>
        </aside>
    )
}

export {LaunchList};