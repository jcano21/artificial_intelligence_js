let csvData = null;

// Cargar Google Charts
google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(initialize);

// Inicializar evento para leer el archivo CSV
document.getElementById("csvFile").addEventListener("change", function(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = function(e) {
        const contents = e.target.result;
        const rows = contents.trim().split("\n");
        const headers = rows[0].split(",");
        csvData = parseCSV(contents);
        if (csvData) {
            showCSVPreview(headers, csvData);
            console.log("Datos CSV cargados:", csvData);
        }
    };
    reader.readAsText(file);
});

// Parsear el archivo CSV
function parseCSV(contents) {
    const rows = contents.trim().split("\n");
    const headers = rows[0].split(",");
    const parsedData = [];
    
    if (rows.length < 2) {
        alert("El archivo CSV debe contener al menos una fila de datos.");
        return null;
    }
    
    for (let i = 1; i < rows.length; i++) {
        const values = rows[i].split(",").map(Number);
        
        if (values.length === 3 && !values.some(isNaN)) {
            parsedData.push(values); // Agregar solo los datos
        } else {
            alert("Error: Asegúrate de que el archivo CSV tenga tres columnas numéricas.");
            return null;
        }
    }
    return parsedData;
}


document.getElementById("trainButton").addEventListener("click", function() {
    if (!csvData) {
        alert("Por favor, cargue un archivo CSV primero.");
        return;
    }

    const trainTestSplit = document.getElementById("trainTestSplit").value / 100;
    const modelType = document.getElementById("algorithmSelect").value;

    const xValues = csvData.map(row => row[0]);
    const yValues = csvData.map(row => row[2]); 

    // Entrenar el modelo de regresión lineal
    const linear = new LinearRegression();
    linear.fit(xValues, yValues);
    const yPredict = linear.predict(xValues);

    console.log("Y Predicted:", yPredict);
    drawChart(xValues, yValues, yPredict);
});

// Dibujar gráfico con datos reales y predicción
function drawChart(xTrain, yTrain, yPredict) {
    const dataArray = [['X', 'Y Real', 'Y Predicción']];
    for (let i = 0; i < xTrain.length; i++) {
        dataArray.push([xTrain[i], yTrain[i], yPredict[i]]);
    }

    const data = google.visualization.arrayToDataTable(dataArray);

    const options = {
        title: 'Regresión Lineal',
        seriesType: 'scatter',
        series: {1: {type: 'line'}},
        hAxis: { title: 'X' },
        vAxis: { title: 'Y' }
    };

    const chart = new google.visualization.ComboChart(document.getElementById('chart_div'));
    chart.draw(data, options);
}