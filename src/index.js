
var totalScore = 0 ;


var form = document.getElementById('form') ;







//submit button start

var btn1 = document.getElementById('btn1') ;
if(btn1){
    btn1.addEventListener('click' , function(){
        var ageValue = parseInt(document.getElementById('age').value);
        var temparatureValue = parseFloat(document.getElementById('temparature').value);
        if(temparatureValue > 37.5 || temparatureValue > 38.3)totalScore+=2 ; //calculate totalScore
        localStorage.setItem('totalScore' , totalScore) ;
    })
}



// sex identification start

var sexValue ;
var sexinput = document.getElementById('sexinput') ;

var male = document.getElementById('male') ;
if(male){
    male.addEventListener('click', function(){
        sexinput.value = 'Male' ;
        sexValue = 'Male' ;
    })
}

var female = document.getElementById('femail') ;
if(female){
    female.addEventListener('click', function(){
        sexinput.value = 'Female' ;
        sexValue = 'Female' ;
    })
}



var other = document.getElementById('other');
if(other){
    other.addEventListener('click', function(){
        sexinput.value = 'Other' ;
        sexValue = 'Other' ;
    })
}



                                                // Symptoms 




// count severe symptoms point
var severe = document.getElementById('severe') ;                      //ID diye catch korle click even paoya zay
var s = document.querySelectorAll('#severe .input-group-text input') ;
var countSevere = 0 ;

severe.addEventListener('click' , function(){
    countSevere  = 0 ;
    s.forEach(element => {
        if(element.checked == true)countSevere++;
    });
    if(countSevere>0)countSevere+=2 ;
    //console.log(`countSevere   ${countSevere}`) ;
})



// count additional symptoms point
var additional = document.getElementById('additional') ;
var a =  document.querySelectorAll('#additional .input-group-text input') ;
var countAdditional = 0 ;

additional.addEventListener('click' , function(){
    countAdditional = 0 ;
    a.forEach(element => {
        if(element.checked == true)countAdditional+=2;
        console.log(element.checked) ;
    });
    //console.log(`countAdditional    ${countAdditional}`) ;
})



var btn2 = document.getElementById('btn2') ;
btn2.addEventListener('click' , function(){
    totalScore = parseInt(localStorage.getItem('totalScore')) + countSevere + countAdditional ;
    var symptoms = document.getElementById('symptoms') ;

    if(totalScore < 5){ //1 , 2 , 3, 4
        showFinalResult(`Well Done! ` ,'Count as COVID-19 “Negative.' , `You merely have chance to get affected by COVID-
                                19. Advice patient for isolation and contact doctor and follow advice.`)
    }
    
    else if(totalScore>5 && totalScore <7 ){ // 6
        showFinalResult(`Opps ` , `Count as COVID-19 “Positive”.` , `Highly chance of COVID-19 affected.
                                Go for isolation and contact doctor immediately
                                and follow advice.`) ;
        emergencyContact(`Emergency Contact Detail` , `999 , 16246 , 0150000000`) ;
        
    }
    else if(totalScore > 7){  // 8, 9, 10 ......
        showFinalResult(`Bad Luck !!` , `Count as COVID-19 “Positive”.` , `Almost confirmed case of COVID-19 positive.
                                Go for isolation and contact doctor immediately
                                and follow advice. You need to be hospitalized.`) ;
        emergencyContact(`Emergency Contact Detail` , `999 , 16246 , 0150000000`) ;
    }

    else if(totalScore >= 5){ // 5, 7
        showFinalResult( `Opps !! `, `Count as COVID-19 “Positive”.` , `Possible suspected case for COVID-19 affected.
                                Go for isolation and contact doctor and follow
                                advice.`)
    }
    
    
    localStorage.clear() ;
})



function showFinalResult(greet , result , advice){
    symptoms.innerHTML = `
    <div class="alert alert-success" role="alert">
        <h4 class="alert-heading">${greet}</h4>
        <p>${result}</p>
        <hr>
        <p class="mb-0">${advice}</p>
    </div>
    `
}

function emergencyContact(messege, contact)
{
    symptoms.innerHTML+=`
    <div class="alert alert-success" role="alert">
        <h4 class="alert-heading">${messege}</h4>
        <p>${contact}</p>
        <hr>
    </div>
    `
}



