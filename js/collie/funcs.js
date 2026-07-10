function createElement(element, className) {
  const el = document.createElement(element);
  if (className) el.classList.add(className);
  return el;
};
window.cE = createElement;


function setHTML(variable, html) {
  return variable.innerHTML = html;
};
window.sH = setHTML;


function targetElement(selector, context = document) {
  const el = context.querySelector(selector);
  if (!el) {
    console.warn(`No element found for selector: ${selector}`);
  }
  return el;
};
window.tE = targetElement;


function targetElements(selector, context = document) {
  const el = context.querySelectorAll(selector);
  if (!el) {
    console.warn(`No elements found for selector: ${selector}`);
  }
  return el;
};
window.tEs = targetElements;


function renderIf(condition, html) {
  return condition ? html : '';
};
window.renderIf = renderIf;


function renderList(array, fn) {
  return array.map(fn).join('');
};
window.renderList = renderList;


function addEvent(el, event, fn) {
  el.addEventListener(event, fn);
};
window.addEvent = addEvent;


function createState(initial) {
  let value = initial;
  return {
    get: () => value,
    set: (newVal, callback) => {
      value = newVal;
      if (callback) callback(value);
    }
  }
};
window.createState = createState;
