<script setup>
import { useField } from 'vee-validate';

const attrs = useAttrs();

const props = defineProps({
    filedType: {
        type: String,
        default: 'text'
    },

    name: {
        type: String,
        required: true
    },

    rules: {
        type: [Object, String],
        default: ''
    },

    value: {
        type: [Number, String, Array, Object, File, Boolean],
        required: false,
        default: ''
    },

    passwordFeedback: {
        type: Boolean,
        default: false
    },

    disabled: {
        type: Boolean,
        default: false
    },

    dropdownOption: {
        type: Array,
        required: false
    },

    dropdownFilter: {
        type: Boolean,
        default: false
    },

    defaultProfile: {
        type: String,
        default: ''
    }
});

const name = toRef(props, 'name');

const {
    value: inputValue,
    errorMessage,
    handleChange,
    meta
} = useField(props.name, props.rules, {
    initialValue: props.value
});

const emit = defineEmits(['atInput', 'modalUpdate']);

const inputFileValue = ref('');

const handleInputChange = ($event) => {
    let filedValue = null;
    if (props.filedType === 'single-file-upload') {
        handleChange($event);
        filedValue = $event.target.files[0];
        inputFileValue.value = `Selected File : ${$event.target.value}`;
    } else if (props.filedType === 'profile-upload') {
        handleChange($event);
        filedValue = $event.target.files[0];
        inputFileValue.value = URL.createObjectURL(filedValue);
    } else {
        filedValue = inputValue.value;
    }
    emit('atInput', filedValue);
};

const onModalUpdate = ($event) => {
    emit('modalUpdate', $event);
};

const dropdownClearable = () => {
    inputValue.value = null;
    emit('atInput', null);
};

onBeforeMount(() => {
    if (props.filedType === 'profile-upload') {
        inputFileValue.value = props.defaultProfile;
    }
});
</script>

<template>
    <div class="pt-3">
        <!-- Filed Header -->
        <label class="block mb-1 font-medium" :for="name" :class="{ 'p-error': errorMessage }">
            {{ attrs.label }}
        </label>

        <!-- Text -->
        <InputText
            v-if="filedType === 'text'"
            v-model="inputValue"
            :disabled="disabled"
            :id="name"
            :name="name"
            :placeholder="attrs.placeholder ? attrs.placeholder : attrs.label"
            :class="{ 'p-invalid': errorMessage }"
            class="w-full p-inputtext-lg"
            :aria-describedby="`${name}-help`"
            @input="handleInputChange"
        />

        <!-- Password -->
        <Password
            v-if="filedType === 'password'"
            v-model="inputValue"
            :disabled="disabled"
            :id="name"
            :name="name"
            :placeholder="attrs.label"
            :class="{ 'p-invalid': errorMessage }"
            class="w-full p-inputtext-lg"
            inputClass="w-full"
            :aria-describedby="`${name}-help`"
            :toggleMask="true"
            :feedback="passwordFeedback"
            @input="handleInputChange"
        />

        <!-- Single Dropdown -->
        <Dropdown
            v-if="filedType === 'dropdown'"
            v-model="inputValue"
            :options="dropdownOption"
            optionLabel="name"
            :disabled="disabled"
            :id="name"
            showClear
            :name="name"
            :filter="dropdownFilter"
            :placeholder="attrs.label"
            :class="{ 'p-invalid': errorMessage }"
            class="w-full p-inputtext-lg"
            inputClass="w-full"
            :aria-describedby="`${name}-help`"
            @change="handleInputChange"
            @update:modelValue="onModalUpdate($event)"
        >
            <template #clearicon>
                <i class="pi pi-fw pi-times p-3" @click="dropdownClearable" />
            </template>
        </Dropdown>

        <!-- Multi Dropdown -->
        <MultiSelect
            v-if="filedType === 'multi-dropdown'"
            v-model="inputValue"
            :options="dropdownOption"
            optionLabel="name"
            :disabled="disabled"
            :id="name"
            :name="name"
            :filter="dropdownFilter"
            :placeholder="attrs.label"
            :class="{ 'p-invalid': errorMessage }"
            class="w-full p-inputtext-lg"
            inputClass="w-full"
            :aria-describedby="`${name}-help`"
            @change="handleInputChange"
            :selectionLimit="10"
            :maxSelectedLabels="3"
            :selectAll="false"
        />

        <!-- Switch -->
        <InputSwitch v-if="filedType === 'switch'" class="mt-2" v-model="inputValue" :disabled="disabled" :id="name" :name="name" :class="{ 'p-invalid': errorMessage }" :aria-describedby="`${name}-help`" @input="handleInputChange" />

        <!-- Text Area -->
        <Textarea
            v-if="filedType === 'text-area'"
            :disabled="disabled"
            :id="name"
            :name="name"
            v-model="inputValue"
            :class="{ 'p-invalid': errorMessage }"
            rows="4"
            cols="30"
            :aria-describedby="`${name}-help`"
            @input="handleInputChange"
            class="w-full"
            inputClass="w-full"
        />

        <!-- Date Picker -->
        <Calendar
            v-if="filedType === 'date'"
            v-model="inputValue"
            dateFormat="dd-mm-yy"
            hideOnDateTimeSelect
            showIcon
            :disabled="disabled"
            :id="name"
            :name="name"
            :class="{ 'p-invalid': errorMessage }"
            :aria-describedby="`${name}-help`"
            @date-select="handleInputChange"
            class="w-full"
            inputClass="w-full"
        />

        <!-- SelectButton -->
        <SelectButton
            v-if="filedType === 'select-button'"
            :id="name"
            :name="name"
            v-model="inputValue"
            :disabled="disabled"
            :class="{ 'p-invalid': errorMessage }"
            :aria-describedby="`${name}-help`"
            :options="dropdownOption"
            @change="handleInputChange"
            :pt="{
                button: ({ context }) => ({
                    class: context.active ? 'bg-primary-700 ' : 'bg-primary-300'
                })
            }"
        />

        <!-- Profile Image -->
        <div class="flex align-items-end py-2" v-if="filedType === 'profile-upload'">
            <Avatar :image="inputFileValue" class="surface-0 mr-2" size="xlarge" shape="circle" />
            <input type="file" ref="file" style="display: none" @change="handleInputChange($event)" />
            <Button class="p-button-secondary h-full" size="small" @click="$refs.file.click()"> Upload Photo </Button>
        </div>

        <!-- FIle Upload -->
        <div v-if="filedType === 'single-file-upload'" class="p-fileupload p-fileupload-basic p-component">
            <label class="p-button p-component p-fileupload-choose" tabindex="0" :for="name">
                <span class="p-button-icon p-button-icon-left pi pi-upload"></span>
                <span class="p-button-label">Choose {{ attrs.label }}</span>
            </label>

            <input type="file" :id="name" :name="name" @change="handleInputChange($event)" />
            <p class="pt-1">{{ inputFileValue }}</p>
        </div>

        <!-- Filed Footer -->
        <small v-if="errorMessage" class="p-error block mt-1" :id="`${name}-help`">{{ errorMessage || attrs.hint }}</small>
        <small v-else :id="`${name}-help`" class="block mt-1">{{ attrs.hint }}</small>
    </div>
</template>
