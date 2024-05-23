<template>
    <div class="container">
        <h1>Listado de Paquetes</h1>
        <button @click="newPaquete()" class="btn btn-success mx-2">
            <font-awesome-icon icon="plus" />
        </button>
        <table class="table">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Nombre</th>
                    <th scope="col">Precio</th>
                    <th scope="col">Destino</th>
                    <th scope="col">Duracion</th>
                    <th scope="col">Disponibilidad</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(paquete, index) in paquetes" :key="index">
                    <th scope="row">{{ index + 1 }}</th>
                    <td>{{ paquete.nombre }}</td>
                    <td>{{ paquete.precio }}</td>
                    <td>{{ paquete.destino }}</td>
                    <td>{{ paquete.duracion }}</td>
                    <td>{{ paquete.disponibilidad }}</td>
                    <td>
                        <button @click="deletePaquete(paquete.id)" class="btn btn-danger mx-2">
                            <font-awesome-icon icon="trash" />
                        </button>
                        <button @click="editPaquete(paquete.id)" class="btn btn-warning mx-2">
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
    name: "Paquete",
    data() {
        return {
            paquetes: []
        };
    },

    methods: {

        editPaquete(id) {
            this.$router.push({ name: "EditPaquete", params: { id } });
        },
        newPaquete() {
            this.$router.push({ name: "NewPaquete" });
        },
        deletePaquete(id) {
            Swal.fire({
                title: `¿Desea eliminar el paquete con ID ${id}?`,
                showCancelButton: true,
                confirmButtonText: "Eliminar",
            }).then((result) => {
                if (result.isConfirmed) {
                    axios.delete(`http://127.0.0.1:8000/api/paquetes/${id}`)
                        .then(response => {
                            if (response.data.success) {
                                Swal.fire("Eliminado!", "", "success");
                                this.loadPaquetes();
                            }
                        })
                        .catch(error => {
                            Swal.fire("Error!", error.message, "error");
                        });
                }
            });
        },
    },

    mounted() {
        axios
                .get('http://127.0.0.1:8000/api/paquetes')
                .then(response => (this.paquetes = response.data.paquetes))
    }
};
</script>