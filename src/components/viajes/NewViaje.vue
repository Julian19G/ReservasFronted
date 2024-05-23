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
                        <label for="id_paquete" class="form-label">Paquete:</label>
                        <div class="input-group">
                            <div class="input-group-text">
                                <font-awesome-icon icon="tag" />
                            </div>
                            <select class="form-control" id="id_paquete" v-model="viaje.id_paquete">
    <option value="" disabled>Seleccione un paquete</option>
    <option v-for="paquete in paquetes" :key="paquete.id" :value="paquete.id">{{ paquete.nombre }}</option>
</select>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label for="id_cliente" class="form-label">Cliente:</label>
                        <div class="input-group">
                            <div class="input-group-text">
                                <font-awesome-icon icon="user" />
                            </div>
                            <select class="form-control" id="id_cliente" v-model="viaje.id_cliente">
                                <option value="" disabled>Seleccione un cliente</option>
                                <option v-for="cliente in clientes" :key="cliente.id" :value="cliente.id">{{ cliente.nombre }}</option>
                            </select>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label for="fecha_reserva" class="form-label">Fecha de Reserva:</label>
                        <div class="input-group">
                            <div class="input-group-text">
                                <font-awesome-icon icon="calendar" />
                            </div>
                            <input type="date" class="form-control" id="fecha_reserva" v-model="viaje.fecha_reserva">
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label for="cantidad_personas" class="form-label">Cantidad de Personas:</label>
                        <div class="input-group">
                            <div class="input-group-text">
                                <font-awesome-icon icon="users" />
                            </div>
                            <input type="number" class="form-control" id="cantidad_personas" v-model="viaje.cantidad_personas">
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label for="total" class="form-label">Total:</label>
                        <div class="input-group">
                            <div class="input-group-text">
                                <font-awesome-icon icon="dollar-sign" />
                            </div>
                            <input type="number" class="form-control" id="total" v-model="viaje.total">
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label for="estado" class="form-label">Estado:</label>
                        <div class="input-group">
                            <div class="input-group-text">
                                <font-awesome-icon icon="info-circle" />
                            </div>
                            <input type="text" class="form-control" id="estado" v-model="viaje.estado">
                        </div>
                    </div>
                    <div class="row mb-3">
                        <button type="submit" class="btn btn-primary mx-2">
                            <font-awesome-icon icon="save" /> Guardar
                        </button>
                        <button @click="goBack" class="btn btn-secondary mx-2">
                            <font-awesome-icon icon="arrow-left" /> Volver
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import Swal from "sweetalert2";

export default {
    data() {
        return {
            viaje: {
                id_paquete: '',
                id_cliente: '',
                fecha_reserva: '',
                cantidad_personas: '',
                total: '',
                estado: ''
            },
            paquetes: [],
            clientes: []
        };
    },
    methods: {
        goBack() {
    this.$router.push({ name: "viajes" });
},
        loadPaquetes() {
    axios.get('http://127.0.0.1:8000/api/paquetes')
        .then(response => {
            this.paquetes = response.data; // Cambio aquí
        })
        .catch(error => {
            console.error('Error loading packages:', error);
        });
},

        loadClientes() {
            axios.get('http://127.0.0.1:8000/api/clientes')
                .then(response => {
                    this.clientes = response.data.clientes;
                })
                .catch(error => {
                    console.error('Error loading clients:', error);
                });
        },
        saveViaje() {
            axios.post('http://127.0.0.1:8000/api/viajes', this.viaje)
                .then(response => {
                    Swal.fire("¡Viaje creado con éxito!", "", "success");
                    this.goBack();
                })
                .catch(error => {
                    Swal.fire("Error al guardar el viaje", error.message, "error");
                });
        }
    },
    mounted() {
        this.loadPaquetes();
        this.loadClientes();
    }
};
</script>
