function reflex_agent(location, stateA, stateB){
    if (location == "A" && stateA == "DIRTY") return "CLEAN";
    if (location == "B" && stateB == "DIRTY") return "CLEAN";
    if (location == "A") return "RIGHT";
    if (location == "B") return "LEFT";
}

function test(states){
    var location = states[0];
    var stateA = states[1];
    var stateB = states[2];
    var action_result = reflex_agent(location, stateA, stateB);
    
    document.getElementById("log").innerHTML += "<br>Location: " + location + 
                                                " | State A: " + stateA + 
                                                " | State B: " + stateB + 
                                                " | Action: " + action_result;
    
    if (action_result == "CLEAN"){
        if (location == "A") states[1] = "CLEAN";
        else if (location == "B") states[2] = "CLEAN";
    }
    else if (action_result == "RIGHT") states[0] = "B";
    else if (action_result == "LEFT") states[0] = "A";
    
    // Verificar si hemos visitado los 8 estados
    var stateString = states.join(",");
    if (!visitedStates.includes(stateString)) {
        visitedStates.push(stateString);
    }
    
    if (visitedStates.length == 8) {
        document.getElementById("log").innerHTML += "<br>¡Se han visitado los 8 estados!";
        return;
    }
    
    if (visitedStates.length < 7) {
        if (states[1] == "CLEAN" && states[2] == "CLEAN") {
            if (Math.random() < 0.1) {
                states[1] = "DIRTY";
            } else {
                states[2] = "DIRTY";
            }
        }
    }
    
    setTimeout(function(){ test(states); }, 500);
}
    
    setTimeout(function(){ test(states); }, 1000);
}

var states = ["A","DIRTY","DIRTY"];
var visitedStates = [];
test(states);
