let myGraph;

function callNeovis() {
    console.log("neovis");

    let title = document.getElementById("title");
    title.innerText = "neovis visualizer";
}

function callForceGraph(data) {
    let title = document.getElementById("title");
    title.innerText = "force-graph visualizer";

    let visualizer = document.getElementById("content");
    myGraph = ForceGraph()(visualizer)
        .zoom(1)
        .width(visualizer.clientWidth - 40)
        .height(visualizer.clientHeight - 142)
        .nodeVal(1)
        .nodeAutoColorBy("group")
        .nodeLabel("id")
        .linkLabel("index")
        .linkAutoColorBy("value")
        // .nodeAutoColorBy("user")
        // .nodeLabel("id")
        // .linkLabel("index")
        // .linkAutoColorBy("source")
        .linkDirectionalArrowLength(1)
        .linkCurvature(0)
        .linkDirectionalParticles(0)
        .onLinkClick((link) => {
            myGraph.emitParticle(link);
        })
        .nodeCanvasObjectMode(() => 'after')
        .nodeCanvasObject((node, ctx, globalScale) => {
            ctx.fillStyle = node.color;
            ctx.font = "bold 10px Segoe UI";
            ctx.fillText(node.id, node.x, node.y + 6);
            ctx.textBaseline = "middle";
        })
        .onNodeClick((node) => {
            let container = document.getElementById("informations");
            container.innerHTML = "";
            
            // Check if node already clicked 

            for (let key in node) {
                if (node[key]) {
                    let span = document.createElement("span");
                    span.innerText = key + " ⇒ " + node[key];
                    container.appendChild(span);
                }
            }
          })
          .onLinkClick((link) => {
            let container = document.getElementById("informations");
            container.innerHTML = "";

            for (let key in link) {
                if (link[key]) {
                    if (typeof(link[key]) == "object") {
                        let ul = document.createElement("ul");
                        ul.setAttribute("id", "property")
                        ul.setAttribute("class", "dropdown")
                        let span = document.createElement("span");
                        span.setAttribute("id", "property-title")
                        span.innerText = key + " ⇓";
                        span.onclick = function() {
                            enableDropdown(span);
                        };
                        
                        ul.appendChild(span)

                        for (let subKey in link[key]) {
                            let li = document.createElement("li");
                            li.setAttribute("class", "dropdown-content")
                            let span = document.createElement("span");

                            span.innerText = subKey + " ⇒ " + link[key][subKey];

                            // if (subKey == "id")  
                            //     span.innerText = key + " ➔ " + subKey + ": " + link[key][subKey];
                            // else
                            //     continue;

                            li.appendChild(span);
                            ul.appendChild(li);
                        }
                        container.appendChild(ul);
                    } else {
                        let span = document.createElement("span");
                        span.innerText = key + " ⇒ " + link[key];
                        container.appendChild(span);
                    }
                }
            }
        })
        .onBackgroundClick(() => {
            let container = document.getElementById("informations");
            container.innerHTML = "";
        });
        // .d3Force("x", d3.forceX().x(node => { // Force position node x position
        //     node.fx = node.x;
        // }))
        // .d3Force("y", d3.forceX().x(node => { // Force position node y position
        //     node.fy = node.y;
        // }))

    // setInterval(() => {
    //     const { nodes, links } = myGraph.graphData();
    //     const id = nodes.length;
    //     myGraph.graphData({
    //         nodes: [...nodes, { id }],
    //         links: [...links, { source: id, target: Math.round(Math.random() * (id-1)) }]
    //     });
    // }, 1000);
    myGraph.graphData(data);
    myGraph.d3Force('link').distance(100);

    window.addEventListener("resize", (event) => {
        location.reload();
    })
}

function call3DForceGraph(data) {
    let title = document.getElementById("title");
    title.innerText = "3d-force-graph visualizer";

    let visualizer = document.getElementById("content");
    myGraph = ForceGraph3D()(visualizer)
        .numDimensions(3)
        .width(visualizer.clientWidth - 30)
        .height(visualizer.clientHeight - 142)
        .backgroundColor("#282936")
        .nodeVal(1)
        // .nodeAutoColorBy("group")
        // .nodeLabel("id")
        // .linkLabel("index")
        // .linkAutoColorBy("value")
        .nodeAutoColorBy("user")
        .nodeLabel("id")
        .linkLabel("value")
        .linkAutoColorBy("source")
        .linkOpacity(0.5)
        .linkDirectionalArrowLength(1)
        .linkCurvature(0)
        .linkDirectionalParticles(0)
        .onLinkClick((link) => {
            myGraph.emitParticle(link);
        })
        .onNodeRightClick((node) => {
            const distance = 40;
            const distRatio = 1 + distance / Math.hypot(node.x, node.y, node.z);
    
            myGraph.cameraPosition(
              {
                x: node.x * distRatio,
                y: node.y * distRatio,
                z: node.z * distRatio
              },
              node,
              3000
            );
        })
        .onNodeClick((node) => {
        let container = document.getElementById("informations");
        container.innerHTML = "";
        
        // Check if node already clicked 

        for (let key in node) {
            if (node[key]) {
                let span = document.createElement("span");
                span.innerText = key + " ⇒ " + node[key];
                container.appendChild(span);
            }
        }
        })
        // .onLinkHover((link) => {
        //     if (link) {
        //         let container = document.getElementById("informations");
        //         container.innerHTML = "";

        //         for (let key in link) {
        //             if (link[key]) {
        //                 if (typeof(link[key]) == "object") {
        //                     let ul = document.createElement("ul");
        //                     ul.setAttribute("id", "property")
        //                     ul.setAttribute("class", "dropdown")
        //                     let span = document.createElement("span");
        //                     span.setAttribute("id", "property-title")
        //                     span.innerText = key + " ⇓";
        //                     span.onclick = function() {
        //                         enableDropdown(span);
        //                     };

        //                     ul.appendChild(span)

        //                     for (let subKey in link[key]) {
        //                         let li = document.createElement("li");
        //                         li.setAttribute("class", "dropdown-content")
        //                         let span = document.createElement("span");

        //                         span.innerText = subKey + " ⇒ " + link[key][subKey];

        //                         // if (subKey == "id")  
        //                         //     span.innerText = key + " ➔ " + subKey + ": " + link[key][subKey];
        //                         // else
        //                         //     continue;

        //                         li.appendChild(span);
        //                         ul.appendChild(li);
        //                     }
        //                     container.appendChild(ul);
        //                 } else {
        //                     let span = document.createElement("span");
        //                     span.innerText = key + " ⇒ " + link[key];
        //                     container.appendChild(span);
        //                 }
        //             }
        //         }
        //     } else {
        //         console.log("mouseLeaveLink");
        //     }
        // })
        .onLinkClick((link) => {
            let container = document.getElementById("informations");
            container.innerHTML = "";

            for (let key in link) {
                if (link[key]) {
                    if (typeof(link[key]) == "object") {
                        let ul = document.createElement("ul");
                        ul.setAttribute("id", "property")
                        ul.setAttribute("class", "dropdown")
                        let span = document.createElement("span");
                        span.setAttribute("id", "property-title")
                        span.innerText = key + " ⇓";
                        span.onclick = function() {
                            enableDropdown(span);
                        };

                        ul.appendChild(span)

                        for (let subKey in link[key]) {
                            let li = document.createElement("li");
                            li.setAttribute("class", "dropdown-content")
                            let span = document.createElement("span");

                            span.innerText = subKey + " ⇒ " + link[key][subKey];

                            // if (subKey == "id")  
                            //     span.innerText = key + " ➔ " + subKey + ": " + link[key][subKey];
                            // else
                            //     continue;

                            li.appendChild(span);
                            ul.appendChild(li);
                        }
                        container.appendChild(ul);
                    } else {
                        let span = document.createElement("span");
                        span.innerText = key + " ⇒ " + link[key];
                        container.appendChild(span);
                    }
                }
            }
        })
        .onBackgroundClick(() => {
            let container = document.getElementById("informations");
            container.innerHTML = "";
        });
        // .d3Force("x", d3.forceX().x(node => { // Force position node x position
        //     node.fx = node.x;
        // }))
        // .d3Force("y", d3.forceX().x(node => { // Force position node y position
        //     node.fy = node.y;
        // }))
        // .d3Force("z", d3.forceX().x(node => { // Force position node z position
        //     node.fz = node.z;
        // }))
    // setInterval(() => {
    //     const { nodes, links } = myGraph.graphData();
    //     const id = nodes.length;
    //     myGraph.graphData({
    //         nodes: [...nodes, { id }],
    //         links: [...links, { source: id, target: Math.round(Math.random() * (id-1)) }]
    //     });
    // }, 1000);
    myGraph.graphData(data);
    myGraph.d3Force('link').distance(100);

    window.addEventListener("resize", (event) => {
        location.reload();
    })
}

function openSettings() {
    let settingsPanel = document.getElementById("settings");
    let parameters = document.getElementById("parameters");

    if (settingsPanel.dataset.state == "open") {
        settingsPanel.style.width = "auto";
        settingsPanel.style.height = "auto";
        settingsPanel.style.borderRadius = "0px 0px 0px 12.5px";
        settingsPanel.dataset.state = "close";
        parameters.style.display = "none";
    } else {
        settingsPanel.style.width = "20%"; // should be auto?
        settingsPanel.style.height = "100%";
        settingsPanel.style.borderRadius = "0px";
        settingsPanel.dataset.state = "open";
        parameters.style.display = "flex";
    }
}

function fitGraphOnScreen() {
    myGraph.zoomToFit(100, 100, node => true);
}

function forceLinkUpdate(newSize) {
    myGraph.d3Force("link").distance(parseInt(newSize));
    myGraph.d3ReheatSimulation();
}

function forceChargeUpdate(newSize) {
    myGraph.d3Force("charge", d3.forceManyBody().strength(- parseInt(newSize)));
    myGraph.d3ReheatSimulation();
}

function forceCollisionUpdate(newSize) {
    myGraph.d3Force("collide", d3.forceCollide(parseInt(newSize)));
    myGraph.d3ReheatSimulation();
}

function forceManyBodyUpdate(newSize) {
    myGraph.d3Force("manyBody", d3.forceManyBody().strength(parseInt(newSize)));
    myGraph.d3ReheatSimulation();
}

function forceRadialUpdate(newSize) {
    myGraph.d3Force("radial",  d3.forceRadial(parseInt(newSize), 0, 0).strength(1));
    myGraph.d3ReheatSimulation();
}

function nodeSizeUpdate(newSize) {
    myGraph.nodeRelSize(parseInt(newSize));
}

function nodeColorUpdate(newColor) {
    myGraph.nodeColor(() => newColor);
}

function backgroundColorUpdate(newColor) {
    myGraph.backgroundColor(newColor);
}

function linkWidthUpdate(newSize) {
    myGraph.linkWidth(parseInt(newSize));
}

function linkColorUpdate(newColor) {
    myGraph.linkColor(() => newColor);
}

function linkArrowLengthUpdate(newSize) {
    myGraph.linkDirectionalArrowLength(parseInt(newSize));
}

function linkArrowPosUpdate(newSize) {
    myGraph.linkDirectionalArrowRelPos(parseFloat(newSize));
}

function linkArrowColorUpdate(newColor) {
    myGraph.linkDirectionalArrowColor(() => newColor);
}

function linkCurvatureUpdate(newSize) {
    myGraph.linkCurvature(() => parseFloat(newSize));
}

function linkParticlesUpdate(newSize) {
    myGraph.linkDirectionalParticles(parseInt(newSize));
}

function linkParticlesWidthUpdate(newSize) {
    myGraph.linkDirectionalParticleWidth(parseFloat(newSize));
}

function linkParticlesSpeedUpdate(newSize) {
    myGraph.linkDirectionalParticleSpeed(parseFloat(newSize));
}

function linkParticlesColorUpdate(newColor) {
    myGraph.linkDirectionalParticleColor(() => newColor);
}

function enableDropdown(el) {
    let result = [],
    node = el.parentNode.firstChild;

    while (node) {
        if (node !== el && node.nodeType === Node.ELEMENT_NODE) 
        result.push(node);
        node = node.nextElementSibling || node.nextSibling;
    }

    for (let i = 0; i < result.length; i++) {
        let sibling = result[i];
        if (sibling.tagName == 'LI') {
            if (sibling.classList[1] != "show-dropdown")
                sibling.classList.add('show-dropdown');
            else
                sibling.classList.remove('show-dropdown');
        }
    }
}

function enableTimeSelector(el) {
    let placeholder = document.getElementById("placeholder");
    let container = document.getElementById("time-selector-panel");
    let startDate = document.getElementById("range-start-date");
    let endDate = document.getElementById("range-end-date");

    if (!container.style.display || container.style.display == "none") {
        container.style.display = "flex"; 
    } else {
        if (el) {
            placeholder.innerText = el.innerText;
            container.style.display = "none";
        }
        else if (startDate.value && endDate.value) {
            placeholder.innerText = startDate.value + " to " + endDate.value;
            container.style.display = "none";
        } else {
            console.log("Display Missing value(s) <span>");
        }
    }
}