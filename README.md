# running-calculator

A client-side running calculator that estimates training paces and predicts race times based on a recent race result.

The calculator is written in javascript so no server required.

Race times are predicted using the formula by [Peter Riegel](https://en.wikipedia.org/wiki/Peter_Riegel):

`T2 = T1 x (D2/D1)^1.06`

Where:
- T1 is the time achieved for D1.
- T2 is the time predicted for D2.
- D1 is the distance over which the initial time is achieved.
- D2 is the distance for which the time is to be predicted.

Training Paces are estimated using percentages of Critical Speed as determined by [Dr Philip Skiba](https://physfarm.com) in his book, [Scientific Training For Endurance Athletes (2022)](http://physfarm.com/new/?p=1438).

Critical Speed is estimated as a range by predicting 30 to 40 minute race pace by rearranging Peter Riegel's formula:

`pace = T2/D2 = T2/(D1 x (T2/T1)^0.943)`