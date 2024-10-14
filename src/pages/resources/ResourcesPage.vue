<template>
    <div class="pt-3 pb-2 mb-3 border-button">
        <router-link to="/resources/create" class="btn btn-sm btn-outline-secondary">Add</router-link>
    </div>
    <div class="table-responsive">
        <table class="table table-strped table-sm">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Document</th>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Action</th>
                </tr>
            </thead>
        <tbody>
            <tr v-for="resource in resources" :key="resource.id">
                <td>{{resource.id}}</td>
                <td><doc :src="resource.document" width="50"/></td>
                <td>{{ resource.id }}</td>
                <td>{{ resource.title }}</td>
                <td>{{ resource.description }}</td>
                <td>
                    <div class="btn-group mr-2">
                        <router-link :to="'/resources/${resource.id}/edit'" class="btn btn-sm btn-outline-secondary">Edit</router-link>
                        <a href="javascript:void(0)" class="btn btn-sm btn-outline-secondary" @click="del(resource.id)">Delete</a>
                    </div>
                </td>
            </tr>
        </tbody>
     </table>
     
    </div>
    
    <PaginatorComponent :last-page="lastPage" @page-changed="load($event)"/>

</template>

<script lang="ts">
import {onMounted, ref} from 'vue';
import axios from 'axios';
import { Resource } from '@/models/resource';
import PaginatorComponent from '@/components/PaginatorComponent.vue';

/*interface ResourceInterface {
   public id: number;
   public title: string;
   public description: string;
   public document: string;
 }*/


export default{
    name: 'ResourcesPage',
    components: {
        PaginatorComponent: {
            name: 'PaginatorComponent',
            emits: ['pageChange'],
            props: {
                lastPage: Number,
            }
        }},
    setup() {
        //const resources = ref<ResourceInterface[]>([]);
        const resources = ref( []);
        const lastPage = ref( 0);

        const load = async (page = 1) => {
            const { data } = await axios.get(`resources?page=${page}`);
            resources.value = data.data;
            lastPage.value = data.meta.lastPage;
        }

        onMounted(load);

        const del = async (id: number) => {
            if (confirm('Are you sure?')) {
                await axios.delete(`resources/${id}`);
                resources.value = resources.value.filter((rs: Resource) => rs.id !== id);
            }
        }

        return {
            resources,
            lastPage,
            del,
            load
        }

    }

}


</script>
