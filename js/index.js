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