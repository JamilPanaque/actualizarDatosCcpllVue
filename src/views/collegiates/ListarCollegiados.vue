<template>
  <br>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <button @click="exportarExcel" class="btn btn-success">
          <i class="fa fa-file-excel-o"></i> Exportar a Excel
        </button>
        <div class="table-responsive">
          <table class="table table-bordered table-hover text-center">
            <thead class="thead-dark">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Colegiado</th>
                <th scope="col">DNI</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(colegiado, index) in colegiados" :key="index">
                <th scope="row">{{ index + 1 }}</th>
                <td>{{ colegiado.nameCollegiate }}</td>
                <td>{{ colegiado.doiCollegiate }}</td>
              </tr>
              <!-- Agrega más filas según sea necesario -->
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import ExcelJS from 'exceljs';
import Swal from 'sweetalert2';
export default {
  name: 'TablaColegiados',
  data() {
    return {

      colegiados: null,
      cargando: false
    };
  },
  created() {
    // Determina la URL de la API basándose en el entorno
    if (process.env.NODE_ENV === 'production') {
      this.apiUrl = 'https://inscripcioneventosapi.ccpll.org/api';
    } else {
      this.apiUrl = 'http://localhost:8000/api';
    }
  },
  mounted() {
    this.listarColegiados();

  },
  methods: {
    listarColegiados() {
      this.cargando = true; // Activar indicador de carga

      axios.get(`${this.apiUrl}/listarColegiados`)
        .then(response => {
          // Procesar la respuesta aquí
          // Por ejemplo, asignar los datos obtenidos a una propiedad de datos
          this.colegiados = response.data;
          this.cargando = false; // Desactivar indicador de carga cuando la solicitud se completa
        })
        .catch(error => {
          // Manejar errores de solicitud aquí
          console.error('Error al listar colegiados:', error);
          this.cargando = false; // Asegúrate de desactivar el indicador de carga en caso de error
        });
    },
    async exportarExcel() {
     // Verificar si hay datos para exportar
     if (!this.colegiados || this.colegiados.length === 0) {
        console.warn('No hay datos para exportar');
        return;
      }

      // Crear un nuevo libro de Excel
      const workbook = new ExcelJS.Workbook();

      // Agregar una nueva hoja de trabajo
      const worksheet = workbook.addWorksheet('Colegiados');

      // Definir las columnas
      worksheet.columns = [
        { header: 'Colegiado', key: 'nombre' },
        { header: 'DNI', key: 'dni' }
      ];

      // Agregar los datos
      this.colegiados.forEach(colegiado => {
        worksheet.addRow({ nombre: colegiado.nameCollegiate, dni: colegiado.doiCollegiate });
      });

      // Generar el archivo Excel
      const buffer = await workbook.xlsx.writeBuffer();

      // Descargar el archivo Excel
      const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'colegiados.xlsx';
      a.click();
      window.URL.revokeObjectURL(url);
    }
  }
}
</script>

<style scoped>
/* Estilos adicionales para hacer la tabla más bonita */
.table-responsive {
  overflow-x: auto;
}

.table-bordered th,
.table-bordered td {
  border: 1px solid #dee2e6;
}

.table-hover tbody tr:hover {
  background-color: #f5f5f5;
}

/* Estilo de la cabecera */
.table thead th {
  background-color: #001f3f;
  /* Azul navy */
  color: #fff;
  /* Texto blanco */
}
</style>