<template>
    <div class="container">
        <h1>Listado de Viajes de Reservas</h1>
        <button @click="newViaje()" class="btn btn-success mx-2">
            <font-awesome-icon icon="plus" />
        </button>
        <table class="table">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Id Paquete</th>
                    <th scope="col">Id Cliente</th>
                    <th scope="col">Fecha De Reserva</th>
                    <th scope="col">Cantidad de Personas</th>
                    <th scope="col">Total</th>
                    <th scope="col">Estado</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(viaje, index) in viajes" :key="index">
                    <th scope="row">{{ index + 1 }}</th>
                    <td>{{ viaje.id_paquete }}</td>
                    <td>{{ viaje.id_cliente }}</td>
                    <td>{{ viaje.fecha_reserva }}</td>
                    <td>{{ viaje.cantidad_personas }}</td>
                    <td>{{ viaje.total }}</td>
                    <td>{{ viaje.estado }}</td>
                    <td>
                        <button @click="deleteViaje(viaje.id)" class="btn btn-danger mx-2">
                            <font-awesome-icon icon="trash" />
                        </button>
                            <button @click="editViaje(viaje.id)" class="btn btn-warning mx-2">
                            <font-awesome-icon icon="pencil" />
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import axios from 'axios';
import Swal from "sweetalert2";

export default {
    name: 'ViajesDeReservas',
    data() {
        return {
            viajes: []
        };
    },
    methods: {
        deleteViaje(id) {
            Swal.fire({
                title: `¿Desea eliminar el viaje con ID ${id}?`,
                showCancelButton: true,
                confirmButtonText: "Eliminar",
            }).then((result) => {
                if (result.isConfirmed) {
                    axios.delete(`http://127.0.0.1:8000/api/viajes/${id}`)
                        .then(response => {
                            if (response.data.success) {
                                Swal.fire("¡Eliminado!", "", "success");
                                this.cargarViajes();
                            }
                        })
                        .catch(error => {
                            Swal.fire("¡Error!", error.message, "error");
                        });    
                }
            });
        },
        editViaje(id) {
            this.$router.push({ name: "EditViaje", params: { id } });
        },
        newViaje() {
            this.$router.push({ name: "NewViaje" });
        },
        cargarViajes() {
            axios
                .get('http://127.0.0.1:8000/api/viajes')
                .then(response => {
                    this.viajes = response.data.viajes;
                })
                .catch(error => {
                    console.error('¡Hubo un error al cargar los viajes!', error);
                });
        }
    },
    mounted() {
        this.cargarViajes();
    }
};
</script>
