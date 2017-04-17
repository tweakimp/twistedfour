// jshint esversion:6
// jshint browser: true
// jshint devel: true

/*
create 7x7 matrix, fill with x, apply gravity?
switch to "coordinates", "randomized", "custom", "start"
- coordinates makes the the fields show their coordinates
- randomized creates a random 0,1,2 distribution;
- custom you can setup a custom grid via customMatrix
- start to fill matrix with zeroes
*/

var twisted = new Game("ai", "ai", 60);
twisted.start();

// four in a row
