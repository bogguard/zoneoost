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
var uren = "Uren";
var dagen = "Dagen";
 
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
		var send = function(message) {
			showSpinner();	
			var hours = $("#hours").val();
			if($("#uurspan").text() == dagen){
				hours *= 24;
			}		
			var fullMessage = message + "#" + hours;
			var number = $("#zoneTel").val();
			//var intent = "INTENT"; //leave empty for sending sms using default intent
			var intent = "";
            var success = function () { alert('Status [' + message + '] succesvol gewijzigd');hideSpinner(); };
            var error = function (e) { alert('Status [' + message + '] kon niet gewijzigd worden : ' + e);hideSpinner(); };
			
			sms.send(number, fullMessage, intent, success, error);
			
			if(navigator.userAgent.toLowerCase().match(/iphone/)){
				hideSpinner();
			}
		}
	
        app.receivedEvent('deviceready');
		$("#btnB10").click(function(){send("B10");});
		$("#btnNB").click(function(){send("NB");});
		$("#btnBDV").click(function(){send("BDV");});
		$("#btnNBO").click(function(){send("NBO");});
		$("#btnBD10").click(function(){send("BD10");});	
		$("#btnB15").click(function(){send("B15");});
		$("#btnNBZ").click(function(){send("NBZ");});

		$("#btnHour").click(function(){convertHours();});					
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {

    }
};

function showSpinner(){
	$.mobile.loading( "show", {
			text: "sending",
			textVisible: true
	});
}

function convertHours(){
	if($("#uurspan").text() == uren){
		$("#uurspan").text(dagen);
		//$("#hours").attr('max', 16);
		alert("Instellingen verzet naar dagen");
	}else{
		$("#uurspan").text(uren);
		//$("#hours").attr('max', 48);
		alert("Instellingen verzet naar uren");
	}
}

function hideSpinner(){
    $.mobile.loading("hide");
}
