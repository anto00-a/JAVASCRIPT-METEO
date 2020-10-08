let wind;
let humidity;
let max;
let min;
let weatherHawText;
let temp_a;
let dati;
let request;
let hawWeatherCurrent = document.getElementById('haw-weather');
let hawWeather1= document.getElementById('haw-weather1');
let hawWeather2= document.getElementById('haw-weather2');
let hawWeather=[hawWeatherCurrent,hawWeather1,hawWeather2];
let conditionCode;

infoDate();


function infoDate(){ 
    let data_now = new Date();
    let date, year, hour ,minutes;
    let day1;
    let day2;
    const week= ['Domenica','Lunedì','Martedì','Mercoledì','Giovedì','Venerdì','Sabato'];
    const month=['Gennaio','Febbraio','Marzo','Aprile','Maggio','Giugno','Luglio','Agosto','Settembre','Ottobre','Novembre','Dicembre'];
    date = data_now.getDate();
    set = week[data_now.getDay()] + ', ';
    mm= month[data_now.getMonth()]+'';
    year = data_now.getFullYear();
    hour =data_now.getHours() + ':';
    minutes=data_now.getMinutes();
    day1=week[data_now.getDay()+1];
    day2=week[data_now.getDay()+2];
    console.log(week.indexOf(day2))
    if(week.indexOf(day2)>6){
       day2=week[0];
    }else if(week.indexOf(day1)>6){
        day1=week[0];
    }
    console.log(day2)
    if(minutes<10){
        minutes = '0'+minutes;
    }
    document.getElementById('data1').innerHTML=`${day1}`;
    document.getElementById('data2').innerHTML=`${day2}`;
    document.getElementById('time').innerHTML=`${hour}`+`${minutes}`;
    document.getElementById('data').innerHTML=`${set} ${date} ${mm} ${year}`;
}



function requestData(){
    let cityInput = document.getElementById('weath').value;
    let apiKey = '6fe12b552bfe4b069cf153841201008';
    let apiUrl = 'http://api.weatherapi.com/v1/forecast.json?key='+apiKey+'&q='+cityInput+'&days=10&lang=it';
    request = new XMLHttpRequest(); 
    request.open('GET', apiUrl,true);
    request.onload = function(){
        errorHandler();
        dati = JSON.parse(this.response);
        wind = dati.current.wind_kph;
        humidity= dati.current.humidity;
        max=dati.forecast.forecastday[0].day.maxtemp_c;
        min=dati.forecast.forecastday[0].day.mintemp_c;
        weatherHawText=dati.current.condition.text;
        temp_a=dati.current.temp_c;
        max1=dati.forecast.forecastday[1].day.maxtemp_c;
        max2=dati.forecast.forecastday[2].day.maxtemp_c;
        min1=dati.forecast.forecastday[1].day.mintemp_c;
        min2=dati.forecast.forecastday[2].day.mintemp_c;
        conditionCode=[dati.current.condition.code,dati.forecast.forecastday[1].day.condition.code,dati.forecast.forecastday[2].day.condition.code,];
        postData();
        iconChange()

    }
    request.send();
}


function postData(){
    infoDate();
    temp_a=parseInt(temp_a);
    max=parseInt(max);
    min=parseInt(min);
    max1=parseInt(max1);
    min1=parseInt(min1);
    max2=parseInt(max2);
    min2=parseInt(min2);
    humidity=parseInt(humidity);
    wind=parseInt(wind);
    let citySearched=dati.location.name;
    document.getElementById('city').innerHTML=`${citySearched}`;
    document.getElementById('umidità').innerHTML=` ${humidity}`+'%';
    document.getElementById('max_min').innerHTML=` ${max}`+'°'+'/'+`${min}`+'°';
    document.getElementById('vento').innerHTML=`${wind} km/h`;
    document.getElementById('tempo').innerHTML=`${weatherHawText}`;
    document.getElementById('gradi').innerHTML=`${temp_a}`+'°';
    document.getElementById('max_min_1').innerHTML=`${min1}°`+`/${max1}°`
    document.getElementById('max_min_2').innerHTML=`${min2}°`+`/${max2}°`
} 




function iconChange(){
    
    for(let i=2 ; i>=0; i--){
        if (conditionCode[i]>= 1006 && conditionCode[i]<=1030 || conditionCode[i]===1135 ) {
        //nuvoloso
            hawWeather[i].classList.add('background_repeat');
            hawWeather[i].style.backgroundImage = "url('assets/icone/clouds.svg')";
            document.querySelector('main').style.background="url(assets/immagini/cloudy.jpg)  center center / cover no-repeat";
            

        }else if(conditionCode[i] === 1063 || conditionCode[i]>=1240 
            && conditionCode[i]<=1249 || conditionCode[i]===1273|| conditionCode[i] >=1150 && conditionCode[i] <=1201 || conditionCode[i]===1183 ){
        //pioggia
            hawWeather[i].classList.add('background_repeat');
            hawWeather[i].style.backgroundImage = "url('assets/icone/rain.svg')";
            document.querySelector('main').style.background="url(assets/immagini/rain.jpg)  center center / cover no-repeat";
            


        }else if(conditionCode[i] >=1204 && conditionCode[i] <= 1237 ||  conditionCode[i] >=1279 
            || conditionCode[i]>=1252 && conditionCode[i]<=1264){
        //neve
            hawWeather[i].classList.add('background_repeat');
            hawWeather[i].style.backgroundImage = "url('assets/icone/snow.svg')" ;   
            document.querySelector('main').style.background="url(assets/immagini/snow.jpg)  center center / cover no-repeat";
            


        }else if(conditionCode[i]===1000){
        //sole
            hawWeather[i].classList.add('background_repeat');
            hawWeather[i].style.backgroundImage = "url('assets/icone/sun.svg')";
            document.querySelector('main').style.background="url(assets/immagini/sunny.jpg)  center center / cover no-repeat";
            


        }else if(conditionCode[i]===1003){
        //parzialmente nuvoloso
            hawWeather[i].classList.add('background_repeat');
            hawWeather[i].style.backgroundImage = "url('assets/icone/sun_clouds.svg')";
            document.querySelector('main').style.background="url(assets/immagini/sunny_clouds.jpg)  center center / cover no-repeat";
            


        }else if(conditionCode[i]===1117 || conditionCode[i]===1276){
        //storm
            hawWeather[i].classList.add('background_repeat');
            hawWeather[i].style.backgroundImage = "url('assets/icone/storm.svg')";
            document.querySelector('main').style.background="url(assets/immagini/storm1.jpg)  center center / cover no-repeat";
            

        };    
        
    }
}



function errorHandler(){
    let error =request.status;
    if(error <400){
        return
    }else{ 
        document.querySelector('main').classList.add('blur');
        document.getElementById('pop_up').classList.add('show'); 
        document.getElementById('pop_up').classList.remove('hidden')
        infoDate();
    }
 console.log(error)
}



function resetApp(){
    document.querySelector('main').classList.remove('blur');
        document.getElementById('pop_up').classList.remove('show'); 
        document.getElementById('pop_up').classList.add('hidden')
}



const resetBtn = document.getElementById('reset');
const inviaBtn = document.getElementById('invia');
inviaBtn.addEventListener('click', requestData)
resetBtn.addEventListener('click',resetApp)
