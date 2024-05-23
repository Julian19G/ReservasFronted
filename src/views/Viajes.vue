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
                    <th scope="col">ID Paquete</th> <!-- Nueva columna para ID del paquete -->
                    <th scope="col">Paquete</th>
                    <th scope="col">Cliente</th>
                    <th scope="col">Fecha De Reserva</th>
                    <th scope="col">Cantidad de Personas</th>
                    <th scope="col">Total</th>
                    <th scope="col">Estado</th>
                    <th scope="col">Acciones</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(viaje, index) in viajes" :key="index">
                    <th scope="row">{{ index + 1 }}</th>
                    <td>{{ viaje.id_paquete }}</td> <!-- Mostrar ID del paquete -->
                    <td>{{ viaje.paquete.nombre }}</td>
                    <td>{{ viaje.cliente.nombre }}</td>
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
