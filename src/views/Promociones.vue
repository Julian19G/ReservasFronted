<template>
    <div class="container">
        <h1>Listado de Promociones</h1>
        <button @click="newPromocion()" class="btn btn-success mx-2">
            <font-awesome-icon icon="plus" />
        </button>
        <table class="table">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Nombre</th>
                    <th scope="col">Id Paquete</th>
                    <th scope="col">Descuento</th>
                    <th scope="col">Fecha De Inicio</th>
                    <th scope="col">Fecha De Finalizacion</th>
                    <th scope="col">Acciones</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(promocion, index) in promociones" :key="index">
                    <th scope="row">{{ index + 1 }}</th>
                    <td>{{ promocion.id_paquete || 'N/A' }}</td>
                    <td>{{ promocion.descuento || 'N/A' }}</td>
                    <td>{{ promocion.fecha_inicio || 'N/A' }}</td>
                    <td>{{ promocion.fecha_fin || 'N/A' }}</td>
                    <td>
                        <button @click="editPromocion(promocion.id)" class="btn btn-warning mx-2">
                            <font-awesome-icon icon="pencil" />
                        </button>
                        <button @click="deletePromocion(promocion.id)" class="btn btn-danger mx-2">
                            <font-awesome-icon icon="trash" />
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
    name: "Promocion",
    data() {
        return {
            promociones: []
        };
    },
    methods: {
        editPromocion(id) {
            this.$router.push({ name: "EditPromocion", params: { id } });
        },
        newPromocion() {
            this.$router.push({ name: "NewPromocion" });
        },
        deletePromocion(id) {
            Swal.fire({
                title: `¿Desea eliminar la promocion con ID ${id}?`,
                showCancelButton: true,
                confirmButtonText: "Eliminar",
            }).then((result) => {
                if (result.isConfirmed) {
                    axios.delete(`http://127.0.0.1:8000/api/promociones/${id}`)
                        .then(response => {
                            if (response.data.success) {
                                Swal.fire("Eliminado!", "", "success");
                                this.loadPromociones();
                            }
                        })
                        .catch(error => {
                            Swal.fire("Error!", error.message, "error");
                        });
                }
            });
        },
        loadPromociones() {
            axios.get('http://127.0.0.1:8000/api/promociones')
                .then(response => {
                    this.promociones = response.data.promociones;
                })
                .catch(error => {
                    console.error("There was an error fetching the promotions!", error);
                });
        }
    },
    mounted() {
        this.loadPromociones();
    }
};
</script>
