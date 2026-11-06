const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');
menuToggle.addEventListener('click', () => navMenu.classList.toggle('open'));
navMenu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => navMenu.classList.remove('open')));

const form = document.getElementById('commentForm');
const commentsList = document.getElementById('commentsList');
const STORAGE_KEY = 'jhons-personal-website-comments';

function getComments() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'); }
  catch { return []; }
}
function renderComments() {
  commentsList.innerHTML = '';
  getComments().slice().reverse().forEach(item => {
    const card = document.createElement('article');
    card.className = 'comment';
    const name = document.createElement('strong');
    name.textContent = item.name;
    const message = document.createElement('p');
    message.textContent = item.message;
    card.append(name, message);
    commentsList.append(card);
  });
}
form.addEventListener('submit', event => {
  event.preventDefault();
  const name = document.getElementById('visitorName').value.trim();
  const message = document.getElementById('visitorMessage').value.trim();
  if (!name || !message) return;
  const comments = getComments();
  comments.push({ name, message, date: new Date().toISOString() });
  localStorage.setItem(STORAGE_KEY, JSON.stringify(comments.slice(-30)));
  form.reset();
  renderComments();
});
renderComments();
