<template>
    <label class="btn btn-primary">
        Upload <input type="file" hidden @change="upload($event)">
    </label>
</template>

<script lang="ts">
import axios from 'axios';
import { SetupContext } from 'vue';

export default {
    name: 'DocumentUpload',
    emits: ['uploaded'],
    setup(_props: any, context: SetupContext) {
        const upload = async (event: Event) => {
            const target = event.target as HTMLInputElement;  // Ensure TypeScript knows this is an input element
            const files = target.files;

            if (!files || files.length === 0) return;

            const formData = new FormData();
            formData.append('document', files[0]);

            const {data} = await axios.post('upload', formData);

            context.emit('uploaded', data.URL);
        }

        return {
            upload
        }
    }
}
</script>

<style>
/* Add any styles if needed */
</style>
