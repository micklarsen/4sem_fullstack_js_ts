function makeFunc(){
  var name = "Mozilla";

  function logName(){
    console.log(name);
  }
  function changeName(n){
    name = n;
  }
  return{
    logName,
    changeName
  };
}

var obj = makeFunc();
obj.logName(); //Outputs the variable that's in scope when the function was made
obj.changeName("Chrome");
obj.logName();



//Closures er et specielt objekt som inkluderer en funktion OG miljøet som som funktionen blev lavet i
//Det betyder, at variable som var i funktionens scope da den blev lavet, gemmes