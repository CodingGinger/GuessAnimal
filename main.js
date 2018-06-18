var newtext;
var oldText;
var counter = 0;
var current_answer;
var rjson;
var lenghchecked;
var guessasked;
var animaladded;
var placeholder;
var newquestion;
var newanimal;
var nextanimal;
var test = 0;

var json = {
    "questions" :
    [
      {id_yes : 0, id_no : 0, question: 'Does it Pure?'}
    ],
    "animals" :
    [
      {"animal" : "Is it a Cat?"}
    ]
}

function lstoragewrite() //write to localStorage
{
    localStorage.setItem('json', JSON.stringify(json));
    //alert('Written');
};

function lstorageparse()//Get localStorage and parse it
{
  rjson = localStorage.getItem('json')
  json = JSON.parse(rjson)
  //alert('parsed and cleared');
}

function removelocalStorage()// wipe localStorage
{
  localStorage.removeItem('json');
  document.getElementsByTagName("p")[0].innerHTML = '<p class="bot-text" align="right">' + 'localStorage wiped' + '</p>';
}

function addAnimal()
{
  function add()
  {
    var index = guessasked + 2;
    //alert(test);
    var newquestioninput = {id_yes : (json.animals.length), id_no : (test -1), question: newquestion + '?'};
    var newguessinput = {question : ' ', animal: newanimal};

    json.questions.unshift(newquestioninput); // old guess  = new question
    json.animals.push(newguessinput); // new guess
  }

  function trim(s) {
    return s.replace(/^\s*|\s*$/g,"");
    }
    var regex = /\s+/gi;
    if (newtext.trim().replace(regex, ' ').split(' ').length > 1)
    {
      //alert(newtext.trim().replace(regex, ' ').split(' ').length);
      newquestion = newtext;
      add();
    }
    else
    {
      //alert(newtext.trim().replace(regex, ' ').split(' ').length)
      newanimal = newtext;
      document.getElementsByTagName("p")[0].innerHTML = '<p class="bot-text" align="right">' + 'What is the difference?' + '</p>' + oldText;
    }
  //var jsontemp = {"message" : 'Johan'};
  //json.animals[7].message = jsontemp.animals[0].message;
  //alert(json.animals[7].message);
  //json.animals.unshift(jsontemp);
  //json.animals.unshift(jsontemp);
  //json.animals.unshift(jsontemp);
  //json.animals.unshift(jsontemp);
  //localStorage.setItem('jsontemp', JSON.stringify(jsontemp));
  //jsontemp.animals[0].message = 'sdgffd';
  lstoragewrite();
  lstorageparse();

}

function botPostquestion()
{
  document.getElementsByTagName("p")[0].innerHTML = '<p class="bot-text" align="right">' + json.questions[counter].question + '?' + '</p>' + oldText;
}

function botPostanimal() // function responsable for posting
{
  document.getElementsByTagName("p")[0].innerHTML = '<p class="bot-text" align="right">' + json.animals[counter].animal + '?' + '</p>' + oldText;
  ++guessasked;
  ++test;
    /*if (json.animals.length > counter)
  {
    if (json.animals[counter].question == ' ')
    {
      document.getElementsByTagName("p")[0].innerHTML = '<p class="bot-text" align="right">' + counter + ' Is it a ' + json.animals[counter].guess + '?' + '</p>' + oldText;
      //alert('guess');
    //alert('after done');
    }
    else if (json.animals[counter].guess == ' ')
    {
      alert(current_answer);
      document.getElementsByTagName("p")[0].innerHTML = '<p class="bot-text" align="right">' + counter + json.animals[counter].question + '</p>' + oldText;
      //alert('Question');
    }
    else
    {
      //addAnimal();
      alert('debug1');
    }
  }
  else
  {
      alert("debug2");
  }*/
}

function post() // post function, connected to submit button
{
        newtext = document.getElementById('input1').value; // gets new input form input form
        current_answer = document.getElementById('input1').value; // keeps track of player last current_answer
        oldText = document.getElementById('window1').innerHTML; // gets old tect formated an everything :D
        //document.getElementsByTagName("p")[0].innerHTML = '<p class="text">' + newtext + '</p>' + oldText;
        if (guessasked != null && current_answer == 'yes' || current_answer == 'Yes')
        {
          alert('I guessed right');
        }
        else if (guessasked != null && current_answer == 'no' || current_answer == 'No')
        {
          alert('här?');
          document.getElementsByTagName("p")[0].innerHTML = '<p class="bot-text" align="right">' + 'What animal did you think of?' + '</p>' + oldText;
        }
        else if (counter == 0 && current_answer == 'no' || current_answer == 'No')
        {
        nextanimal = parseInt(json.questions[counter].id_no);
        counter = nextanimal - 1;
        botPostanimal();
        }
        else
        {
        main();
        }


}

function start() // function that runs onload, also calls localStorage write
{
  (function checklocalstorage()
  {
    if (localStorage.getItem('json') === null)
    {
      lstoragewrite();
    }
    else {
      lstorageparse();
    }
  })();

    if (isNaN(json.questions[counter].question) != true)
      {
        placeholder = json.questions[counter].question;
        document.getElementsByTagName("p")[0].innerHTML = '<p class="bot-text" align="right">'  + json.animals[parseInt(json.questions[counter].question)].animal + '</p>';
      }
      else
      {
        alert("Noo");
        document.getElementsByTagName("p")[0].innerHTML = '<p class="bot-text" align="right">'  + json.questions[counter].question + '</p>';
      }
}

function main() // main function that parse inputs
{
  //alert(json.animals.length);
  oldText = document.getElementById('window1').innerHTML;
  if (isNaN(json.questions[counter].question) != true)
  {
    if (newtext == 'No' || newtext == 'no' && counter === 0)
    {
      //alert('test');
      addAnimal();
    }
    else if (newtext == 'Yes' || newtext == 'yes' && counter === 0)
    {
      alert('Hey we got this far');
    }
    else{
      if (newtext === 'Yes' || newtext === 'yes')
      {
        alert('This is great');
      }
      else if (newtext === 'No' || newtext === 'no')
      {
        document.getElementsByTagName("p")[0].innerHTML = '<p class="bot-text" align="right">' + 'What animal did you think of?' + '</p>' + oldText;
      }
      else
      {
        addAnimal();
      }
    }
  }
  else
  {
    if (newtext == 'Yes' || newtext == 'yes' && counter === 0)
    {
          botPostanimal();
    }
    else
    {
      if (newtext === 'Yes' || newtext === 'yes')
      {
        ++counter
        botPostanimal();
      }
      else if (newtext === 'No' || newtext === 'no')
      {
        //alert("test");
        ++counter
        botPostquestion();
      }
      else
      {
        addAnimal();
      }
    }
  }
  /*if (counter < json.animals.length){
    //alert(counter);
      if (newtext == 'no' || newtext == 'No')
      {
        if (guessasked != undefined)
        {
          if (json.animals[guessasked].question == ' ')
          {
            document.getElementsByTagName("p")[0].innerHTML = '<p class="bot-text" align="right">' + 'What animal did you think of?' + '</p>' + oldText;
          }
          else if (json.animals[counter].guess == ' ')
          {
            alert('Guess NO');
          }
          else
          {
            ++counter
            //document.getElementsByTagName("p")[0].innerHTML = '<p class="bot-text" align="right">' + counter2 + '</p>';
            botPost();
            //document.getElementsByTagName("p")[0].innerHTML = '<p class="bot-text" align="right">' + json.animals[1].message + '</p>' + oldText;
          }
        }
        else
        {
          counter+=2;
          botPost();
        }
      }
      else if (newtext == 'yes' || newtext == 'Yes')
      {
        if (guessasked != undefined)
        {
          if (json.animals[guessasked].question == ' ')
          {
            document.getElementsByTagName("p")[0].innerHTML = '<p class="bot-text" align="right">' + 'AI beat human!!' + '</p>';
          }
          else {
            counter+=2;
            botPost();
          }
        }
        else
        {
          ++counter;
          botPost();
        }
      }
      else if (newtext == 'wipe')
      {
        removelocalStorage();
      }
      else if (newtext == 'done' || newtext == 'Done')
      {
        lstorageparse();
        botPost();
      }
      else
      {
        addAnimal();
        //lstoragewrite();
      }
  }
  else
  {
    alert('Ha!!');
  }*/
}
