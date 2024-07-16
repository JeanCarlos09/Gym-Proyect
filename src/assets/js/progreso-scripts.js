// progreso-scripts.js

export function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    sidebar.style.display = sidebar.style.display === 'block' ? 'none' : 'block';
}

export function navigateTo(url, router) {
    router.push(url);
  }

export function addNewGoal(name, target) {
    if (name && target) {
        const newGoal = document.createElement('li');
        newGoal.innerHTML = `${name} - ${target} - <span class="not-started">No iniciado</span>
        <button onclick="startGoal(this)">Iniciar</button>
        <button onclick="completeGoal(this)">Completar</button>
        <button onclick="cancelGoal(this)">Cancelar</button>`;
        document.getElementById('nuevas-metas').appendChild(newGoal);
    }
}

export function startGoal(button) {
    const li = button.parentNode;
    li.querySelector('span').className = 'in-progress';
    li.querySelector('span').textContent = 'En progreso';
}

export function completeGoal(button) {
    const li = button.parentNode;
    li.querySelector('span').className = 'completed';
    li.querySelector('span').textContent = 'Completada';
    li.querySelectorAll('button').forEach(btn => btn.remove()); // Eliminar los botones
    document.getElementById('metas-alcanzadas').appendChild(li);
    updateCompletedGoals();
}

export function cancelGoal(button) {
    const li = button.parentNode;
    li.remove();
}

export function updateCompletedGoals() {
    const metasCompletadas = document.getElementById('metas-completadas');
    const metasAlcanzadas = document.getElementById('metas-alcanzadas').children.length;
    metasCompletadas.textContent = metasAlcanzadas;
}

export function registerActivity(name, duration, calories) {
    if (name && duration && calories) {
        const newActivity = document.createElement('li');
        const now = new Date();
        newActivity.innerHTML = `
            <div>
                <strong>${name}</strong>
                <p>${now.toLocaleString()}</p>
            </div>
            <div>
                <span>${duration} minutos</span>
                <span>${calories} calorías</span>
            </div>
        `;
        document.getElementById('registro-actividades').appendChild(newActivity);
        updateStatistics(duration, calories);
    }
}

export function updateStatistics(duration, calories) {
    const tiempoEjercicio = document.getElementById('tiempo-ejercicio');
    const caloriasQuemadas = document.getElementById('calorias-quemadas');
    const [horas, minutos] = tiempoEjercicio.textContent.split(' ');
    let totalMinutos = parseInt(horas) * 60 + parseInt(minutos.replace('m', '')) + duration;
    let nuevasHoras = Math.floor(totalMinutos / 60);
    let nuevosMinutos = totalMinutos % 60;
    tiempoEjercicio.textContent = `${nuevasHoras}h ${nuevosMinutos}m`;
    caloriasQuemadas.textContent = parseInt(caloriasQuemadas.textContent) + calories;
}
