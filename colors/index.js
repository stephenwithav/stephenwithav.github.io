// Combinate returns an array of objects. Each item in the array is a unique
// combination of the keys/values.
function combinate(obj) {
  let combos = [];
  for (var key in obj) {
    const values = obj[key];
    const all = [];
    for (let i = 0; i < values.length; i++) {
      for (let j = 0; j < (combos.length || 1); j++) {
        const newCombo = { ...combos[j], [key]: values[i] };
        all.push(newCombo);
      }
    }
    combos = all;
  }
  return combos;
}

function generateCombos() {
  let textareaValue = document.getElementById(`colors`).value;
  let colors = textareaValue.split("\n").map(el => el.trim());
  let colorCombos = combinate({
    background: colors,
    color: colors,
    accent: colors
  });

  let div = document.createElement(`div`);
  div.className = `container`;
  let rowDiv = document.createElement(`div`);
  rowDiv.className = `row`

  colorCombos.forEach(colors => {
    let innerDiv = document.createElement(`div`);
    innerDiv.className = `col-4`;
    innerDiv.style.background = colors.background;
    innerDiv.style.color = colors.color;
    innerDiv.style.marginBottom = '0.25em';
    innerDiv.onclick = () => navigator.clipboard.writeText(`background: ${colors.background};
color: ${colors.color};
accent: ${colors.accent};`);
    innerDiv.innerHTML = `
<h4 class="p-3">Header!</h4>
<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
<span class="btn" style="background: ${colors.accent};">Accent</span>
`;
    rowDiv.appendChild(innerDiv);
  });

  div.appendChild(rowDiv);
  let oldPreviews = document.getElementById(`previews`).firstChild;
  document.getElementById(`previews`).replaceChild(div, oldPreviews);
}
