<script setup>
import { nextTick, onMounted, watch } from "vue";
import config from "../../../config";
import { isEqual, isNull } from "lodash";
import { resetForm, composables, singleFileUpload } from "@composables/index";
import { useCollege } from "@store/corporate/college.js";
import { useTemplateContent } from "@store/corporate/template-content.js";

const { apiToast } = composables();
const baseURL = config.default.apiBaseUrl;

const college = useCollege();
const templateContent = useTemplateContent();

const title = "Template Content";
const formField = templateContent.formField;

const updateAction = async (data) => {
  templateContent.selectedRow = data;
  templateContent.formDialogType = "update";
  templateContent.file = "";
  templateContent.videoFile = "";
  templateContent.videoThumbnailFile = "";
  formField.type = data.type;
  formField.image = data.image;
  formField.caption = data.caption;
  formField.embed = data.embed;
  formField.linkText = data.linkText;
  formField.linkUrl = data.linkUrl;
  formField.video = data.video;
  formField.videoThumbnail = data.videoThumbnail;
  templateContent.formDialogVisibility = true;
};

const deleteAction = async (data) => {
  templateContent.selectedRow = data;
  await templateContent.fetchDelete();
  apiToast({
    data: {
      response: true,
      message: `${title}  successfully deleted!`,
    },
  });
  fetchList();
};

const moveUp = async (index) => {
  if (index <= 0) return;
  const arr = [...templateContent.templateContent];
  [arr[index - 1], arr[index]] = [arr[index], arr[index - 1]];
  templateContent.templateContent = arr;
  await templateContent.fetchReOrder();
  apiToast({
    data: {
      response: true,
      message: `${title} position successfully updated!`,
    },
  });
};

const moveDown = async (index) => {
  const len = (templateContent.templateContent || []).length;
  if (index >= len - 1) return;
  const arr = [...templateContent.templateContent];
  [arr[index + 1], arr[index]] = [arr[index], arr[index + 1]];
  templateContent.templateContent = arr;
  await templateContent.fetchReOrder();
  apiToast({
    data: {
      response: true,
      message: `${title} position successfully updated!`,
    },
  });
};

const fetchList = async () => {
  await college.fetchPreview();
  templateContent.templateContent = college.singleItem.content;
};

const atFormSubmit = async () => {
  if (typeof templateContent.file === "object") {
    const file = await singleFileUpload(templateContent.file);
    formField.image = file;
  }

  if (isEqual(templateContent.formDialogType, "create")) {
    return templateContent.fetchCreate();
  }

  if (isEqual(templateContent.formDialogType, "update")) {
    return templateContent.fetchUpdate();
  }
};

const atFormSubmited = () => {
  apiToast({
    data: {
      response: true,
      message: `${title}  successfully ${
        templateContent.formDialogType === "create" ? "created" : "updated"
      }!`,
    },
  });
  atFormReset();
  fetchList();
};

const sanitizeContent = (html) => {
  if (!html) return "";

  return (
    html
      // 1️⃣ Remove &nbsp;
      .replace(/&nbsp;/gi, " ")

      // 2️⃣ Remove empty <p> tags (only spaces, &nbsp;, or <br>)
      .replace(/<p>(\s|<br\s*\/?>)*<\/p>/gi, "")

      // 3️⃣ Remove extra spaces
      .replace(/\s{2,}/g, " ")

      // 4️⃣ Trim start & end
      .trim()
  );
};

const atFormReset = () => {
  resetForm(templateContent);
};
</script>

<template>
  <div class="pt-4">
    <div v-for="(block, idx) in templateContent.templateContent" :key="idx">
      <div class="content-block mb-4 p-3 border-round surface-100">
        <!-- Block Index -->
        <div class="flex justify-content-between align-items-start mb-4">
          <span class="font-bold text-sm surface-200 px-2 py-1 border-round"
            >Block {{ idx + 1 }}</span
          >
          <span class="font-bold text-sm surface-200 px-2 py-1 border-round">{{
            block.hash
          }}</span>
          <span class="font-bold text-sm surface-200 px-2 py-1 border-round">{{
            block.name
          }}</span>

          <div class="flex gap-1">
            <Button
              icon="pi pi-arrow-up"
              size="small"
              severity="secondary"
              :disabled="idx === 0"
              @click="moveUp(idx)"
            />
            <Button
              icon="pi pi-arrow-down"
              size="small"
              severity="secondary"
              :disabled="
                idx === (templateContent.templateContent || []).length - 1
              "
              @click="moveDown(idx)"
            />
            <Button
              icon="pi pi-pencil"
              size="small"
              severity="info"
              @click="updateAction(block)"
            />
            <Button
              icon="pi pi-trash"
              size="small"
              severity="danger"
              @click="deleteAction(block)"
            />
          </div>
        </div>

        <!-- Block Content -->
        <div
          class="text-editor-wrapper"
          v-html="sanitizeContent(block.content)"
        />
      </div>
    </div>
  </div>

  <jinzFormDialog
    :title="`${templateContent.formDialogType} ${title}`"
    :visible="templateContent.formDialogVisibility"
    :disabled="isEqual(templateContent.formDialogType, 'view')"
    :isUpdate="isEqual(templateContent.formDialogType, 'update')"
    :atReset="atFormReset"
    :atFetch="atFormSubmit"
    :atFinish="atFormSubmited"
    full-width
  >
    <div class="grid">
      <div class="col-12">
        <jinzFiled
          :value="formField.name"
          name="name"
          label="Select Name"
          placeholder="For Table of Content"
          @atInput="(value) => (formField.name = value)"
        />
      </div>

      <div class="col-12">
        <jinzFiled
          filedType="text-editor"
          :value="formField.content"
          name="content"
          label="Enter Text"
          placeholder="Enter Text"
          rules="required"
          @atInput="(value) => (formField.content = value)"
          hint="You can write headings, paragraphs, ordered lists, and more…"
        />
      </div>

      <div class="col-12">
        <div
          class="text-editor-wrapper"
          v-html="sanitizeContent(formField.content)"
        />
      </div>
    </div>
  </jinzFormDialog>
</template>

<style scoped>
</style>
