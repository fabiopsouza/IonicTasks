function getTasks(){
	this.items = [];

	var list = localStorage.getItem('taskList');

	if(list !== null)
		this.items = angular.fromJson(list);

	this.save = function(){
		var list = angular.toJson(this.items);
		localStorage.setItem('taskList', list);
	}

	this.add = function(item){
		this.items.push(item);
	}

	this.remove = function(item){
		var position = this.items.indexOf(item);
		this.items.splice(position, 1);
	}
}