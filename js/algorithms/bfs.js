import { adjacent_nodes_s, adjacent_nodes_d, draw_path } from '../finder.js'

async function bfs_s(grid) {
    await bfs(grid, adjacent_nodes_s);
}
 let startTime ;
 let endTime ;
 let Time ;
async function bfs(grid, adjacent_nodes_function) {

    startTime = performance.now()
    let numberOfOpenedNode = 0 ;

    var start_coord = grid.getStart();
    var end_coord = grid.getEnd();
    grid.setCurrentMode(VISITED_TILE);

    var to_visit = [];
    var visited = [];
    var final_path = [];

    to_visit.push([start_coord, []]);
    visited[start_coord.toString()] = true;
    while (to_visit.length > 0) {
        let curr_coord = to_visit.shift();

        if (curr_coord[0].equals(end_coord)) {
            final_path = curr_coord[1];
            final_path.push(end_coord);
            break;
        }
        if (!curr_coord[0].equals(start_coord)) {
            grid.draw(curr_coord[0]);
            numberOfOpenedNode++
            await new Promise(r => setTimeout(r, ANIMATION_SPEED));
        }

        adjacent_nodes_function(grid, curr_coord[0]).forEach(near_node => {
            if (visited[near_node.toString()] === undefined) {
                let path = curr_coord[1].slice();
                path.push(curr_coord[0]);
                to_visit.push([near_node, path]);
                visited[near_node.toString()] = true;
            }
        });
    }

    endTime = performance.now()
    Time = endTime - startTime
    let algorithmTime = document.getElementById("algorithm_time")
    algorithmTime.innerHTML = Time

    if(final_path.length === 0){
        document.getElementById("massege_text").innerHTML = "متاسفانه هیچ مسیری پیدا نشد"
    }

    document.getElementById("number_of_opened_node").innerHTML = numberOfOpenedNode

    await draw_path(grid, final_path);
}

export { bfs_s };
