function add(buttonId, maxValue) {
    const button = document.getElementById(buttonId);
    const skillTotal = document.getElementById('skill_total');

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
    const skillTotal = document.getElementById('skill_total');

    let currentValue = Number(button.innerText) || 0;

    if (currentValue > 0) {
        button.innerText = currentValue - 1;
        skillTotal.value = Number(skillTotal.value) + 1;
    }
}

function lock() {
    const skillTotal = document.getElementById('skill_total');
    const btnSet = document.getElementById('btn_set');

    if (btnSet.value === "SET") {
        if (!skillTotal.value || Number(skillTotal.value) <= 0) {
            alert("Enter a valid total skill points first!");
            return;
        }
        skillTotal.disabled = true;
        btnSet.value = "UNLOCK";
    } else {
        skillTotal.disabled = false;
        btnSet.value = "SET";
    }
}

function reset() {
    // reset all skill values
    document.querySelectorAll(".btn").forEach(button => button.innerText = "0");

    // reset total skill points
    const skillTotal = document.getElementById('skill_total');
    skillTotal.value = "0";
    skillTotal.disabled = false;

    // reset set/unlock button
    const btnSet = document.getElementById('btn_set');
    btnSet.value = "SET";
}
