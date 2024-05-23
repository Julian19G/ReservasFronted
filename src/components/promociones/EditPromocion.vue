<template>
    <div class="container text-start">
        <h1 class="text-primary fw-bold">Editar Promocion</h1>
        <div class="card">
            <div class="card-header fw-bold">
                Editar Promocion
            </div>
            <div class="card-body">
                <form @submit.prevent="updatePromocion">
                    <div class="row mb-3">
                        <label for="id" class="form-label">ID</label>
                        <div class="input-group">
                            <div class="input-group-text">
                                <font-awesome-icon icon="tag" />
                            </div>
                            <input type="text" class="form-control" id="id" placeholder="ID de la Promocion" disabled v-model='promocion.id'>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label for="id_paquete" class="form-label">Id del Paquete:</label>
                        <div class="input-group">
                            <div class="input-group-text">
                                <font-awesome-icon icon="tag" />
                            </div>
                            <input type="text" class="form-control" id="id_paquete" placeholder="Nombre del Paquete de Viaje" v-model='promocion.id_paquete'>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label for="descuento" class="form-label">Descuento:</label>
                        <div class="input-group">
                            <div class="input-group-text">
                                <font-awesome-icon icon="building" />
                            </div>
                            <input type="text" class="form-control" id="descuento" placeholder="Descuento de Paquete de Viaje" v-model='promocion.descuento'>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label for="fecha_inicio" class="form-label">Fecha Inicio de Promocion:</label>
                        <div class="input-group">
                            <div class="input-group-text">
                                <font-awesome-icon icon="building" />
                            </div>
                            <input type="date" class="form-control" id="fecha_inicio" placeholder="Fecha Inicio de Paquete de Viaje" v-model='promocion.fecha_inicio'>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label for="fecha_fin" class="form-label">Fecha Fin de Promocion:</label>
                        <div class="input-group">
                            <div class="input-group-text">
                                <font-awesome-icon icon="building" />
                            </div>
                            <input type="date" class="form-control" id="fecha_fin" placeholder="Fecha Fin de Paquete de Viaje" v-model='promocion.fecha_fin'>
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
    name: 'EditPromocion',
    data() {
        return {
            promocion: {
                id: '',
                id_paquete: '',
                descuento: '',
                fecha_inicio: '',
                fecha_fin: ''
            },
        };
    },
    methods: {
        cancel() {
            this.$router.push({ name: 'promociones' });
        },
        async loadPromocion() {
            try {
                const res = await axios.get(`http://127.0.0.1:8000/api/promociones/${this.$route.params.id}`);
                if (res.status === 200) {
                    this.promocion = res.data.promocion;
                }
            } catch (error) {
                Swal.fire('Error!', error.message, 'error');
            }
        },
        async updatePromocion() {
            try {
                const res = await axios.put(`http://127.0.0.1:8000/api/promociones/${this.$route.params.id}`, this.promocion);
                if (res.status === 200) {
                    this.$router.push({ name: 'promociones' });
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'La Promocion ha sido actualizado',
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
        this.loadPromocion();
    }
};
</script>