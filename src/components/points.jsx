import * as d3 from "d3";
import {useEffect} from "react";

function Points(props)
{
    useEffect(()=> {
        const projection = props.projection;
        const svg = d3.select("#mapSvg");
        let points = svg.selectAll('.pads')
        .data(props.launchpads);
        let pointsEnter = points
            .enter()
            .append('g')
            .attr('class', 'pads');
        pointsEnter
            .attr("id", function(d){
                return d.id;
            })
            .append('circle')
            .attr("r", 4)
            .attr("fill", "blue")
            .attr("transform", function(d){
                return "translate(" + projection([
                    d.longitude,
                    d.latitude
                    ]) + ")";
            });
    }, [props.launchpads, props.projection, props.svg]);
    
    return null;
}

export {Points};