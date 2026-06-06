<script setup>
import { ref } from 'vue';
import { isEqual, isUndefined } from 'lodash';
import { Form } from 'vee-validate';
import { composables } from '@composables/index';

const props = defineProps({
    atFetch: {
        type: Function,
        required: true
    },

    atFinish: {
        type: Function,
        required: false
    },

    atReset: {
        type: Function,
        required: false
    }
});

const form = ref('');
const { apiToast, setFormLoading } = composables();

const onSubmit = async () => {
    setFormLoading(true);
    const response = await props.atFetch();
    setFormLoading(false);

    if (isEqual(response.status, 201) || isEqual(response.status, 200)) {
        if (props.atFinish) {
            props.atFinish(response);
        }
    } else {
        if (isEqual(response.status, 400) || isEqual(response.status, 422)) {
            form.value.setErrors(response.data.message || {});
        }
        apiToast(response);
    }
};

function onReset() {
    form.value.resetForm();
    if (props.atReset) {
        props.atReset();
    }
}
</script>

<template>
    <Form ref="form" @submit="onSubmit" @reset="onReset">
        <slot />
    </Form>
</template>
