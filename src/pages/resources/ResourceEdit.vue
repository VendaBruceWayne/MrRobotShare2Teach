<template>
    <form @submit.prevent="submit">
        <div class="mb-3">
            <label>Title</label>
            <input v-model="data.title" class="form-control" name="title">
        </div>
        <div class="mb-3">
            <label>Description</label>
            <textarea v-model="data.description" class="form-control" name="description"></textarea>
        </div>
        <div class="mb-3">
            <label>Document</label>
            <div class="input-group">
                <input v-model="data.document" class="form-control" name="document">
                <DocumentUpload @uploaded="data.document = $event"/>
            </div>
        </div>
        <button class="btn btn-outline-secondary">Save</button>
    </form>
</template>

<script lang="ts">
import {reactive, onMounted} from 'vue';
import axios from 'axios';
import { useRoute, useRouter } from 'vue-router';
import DocumentUpload from '@/components/DocumentUpload.vue';

export default {
    name: "ResourceEdit",
    setup() {
        const router = useRouter();
        const route = useRoute();

        const data = reactive({
            title: '',
            description: '',
            document: ''
        });

        onMounted(async () => {
            const response = await axios.get('resources/${route.params.id}');

            data.title = response.data.title;
            data.description = response.data.description;
            data.document = response.data.document;
        })

        const submit = async () => {
            await axios.put('resources/${route.params.id}', data);

            await router.push('resources');
        }

        return {
            data,
            submit
        }
    }

}
</script>
