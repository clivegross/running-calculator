function calculate()
{

  // I feel like there is a much smarter way to refactor the code in these 3 classes
  // but life is short and I am busy.

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

  class TrainingZone {
    constructor(zone, criticalSpeedMin, criticalSpeedMax) {
      this.zone = zone;
      this.csMin = criticalSpeedMin; // s/km
      this.csMax = criticalSpeedMax; // s/km
      // training zone ranges as percentages of CS
      this.pctCS = {};
      this.pctCS['E'] = {'min':1.15, 'max':1.24};
      this.pctCS['R'] = {'min':1.24};
      this.pctCS['Tempo'] = {'min':1.05, 'max':1.15};
      this.pctCS['T'] = {'min':0.95, 'max':1.05};
      this.pctCS['VO2Max'] = {'min':0.84, 'max':0.95};
      this.pctCS['AnC'] = {'max':0.84};
      // calculate training paces
      this.paceMinInSeconds = (isNaN(this.csMin * this.pctCS[this.zone]['min']) ? 0 : this.csMin * this.pctCS[this.zone]['min']); //(s/km)
      this.paceMaxInSeconds = this.csMax * this.pctCS[this.zone]['max']; //(s/km)
      this.pace400MinInSeconds = this.paceMinInSeconds*0.4; //(s/400m)
      this.pace400MaxInSeconds = this.paceMaxInSeconds*0.4; //(s/400m)
      this.paceMileMinInSeconds = this.paceMinInSeconds*1.609; //(s/mile)
      this.paceMileMaxInSeconds = this.paceMaxInSeconds*1.609; //(s/mile)
      this.paceMin = convertNumToTime(this.paceMinInSeconds); //(s/km)
      this.paceMax = convertNumToTime(this.paceMaxInSeconds); //(s/km)
      this.pace400Min = convertNumToTime(this.pace400MinInSeconds); //(s/km)
      this.pace400Max = convertNumToTime(this.pace400MaxInSeconds); //(s/km)
      this.paceMileMin = convertNumToTime(this.paceMileMinInSeconds); // 'mm:ss'/mile
      this.paceMileMax = convertNumToTime(this.paceMileMaxInSeconds); // 'mm:ss'/mile
      this.speedMin = 1000 / this.paceMaxInSeconds; //(m/s)
      this.speedMax = 1000 / this.paceMinInSeconds; //(m/s)
    }
  }  
 
  // set distance and time from form input
  var distance = document.getElementById("distance").value;
  var time = document.getElementById("timeHH").value*60*60 + document.getElementById("timeMM").value*60 + document.getElementById("timeSS").value*1;
  var customRaceDistance = document.getElementById("customDistance").value;
  
  
  // critical speed based on race duration
  var criticalSpeed = new CriticalSpeed(distance, time);

  // training zones
  let trainingZones = {};
  trainingZones['R'] = new TrainingZone('R', criticalSpeed.paceMinInSeconds, criticalSpeed.paceMaxInSeconds);
  trainingZones['E'] = new TrainingZone('E', criticalSpeed.paceMinInSeconds, criticalSpeed.paceMaxInSeconds);
  trainingZones['Tempo'] = new TrainingZone('Tempo', criticalSpeed.paceMinInSeconds, criticalSpeed.paceMaxInSeconds);
  trainingZones['T'] = new TrainingZone('T', criticalSpeed.paceMinInSeconds, criticalSpeed.paceMaxInSeconds);
  trainingZones['VO2Max'] = new TrainingZone('VO2Max', criticalSpeed.paceMinInSeconds, criticalSpeed.paceMaxInSeconds);
  trainingZones['AnC'] = new TrainingZone('AnC', criticalSpeed.paceMinInSeconds, criticalSpeed.paceMaxInSeconds);

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
  // update training pace element for each training zone
  updateTrainingZoneElements(trainingZones);
  updateRacePredictionElements(racePredictions);


  updateElementById("CSPaceMin", criticalSpeed.paceMin);
  updateElementById("CSPaceMax", criticalSpeed.paceMax);
  updateElementById("CS400Min", criticalSpeed.pace400Min);
  updateElementById("CS400Max", criticalSpeed.pace400Max);
  updateElementById("CSMileMin", criticalSpeed.paceMileMin);
  updateElementById("CSMileMax", criticalSpeed.paceMileMax);
  updateElementById("CSMin", criticalSpeed.speedMin.toFixed(1));
  updateElementById("CSMax", criticalSpeed.speedMax.toFixed(1));
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

function updateElementById(id, value, dp=0) {
  try {
    // if string
    if (typeof value === 'string') {
      // if NaN in string
      if (value.includes('NaN') || value.includes('Infinity')) {
        var cleanedValue = "..."
      } else {
        var cleanedValue = value;  
      }
    }
    // if not string
    else {
      // if NaN
      if (isNaN(value)) {
        var cleanedValue = "  ";  
      }
      // if finite
      else if (isFinite(value)) {
        var cleanedValue = value;
      }
      // if infinity
      else {
        var cleanedValue = "  ";
      }
    }
    document.getElementById(id).innerHTML = cleanedValue;
  } catch (err) {
    console.log(err);
  }
}

function updateTrainingZoneElements(trainingZones) {
  // update training pace element for each training zone
  
  const trainingPaceMinElements = document.querySelectorAll(`[id^="trainingPaceMin_"]`);
  trainingPaceMinElements.forEach(item => {
    const tz = item.id.substring(item.id.search("_")+1);
    updateElementById(item.id, trainingZones[tz].paceMin);
  });
  const trainingPaceMaxElements = document.querySelectorAll(`[id^="trainingPaceMax_"]`);
  trainingPaceMaxElements.forEach(item => {
    const tz = item.id.substring(item.id.search("_")+1);
    updateElementById(item.id, trainingZones[tz].paceMax);
  });
  // update training 400m pace element for each training zone
  const trainingPace400MinElements = document.querySelectorAll(`[id^="trainingPace400Min_"]`);
  trainingPace400MinElements.forEach(item => {
    const tz = item.id.substring(item.id.search("_")+1);
    updateElementById(item.id, trainingZones[tz].pace400Min);
  });
  const trainingPace400MaxElements = document.querySelectorAll(`[id^="trainingPace400Max_"]`);
  trainingPace400MaxElements.forEach(item => {
    const tz = item.id.substring(item.id.search("_")+1);
    updateElementById(item.id, trainingZones[tz].pace400Max);
  });

  // update training pace/mile element for each training zone
  const trainingPaceMileMinElements = document.querySelectorAll(`[id^="trainingPaceMileMin_"]`);
  trainingPaceMileMinElements.forEach(item => {
    const tz = item.id.substring(item.id.search("_")+1);
    updateElementById(item.id, trainingZones[tz].paceMileMin);
  });
  const trainingPaceMileMaxElements = document.querySelectorAll(`[id^="trainingPaceMileMax_"]`);
  trainingPaceMileMaxElements.forEach(item => {
    const tz = item.id.substring(item.id.search("_")+1);
    updateElementById(item.id, trainingZones[tz].paceMileMax);
  });

  // update training speed element for each training zone
  const trainingSpeedMinElements = document.querySelectorAll(`[id^="trainingSpeedMin_"]`);
  trainingSpeedMinElements.forEach(item => {
    const tz = item.id.substring(item.id.search("_")+1);
    updateElementById(item.id, trainingZones[tz].speedMin.toFixed(1));
  });
  const trainingSpeedMaxElements = document.querySelectorAll(`[id^="trainingSpeedMax_"]`);
  trainingSpeedMaxElements.forEach(item => {
    const tz = item.id.substring(item.id.search("_")+1);
    updateElementById(item.id, trainingZones[tz].speedMax.toFixed(1));
  });
}

function updateRacePredictionElements(racePredictions) {

    // update predicted time element for each race distance
    const raceTimeElements = document.querySelectorAll(`[id^="raceTime_"]`);
    raceTimeElements.forEach(item => {
      raceDistance = item.id.substring(item.id.search("_")+1);
      updateElementById(item.id, racePredictions[raceDistance].time);
    });

    // update predicted pace element for each race distance
    const racePaceElements = document.querySelectorAll(`[id^="racePace_"]`);
    racePaceElements.forEach(item => {
      raceDistance = item.id.substring(item.id.search("_")+1)
      updateElementById(item.id, racePredictions[raceDistance].pace);
    });

    // update predicted 400m pace element for each race distance
    const racePace400Elements = document.querySelectorAll(`[id^="racePace400_"]`);
    racePace400Elements.forEach(item => {
      raceDistance = item.id.substring(item.id.search("_")+1);
      updateElementById(item.id, racePredictions[raceDistance].pace400);   
    });

    // update predicted pace/mile element for each race distance
    const racePaceMileElements = document.querySelectorAll(`[id^="racePaceMile_"]`);
    racePaceMileElements.forEach(item => {
      raceDistance = item.id.substring(item.id.search("_")+1);
      updateElementById(item.id, racePredictions[raceDistance].paceMile);
    });

    // update predicted speed element for each race distance
    const raceSpeedElements = document.querySelectorAll(`[id^="raceSpeed_"]`);
    raceSpeedElements.forEach(item => {
      raceDistance = item.id.substring(item.id.search("_")+1);
      updateElementById(item.id, racePredictions[raceDistance].speed.toFixed(1));
    });
}