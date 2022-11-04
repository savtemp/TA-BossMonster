const heroes = [
  // {
  //   name: "Jeremy",
  //   quirk: "Monster Cat",
  //   damage: 5,
  //   health: 100,
  //   image: "assets/midoriaFighter.gif",
  // },
  // {
  //   name: "Sam",
  //   quirk: "Voice",
  //   damage: 10,
  //   health: 50,
  //   image: "assets/midoriaFighter.gif",
  // },
  {
    name: "Tyler",
    quirk: "Engine",
    damage: 5,
    health: 100,
    image: "assets/midoriaFighter.gif",
  },
  {
    name: "Jeff",
    quirk: "Rifle",
    damage: 5,
    health: 50,
    image: "assets/midoriaFighter.gif",
  },
  {
    name: "Miles",
    quirk: "Copy",
    damage: 5,
    health: 100,
    image: "assets/midoriaFighter.gif",
  },
  {
    name: "Savannah",
    quirk: "Fierce Wings",
    damage: 5,
    health: 50,
    image: "assets/midoriaFighter.gif",
  },
];

const boss = {
  health: 100,
  maxHealth: 100,
  damage: 5,
  level: 1,
  image: "assets/DabiVillan.gif",
};

// NOTE we are drawing all the heros to the page
function drawHero() {
  let heroTemplate = "";
  for (let key in heroes) {
    let hero = heroes[key];
    heroTemplate += `
    <div class="col-4">
      <div class="row">
        <div class="col-12">
          <p>${hero.name}</p>
        </div>
        <div class="col-12">
          <img class="img-fluid" src="${hero.image}" alt="">
        </div>
        <div class="col-4">
          <p>${hero.quirk}</p>
        </div>
        <div class="col-4">
          <p>${hero.damage}</p>
        </div>
        <div class="col-4">
          <p>${hero.health}</p>
        </div>
      </div> 
    </div>
    `;
    // @ts-ignore
    let heroElm = (document.getElementById("hero").innerHTML = heroTemplate);
  }
}
drawHero();

// NOTE we are drawing the boss to the page - boss is an object so we don't need to do any array methods. This can change to a forEach if we decide to add more bosses (will need to change the model to an array)
function drawBoss() {
  let bossTemplate = "";
  bossTemplate += `
    <div class="col-10" onclick="attackBoss()">
      <div class="row">
        <div class="col-4">
          <p>${boss.health}</p>
        </div>
        <div class="col-4">
          <p>${boss.level}</p>
        </div>
        <div class="col-4">
          <p>${boss.damage}</p>
        </div>
        <div class="col-12">
          <img class="img-fluid" src="${boss.image}" alt="">
        </div>
      </div>
    </div>`;
  // @ts-ignore
  let bossElm = (document.getElementById("boss").innerHTML = bossTemplate);
}
drawBoss();

// NOTE click on the boss to attack, boss health will go down by the total hero damage number. When boss health gets to 0, window alert that user beat the boss and will go to the next level. Boss maxHealth will go down by 5. Boss level will increase by 1, boss damage will double, boss health will increase 100 each level.
// TODO redraw the information to the page with innerText for boss
function attackBoss() {
  heroes.forEach((h) => (boss.health -= h.damage));
  // console.log(boss.health);
  if (boss.health == 0) {
    boss.maxHealth -= 5;
    // console.log("boss maxHealth -5", boss.maxHealth);
    window.alert("You beat the boss. On to the next level");
    boss.level++;
    // console.log("boss level increase", boss.level);
    boss.damage = boss.level * 2;
    // console.log("boss damage increase *2", boss.damage);
    boss.health = boss.level * 100;
    // console.log("boss health increases by 100 ", boss.health);
  }
}

// NOTE on a 3 (or 5) second interval the boss will do (passive) damage to the hero. Re-draw the hero to see the change in health
// TODO when all the heroes have health at 0, window alert or custom CSS, that the game is over
function bossDoesDamage() {
  for (let key in heroes) {
    let hero = heroes[key];
    hero.health -= boss.damage;
    // console.log("hero health decreasing on interval", hero.health);
    if (hero.health <= 0) {
      hero.health = 0;
    }
  }
  drawHero();
}
setInterval(bossDoesDamage, 3000);
