<template>
    <div class="container">
        <h1>Listado de Clientes</h1>
        <button @click="newCliente()" class="btn btn-success mx-2">
            <font-awesome-icon icon="plus" />
        </button>
        <table class="table">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Nombre</th>
                    <th scope="col">Apellido</th>
                    <th scope="col">Telefono</th>
                    <th scope="col">Email</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(cliente, index) in clientes" :key="index">
                    <th scope="row">{{ index + 1 }}</th>
                    <td>{{ cliente.nombre }}</td>
                    <td>{{ cliente.apellido }}</td>
                    <td>{{ cliente.telefono }}</td>
                    <td>{{ cliente.email }}</td>
                    <td>
                        <button @click="deleteCliente(cliente.id)" class="btn btn-danger mx-2">
                            <font-awesome-icon icon="trash" />
                        </button>
                            <button @click="editCliente(cliente.id)" class="btn btn-warning mx-2">
                            <font-awesome-icon icon="pencil" />
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script>
import axios from "axios";
import Swal from "sweetalert2";

export default {
    name: "Cliente",
    data() {
        return {
            clientes: []
        };
    },

    methods: {
        editCliente(id) {
            this.$router.push({ name: "EditCliente", params: { id } });
        },
        newCliente() {
            this.$router.push({ name: "NewCliente" });
        },
        deleteCliente(id) {
            Swal.fire({
                title: `¿Desea eliminar el cliente con ID ${id}?`,
                showCancelButton: true,
                confirmButtonText: "Eliminar",
            }).then((result) => {
                if (result.isConfirmed) {
                    axios.delete(`http://127.0.0.1:8000/api/clientes/${id}`)
                        .then(response => {
                            if (response.data.success) {
                                Swal.fire("Eliminado!", "", "success");
                                // Actualizar la lista de clientes después de eliminar
                                this.loadClientes();
                            }
                        })
                        .catch(error => {
                            Swal.fire("Error!", error.message, "error");
                        });
                }
            });
        },
        loadClientes() {
            axios.get('http://127.0.0.1:8000/api/clientes')
                .then(response => {
                    this.clientes = response.data.clientes;
                })
                .catch(error => {
                    Swal.fire("Error!", error.message, "error");
                });
        }
    },

    mounted() {
        // Llamar al método para cargar los clientes al cargar el componente
        this.loadClientes();
    }
};
</script>