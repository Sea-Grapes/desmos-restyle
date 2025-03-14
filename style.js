// ==UserScript==
// @name         Desmos restyle
// @version      2025-03-14
// @description  Better styling for Desmos scientific
// @author       Sea Grapes
// @match        *://*.desmos.com/scientific
// @icon         https://www.desmos.com/assets/img/apps/scientific/favicon.ico
// ==/UserScript==

console.log('Desmos restyle')

const style = document.createElement('style')
style.innerHTML = `
:root {
  --spacing: .25rem;
}

#restyle {

  display: inline-flex;
  gap: 1em;
  padding-right: 1em;
  align-items: center;

  input[type='checkbox'] {
    /* display: none; */
    width: 0;
    height: 0;
    position: absolute;
  }

  .toggle {
    width: calc(var(--spacing) * 9);
    height: calc(var(--spacing)* 5);
    background-color: #e5e7eb;
    border-radius: 20px;
    position: relative;
    cursor: pointer;
  }

  .toggle::after {
    content: '';
    transition: 0.15s cubic-bezier(.4, 0, .2, 1);
    background-color: white;
    border-radius: 20px;
    width: calc(var(--spacing) * 4);
    height: calc(var(--spacing) * 4);
    position: absolute;
    top: 2px;
    inset-inline-start: 2px;
  }


  :focus-within + .toggle {
    box-shadow: 0 0 0 2px #93c5fd;
  }

  input:checked + .toggle {
    background-color: #2563eb;
  }

  input:checked + .toggle::after {
    translate: 100% 0;
  }
}

html[restyle-active] {
  #main-container > div {
    display: flex;
    flex-direction: column;
    height: 100vh;
  }

  .dcg-basic-calculator-footer {
    display: none;
  }

  @media (width >= 64rem) {
    #main {
      padding: 1em;
    }
  }

  #main {
    position: unset !important;
    width: 100% !important;
    max-width: 1024px;
    flex-grow: 1;
    margin: 0 auto !important;
  }


  .dcg-basic-keypad-container, .dcg-keypad-control-bar {
    display: flex;
    justify-content: center;

    > div {
      width: 600px;
    }
  }

  .dcg-basic-expression:not(:last-of-type) {
    min-height: unset !important;

    .dcg-math-field {
      padding: 0.5em !important;
    }
  }

}
`
document.head.append(style)

const html = document.documentElement
html.setAttribute('restyle-active', '')


function build(parent, type, call) {
  const res = document.createElement(type)
  parent.append(res)
  if (call) call(res)
  return res
}


document.addEventListener('DOMContentLoaded', () => {


const header = document.querySelector('.dcg-header-right-content')

const menuItem = document.createElement('label')
menuItem.id = 'restyle'
header.prepend(menuItem)

menuItem.innerHTML = `
<input type='checkbox'>
<div class='toggle'></div>
<span>Restyle</span>
`.trim()


const toggle = document.querySelector('#restyle > input')
let checked = localStorage.getItem('restyleActive') || true
toggle.checked = checked
toggle.addEventListener('change', e => {
  checked = !checked
  if (!checked) html.removeAttribute('restyle-active')
  else html.setAttribute('restyle-active', '')
  localStorage.setItem('restyleActive', checked)
})

})

