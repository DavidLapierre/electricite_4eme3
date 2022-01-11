 // ----------- SETUP BLOCK ------------
    // Le bloc de configuration est également considéré comme le bloc de données. 
    // Ce bloc est essentiellement un const (variable constante) composé de
    //  plusieurs objets javascript liés aux données. 
    // Il peut s'agir de points de données, d'étiquettes, de couleurs d'arrière-plan,
    //  de couleurs de survol, etc.
    var rangeInput = document.getElementById("rangeinput");
    var donnees = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    var ordonnees = [];
    donnees.forEach((x) => {ordonnees.push(rangeInput.value*x)});

    const data = {
        labels: ['0','1', '2', '3','4', '5', '6', '7', '8', '9', '10'],
        datasets: [{
                    label: 'none',
                    data: ordonnees,
                    pointStyle: 'cross',
                    pointRadius: 10,
                    backgroundColor: [
                        'black'  
                    ],
                    borderColor: [
                        'black',
                        'red',
                        'red',
                        'red',
                        'red',
                        'red',
                        'red',
                        'red',
                        'red',
                        'red',
                        'red'
                    ],
                    borderWidth: 2.5
                }]
    }
    // yScaleText plugin block
    
    const yScaleText = {
        title: {
                        display: true,
                        text: 'U = ' + rangeInput.value + ' x I',
                        font: {
                            size: 20,
                        }
                    },
                    legend: {
                        labels: {
                            // This more specific font property overrides the global property
                            font: {
                                size: 19
                            }
                        }
                    }
    }

    // ----- CONFIGURATION BLOCK --------
    // Le bloc de configuration comprend toutes les configurations d'un graphique.
    // La configuration doit être placée avant le bloc de rendu. 
    // Comme ce bloc a tendance à dépendre du bloc de données en raison de la variable data const.
    // ----------------------------------

    const config = {
        type: 'line',
        data, // SE RAPPORTE AU BLOCK SETUP DU DESSUS !!!!
        options: {
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 10,
                        min:0,
                        ticks: {
                            stepSize:1.0
                        },
                        grid: {
                            color:'rgba(25, 86, 200,0.75)'
                        },
                        title: {
                            display: true,
                            text: 'U',
                            font: {
                                size: 25,
                                weight: "bold",
                                family: "Helvetica Neue"
                            }
                        }
                    }, 
                    x: {
                        beginAtZero: true,
                        max: 10,
                        min:0,
                        ticks: {
                            stepSize:1.0
                        },
                        grid: {
                            color:'rgba(25, 86, 200,0.65)'
                        },
                        title: {
                            display: true,
                            text: 'I',
                            font: {
                                size: 25,
                                weight: "bold",
                                family: "Helvetica Neue"
                            }
                        }
                    }, 
                }
                ,
                plugins: {
                    title: {
                        display: true,
                        text: 'U = ' + rangeInput.value + ' x I',
                        font: {
                            size: 20,
                        }
                    },
                    legend: {
                        labels: {
                            // This more specific font property overrides the global property
                            font: {
                                size: 19
                            }
                        }
                    }
                }
            }
        };

    // -------- RENDER INITIALISATION BLOCK -------
    // Le dernier bloc qui devrait toujours être le dernier est le bloc de rendu ou d'initialisation.
    // Ce bloc dessine le graphique dans le canevas en fonction de tout le code ci-dessus. 
    // Cela signifie que tout le bloc doit être chargé avant le chargement de ce bloc.
    // Sinon, cela donnerait une erreur et pourrait exclure certains blocs de code.
    // -------------------------------------------
    const myChart = new Chart(
        document.getElementById('myChart').getContext('2d'),
        config
    );
    
    var valeur = document.querySelector('input');
    var rangeInput = document.getElementById("rangeinput");

    // GESTIONNAIRE D'ÉVÊNEMENTS :
    rangeInput.addEventListener("change", function() {
        
        document.getElementById("rangevalue").textContent = rangeInput.value;
        // On calcule les données en y :
        ordonnees = [];
        donnees.forEach((x) => {ordonnees.push(rangeInput.value*x)});

        // On intègre les données au Graph et on l'update :
        R = rangeInput.value;
        myChart.options.plugins.title.text = 'U = ' + R + ' x I';
        myChart.data.datasets[0].data = ordonnees;            
        myChart.update();
    });
