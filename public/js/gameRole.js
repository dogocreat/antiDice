const niuPoint = 10;

const winloseConvert = {
  "": "平手",
  true: "贏",
  false: "輸",
};

const giftConvert = {
  flower: "花",
  bear: "熊",
  love: "愛心",
  diamond: "鑽石",
};

const gitScoreConvert = {
  flower: 1000,
  bear: 3000,
  love: 5000,
  diamond: 10000,
};

/***
 * @param {int} times
 */
function rollDices(times) {
  var dices = [];
  for (let index = 0; index < times; index++) {
    dices.push(rollDice());
  }
  return dices;
}

function rollDice() {
  return Math.floor(Math.random() * 6) + 1;
}

/***
 * @param {Array} players
 * @param {Array} dices
 */
function gameRole(bankers, players) {
  var resultArea = document.getElementById("resultArea");
  resultArea.innerHTML = "";
  var dices = rollDices(3);
  // console.log(dices)
  players.forEach((player) => {
    player.mergeDices = mergePlayerDice(player.dices, dices);
    player.totalPoints = caluTotalPoints(player.mergeDices);
    if (checkHavePoint(player.mergeDices)) {
      player.havePoint = true;
      if (player.totalPoints % niuPoint == 0) {
        player.isNiu = true;
      } else {
        player.isNiu = false;
      }
      player.point = player.totalPoints % niuPoint;
    } else {
      player.havePoint = false;
      player.isNiu = false;
      player.point = 0;
    }
  });

  bankers.forEach((banker) => {
    banker.mergeDices = mergePlayerDice(banker.dices, dices);
    banker.totalPoints = caluTotalPoints(banker.mergeDices);
    banker.isNiu = false;
    if (checkHavePoint(banker.mergeDices)) {
      banker.havePoint = true;
      if (banker.totalPoints % niuPoint == 0) {
        banker.isNiu = true;
      }
      banker.point = banker.totalPoints % niuPoint;
    } else {
      banker.havePoint = false;
      banker.isNiu = false;
      banker.point = 0;
    }
  });

  // console.log(bankers);
  // console.log(players);
  // console.log(resultArea);
  var dicesResult = document.createElement("div");
  dicesResult.innerHTML = "開牌結果: ";
  for (let i = 0; i < dices.length; i++) {
    const dice = dices[i];
    dicesResult.innerHTML += convertDicePic(dice);
  }
  resultArea.appendChild(dicesResult);
  if (bankers.length > 0) {
    //result table start
    var table = document.createElement("table");
    table.className = "table";
    table.style = "width:100%;";
    var tr = document.createElement("tr");
    var th = document.createElement("th");
    th.innerHTML = "位";
    tr.appendChild(th);
    th = document.createElement("th");
    th.innerHTML = "玩家";
    tr.appendChild(th);
    th = document.createElement("th");
    th.style = "width: 40%";
    th.innerHTML = "猜骰";
    tr.appendChild(th);
    th = document.createElement("th");
    th.innerHTML = "點";
    tr.appendChild(th);
    // th = document.createElement("th");
    // th.innerHTML = "輸贏";
    // tr.appendChild(th);
    var thead = document.createElement("thead");
    thead.className = "thead-dark";
    thead.appendChild(tr);
    table.appendChild(thead);

    var banker = bankers[0];
    var tr = document.createElement("tr");
    var td = document.createElement("td");
    td.innerHTML = "莊";
    tr.appendChild(td);
    td = document.createElement("td");
    td.innerHTML = banker.name;
    tr.appendChild(td);
    td = document.createElement("td");
    for (let i = 0; i < banker.dices.length; i++) {
      const dice = banker.dices[i];
      td.innerHTML += convertDicePic(dice);
    }
    tr.appendChild(td);
    td = document.createElement("td");
    if (banker.isNiu) {
      td.innerHTML = "妞";
    } else {
      td.innerHTML = banker.point;
    }
    tr.appendChild(td);
    // td = document.createElement("td");
    // td.innerHTML = "";
    // tr.appendChild(td);
    table.appendChild(tr);

    console.log(banker);
    players.forEach((player) => {
      checkPlayerWinlose(banker, player);
      console.log(player);
      var tr = document.createElement("tr");
      var td = document.createElement("td");
      td.innerHTML = "閒";
      tr.appendChild(td);
      td = document.createElement("td");
      td.innerHTML = player.name;
      tr.appendChild(td);
      td = document.createElement("td");
      for (let i = 0; i < player.dices.length; i++) {
        const dice = player.dices[i];
        td.innerHTML += convertDicePic(dice);
      }
      tr.appendChild(td);
      td = document.createElement("td");
      if (player.isNiu) {
        td.innerHTML = "妞";
      } else {
        td.innerHTML = player.point;
      }
      tr.appendChild(td);

      //   td = document.createElement("td");
      //   td.innerHTML = winloseConvert[player.win];
      //   tr.appendChild(td);

      if (player.win == "true") {
        tr.className = "table-success";
      } else if (player.win == "false") {
        tr.className = "table-danger";
      } else {
        tr.className = "table-warning";
      }
      table.appendChild(tr);
    });
    resultArea.appendChild(table);
  }
}

/***
 * @param {Array} playersDice
 * @param {Array} dices
 */
function mergePlayerDice(playersDice, dices) {
  var totalDices = [];
  totalDices.push(playersDice[0]);
  totalDices.push(playersDice[1]);
  for (let i = 0; i < dices.length; i++) {
    const dice = dices[i];
    totalDices.push(dice);
  }
  return totalDices;
}

/***
 * @param {Array} playersDice
 */
function caluTotalPoints(playersDice) {
  var totalPoints = 0;
  for (let i = 0; i < playersDice.length; i++) {
    totalPoints += playersDice[i];
  }
  return totalPoints;
}

/***
 * @param {Array} playersDice
 */
function checkHavePoint(playersDice) {
  for (let i = 0; i < playersDice.length; i++) {
    for (let j = i + 1; j < playersDice.length; j++) {
      for (let k = j + 1; k < playersDice.length; k++) {
        // console.log(i, j, k);
        if (playersDice[i] + playersDice[j] + playersDice[k] == niuPoint) {
          return true;
        }
      }
    }
  }
  return false;
}
/***
 * 莊妞>閒妞>點大的贏
 * 莊妞通殺
 * 莊閒平手-莊殺
 *
 * @param {any} banker
 * @param {any} player
 */
function checkPlayerWinlose(banker, player) {
  player.win = "";
  banker.winCnt = 0;

  //都沒點
  if (!banker.havePoint && !player.havePoint) {
    return;
  }

  // 莊妞 通殺
  if (banker.isNiu) {
    player.win = "false";
    banker.winCnt = banker.winCnt + 1;
    return;
  }

  // 莊有點 閒沒點
  if (banker.havePoint && !player.havePoint) {
    player.win = "false";
    banker.winCnt = banker.winCnt + 1;
    return;
  }
  // 閒有點 莊沒點
  if (!banker.havePoint && player.havePoint) {
    player.win = "true";
    return;
  }

  // 閒妞
  if (player.isNiu) {
    player.win = "true";
    return;
  }

  // 點大的贏
  if (player.point > banker.point) {
    player.win = "true";
    return;
  } else if (player.point <= banker.point) {
    banker.winCnt = banker.winCnt + 1;
    player.win = "false";
    return;
  }
}

function convertDicePic(point) {
  switch (point) {
    case 1:
      return "<img src='./img/dice1.png' width='50px' height='50px'>";
    case 2:
      return "<img src='./img/dice2.png' width='50px' height='50px'>";
    case 3:
      return "<img src='./img/dice3.png' width='50px' height='50px'>";
    case 4:
      return "<img src='./img/dice4.png' width='50px' height='50px'>";
    case 5:
      return "<img src='./img/dice5.png' width='50px' height='50px'>";
    case 6:
      return "<img src='./img/dice6.png' width='50px' height='50px'>";
    default:
      return "";
  }
}

function createGiftSelect() {
  var select = document.createElement("select");
  select.setAttribute("class", "form-select form-select-sm");
  select.multiple = true;
  for (const key in giftConvert) {
    var option = document.createElement("option");
    option.value = key;
    option.innerHTML = giftConvert[key];
    select.appendChild(option);
  }
  return select;
}
