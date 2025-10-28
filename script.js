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
  document.querySelectorAll("span[id^='skill']").forEach(span => {
    span.innerText = "0";
  });

  const skillTotal = document.getElementById("skill_total");
  skillTotal.value = "0";
  skillTotal.disabled = false;

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

    if (img) {
      img.src = skill.image;
      img.alt = skillId;
      img.title = skill.tooltip;
    }

    if (maxSpan) maxSpan.textContent = `/${skill.max}`;
    if (valueSpan) valueSpan.textContent = 0;
    if (addBtn) addBtn.setAttribute("onclick", `add('${skillId}', ${skill.max})`);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  // 🔍 Detect current page name
  const path = window.location.pathname;
  const page = path.split("/").pop() || "index.html";
  let jsonFile = "";

  // 🧠 Determine which JSON to load
  if (page === "index.html" || page.includes("engineer")) {
    jsonFile = "engineerskills.json";
    console.log("✅ Loaded Engineer Skills JSON");
  } else if (page.includes("warleader")) {
    jsonFile = "warleaderskills.json";
    console.log("✅ Loaded Warleader Skills JSON");
  } else {
    console.error("❌ Unknown page: cannot determine which JSON to load.", path);
    return;
  }

  // 📥 Fetch correct JSON file
  fetch(jsonFile)
    .then(response => response.json())
    .then(skillData => {
      populateTableFromJSON(skillData);

      const level1Row = document.querySelector('[data-level="1"]');
      if (level1Row) {
        setTimeout(() => {
          level1Row.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 500);
      }
    })
    .catch(err => console.error("Error loading skillData:", err));
});
