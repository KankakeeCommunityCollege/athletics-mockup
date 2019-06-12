const camelCaseMe = require('./camelCase.js');
// Creates Bootstrap 4 tabed naviation w/ content from the JSON feed of a google sheet

function createTabs(json, ul) {
  let tabTitle = json.feed.title['$t'];
  let tabTarget = camelCaseMe(tabTitle);
  const li = document.createElement('li');
  const a = document.createElement('a');
  li.classList.add('nav-item');
  a.innerHTML = tabTitle;
  a.classList.add('nav-link');
  a.setAttribute('id', tabTarget + '-tab');
  a.setAttribute('data-toggle', 'tab');
  a.setAttribute('href', '#' + tabTarget);
  a.setAttribute('role', 'tab');
  a.setAttribute('aria-controls', tabTarget);
  a.setAttribute('aria-selected', 'false');
  li.appendChild(a);
  return ul.appendChild(li);
}
module.exports = createTabs;
