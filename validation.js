(function () {
  const form = document.getElementById("enquiry-form");
  if (!form) {
    return;
  }

  const lang = document.documentElement.lang === "es" ? "es" : "en";
  const isSpanish = lang === "es";

  const messages = {
    en: {
      first_name: "First name must contain only letters and be at least 2 characters",
      last_name: "Last name must contain only letters and be at least 2 characters",
      date_of_birth: "Enter a valid date of birth. Patient must be between 0 and 120 years old",
      email: "Enter a valid email address (example: name@provider.com)",
      phone: "Phone must include a country code (example: +1 305 555 0191)",
      preferred_language: "Select your preferred language",
      preferred_clinic: "Select the clinic you would like to visit",
      preferred_date: "Select a date at least 1 business day from today and no more than 60 days ahead",
      preferred_time: "Select your preferred time of day",
      service_type: "Select the type of care you are looking for",
      service_type_pediatric: "Paediatric Care is available for patients under 18. Please check the date of birth or select a different service.",
      new_patient: "Please indicate whether this is your first visit to HealthCore",
      has_insurance: "Please indicate whether you have health insurance",
      insurance_provider: "Please enter your insurance provider name",
      insurance_member_id: "Member ID must be between 6 and 20 alphanumeric characters",
      patient_id: "Patient ID must follow this format: HC-A3F291",
      health_concern: "Please describe your health concern in at least 20 characters (X characters remaining)",
      contact_consent: "You must consent to being contacted before submitting this form",
      evening_warning: "Evening availability may be limited at this clinic based on listed hours. Our front desk will confirm the closest available time.",
      counter: "characters remaining",
      success: "Thank you for reaching out to HealthCore.\n\nWe have received your enquiry. A member of our front desk team will contact you within 1 business day to confirm your appointment details and answer any questions.\n\nIf you need urgent assistance, please call your preferred clinic directly using the numbers listed on our website.\n\nWe look forward to caring for you."
    },
    es: {
      first_name: "El nombre debe contener solo letras y tener al menos 2 caracteres",
      last_name: "El apellido debe contener solo letras y tener al menos 2 caracteres",
      date_of_birth: "Ingresa una fecha de nacimiento valida. El paciente debe tener entre 0 y 120 anos",
      email: "Ingresa un correo electronico valido (ejemplo: nombre@proveedor.com)",
      phone: "El telefono debe incluir codigo de pais (ejemplo: +1 305 555 0191)",
      preferred_language: "Selecciona tu idioma preferido",
      preferred_clinic: "Selecciona la clinica que deseas visitar",
      preferred_date: "Selecciona una fecha al menos 1 dia habil desde hoy y no mas de 60 dias en adelante",
      preferred_time: "Selecciona tu horario preferido",
      service_type: "Selecciona el tipo de atencion que buscas",
      service_type_pediatric: "La atencion pediatrica esta disponible para pacientes menores de 18 anos. Revisa la fecha de nacimiento o elige otro servicio.",
      new_patient: "Indica si esta es tu primera visita a HealthCore",
      has_insurance: "Indica si tienes seguro medico",
      insurance_provider: "Ingresa el nombre de tu proveedor de seguro",
      insurance_member_id: "El ID de afiliado debe tener entre 6 y 20 caracteres alfanumericos",
      patient_id: "El ID de paciente debe tener este formato: HC-A3F291",
      health_concern: "Describe tu consulta con al menos 20 caracteres (faltan X caracteres)",
      contact_consent: "Debes autorizar el contacto antes de enviar este formulario",
      evening_warning: "La disponibilidad en horario nocturno puede ser limitada en esta clinica segun su horario. Recepcion confirmara la hora mas cercana disponible.",
      counter: "caracteres restantes",
      success: "Gracias por contactar a HealthCore.\n\nHemos recibido tu solicitud. Un miembro de nuestro equipo de recepcion te contactara en 1 dia habil para confirmar los detalles de tu cita y responder tus preguntas.\n\nSi necesitas asistencia urgente, llama directamente a tu clinica preferida usando los numeros publicados en nuestro sitio web.\n\nEsperamos poder atenderte pronto."
    }
  };

  const text = messages[lang];
  const clinicCloseHours = {
    "HealthCore Austin Central": 20,
    "HealthCore Austin North": 19,
    "HealthCore San Antonio": 18,
    "HealthCore Miami": 20,
    "HealthCore Orlando": 18,
    "HealthCore Atlanta": 19
  };

  const fields = {
    first_name: document.getElementById("first_name"),
    last_name: document.getElementById("last_name"),
    date_of_birth: document.getElementById("date_of_birth"),
    email: document.getElementById("email"),
    phone: document.getElementById("phone"),
    preferred_language: document.getElementById("preferred_language"),
    preferred_clinic: document.getElementById("preferred_clinic"),
    preferred_date: document.getElementById("preferred_date"),
    preferred_time: document.getElementById("preferred_time"),
    service_type: document.getElementById("service_type"),
    insurance_provider: document.getElementById("insurance_provider"),
    insurance_member_id: document.getElementById("insurance_member_id"),
    patient_id: document.getElementById("patient_id"),
    health_concern: document.getElementById("health_concern"),
    contact_consent: document.getElementById("contact_consent")
  };

  const newPatientRadios = document.querySelectorAll('input[name="new_patient"]');
  const insuranceRadios = document.querySelectorAll('input[name="has_insurance"]');
  const patientIdWrapper = document.getElementById("patient-id-wrapper");
  const counter = document.getElementById("concern-counter");
  const eveningWarning = document.getElementById("evening-warning");
  const successMessage = document.getElementById("success-message");
  const clearBtn = document.getElementById("clear-btn");

  function selectedRadioValue(name) {
    const selected = document.querySelector(`input[name="${name}"]:checked`);
    return selected ? selected.value : "";
  }

  function parseLocalDate(value) {
    if (!value) {
      return null;
    }
    const parts = value.split("-");
    if (parts.length !== 3) {
      return null;
    }
    const year = Number(parts[0]);
    const month = Number(parts[1]) - 1;
    const day = Number(parts[2]);
    const date = new Date(year, month, day);
    if (Number.isNaN(date.getTime())) {
      return null;
    }
    return date;
  }

  function normalizeDate(date) {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
  }

  function calculateAge(dob, today) {
    let age = today.getFullYear() - dob.getFullYear();
    const monthDiff = today.getMonth() - dob.getMonth();
    const dayDiff = today.getDate() - dob.getDate();
    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
      age -= 1;
    }
    return age;
  }

  function getMinBusinessDate(startDate) {
    const date = new Date(startDate);
    date.setDate(date.getDate() + 1);
    while (date.getDay() === 0 || date.getDay() === 6) {
      date.setDate(date.getDate() + 1);
    }
    return normalizeDate(date);
  }

  function showError(key, message) {
    const input = fields[key];
    const error = document.getElementById(`error-${key}`);
    if (!error) {
      return;
    }
    error.textContent = message;
    error.classList.remove("hidden");
    if (input) {
      input.classList.add("border-rose-500", "focus:ring-rose-200");
      input.setAttribute("aria-invalid", "true");
    }
  }

  function clearError(key) {
    const input = fields[key];
    const error = document.getElementById(`error-${key}`);
    if (!error) {
      return;
    }
    error.textContent = "";
    error.classList.add("hidden");
    if (input) {
      input.classList.remove("border-rose-500", "focus:ring-rose-200");
      input.removeAttribute("aria-invalid");
    }
  }

  function validateName(key) {
    const value = fields[key].value.trim();
    const nameRegex = /^[A-Za-zÁÉÍÓÚáéíóúÑñÜü]{2,50}$/;
    if (!nameRegex.test(value)) {
      showError(key, text[key]);
      return false;
    }
    clearError(key);
    return true;
  }

  function validateDob() {
    const dob = parseLocalDate(fields.date_of_birth.value);
    const today = normalizeDate(new Date());
    if (!dob) {
      showError("date_of_birth", text.date_of_birth);
      return false;
    }
    const age = calculateAge(dob, today);
    if (dob > today || age < 0 || age > 120) {
      showError("date_of_birth", text.date_of_birth);
      return false;
    }
    clearError("date_of_birth");
    return true;
  }

  function validateEmail() {
    const value = fields.email.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!emailRegex.test(value)) {
      showError("email", text.email);
      return false;
    }
    clearError("email");
    return true;
  }

  function validatePhone() {
    const value = fields.phone.value.trim();
    const phoneRegex = /^\+\d{1,3}[\d\s-]{6,24}$/;
    if (!phoneRegex.test(value)) {
      showError("phone", text.phone);
      return false;
    }
    clearError("phone");
    return true;
  }

  function validateRequiredSelect(key) {
    if (!fields[key].value) {
      showError(key, text[key]);
      return false;
    }
    clearError(key);
    return true;
  }

  function validatePreferredDate() {
    const selected = parseLocalDate(fields.preferred_date.value);
    const today = normalizeDate(new Date());
    const minDate = getMinBusinessDate(today);
    const maxDate = new Date(today);
    maxDate.setDate(maxDate.getDate() + 60);
    const normalizedMaxDate = normalizeDate(maxDate);

    if (!selected || selected < minDate || selected > normalizedMaxDate) {
      showError("preferred_date", text.preferred_date);
      return false;
    }
    clearError("preferred_date");
    return true;
  }

  function validateServiceTypeWithAge() {
    if (!validateRequiredSelect("service_type")) {
      return false;
    }
    const service = fields.service_type.value;
    if (service !== "Paediatric Care") {
      return true;
    }
    const dob = parseLocalDate(fields.date_of_birth.value);
    const today = normalizeDate(new Date());
    if (!dob) {
      showError("service_type", text.service_type_pediatric);
      return false;
    }
    const age = calculateAge(dob, today);
    if (age >= 18) {
      showError("service_type", text.service_type_pediatric);
      return false;
    }
    clearError("service_type");
    return true;
  }

  function validateRadioGroup(name, key) {
    if (!selectedRadioValue(name)) {
      showError(key, text[key]);
      return false;
    }
    clearError(key);
    return true;
  }

  function validateInsuranceFields() {
    const hasInsurance = selectedRadioValue("has_insurance");
    let isValid = true;
    const provider = fields.insurance_provider.value.trim();
    const memberId = fields.insurance_member_id.value.trim();
    const memberRegex = /^[A-Za-z0-9]{6,20}$/;

    if (hasInsurance === "Yes") {
      if (!provider || provider.length > 100) {
        showError("insurance_provider", text.insurance_provider);
        isValid = false;
      } else {
        clearError("insurance_provider");
      }

      if (!memberRegex.test(memberId)) {
        showError("insurance_member_id", text.insurance_member_id);
        isValid = false;
      } else {
        clearError("insurance_member_id");
      }
    } else {
      clearError("insurance_provider");
      clearError("insurance_member_id");
    }

    return isValid;
  }

  function validatePatientId() {
    const newPatient = selectedRadioValue("new_patient");
    const value = fields.patient_id.value.trim();
    const regex = /^HC-[A-Za-z0-9]{6}$/;

    if (newPatient === "No" && value && !regex.test(value)) {
      showError("patient_id", text.patient_id);
      return false;
    }
    clearError("patient_id");
    return true;
  }

  function updatePatientIdVisibility() {
    const newPatient = selectedRadioValue("new_patient");
    if (newPatient === "No") {
      patientIdWrapper.classList.remove("hidden");
    } else {
      patientIdWrapper.classList.add("hidden");
      fields.patient_id.value = "";
      clearError("patient_id");
    }
  }

  function validateHealthConcern() {
    const value = fields.health_concern.value.trim();
    const remaining = Math.max(0, 20 - value.length);
    if (value.length < 20 || value.length > 500) {
      showError("health_concern", text.health_concern.replace("X", String(remaining)));
      return false;
    }
    clearError("health_concern");
    return true;
  }

  function updateCounter() {
    const remaining = 500 - fields.health_concern.value.length;
    counter.textContent = `${remaining} ${text.counter}`;
  }

  function validateConsent() {
    if (!fields.contact_consent.checked) {
      showError("contact_consent", text.contact_consent);
      return false;
    }
    clearError("contact_consent");
    return true;
  }

  function updateEveningWarning() {
    const time = fields.preferred_time.value;
    const clinic = fields.preferred_clinic.value;

    if (time === "Evening (5pm-8pm)" && clinic && clinicCloseHours[clinic] < 20) {
      eveningWarning.textContent = text.evening_warning;
      eveningWarning.classList.remove("hidden");
      return;
    }
    eveningWarning.classList.add("hidden");
    eveningWarning.textContent = "";
  }

  function validateAll() {
    let valid = true;

    valid = validateName("first_name") && valid;
    valid = validateName("last_name") && valid;
    valid = validateDob() && valid;
    valid = validateEmail() && valid;
    valid = validatePhone() && valid;
    valid = validateRequiredSelect("preferred_language") && valid;
    valid = validateRequiredSelect("preferred_clinic") && valid;
    valid = validatePreferredDate() && valid;
    valid = validateRequiredSelect("preferred_time") && valid;
    valid = validateServiceTypeWithAge() && valid;
    valid = validateRadioGroup("new_patient", "new_patient") && valid;
    valid = validateRadioGroup("has_insurance", "has_insurance") && valid;
    valid = validateInsuranceFields() && valid;
    valid = validatePatientId() && valid;
    valid = validateHealthConcern() && valid;
    valid = validateConsent() && valid;

    updateEveningWarning();
    return valid;
  }

  ["first_name", "last_name"].forEach((name) => {
    fields[name].addEventListener("input", () => validateName(name));
    fields[name].addEventListener("blur", () => validateName(name));
  });

  fields.date_of_birth.addEventListener("change", () => {
    validateDob();
    validateServiceTypeWithAge();
  });

  fields.email.addEventListener("input", validateEmail);
  fields.email.addEventListener("blur", validateEmail);
  fields.phone.addEventListener("input", validatePhone);
  fields.phone.addEventListener("blur", validatePhone);

  ["preferred_language", "preferred_clinic", "preferred_date", "preferred_time", "service_type"].forEach((name) => {
    fields[name].addEventListener("change", () => {
      if (name === "preferred_date") {
        validatePreferredDate();
      } else if (name === "service_type") {
        validateServiceTypeWithAge();
      } else {
        validateRequiredSelect(name);
      }
      updateEveningWarning();
    });
  });

  newPatientRadios.forEach((radio) => {
    radio.addEventListener("change", () => {
      validateRadioGroup("new_patient", "new_patient");
      updatePatientIdVisibility();
      validatePatientId();
    });
  });

  insuranceRadios.forEach((radio) => {
    radio.addEventListener("change", () => {
      validateRadioGroup("has_insurance", "has_insurance");
      validateInsuranceFields();
    });
  });

  fields.insurance_provider.addEventListener("input", validateInsuranceFields);
  fields.insurance_member_id.addEventListener("input", validateInsuranceFields);
  fields.patient_id.addEventListener("input", validatePatientId);

  fields.health_concern.addEventListener("input", () => {
    updateCounter();
    validateHealthConcern();
  });

  fields.contact_consent.addEventListener("change", validateConsent);

  clearBtn.addEventListener("click", () => {
    form.reset();
    successMessage.classList.add("hidden");
    successMessage.textContent = "";
    eveningWarning.classList.add("hidden");
    eveningWarning.textContent = "";
    updatePatientIdVisibility();
    Object.keys(fields).forEach((key) => clearError(key));
    clearError("new_patient");
    clearError("has_insurance");
    updateCounter();
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    successMessage.classList.add("hidden");
    successMessage.textContent = "";

    if (!validateAll()) {
      return;
    }

    successMessage.textContent = text.success;
    successMessage.classList.remove("hidden");
    successMessage.scrollIntoView({ behavior: "smooth", block: "nearest" });
  });

  updatePatientIdVisibility();
  updateCounter();
})();