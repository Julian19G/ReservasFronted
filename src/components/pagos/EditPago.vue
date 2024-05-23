<template>
    <div class="container text-start">
        <h1 class="text-primary fw-bold">Editar Pago</h1>
        <div class="card">
            <div class="card-header fw-bold">
                Editar Pago
            </div>
            <div class="card-body">
                <form @submit.prevent="updatePago">
                    <div class="row mb-3">
                        <label for="id_viaje" class="form-label">Id del Viaje:</label>
                        <div class="input-group">
                            <div class="input-group-text">
                                <font-awesome-icon icon="tag" />
                            </div>
                            <input type="text" class="form-control" id="id_viaje" placeholder="Id del Viaje" v-model='pago.id_viaje'>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label for="fecha_pago" class="form-label">Fecha del Pago:</label>
                        <div class="input-group">
                            <div class="input-group-text">
                                <font-awesome-icon icon="calendar" />
                            </div>
                            <input type="date" class="form-control" id="fecha_pago" placeholder="Fecha del Pago" v-model='pago.fecha_pago'>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label for="monto" class="form-label">Valor del Pago:</label>
                        <div class="input-group">
                            <div class="input-group-text">
                                <font-awesome-icon icon="dollar" />
                            </div>
                            <input type="number" class="form-control" id="monto" placeholder="Valor del Pago" v-model='pago.monto'>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label for="metodo_pago" class="form-label">Método de Pago:</label>
                        <div class="input-group">
                            <div class="input-group-text">
                                <font-awesome-icon icon="credit-card" />
                            </div>
                            <input type="text" class="form-control" id="metodo_pago" placeholder="Método de Pago" v-model='pago.metodo_pago'>
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
    name: 'EditPago',
    data() {
        return {
            pago: {
                id_viaje: '',
                fecha_pago: '',
                monto: '',
                metodo_pago: ''
            }
        };
    },
    methods: {
        cancel() {
            this.$router.push({ name: 'Pagos' });
        },
        async loadPago() {
            try {
                const res = await axios.get(`http://127.0.0.1:8000/api/pagos/${this.$route.params.id}`);
                if (res.status === 200) {
                    this.pago = res.data.pago;
                }
            } catch (error) {
                Swal.fire('Error!', error.message, 'error');
            }
        },
        async updatePago() {
            try {
                const res = await axios.put(`http://127.0.0.1:8000/api/pagos/${this.$route.params.id}`, this.pago);
                if (res.status === 200) {
                    this.$router.push({ name: 'Pagos' });
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'El pago ha sido actualizado',
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
        this.loadPago();
    }
};
</script>
