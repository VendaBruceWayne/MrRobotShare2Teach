<template>
    <label class="btn btn-primary">
        Upload <input type="file" hidden @change="upload($event.files)">
    </label>
</template>

<script lang="ts">
import axios from 'axios';
import { SetupContext } from 'vue';

export default {
    name: 'DocumentUpload',
    emits: ['uploaded'],
    setup(_props: any, context: SetupContext) {
        const upload = async (files: FileList | null) => {
            if (files === null) return;

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

</style>