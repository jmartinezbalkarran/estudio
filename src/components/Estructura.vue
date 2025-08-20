<template>
    <div><!-----‐-‐-----------header--------------------------------->
        <nav>
            <a href="#tema1">Fe en Dios</a>
        </nav>
        <!-----‐-‐-------------body-------------------------------------->
        <section id="tema1">
            <h1>Fe en Dios</h1>
            <div class="section-content">
                <h2>Definición bíblica</h2>
                <p>
                    Descripción
                </p>
            </div>

            <div class="section-content">
                <h2>Lecturas clave</h2>

                <div class="question">
                    Cita Bibliaca
                </div>
                <div class="answer">
                    descripción
                </div>
            </div>

            <div class="section-content">
                <h2>Preguntas para reflexionar</h2>

                <div class="question">
                    ¿Preguntas?
                </div>
                <div class="answer">
                    Descripción
                </div>

            </div>

            <div class="section-content">
                <h2>Aplicación práctica</h2>
                <div class="question">
                    ¿Preguntas?
                </div>
                <div class="answer">
                    Descripción
                </div>
            </div>

        </section>
        <!-----‐-‐-------------footer------------------------------------>
        <footer>
            <p>Estudios Bíblicos<br>
                Casa Profética Es la Respuesta<br>
                @~C.P.J.E.R~@</p>
        </footer>
    </div>
</template>

<script setup>
  document.addEventListener('DOMContentLoaded', function() {
    const menuLinks = document.querySelectorAll('nav a');
    const sections = document.querySelectorAll('section');
    const questions = document.querySelectorAll('.question');

    // Función para ocultar todas las secciones
    function hideAllSections() {
        sections.forEach(section => {
            section.style.display = 'none';
        });
    }

    // Función para mostrar una sección específica
    function showSection(id) {
        const targetSection = document.getElementById(id);
        if (targetSection) {
            hideAllSections();
            targetSection.style.display = 'block'; // Usamos 'block' para que ocupe el espacio completo
        }
    }

    // Inicializar: Ocultar todas las secciones y mostrar la primera al cargar
    hideAllSections();
    showSection('tema1'); 

    // Manejar clics en los enlaces del menú
    menuLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault(); // Previene el comportamiento predeterminado del enlace
            const targetId = this.getAttribute('href').substring(1); // Obtiene el ID sin el '#'

            showSection(targetId);

            // Desplazamiento suave (smooth scroll)
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start' // Asegura que la sección se alinee al inicio de la vista
                });
            }
        });
    });

    // Manejar clics en las preguntas del acordeón con toggle para abrir/cerrar
    questions.forEach(question => {
        question.addEventListener('click', function() {
            const answer = this.nextElementSibling;
            const isCurrentlyVisible = answer.style.display === 'block';

            // Cerramos todas las respuestas y removemos la clase 'expanded' de todas las preguntas
            questions.forEach(q => {
                q.classList.remove('expanded');
                if (q.nextElementSibling) {
                    q.nextElementSibling.style.display = 'none';
                }
            });

            // Si la respuesta clickeada estaba cerrada, la abrimos; si estaba abierta, la dejamos cerrada
            if (!isCurrentlyVisible) {
                answer.style.display = 'block';
                this.classList.add('expanded');
            }
        });
    });
});
</script>