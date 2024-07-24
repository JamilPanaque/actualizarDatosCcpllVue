<template>
    <div class="container mt-4">
        <h2>Datos Académicos</h2>
        <div class="row">
            <div class="col-md-6">
                <!-- Campo Grado Académico -->
                <div class="mb-3">
                    <label for="grado" class="form-label">Grado de Instrucción*</label>
                    <select v-model="grado" class="form-select" id="grado" :class="{ 'is-invalid': !validarGrado() }">
                        <option value="">Seleccione su grado de Instrucción</option>
                        <option value="TITULADO">TITULADO</option>
                        <option value="BACHILLER EN MAESTRIA">BACHILLER EN MAESTRIA</option>
                        <option value="TITULADO EN MAESTRIA">TITULADO EN MAESTRIA</option>
                        <option value="BACHILLER EN DOCTORADO">BACHILLER EN DOCTORADO</option>
                        <option value="TITULADO EN DOCTORADO">TITULADO EN DOCTORADO</option>
                    </select>
                </div>
                <!-- Campo Especialidad -->
                <div class="mb-3">
                    <label for="especialidad" class="form-label">Especialidad*</label>
                    <textarea v-model="especialidad" class="form-control" id="especialidad"
                        placeholder="Ingrese su especialidad"></textarea>
                </div>
                <button class="btn btn-primary mb-3" @click="agregarGrado">Agregar Grado</button>
                <table class="table">
                    <thead>
                        <tr>
                            <th scope="col">Grado</th>
                            <th scope="col">Especialidad</th>
                            <th scope="col">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, index) in gradosEspecialidades" :key="index">
                            <td>{{ item.grado }}</td>
                            <td>{{ item.especialidad }}</td>
                            <td><button class="btn btn-danger" @click="eliminarGrado(index)">Eliminar</button></td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="col-md-6">
                <!-- 2nda Carrera -->
                <div class="mb-3">
                    <label for="segCarrera" class="form-label">Segunda Profesión</label>
                    <select v-model="segCarrera" class="form-select" id="segCarrera">
                        <option value="null">Seleccione su grado de Instrucción</option>
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
                </div>
                <!-- 3ra Carrera -->
                <div class="mb-3">
                    <label for="terCarrera" class="form-label">Tercera Profesión</label>
                    <select v-model="terCarrera" class="form-select" id="terCarrera">
                        <option value="null">Seleccione su grado de Instrucción</option>
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
                </div>
                <button @click="actualizarDatosaAcademicos" class="btn btn-primary"
                    :disabled="!hayGradosEspecialidades">
                    Siguiente
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";

export default {
    props: {
        documento: {
            type: String,
            required: true,
        },
    },
    data() {
        return {
            grado: "",
            especialidad: "",
            segCarrera: "",
            terCarrera: "",
            gradosEspecialidades: []
        };
    },
    computed: {
        hayGradosEspecialidades() {
            return this.gradosEspecialidades.length > 0;
        }
    },
    watch: {
        grado(newVal) {
            if (newVal === "TITULADO") {
                this.especialidad = "Contador Público Colegiado";
            } else if (
                newVal !== "TITULADO" &&
                this.especialidad === "Contador Público Colegiado"
            ) {
                this.especialidad = "";
            }
        },
    },
    created() {
        if (process.env.NODE_ENV === "production") {
            this.apiUrl = "https://actualizardatosapi.ccpll.org/api";
        } else {
            this.apiUrl = "http://localhost:8000/api";
        }
    },
    mounted() {
        this.obtenerDatosColegiado();
    },
    methods: {
        obtenerDatosColegiado() {
            Swal.fire({
                title: "UN MOMENTO POR FAVOR",
                text: "Estamos extrayendo datos...",
                icon: "info",
                showConfirmButton: false,
                timer: 2000, // 1.5 segundos
            });

            axios
                .get(`${this.apiUrl}/collegiates/${this.documento}`)
                .then((response) => {
                    const data = response.data;
                    this.segCarrera = data.SEGCARRERA;
                    this.terCarrera = data.TERCARRERA;

                    // Solicitar grados y especialidades
                    return axios.get(`${this.apiUrl}/collegiates/${this.documento}/especialidades`);
                })
                .then((response) => {
                    this.gradosEspecialidades = response.data.map(item => ({
                        grado: item.nombreGrado,
                        especialidad: item.especialidad
                    }));
                })
                .catch((error) => {
                    console.error("Error al obtener datos del colegiado:", error);
                    // Manejar errores si es necesario
                });
        },
        validarGrado() {
            return this.grado !== '';
        },
        validarEspecialidad() {
            return this.especialidad !== null && this.especialidad !== "";
        },
        camposCompletos() {
            return (
                this.validarGrado() &&
                this.validarEspecialidad()
            );
        },
        agregarGrado() {
            if (this.grado && this.especialidad) {
                this.gradosEspecialidades.push({
                    grado: this.grado,
                    especialidad: this.especialidad
                });
                this.grado = '';
                this.especialidad = '';
            } else {
                Swal.fire({
                    icon: 'warning',
                    title: 'Campos incompletos',
                    text: 'Por favor, complete ambos campos.',
                    confirmButtonText: 'OK'
                });
            }
        },
        eliminarGrado(index) {
            this.gradosEspecialidades.splice(index, 1);
        },
        actualizarDatosaAcademicos() {
            axios
                .put(`${this.apiUrl}/collegiatesActualizarDatosAcademicos`, {
                    documento: this.documento,
                    segCarrera: this.segCarrera === "" ? null : this.segCarrera,
                    terCarrera: this.terCarrera === "" ? null : this.terCarrera,
                    gradosEspecialidades: this.gradosEspecialidades
                })
                .then((response) => {
                    Swal.fire({
                        title: "Actualización exitosa",
                        text: "Tus datos académicos han sido actualizados correctamente",
                        icon: "success",
                        timer: 1500, // Tiempo en milisegundos
                        showConfirmButton: false, // Oculta el botón de confirmación
                        willClose: () => {
                            // Lógica que deseas ejecutar después de que el alerta se cierre
                            // Por ejemplo, redirigir a otra página o actualizar el estado de la aplicación
                            //console.log("El alerta se ha cerrado automáticamente.");
                        }
                    });
                    this.$router.push(`/actualizarCollegiates2/${this.documento}`);
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
