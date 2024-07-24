<template>
    <div class="container mt-4">
        <h2>Información Laboral</h2>
        <div class="row">
            <div class="col-md-6">
                <!-- Campo Tipo de Empleo -->
                <div class="mb-3">
                    <label for="tipoEmpleo" class="form-label">Tipo de Empleo</label>
                    <select v-model="tipoEmpleo" class="form-select" id="tipoEmpleo">
                        <option value="" disabled>Seleccione el tipo de empleo</option>
                        <option value="DEPENDIENTE">Dependiente</option>
                        <option value="INDEPENDIENTE">Independiente</option>
                    </select>
                </div>
                <!-- Campo Tipo de Cargo -->
                <div class="mb-3">
                    <label for="tipoCargo" class="form-label">Tipo de Cargo</label>
                    <select v-model="tipoCargo" class="form-select" id="tipoCargo">
                        <option value="" disabled>Seleccione el tipo de cargo</option>
                        <option value="AUXILIAR">Auxiliar</option>
                        <option value="ASESOR / CONSULTOR">Asesor / Consultor</option>
                        <option value="ASISTENTE">Asistente</option>
                        <option value="COORDINADOR">Coordinador</option>
                        <option value="SUPERVISOR">Supervisor</option>
                        <option value="JEFE">Jefe</option>
                        <option value="GERENTE">Gerente</option>
                        <option value="SOCIO">Socio</option>
                        <option value="ACCIONISTA">Accionista</option>
                        <option value="DIRECTOR">Director</option>
                        <option value="DOCENTE">Docente</option>
                    </select>
                </div>
                <!-- Campo Cargo -->
                <div class="mb-3">
                    <label for="cargo" class="form-label">Cargo</label>
                    <input v-model="cargo" type="text" class="form-control" id="cargo"
                        placeholder="Ingrese el nombre del cargo" />
                </div>
                <!-- Campo Nombre de la Empresa -->
                <div class="mb-3">
                    <label for="nombreEmpresa" class="form-label">Nombre de la Empresa</label>
                    <input v-model="nombreEmpresa" type="text" class="form-control" id="nombreEmpresa"
                        placeholder="Ingrese el nombre de la empresa" />
                </div>
            </div>
            <div class="col-md-6">
                <!-- Campo Sector de la Empresa -->
                <div class="mb-3">
                    <label for="sectorEmpresa" class="form-label">Sector de la Empresa</label>
                    <select v-model="sectorEmpresa" class="form-select" id="sectorEmpresa">
                        <option value="" disabled>
                            Seleccione el sector de la empresa
                        </option>
                        <option value="AGRICULTURA Y PESCA">Agricultura y Pesca</option>
                        <option value="MINERÍA">Minería</option>
                        <option value="ENERGÍA Y RECURSOS NATURALES">
                            Energía y Recursos Naturales
                        </option>
                        <option value="MANUFACTURA">Manufactura</option>
                        <option value="CONSTRUCCIÓN E INFRAESTRUCTURA">
                            Construcción e Infraestructura
                        </option>
                        <option value="TECNOLOGÍA DE LA INFORMACIÓN Y COMUNICACIONES (TIC)">
                            Tecnología de la Información y Comunicaciones (TIC)
                        </option>
                        <option value="SERVICIOS FINANCIEROS Y SEGUROS">
                            Servicios Financieros y Seguros
                        </option>
                        <option value="COMERCIO Y RETAIL">Comercio y Retail</option>
                        <option value="TRANSPORTE Y LOGÍSTICA">
                            Transporte y Logística
                        </option>
                        <option value="TURISMO Y HOTELERÍA">Turismo y Hotelería</option>
                        <option value="SALUD Y FARMACÉUTICA">Salud y Farmacéutica</option>
                        <option value="EDUCACIÓN">Educación</option>
                        <option value="BIENES RAÍCES E INMOBILIARIO">
                            Bienes Raíces e Inmobiliario
                        </option>
                        <option value="MEDIOS Y ENTRETENIMIENTO">
                            Medios y Entretenimiento
                        </option>
                        <option value="GASTRONOMÍA Y RESTAURANTES">
                            Gastronomía y Restaurantes
                        </option>
                        <option value="CONSULTORÍA Y SERVICIOS PROFESIONALES">
                            Consultoría y Servicios Profesionales
                        </option>
                        <option value="MODA Y TEXTIL">Moda y Textil</option>
                        <option value="QUÍMICA Y PETROQUÍMICA">
                            Química y Petroquímica
                        </option>
                        <option value="AUTOMOTRIZ">Automotriz</option>
                        <option value="ARTES Y CULTURA">Artes y Cultura</option>
                        <option value="Consultoría y Servicios Profesionales">
                            Consultoría y Servicios Profesionales
                        </option>
                        <option value="MODA Y TEXTIL">Moda y Textil</option>
                        <option value="QUÍMICA Y PETROQUÍMICA">
                            Química y Petroquímica
                        </option>
                        <option value="AUTOMOTRIZ">Automotriz</option>
                        <option value="ARTES Y CULTURA">Artes y Cultura</option>
                    </select>
                </div>
                <!-- Selectores de Departamento, Provincia y Distrito -->
                <!-- Selectores de Departamento, Provincia y Distrito -->
                <div class="mb-3">
                    <label for="departamento" class="form-label">Departamento - Lugar de Trabajo*</label>
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
                    <label for="provincia" class="form-label">Provincia - Lugar de Trabajo*</label>
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
                    <label for="distrito" class="form-label">Distrito - Lugar de Trabajo*</label>
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
        </div>
        <!-- Botón de enviar -->
        <button @click="actualizarDatosLaborales" class="btn btn-primary">
            Guardar y Finalizar
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
    mounted() {
        this.obtenerDatosColegiado()

        //this.actualizarProvincias();
        //this.actualizarDistritos();
        // Aquí puedes realizar cualquier lógica adicional basada en el valor del documento
    },
    data() {
        return {
            tipoEmpleo: "",
            nombreEmpresa: "",
            sectorEmpresa: "",
            cargo: "",
            tipoCargo: "",
            departamento: "",
            provincia: "",
            distrito: "",
            departamentos: departamentosData,
            provincias: provinciasData,
            distritos: distritosData,
        };
    },
    created() {
        // Determina la URL de la API basándose en el entorno
        if (process.env.NODE_ENV === "production") {
            this.apiUrl = "https://actualizardatosapi.ccpll.org/api";
        } else {
            this.apiUrl = "http://localhost:8000/api";
        }
    },
    methods: {
        obtenerDatosColegiado() {
            axios
                .get(`${this.apiUrl}/collegiates/${this.documento}`)
                .then((response) => {
                    // Actualizar los datos del formulario con la respuesta obtenida

                    if (response.data.TIPO_EMPLEO === null) {
                        this.actualizarProvincias();
                        this.actualizarDistritos();
                    } else {
                        this.tipoEmpleo	 = response.data.TIPO_EMPLEO;
                        this.tipoCargo = response.data.TIPO_CARGO;
                        this.nombreEmpresa = response.data.EMPRESA;
                        this.sectorEmpresa = response.data.SECTOR_EMPRESA;
                        this.cargo = response.data.CARGO;
                        this.grado = response.data.GRADO_INSTRUCCION;
                        this.departamento = response.data.DEPARTAMENTO_TRABAJO;
                        this.provincia = response.data.PROVINCIA_TRABAJO;
                        this.distrito = response.data.DISTRITO_TRABAJO;
                    }
                })
                .catch((error) => {
                    console.error("Error al obtener datos del colegiado:", error);
                    // Manejar errores si es necesario
                });
        },
        actualizarDatosLaborales() {
            //Validaciones simples antes de enviar los datos
            if (
                this.tipoEmpleo === "dependiente" &&
                (!this.nombreEmpresa ||
                    !this.sectorEmpresa ||
                    !this.cargo ||
                    !this.tipoCargo)
            ) {
                Swal.fire("Error", "Por favor complete todos los campos.", "error");
                return;
            }

            // Realizar la solicitud PUT a la API
            axios
                .put(`${this.apiUrl}/collegiatesActualizarDatosLaborales`, {
                    tipoEmpleo: this.tipoEmpleo.toUpperCase(),
                    nombreEmpresa: this.nombreEmpresa.toUpperCase(),
                    sectorEmpresa: this.sectorEmpresa,
                    cargo: this.cargo.toUpperCase(),
                    tipoCargo: this.tipoCargo.toUpperCase(),
                    departamento: this.departamento.toUpperCase(),
                    provincia: this.provincia.toUpperCase(),
                    distrito: this.distrito.toUpperCase(),
                    documento: this.documento,
                })
                .then((response) => {
                    // Mostrar mensaje de éxito
                    Swal.fire(
                        "Éxito",
                        "Información laboral actualizada correctamente.",
                        "success"
                    ).then(() => {
                        
                    });
                    this.$router.push(`/actualizarCollegiates3`);
                })
                .catch((error) => {
                    console.error("Error al actualizar información laboral:", error);
                    // Mostrar mensaje de error
                    Swal.fire(
                        "Error",
                        "Ocurrió un error al actualizar la información laboral. Intente nuevamente.",
                        "error"
                    );
                });
        },
        validarDepartamento() {
            return this.departamento !== "";
        },
        validarProvincia() {
            return this.provincia !== "";
        },
        validarDistrito() {
            return this.distrito !== "";
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
    },
};
</script>

<style scoped>
.lowercase {
    text-transform: lowercase;
}
</style>
