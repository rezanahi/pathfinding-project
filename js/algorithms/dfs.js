import { adjacent_nodes_s, adjacent_nodes_d, draw_path } from '../finder.js'

async function dfs_s(grid) {
    await dfs(grid, adjacent_nodes_s);
}

let startTime ;
let endTime ;
let Time ;

async function dfs(grid, adjacent_nodes_function) {

    startTime = performance.now()
    let numberOfOpenedNode = 0 ;

    var start_coord = grid.getStart();
    var end_coord = grid.getEnd();
    grid.setCurrentMode(VISITED_TILE);
    
    var visited = [];
    var final_path = [];
    var found = false;
    
    async function explore(node, path) {
        visited[node.toString()] = true;

        if (node.equals(end_coord)) {
            found = true;
            final_path = path;
            final_path.push(end_coord);
            return;
        }
        if (!node.equals(start_coord)) {
            grid.draw(node);
            numberOfOpenedNode++
            await new Promise(r => setTimeout(r, ANIMATION_SPEED));
        }
        path.push(node);
        
        let adjacent = adjacent_nodes_function(grid, node);
        for (var i=0; i<adjacent.length && !found; i++) {
            if (visited[adjacent[i].toString()] === undefined && !found) {
                await explore(adjacent[i], path.slice());
            }
        }
    }


    await explore(start_coord, []);

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

export { dfs_s };
