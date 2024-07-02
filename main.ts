#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";

let playerFuel = 100;
let opponentFuel = 100;

function decreaseFuel(entity:string) {
 if (entity === "player") {
     playerFuel -= 25;
 } else {
      opponentFuel -= 25;
    }
}

function refillFuel() {
    playerFuel = 100;
}

async function startGame() {
 const player = await inquirer.prompt([
      {
      name: "name",
      type: "input",
      message: (chalk.cyan("\tENTER YOUR NAME:\n")),
      }
 ]);

 const opponent = await inquirer.prompt([
       {
      name: "select",
      type: "list",
      message: (chalk.cyan("\tSELECT YOUR OPPONENT\n")),
            choices: ["SKELETON", "MONSTER", "ZOMBIE"]
       }
]);

console.log(chalk.magenta(`THE BATTLE BEGINS ${player.name} VS ${opponent.select}`));

 while (true) {
  const answer = await inquirer.prompt([
         {
        name: "opt",
        type: "list",
        message: (chalk.cyan("\tSelect your option\n")),
       choices: ["Attack", "Drink potion", "Run for your dear life"]
        }
 ]);

 if (answer.opt === "Attack") {
 const num = Math.floor(Math.random() * 2);
if (num > 0) {
      decreaseFuel("player");
     console.log(`${player.name} fuel is ${playerFuel}`);
     console.log(`Opponent's fuel is ${opponentFuel}`);
if (playerFuel <= 0) {
    console.log(chalk.red("YOU LOSE, BETTER LUCK NEXT TIME"))
    process.exit();
  }
  } else {
     decreaseFuel("opponent");
    console.log(`${player.name} fuel is ${playerFuel}`);
    console.log(`Opponent's fuel is ${opponentFuel}`);
 if (opponentFuel <= 0) {
     console.log(chalk.yellow("YOU WIN!"));
    process.exit();
          }
     }
} else if (answer.opt === "Drink potion") {
    refillFuel();
    console.log(chalk.green(`${player.name} drink a potion. Your fuel is ${playerFuel}`));
 } else if (answer.opt === "Run for your dear life") {
    console.log(chalk.red("YOU LOSE, BETTER LUCK NEXT TIME"));
     process.exit();
      }
  }
}

startGame();
