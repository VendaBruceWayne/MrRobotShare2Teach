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
            formData.append('pdf', files[0]);  // Append the file using the correct key ('pdf')

            try {
                const { data } = await axios.post('/upload', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });

                // Emit the file metadata back to the parent component
                context.emit('uploaded', data.metadata);
            } catch (error) {
                console.error('File upload failed:', error);
            }
        };

        return {
            upload
        };
    }
}
</script>

<style scoped>
/* Add any styles if needed */
</style>
