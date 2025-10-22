<script>
			window.onload = function() {
				window.scrollTo(0, document.body.scrollHeight);
			};
			
            function add(buttonId, maxValue) {
                const button = document.getElementById(buttonId);
                const skillTotal = document.getElementById('skill_total');

                let currentSkillTotal = Number(skillTotal.value);
                let currentValue = Number(button.innerText) || 0;

                if (currentSkillTotal > 0 && currentValue < maxValue) {
                    button.innerText = currentValue + 1;
                    skillTotal.value = currentSkillTotal - 1;
                } else if (currentValue >= maxValue) {
                    alert(`This skill has reached its maximum value of ${maxValue}.`);
                } else {
                    alert("No points remaining in total skill.");
                }
            }
			
			function subtract(buttonId) {
				const button = document.getElementById(buttonId);
				const skillTotal = document.getElementById('skill_total');

				let currentValue = Number(button.innerText) || 0;

				if (currentValue > 0) {
					button.innerText = currentValue - 1;
					skillTotal.value = Number(skillTotal.value) + 1;
				} else {
				alert("Skill value cannot go below 0.");
				}
			}

            function lock() {
                const skillTotal = document.getElementById('skill_total');
                const btnSet = document.getElementById('btn_set');

                if (btnSet.value === "SET") {
                    skillTotal.disabled = true;
                    btnSet.value = "UNLOCK";
                } else {
                    skillTotal.disabled = false;
                    btnSet.value = "SET";
                }
            }
            function reset() {
                let buttons = document.querySelectorAll(".btn");
                buttons.forEach(button => {
                    button.innerText = "0";
                });

                let skillTotal = document.getElementById('skill_total');
                let btnSet = document.getElementById('btn_set');

                skillTotal.value = "0";
                skillTotal.disabled = false;
                btnSet.value = "SET";
            }
        </script>