const form = document.getElementById('loginForm');
const message = document.getElementById('message');
const btn = document.getElementById('submitBtn');
const password = document.getElementById('password');
const toggle = document.getElementById('toggle');

// Front-end-only demonstration login.
// Reads data/users.txt when served from a local web server.
// Fallback credentials keep the demo usable when the TXT file cannot be fetched
// (for example, when login.html is opened directly with file://).
const fallbackUsers = [
  { username: 'admin', password: 'admin123', name: 'ESSU Administrator' },
  { username: 'testuser', password: 'User@12345', name: 'Test User' }
];

function showMessage(text, type = 'error') {
  message.textContent = text;
  message.className = 'message' + (text ? ` ${type}` : '');
}

async function loadUsers() {
  try {
    const response = await fetch('./data/users.txt', { cache: 'no-store' });
    if (!response.ok) throw new Error('Could not read users.txt');

    const text = await response.text();
    const users = text
      .split(/\r?\n/)
      .map(line => line.trim())
      .filter(Boolean)
      .map(line => {
        const parts = line.split('|');
        return {
          username: parts[1] || '',
          // The TXT file can contain demo/plain-text passwords in the 3rd field.
          // Original PHP bcrypt hashes are intentionally not used by this
          // HTML/CSS/JS-only version because browsers cannot verify bcrypt
          // without a third-party library.
          password: parts[2] || '',
          name: parts[3] || parts[1] || 'ESSU User'
        };
      })
      .filter(user => user.username && user.password);

    return users.length ? users : fallbackUsers;
  } catch {
    return fallbackUsers;
  }
}

toggle.addEventListener('click', () => {
  const show = password.type === 'password';
  password.type = show ? 'text' : 'password';
  toggle.textContent = show ? '◉' : '◌';
  toggle.setAttribute('aria-label', show ? 'Hide password' : 'Show password');
});

form.addEventListener('submit', async event => {
  event.preventDefault();
  showMessage('');

  const username = document.getElementById('username').value.trim();
  const pwd = password.value;

  if (!username || !pwd) {
    showMessage('Username and password are required.');
    return;
  }

  btn.disabled = true;
  btn.textContent = 'Signing In...';

  try {
    const users = await loadUsers();
    const user = users.find(
      account => account.username.toLowerCase() === username.toLowerCase() && account.password === pwd
    );

    if (!user) {
      showMessage('Invalid username or password.');
      return;
    }

    showMessage(`Login successful. Welcome, ${user.name}.`, 'success');
  } finally {
    btn.disabled = false;
    btn.textContent = 'Sign In';
  }
});
