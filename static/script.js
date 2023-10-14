// Get the button element by its id
const myButton = document.getElementById('btn');

// Add a click event listener to the button
myButton.addEventListener('click', function() {
  // Perform an action when the button is clicked
  window.open('https://github.com/', '_blank');
});

function clearErrors(){
  errors = document.getElementsByClassName('formerror');

  for (let item of errors){
    item.innerHTML = "";

  }

}

function seterror( id,error){
  element = document.getElementById(id);
  element.getElementByClassName('formerror')[0].innerHTML=error;
}

function validateform(){
  var returnval = true;
  clearErrors();


  var name = document.forms['myForm']['Sname'].value;
  if (name.length<5){
    seterror("name", "*Length of name is too short");
    returnval = false;
}
return returnval;
}

