const drills = {
  closeControl: { label: "Close control", 10: ["Wall passes", "100 reps, one and two touch. Cushion the ball away from your feet, don't just stop it dead."], 20: ["Cone weave", "8-10 cones, 1 yard apart, both feet, 10 reps each direction. Ball stays within one step of you."], 30: ["Full circuit", "Wall passes (10) + cone weave (10) + receive-and-turn reps off a wall, back to target (10)."] },
  shooting: { label: "Shooting", 10: ["Target shots", "20 shots on target from the box, alternating feet. Placement over power."], 20: ["Dribble to finish", "Approach from 20 yards at speed, one touch to set, shoot. 15 reps."], 30: ["Full circuit", "Both-feet finishing (10) + first-time finishing off a served ball (10) + finishing under fatigue (10)."] },
  passing: { label: "Passing", 10: ["Wall passing", "100 reps, both feet. Focus on the weight of the pass and a clean first touch."], 20: ["Long-range passing", "20-30 yard driven passes to a fixed target, both feet, 20 reps."], 30: ["Full circuit", "One-touch wall combos (10) + long diagonal switches (10) + passing under time pressure (10)."] },
  oneVOne: { label: "1v1s", 10: ["Attacking moves", "2-3 go-to moves vs a cone defender, 10 reps each move."], 20: ["Defending footwork", "15 min shadow defending, stay goal-side, low stance + 5 min attacking moves."], 30: ["Live 1v1s", "5-minute rounds vs a teammate, alternating attack and defend."] },
  heading: { label: "Heading", 10: ["Self-toss headers", "30 reps into open space or a wall. Contact point is the forehead."], 20: ["Directional headers", "Partner-tossed, aim left/right/down on command, 20 reps each side."], 30: ["Full circuit", "Directional headers (10) + defensive clearing headers (10) + attacking headers off a cross (10)."] },
  fitness: { label: "Fitness", 10: ["Sprint intervals", "10x 20m sprints, 20 sec rest between."], 20: ["Agility + sprints", "Agility ladder work combined with sprint intervals."], 30: ["Match circuit", "Sprints, agility ladder, and core work built to mimic match-intensity bursts."] }
};

let selectedFocus = null;
let selectedMin = null;

const nameScreen = document.getElementById('nameScreen');
const mainScreen = document.getElementById('mainScreen');
const nameInput = document.getElementById('nameInput');
const nameError = document.getElementById('nameError');
const nameSubmit = document.getElementById('nameSubmit');
const greeting = document.getElementById('greeting');

const focusGrid = document.getElementById('focusGrid');
const minutePills = document.getElementById('minutePills');
const errorEl = document.getElementById('error');
const submitBtn = document.getElementById('submit');
const resultCard = document.getElementById('resultCard');
const doneBtn = document.getElementById('doneBtn');

// --- Name gate ---
// Every localStorage key below gets prefixed with the user's name, so if this
// ever runs on a shared device, two people's streaks/sessions don't collide.
function getUserName() {
  return localStorage.getItem('futai_userName');
}

function userKey(base) {
  return `futai_${getUserName()}_${base}`;
}

function showMainScreen() {
  nameScreen.style.display = 'none';
  mainScreen.style.display = 'block';
  greeting.textContent = `Hey ${getUserName()}, today's session`;
  loadStreak();
}

function showNameScreen() {
  nameScreen.style.display = 'flex';
  mainScreen.style.display = 'none';
}

nameSubmit.addEventListener('click', () => {
  const name = nameInput.value.trim();
  if (!name) {
    nameError.textContent = 'Enter your name first.';
    return;
  }
  nameError.textContent = '';
  localStorage.setItem('futai_userName', name);
  showMainScreen();
});

// Also submit on Enter key, since typing then hunting for the button is friction
nameInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') nameSubmit.click();
});

if (getUserName()) {
  showMainScreen();
} else {
  showNameScreen();
}

// --- Focus / minutes / drill selection ---
focusGrid.addEventListener('click', (e) => {
  const btn = e.target.closest('.focus-chip');
  if (!btn) return;
  selectedFocus = btn.dataset.focus;
  [...focusGrid.children].forEach(b => b.classList.remove('selected'));
  btn.classList.add('selected');
});

minutePills.addEventListener('click', (e) => {
  const btn = e.target.closest('button');
  if (!btn) return;
  selectedMin = btn.dataset.min;
  [...minutePills.children].forEach(b => b.classList.remove('selected'));
  btn.classList.add('selected');
});

submitBtn.addEventListener('click', () => {
  if (!selectedFocus) {
    errorEl.textContent = 'Select a focus area first.';
    return;
  }
  if (!selectedMin) {
    errorEl.textContent = 'Pick your minutes for today.';
    return;
  }
  errorEl.textContent = '';

  const d = drills[selectedFocus];
  const [title, desc] = d[selectedMin];
  document.getElementById('resultMeta').textContent = d.label + ' — ' + selectedMin + ' min';
  document.getElementById('resultTitle').textContent = title;
  document.getElementById('resultDesc').textContent = desc;
  resultCard.style.display = 'block';
  doneBtn.classList.remove('done');
  doneBtn.textContent = 'Mark done';
  resultCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
});

doneBtn.addEventListener('click', () => {
  if (doneBtn.classList.contains('done')) return;
  doneBtn.classList.add('done');
  doneBtn.textContent = 'Done for today';
  incrementStreakIfNewDay();
});

// --- Streak tracking (per-user via userKey) ---
function todayKey() {
  return new Date().toISOString().slice(0, 10);
}

function incrementStreakIfNewDay() {
  const lastDone = localStorage.getItem(userKey('lastDoneDate'));
  const today = todayKey();
  if (lastDone === today) return;

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const wasYesterday = lastDone === yesterday.toISOString().slice(0, 10);

  let streak = parseInt(localStorage.getItem(userKey('streak')) || '0', 10);
  streak = wasYesterday ? streak + 1 : 1;

  localStorage.setItem(userKey('streak'), String(streak));
  localStorage.setItem(userKey('lastDoneDate'), today);
  document.getElementById('streakCount').textContent = streak;
}

function loadStreak() {
  const lastDone = localStorage.getItem(userKey('lastDoneDate'));
  const today = todayKey();
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const wasYesterday = lastDone === yesterday.toISOString().slice(0, 10);
  let streak = parseInt(localStorage.getItem(userKey('streak')) || '0', 10);

  if (lastDone && lastDone !== today && !wasYesterday) {
    streak = 0;
    localStorage.setItem(userKey('streak'), '0');
  }
  document.getElementById('streakCount').textContent = streak;
}
