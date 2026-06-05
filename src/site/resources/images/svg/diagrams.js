/*
 * Licensed to the Apache Software Foundation (ASF) under one or more
 * contributor license agreements.  See the NOTICE file distributed with
 * this work for additional information regarding copyright ownership.
 * The ASF licenses this file to You under the Apache License, Version 2.0
 * (the "License"); you may not use this file except in compliance with
 * the License.  You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
 

var textHeight = 10;
var padding = 10;
var namespace = "http://www.w3.org/2000/svg";

var displayAttributes = true;
var displayMethods = true;
var displayNotes = true;

var validationErrors = [];

function validateParams() {
	validationErrors = [];
	var params = getUrlParams();
	var validParams = ['attributes', 'methods', 'notes'];
	var validBooleanValues = ['true', 'false', '1', '0', 'yes', 'no'];
	
	for (var key in params) {
		if (!validParams.includes(key)) {
			validationErrors.push('未知参数: ' + key);
		} else {
			var value = params[key];
			if (!validBooleanValues.includes(value.toLowerCase())) {
				validationErrors.push('参数 ' + key + ' 的值无效: ' + value + '，应为 boolean 值');
			}
		}
	}
	
	return validationErrors.length === 0;
}

function getUrlParams() {
	var params = {};
	var queryString = window.location.search.substring(1);
	var pairs = queryString.split('&');
	
	for (var i = 0; i < pairs.length; i++) {
		var pair = pairs[i].split('=');
		if (pair[0]) {
			params[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || '');
		}
	}
	
	return params;
}

function parseBoolean(value) {
	if (typeof value === 'undefined') return true;
	var lowerValue = String(value).toLowerCase();
	return lowerValue === 'true' || lowerValue === '1' || lowerValue === 'yes';
}

function applyParams() {
	var params = getUrlParams();
	if (params.attributes !== undefined) {
		displayAttributes = parseBoolean(params.attributes);
	}
	if (params.methods !== undefined) {
		displayMethods = parseBoolean(params.methods);
	}
	if (params.notes !== undefined) {
		displayNotes = parseBoolean(params.notes);
	}
}

function displayValidationErrors() {
	if (validationErrors.length === 0) return;
	
	var svg = document.querySelector('svg');
	if (!svg) return;
	
	var errorGroup = document.createElementNS(namespace, 'g');
	errorGroup.setAttribute('class', 'validation-errors');
	
	var bgWidth = 400;
	var bgHeight = 50 + validationErrors.length * 20;
	
	var bg = document.createElementNS(namespace, 'rect');
	bg.setAttribute('x', '50');
	bg.setAttribute('y', '50');
	bg.setAttribute('width', bgWidth);
	bg.setAttribute('height', bgHeight);
	bg.setAttribute('fill', '#ffcccc');
	bg.setAttribute('stroke', '#cc0000');
	bg.setAttribute('stroke-width', '2');
	errorGroup.appendChild(bg);
	
	var title = document.createElementNS(namespace, 'text');
	title.setAttribute('x', '70');
	title.setAttribute('y', '80');
	title.setAttribute('class', 'error-title');
	title.setAttribute('font-weight', 'bold');
	title.setAttribute('fill', '#cc0000');
	title.appendChild(document.createTextNode('参数验证错误:'));
	errorGroup.appendChild(title);
	
	for (var i = 0; i < validationErrors.length; i++) {
		var errorText = document.createElementNS(namespace, 'text');
		errorText.setAttribute('x', '70');
		errorText.setAttribute('y', 105 + i * 20);
		errorText.setAttribute('class', 'error-text');
		errorText.setAttribute('fill', '#660000');
		errorText.appendChild(document.createTextNode('- ' + validationErrors[i]));
		errorGroup.appendChild(errorText);
	}
	
	svg.insertBefore(errorGroup, svg.firstChild);
}

function init() {
	if (!validateParams()) {
		displayValidationErrors();
	}
	applyParams();
}

if (document.readyState === 'loading') {
	document.addEventListener('DOMContentLoaded', init);
} else {
	init();
}

function Type(name){
	this.width = 160;
	this.style = "type";
	
	this.insert = function(evt){
		y = 0;
		y = this.insertOutline(evt,y);
		y = this.insertName(evt,y);
		if(displayAttributes==true){
			y = this.insertAttributes(evt,y);
		}
		if(displayMethods==true){
			y = this.insertMethods(evt,y);
		}
		if(displayNotes==true){
			y = this.insertNotes(evt,y);
		}
	}
	
	this.height = function(){
		height = 0;
		height += this.heightName();
		if(displayAttributes==true){
			height += this.heightAttributes();
		}
		if(displayMethods==true){
			height += this.heightMethods();
		}
		return height;
	}
	
	
	
	
	
	
	this.insertOutline = function(evt,y){

		style = evt.target.getAttributeNS(null, "class");
		evt.target.setAttributeNS(null,"class",style+" "+this.style);

		e = document.createElementNS(namespace, "rect");
		e.setAttributeNS(null, "x", 0);
		e.setAttributeNS(null, "y", 0);
		e.setAttributeNS(null, "width",  this.width);
		e.setAttributeNS(null, "height", this.height());
        	e.setAttributeNS(null, "class", "outline");
        	evt.target.appendChild(e);

		return y;
	}
	
	
	
	
	
	
	
	this.name = name;
	
	this.heightName = function(){
		return padding * 2 + textHeight;
	}
	
	this.insertName = function(evt,y){
	
		y += padding;
		y += textHeight;
		
		e = document.createElementNS(namespace, "text");
		e.setAttributeNS(null, "x", this.width/2);
		e.setAttributeNS(null, "y", y);
		e.setAttributeNS(null, "class", "title");
		e.appendChild(document.createTextNode(this.name));
		evt.target.appendChild(e);
        
		y += padding;
	
		return y;
	}
	
	
	
	
	
	
	
	this.attributeList = new Array();
	this.attributeCount = 0;
	
	this.addAttribute = function(text){
		this.attributeList[this.attributeCount++]=text;
	}
	
	this.heightAttributes = function(){
		if(this.attributeCount>0){
			return padding * 2 + this.attributeCount*textHeight;
		}
		else{
			return padding;
		}
	}
	
	this.insertAttributes = function(evt,y){
	
		e = document.createElementNS(namespace, "line");
		e.setAttributeNS(null, "x1", 0);
		e.setAttributeNS(null, "y1", y);
		e.setAttributeNS(null, "x2", this.width);
		e.setAttributeNS(null, "y2", y);
		e.setAttributeNS(null, "class", "divider");
		evt.target.appendChild(e);
		
		y += padding;
		
		for(i=0;i<this.attributeCount;++i){
			y += textHeight;
			
			e = document.createElementNS(namespace, "text");
			e.setAttributeNS(null, "x", padding);
			e.setAttributeNS(null, "y", y);
			e.setAttributeNS(null, "class", "attribute");
			e.appendChild(document.createTextNode(this.attributeList[i]));
			evt.target.appendChild(e);
		}
		
		if(this.attributeCount>0){
			y += padding;
		}
	
		return y;
	}
	
	
	
	
	
	this.methodList = new Array();
	this.methodCount = 0;
	
	this.addMethod = function(text){
		this.methodList[this.methodCount++]=text;
	}
	
	this.heightMethods = function(){
		if(this.methodCount>0){
			return padding * 2 + this.methodCount*textHeight;
		}
		else{
			return padding;
		}
	}
	
	this.insertMethods = function(evt,y){
	
		e = document.createElementNS(namespace, "line");
		e.setAttributeNS(null, "x1", 0);
		e.setAttributeNS(null, "y1", y);
		e.setAttributeNS(null, "x2", this.width);
		e.setAttributeNS(null, "y2", y);
		e.setAttributeNS(null, "class", "divider");
		evt.target.appendChild(e);
		
		y += padding;
		
		for(i=0;i<this.methodCount;++i){
			y += textHeight;
			
			e = document.createElementNS(namespace, "text");
			e.setAttributeNS(null, "x", padding);
			e.setAttributeNS(null, "y", y);
			e.setAttributeNS(null, "class", "method");
			e.appendChild(document.createTextNode(this.methodList[i]));
			evt.target.appendChild(e);
		}
		
		if(this.methodCount>0){
			y += padding;
		}
	
		return y;
	}
	
	
	
	
	
	this.noteList = new Array();
	this.noteCount = 0;
	
	this.addNote = function(text){
		this.noteList[this.noteCount++]=text;
	}
	
	this.insertNotes = function(evt,y){
		if(this.noteCount>0){
			joinTop = y;
		
			y += padding;
			
			e = document.createElementNS(namespace, "line");
			e.setAttributeNS(null, "x1", this.width/2-padding*2);
			e.setAttributeNS(null, "y1", y);
			e.setAttributeNS(null, "x2", this.width/2+padding*2);
			e.setAttributeNS(null, "y2", joinTop);
			e.setAttributeNS(null, "class", "note connect");
			evt.target.appendChild(e);
			
			
			
			height = this.heightNotes();
			
			e = document.createElementNS(namespace, "polygon");
			e.setAttributeNS(null, "points", "0,"+(y+padding)+" 0,"+(y+height)+" "+this.width+","+(y+height)+" "+this.width+","+y+" "+padding+","+y);
			e.setAttributeNS(null, "class", "note");
			evt.target.appendChild(e);
			
			e = document.createElementNS(namespace, "polygon");
			e.setAttributeNS(null, "points", ""+padding+","+y+" 0,"+(y+padding)+" "+padding+","+(y+padding));
			e.setAttributeNS(null, "class", "note corner");
			evt.target.appendChild(e);
			
			y += padding;
			
		
			for(i=0;i<this.noteCount;++i){
				y += textHeight;

				e = document.createElementNS(namespace, "text");
				e.setAttributeNS(null, "x", padding);
				e.setAttributeNS(null, "y", y);
				e.setAttributeNS(null, "class", "note");
				e.appendChild(document.createTextNode(this.noteList[i]));
				evt.target.appendChild(e);
			}
		}
	}
	
	this.heightNotes = function(){
		if(this.noteCount>0){
			return padding*2 + this.noteCount*textHeight;
		}
	}
}

function Interface(name){
	this.superclass = Type;
	this.superclass(name);
	delete this.superclass; 
	this.rounded = true;
	
	this.insertOutline = function(evt,y){

		style = evt.target.getAttributeNS(null, "class");
		evt.target.setAttributeNS(null,"class",style+" "+this.style);

		e = document.createElementNS(namespace, "rect");
		e.setAttributeNS(null, "x", 0);
		e.setAttributeNS(null, "y", 0);
		e.setAttributeNS(null, "width",  this.width);
		e.setAttributeNS(null, "height", this.height());
		e.setAttributeNS(null, "rx", padding*1.5);
		e.setAttributeNS(null, "ry", padding*1.5);
        	e.setAttributeNS(null, "class", "outline");
		evt.target.appendChild(e);

		return y;
	}
	
	this.heightAttributes = function(){
		return 0;
	}
	
	this.insertAttributes = function(evt,y){
		return y;
	}
	
}
Interface.prototype = new Type;

function Class(name){
	this.superclass = Type;
	this.superclass(name);
	delete this.superclass; 
	this.rounded = false;
}
Class.prototype = new Type;




function PackageSymbol(name,width,height){
	this.name = name;
	this.nameWidth = 150;
	this.width = width;
	this.height = height;
	
	this.insert = function(evt){
		
		style = evt.target.getAttributeNS(null, "class");
		evt.target.setAttributeNS(null,"class",style+" package");
		
		first = evt.target.getFirstChild();
		
		e = document.createElementNS(namespace, "rect");
		e.setAttributeNS(null, "x", 0);
		e.setAttributeNS(null, "y", 0);
		e.setAttributeNS(null, "width", this.nameWidth);
		e.setAttributeNS(null, "height", textHeight+padding);
		e.setAttributeNS(null, "class", "outline");
		e.appendChild(document.createTextNode(this.name));
		evt.target.insertBefore(e,first);
		
		e = document.createElementNS(namespace, "text");
		e.setAttributeNS(null, "x", this.nameWidth/2);
		e.setAttributeNS(null, "y", textHeight+padding/2);
		e.setAttributeNS(null, "class", "title");
		e.appendChild(document.createTextNode(this.name));
		evt.target.insertBefore(e,first);
		
		e = document.createElementNS(namespace, "rect");
		e.setAttributeNS(null, "x", 0);
		e.setAttributeNS(null, "y", textHeight+padding);
		e.setAttributeNS(null, "width", this.width);
		e.setAttributeNS(null, "height", this.height-textHeight-padding);
		e.setAttributeNS(null, "class", "outline");
		e.appendChild(document.createTextNode(this.name));
		evt.target.insertBefore(e,first);
		
		e = document.createElementNS(namespace, "rect");
		e.setAttributeNS(null, "x", padding);
		e.setAttributeNS(null, "y", textHeight+padding*2);
		e.setAttributeNS(null, "width", this.width-padding*2);
		e.setAttributeNS(null, "height", this.height-textHeight-padding*3);
		e.setAttributeNS(null, "class", "inner");
		e.appendChild(document.createTextNode(this.name));
		evt.target.insertBefore(e,first);
		
		
	}
}

