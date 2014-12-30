/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

function solicitarBitcoinactual(){
    $.getJSON("http://api.coindesk.com/v1/bpi/currentprice.json",function(result){
        result=result.bpi;
        $(".card-content tbody").remove();
        $.each(result, function(i, field){
            $("#cardinicio table").append('<tbody><tr><td>'+field.code+'</td><td>'+field.symbol+'</td><td>'+field.rate_float+'</td></tr></tbody>');
        });
    });
}

function solicitarDivisas() {
    $.getJSON("http://api.coindesk.com/v1/bpi/supported-currencies.json", function (result) {
        for (var i = 0; i < result.length; i++) {
            $("#selectpaises").append('<option value="' + result[i].currency + '">' + result[i].country + '</option>');
        }
    });
}

function solicitarUltimosprecios(){
    $.getJSON("http://api.coindesk.com/v1/bpi/historical/close.json",function(result){
        var x=[];
        var y=[];
        result=result.bpi;
        $.each(result, function(i, field){
            $("table tbody").prepend('<tr><td>'+i+'</td><td>$'+field+'</td></tr>');
            x.push(i);
            y.push(field);
        });
        creargrafica(x,y);
    });
}

function solicitarconversion(currency){
    $.getJSON("http://api.coindesk.com/v1/bpi/currentprice/"+currency+".json", function (result) {
        $("#resconversion").remove();
        result=result.bpi;
        $.each(result, function(i, field){
            if(field.code!="USD"){
                $(".card-content").append('<center id="resconversion"><hr><h5 class="titulo">Un Bitcoin es el equivalente a:</h5><h4' +
                    ' class="titulo"><b>' + field.rate_float + '</b> '+ field.description +'</h4></center>');
            }
        });
    });
}

function solicitarAnioprecios(){
    var tiempo = new Date();
    var dia = tiempo.getDate();
    var mes = tiempo.getMonth() + 1;
    var anio = tiempo.getFullYear();
    var fecha = anio + '-' + mes + '-' + dia;
    $.getJSON("http://api.coindesk.com/v1/bpi/historical/close.json?start="+anio+"-01-01&end="+fecha,function(result){
        var x=[];
        var y=[];
        result=result.bpi;
        $.each(result, function(i, field){
            $("table tbody").prepend('<tr><td>'+i+'</td><td>$'+field+'</td></tr>');
            x.push(i);
            y.push(field);
        });
        creargraficaconzoom(x,y);
    });
}

function creargrafica(x,y) {
    $('#containergraf').highcharts({
        title: {
            text: 'Precio del bitcoin en los ultimos 31 días'
        },
        credits: {
            enabled: false
        },
        exporting: {
            enabled: false
        },
        xAxis: {
            categories: x,
            labels: {
                enabled: false
            },
            title:{
                text: 'Precio del día ' + x[0] + ' al día ' + x[30]
            }
        },
        yAxis: {
            title: {
                text: 'USD'
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
        },
        series: [{
            name: 'Precio ',
            data: y
        }]
    });
}

function creargraficaconzoom(x, y){
    $(function () {
        $('#containergraf').highcharts({
            chart: {
                zoomType: 'x'
            },
            title: {
                text: 'Precio del bitcoin durante el año'
            },
            subtitle: {
                text: document.ontouchstart === undefined ?
                    'Click and drag in the plot area to zoom in' :
                    'Puedes hacer zoom a la gráfica'
            },
            xAxis: {
                categories: x,
                labels: {
                    enabled: false
                },
                title:{
                    text: 'Precio del día ' + x[0] + ' al día ' + x[30]
                }
            },
            yAxis: {
                title: {
                    text: 'USD'
                }
            },
            legend: {
                enabled: false
            },
            credits: {
                enabled: false
            },
            plotOptions: {
                area: {
                    fillColor: {
                        linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1},
                        stops: [
                            [0, Highcharts.getOptions().colors[0]],
                            [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                        ]
                    },
                    marker: {
                        radius: 2
                    },
                    lineWidth: 1,
                    states: {
                        hover: {
                            lineWidth: 1
                        }
                    },
                    threshold: null
                }
            },

            series: [{
                name: 'Precio',
                data: y
            }]
        });
    });
}

$(document).on('click', '.enlace a', function (event) {
    event.preventDefault();
    window.open($(this).attr('href'), '_system');
    return false;
});