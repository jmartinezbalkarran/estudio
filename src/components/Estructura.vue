<template>
    <div><!-----‐-‐-----------header--------------------------------->
       
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
  document.getElementById('contentForm').addEventListener('submit', function(event) {
            event.preventDefault();
         
            const jsonData = collectFormData();
            
            console.log(JSON.stringify(jsonData, null, 2));
            localStorage.setItem("db_estudio", JSON.stringify(jsonData));
            window.location.href = 'index.html';
  alert("Datos guardados en Storage.");
            
            alert('Datos del formulario listos en la consola para ser procesados. También puedes verlos en "Previsualizar JSON".');
            
            document.getElementById('jsonOutput').textContent = JSON.stringify(jsonData, null, 2);
        });

        function previewJson() {
            const jsonData = collectFormData();
            document.getElementById('jsonOutput').textContent = JSON.stringify(jsonData, null, 2);      
        }
        
</script>
