function calculate()
{

  class RacePrediction {
    constructor(raceDistance) {
      this.distance = raceDistance;
      this.timeInSeconds = predictT2Riegel(distance, this.distance, time); // (s)
      this.paceInSeconds = this.timeInSeconds / this.distance; //(s/km)
      this.pace400InSeconds = this.paceInSeconds*0.4; //(s/400m)
      this.paceMileInSeconds = this.paceInSeconds*1.609; //(s/mile)
      this.time = convertNumToTime(this.timeInSeconds); // 'hh:mm:ss'
      this.pace = convertNumToTime(this.paceInSeconds); // 'mm:ss'/km
      this.pace400 = convertNumToTime(this.pace400InSeconds); // 'mm:ss'/400m
      this.paceMile = convertNumToTime(this.paceMileInSeconds); // 'mm:ss'/mile
    }
  }
 
  // set distance and time from form input
  var distance = document.getElementById("distance").value;
  var time = document.getElementById("timeHH").value*60*60 + document.getElementById("timeMM").value*60 + document.getElementById("timeSS").value;
  
  
  // critical speed based on race duration
  var csTmin = 30*60;
  var csTmax = 40*60;
  // csMin = csTmin / (distance*(csTmin/time)**0.943)/60; // (min/km)
  var csMin = predictV2Riegel(distance, time, csTmin); // s/km
  var csMax = predictV2Riegel(distance, time, csTmax); // s/km
  
  // race predictions
  let racePredictions = {};
  racePredictions['M'] = new RacePrediction(42.2);
  racePredictions['30K'] = new RacePrediction(30);
  racePredictions['HM'] = new RacePrediction(21.1);
  racePredictions['10K'] = new RacePrediction(10);
  racePredictions['5K'] = new RacePrediction(5);
  racePredictions['3K'] = new RacePrediction(3);
  racePredictions['Mile'] = new RacePrediction(1.609);
  racePredictions['1500'] = new RacePrediction(1.5);
  racePredictions['1000'] = new RacePrediction(1);
  racePredictions['800'] = new RacePrediction(0.8);
 
  // output
  // update predicted time element for each race distance
  const raceTimeElements = document.querySelectorAll(`[id^="raceTime_"]`);
  raceTimeElements.forEach(item => {
    raceDistance = item.id.substring(item.id.search("_")+1)
    try {
      document.getElementById(item.id).innerHTML = racePredictions[raceDistance].time;
    } catch {}    
  });
  // update predicted pace element for each race distance
  const racePaceElements = document.querySelectorAll(`[id^="racePace_"]`);
  racePaceElements.forEach(item => {
    raceDistance = item.id.substring(item.id.search("_")+1)
    try {
      document.getElementById(item.id).innerHTML = racePredictions[raceDistance].pace;
    } catch {}    
  });
  // update predicted 400m pace element for each race distance
  const racePace400Elements = document.querySelectorAll(`[id^="racePace400_"]`);
  racePace400Elements.forEach(item => {
    raceDistance = item.id.substring(item.id.search("_")+1)
    try {
      document.getElementById(item.id).innerHTML = racePredictions[raceDistance].pace400;
    } catch {}    
  });
  // update predicted pace/mile element for each race distance
  const racePaceMileElements = document.querySelectorAll(`[id^="racePaceMile_"]`);
  racePaceMileElements.forEach(item => {
    raceDistance = item.id.substring(item.id.search("_")+1)
    try {
      document.getElementById(item.id).innerHTML = racePredictions[raceDistance].paceMile;
    } catch {}    
  });
  document.getElementById("CSmin").innerHTML = convertNumToTime(csMin);
  document.getElementById("CSmax").innerHTML = convertNumToTime(csMax);
}




function predictD2Riegel(D1, T1, T2) {
  // Riegel formula for race time prediction:
  // T2 = T1 x (D2/D1) ^1.06
  // Rearranging the Rigel formula above for distance
  // D2 = D1 x (T2/T1)^0.943
  // https://en.wikipedia.org/wiki/Peter_Riegel
  D2 = D1 * (T2/T1)**0.943;
  return D2
}

function predictT2Riegel(D1, D2, T1) {
  // Riegel formula for race time prediction:
  // T2 = T1 x (D2/D1)^1.06
  // https://en.wikipedia.org/wiki/Peter_Riegel
  T2 = T1 * (D2/D1)**1.06;
  return T2
}

function predictV2Riegel(D1, T1, T2) {
  // Riegel formula for race time prediction:
  // T2 = T1 x (D2/D1)^1.06
  // Rearranging the Rigel formula above for distance
  // D2 = D1 x (T2/T1)^0.943
  // https://en.wikipedia.org/wiki/Peter_Riegel
  // pace [time/distance]
  // V2 = (T2)/(D1*(T2/T1)^0.943)
  V2 = T2 / predictD2Riegel(D1, T1, T2);
  return V2
}

function convertNumToTime(number) {
  // 'number' represents time/duration in seconds
  // Check sign of given number
  var sign = (number >= 0) ? 1 : -1;

  // Set positive value of number of sign negative
  number = number * sign;

  // Separate the int from the decimal part
  var hour = Math.floor(number/3600);
  var minute = Math.floor(number/60) - hour*60;
  var second = Math.floor(number) - hour*3600 - minute*60;
  var decpart = number - hour;

  // var min = 1 / 60;
  // // Round to nearest minute
  // decpart = min * Math.round(decpart / min);

  // var minute = Math.floor(decpart * 60) + '';

  // Add padding if need
  if (minute.toString().length < 2) {
  minute = '0' + minute; 
  }

  if (second.toString().length < 2) {
    second = '0' + second; 
  }

  // Add Sign in final result
  sign = sign == 1 ? '' : '-';

  if (hour == 0) {
    // Concate minutes and seconds 'mm:ss'
    time = sign + minute + ':' + second;
  } else {
    // Concate hours, minutes and seconds 'hh:mm:ss'
    time = sign + hour + ':' + minute + ':' + second;
  }


  return time;
}
