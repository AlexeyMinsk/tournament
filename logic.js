"use strict";

class Tournament{
	
	constructor(list){
		this.list = list;
		this.objList = {};
		this.freeze = false;
	}
	
	initTournament(){
		
		this.objList = this.randomizator(this.list);
		this.list = this.sortArr(this.objList);
		this.arrayToTable(this.list);
		
		document.body.addEventListener('click', addPointer);
		document.body.addEventListener('keydown', event =>{
			
			if(event.key == 'Escape'){
					let textarea = document.querySelector('.group textarea');
					textarea.parentNode.removeChild(textarea);
					document.body.addEventListener('click', addPointer);
			}
		});
		
		function addPointer(event){
			
			let targer = event.target;

			if(targer.tagName != 'TD' || targer.dataset.total || targer.classList.contains('void') )
				return;
			

			let textarea = document.createElement('textarea');
			textarea.classList.add('redact');
			document.body.removeEventListener('click', addPointer);
			targer.appendChild(textarea);
			textarea.focus();
			textarea.addEventListener('keydown', textareaKeyDown);
			
			function textareaKeyDown(event){
				
				if(event.key == 'Enter'){
					document.body.addEventListener('click', addPointer);
					let tr = event.target.parentNode.closest('tr');
					let value = event.target.value;
					if( value == 0 || value == 1 || value == 2)	{
						event.target.parentNode.textContent = value;
						tr.lastChild.textContent = sumPoints(tr);
					}else{
						let textarea = document.querySelector('.group textarea');
						textarea.parentNode.removeChild(textarea);
					}
				}else
					return;
			}
			
			function sumPoints(tr){
				
				let sum = 0;

				for(let i = 1; i < tr.childNodes.length-1; i++){
					
					if(tr.childNodes[i].textContent != '')
						sum += +tr.childNodes[i].textContent;
				}
				return sum;
			}
		}
	}
	
	randomizator(arr){
	
		let obj = {};
	
		arr.forEach( (player) => {
			obj[player] = Math.random();
		});
	
		return obj;
	}

	sortArr(obj){
	
		let arr = [];
	
		for(let key in obj){
		
			arr.push(key);
		}
		arr.sort( (a, b) => {

			if (obj[a] > obj[b]) return 1;
			if (obj[a] < obj[b]) return -1;
		});
	return arr;
}

	printTable(arr, tableName){
		
		let table = document.createElement('table');
		let caption = document.createElement('caption');
		caption.textContent = tableName;
		table.appendChild(caption);
		table.classList.add('group');
		document.body.appendChild(table);
		
		for(let n = 0; n <= arr.length; n++){

			let tr = document.createElement('tr');
			table.appendChild(tr);
			
			if(n)
				tr.dataset.id = arr[n-1];
			
			for(let m = 0; m <= arr.length; m++){
			
				if(!n || !m){
					var cell = document.createElement('th');
				}else{
					var cell = document.createElement('td');
				}
			
				if(n == 0 && m == 0) {
					tr.appendChild(cell);
				}else if(n == 0 && m != 0) {
					cell.textContent = arr[m-1];
						tr.appendChild(cell);
				}else if(n != 0 && m == 0){
					cell.textContent = arr[n-1];
					tr.appendChild(cell);
				}else{
					tr.appendChild(cell);
				}
			
				if(n == m) {
					cell.classList.add('void');
				}
		}
		
		let total = document.createElement('td');
		total.dataset.total = 'total';
		tr.appendChild(total);
		if(!n)
			total.textContent = 'Баллы';
	}	
}

	arrayToTable(list){
	
		let group = ['Группа A', 'Группа B', 'Группа C', 'Группа D'];
		while(list.length){
		
			let tempList = [];
		
			for(let i = 0; i < 5 && list.length; i++){
				tempList.push(list.shift());
			}
			this.printTable(tempList, group.shift() );
		}
	}
}

let players = ['Лёша', 'Паша', 'Сударь', 'Нытик', 'Сергей', 'Антон', 'Машина', 'Максим', 'Дирик', 'Денис'];

let game = new Tournament(players);
game.initTournament();