<script setup>
import { useField } from "vee-validate";
import { fileBase64 } from "@composables/index";
import ClassicEditor from "ckeditor5-build-classic-base64-upload";
import { toRef, ref, useAttrs, onBeforeMount, computed, watch } from "vue";

const attrs = useAttrs();

defineOptions({
  inheritAttrs: false,
});

const props = defineProps({
  filedType: {
    type: String,
    default: "text",
  },

  plain: {
    type: Boolean,
    default: false,
  },

  name: {
    type: String,
    required: true,
  },

  rules: {
    type: [Object, String],
    default: "",
  },

  value: {
    type: [Number, String, Array, Object, File, Boolean],
    required: false,
    default: "",
  },

  defaultProfile: {
    type: [String, Object],
    default: "",
  },
});

const {
  value: inputValue,
  errorMessage,
  handleChange,
  setValue,
} = useField(props.name, props.rules, {
  initialValue: props.value,
});

const inputFileValue = ref("");
const name = toRef(props, "name");
const emit = defineEmits(["atInput"]);

const handleInputChange = async ($event) => {
  let filedValue = null;
  if (props.filedType === "multiple-file-upload") {
    handleChange($event);
    filedValue = $event.files;
  } else if (props.filedType === "single-file-upload") {
    handleChange($event);
    filedValue = $event.files[0];
  } else if (props.filedType === "profile-upload") {
    handleChange($event);
    filedValue = $event.target.files[0];
    inputFileValue.value = await fileBase64(filedValue);
  } else if (props.filedType === "multiple-text") {
    filedValue = Array.isArray(inputValue.value)
      ? inputValue.value.map((v) => v.trim()).filter(Boolean)
      : [];
  } else {
    filedValue = inputValue.value;
  }
  emit("atInput", filedValue);
};

watch(
  () => props.defaultProfile,
  (newValue) => {
    if (props.filedType === "profile-upload") {
      inputFileValue.value = newValue;
    }
  }
);

watch(
  () => inputValue.value,
  (newValue) => {
    if (props.filedType === "multiple-text") {
      const filedValue = Array.isArray(newValue)
        ? newValue.map((v) => v.trim()).filter(Boolean)
        : [];

      emit("atInput", filedValue);
    }
  },
  { deep: true }
);

const filedSize = computed(() => {
  switch (attrs.size) {
    case "large":
      return "p-inputtext-lg";
    case "small":
      return "p-inputtext-sm";
    default:
      return "";
  }
});

watch(
  () => props.value,
  (newValue) => {
    setValue(newValue);
  }
);
onBeforeMount(() => {
  if (props.filedType === "profile-upload") {
    inputFileValue.value = props.defaultProfile;
  }
});
</script>
<template>
  <div
    v-bind="{
      class: attrs.class,
    }"
  >
    <!-- Header -->
    <label
      v-if="!plain"
      class="block mb-2 text-900 font-bold"
      :for="name"
      :class="{ 'p-error': errorMessage }"
    >
      {{ attrs.label }}
    </label>

    <!-- OTP Input -->
    <InputOtp
      v-if="filedType === 'otp'"
      v-model="inputValue"
      :length="6"
      v-bind="{
        ...attrs,
        id: name,
        name: name,
        'aria-describedby': `${name}-help`,
        class: errorMessage ? 'p-invalid w-full' : 'w-full',
      }"
      @input="handleInputChange"
      size="large"
    />

    <!-- Text -->
    <InputText
      v-if="filedType === 'text'"
      v-model="inputValue"
      v-bind="{
        ...attrs,
        id: name,
        name: name,
        placeholder: attrs.placeholder ? attrs.placeholder : attrs.label,
        'aria-describedby': `${name}-help`,
        class: errorMessage ? 'p-invalid w-full' : 'w-full',
      }"
      @input="handleInputChange"
    />

    <!-- Number -->
    <InputNumber
      v-if="filedType === 'number'"
      v-model="inputValue"
      v-bind="{
        ...attrs,
        id: name,
        name: name,
        placeholder: attrs.placeholder ? attrs.placeholder : attrs.label,
        'aria-describedby': `${name}-help`,
        class: errorMessage ? 'p-invalid w-full' : 'w-full',
        fluid: true,
        minFractionDigits: 2,
        inputId: 'locale-user',
      }"
      @input="handleInputChange"
    />

    <!-- Password -->
    <Password
      v-if="filedType === 'password'"
      v-model="inputValue"
      v-bind="{
        ...attrs,
        id: name,
        name: name,
        placeholder: attrs.placeholder ? attrs.placeholder : attrs.label,
        'aria-describedby': `${name}-help`,
        class: 'w-full',
        inputClass: `w-full ${filedSize} ${errorMessage ? 'p-invalid' : ''}`,
        toggleMask: true,
        feedback: false,
      }"
      @input="handleInputChange"
    />

    <!-- Password Feedback -->
    <Password
      v-if="filedType === 'password-feedback'"
      v-model="inputValue"
      v-bind="{
        ...attrs,
        id: name,
        name: name,
        placeholder: attrs.placeholder ? attrs.placeholder : attrs.label,
        'aria-describedby': `${name}-help`,
        class: 'w-full',
        inputClass: `w-full ${filedSize} ${errorMessage ? 'p-invalid' : ''}`,
        toggleMask: true,
        feedback: true,
      }"
      @input="handleInputChange"
    >
      <template #header>
        <div class="font-semibold text-sm mb-2">Pick a password</div>
      </template>
      <template #footer>
        <Divider class="mb-1 mt-2" />
        <ul class="text-sm">
          <li class="mb-1">At least one lowercase</li>
          <li class="mb-1">At least one uppercase</li>
          <li class="mb-1">At least one numeric</li>
          <li>Minimum 8 characters</li>
        </ul>
      </template>
    </Password>

    <!-- Text Area -->
    <Textarea
      v-if="filedType === 'text-area'"
      v-model="inputValue"
      v-bind="{
        ...attrs,
        id: name,
        name: name,
        placeholder: attrs.placeholder ? attrs.placeholder : attrs.label,
        'aria-describedby': `${name}-help`,
        class: errorMessage ? 'p-invalid w-full' : 'w-full',
        autoResize: true,
        rows: '5',
        cols: '30',
      }"
      @input="handleInputChange"
    />

    <!-- Single Select -->
    <Select
      v-if="filedType === 'single-select'"
      v-model="inputValue"
      v-bind="{
        ...attrs,
        id: name,
        name: name,
        placeholder: attrs.placeholder ? attrs.placeholder : attrs.label,
        'aria-describedby': `${name}-help`,
        class: `w-full ${filedSize} ${errorMessage ? 'p-invalid' : ''}`,
        showClear: true,
        checkmark: true,
        filter: true,
        highlightOnSelect: false,
        dataKey: attrs.dataKey ? attrs.dataKey : '_id',
      }"
      @change="handleInputChange"
    />

    <!-- Multiple Select -->
    <MultiSelect
      v-if="filedType === 'multiple-select'"
      v-model="inputValue"
      v-bind="{
        ...attrs,
        id: name,
        name: name,
        placeholder: attrs.placeholder ? attrs.placeholder : attrs.label,
        'aria-describedby': `${name}-help`,
        class: `w-full ${filedSize} ${errorMessage ? 'p-invalid' : ''}`,
        maxSelectedLabels: 10,
        display: 'chip',
        dataKey: attrs.dataKey ? attrs.dataKey : '_id',
      }"
      @change="handleInputChange"
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
          class: context.active ? 'bg-primary-700 ' : 'bg-primary-300',
        }),
      }"
    />

    <!-- Auto Complete -->
    <AutoComplete
      v-if="filedType === 'auto-complete'"
      v-model="inputValue"
      v-bind="{
        ...attrs,
        id: name,
        name: name,
        placeholder: attrs.placeholder ? attrs.placeholder : attrs.label,
        'aria-describedby': `${name}-help`,
        class: `w-full ${filedSize} ${errorMessage ? 'p-invalid' : ''}`,
      }"
      @change="handleInputChange"
    />

    <!-- Text Editor -->
    <ckeditor
      v-if="filedType === 'text-editor'"
      v-model="inputValue"
      v-bind="{
        ...attrs,
        id: name,
        name: name,
        placeholder: attrs.placeholder ? attrs.placeholder : attrs.label,
        'aria-describedby': `${name}-help`,
        class: errorMessage ? 'p-invalid w-full' : 'w-full',
        isReadOnly: attrs.disabled,
        editor: ClassicEditor,
        height: 500,
      }"
      @input="handleInputChange($event)"
    ></ckeditor>

    <!-- Multiple File Upload -->
    <FileUpload
      v-if="filedType === 'multiple-file-upload'"
      v-model="inputValue"
      v-bind="{
        ...attrs,
        id: name,
        name: name,
        chooseLabel: attrs.placeholder ? attrs.placeholder : attrs.label,
        'aria-describedby': `${name}-help`,
        multiple: true,
        showCancelButton: false,
        showUploadButton: false,
        chooseIcon: 'pi pi-upload',
        fileLimit: 6,
      }"
      @select="handleInputChange"
      @removeUploadedFile="handleInputChange"
    >
      <template #empty>
        <span>Drag and drop files to here to upload.</span>
      </template>
    </FileUpload>

    <!-- Multiple Text -->
    <Chip
      v-if="filedType === 'multiple-text'"
      v-model="inputValue"
      v-bind="{
        ...attrs,
        id: name,
        name: name,
        placeholder: attrs.placeholder
          ? attrs.placeholder
          : 'Enter keywords and press enter',
        class: errorMessage ? 'p-invalid w-full' : 'w-full',
      }"
      @add="handleInputChange"
      @remove="handleInputChange"
    />

    <!-- Single File Upload -->
    <FileUpload
      v-if="filedType === 'single-file-upload'"
      v-model="inputValue"
      v-bind="{
        ...attrs,
        id: name,
        name: name,
        chooseLabel: attrs.placeholder ? attrs.placeholder : attrs.label,
        'aria-describedby': `${name}-help`,
        multiple: false,
        showCancelButton: false,
        showUploadButton: false,
        chooseIcon: 'pi pi-upload',
        fileLimit: 1,
      }"
      @select="handleInputChange"
      @removeUploadedFile="handleInputChange"
    >
      <template #empty>
        <span>Drag and drop files to here to upload.</span>
      </template>
    </FileUpload>

    <!-- Profile Image Upload -->
    <div
      v-if="filedType === 'profile-upload'"
      class="flex align-items-end py-2"
    >
      <img
        :src="inputFileValue"
        class="surface-0 mr-2 border-circle"
        width="100"
        height="100"
        crossorigin="anonymous"
      />
      <input
        type="file"
        ref="file"
        accept="image/*"
        style="display: none"
        @change="handleInputChange($event)"
      />
      <Button
        v-if="!attrs.disabled"
        severity="contrast"
        size="small"
        @click="$refs.file.click()"
      >
        Upload Image
      </Button>
    </div>

    <!-- Date Picker -->
    <DatePicker
      v-if="filedType === 'date'"
      v-model="inputValue"
      v-bind="{
        ...attrs,
        id: name,
        name: name,
        placeholder: attrs.placeholder ? attrs.placeholder : attrs.label,
        'aria-describedby': `${name}-help`,
        class: 'w-full',
        inputClass: `w-full ${filedSize} ${errorMessage ? 'p-invalid' : ''}`,
        showIcon: true,
        hideOnDateTimeSelect: true,
        hourFormat: '12',
        dateFormat: 'dd-mm-yy',
        manualInput: false,
      }"
      @date-select="handleInputChange"
    />

    <!-- Footer -->
    <template v-if="!plain">
      <small v-if="errorMessage" class="p-error block mt-1" :id="`${name}-help`"
        >{{ errorMessage || attrs.hint }}
      </small>
      <small v-else :id="`${name}-help`" class="block mt-1">
        {{ attrs.hint }}
      </small>
    </template>
  </div>
</template>

<style>
.ck-content {
  min-height: 300px;
}
.p-error {
  color: var(--jinz-inputtext-invalid-border-color) !important;
}

.p-fileupload-header > .p-button {
  width: 100%;
}

.p-inputotp-input {
  flex-grow: 1 !important;
}
</style>
