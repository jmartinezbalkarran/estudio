<template>
    <div><!-----‐-‐-----------header--------------------------------->
      <button id="btnFlotante">+</button> 
        <nav>
            <a href="#tema1" id="navLink1">Fe en Dios</a>
        </nav>
        <!-----‐-‐-------------body-------------------------------------->
     <section id="tema1"> 
        <h1 id="mainTitle">Fe en Dios</h1>
        <div class="section-content">
            <h2>Definición bíblica</h2>
                <p id="definicion"></p>
        </div>

        <div class="section-content">
            <h2>Lecturas clave</h2>
            <div id="lecturasClaveContainer">
                <div class="item-group">
                    <div class="question" id="cita1"></div>
                    <div class="answer" id="versiculo1"></div>
                </div>
            </div>
        </div>

        <div class="section-content">
            <h2>Preguntas para reflexionar</h2>
            <div id="preRefContainer">
                <div class="item-group">
                    <div class="question" id="preguntaRef1"></div>
                    <div class="answer" id="respuestaRef1"></div>
                </div>
            </div>
        </div>

        <div class="section-content">
            <h2>Aplicación práctica</h2>
            <div id="aplicacionContainer">
                <div class="item-group">
                    <div class="question" id="preguntaApl1"></div>
                    <div class="answer" id="respuestaApl1"></div>
                </div>
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
        
        let allStudyData = [];
        
        const nav = document.querySelector('nav');
        const mainTitle = document.getElementById('mainTitle');
        const definicionContainer = document.getElementById('definicion');
        const lecturasContainer = document.getElementById('lecturasClaveContainer');
        const preRefContainer = document.getElementById('preRefContainer');
        const aplicacionContainer = document.getElementById('aplicacionContainer');
        
        async function loadDataAndRender() {
            try {
            	
                // IMPORTANT: Replace 'db_estudio.json' with the correct path to your file.
                // Assuming you will provide the JSON later.
                
                const response = await fetch('db_estudio.json');
                if (!response.ok) {
                    throw new Error(`Error de red: ${response.statusText}`);
                }
               //allStudyData = await response.json();
            respuesta =localStorage.getItem("db_estudio");
            
        allStudyData = JSON.parse(respuesta);
                    

                console.log("Datos cargados exitosamente:", allStudyData);
                
                if (allStudyData.length > 0) {
                    createNavLinks();
                    renderSection(allStudyData[0]);
                }
            } catch (error) {
                console.error("Hubo un problema al cargar el archivo JSON:", error);
                
                definicionContainer.textContent = 'Error al cargar los datos.';
            }
        }
        
        function createNavLinks() {

            nav.innerHTML = ''; 
            
            allStudyData.forEach((sectionData, index) => {
                const navLink = document.createElement('a');
                navLink.textContent = sectionData.Nav_titulo;
                navLink.href = `#tema${index + 1}`;
                 
                navLink.addEventListener('click', (e) => {
                    e.preventDefault(); 
                    renderSection(sectionData);
                });
                
                nav.appendChild(navLink);
            });
        }
        
        function renderSection(data) {
        
            mainTitle.textContent = data.Nav_titulo;

            definicionContainer.textContent = data.Definicion;

            lecturasContainer.innerHTML = '';
            
            if (data.Lectura_clave && Array.isArray(data.Lectura_clave)) {
                data.Lectura_clave.forEach(item => {
                    const itemGroup = document.createElement('div');
                    itemGroup.className = 'item-group';
                    itemGroup.innerHTML = `
                        <div class="question">${item.cita}</div>
                        <div class="answer">${item.versiculo}</div>
                    `;
                    lecturasContainer.appendChild(itemGroup);
                });
            }

            preRefContainer.innerHTML = '';
            
            if (data.Pre_ref && Array.isArray(data.Pre_ref)) {
                data.Pre_ref.forEach(item => {
                    const itemGroup = document.createElement('div');
                    itemGroup.className = 'item-group';
                    itemGroup.innerHTML = `
                        <div class="question">${item.pregunta}</div>
                        <div class="answer">${item.respuesta}</div>
                    `;
                    preRefContainer.appendChild(itemGroup);
                });
            }

            aplicacionContainer.innerHTML = '';
            
            if (data.aplicacion && Array.isArray(data.aplicacion)) {
                data.aplicacion.forEach(item => {
                    const itemGroup = document.createElement('div');
                    itemGroup.className = 'item-group';
                    itemGroup.innerHTML = `
                        <div class="question">${item.pregunta}</div>
                        <div class="answer">${item.respuesta}</div>
                    `;
                    aplicacionContainer.appendChild(itemGroup);
                });
            }

            attachAccordionEvents();
        }
        
        function attachAccordionEvents() {
            const questions = document.querySelectorAll('.question');
            questions.forEach(question => {
                question.addEventListener('click', function() {
                    const answer = this.nextElementSibling;
                    const isCurrentlyVisible = answer.style.display === 'block';

                    questions.forEach(q => {
                        q.classList.remove('expanded');
                        if (q.nextElementSibling) {
                            q.nextElementSibling.style.display = 'none';
                        }
                    });

                    if (!isCurrentlyVisible) {
                        answer.style.display = 'block';
                        this.classList.add('expanded');
                    }
                });
            });
        }
        document.getElementById('btnFlotante').     addEventListener('click', () => {
  window.location.href = '';
});
        loadDataAndRender();
    });
</script>
