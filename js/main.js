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
		// Log para depuración: confirmar que el handler se ejecuta y a qué action se enviará
		console.log('contactForm submit handler fired — action:', form.action);

		// Usar validación nativa del navegador; si no pasa, cancelar el envío
		if (!form.reportValidity()) {
			e.preventDefault();
			console.log('contactForm: reportValidity failed — cancelando envío');
			return;
		}

		// Actualizar la vista previa antes de enviar
		updatePreview();

		// Dejar que el navegador realice el envío al `action` del formulario (Formspree).
		// No hacer `preventDefault()` ni redirecciones aquí.
		console.log('contactForm: valid — permitiendo envío al endpoint');
	});

	// Inicializar vista previa
	updatePreview();
});
