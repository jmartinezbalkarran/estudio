<template>
    <div><!-----‐-‐-----------header--------------------------------->
      <router-link 
      to="/add" 
      id="btnFlotante"
      class="btn-flotante"
    >+</router-link> 
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
      import { initializeApp } from 'https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js';
        import { 
            getFirestore, 
            collection, 
            addDoc, 
            getDocs 
        } from 'https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js';

        const firebaseConfig = {
            apiKey: "AIzaSyDq8savWb-t4hfoZ8Q7XQf_l0kIESyAwmA",
            authDomain: "estudiosbiblicos-cpjr.firebaseapp.com",
            projectId: "estudiosbiblicos-cpjr",
            storageBucket: "estudiosbiblicos-cpjr.firebasestorage.app",
            messagingSenderId: "622848730929",
            appId: "1:622848730929:web:13fd5af5f51a9f5b5a3210",
            measurementId: "G-FMKCZZ09HW"
        };

        const app = initializeApp(firebaseConfig);
        const db = getFirestore(app);
        
        // Hacer disponibles solo lo necesario
        window.db = db;
        window.firestore = { collection, addDoc, getDocs };
        
        document.addEventListener('DOMContentLoaded', function() {
        let allStudyData = [];
        
        const nav = document.querySelector('nav');
        const mainTitle = document.getElementById('mainTitle');
        const definicionContainer = document.getElementById('definicion');
        const lecturasContainer = document.getElementById('lecturasClaveContainer');
        const preRefContainer = document.getElementById('preRefContainer');
        const aplicacionContainer = document.getElementById('aplicacionContainer');
        async function
        loadDataAndRender() {
   
            try {
            	
                // IMPORTANT: Replace 'db_estudio.json' with the correct path to your file.
                // Assuming you will provide the JSON later.
                
               const response = await fetch('db_estudio.json');
                if (!response.ok) {
                    throw new Error(`Error de red: ${response.statusText}`);
                }
               
            const allStudyData = await getStudies();
            
                console.log("Datos cargados exitosamente:", allStudyData);
                
                if (allStudyData.length > 0) {
            
                    createNavLinks(allStudyData);
                    renderSection(allStudyData[0]);
                }
            } catch (error) {
                console.error("Hubo un problema al cargar el archivo JSON:", error);
                
                definicionContainer.textContent = 'Error al cargar los datos.';
            }
        }
        
        function createNavLinks(study) {

            nav.innerHTML = ''; 
            
            study.forEach((sectionData, index) => {
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
        
        async function getStudies() {
            try {
            	
                const querySnapshot = await window.firestore.getDocs(window.firestore.collection(window.db, "studies"));
                const study = [];      
                    querySnapshot.forEach((doc) => {
                   
                   study.push(doc.data().content);
               
                }); 
                return study;
            } catch (error) {
                alert('Error al obtener estudios: ' + error.message);
            }
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
        loadDataAndRender();
    });
</script>
