<template>
  <div class="container mt-4">
    <h2>Datos Personales</h2>
    <div class="row">
      <div class="col-md-6">
        <!-- Campo Nombres -->
        <div class="mb-3">
          <label for="nombres" class="form-label">Colegiado*</label>
          <input v-model="nombres" type="text" class="form-control" id="nombres" placeholder="Ingrese sus nombres"
            disabled />
        </div>
        <!-- Campo Grado Académico -->
        <!-- <div class="mb-3">
          <label for="grado" class="form-label">Grado de Instrucción*</label>
          <select v-model="grado" class="form-select" id="grado" :class="{ 'is-invalid': !validarGrado() }">
            <option value="NULL">Seleccione su grado de Instrucción</option>
            <option value="TITULADO">TITULADO</option>
            <option value="BACHILLER EN MAESTRIA">BACHILLER EN MAESTRIA</option>
            <option value="TITULADO EN MAESTRIA">TITULADO EN MAESTRIA</option>
            <option value="BACHILLER EN DOCTORADO">BACHILLER EN DOCTORADO</option>
            <option value="TITULADO EN DOCTORADO">TITULADO EN DOCTORADO</option>
          </select>
        </div> -->
        <!-- Campo Especialidad -->
        <!-- <div class="mb-3">
          <label for="especialidad" class="form-label">Especialidad*</label>
          <textarea v-model="especialidad" class="form-control" id="especialidad"
            placeholder="Ingrese sus especialidades, separadas por comas si tiene más de una"></textarea>
          <small class="form-text text-muted">Si tiene más de una especialidad, sepárelas con comas (,)</small>
        </div> -->
        <!-- 2nda Carrera -->
        <!-- <div class="mb-3">
          <label for="segCarrera" class="form-label">Segunda Profesión</label>
          <select v-model="segCarrera" class="form-select" id="segCarrera">
            <option value=null>Seleccione su grado de Instrucción</option>
            <option value="ADMINISTRACION">Administración</option>
            <option value="DERECHO">Derecho</option>
            <option value="ECONOMIA">Economía</option>
            <option value="CIENCIAS SALUD">Ciencias de la Salud</option>
            <option value="AGRONOMIA">Agronomía</option>
            <option value="CIENCIAS-AMBIENTALES">Ciencias Ambientales</option>
            <option value="INGENIERIA-AGRICOLA">Ingeniería Agrícola</option>
            <option value="INGENIERIA-AGROINDUSTRIAL">Ingeniería Agroindustrial</option>
            <option value="INGENIERIA-AMBIENTAL">Ingeniería Ambiental</option>
            <option value="INGENIERIA-BIOMEDICA">Ingeniería Biomédica</option>
            <option value="INGENIERIA-CIVIL">Ingeniería Civil</option>
            <option value="INGENIERIA-MINAS">Ingeniería de Minas</option>
            <option value="INGENIERIA-SISTEMAS">Ingeniería de Sistemas/Ingeniería Informática</option>
            <option value="INGENIERIA-INDUSTRIAL">Ingeniería Industrial</option>
            <option value="INGENIERIA-MECANICA">Ingeniería Mecánica</option>
            <option value="INGENIERIA-MECATRONICA">Ingeniería Mecatrónica</option>
            <option value="INGENIERIA-QUIMICA">Ingeniería Química</option>
            <option value="ARQUITECTURA">Arquitectura</option>
            <option value="CIENCIAS-COMUNICACION">Ciencias de la Comunicación</option>
          </select>
        </div> -->
        <!-- 3ra Carrera -->
        <!-- <div class="mb-3">
          <label for="terCarrera" class="form-label">Tercera Profesión</label>
          <select v-model="terCarrera" class="form-select" id="terCarrera">
            <option value=null>Seleccione su grado de Instrucción</option>
            <option value="ADMINISTRACION">Administración</option>
            <option value="DERECHO">Derecho</option>
            <option value="ECONOMIA">Economía</option>
            <option value="CIENCIAS SALUD">Ciencias de la Salud</option>
            <option value="AGRONOMIA">Agronomía</option>
            <option value="CIENCIAS-AMBIENTALES">Ciencias Ambientales</option>
            <option value="INGENIERIA-AGRICOLA">Ingeniería Agrícola</option>
            <option value="INGENIERIA-AGROINDUSTRIAL">Ingeniería Agroindustrial</option>
            <option value="INGENIERIA-AMBIENTAL">Ingeniería Ambiental</option>
            <option value="INGENIERIA-BIOMEDICA">Ingeniería Biomédica</option>
            <option value="INGENIERIA-CIVIL">Ingeniería Civil</option>
            <option value="INGENIERIA-MINAS">Ingeniería de Minas</option>
            <option value="INGENIERIA-SISTEMAS">Ingeniería de Sistemas/Ingeniería Informática</option>
            <option value="INGENIERIA-INDUSTRIAL">Ingeniería Industrial</option>
            <option value="INGENIERIA-MECANICA">Ingeniería Mecánica</option>
            <option value="INGENIERIA-MECATRONICA">Ingeniería Mecatrónica</option>
            <option value="INGENIERIA-QUIMICA">Ingeniería Química</option>
            <option value="ARQUITECTURA">Arquitectura</option>
            <option value="CIENCIAS-COMUNICACION">Ciencias de la Comunicación</option>
          </select>
        </div> -->

        <div class="row">
          <!-- Campo Correo electrónico -->
          <div class="mb-3">
            <label for="email" class="form-label">Correo Electrónico*</label>
            <input v-model="email" type="email" class="form-control lowercase" id="email"
              placeholder="Ingrese su correo electrónico" :class="{ 'is-invalid': !validarEmail() }" />
            <div v-if="!validarEmail()" class="invalid-feedback">
              Por favor, ingrese un correo electrónico válido.
            </div>
          </div>
          <!-- Campo Dirección -->
          <div class="mb-3">
            <label for="direccion" class="form-label">Dirección*</label>
            <input v-model="direccion" type="text" class="form-control" id="direccion"
              placeholder="Ingrese la dirección de su domicilio" />
          </div>
          <!-- Campo Correo Electrónico -->
        </div>

      </div>
      <div class="col-md-6">

        <div class="row">
          <div class="col-md-6">
            <!-- Selectores de Departamento, Provincia y Distrito -->
            <div class="mb-3">
              <label for="departamento" class="form-label">Departamento de vivienda*</label>
              <select v-model="departamento" @change="actualizarProvincias" class="form-select" id="departamento"
                :class="{ 'is-invalid': !validarDepartamento() }">
                <option value="">Seleccione departamento</option>
                <option v-for="dpto in departamentos" :key="dpto.id" :value="dpto.name.toUpperCase()">
                  {{ dpto.name }}
                </option>
              </select>
              <!-- <div v-if="!validarDepartamento()" class="invalid-feedback">
            Por favor, seleccione el departamento.
          </div> -->
            </div>
            <div class="mb-3">
              <label for="provincia" class="form-label">Provincia de vivienda*</label>
              <select v-model="provincia" @change="actualizarDistritos" class="form-select" id="provincia"
                :class="{ 'is-invalid': !validarProvincia() }">
                <option value="">Seleccione provincia</option>
                <option v-for="prov in provincias" :key="prov.id" :value="prov.name.toUpperCase().trim()">
                  {{ prov.name }}
                </option>
              </select>
              <!-- <div v-if="!validarProvincia()" class="invalid-feedback">
            Por favor, seleccione la provincia.
          </div> -->
            </div>
            <div class="mb-3">
              <label for="distrito" class="form-label">Distrito de vivienda*</label>
              <select v-model="distrito" class="form-select" id="distrito"
                :class="{ 'is-invalid': !validarDistrito() }">
                <option value="">Seleccione distrito</option>
                <option v-for="dist in distritos" :key="dist.id" :value="dist.name.toUpperCase()">
                  {{ dist.name }}
                </option>
              </select>
              <!-- <div v-if="!validarDistrito()" class="invalid-feedback">
            Por favor, seleccione el distrito.
          </div> -->
            </div>
          </div>
          <div class="col-md-6">
            <!-- Campo Teléfono -->
            <div class="mb-3">
              <label for="telefono" class="form-label">Teléfono Fijo*</label>
              <input v-model="telefono" type="text" class="form-control" id="telefono" placeholder="Ingrese su teléfono"
                :class="{ 'is-invalid': !validarTelefono() }" />
              <div v-if="!validarTelefono()" class="invalid-feedback">
                Por favor, ingrese un número de teléfono válido (mínimo 9 dígitos, incluyendo el prefijo de la
                ciudad).
              </div>
            </div>
            <!-- Campo Celular -->
            <div class="mb-3">
              <label for="celular" class="form-label">Celular*</label>
              <input v-model="celular" type="text" class="form-control" id="celular" placeholder="Ingrese su celular"
                :class="{ 'is-invalid': !validarCelular() }" />
              <div v-if="!validarCelular()" class="invalid-feedback">
                Por favor, ingrese un número de celular válido (mínimo 9 dígitos).
              </div>
            </div>
            <!-- Campo Género -->
            <div class="mb-3">
              <label for="genero" class="form-label">Género</label>
              <select v-model="genero" class="form-select" id="genero" :class="{ 'is-invalid': !validarGenero() }">
                <option value="SIN DEFINIR">Seleccione su género</option>
                <option value="FEMENINO">Femenino</option>
                <option value="MASCULINO">Masculino</option>
              </select>
              <!-- <div v-if="!validarGenero()" class="invalid-feedback">
            Por favor, seleccione su género.
          </div> -->
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Botón de enviar -->
    <button @click="actualizarDatosPersonales" class="btn btn-primary" :disabled="!camposCompletos()">
      Siguiente
    </button>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";
import departamentosData from "@/assets/json/ubigeo_peru_2016_departamentos.json";
import provinciasData from "@/assets/json/ubigeo_peru_2016_provincias.json";
import distritosData from "@/assets/json/ubigeo_peru_2016_distritos.json";

export default {
  props: {
    documento: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      nombres: "",
      apellidos: "",
      //grado: "",
      //segCarrera: "",
      //terCarrera: "",
      telefono: "",
      celular: "",
      email: "",
      direccion: "",
      //especialidad: "",
      genero: "",
      departamento: "",
      provincia: "",
      distrito: "",
      departamentos: departamentosData,
      provincias: provinciasData,
      distritos: distritosData,
    };
  },
  watch: {
    // grado(newVal) {

    //   if (newVal === "TITULADO") {
    //     this.especialidad = "Contador Público Colegiado";
    //   } else if (newVal !== "TITULADO" && this.especialidad === "Contador Público Colegiado") {
    //     this.especialidad = "";
    //   }
    // },
  },
  created() {
    // Determina la URL de la API basándose en el entorno
    if (process.env.NODE_ENV === "production") {
      this.apiUrl = "https://actualizardatosapi.ccpll.org/api";
    } else {
      this.apiUrl = "http://localhost:8000/api";
    }
  },
  mounted() {
    //console.log("Documento recibido:", this.documento);
    this.obtenerDatosColegiado();
    // Aquí puedes realizar cualquier lógica adicional basada en el valor del documento
  },
  methods: {

    obtenerDatosColegiado() {
      Swal.fire({
        title: 'UN MOMENTO POR FAVOR',
        text: 'Estamos extrayendo datos...',
        icon: 'info',
        showConfirmButton: false,
        timer: 2000  // 1.5 segundos
      });
      axios
        .get(`${this.apiUrl}/collegiates/${this.documento}`)
        .then((response) => {
          const data = response.data;
          this.nombres = data.DATOS_COLEGIADO;
          this.telefono = data.TELEFONOS;
          this.celular = data.CELULAR;
          this.email = data.EMAIL;
          this.direccion = data.DIRECCION;
          this.genero = data.SEXO;
          //this.segCarrera = data.SEGCARRERA;
          //this.terCarrera = data.TERCARRERA;

          if (data.GRADO_INSTRUCCION === "NULL") {
            this.grado = data.GRADO_INSTRUCCION;
            this.actualizarProvincias();
            this.actualizarDistritos();
          } else {
            //this.grado = data.GRADO_INSTRUCCION;
            //this.especialidad = data.ESPECIALIDAD;
            this.departamento = data.DEPARTAMENTO;
            this.provincia = data.PROVINCIA;
            this.distrito = data.DISTRITO;
            //this.especialidad = data.ESPECIALIDAD;
          }
        })
        .catch((error) => {
          console.error("Error al obtener datos del colegiado:", error);
          // Manejar errores si es necesario
        });
    },
    validarTelefono() {
      return /^\d{9,}$/.test(this.telefono);
    },
    validarCelular() {
      return /^\d{9,}$/.test(this.celular);
    },
    validarEmail() {
      // Regex simple para validar el formato de correo
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email);
    },
    validarGenero() {
      return this.genero !== "SIN DEFINIR";
    },
    // validarGrado() {
    //   return this.grado !== "NULL";
    // },
    // validarEspecialidad() {
    //   return this.especialidad !== null && this.especialidad !== '';
    // },
    validarDepartamento() {
      return this.departamento !== "";
    },
    validarProvincia() {
      return this.provincia !== "";
    },
    validarDistrito() {
      return this.distrito !== "";
    },
    camposCompletos() {
      return (
        this.validarGenero() &&
        this.validarDepartamento() &&
        this.validarProvincia() &&
        this.validarDistrito()
        //this.validarGrado() &&
        //this.validarEspecialidad()
      );
    },
    actualizarProvincias() {
      this.provincias = provinciasData.filter(
        (prov) =>
          prov.department_id === this.getDepartamentoId(this.departamento)
      );
      this.provincia = "";
      this.distritos = [];
    },
    actualizarDistritos() {
      this.distritos = distritosData.filter(
        (dist) => dist.province_id === this.getProvinciaId(this.provincia)
      );
      this.distrito = "";
    },
    getDepartamentoId(nombre) {
      const departamento = this.departamentos.find(
        (dpto) => dpto.name.toUpperCase() === nombre.toUpperCase()
      );
      return departamento ? departamento.id : null;
    },
    getProvinciaId(nombre) {
      const provincia = this.provincias.find(
        (prov) => prov.name.toUpperCase().trim() === nombre.toUpperCase().trim()
      );
      return provincia ? provincia.id : null;
    },
    actualizarDatosPersonales() {
      axios
        .put(`${this.apiUrl}/collegiatesActualizarDatosPersonales`, {
          telefono: this.telefono,
          celular: this.celular,
          email: this.email.toUpperCase(),
          direccion: this.direccion.toUpperCase(),
          genero: this.genero.toUpperCase(),
          departamento: this.departamento.toUpperCase(),
          provincia: this.provincia.toUpperCase(),
          distrito: this.distrito.toUpperCase(),
          //grado: this.grado.toUpperCase(),
          //especialidad: this.especialidad.toUpperCase(),
          documento: this.documento,
          //segCarrera: this.segCarrera === "" ? null : this.segCarrera,
          //terCarrera: this.terCarrera === "" ? null : this.terCarrera,
        })
        .then((response) => {
          Swal.fire(
            "Actualización exitosa",
            "Tus datos personales han sido actualizados correctamente",
            "success"
          );
          this.$router.push(`/actualizarCollegiates4/${this.documento}`);
        })
        .catch((error) => {
          console.error("Error al actualizar datos del colegiado:", error);
          Swal.fire(
            "Error",
            "Hubo un problema al actualizar tus datos",
            "error"
          );
        });
    },
  },
};
</script>

<style>
.lowercase {
  text-transform: lowercase;
}
</style>
