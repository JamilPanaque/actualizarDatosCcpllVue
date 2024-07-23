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
                            <td>{{ item.especialidad.toUpperCase() }}</td>
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
                        <option value="INGENIERIA-AGROINDUSTRIAL">
                            Ingeniería Agroindustrial
                        </option>
                        <option value="INGENIERIA-AMBIENTAL">Ingeniería Ambiental</option>
                        <option value="INGENIERIA-BIOMEDICA">Ingeniería Biomédica</option>
                        <option value="INGENIERIA-CIVIL">Ingeniería Civil</option>
                        <option value="INGENIERIA-MINAS">Ingeniería de Minas</option>
                        <option value="INGENIERIA-SISTEMAS">
                            Ingeniería de Sistemas/Ingeniería Informática
                        </option>
                        <option value="INGENIERIA-INDUSTRIAL">Ingeniería Industrial</option>
                        <option value="INGENIERIA-MECANICA">Ingeniería Mecánica</option>
                        <option value="INGENIERIA-MECATRONICA">
                            Ingeniería Mecatrónica
                        </option>
                        <option value="INGENIERIA-QUIMICA">Ingeniería Química</option>
                        <option value="ARQUITECTURA">Arquitectura</option>
                        <option value="CIENCIAS-COMUNICACION">
                            Ciencias de la Comunicación
                        </option>
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
                        <option value="INGENIERIA-AGROINDUSTRIAL">
                            Ingeniería Agroindustrial
                        </option>
                        <option value="INGENIERIA-AMBIENTAL">Ingeniería Ambiental</option>
                        <option value="INGENIERIA-BIOMEDICA">Ingeniería Biomédica</option>
                        <option value="INGENIERIA-CIVIL">Ingeniería Civil</option>
                        <option value="INGENIERIA-MINAS">Ingeniería de Minas</option>
                        <option value="INGENIERIA-SISTEMAS">
                            Ingeniería de Sistemas/Ingeniería Informática
                        </option>
                        <option value="INGENIERIA-INDUSTRIAL">Ingeniería Industrial</option>
                        <option value="INGENIERIA-MECANICA">Ingeniería Mecánica</option>
                        <option value="INGENIERIA-MECATRONICA">
                            Ingeniería Mecatrónica
                        </option>
                        <option value="INGENIERIA-QUIMICA">Ingeniería Química</option>
                        <option value="ARQUITECTURA">Arquitectura</option>
                        <option value="CIENCIAS-COMUNICACION">
                            Ciencias de la Comunicación
                        </option>
                    </select>
                </div>
                <button @click="actualizarDatosPersonales" class="btn btn-primary" :disabled="!camposCompletos()">
                    Siguiente
                </button>
            </div>
        </div>
        <!-- Botón de enviar -->

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
                    // this.nombres = data.DATOS_COLEGIADO;
                    // this.telefono = data.TELEFONOS;
                    // this.celular = data.CELULAR;
                    // this.email = data.EMAIL;
                    // this.direccion = data.DIRECCION;
                    // this.genero = data.SEXO;
                    this.segCarrera = data.SEGCARRERA;
                    this.terCarrera = data.TERCARRERA;

                    // if (data.GRADO_INSTRUCCION === "NULL") {
                    //     this.grado = data.GRADO_INSTRUCCION;
                    //     this.actualizarProvincias();
                    //     this.actualizarDistritos();
                    // } else {
                    //     //this.grado = data.GRADO_INSTRUCCION;
                    //     //this.especialidad = data.ESPECIALIDAD;
                    //     this.departamento = data.DEPARTAMENTO;
                    //     this.provincia = data.PROVINCIA;
                    //     this.distrito = data.DISTRITO;
                    //     //this.especialidad = data.ESPECIALIDAD;
                    // }
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
                // this.validarGenero() &&
                // this.validarDepartamento() &&
                // this.validarProvincia() &&
                // this.validarDistrito()
                this.validarGrado() && this.validarEspecialidad()
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
                alert('Por favor, complete ambos campos.');
            }
        },
        eliminarGrado(index) {
            this.gradosEspecialidades.splice(index, 1);
        },
        actualizarDatosPersonales() {
            axios
                .put(`${this.apiUrl}/collegiatesActualizarDatosPersonales`, {
                    // telefono: this.telefono,
                    // celular: this.celular,
                    // email: this.email.toUpperCase(),
                    // direccion: this.direccion.toUpperCase(),
                    // genero: this.genero.toUpperCase(),
                    // departamento: this.departamento.toUpperCase(),
                    // provincia: this.provincia.toUpperCase(),
                    // distrito: this.distrito.toUpperCase(),
                    grado: this.grado.toUpperCase(),
                    especialidad: this.especialidad.toUpperCase(),
                    documento: this.documento,
                    segCarrera: this.segCarrera === "" ? null : this.segCarrera,
                    terCarrera: this.terCarrera === "" ? null : this.terCarrera,
                })
                .then((response) => {
                    Swal.fire(
                        "Actualización exitosa",
                        "Tus datos personales han sido actualizados correctamente",
                        "success"
                    );
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
