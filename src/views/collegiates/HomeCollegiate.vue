<template>
  <div>
    <br>
    <div class="container">
      <div class="row justify-content-center">
        <!-- Columna para dispositivos grandes (md y superiores) -->
        <div class="col-md-5 order-md-1 mb-4">
          <div class="rounded p-3" style="background-color: #89CFF0;">
            <p style="text-align: justify; text-indent: 20px;">
              El Consejo Directivo del Colegio de Contadores Públicos de La Libertad 2024-2025, se complace en invitar a Ud. a rellenar el formulario de actualización de datos para poder tener nuestros registros actualizados. Por favor, ingrese su documento de identidad en el campo correspondiente para empezar con el proceso. Su colaboración es fundamental para mejorar nuestros servicios.
            </p>
            <p style="text-align: justify;">
              <i class="fas fa-calendar-alt"></i> <b>Fecha Límite: </b>Sábado 03 de Agosto<br>
            </p>
          </div>
        </div>

        <!-- Columna para dispositivos pequeños (sm y menores) -->
        <div class="col-10 col-md-5 order-md-2">
          <form @submit.prevent="buscarColegiado">
            <!-- Campos de búsqueda -->
            <div class="mb-3">
              <label for="documento" class="form-label">Documento de Identidad del Miembro de la Orden</label>
              <input v-model="documento" type="text" class="form-control" id="documento" aria-describedby="documentoHelp">
            </div>
            <div class="mb-3">
              <label for="codigo" class="form-label">Código de Colegiatura</label>
              <input v-model="codigo" type="text" class="form-control" id="codigo" aria-describedby="codigoHelp">
            </div>
            <button type="submit" class="btn btn-primary">Buscar</button>
            <br><br>
            <!-- Campos de información del colegiado (siempre deshabilitados) -->
            <div class="mb-3">
              <label for="nombre" class="form-label">Nombre</label>
              <input v-model="nombre" type="text" class="form-control" id="nombre" aria-describedby="nombreHelp" disabled>
            </div>
            <button @click.prevent="irASiguiente" class="btn btn-success">Siguiente</button>
          </form>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <div class="modal fade" id="termsModal" tabindex="-1" aria-labelledby="termsModalLabel" aria-hidden="true" data-bs-backdrop="static" data-bs-keyboard="false">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="termsModalLabel">Términos y Condiciones</h5>
          </div>
          <div class="modal-body">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.</p>
            <div class="form-check">
              <input class="form-check-input" type="checkbox" v-model="acceptedTerms" id="acceptTerms">
              <label class="form-check-label" for="acceptTerms">
                Acepto los términos y condiciones
              </label>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" :disabled="!acceptedTerms" @click="closeModal">Siguiente</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2';
import { Modal } from 'bootstrap';

export default {
  data() {
    return {
      documento: '',
      nombre: '',
      estado: '',
      apiUrl: '',
      codigo: '',
      codigoTransformado: '',
      cupos: 0,
      grado: '',
      tipoEmpleo: '',
      acceptedTerms: false,
    };
  },
  created() {
    if (process.env.NODE_ENV === "production") {
      this.apiUrl = "https://actualizardatosapi.ccpll.org/api";
    } else {
      this.apiUrl = "http://localhost:8000/api";
    }
  },
  mounted() {
    this.showModal();
  },
  methods: {
    showModal() {
      const modal = new Modal(document.getElementById('termsModal'));
      modal.show();
    },
    closeModal() {
      const modal = Modal.getInstance(document.getElementById('termsModal'));
      modal.hide();
    },
    irASiguiente() {
      if (!this.nombre) {
        Swal.fire({
          icon: 'error',
          title: 'Datos requeridos',
          text: 'Por favor, ingrese correctamente los datos antes de continuar.'
        });
        return;
      } else {
        if (this.grado === "NULL" || this.tipoEmpleo === null) {
          this.$router.push({
            name: 'actualizarCollegiates1',
            params: { documento: this.documento }
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Registros Actualizados',
            text: 'Por temas de control y seguridad, solo se permite llenar el formulario una vez.'
          });
        }
      }
    },
    buscarColegiado() {
      if (this.documento.length < 8) {
        Swal.fire({
          icon: 'error',
          title: 'Documento inválido',
          text: 'El documento de identidad debe tener al menos 8 caracteres.'
        });
        return;
      }
      if (this.codigo.startsWith('02-')) {
        let numeros = this.codigo.slice(3);
        this.codigoTransformado = numeros.padStart(6, '0');
      } else {
        this.codigoTransformado = this.codigo;
      }

      Swal.fire({
        title: 'Buscando información...',
        html: 'Por favor, espera un momento mientras se buscan los datos.',
        allowOutsideClick: false,
        allowEscapeKey: false,
        allowEnterKey: false,
        showConfirmButton: false,
        didOpen: () => {
          Swal.showLoading();
        }
      });

      axios.get(`https://server.ccpll.org/api/listcolegiados/${this.documento}`)
        .then(response => {
          if (response.data && (response.data._CODIGO == this.codigoTransformado)) {
            this.nombre = response.data._DATOS_PERSONALES;
            Swal.fire({
              position: 'top',
              icon: 'success',
              title: 'Información encontrada con éxito.',
              showConfirmButton: false,
              timer: 2000
            });

            axios.get(`${this.apiUrl}/collegiates/${this.documento}`)
              .then((response) => {
                const data = response.data;
                this.grado = data.GRADO_INSTRUCCION;
                this.tipoEmpleo = data.TIPO_EMPLEO;
              })
              .catch((error) => {
                console.error("Error al obtener datos del colegiado:", error);
              });
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Colegiado no encontrado',
              text: 'Por favor, ingrese correctamente sus datos'
            });
            this.documento = '';
            this.nombre = '';
            this.estado = '';
            this.codigo = '';
          }
        })
        .catch(error => {
          Swal.fire({
            icon: 'error',
            title: 'Error al buscar el colegiado',
            text: 'Ocurrió un error al intentar buscar el colegiado. Por favor, inténtalo de nuevo más tarde.'
          });
        });
    },
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}

.modal-content {
  border-radius: 20px;
  background-color: #f8f9fa;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.modal-header {
  border-bottom: none;
}

.modal-footer {
  border-top: none;
  justify-content: center;
}

.modal-body {
  padding: 30px;
}
</style>
