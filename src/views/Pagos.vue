<template>
    <div class="container">
        <h1>Listado de Pagos</h1>
        <button @click="newPago()" class="btn btn-success mx-2">
            <font-awesome-icon icon="plus" />
        </button>
        <table class="table">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Id Viaje</th>
                    <th scope="col">Fecha Pago</th>
                    <th scope="col">Monto</th>
                    <th scope="col">Metodo Pago</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(pago, index) in pagos" :key="pago.id">
                    <th scope="row">{{ index + 1 }}</th>
                    <td>{{ pago.id_viaje }}</td>
                    <td>{{ pago.fecha_pago }}</td>
                    <td>{{ pago.monto }}</td>
                    <td>{{ pago.metodo_pago }}</td>
                    <td>
                        <button @click="deletePago(pago.id)" class="btn btn-danger mx-2">
                            <font-awesome-icon icon="trash" />
                        </button>
                        <button @click="editPago(pago.id)" class="btn btn-warning mx-2">
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
    name: "Pago",
    data() {
        return {
            pagos: []
        };
    },
    methods: {
        editPago(id) {
            this.$router.push({ name: "EditPago", params: { id } });
        },
        newPago() {
            this.$router.push({ name: "NewPago" });
        },
        deletePago(id) {
            Swal.fire({
                title: `¿Desea eliminar el pago con ID ${id}?`,
                showCancelButton: true,
                confirmButtonText: "Eliminar",
            }).then((result) => {
                if (result.isConfirmed) {
                    axios.delete(`http://127.0.0.1:8000/api/pagos/${id}`)
                        .then(response => {
                            if (response.data.success) {
                                Swal.fire("Eliminado!", "", "success");
                                // Actualizar el array de pagos eliminando el pago eliminado
                                this.pagos = this.pagos.filter(pago => pago.id !== id);
                            }
                        })
                        .catch(error => {
                            Swal.fire("Error!", error.message, "error");
                        });
                }
            });
        },
        loadPagos() {
            axios
                .get('http://127.0.0.1:8000/api/pagos')
                .then(response => (this.pagos = response.data.pagos));
        }
    },
    mounted() {
        this.loadPagos();
    }
};
</script>
