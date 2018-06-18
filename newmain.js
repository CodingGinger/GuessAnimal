var counter;
var rjson;
var current_answer;
var animaladded;
var placeholder;
var newanimal;
var newquestion;
var guessasked = false;
var oldText;

function newinput (animal, yes, no) {
    this.a = animal;
    this.yes = yes;
    this.no = no;
};

var json = new newinput('Does it Pure?', new newinput('Does it have puffs?', new newinput('Lynx', undefined, undefined ), new newinput('Cat', undefined, undefined ) ), new newinput('Dog', undefined, undefined )); // template json array of object

function lstoragewrite() //write to localStorage
{
    localStorage.setItem('json', JSON.stringify(json));
    //alert('Written');
}

function lstorageparse()//Get localStorage and parse it
{
  rjson = localStorage.getItem('json')
  json = JSON.parse(rjson)
}

function removelocalStorage()// wipe localStorage not used
{
  localStorage.removeItem('json');
  document.getElementsByTagName("p")[0].innerHTML = '<p class="bot-text" align="right">' + 'localStorage wiped' + '</p>';
}

function botPost(argv, argz, argx)
{
  function checklocalstorage()
  {
    if (localStorage.getItem('json') === null)
    {
      lstoragewrite();
    }
    else
    {
      lstorageparse();
    }
  };
  if (argv === undefined)
  {
    document.getElementsByTagName("p")[0].innerHTML = '<p class="bot-text" align="right">' + json.a + '</p>';
    checklocalstorage();
    placeholder = json;
  }
  else
  {
    if (placeholder.yes === undefined)
    {
      document.getElementsByTagName("p")[0].innerHTML = '<p class="bot-text" align="right">' + ' Is it a ' + argv + '?' + '</p>' + argz;
    }
    else
    {
    document.getElementsByTagName("p")[0].innerHTML = '<p class="bot-text" align="right">' + argv + '</p>' + argz;
    }
  }
}

function guessAnimal()
{
  guessasked = true;
  if (current_answer === 'yes' || current_answer === 'yes')
  {
    document.getElementsByTagName("p")[0].innerHTML = '<p class="bot-text" align="right">' + 'Yes i guess right' + '</p>';
  }
  else
  {
    document.getElementsByTagName("p")[0].innerHTML = '<p class="bot-text" align="right">' + 'What animal did you think of?' + '</p>';
  }
}

function addAnimal(argv)
{
  function add()
  {
    placeholder.yes = new newinput(newanimal, undefined, undefined);
    placeholder.no  = new newinput(placeholder.a, undefined, undefined);
    placeholder.a = newquestion;
    lstoragewrite();
    lstorageparse();
  }
  function trim(s)
  {
    return s.replace(/^\s*|\s*$/g,"");
  }
  var regex = /\s+/gi;
  if (current_answer.trim().replace(regex, ' ').split(' ').length > 1)
  {
    newquestion = current_answer;
    add();
  }
  else
  {
    newanimal = current_answer;
    document.getElementsByTagName("p")[0].innerHTML = '<p class="bot-text" align="right">' + 'Enter a question that distinguish between ' + newanimal + ' and ' + placeholder.a + '</p>';
  }

}

function post()
{

      var newtext = document.getElementById('input1').value; // gets new input form input form
      current_answer = document.getElementById('input1').value; // keeps track of player last current_answer
      oldText = document.getElementById('window1').innerHTML; // gets old tect formated an everything
      //document.getElementsByTagName("p")[0].innerHTML = '<p class="text" align="right">' + current_answer + '</p>' + oldText;
      switch (newtext)
         {
        case 'yes':
               if (guessasked === true)
               {
                 document.getElementsByTagName("p")[0].innerHTML = '<p class="bot-text" align="right">' + 'Yes i guess right' + '</p>';
               }
               else
               {
                 if(placeholder.yes === undefined)
                 {
                   guessAnimal();
                 }
                 else
                 {
                   placeholder = placeholder.yes;
                   botPost(placeholder.a, oldText, current_answer);
                 }
               }
             break;
       case 'Yes':
               if (guessasked === true)
               {
                 document.getElementsByTagName("p")[0].innerHTML = '<p class="bot-text" align="right">' + 'Yes i guess right' + '</p>';
               }
               else
               {
                 if(placeholder.yes === undefined)
                 {
                   guessAnimal();
                 }
                 else
                 {
                   placeholder = placeholder.yes;
                   botPost(placeholder.a, oldText, current_answer);
                 }
               }
           break;
       case 'no':
               if (guessasked === true)
               {
                 document.getElementsByTagName("p")[0].innerHTML = '<p class="bot-text" align="right">' + 'Yes i guess right' + '</p>';
               }
               else
               {
                 if(placeholder.no === undefined)
                 {
                   guessAnimal();
                 }
                 else
                 {
                   placeholder = placeholder.no;
                   botPost(placeholder.a, oldText, current_answer);
                 }
               }
           break;
       case 'No':
               if (guessasked === true)
               {
                 document.getElementsByTagName("p")[0].innerHTML = '<p class="bot-text" align="right">' + 'Yes i guess right' + '</p>';
               }
               else
               {
                 if(placeholder.no === undefined)
                 {
                   guessAnimal();
                 }
                 else
                 {
                   placeholder = placeholder.no;
                   botPost(placeholder.a, oldText, current_answer);
                 }
               }
           break;
       default:
          if (guessasked === true)
          {
            addAnimal(oldText);
          }
          else
          {
            alert('Something happened, check your spelling!');
          }
         }
}
