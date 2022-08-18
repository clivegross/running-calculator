function calculate()
{

  class RacePrediction {
    constructor(raceDistance) {
      this.distance = raceDistance;
      this.timeInSeconds = predictT2Riegel(distance, this.distance, time); // (s)
      this.paceInSeconds = this.timeInSeconds / this.distance; //(s/km)
      this.pace400InSeconds = this.paceInSeconds*0.4; //(s/400m)
      this.paceMileInSeconds = this.paceInSeconds*1.609; //(s/mile)
      this.speed = this.distance*1000 / this.timeInSeconds; //(m/s)
      this.time = convertNumToTime(this.timeInSeconds); // 'hh:mm:ss'
      this.pace = convertNumToTime(this.paceInSeconds); // 'mm:ss'/km
      this.pace400 = convertNumToTime(this.pace400InSeconds); // 'mm:ss'/400m
      this.paceMile = convertNumToTime(this.paceMileInSeconds); // 'mm:ss'/mile
    }
  }

  class CriticalSpeed {
    constructor(raceDistance, raceTime) {
      this.raceDistance = raceDistance; //km
      this.raceTime = raceTime; //s
      // critical speed based on race duration
      this.csTmin = 30*60; // s
      this.csTmax = 40*60; // s
      this.paceMinInSeconds = predictV2Riegel(distance, time, this.csTmin); // s/km
      this.paceMaxInSeconds = predictV2Riegel(distance, time, this.csTmax); // s/km
      this.paceMin400InSeconds = this.paceMinInSeconds*0.4; //(s/400m)
      this.paceMax400InSeconds = this.paceMaxInSeconds*0.4; //(s/400m)
      this.paceMinMileInSeconds = this.paceMinInSeconds*1.609; //(s/mile)
      this.paceMaxMileInSeconds = this.paceMaxInSeconds*1.609; //(s/mile)
      this.speedMin = 1000 / this.paceMinInSeconds; //(m/s)
      this.speedMax = 1000 / this.paceMaxInSeconds; //(m/s)
      this.paceMin = convertNumToTime(this.paceMinInSeconds); // 'mm:ss'/km
      this.paceMax = convertNumToTime(this.paceMaxInSeconds); // 'mm:ss'/km
      this.pace400Min = convertNumToTime(this.paceMin400InSeconds); // 'mm:ss'/km
      this.pace400Max = convertNumToTime(this.paceMax400InSeconds); // 'mm:ss'/km
      this.paceMileMin = convertNumToTime(this.paceMinMileInSeconds); // 'mm:ss'/km
      this.paceMileMax = convertNumToTime(this.paceMaxMileInSeconds); // 'mm:ss'/km
    }
  }

  class TrainingZones {
    constructor(criticalSpeedMin, criticalSpeedMax) {
      this.criticalSpeedMin = criticalSpeedMin; // s/km
      this.criticalSpeedMax = criticalSpeedMax; // s/km
      this.percentCS = {};
      this.percentCS['E'] = {'min':115, 'max':124};
      this.percentCS['R'] = {'min':124};
      this.percentCS['Tempo'] = {'min':105, 'max':115};
      this.percentCS['T'] = {'min':95, 'max':105};
      this.percentCS['VO2Max'] = {'min':84, 'max':95};
      this.percentCS['AnC'] = {'max':84};
      // this.paceInSeconds = this.timeInSeconds / this.distance; //(s/km)
      // this.pace400InSeconds = this.paceInSeconds*0.4; //(s/400m)
      // this.paceMileInSeconds = this.paceInSeconds*1.609; //(s/mile)
      // this.speed = this.distance*1000 / this.timeInSeconds; //(m/s)
      // this.time = convertNumToTime(this.timeInSeconds); // 'hh:mm:ss'
      // this.pace = convertNumToTime(this.paceInSeconds); // 'mm:ss'/km
      // this.pace400 = convertNumToTime(this.pace400InSeconds); // 'mm:ss'/400m
      // this.paceMile = convertNumToTime(this.paceMileInSeconds); // 'mm:ss'/mile
    }
  }  
 
  // set distance and time from form input
  var distance = document.getElementById("distance").value;
  var time = document.getElementById("timeHH").value*60*60 + document.getElementById("timeMM").value*60 + document.getElementById("timeSS").value*1;
  console.log(document.getElementById("timeHH").value*60*60);
  
  console.log(document.getElementById("timeSS").value);
  console.log(time);
  var customRaceDistance = document.getElementById("customDistance").value;
  
  
  // critical speed based on race duration
  var criticalSpeed = new CriticalSpeed(distance, time);
  
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
  racePredictions['Custom'] = new RacePrediction(customRaceDistance);
 
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
  document.getElementById("CSPaceMin").innerHTML = criticalSpeed.paceMin;
  document.getElementById("CSPaceMax").innerHTML = criticalSpeed.paceMax;
  document.getElementById("CS400Min").innerHTML = criticalSpeed.pace400Min;
  document.getElementById("CS400Max").innerHTML = criticalSpeed.pace400Max;
  document.getElementById("CSMileMin").innerHTML = criticalSpeed.paceMileMin;
  document.getElementById("CSMileMax").innerHTML = criticalSpeed.paceMileMax;
  document.getElementById("CSMin").innerHTML = criticalSpeed.speedMin.toFixed(1);
  document.getElementById("CSMax").innerHTML = criticalSpeed.speedMax.toFixed(1);
}

function calcTrainingPaceMetrics(obj, paceMinInSeconds, paceMaxInSeconds) {
  obj.paceMin400InSeconds = paceMinInSeconds*0.4; //(s/400m)
  obj.paceMax400InSeconds = paceMaxInSeconds*0.4; //(s/400m)
  obj.paceMinMileInSeconds = paceMinInSeconds*1.609; //(s/mile)
  obj.paceMaxMileInSeconds = paceMaxInSeconds*1.609; //(s/mile)
  obj.speedMin = 1000 / paceMinInSeconds; //(m/s)
  obj.speedMax = 1000 / paceMaxInSeconds; //(m/s)
  obj.paceMin = convertNumToTime(paceMinInSeconds); // 'mm:ss'/km
  obj.paceMax = convertNumToTime(paceMaxInSeconds); // 'mm:ss'/km
  obj.pace400Min = convertNumToTime(this.paceMin400InSeconds); // 'mm:ss'/km
  obj.pace400Max = convertNumToTime(this.paceMax400InSeconds); // 'mm:ss'/km
  obj.paceMileMin = convertNumToTime(this.paceMinMileInSeconds); // 'mm:ss'/km
  obj.paceMileMax = convertNumToTime(this.paceMaxMileInSeconds); // 'mm:ss'/km
}

function predictT2Riegel(D1, D2, T1) {
  // Riegel formula for race time prediction:
  // T2 = T1 x (D2/D1)^1.06
  // https://en.wikipedia.org/wiki/Peter_Riegel
  T2 = T1 * (D2/D1)**1.06;
  return T2
}

function predictD2Riegel(D1, T1, T2) {
  // Riegel formula for race time prediction:
  // T2 = T1 x (D2/D1) ^1.06
  // https://en.wikipedia.org/wiki/Peter_Riegel
  // Rearranging the Rigel formula above for distance
  // D2 = D1 x (T2/T1)^0.943
  D2 = D1 * (T2/T1)**0.943;
  return D2
}

function predictV2Riegel(D1, T1, T2) {
  // Riegel formula for race time prediction:
  // T2 = T1 x (D2/D1)^1.06
  // https://en.wikipedia.org/wiki/Peter_Riegel
  // Rearranging the Rigel formula above for pace [time/distance]
  // V2 = (T2)/(D1*(T2/T1)^0.943)
  V2 = T2 / predictD2Riegel(D1, T1, T2);
  return V2
}

function convertNumToTime(number) {
  // 'number' represents duration in seconds
  // returns string "hh:mm:ss" if number >= 1 hour or "mm:ss" if < 1 hour

  // Check sign of given number
  var sign = (number >= 0) ? 1 : -1;

  // Set positive value of number of sign negative
  number = number * sign;

  // Separate the hours, minutes, seconds
  var hour = Math.floor(number/3600);
  var minute = Math.floor(number/60) - hour*60;
  var second = Math.floor(number) - hour*3600 - minute*60;

  // Add padding if needed
  if (minute.toString().length < 2) {
  minute = '0' + minute; 
  }

  if (second.toString().length < 2) {
    second = '0' + second; 
  }

  // Add Sign in final result
  sign = sign == 1 ? '' : '-';

  if (hour == 0) {
    // Concatenate minutes and seconds 'mm:ss'
    time = sign + minute + ':' + second;
  } else {
    // Concatenate hours, minutes and seconds 'hh:mm:ss'
    time = sign + hour + ':' + minute + ':' + second;
  }

  return time;
}
