<template>
    <div class="container text-start">
        <h1 class="text-primary fw-bold">Nuevo Paquete</h1>
        <div class="card">
            <div class="card-header fw-bold">
                Información de los Paquete
            </div>
            <div class="card-body">
                <form @submit.prevent="savePaquete">
                    <div class="row mb-3">
                        <label for="nombre" class="form-label">Nombre:</label>
                        <div class="input-group">
                            <div class="input-group-text"><font-awesome-icon icon="tag" /></div>
                            <input type="text" class="form-control" id="nombre" placeholder="Nombre de los paquetes" v-model='paquete.nombre'>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label for="precio" class="form-label">Precio:</label>
                        <div class="input-group">
                            <div class="input-group-text"><font-awesome-icon icon="building" /></div>
                            <input type="text" class="form-control" id="precio" placeholder="Precio de la Promocion" v-model='paquete.precio'>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label for="destino" class="form-label">Destino:</label>
                        <div class="input-group">
                            <div class="input-group-text"><font-awesome-icon icon="building" /></div>
                            <input type="text" class="form-control" id="destino" placeholder="Destino del Viaje" v-model='paquete.destino'>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label for="duracion" class="form-label">Duracion:</label>
                        <div class="input-group">
                            <div class="input-group-text"><font-awesome-icon icon="building" /></div>
                            <input type="text" class="form-control" id="duracion" placeholder="duracion del Viaje" v-model='paquete.duracion'>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label for="disponibilidad" class="form-label">Disponibilidad:</label>
                        <div class="input-group">
                            <div class="input-group-text"><font-awesome-icon icon="building" /></div>
                            <input type="text" class="form-control" id="disponibilidad" placeholder="Disponibilidad del viaje" v-model='paquete.disponibilidad'>
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
    name: 'NewPaquete',
    data() {
        return {
            paquete: {
                nombre: '',
                precio: '',
                destino: '',
                duracion: '',
                disponibilidad: ''
            }
        };
    },
    methods: {
        cancel() {
            this.$router.push({ name: 'paquetes' });
        },
        async savePaquete() {
            try {
                const res = await axios.post('http://127.0.0.1:8000/api/paquetes', this.paquete);
                if (res.status >= 200 && res.status < 300) {
                    this.$router.push({ name: 'paquetes' });
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
        }
    }
};
</script>