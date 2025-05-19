window.renderMinesweeperContent = function() {
  return `
    <div class="minesweeper-gnome">
      <div class="minesweeper-header">
        <span>Сапер</span>
        <select id="minesweeper-diff" class="btn">
          <option value="9x9x10">Лёгко</option>
          <option value="16x16x40">Средне</option>
          <option value="30x16x99">Сложно</option>
        </select>
        <span id="minesweeper-timer">00:00</span>
        <button class="btn" id="minesweeper-restart">⟳</button>
      </div>
      <div id="minesweeper-board"></div>
      <div class="minesweeper-footer">
        <span id="minesweeper-status"></span>
      </div>
    </div>
  `;
};

window.initMinesweeper = function() {
  let size = 9, mines = 10, width = 9, height = 9;
  let board = [], opened = [], flagged = [], gameOver = false, cellsLeft = width*height-mines, timer = 0, timerInt = null, started = false;
  const boardDiv = document.getElementById('minesweeper-board');
  const status = document.getElementById('minesweeper-status');
  const timerSpan = document.getElementById('minesweeper-timer');
  const diffSel = document.getElementById('minesweeper-diff');
  function setGrid() {
    boardDiv.style.gridTemplateColumns = `repeat(${width},32px)`;
  }
  function placeMines() {
    board = Array(width*height).fill(0);
    let m = 0;
    while (m < mines) {
      let idx = Math.floor(Math.random()*width*height);
      if (board[idx] === 'M') continue;
      board[idx] = 'M'; m++;
    }
    for (let i=0;i<width*height;i++) {
      if (board[i] === 'M') continue;
      let n = 0;
      for (let dx=-1;dx<=1;dx++) for (let dy=-1;dy<=1;dy++) {
        if (dx===0&&dy===0) continue;
        let x=i%width+dx, y=Math.floor(i/width)+dy;
        if (x>=0&&x<width&&y>=0&&y<height&&board[y*width+x]==='M') n++;
      }
      board[i]=n;
    }
  }
  function render() {
    boardDiv.innerHTML = '';
    setGrid();
    for (let i=0;i<width*height;i++) {
      const cell = document.createElement('div');
      cell.className = 'minesweeper-cell';
      if (opened[i]) {
        cell.classList.add('open');
        if (board[i]==='M') cell.classList.add('mine'), cell.textContent='💣';
        else if (board[i]>0) cell.classList.add('num'+board[i]), cell.textContent=board[i];
      } else if (flagged[i]) {
        cell.classList.add('flag');
      }
      cell.onmousedown = (e) => {
        e.preventDefault();
        if (gameOver || opened[i]) return;
        if (e.button === 2) { // ПКМ
          flagged[i] = !flagged[i];
          render();
          return;
        }
        if (!started) startTimer();
        openCell(i);
      };
      cell.oncontextmenu = e => e.preventDefault();
      boardDiv.appendChild(cell);
    }
  }
  function openCell(i) {
    if (opened[i] || flagged[i]) return;
    opened[i]=1;
    if (board[i]==='M') {
      gameOver = true;
      stopTimer();
      status.textContent = '💥 Вы проиграли!';
      for (let j=0;j<width*height;j++) if (board[j]==='M') opened[j]=1;
      render();
      return;
    }
    cellsLeft--;
    if (board[i]===0) {
      let x=i%width, y=Math.floor(i/width);
      for (let dx=-1;dx<=1;dx++) for (let dy=-1;dy<=1;dy++) {
        let nx=x+dx, ny=y+dy, ni=ny*width+nx;
        if (nx>=0&&nx<width&&ny>=0&&ny<height&&!opened[ni]) openCell(ni);
      }
    }
    render();
    if (cellsLeft===0) {
      status.textContent = '🎉 Победа!';
      stopTimer();
      gameOver = true;
    }
  }
  function restart() {
    let val = diffSel.value.split('x');
    width = +val[0]; height = +val[1]; mines = +val[2];
    opened = Array(width*height).fill(0);
    flagged = Array(width*height).fill(0);
    gameOver = false;
    cellsLeft = width*height-mines;
    status.textContent = '';
    timer = 0; started = false;
    stopTimer(); updateTimer();
    placeMines();
    render();
  }
  function updateTimer() {
    timerSpan.textContent = (timer<6000?`${String(Math.floor(timer/60)).padStart(2,'0')}:${String(timer%60).padStart(2,'0')}`:'99:59');
  }
  function startTimer() {
    if (timerInt) return;
    started = true;
    timerInt = setInterval(() => {
      timer++; updateTimer();
      if (timer>=5999) stopTimer();
    }, 1000);
  }
  function stopTimer() {
    clearInterval(timerInt); timerInt = null;
  }
  document.getElementById('minesweeper-restart').onclick = restart;
  diffSel.onchange = restart;
  restart();
};

window.render2048Content = function() {
  return `
    <div class="game2048-gnome">
      <div class="game2048-header">
        <span>2048</span>
        <select id="game2048-size" class="btn">
          <option value="4">4x4</option>
          <option value="5">5x5</option>
          <option value="6">6x6</option>
        </select>
        <button class="btn" id="game2048-restart">⟳</button>
      </div>
      <div id="game2048-board"></div>
      <div class="game2048-footer">
        <span>Счёт: <span id="game2048-score">0</span></span>
      </div>
      <div>Управление: стрелки или кнопки</div>
      <div class="game2048-controls">
        <button class="btn" data-move="up">↑</button>
        <button class="btn" data-move="left">←</button>
        <button class="btn" data-move="down">↓</button>
        <button class="btn" data-move="right">→</button>
      </div>
    </div>
  `;
};
window.init2048 = function() {
  let size = 4;
  let board = [], score = 0, won = false, anim = [];
  const boardDiv = document.getElementById('game2048-board');
  const scoreSpan = document.getElementById('game2048-score');
  const sizeSel = document.getElementById('game2048-size');
  function setGrid() {
    boardDiv.style.gridTemplateColumns = `repeat(${size},56px)`;
  }
  function addTile() {
    let empty = [];
    for (let i=0;i<size*size;i++) if (!board[i]) empty.push(i);
    if (empty.length) {
      let idx = empty[Math.floor(Math.random()*empty.length)];
      board[idx] = Math.random()<0.9?2:4;
      anim[idx] = 'new';
    }
  }
  function render() {
    boardDiv.innerHTML = '';
    setGrid();
    for (let i=0;i<size*size;i++) {
      const cell = document.createElement('div');
      cell.className = 'game2048-cell';
      if (board[i]) {
        cell.textContent = board[i];
        cell.setAttribute('data-v', board[i]);
        if (anim[i]) cell.classList.add(anim[i]);
      }
      boardDiv.appendChild(cell);
    }
    scoreSpan.textContent = score;
    anim = [];
  }
  function move(dir) {
    let moved = false;
    let b = board.slice(), a = [];
    function idx(x,y){return y*size+x;}
    for (let n=0;n<size;n++) {
      let line = [];
      for (let m=0;m<size;m++) {
        let i = dir==='left'||dir==='right'?idx(dir==='left'?m:size-1-m,n):idx(n,dir==='up'?m:size-1-m);
        if (b[i]) line.push(b[i]);
      }
      for (let k=0;k<line.length-1;k++) {
        if (line[k]===line[k+1]) { line[k]*=2; score+=line[k]; line[k+1]=0; a[dir==='left'||dir==='right'?idx(dir==='left'?k:size-1-k,n):idx(n,dir==='up'?k:size-1-k)]='merged'; }
      }
      line = line.filter(x=>x);
      while (line.length<size) line.push(0);
      for (let m=0;m<size;m++) {
        let i = dir==='left'||dir==='right'?idx(dir==='left'?m:size-1-m,n):idx(n,dir==='up'?m:size-1-m);
        if (b[i]!==line[m]) { b[i]=line[m]; moved=true; }
      }
    }
    if (moved) {
      board = b; anim = a;
      addTile();
      render();
      if (board.includes(2048) && !won) { won=true; setTimeout(()=>alert('🎉 Победа!'),100);}
      if (!canMove()) setTimeout(()=>alert('Игра окончена!'),100);
    }
  }
  function canMove() {
    for (let i=0;i<size*size;i++) if (!board[i]) return true;
    for (let y=0;y<size;y++) for (let x=0;x<size;x++) {
      let v=board[y*size+x];
      if (x<size-1&&v===board[y*size+x+1]) return true;
      if (y<size-1&&v===board[(y+1)*size+x]) return true;
    }
    return false;
  }
  function restart() {
    size = +sizeSel.value;
    board = Array(size*size).fill(0); score=0; won=false; anim=[];
    addTile(); addTile();
    render();
  }
  document.getElementById('game2048-restart').onclick = restart;
  sizeSel.onchange = restart;
  document.querySelectorAll('.game2048-controls .btn').forEach(btn=>{
    btn.onclick = ()=>move(btn.dataset.move);
  });
  window.addEventListener('keydown', function handler(e) {
    if (!document.getElementById('game2048-board')) return window.removeEventListener('keydown', handler);
    if (['ArrowUp','ArrowDown','ArrowLeft','ArrowRight'].includes(e.key)) {
      move({ArrowUp:'up',ArrowDown:'down',ArrowLeft:'left',ArrowRight:'right'}[e.key]);
      e.preventDefault();
    }
  });
  restart();
};

window.renderTicTacToeContent = function() {
  return `
    <div class="tictactoe-gnome">
      <div class="tictactoe-header">
        <span>Крестики-нолики</span>
        <button class="btn" id="tictactoe-restart">⟳</button>
      </div>
      <div id="tictactoe-board"></div>
      <div class="tictactoe-footer">
        <span id="tictactoe-status"></span>
      </div>
    </div>
  `;
};
window.initTicTacToe = function() {
  let board = Array(9).fill(''), turn = 'X', gameOver = false;
  const boardDiv = document.getElementById('tictactoe-board');
  const status = document.getElementById('tictactoe-status');
  function render() {
    boardDiv.innerHTML = '';
    for (let i=0;i<9;i++) {
      const cell = document.createElement('div');
      cell.className = 'tictactoe-cell';
      if (board[i]) cell.classList.add(board[i].toLowerCase()), cell.textContent=board[i];
      cell.onclick = () => {
        if (gameOver || board[i]) return;
        board[i]=turn;
        render();
        if (checkWin(turn)) {
          status.textContent = (turn==='X'?'Вы':'Компьютер')+' победил!';
          gameOver = true;
          highlightWin(checkWin(turn));
          return;
        }
        if (board.every(x=>x)) { status.textContent='Ничья!'; gameOver=true; return; }
        turn = turn==='X'?'O':'X';
        if (turn==='O') setTimeout(aiMove, 400);
      };
      boardDiv.appendChild(cell);
    }
    status.textContent = gameOver ? status.textContent : (turn==='X'?'Ваш ход':'Ход компьютера');
  }
  function checkWin(t) {
    const wins = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
    for (let w of wins) if (w.every(i=>board[i]===t)) return w;
    return null;
  }
  function highlightWin(w) {
    if (!w) return;
    const cells = boardDiv.querySelectorAll('.tictactoe-cell');
    w.forEach(i=>cells[i].classList.add('win'));
  }
  function aiMove() {
    let empty = board.map((v,i)=>v?'':i).filter(x=>x!==''), idx;
    if (empty.length) {
      idx = empty[Math.floor(Math.random()*empty.length)];
      board[idx]='O';
      render();
      if (checkWin('O')) {
        status.textContent = 'Компьютер победил!';
        gameOver = true;
        highlightWin(checkWin('O'));
      }
      if (board.every(x=>x) && !gameOver) { status.textContent='Ничья!'; gameOver=true; }
      turn = 'X';
    }
  }
  function restart() {
    board = Array(9).fill(''); turn='X'; gameOver=false; status.textContent=''; render();
  }
  document.getElementById('tictactoe-restart').onclick = restart;
  restart();
};
