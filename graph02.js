 // ----------- SETUP BLOCK ------------
    // Le bloc de configuration est également considéré comme le bloc de données. 
    // Ce bloc est essentiellement un const (variable constante) composé de
    //  plusieurs objets javascript liés aux données. 
    // Il peut s'agir de points de données, d'étiquettes, de couleurs d'arrière-plan,
    //  de couleurs de survol, etc.
    var rangeInput2 = document.getElementById("rangeinput2");
    var donnees2 = [];
    var ordonnees2 = [];

    function linespace(startValue, stopValue, cardinality) {
        var arr = [];
        var step = (stopValue - startValue) / (cardinality - 1);
        for (var i = 0; i < cardinality; i++) {
          arr.push(startValue + (step * i));
        }
        return arr;
      }

    donnees2 = linespace(0,10,0.5)
    
    donnees2.forEach((x) => {ordonnees2.push(rangeInput2*x)});

    const data2 = {
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
                    borderWidth: 2.5,
                    labels: ['0','1', '2', '3','4', '5', '6', '7', '8', '9', '10']
                }]
    }
    // yScaleText plugin block
    
    const yScaleText2 = {
        title: {
                        display: true,
                        text: 'U = ' + rangeInput2.value + ' x I',
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
    const affichage2 = {
        callbacks: {
            title: function(context) {
                return '';
            },
            label: function(context) {
                return `I  = ` + context.dataset.labels[context.dataIndex]
            },
            afterLabel: function(context) {
                return `U = ` + context.dataset.data[context.dataIndex]
            }
        }
    }

    const config2 = {
        type: 'line',
        data: data2, // SE RAPPORTE AU BLOCK SETUP DU DESSUS !!!!
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
                    tooltip: affichage2,
                    title: {
                        display: true,
                        text: 'U = ' + rangeInput2.value + ' x I',
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
    const myChart2 = new Chart(
        document.getElementById('myChart2').getContext('2d'),
        config2
    );
    
    var valeur = document.querySelector('input');
    var rangeInput2 = document.getElementById("rangeinput2");

    // GESTIONNAIRE D'ÉVÊNEMENTS :
    rangeInput2.addEventListener("change", function() {
        
        document.getElementById("rangevalue2").textContent = rangeInput2.value;
        // On calcule les données en y :
        ordonnees = [];
        donnees.forEach((x) => {ordonnees.push(rangeInput2.value*x)});

        // On intègre les données au Graph et on l'update :
        R = rangeInput2.value;
        myChart2.options.plugins.title.text = 'U = ' + R + ' x I';
        myChart2.data.datasets[0].data = ordonnees;            
        myChart2.update();
    });
