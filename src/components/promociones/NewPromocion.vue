<template>
    <div class="container text-start">
        <h1 class="text-primary fw-bold">Nueva Promocion</h1>
        <div class="card">
            <div class="card-header fw-bold">
                Información de la Promocion
            </div>
            <div class="card-body">
                <form @submit.prevent="savePromocion">
                    <div class="row mb-3">
                        <label for="id_paquete" class="form-label">Paquete:</label>
                        <div class="input-group">
                            <div class="input-group-text">
                                <font-awesome-icon icon="tag" />
                            </div>
                            <select class="form-control" id="id_paquete" v-model="promocion.id_paquete">
                                <option value="" disabled>Seleccione un paquete</option>
                                <option v-for="paquete in paquetes" :key="paquete.id" :value="paquete.id">
                                    {{ paquete.nombre }} {{ paquete.id }}
                                </option>
                            </select>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label for="descuento" class="form-label">Descuento:</label>
                        <div class="input-group">
                            <div class="input-group-text"><font-awesome-icon icon="building" /></div>
                            <input type="text" class="form-control" id="descuento" placeholder="Descuento del Paquete" v-model="promocion.descuento">
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label for="fecha_inicio" class="form-label">Fecha Inicio:</label>
                        <div class="input-group">
                            <div class="input-group-text"><font-awesome-icon icon="building" /></div>
                            <input type="date" class="form-control" id="fecha_inicio" placeholder="Fecha Inicio de la Promocion" v-model="promocion.fecha_inicio">
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label for="fecha_fin" class="form-label">Fecha Fin:</label>
                        <div class="input-group">
                            <div class="input-group-text"><font-awesome-icon icon="building" /></div>
                            <input type="date" class="form-control" id="fecha_fin" placeholder="Fecha Fin de la Promocion" v-model="promocion.fecha_fin">
                        </div>
                    </div>
                    <button class="btn btn-primary" type="submit">Guardar</button>
                    <button class="btn btn-secondary mx-2" @click="cancel">Cancelar</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2';

export default {
  name: 'NewPromocion',
  data() {
    return {
      promocion: {
        id_paquete: '',
        descuento: '',
        fecha_inicio: '',
        fecha_fin: ''
      },
      paquetes: []
    };
  },
  methods: {
    cancel() {
      this.$router.push({ name: 'promociones' });  
    },
    async savePromocion() {
      try {
        const res = await axios.post('http://127.0.0.1:8000/api/promociones', this.promocion);
        if (res.status >= 200 && res.status < 300) {
          this.$router.push({ name: 'promociones' }); 
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'El paquete de viaje ha sido guardado',
            showConfirmButton: false,
            timer: 2000
          });
        } else {
          Swal.fire('Error!', 'Hubo un problema al guardar el paquete de viaje', 'error');
        }
      } catch (error) {
        console.error('Error al guardar paquete:', error.response || error.message);
        Swal.fire('Error!', error.response?.data?.message || error.message || 'Hubo un problema al guardar el paquete de viaje', 'error');
      }
    },
    async loadPaquetes() {
      try {
        const res = await axios.get('http://127.0.0.1:8000/api/paquetes');
        this.paquetes = res.data;
      } catch (error) {
        console.error('Error al cargar paquetes:', error.message);
      }
    }
  },
  mounted() {
    this.loadPaquetes();
  }
};
</script>
