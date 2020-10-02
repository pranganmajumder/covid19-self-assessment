
var totalScore = 0 ;


var age = document.getElementById('age') ;
var temparature = document.getElementById('temparature') ;
var sexinput = document.getElementById('sexinput') ;
var form = document.getElementById('form') ;



if(form){
    form.addEventListener('click' , (e)=>{
        
        let age_error = document.getElementById('age_error') ;
        let sex_error = document.getElementById('sex_error') ;
        let temparature_error = document.getElementById('temparature_error') ;
        if(age.value ===''){
            age_error.innerHTML = `<small style="color: red; font-size:0.8rem"> Age can not be blank</small>`
            e.preventDefault() ;
        }
        else{
            age_error.innerHTML = `<small id="age_error"></small>` ;
        }

        if(sexinput.value === ''){
            sex_error.innerHTML = `<small style="color: red; font-size:0.8rem"> Please Select One of them from dropdown menu</small>`
            e.preventDefault() ;
        }
        else{
            sex_error.innerHTML = `<small id="sex_error"></small>`; 
        }

        if(temparature.value ==='' || ('a'<= temparature.value && temparature.value <='z')){
            temparature_error.innerHTML = `<small style="color: red; font-size:0.8rem"> Temparature can not be blank</small>`
            e.preventDefault() ;
        }
        else{
            temparature_error.innerHTML = `<small id="temparature_error"></small>` ;
        }


    })
}






//submit button start

var btn1 = document.getElementById('btn1') ;
if(btn1){
    btn1.addEventListener('click' , function(){
        var ageValue = parseInt(age.value);
        var temparatureValue = parseFloat(temparature.value);
        totalScore = 0 ;
        if(temparatureValue > 37.5 || temparatureValue > 38.3)totalScore+=2 ; //calculate totalScore
        localStorage.setItem('totalScore' , totalScore) ;

    })
}



// sex identification start

var sexValue ;


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
    console.log(`total  .... Score   ${totalScore}`) ;
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



