<template>
    <div class="container text-start">
        <h1 class="text-primary fw-bold">Nuevo Pago</h1>
        <div class="card">
            <div class="card-header fw-bold">
                Información de los Pagos
            </div>
            <div class="card-body">
                <form @submit.prevent="savePago">
                    <div class="row mb-3">
                        <label for="id_viaje" class="form-label">Id Viaje:</label>
                        <div class="input-group">
                            <div class="input-group-text">
                                <font-awesome-icon icon="tag" />
                            </div>
                            <select class="form-control" id="id_viaje" v-model="pago.id_viaje">
                                <option value="" disabled>Seleccione un Viaje</option>
                                <option v-for="viaje in viajes" :key="viaje.id" :value="viaje.id">
                                    {{ viaje.id }}
                                </option>
                            </select>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label for="fecha_pago" class="form-label">Fecha de Pago:</label>
                        <div class="input-group">
                            <div class="input-group-text"><font-awesome-icon icon="calendar" /></div>
                            <input type="date" class="form-control" id="fecha_pago" v-model='pago.fecha_pago'>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label for="monto" class="form-label">Monto:</label>
                        <div class="input-group">
                            <div class="input-group-text"><font-awesome-icon icon="dollar" /></div>
                            <input type="number" class="form-control" id="monto" v-model='pago.monto'>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label for="metodo_pago" class="form-label">Método de Pago:</label>
                        <div class="input-group">
                            <div class="input-group-text"><font-awesome-icon icon="credit-card" /></div>
                            <input type="text" class="form-control" id="metodo_pago" v-model='pago.metodo_pago'>
                        </div>
                    </div>
                    <div class="col-auto">
                        <button type="submit" class="btn btn-primary">
                            <font-awesome-icon icon="save" />
                            Guardar
                        </button>
                        <router-link to="/pagos" class="btn btn-secondary mx-1">
                            <font-awesome-icon icon="arrow-left" />
                            Volver
                        </router-link>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2';

export default {
    name: 'NewPago',
    data() {
        return {
            pago: {
                id_viaje: '',
                fecha_pago: '',
                monto: '',
                metodo_pago: ''
            },
            viajes: []
        };
    },
    methods: {
        savePago() {
            axios.post('http://127.0.0.1:8000/api/pagos', this.pago)
                .then(response => {
                    Swal.fire('¡Éxito!', 'Pago guardado exitosamente', 'success');
                    this.$router.push({ name: 'Pagos' });
                })
                .catch(error => {
                    Swal.fire('Error', error.response.data.message || 'Ocurrió un error al guardar el pago', 'error');
                });
        },
        loadViajes() {
            axios.get('http://127.0.0.1:8000/api/viajes')
                .then(response => {
                    this.viajes = response.data.viajes;
                })
                .catch(error => {
                    console.error('Error al cargar los viajes:', error.message);
                    Swal.fire('Error', 'Ocurrió un error al cargar los viajes', 'error');
                });
        }
    },
    mounted() {
        this.loadViajes();
    }
};
</script>
