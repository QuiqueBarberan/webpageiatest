// Lógica para actualizar la vista previa del formulario de contacto
document.addEventListener('DOMContentLoaded', function () {
	const form = document.getElementById('contactForm');
	if (!form) return;

	const els = {
		name: document.getElementById('name'),
		email: document.getElementById('email'),
		gender: document.getElementById('gender'),
		ageRange: document.getElementById('ageRange'),
		ageValue: document.getElementById('ageValue'),
		subject: document.getElementById('subject'),
		phone: document.getElementById('phone'),
		message: document.getElementById('message'),
		newsletter: document.getElementById('newsletter'),
	};

	function formatAge(v) {
		return Number(v) === 65 ? '+65' : String(v);
	}

	function updatePreview() {
		const ageDisplay = formatAge(els.ageRange.value);
		els.ageValue.textContent = ageDisplay;

		document.getElementById('pv-name').textContent = els.name.value || '—';
		document.getElementById('pv-email').textContent = els.email.value || '—';
		document.getElementById('pv-gender').textContent = els.gender.value || '—';
		document.getElementById('pv-age').textContent = ageDisplay || '—';
		document.getElementById('pv-subject').textContent = els.subject.value || '—';
		document.getElementById('pv-phone').textContent = els.phone.value || '—';
		document.getElementById('pv-message').textContent = els.message.value || '—';
		document.getElementById('pv-news').textContent = els.newsletter.checked ? 'Sí' : 'No';
	}

	// Wire events to update preview live
	['input', 'change'].forEach(evt => {
		Object.values(els).forEach(el => {
			if (!el) return;
			el.addEventListener(evt, updatePreview);
		});
	});

	form.addEventListener('submit', function (e) {
		e.preventDefault();

		// Usar validación nativa del navegador
		if (!form.reportValidity()) {
			return;
		}

		updatePreview();

		const ageDisplay = formatAge(els.ageRange.value);
		const subjectText = `Contacto: ${els.subject.value || 'Sin asunto'}`;
		const bodyLines = [
			`Nombre: ${els.name.value || ''}`,
			`Correo: ${els.email.value || ''}`,
			`Género: ${els.gender.value || ''}`,
			`Edad: ${ageDisplay}`,
			`Teléfono: ${els.phone.value || ''}`,
			`Asunto: ${els.subject.value || ''}`,
			`Mensaje: ${els.message.value || ''}`,
			`Boletín: ${els.newsletter.checked ? 'Sí' : 'No'}`,
		];

		const mailto = `mailto:quiquecillo86@gmail.com?subject=${encodeURIComponent(subjectText)}&body=${encodeURIComponent(bodyLines.join('\n'))}`;

		// Abrir cliente de correo del usuario con los datos (demostración)
		window.location.href = mailto;
	});

	// Inicializar vista previa
	updatePreview();
});
