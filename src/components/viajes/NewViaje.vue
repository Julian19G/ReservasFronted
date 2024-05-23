<template>
    <div class="container text-start">
        <h1 class="text-primary fw-bold">Nuevo Viaje</h1>
        <div class="card">
            <div class="card-header fw-bold">
                Información del Viaje
            </div>
            <div class="card-body">
                <form @submit.prevent="saveViaje">
                    <div class="row mb-3">
                        <label for="id_paquete" class="form-label">Id del Paquete:</label>
                        <div class="input-group">
                            <div class="input-group-text"><font-awesome-icon icon="tag" /></div>
                            <input type="text" class="form-control" id="id_paquete" placeholder="Id del Paquete de Viaje" v-model='viaje.id_paquete'>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label for="id_cliente" class="form-label">Id del Cliente:</label>
                        <div class="input-group">
                            <div class="input-group-text"><font-awesome-icon icon="building" /></div>
                            <input type="text" class="form-control" id="id_cliente" placeholder="Id del Cliente " v-model='viaje.id_cliente'>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label for="fecha_reserva" class="form-label">Fecha de Reserva:</label>
                        <div class="input-group">
                            <div class="input-group-text"><font-awesome-icon icon="building" /></div>
                            <input type="date" class="form-control" id="fecha_reserva" placeholder="Fecha de Reserva del Viaje" v-model='viaje.fecha_reserva'>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label for="cantidad_personas" class="form-label">Cantidad de Personas:</label>
                        <div class="input-group">
                            <div class="input-group-text"><font-awesome-icon icon="building" /></div>
                            <input type="text" class="form-control" id="cantidad_personas" placeholder="Cantidad de Personas" v-model='viaje.cantidad_personas'>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label for="total" class="form-label">Total:</label>
                        <div class="input-group">
                            <div class="input-group-text"><font-awesome-icon icon="building" /></div>
                            <input type="text" class="form-control" id="total" placeholder="Total del Viaje" v-model='viaje.total'>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label for="estado" class="form-label">Estado:</label>
                        <div class="input-group">
                            <div class="input-group-text"><font-awesome-icon icon="building" /></div>
                            <input type="text" class="form-control" id="estado" placeholder="Estado del Viaje" v-model='viaje.estado'>
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
    name: 'NewViaje',
    data() {
        return {
            viaje: {
                id: '',
                id_paquete: '',
                id_cliente: '',
                fecha_reserva: '',
                cantidad: '',
                total: '',
                estado: ''
            },
        };
    },
    
    methods: {
        cancel() {
            this.$router.push({ name: 'viajes' });
        },
        async loadViajes() {
            try {
                const res = await axios.get('http://127.0.0.1:8000/api/viajes');
                if (res.status === 200) {
                    this.viajes = res.data.viajes;
                }
            } catch (error) {
                Swal.fire('Error!', error.message, 'error');
            }
        },
        async saveViaje() {
            try {
                const res = await axios.post('http://127.0.0.1:8000/api/viajes', this.viaje);
                if (res.status === 200) {
                    this.$router.push({ name: 'viajes' });
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'El viaje ha sido guardado',
                        showConfirmButton: false,
                        timer: 2000
                    });
                }
            } catch (error) {
                Swal.fire('Error!', error.message, 'error');
            }
        }
    },
    mounted() {
        this.loadViajes();
    }
    
};
</script>