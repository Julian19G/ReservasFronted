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
                        <label for="id_viaje" class="form-label">Id viaje:</label>
                        <div class="input-group">
                            <div class="input-group-text"><font-awesome-icon icon="tag" /></div>
                            <input type="text" class="form-control" id="id_viaje" placeholder="Id de los Viaje" v-model='pago.id_viaje'>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label for="fecha_pago" class="form-label">Fecha de Pago:</label>
                        <div class="input-group">
                            <div class="input-group-text"><font-awesome-icon icon="building" /></div>
                            <input type="date" class="form-control" id="fecha_pago" placeholder="Fecha de Pago" v-model='pago.fecha_pago'>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label for="monto" class="form-label">Monto:</label>
                        <div class="input-group">
                            <div class="input-group-text"><font-awesome-icon icon="building" /></div>
                            <input type="text" class="form-control" id="monto" placeholder="Monto" v-model='pago.monto'>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label for="metodo_pago" class="form-label">Metodo de Pago:</label>
                        <div class="input-group">
                            <div class="input-group-text"><font-awesome-icon icon="building" /></div>
                            <input type="text" class="form-control" id="metodo_pago" placeholder="Meotodo de Pago" v-model='pago.metodo_pago'>
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
    name: 'NewPago',
    data() {
        return {
            pago: {
                id: '',
                id_viaje: '',
                fecha_pago: '',
                monto: '',
                metodo_pago: ''
            },
        };
    },
    methods: {
        cancel() {
            this.$router.push({ name: 'pagos' });
        },
        async savePago() {
            try {
                const res = await axios.post('http://127.0.0.1:8000/api/pagos', this.pago);
                if (res.status === 200) {
                    this.$router.push({ name: 'pagos' });
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'El Pago ha sido guardado',
                        showConfirmButton: false,
                        timer: 2000
                    });
                }
            } catch (error) {
                console.error('Error:', error.response ? error.response.data : error.message);
                Swal.fire('Error!', error.response ? error.response.data.message : error.message, 'error');
            }
        }
    },
};
</script>
