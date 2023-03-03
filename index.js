const { fifaData } = require("./fifa.js");

// ⚽️ M  V P ⚽️ //

/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 1: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
Practice accessing data by console.log-ing the following pieces of data note. 

💡 HINT: You may want to filter the data first 😉*/

const finals2014 = fifaData.filter(
	(value) => value.Year === 2014 && value.Stage === "Final"
);
console.log(finals2014);
//(a) Home Team name for 2014 world cup final
console.log("Task 1a:", finals2014[0]["Home Team Name"]);
//(b) Away Team name for 2014 world cup final
console.log("Task 1b:", finals2014[0]["Away Team Name"]);
//(c) Home Team goals for 2014 world cup final
console.log("Task 1c:", finals2014[0]["Home Team Goals"]);
//(d) Away Team goals for 2014 world cup final
console.log("Task 1d:", finals2014[0]["Away Team Goals"]);
//(e) Winner of 2014 world cup final */
console.log("Task 1e:", finals2014[0]["Win conditions"]);

/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 2: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 
Use getFinals to do the following:
1. Receive an array as a parameter that will take the fifa data as its argument
2. Return an array of objects with the data of the teams that made it to the final stage

💡 HINT - you should be looking at the stage key inside of the objects
*/

function getFinals(array) {
	const finals = array.filter((value) => value.Stage === "Final");
	return finals;
}

console.log("Task 2:", getFinals(fifaData));

/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 3: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
Use the higher-order function called getYears to do the following: 
1. Receive an array as the first parameter that will take fifaData as an argument
2. Receive a callback function as the second parameter that will take getFinals from task 2 as an argument
3. Return an array called years containing all of the years in the getFinals data set*/

function getYears(array, callback) {
	const years = callback(array).map((value) => value.Year);
	return years;
}

console.log("Task 3:", getYears(fifaData, getFinals));

/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 4: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
Use the higher-order function getWinners to do the following:  
1. Receive an array as the first parameter that will take fifaData as an argument
2. Receive a callback function as the second parameter that will take getFinals from task 2 as an argument
3. Determines the winner (home or away) of each `finals` game. 
💡 HINT: Don't worry about ties for now (Please see the README file for info on ties for a stretch goal.)
4. Returns the names of all winning countries in an array called `winners` */

function getWinners(array, callback) {
	const winners = callback(array).map((value) =>
		value["Home Team Goals"] > value["Away Team Goals"]
			? value["Home Team Name"]
			: value["Away Team Name"]
	);
	return winners;
}

console.log("Task 4:", getWinners(fifaData, getFinals));

/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 5: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 
Use the higher-order function getWinnersByYear to do the following:
1. Receive an array as the first parameter that will take fifaData as an argument
2. Receive a callback function as the second parameter that will take getFinals from task 2 as an argument
3. Receive a callback function as the third parameter that will take getYears from task 3 as an argument
4. Receive a callback function as the fourth parameter that will take getWinners from task 4 as an argument
5. Return an array of strings that say "In {year}, {country} won the world cup!" 

💡 HINT: the strings returned need to exactly match the string in step 4.
 */

function getWinnersByYear(array, getFinalsCB, getYearsCB, getWinnersCB) {
	const years = getYearsCB(array, getFinalsCB);
	const winners = getWinnersCB(array, getFinalsCB);
	return years.map(
		(value, index) => `In ${value}, ${winners[index]} won the world cup!`
	);
}

console.log(
	"Task 5:",
	getWinnersByYear(fifaData, getFinals, getYears, getWinners)
);

/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 6: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
Use the higher order function `getAverageGoals` to do the following: 
 1. Receive a callback function as a parameter that will take `getFinals` (from task 2) as an argument; ensure you pass in `fifaData` as its argument
 
 💡 HINT: Example of invocation: `getAverageGoals(getFinals(fifaData));`

 2. Calculate the AVERAGE number of the TOTAL home team goals AND TOTAL away team goals scored PER MATCH

 3. Round to the second decimal place and return the value
 
 💡 HINT: use .reduce, .toFixed (refer to MDN for syntax), and do this in 2 steps) 
 
*/

function getAverageGoals(callback) {
	let avgGoals =
		callback.reduce(
			(total, current) =>
				total + current["Home Team Goals"] + current["Away Team Goals"],
			0
		) / callback.length;
	avgGoals = avgGoals.toFixed(2);
	return avgGoals;
}

console.log("Task 6:", getAverageGoals(getFinals(fifaData)));

/// 🥅 STRETCH 🥅 ///

/* 💪💪💪💪💪 Stretch 1: 💪💪💪💪💪 
Create a function called `getCountryWins` that takes the parameters `data` and `team initials` and returns the number of world cup wins that country has had. 

Hint: Investigate your data to find "team initials"!
Hint: use `.reduce` */

function getCountryWins(data, teamInitials) {
	const winnersInit = data.map((value) =>
		value["Home Team Goals"] > value["Away Team Goals"]
			? value["Home Team Initials"]
			: value["Away Team Initials"]
	);
	const teamWins = winnersInit.reduce(
		(total, current) => (current === teamInitials ? total + 1 : total + 0),
		0
	);
	return teamWins;
}

console.log("Stretch 1(ITA):", getCountryWins(getFinals(fifaData), "ITA"));
console.log("Stretch 1(URU):", getCountryWins(getFinals(fifaData), "URU"));
console.log("Stretch 1(FRA):", getCountryWins(getFinals(fifaData), "FRA"));

/* 💪💪💪💪💪 Stretch 2: 💪💪💪💪💪 
Write a function called getGoals() that accepts a parameter `data` and returns the team with the most goals score per appearance (average goals for) in the World Cup finals */

function getGoals(data) {
	const goalsByTeam = data.reduce((acc, game) => {
		const homeTeam = game["Home Team Name"];
		const homeTeamGoals = game["Home Team Goals"];
		const awayTeam = game["Away Team Name"];
		const awayTeamGoals = game["Away Team Goals"];

		acc[homeTeam] = acc[homeTeam] || { goals: 0, appearances: 0 };
		acc[homeTeam].goals += homeTeamGoals;
		acc[homeTeam].appearances += 1;
		acc[awayTeam] = acc[awayTeam] || { goals: 0, appearances: 0 };
		acc[awayTeam].goals += awayTeamGoals;
		acc[awayTeam].appearances += 1;

		return acc;
	}, {});

	const bestTeam = Object.keys(goalsByTeam).reduce(
		(best, team) => {
			const goals = goalsByTeam[team].goals;
			const appearances = goalsByTeam[team].appearances;
			const avgGoalsFor = goals / appearances;

			if (avgGoalsFor > best.avgGoalsFor) {
				best.team = team;
				best.avgGoalsFor = avgGoalsFor;
			}

			return best;
		},
		{ team: "", avgGoalsFor: 0 }
	);

	return bestTeam;
}

console.log("Stretch 2:", getGoals(getFinals(fifaData)));

/* 💪💪💪💪💪 Stretch 3: 💪💪💪💪💪
Write a function called badDefense() that accepts a parameter `data` and calculates the team with the most goals scored against them per appearance (average goals against) in the World Cup finals */

function badDefense(data) {
	const goalsByTeam = data.reduce((acc, game) => {
		const homeTeam = game["Home Team Name"];
		const homeTeamGoalsAgainst = game["Away Team Goals"];
		const awayTeam = game["Away Team Name"];
		const awayTeamGoalsAgainst = game["Home Team Goals"];

		acc[homeTeam] = acc[homeTeam] || { goalsAgainst: 0, appearances: 0 };
		acc[homeTeam].goalsAgainst += homeTeamGoalsAgainst;
		acc[homeTeam].appearances += 1;
		acc[awayTeam] = acc[awayTeam] || { goalsAgainst: 0, appearances: 0 };
		acc[awayTeam].goalsAgainst += awayTeamGoalsAgainst;
		acc[awayTeam].appearances += 1;

		return acc;
	}, {});

	const worstTeam = Object.keys(goalsByTeam).reduce(
		(worst, team) => {
			const goalsAgainst = goalsByTeam[team].goalsAgainst;
			const appearances = goalsByTeam[team].appearances;
			const avgGoalsAgainst = goalsAgainst / appearances;

			if (avgGoalsAgainst > worst.avgGoalsAgainst) {
				worst.team = team;
				worst.avgGoalsAgainst = avgGoalsAgainst;
			}

			return worst;
		},
		{ team: "", avgGoalsAgainst: 0 }
	);

	return worstTeam;
}

console.log("Stretch 3:", badDefense(getFinals(fifaData)));

/* If you still have time, use the space below to work on any stretch goals of your chosing as listed in the README file. */

/* 🛑🛑🛑🛑🛑 Please do not modify anything below this line 🛑🛑🛑🛑🛑 */
function foo() {
	console.log("its working");
	return "bar";
}
foo();
module.exports = {
	foo,
	getFinals,
	getYears,
	getWinners,
	getWinnersByYear,
	getAverageGoals,
};
