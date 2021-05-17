let jsondata; //global variable to hold jsondata   

fetch('./data/player-stats.json').then( 
	function(resp){ return resp.json();} //fetch json file and recieve response. Returns response as a json. 
  ).then(
	function(json){
	  jsondata = json; //initialise global variable with json data array
	  myFunction(json) //call myFunction and pass global jsondata varialble
	}
  )

  function myFunction(json)
  {
	  jsondata = json 
	  console.log(json) // this line and the line above are for testing purposes to ensure I have retrieved and aceess the json array correctly

	  //the 4 lines of code below simply create a select tag to store of player options and will append to the div with the id "Select-Container"
	  var NameDropDown = document.createElement('select');
	  NameDropDown.setAttribute('id', 'ListOfPlayer');
	  NameDropDown.setAttribute('onchange', "ViewPlayer()" ) //every time an option is selected, it will call the method "ViewPlayer"
	  document.getElementById("Select-Container").appendChild(NameDropDown);

	  //the 4 lines of code add a defualt option telling user to select an option
	  var defaultOption = document.createElement('option');
	  defaultOption.textContent = "Select an option...";
	  defaultOption.setAttribute('id', "default")
	  document.getElementById("ListOfPlayer").appendChild(defaultOption);

	  //the 4 lines below (the for-loop) adds all the players to the options, for as many players as the json array contains.
	  //it uses the loop counter to access and apply the players first and lastion name as an option. 
	  //an unique id name is given to create sepearate options as well as a value (which is the position of the player index in the array) is given for future use.
	  for(var i = 0; i < jsondata.players.length; i++)
	  {
		var EachPlayerName = document.createElement('option');
		EachPlayerName.textContent = jsondata.players[i].player.name.first + " " + jsondata.players[i].player.name.last;
		EachPlayerName.setAttribute('id', jsondata.players[i].player.name.first + jsondata.players[i].player.name.last)
		EachPlayerName.setAttribute('value', [i])
		document.getElementById("ListOfPlayer").appendChild(EachPlayerName);            
	  }

	  //in the next 2 lines I stored the dropdown list of players in a variable so that I can then get the selected option, and its value
	  //so that I know the position of a player in the array
	  var player_drop_down = document.getElementById("ListOfPlayer");
	  var array_index_of_player = player_drop_down.options[player_drop_down.selectedIndex].value
  }

  //the Clear() function simply removes all pre-population elements to prevent multiple players attributes from overlapping and appending further down.
  function Clear()
  {
	var statBoxObject = document.getElementById("statBox")
	statBoxObject.remove();

	var playerImageDiv = document.getElementById("Image-Container")
	playerImageDiv.remove();

	var name = document.getElementById("name")
	name.remove();

	var position = document.getElementById("position")
	position.remove();

	var defaultOption = document.getElementById("default")
	defaultOption.style.display = "none"; // I hide the first default option after the user picks another player. Prevents me from recreating as I want to reuse it.

	var sprite = document.getElementById("sprite")
	sprite.remove();
  }

  //the function below simple checks club of the selected player (by accessing the array storing the json data) from the list and 
  //sets the X and Y position of the club logo in the sprite asset which is then later used inline into the css to display the club logo
  function clubLogoCheck()
  {
	var X_Position 
	var Y_Position

	var player_drop_down = document.getElementById("ListOfPlayer");
	var selected_player = player_drop_down.options[player_drop_down.selectedIndex].innerHTML;
	var array_index_of_player = player_drop_down.options[player_drop_down.selectedIndex].value

	if(jsondata.players[array_index_of_player].player.currentTeam.name == "Tottenham Hotspur")
	{
	  X_Position = -500 
	  Y_Position = 100 
	}
	else if(jsondata.players[array_index_of_player].player.currentTeam.name == "Leicester City")
	{
	  X_Position = 0 
	  Y_Position = 0 
	}
	else if(jsondata.players[array_index_of_player].player.currentTeam.name =="Arsenal")
	{
	  X_Position = -100 
	  Y_Position = -100 
	}
	else if(jsondata.players[array_index_of_player].player.currentTeam.name == "Manchester United")
	{
	  X_Position = -600 
	  Y_Position = 300 
	}
	else 
	{
	  X_Position = -800 
	  Y_Position = 400 
	}

	//the 4 lines below simply creates a div along with inline css to display the club logo.
	var sprite = document.createElement('div');
	sprite.setAttribute('id', 'sprite');
	sprite.setAttribute('style', 'background: url("/assets/badges_sprite.png")' + X_Position+'px' + " " + Y_Position+'px; height: 100px; width: 100px; border: 5px solid white; border-radius: 100px; float: right; margin-top: -60px; margin-right: 20px;');
	document.getElementById("statBox-Container").appendChild(sprite); 
  }

  //The function below is where all the data population for the each player happens upon selection.
  function ViewPlayer()
  {    
	Clear() //I call the Clear() function to clear any pre-population data
	clubLogoCheck() //I call the clubLogoCheck() fucntion to check the club of the player to set the logo accordingly
	var player_drop_down = document.getElementById("ListOfPlayer");
	var selected_player = player_drop_down.options[player_drop_down.selectedIndex].innerHTML;
	var array_index_of_player = player_drop_down.options[player_drop_down.selectedIndex].value
	
	//the 3 lines below create a div to house all the players stats  
	var statInformation = document.createElement('div');
	statInformation.setAttribute('id', 'statBox');
	document.getElementById("bottomDiv").appendChild(statInformation);

	//the 4 lines below create an image-container div to house the image of the selected player
	var image = document.createElement('img');
	image.setAttribute('id', 'Image-Container');
	image.setAttribute('src', './assets/' +  jsondata.players[array_index_of_player].player.name.first + " " + jsondata.players[array_index_of_player].player.name.last + '.png');
	document.getElementById("topDiv").appendChild(image);

	//the 4 lines below create a name tag to display the name of the selected player
	var name = document.createElement('p');
	name.setAttribute('id', 'name');
	name.textContent = jsondata.players[array_index_of_player].player.name.first + " " + jsondata.players[array_index_of_player].player.name.last;
	document.getElementById("statBox-Container").appendChild(name);

	//the 4 lines below create a position tag to display the position of the selected player
	var name = document.createElement('p');
	name.setAttribute('id', 'position');
	name.textContent = jsondata.players[array_index_of_player].player.info.positionInfo;
	document.getElementById("statBox-Container").appendChild(name);

	//the for-loop below simply creates 2 divs, one to contain the name of each stat, and another to contain the value of the stat of the selected player
	//the loop will run for however many stat the player has. The div containing the value is nested within the div containing the stat name
	//so that it enables me to aling the value to the right and have it sit inline with the name of the stat.

	for(var i = 0; i < jsondata.players[array_index_of_player].stats.length; i++)
	{
	  var statInformation = document.createElement('div');
	  statInformation.textContent = jsondata.players[array_index_of_player].stats[i].name
	  statInformation.setAttribute('id', 'Stat_Attribute' + [i]);
	  statInformation.setAttribute('class', 'Stat_Attribute');
	  document.getElementById("statBox").appendChild(statInformation);  

	  var statValue = document.createElement('div');
	  statValue.textContent = jsondata.players[array_index_of_player].stats[i].value
	  statValue.setAttribute('id', 'Stat_Value' + [i]);
	  statValue.setAttribute('class', 'Stat_Value');
	  document.getElementById("Stat_Attribute"+[i]).appendChild(statValue);
	}
  }
