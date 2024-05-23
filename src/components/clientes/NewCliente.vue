<template>
    <div class="container text-start">
        <h1 class="text-primary fw-bold">Nuevo Cliente</h1>
        <div class="card">
            <div class="card-header fw-bold">
                Información del Cliente
            </div>
            <div class="card-body">
                <form @submit.prevent="saveCliente">
                    <div class="row mb-3">
                        <label for="nombre" class="form-label">Nombre:</label>
                        <div class="input-group">
                            <div class="input-group-text"><font-awesome-icon icon="tag" /></div>
                            <input type="text" class="form-control" id="nombre" placeholder="Nombre del cliente" v-model='cliente.nombre'>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label for="apellido" class="form-label">Apellido:</label>
                        <div class="input-group">
                            <div class="input-group-text"><font-awesome-icon icon="building" /></div>
                            <input type="text" class="form-control" id="apellido" placeholder="Apellido del cliente" v-model='cliente.apellido'>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label for="telefono" class="form-label">Telefono:</label>
                        <div class="input-group">
                            <div class="input-group-text"><font-awesome-icon icon="building" /></div>
                            <input type="text" class="form-control" id="telefono" placeholder="Telefono del cliente" v-model='cliente.telefono'>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label for="email" class="form-label">Email:</label>
                        <div class="input-group">
                            <div class="input-group-text"><font-awesome-icon icon="building" /></div>
                            <input type="text" class="form-control" id="email" placeholder="Email del Cliente" v-model='cliente.email'>
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
    name: 'NewCliente',
    data() {
        return {
            cliente: {
                id: '',
                nombre: '',
                apellido: '',
                telefono: '',
                email: ''
            },
        };
    },
    methods: {
        cancel() {
            this.$router.push({ name: 'clientes' });
        },
        async saveCliente() {
            try {
                const res = await axios.post('http://127.0.0.1:8000/api/clientes', this.cliente, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                if (res.status === 201) {
                    this.$router.push({ name: 'clientes' });
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'El cliente ha sido guardado',
                        showConfirmButton: false,
                        timer: 2000
                    });
                }
            } catch (error) {
                if (error.response && error.response.status === 404) {
                    Swal.fire('Error!', 'Recurso no encontrado. Verifique la URL.', 'error');
                } else {
                    Swal.fire('Error!', error.message, 'error');
                }
            }
        }
    },
};
</script>
