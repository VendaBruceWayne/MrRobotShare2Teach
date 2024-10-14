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
import {reactive} from 'vue';

import { useRouter } from 'vue-router';
import axios from 'axios';
import DocumentUpload from '@/components/DocumentUpload.vue';

export default {
    name: "ResourceCreate",
    components: {DocumentUpload},
    setup() {
        const router = useRouter();

        const data = reactive( {
            title: '',
            description: '',
            document: ''
        });

        const submit = async () => {
            await axios.post('resources', data);

            await router.push('resources');
        }

        return {
            data,
            submit
        }
    }

}
</script>

<style scoped>

</style>