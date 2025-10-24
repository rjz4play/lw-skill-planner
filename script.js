function add(buttonId, maxValue) {
  const button = document.getElementById(buttonId);
  const skillTotal = document.getElementById("skill_total");

  let currentSkillTotal = Number(skillTotal.value);
  let currentValue = Number(button.innerText) || 0;

  if (currentSkillTotal <= 0) return; // cannot add if no points left
  if (currentValue < maxValue) {
    button.innerText = currentValue + 1;
    skillTotal.value = currentSkillTotal - 1;
  }
}

function subtract(buttonId) {
  const button = document.getElementById(buttonId);
  const skillTotal = document.getElementById("skill_total");

  let currentValue = Number(button.innerText) || 0;

  if (currentValue > 0) {
    button.innerText = currentValue - 1;
    skillTotal.value = Number(skillTotal.value) + 1;
  }
}

function lock() {
  const skillTotal = document.getElementById("skill_total");
  const btnSet = document.getElementById("btn_set");

  if (btnSet.value === "SET") {
    if (!skillTotal.value || Number(skillTotal.value) <= 0) {
      alert("Enter a valid total skill points first!");
      return;
    }
    skillTotal.disabled = true;
    btnSet.value = "UNLOCK";
    btnSet.innerText = "UNLOCK";
  } else {
    skillTotal.disabled = false;
    btnSet.value = "SET";
    btnSet.innerText = "SET";
  }
}

function reset() {
  // ✅ Reset only numeric skill counters (not the control buttons)
  document.querySelectorAll("span[id^='skill']").forEach(span => {
    span.innerText = "0";
  });

  // ✅ Reset total skill points
  const skillTotal = document.getElementById("skill_total");
  skillTotal.value = "0";
  skillTotal.disabled = false;

  // ✅ Restore Set button text
  const btnSet = document.getElementById("btn_set");
  btnSet.value = "SET";
  btnSet.innerText = "SET";
}

function populateTableFromJSON(data) {
  Object.keys(data).forEach(skillId => {
    const td = document.querySelector(`td[data-skill='${skillId}']`);
    if (!td) return;

    const skill = data[skillId];
    const img = td.querySelector("img");
    const maxSpan = td.querySelector(".max");
    const valueSpan = td.querySelector("span.btn");
    const addBtn = td.querySelector("button[onclick^='add']");

    // Set image src and tooltip
    if (img) {
      img.src = skill.image;
      img.alt = skillId;
      img.title = skill.tooltip;
    }

    // Set max value
    if (maxSpan) maxSpan.textContent = `/${skill.max}`;

    // Reset displayed value
    if (valueSpan) valueSpan.textContent = 0;

    // Update add button max
    if (addBtn) addBtn.setAttribute("onclick", `add('${skillId}', ${skill.max})`);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  fetch("skills.json")
    .then(response => response.json())
    .then(skillData => populateTableFromJSON(skillData))
    .catch(err => console.error("Error loading skillData:", err));
	
	const level1Row = document.querySelector('[data-level="1"]');
      if (level1Row) {
        // Give it a short delay to ensure rendering completes
        setTimeout(() => {
          level1Row.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 500);
      }
    })
    .catch(err => console.error("Error loading skillData:", err));
});


