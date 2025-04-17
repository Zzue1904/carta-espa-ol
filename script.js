const steps = [
  {
    question: "¿Quieres llamada hoy?",
    options: ["Sí", "No"],
    next: {
      "Sí": 1,
      "No": 2
    }
  },
  {
    question: "¿A qué hora te gustaría?",
    options: ["Ahora", "Más tarde"],
    next: {
      "Ahora": 3,
      "Más tarde": 3
    }
  },
  {
    question: "Vale, entonces vas a estar en tu mundo un rato?",
    options: ["Un poco", "Un ratote"],
    next: {
      "Un poco": 5,
      "Un ratote": 5
    }
  },
  {
    question: "Esta bien, ¿Quieres jugar cartas también?",
    options: ["Sí", "No"],
    next: {
      "Sí": 4,
      "No": 4
    }
  },
  {
    question: "Valeee, ¿Quieres llamada especial también?",
    options: ["Sí", "No"],
    next: {
      "Sí": 6,
      "No": 6
    }
  },
  {
    question: "Valeee, entonces te dejo descansar, Suerte ;) <3",
    options: []
  },
  {
    question: "¡Entendido! Gracias por responder :) <3",
    options: []
  }
];

let currentStep = 0;

function showStep() {
  const step = steps[currentStep];
  document.getElementById("question").innerText = step.question;
  const buttonsDiv = document.getElementById("buttons");
  buttonsDiv.innerHTML = "";

  step.options.forEach(option => {
    const btn = document.createElement("button");
    btn.innerText = option;
    btn.onclick = () => nextStep(option);
    buttonsDiv.appendChild(btn);
  });
}

function nextStep(answer) {
  const step = steps[currentStep];
  const next = step.next[answer];
  enviarRespuesta(step.question, answer);

  if (next !== undefined) {
    currentStep = next;
    showStep();
  }
}

function enviarRespuesta(pregunta, respuesta) {
  const formData = new FormData();
  formData.append("Pregunta", pregunta);
  formData.append("Respuesta", respuesta);

  fetch("https://formspree.io/f/xqaponkw", {
    method: "POST",
    body: formData,
    headers: {
      'Accept': 'application/json'
    }
  }).then(response => {
    console.log("Enviado a Formspree");
  }).catch(error => {
    console.error("Error al enviar:", error);
  });
}

window.onload = showStep;
