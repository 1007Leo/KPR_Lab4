import * as d3 from "d3";
import * as Geo from "../geo.json";
import {Points} from "./points.jsx";
import {useRef, useEffect, useState} from "react";

function Map(props){
    const width = 1000;
    const height = 600;
    const margin = {
        top: 20,
        right: 20,
        bottom: 20,
        left: 100
    };

    const projection = d3.geoMercator()
            .scale(70)
            .center([0, 20])
            .translate([width/2 - margin.left, height/2 - margin.top]);

    const containerRef = useRef(null);
    const [svgEl, setSVG] = useState(null);

    useEffect(()=> {
        const svg = d3.select("#mapSvg");
        setSVG(svg);
        svg.selectAll("*").remove();
        svg.attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom )
            .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

        const g = svg.append("g");
        g.selectAll("path")
            .data(Geo.features)
            .enter()
            .append("path")
            .attr("class", "topo")
            .attr("d", d3.geoPath().projection(projection))
            .style("opacity", .7);
        const zoom = d3.zoom()
            .scaleExtent([1, 8])
            .on('zoom', function(event) {
                g.selectAll('path')
                    .attr('transform', event.transform);
                svg.selectAll('.pads')
                    .attr('transform', event.transform);
            });

        svg.call(zoom);
    }, []);

    return(
        <div className="mapContainer map" ref={containerRef} >
            <svg id="mapSvg"/>
            <Points map={svgEl} launchpads={props.launchpads} projection={projection}/>
        </div>
    )
}

export {Map};