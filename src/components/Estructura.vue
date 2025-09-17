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
  document.addEventListener('DOMContentLoaded', () => {
            addLecturaClave();
            addPreRef();
            addAplicacion();
        });

        let lecturaClaveCount = 0;
        
        function addLecturaClave() {
            lecturaClaveCount++;
            const container = document.getElementById('lecturasClaveContainer');
            const div = document.createElement('div');
            div.className = 'item-group';
            div.innerHTML = `
                <h3>Cita ${lecturaClaveCount}</h3>
                <div class="form-group">
                    <label>Cita:</label>
                    <input type="text" class="cita" placeholder="Ej: Hebreos 11:1">
                </div>
                <div class="form-group">
                    <label>Versículo:</label>
                    <textarea class="versiculo" rows="2" placeholder="Es, pues, la fe la certeza de lo que se espera..."></textarea>
                </div>
                <button type="button" class="remove-button" onclick="this.closest('.item-group').remove()">Eliminar</button>
            `;
            container.appendChild(div);
        }

        let preRefCount = 0;
        function addPreRef() {
            preRefCount++;
            const container = document.getElementById('preRefContainer');
            const div = document.createElement('div');
            div.className = 'item-group';
            div.innerHTML = `
                <h3>Pregunta de Reflexión ${preRefCount}</h3>
                <div class="form-group">
                    <label>Pregunta:</label>
                    <input type="text" class="pregunta-pre-ref" placeholder="Ej: ¿Qué significa tener fe?">
                </div>
                <div class="form-group">
                    <label>Respuesta:</label>
                    <textarea class="respuesta-pre-ref" rows="2" placeholder="Significa confiar plenamente en Dios..."></textarea>
                </div>
                <button type="button" class="remove-button" onclick="this.closest('.item-group').remove()">Eliminar</button>
            `;
            container.appendChild(div);
        }

        let aplicacionCount = 0;
        function addAplicacion() {
            aplicacionCount++;
            const container = document.getElementById('aplicacionContainer');
            const div = document.createElement('div');
            div.className = 'item-group';
            div.innerHTML = `
                <h3>Aplicación Práctica ${aplicacionCount}</h3>
                <div class="form-group">
                    <label>Pregunta:</label>
                    <input type="text" class="pregunta-aplicacion" placeholder="Ej: ¿Cómo puedo aplicar la fe en mi vida diaria?">
                </div>
                <div class="form-group">
                    <label>Respuesta:</label>
                    <textarea class="respuesta-aplicacion" rows="2" placeholder="Tomando decisiones basadas en la confianza en Dios..."></textarea>
                </div>
                <button type="button" class="remove-button" onclick="this.closest('.item-group').remove()">Eliminar</button>
            `;
            container.appendChild(div);
        }

        function collectFormData() {
            const navTitulo = document.getElementById('navTitulo').value;
            const definicion = document.getElementById('definicion').value;

            const lecturasClave = Array.from(document.querySelectorAll('#lecturasClaveContainer .item-group')).map(item => ({
                cita: item.querySelector('.cita').value,
                versiculo: item.querySelector('.versiculo').value
            })).filter(item => item.cita || item.versiculo); // Filtrar vacíos

            const preRef = Array.from(document.querySelectorAll('#preRefContainer .item-group')).map(item => ({
                pregunta: item.querySelector('.pregunta-pre-ref').value,
                respuesta: item.querySelector('.respuesta-pre-ref').value
            })).filter(item => item.pregunta || item.respuesta);

            const aplicacion = Array.from(document.querySelectorAll('#aplicacionContainer .item-group')).map(item => ({
                pregunta: item.querySelector('.pregunta-aplicacion').value,
                respuesta: item.querySelector('.respuesta-aplicacion').value
            })).filter(item => item.pregunta || item.respuesta);
            
           dbData=localStorage.getItem("db_estudio");
           
            data = JSON.parse(dbData);
            const sectionData = {
                Nav_titulo: navTitulo,
                Definicion: definicion,
                Lectura_clave: lecturasClave,
                Pre_ref: preRef,
                aplicacion: aplicacion
            };
            
            if (!data) return [sectionData];
            	
            data.push(sectionData);
            return data; 
            
        }

        
</script>
