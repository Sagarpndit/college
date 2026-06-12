<script setup>
import config from "../../../config";
import { isEqual } from "lodash";
import { resetForm, composables, singleFileUpload } from "@composables/index";
import { useCollege } from "@store/corporate/college.js";
import { useTemplateImageContent } from "@store/corporate/template-image.js";

const { apiToast } = composables();
const baseURL = config.default.apiBaseUrl;

const college = useCollege();
const templateImageContent = useTemplateImageContent();

const title = "Template Content";
const formField = templateImageContent.formField;

const deleteAction = async (data) => {
  templateImageContent.selectedRow = data;
  await templateImageContent.fetchDelete();
  apiToast({
    data: {
      response: true,
      message: `${title}  successfully deleted!`,
    },
  });
  fetchList();
};

const fetchList = async () => {
  await college.fetchPreview();
  templateImageContent.image = college.singleItem.image;
};

const atFormSubmit = async () => {
  if (typeof templateImageContent.file === "object") {
    const file = await singleFileUpload(templateImageContent.file);
    formField.image = file;
  }

  if (isEqual(templateImageContent.formDialogType, "create")) {
    return templateImageContent.fetchCreate();
  }
};

const atFormSubmited = () => {
  apiToast({
    data: {
      response: true,
      message: `${title}  successfully ${
        templateImageContent.formDialogType === "create" ? "created" : "updated"
      }!`,
    },
  });
  atFormReset();
  fetchList();
};

const atFormReset = () => {
  resetForm(templateImageContent);
};
</script>

<template>
  <div class="pt-4">
    <div v-for="(block, idx) in templateImageContent.image" :key="idx">
      <div class="content-block mb-4 p-3 border-round surface-100">
        <!-- Header -->
        <div class="flex justify-content-between align-items-start mb-4">
          <span class="font-bold text-sm surface-200 px-2 py-1 border-round">
            Block {{ idx + 1 }}
          </span>

          <span class="font-bold text-sm surface-200 px-2 py-1 border-round">
            {{ block.hash }}
          </span>

          <div class="flex gap-1">
            <Button
              icon="pi pi-trash"
              size="small"
              severity="danger"
              @click="deleteAction(block)"
            />
          </div>
        </div>

        <!-- Image Preview -->
        <div class="flex flex-column gap-3">
          <div class="section-image">
            <img
              v-if="block.image"
              :src="`${baseURL}/${block.image}`"
              alt="Section Image"
              class="section-image__img"
            />
          </div>

          <div class="flex gap-2">
            <Tag :value="block.position || 'right'" />
          </div>
        </div>
      </div>
    </div>
  </div>

  <jinzFormDialog
    :title="`${templateImageContent.formDialogType} ${title}`"
    :visible="templateImageContent.formDialogVisibility"
    :disabled="isEqual(templateImageContent.formDialogType, 'view')"
    :isUpdate="isEqual(templateImageContent.formDialogType, 'update')"
    :atReset="atFormReset"
    :atFetch="atFormSubmit"
    :atFinish="atFormSubmited"
    full-width
  >
    <div class="grid">
      <!-- Hash -->
      <div class="col-12">
        <jinzFiled
          :value="formField.hash"
          name="hash"
          label="Enter Hash"
          placeholder="Enter Block Hash"
          @atInput="(value) => (formField.hash = value)"
        />
      </div>

      <!-- Banner Image -->
      <div class="col-12">
        <jinzFiled
          v-if="!isEqual(templateImageContent.formDialogType, 'view')"
          filedType="single-file-upload"
          :value="templateImageContent.file"
          name="image"
          accept=".png , .jpg, .jpeg, .webp, .gif"
          :maxFileSize="10000000"
          :rules="
            isEqual(templateImageContent.formDialogType, 'create')
              ? 'required'
              : ''
          "
          label="Image"
          hint="Upload image to 1200 x 675px (16:9), Max file size: 10MB, Type: .png, .jpg, .jpeg, .webp, .gif"
          @atInput="(value) => (templateImageContent.file = value)"
        />
        <!-- Already Upload Files View -->
        <div
          v-if="
            !isEqual(templateImageContent.formDialogType, 'create') &&
            formField.image?.length
          "
        >
          <p class="text-lg font-bold my-2">Uploaded Image</p>

          <div class="flex flex-wrap gap-3">
            <div class="border-half surface-100 border-round-sm relative">
              <img
                :src="`${baseURL}/${formField.image}`"
                width="100"
                height="100%"
                class="border-round-sm"
                crossorigin="anonymous"
                loading="lazy"
              />

              <div
                class="absolute bg-primary border-round-sm flex justify-content-center align-items-center bottom-0 right-0"
              >
                <Button
                  as="a"
                  icon="pi pi-eye"
                  size="small"
                  :href="`${baseURL}/${formField.image}`"
                  target="_blank"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </jinzFormDialog>
</template>

<style scoped>
.section-image {
  width: 350px;
  max-width: 100%;
  margin: 0 auto;
}

.section-image__img {
  width: 100%;
  height: 250px;
  object-fit: cover;
  border-radius: 8px;
  display: block;
}
</style>
