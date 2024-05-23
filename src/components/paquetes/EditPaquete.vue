<template>
    <div class="container text-start">
        <h1 class="text-primary fw-bold">Editar Paquete</h1>
        <div class="card">
            <div class="card-header fw-bold">
                Editar Paquete
            </div>
            <div class="card-body">
                <form @submit.prevent="updatePaquete">
                    <div class="row mb-3">
                        <label for="id" class="form-label">ID</label>
                        <div class="input-group">
                            <div class="input-group-text">
                                <font-awesome-icon icon="tag" />
                            </div>
                            <input type="text" class="form-control" id="id" placeholder="ID del Paquete" disabled v-model='paquete.id'>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label for="nombre" class="form-label">Nombre:</label>
                        <div class="input-group">
                            <div class="input-group-text">
                                <font-awesome-icon icon="tag" />
                            </div>
                            <input type="text" class="form-control" id="nombre" placeholder="Nombre del Paquete de viaje" v-model='paquete.nombre'>
                        </div>
                    </div>

                    <div class="row mb-3">
                        <label for="precio" class="form-label">Precio:</label>
                        <div class="input-group">
                            <div class="input-group-text">
                                <font-awesome-icon icon="building" />
                            </div>
                            <input type="text" class="form-control" id="precio" placeholder="Precio del Paquete de viaje" v-model='paquete.precio'>
                        </div>
                          </div>
                          <div class="row mb-3">
                        <label for="destino" class="form-label">Destino:</label>
                        <div class="input-group">
                            <div class="input-group-text">
                                <font-awesome-icon icon="building" />
                            </div>
                            <input type="text" class="form-control" id="destino" placeholder="Destino del Paquete de Viaje" v-model='paquete.destino'>
                        </div>
                          </div>
                          <div class="row mb-3">
                        <label for="duracion" class="form-label">Duracion:</label>
                        <div class="input-group">
                            <div class="input-group-text">
                                <font-awesome-icon icon="building" />
                            </div>
                            <input type="text" class="form-control" id="duracion" placeholder="Duracion del paquete de Viaje" v-model='paquete.duracion'>
                        </div>
                          </div>
                          <div class="row mb-3">
                        <label for="Disponibilidad" class="form-label">Disponibilidad:</label>
                        <div class="input-group">
                            <div class="input-group-text">
                                <font-awesome-icon icon="building" />
                            </div>
                            <input type="text" class="form-control" id="disponibilidad" placeholder="Disponibilidad del Paquete de Viaje" v-model='paquete.disponibilidad'>
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
    name: 'EditPaquete',
    data() {
        return {
            category: {
                id: '',
                nombre: '',
                precio: '',
                destino: '',
                duracion: '',
                disponibilidad: ''
            },
        };
    },
    methods: {
        cancel() {
            this.$router.push({ name: 'paquetes' });
        },
        async loadPaquete() {
            try {
                const res = await axios.get(`http://127.0.0.1:8000/api/paquetes/${this.$route.params.id}`);
                if (res.status === 200) {
                    this.paquete = res.data.paquete;
                }
            } catch (error) {
                Swal.fire('Error!', error.message, 'error');
            }
        },
        async updatePaquete() {
            try {
                const res = await axios.put(`http://127.0.0.1:8000/api/paquetes/${this.$route.params.id}`, this.paquete);
                if (res.status === 200) {
                    this.$router.push({ name: 'paquetes' });
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'El paquete ha sido actualizado',
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
        this.loadPaquete();
    }
};
</script>