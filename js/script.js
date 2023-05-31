// Obtener los elementos para mostrar el huso horario, la hora actual y la fecha actual
const locationElement = document.querySelector('.location');
const currentTimeElement = document.querySelector('.current-time');
const currentDateElement = document.querySelector('.current-date');

let locationValue = 'America/Mexico_City';

// Establecer el huso horario predeterminado en Europe/London (GMT)
dayjs.extend(window.dayjs_plugin_utc);
dayjs.extend(window.dayjs_plugin_timezone);
dayjs.tz.setDefault(locationValue);

// Función para actualizar el huso horario, la hora actual y la fecha actual
function updateTimeAndDate() {

  const container = document.querySelector('.container-timezone');

  // Obtener la hora actual en Londres
  const currentTime = dayjs().tz(`${locationValue}`).format('HH:mm:ss');

  // Obtener la fecha actual en Londres con el formato deseado
  const currentDate = dayjs().tz(`${locationValue}`).format('dddd, MMMM D, YYYY');

  console.log(currentTime);

  if (currentTime >= '06:00:00' && currentTime < '18:00:00') {
    container.classList.remove('night');
    container.classList.add('day');
  } else {
    container.classList.remove('day');
    container.classList.add('night');
  }

  // Actualizar el contenido de texto de los elementos
  locationElement.textContent = locationValue;
  currentTimeElement.textContent = currentTime;
  currentDateElement.textContent = currentDate;
}

// Actualizar el huso horario, la hora actual y la fecha actual inicialmente
updateTimeAndDate();

// Actualizar el huso horario, la hora actual y la fecha actual cada segundo
setInterval(updateTimeAndDate, 1000);

function openModal() {
  var modal = document.getElementById('modal-1');
  var overlay = document.querySelector('.modal__overlay');
  var container = document.querySelector('.modal__container');
  
  overlay.classList.add('is-open');
  container.classList.add('is-open');
  modal.setAttribute('aria-hidden', 'false');
  
  document.body.style.overflow = 'hidden';
  document.addEventListener('keydown', closeModalOnEsc);
}

function closeModal() {
  var modal = document.getElementById('modal-1');
  var overlay = document.querySelector('.modal__overlay');
  var container = document.querySelector('.modal__container');
  
  overlay.classList.remove('is-open');
  container.classList.remove('is-open');
  modal.setAttribute('aria-hidden', 'true');
  
  document.body.style.overflow = 'auto';
  document.removeEventListener('keydown', closeModalOnEsc);
}

function closeModalOnEsc(event) {
  if (event.key === 'Escape') {
    closeModal();
  }
}

function continueAction() {
  // Aquí puedes realizar la acción deseada al hacer clic en "Continue" en el modal
  const timezoneSelect = document.getElementById('timezone-select');
  const selectedTimezone = timezoneSelect.value;

  locationValue = selectedTimezone;
  closeModal();
  updateTimeAndDate();
}

document.querySelector('.modal__container').addEventListener('click', function(event) {
  event.stopPropagation();
});

document.getElementById('modal-1').addEventListener('click', function(event) {
  if (event.target.classList.contains('modal__close')) {
    closeModal();
  }
});

// Obtener el elemento del año actual
const currentYearElement = document.getElementById('current-year');

// Obtener el año actual
const currentYear = new Date().getFullYear();

// Actualizar el contenido del elemento con el año actual
currentYearElement.textContent = currentYear;
