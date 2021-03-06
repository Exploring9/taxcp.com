// SELF-INVOKING FUNCTION:
/* Write with ES6 Modules - When they are supported by firefox [ALL PARTS WILL BE SEPERATE MODULES!]
 * PART 1 - GROUNDING FUNCTION
 * PART 2 - ENVIRONMENT CREATION
 * PART 3 - MANDATORY INFORMATION
 * PART 4 - PERSONAL DATA
 * PART 5 - ECONOMIC DATA
 * PART 6 - ADD THE DETAILS TO THE WEBPAGE
 * PART 7 - SENDING THE INFO TO CALCULATE THE TAXES
 * PART 8 - Graphing tool
 * PART 9 - AJAX CALLER
 * PART 10 - CODE EXECUTER
 * LOAD UNDERSCORE
 */
// Listening events (The country selection changes the filing status)
var url_of_the_website = window.location.href;
console.log(url_of_the_website);
(function ($, windows){
"use strict";
$(document).ready(function() {
  // Scoping variables
  var GLOBAL_SCOPE = window;
  var DOCUMENT_SCOPE = this;
  var created_economic_classes = null; // This is to check all of the economic objects that I have been created
  
  var custom_Function = {
  	warning_Missing_Information: function (message) {
  		alert("You need to enter this information:"+message);
  	},
  	warning_Have_Not_Created: function(message) {
  		alert("You need to:"+message);
  	},
  	get_DOM_Details: function (name_element_where_the_value_is) {
        return $('[name='+name_element_where_the_value_is+']').val();	
  	},
  	get_Inner_HTML_Details_Option: function(name_element_where_the_value_is) {
  		return $('select[name='+name_element_where_the_value_is+'] option:selected').html();
  	}
  };
  
  // PART 2 - ENVIRONMENT CREATION 
  var environment_Creation_Tax = {
  	// PART A - Get all of the information about the country [Elements that don't need predecessors']
  	information_Fetcher: function(){
  		var selection_scope = $("[data-check=false]");console.log(selection_scope);
  		var selected_Element_List = {
  			"name" : []
  		};
  		for (var i=0; i<selection_scope.length; i++) {//console.log(selection_scope[i]);
            selected_Element_List["name"].push(selection_scope[i]["name"]);		
  		} 
  		// Now there is only one value - Countries - Change it for optimazation?//
  		console.log(selection_scope.length);
  		if (selection_scope.length !== 0){ //So that the other pages don't start calling Ajax when all of the JS files are mimified into one big js file
  			ajax_Caller.ajax_Send_Input_Forms(selected_Element_List);
  		}
  	},
  	// PART B - GET THE INFO ON THE DEPENDED VARIABLES (I will need to change it since it very data dependent -> There is a strict flow)
  	information_Fetcher_Single: function(){
  		$("select[data-selector]").change(function(){
  			//console.log(this);console.log(this["value"]);
  			var selected_Element_List = {
  				"name" : [],
  				"from_selection": [],
  				"value" :[]
  			};
  			for (var i=0;i<1;i++){
  				selected_Element_List["name"].push(this.getAttribute("data-selector"));
  				selected_Element_List["from_selection"].push(this["name"]);
  				selected_Element_List["value"].push(this["value"]);
  			}
  			console.log(selected_Element_List);
  			ajax_Caller.ajax_Send_Input_Forms(selected_Element_List);
  		});
  	},
  	// PART C - INPUT THE ELEMENTS RECEIVED (FROM THE DB)
  	add_Input_Data: function(data){
  		console.log("environment_Creation_Tax.add_Input_Data");
  		var data = data.split(",");
  		//console.log(data);console.log(typeof data);
  		$("select[name="+data[0]+"]").empty();
  		$("select[name="+data[0]+"]").append("<option value=false>Select a value</option>");
  		for(var i=1;i<data.length;i++){
  			$("select[name="+data[0]+"]").append(data[i]); //Check if it would be better to add all of the strings and call append once
  		}
  	}
  };
 //TODO 3rd - Mandatory Information
 var mandatory_Information = {
 	personal_Data_Object: {
 		data_Person_Residence_Country: true,
 		data_Person_Filing_Status: true
 	},
 	economic_Data_Object: {
 		data_Income_Location_Country: true,
 		data_Income_Source: true,
 		data_Income_Size: true
 	},
 	check_For_Details: function(to_check){
 		var mandatory_pairs = _.pairs(mandatory_Information[to_check]);
 		console.log(mandatory_pairs);
 		for(var i=0;i<mandatory_pairs.length;i++){//Change the logical operator
 			if($("select[name="+mandatory_pairs[i][0]+"]")[0] === undefined){
 				if($("input[name="+mandatory_pairs[i][0]+"]")[0].value === undefined || $("input[name="+mandatory_pairs[i][0]+"]")[0].value === ""){
 					custom_Function.warning_Missing_Information(mandatory_pairs[i][0]);
 				    return false;}
 			}else{
 				if($("select[name="+mandatory_pairs[i][0]+"]")[0].value === "false"){
 					custom_Function.warning_Missing_Information(mandatory_pairs[i][0]);
 					return false;	
 				}}
 		}
 		return true;
 	}
 };
 //TODO 4th - Create the Personal Data Object
  var personal_Data_Object = function() {//Set all of the variables:
 	this.data_Person_Residence_Country = custom_Function.get_DOM_Details("data_Person_Residence_Country");
 	this.name_data_Person_Residence_Country = custom_Function.get_Inner_HTML_Details_Option("data_Person_Residence_Country");
 	this.data_Person_Filing_Status = custom_Function.get_DOM_Details("data_Person_Filing_Status");
 	this.name_data_Person_Filing_Status = custom_Function.get_Inner_HTML_Details_Option("data_Person_Filing_Status");
  };
  var personal_Details = function() {
  	var create_Personal_Data_Object = function(){
  		DOCUMENT_SCOPE.personal_Data_Object_Created = new personal_Data_Object();
  		console.log(DOCUMENT_SCOPE.personal_Data_Object_Created);
  		add_to_the_webpage.add_recursive_details_to_the_webpage('#Personal_Details_Show',DOCUMENT_SCOPE.personal_Data_Object_Created);
  	};
  	return {
  		create_Personal_Object: function(){
  			$("input[name=Button_Add_Personal_Details]").click(function(){
  				if(mandatory_Information.check_For_Details(["personal_Data_Object"])){
  					create_Personal_Data_Object(Personal_Details_Data_Show);
  		}});
  		},
  		delete_Personal_Object: function(){
  			$("input[name=Clear_Personal_Details]").click(function(){
  				console.log("#Clear_Personal_Details");
  				$('#Personal_Details_Show').empty();
  				DOCUMENT_SCOPE.personal_Data_Object_Created = undefined;
  			});}
  		};
  	};
  // PART 5 - Create the Economic Data Object
  var economic_Data_Object = function(economic_object_number){
  	this.data_Income_Location_Country = custom_Function.get_DOM_Details("data_Income_Location_Country");
  	this.name_data_Income_Location_Country = custom_Function.get_Inner_HTML_Details_Option("data_Person_Residence_Country");
  	this.data_Income_Source = custom_Function.get_DOM_Details("data_Income_Source");
  	this.name_data_Income_Source = custom_Function.get_Inner_HTML_Details_Option("data_Income_Source");
  	this.data_Income_Size = custom_Function.get_DOM_Details("data_Income_Size");
  	this.name_data_Income_Size = custom_Function.get_DOM_Details("data_Income_Size");
  	this.number_of_Economic_Data_Object = economic_object_number;
  };
  var economic_Details = function(){
  	var create_Economic_Data_Object = function(){
  		var object_number = check_Number_of_Object("economic_data_Object_Created_");
  		var economic_object_number = "economic_data_Object_Created_"+object_number;
  		DOCUMENT_SCOPE[economic_object_number] = new economic_Data_Object(object_number);
  		add_to_the_webpage.add_recursive_details_to_the_webpage('#Income_Details_Show',DOCUMENT_SCOPE[economic_object_number]);
  	    console.log(DOCUMENT_SCOPE[economic_object_number]);
  	};
  	var check_Number_of_Object = function(object_name){
  		for(var i = 1; i < 99; i++){
  			var object_name_searched = object_name+i;
  			if (DOCUMENT_SCOPE[object_name_searched] === undefined){
  				return i;
  			}
  		}
  		custom_Function.warning_Missing_Information("Too many income objects have been created. Number of income objects:"+object_name_searched);
  	};
  	return {
  		create_Economic_Object: function(){
  			$('input[name=Button_Add_Income_Details]').click(function(){
  			if (DOCUMENT_SCOPE.personal_Data_Object_Created === undefined){ 
  				custom_Function.warning_Missing_Information("Personal Details");} 
  			else if(!mandatory_Information.check_For_Details(["economic_Data_Object"])){console.log("The warning is in the Function");}
  			else { create_Economic_Data_Object();}
  			});
  		},
  		delete_Economic_Object: function(){
  			$('body').on('click','input[name="Clear_Income_Details"]',function(){
  				console.log("delete_Economic_Object - body on click");
  				var element_to_be_removed = $(this).attr('class');
  				//console.log(this);console.log(element_to_be_removed);console.log(DOCUMENT_SCOPE[element_to_be_removed]);
  				$('.'+element_to_be_removed).remove();
  				DOCUMENT_SCOPE[element_to_be_removed] = undefined;
  			});
  		}
  };};
  // PART 6A - ADD DETAILS TO THE WEBPAGE (Tax Preparation)
  var add_to_the_webpage = {
  	add_details_to_the_webpage: function(Class_where_to_Display,object,id_of_object){
  		var add_to_the_webpage = '';
  		var extract_arrays_of_objects = _.pairs(object);
  		for (var i = 0;i<extract_arrays_of_objects.length;i++){
  			if(extract_arrays_of_objects[i][0].substring(0,4)==="name"){
  				add_to_the_webpage = add_to_the_webpage + "<div class="+id_of_object+">"+extract_arrays_of_objects[i][0]+": "+extract_arrays_of_objects[i][1]+"</div>";
  			}//console.log(extract_arrays_of_objects[i]);	
  		}
  		$(Class_where_to_Display).append(add_to_the_webpage);	
  	},
  	add_clearing_properties: function(Class_where_to_Display,object,id_of_object){
  		var number_of_income = object["number_of_Economic_Data_Object"];
  		var show_income_number = '<div class='+id_of_object+'>No of Income:'+number_of_income+'</div>';
  		var clearing_button = '<input type="button" name="Clear_Income_Details" class='+id_of_object+' value=Delete:'+number_of_income+'>';
		$(Class_where_to_Display).append(show_income_number+clearing_button);
  	},
  	add_recursive_details_to_the_webpage: function(Class_where_to_Display,object){
  		if(Class_where_to_Display === "#Personal_Details_Show"){
  			$(Class_where_to_Display).empty();
  			add_to_the_webpage.add_details_to_the_webpage(Class_where_to_Display,object,'');
  		}else{
  			//An extra function for income properties
  			var id_of_object = "economic_data_Object_Created_"+object["number_of_Economic_Data_Object"];
  			add_to_the_webpage.add_clearing_properties(Class_where_to_Display,object,id_of_object);
  			add_to_the_webpage.add_details_to_the_webpage(Class_where_to_Display,object,id_of_object);
  		}
  	}
  };
  
  // PART 6B - ADD DETAILS TO THE WEBPAGE (Tax Results)
  var add_results = {
  	add_text_results: function(text_taxes){
  		console.log("You are in add_results.add_text_results");
  		console.log(text_taxes);
  		console.log($("div[name=tax_caclulation_results_text]"));
  		//$("div[name=tax_caclulation_results_text]").empty();
  		$("div[name=tax_caclulation_results_text]").append(text_taxes);
  	}
  };
  // PART 7 - SEND THE DETAILS TO CALCULATE THE TAXES
  var send_Information_To_The_Server = function() {
  	var check_Personal_Details_Object = function(){
  		if (DOCUMENT_SCOPE.personal_Data_Object_Created === undefined){
  			warning_Have_Not_Created(" create a Personal Object");
  			return false;
  		}else{
  			return true;
  		}
  	};
  	var check_Economic_Object = function(){
  		for(var i = 0;i < 99; i++){
  			if(DOCUMENT_SCOPE["economic_data_Object_Created_"+i] !== undefined){
  				return true;
  			}
  			warning_Have_Not_Created(" in put your income");
  			return false;
  		}
  	};
  	var add_All_Objects = function(){
  		var all_of_data = {
  			"personal_data_object":[]
  		};
  		all_of_data["personal_data_object"]=DOCUMENT_SCOPE.personal_Data_Object_Created;
  		for(var i = 0;i<99;i++){
  			if(DOCUMENT_SCOPE["economic_data_Object_Created_"+i] !== undefined){
  				all_of_data["economic_data_Object_Created_"+i] = DOCUMENT_SCOPE["economic_data_Object_Created_"+i];
  			}
  		}
  		return all_of_data;
  	};
  	return{
  		send_tax_information: function(){
  			$('input[name="Button_Calculate_Taxes"]').click(function(){
	  			if(check_Personal_Details_Object && check_Economic_Object){
	  				console.log(add_All_Objects());
	  				$("div[name=tax_caclulation_results_text]").empty();//This is to remove the previous calculated taxes
	  				ajax_Caller.ajax_Send_Personal_Economical_Info(add_All_Objects());
	  			}
  		});
  	}};
  };
  // PART 8 - GRAPHING TOOL
  
  var graph = {
  	draw : function (data) {
		var data = [1,2,3,4,5];
		console.log("Called draw data");
	    var color = d3.scale.category20b();
	    var width = 420,
	        barHeight = 20;
	 
	    var x = d3.scale.linear()
	        .range([0, width])
	        .domain([0, d3.max(data)]);
	 
	    var chart = d3.select("#graph")
	        .attr("width", width)
	        .attr("height", barHeight * data.length);
	 
	    var bar = chart.selectAll("g")
	        .data(data)
	        .enter().append("g")
	        .attr("transform", function (d, i) {
	                  return "translate(0," + i * barHeight + ")";
	              });
	 
	    bar.append("rect")
	        .attr("width", x)
	        .attr("height", barHeight - 1)
	        .style("fill", function (d) {
	                   return color(d);
	              });
	 
	    bar.append("text")
	        .attr("x", function (d) {
	                  return x(d) - 10;
	              })
	        .attr("y", barHeight / 2)
	        .attr("dy", ".35em")
	        .style("fill", "white")
	        .text(function (d) {
	                  return d;
	              });
	},
	draw2: function() {
		console.log("You are in the draw2 function");
		var data_original = [{
			"income":1000,
			"tax": 100,
			"percentage":10
		},{
			"income":2000,
			"tax": 300,
			"percentage":15
		}];
		// Added up the previous values
		var data = [{
			"income":0,
			"tax":0,
			"percentage_average":13.33,
			"percentage_per_income":0
		},{
			"income":1000,
			"tax": 100,
			"percentage_average":13.33,
			"percentage_per_income":10
		},{
			"income":3000,
			"tax": 400,
			"percentage_average":13.33,
			"percentage_per_income":15
		}];
		
		//Create the actual graph itself
		var svg = d3.select("#graph2"), 
			width = 350,
			height = 350,
			margins = {
				top: 20,
				bottom: 20,
				right: 20,
				left: 50
			};
		
		//I will have to made domain dynamic (Equal to the maximum that was earned by the person = x and y = taxes paid)
		var xScale = d3.scale.linear().range([margins.left, width - margins.right]).domain([0,3000]),
			y1Scale = d3.scale.linear().range([height - margins.top, margins.bottom]).domain([0,400]),
			y2Scale = d3.scale.linear().range([height - margins.top, margins.bottom]).domain([0,20]);
			
		var	xAxis = d3.svg.axis().scale(xScale),
			yAxisLeft = d3.svg.axis().scale(y1Scale).orient("left"),
			yAxisRight = d3.svg.axis().scale(y2Scale).orient("right");
		
		//Add the x-axis -> translate puts it lower by 320px	
		svg.append("svg:g")
		   .attr("transform","translate(0,"+(height - margins.bottom)+")")
		   .call(xAxis);
		//Add the 2 y-axis
		svg.append("svg:g")
		   .attr("transform", "translate("+(margins.left-5)+",0)")
		   .call(yAxisLeft);
		
		svg.append("svg:g")
		   .attr("transform", "translate("+(width-margins.right+5)+",0)")
		   .call(yAxisRight);
		
		//Create the lines
		var lineGen = d3.svg.line()
			.x(function(d) {
				return xScale(d.income);
			})
			.y(function(d) {
				return y1Scale(d.tax);
			});
			
		var lineGen_average = d3.svg.line()
			.x(function(d) {
				return xScale(d.income);
			})
			.y(function(d){
				return y2Scale(d.percentage_average);
			});
		
		var lineGen_per_income = d3.svg.line()
			.x(function(d) {
				return xScale(d.income);
			})
			.y(function(d){
				return y2Scale(d.percentage_per_income);
			});	
			
		//Add the D3 lines
		svg.append("svg:path")
		   .attr("d",lineGen(data))
		   .attr("stroke","green")
		   .attr("stroke-width",2)
		   .attr("fill","none");
		
		svg.append("svg:path")
		   .attr("d",lineGen_average(data))
		   .attr("stroke","red")
		   .attr("stroke-width",2)
		   .style("stroke-dasharray",("3,3"))
		   .attr("fill","none");
		
		svg.append("svg:path")
		   .attr("d",lineGen_per_income(data))
		   .attr("stroke","blue")
		   .attr("stroke-width",2)
		   .style("stroke-dasharray",("3,3"))
		   .attr("fill","none");   
		   
		   //This doesn't work -> Change it
		svg.selectAll("circle")
		   .data(function (d) {return d;})
		   .enter().append("circle")
		   .attr("cx",function (d) {return xScale(d.income);})
		   .attr("cy",function (d) {return yScale(d.tax);})
		   .attr("r",3);
		   
	}
	};
  // PART 9 - AJAX CALLER
  var ajax_Caller = {
  	ajax_Send_Input_Forms: function (selected_Element_List) {
  		$.ajax({
  			type: 'POST',
  			//Change in the production environment
  			url:  url_of_the_website+'home/send_Input_Data',
  			data: selected_Element_List,
  			dataType: "text", //See if it works with other datatypes
  			success: function(data) {
  				if(data){
  				  environment_Creation_Tax.add_Input_Data(data);
  				}//This is so that null values don't throw an exception
  			},
  			error: function(jqXHR, exception, errorThrown){
  				console.log(jqXHR);console.log(exception);
  				console.log(errorThrown);
  			}
  		});
  	},
  	ajax_Send_Personal_Economical_Info: function(all_inputed_info){
  		//Stopped here
  		$.ajax({
  			type: 'POST',
  			url: url_of_the_website+'home/send_All_Info',
  			data: all_inputed_info,
  			dataType: "text",
  			success: function(taxes) {
  				if(taxes){
  					add_results.add_text_results(taxes);
  					console.log("stopped here");
  					ajax_Caller.ajax_graphing_tool();
  				}
  			},
  			error:function(jqXHR, exception, errorThrown){
  				console.log(jqXHR); console.log(exception);
  				console.log(errorThrown);
  			}
  		});
  	}/*,
  	ajax_graphing_tool: function(){
	  	$.ajax({
	           type: "GET",
	           contentType: "application/json; charset=utf-8",
	           url: url_of_the_website+'home/data',
	           dataType: 'json',
	           success: function (data) {
	           	   console.log(data);
	               graph.draw(data);
	               graph.draw2();
	           },
	           error: function (result) {
	               console.log(result);
	           }
	       });
  }*/};
  // PART 8 - CODE EXECUTER
  // TODO - Execution of the functions
  //Part 2 - A (Mass data addition)
  environment_Creation_Tax.information_Fetcher();
  //Part 2 - B (Single data addition)
  environment_Creation_Tax.information_Fetcher_Single();
  //Part 4 - Create the Personal Data Object and Part 6 - Add to the webpage
  personal_Details().create_Personal_Object();
  //Part 6 - Clear the Webpage details and the Personal Data Object
  personal_Details().delete_Personal_Object();
  // Part 5 - Create the Economic Data Object
  economic_Details().create_Economic_Object();
  // Part 6 - Delete the Economic Data Object
  economic_Details().delete_Economic_Object();
  // Part 7 - Send all of the information
  send_Information_To_The_Server().send_tax_information();
  // Test
  ajax_Caller.ajax_graphing_tool();
});
})(jQuery, window);
