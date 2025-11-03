<template>
  <div class="container">
    <h1>Nuevo Estudio</h1>
    <form id="contentForm" @submit.prevent="submitForm">
      <div class="section-block">
        <h2>Datos de la Sección</h2>
        <div class="form-group">
          <label for="navTitulo">Título de Navegación</label>
          <input type="text" id="navTitulo" v-model="formData.navTitulo" required placeholder="Ej: Fe en Dios">
        </div>
        <div class="form-group">
          <label for="definicion">Definición</label>
          <textarea id="definicion" rows="5" v-model="formData.definicion" required placeholder="Descripción detallada de la fe en Dios, su importancia y sus fundamentos bíblicos."></textarea>
        </div>
      </div>

      <div class="section-block">
        <h2>Lecturas Clave</h2>
        <div id="lecturasClaveContainer">
          <div v-for="(lectura, index) in formData.lecturasClave" :key="index" class="item-group">
            <h3>Cita {{ index + 1 }}</h3>
            <div class="form-group">
              <label>Cita:</label>
              <input type="text" v-model="lectura.cita" placeholder="Ej: Hebreos 11:1">
            </div>
            <div class="form-group">
              <label>Versículo:</label>
              <textarea v-model="lectura.versiculo" rows="2" placeholder="Es, pues, la fe la certeza de lo que se espera..."></textarea>
            </div>
            <button type="button" class="remove-button" @click="removeLectura(index)">Eliminar</button>
          </div>
        </div>
        <button type="button" class="add-button" @click="addLecturaClave">+ Añadir Cita</button>
      </div>

      <div class="section-block">
        <h2>Preguntas de Reflexión</h2>
        <div id="preRefContainer">
          <div v-for="(pregunta, index) in formData.preRef" :key="index" class="item-group">
            <h3>Pregunta de Reflexión {{ index + 1 }}</h3>
            <div class="form-group">
              <label>Pregunta:</label>
              <input type="text" v-model="pregunta.pregunta" placeholder="Ej: ¿Qué significa tener fe?">
            </div>
            <div class="form-group">
              <label>Respuesta:</label>
              <textarea v-model="pregunta.respuesta" rows="2" placeholder="Significa confiar plenamente en Dios..."></textarea>
            </div>
            <button type="button" class="remove-button" @click="removePreRef(index)">Eliminar</button>
          </div>
        </div>
        <button type="button" class="add-button" @click="addPreRef">+ Añadir Pregunta de Reflexión</button>
      </div>

      <div class="section-block">
        <h2>Aplicación Práctica</h2>
        <div id="aplicacionContainer">
          <div v-for="(aplicacion, index) in formData.aplicacion" :key="index" class="item-group">
            <h3>Aplicación Práctica {{ index + 1 }}</h3>
            <div class="form-group">
              <label>Pregunta:</label>
              <input type="text" v-model="aplicacion.pregunta" placeholder="Ej: ¿Cómo puedo aplicar la fe en mi vida diaria?">
            </div>
            <div class="form-group">
              <label>Respuesta:</label>
              <textarea v-model="aplicacion.respuesta" rows="2" placeholder="Tomando decisiones basadas en la confianza en Dios..."></textarea>
            </div>
            <button type="button" class="remove-button" @click="removeAplicacion(index)">Eliminar</button>
          </div>
        </div>
        <button type="button" class="add-button" @click="addAplicacion">+ Añadir Aplicación Práctica</button>
      </div>

      <div class="form-actions">
        <button type="submit" class="submit-button">
          Guardar
        </button>
        <router-link to="/" class="preview-button">
                    Cancelar
        </router-link>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { initializeApp } from 'https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js';
import { 
  getFirestore, 
  collection, 
  addDoc 
} from 'https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js';
const router = useRouter();
// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDq8savWb-t4hfoZ8Q7XQf_l0kIESyAwmA",
  authDomain: "estudiosbiblicos-cpjr.firebaseapp.com",
  projectId: "estudiosbiblicos-cpjr",
  storageBucket: "estudiosbiblicos-cpjr.firebasestorage.app",
  messagingSenderId: "622848730929",
  appId: "1:622848730929:web:13fd5af5f51a9f5b5a3210",
  measurementId: "G-FMKCZZ09HW"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Datos reactivos del formulario
const formData = reactive({
  navTitulo: '',
  definicion: '',
  lecturasClave: [],
  preRef: [],
  aplicacion: []
});

// Funciones para manejar los arrays
const addLecturaClave = () => {
  formData.lecturasClave.push({ cita: '', versiculo: '' });
};

const removeLectura = (index) => {
  formData.lecturasClave.splice(index, 1);
};

const addPreRef = () => {
  formData.preRef.push({ pregunta: '', respuesta: '' });
};

const removePreRef = (index) => {
  formData.preRef.splice(index, 1);
};

const addAplicacion = () => {
  formData.aplicacion.push({ pregunta: '', respuesta: '' });
};

const removeAplicacion = (index) => {
  formData.aplicacion.splice(index, 1);
};

// Función para enviar el formulario
const submitForm = async () => {
  try {
    // Filtrar elementos vacíos
    const filteredData = {
      Nav_titulo: formData.navTitulo,
      Definicion: formData.definicion,
      Lectura_clave: formData.lecturasClave.filter(item => item.cita || item.versiculo),
      Pre_ref: formData.preRef.filter(item => item.pregunta || item.respuesta),
      aplicacion: formData.aplicacion.filter(item => item.pregunta || item.respuesta)
    };

    console.log('Enviando datos:', filteredData);

    // Guardar en Firebase
    if (filteredData.Nav_titulo && filteredData.Definicion) {
      await addDoc(collection(db, "studies"), {
        title: filteredData.Nav_titulo,
        content: filteredData,
        createdAt: new Date()
      });
      
      alert("Estudio agregado correctamente");
        router.push('/');
    } else {
      alert("Por favor completa los campos obligatorios");
    }
  } catch (error) {
    console.error('Error al agregar estudio:', error);
    alert('Error al agregar estudio: ' + error.message);
  }
};

// Función para previsualizar JSON
const previewJSON = () => {
  const filteredData = {
    Nav_titulo: formData.navTitulo,
    Definicion: formData.definicion,
    Lectura_clave: formData.lecturasClave.filter(item => item.cita || item.versiculo),
    Pre_ref: formData.preRef.filter(item => item.pregunta || item.respuesta),
    aplicacion: formData.aplicacion.filter(item => item.pregunta || item.respuesta)
  };
  
  console.log('JSON Preview:', JSON.stringify(filteredData, null, 2));
  alert('Revisa la consola para ver el JSON previsualizado');
};

// Inicializar con un elemento en cada sección
onMounted(() => {
  addLecturaClave();
  addPreRef();
  addAplicacion();
});
</script>