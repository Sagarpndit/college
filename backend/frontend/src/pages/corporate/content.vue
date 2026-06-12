<script setup>
import { computed, onBeforeMount } from "vue";
import config from "../../../config";
import { useRoute } from "vue-router";

import { useCollege } from "@store/corporate/college.js";
import { useTemplateContent } from "@store/corporate/template-content.js";
import { useTemplateImageContent } from "@store/corporate/template-image.js";

import CollegeForm from "@/components/college/college-form.vue";
import TemplateContentView from "@/components/college/template-content.vue";
import TemplateImageContentView from "@/components/college/template-image.vue";

const route = useRoute();

const college = useCollege();
const templateContent = useTemplateContent();
const templateImageContent = useTemplateImageContent();

const baseURL = config.default.apiBaseUrl;

const templateAction = () => {
  templateContent.formDialogType = "create";
  templateContent.formDialogVisibility = true;
};

const imageAction = () => {
  templateImageContent.formDialogType = "create";
  templateImageContent.formDialogVisibility = true;
};

const updateAction = async () => {
  college.selectedRow = {
    id: college.singleItem.id,
    title: college.singleItem.title,
    titleSlug: college.singleItem.titleSlug,
  };
  await college.fetchById();
  college.formDialogType = "update";
  college.formDialogVisibility = true;
};

onBeforeMount(async () => {
  college.collegeId = route.params.id;
  templateContent.collegeId = route.params.id;
  templateImageContent.collegeId = route.params.id;
  await college.fetchPreview();

  templateContent.templateContent = college.singleItem.content;
});
</script>

<template>
  <div class="pages-wrapper">
    <div class="add-section-button hidden md:flex">
      <Button
        icon="pi pi-plus"
        class="border-noround-right"
        size="small"
        label="Template"
        @click="templateAction()"
      />

      <Button
        icon="pi pi-file-edit"
        size="small"
        label="College Edit"
        class="border-noround-right"
        @click="updateAction()"
      />

      <Button
        icon="pi pi-file-edit"
        size="small"
        label="Image Upload"
        class="border-noround-right"
        @click="imageAction()"
      />
    </div>

    <div class="add-section-button-mobile md:hidden">
      <ButtonGroup class="flex w-full">
        <Button
          class="flex-grow-1"
          icon="pi pi-plus"
          label="Template"
          @click="templateAction()"
        />

        <Button
          class="flex-grow-1"
          icon="pi pi-file-edit"
          label="College Edit"
          @click="updateAction()"
        />
      </ButtonGroup>
    </div>

    <Accordion value="0">
      <AccordionPanel value="0">
        <AccordionHeader>
          <h4 class="mb-0 text-lg">
            <span v-if="college.singleItem.name"
              >{{ college.singleItem.name }}:</span
            >
          </h4>
        </AccordionHeader>
        <Divider class="my-0" />

        <AccordionContent>
          <div class="pt-3">
            <Tag
              class="p-2 mr-2 mb-2"
              :value="`Creation Time : ${college.singleItem.createdAt}`"
              severity="info"
            />
            <Tag
              class="p-2 mr-2 mb-2"
              :value="`Last Modified : ${college.singleItem.modifiedAt}`"
              severity="info"
            />
            <Tag
              class="p-2 mr-2 mb-2"
              :value="`Last Update : ${college.singleItem.updatedAt}`"
              severity="info"
            />
          </div>

          <div class="image-wrapper pt-3">
            <img
              class="college-image"
              :src="`${baseURL}/${college?.singleItem?.bannerImage}`"
              :alt="`Thumbnail`"
              width="100%"
              crossorigin="anonymous"
              loading="lazy"
            />
          </div>
        </AccordionContent>
      </AccordionPanel>

      <AccordionPanel value="1">
        <AccordionHeader>
          <h4 class="mb-0 text-lg">Image</h4>
        </AccordionHeader>
        <Divider class="my-0" />
        <AccordionContent>
          <TemplateImageContentView />
        </AccordionContent>
      </AccordionPanel>

      <AccordionPanel value="2">
        <AccordionHeader>
          <h4 class="mb-0 text-lg">Template Content</h4>
        </AccordionHeader>
        <Divider class="my-0" />
        <AccordionContent>
          <TemplateContentView />
        </AccordionContent>
      </AccordionPanel>
    </Accordion>
  </div>
  <CollegeForm title="College | Article" />
</template>

<style>
.add-section-button-mobile {
  position: fixed;
  gap: 6px;
  right: 0px;
  bottom: 0px;
  z-index: 1100;
  background: #ffffff;
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0px 16px;
}
.add-section-button {
  position: fixed;
  display: flex;
  flex-direction: column;
  gap: 6px;
  right: 0px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 99;
}

.image-wrapper {
  display: flex;
  justify-content: center;
  width: 100%;
}

.college-image {
  width: 350px;
  height: 100%;
  object-fit: cover;
  border-radius: 0.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

@media (max-width: 768px) {
  .college-image {
    width: 100%;
    height: auto;
  }
}

.content-block {
  transition: all 0.2s ease;
  border: 1px solid #000000;
}

.content-block:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
}

.image-content {
  text-align: center;
}

.text-editor-wrapper {
  line-height: 1.8;
  color: #333 !important;
}

.text-editor-wrapper h2 {
  font-size: 2rem;
  font-weight: 700;
  margin-top: 16px;
  margin-bottom: 8px;
}

.text-editor-wrapper h3 {
  font-size: 1.6rem;
  font-weight: 700;
  margin-top: 16px;
  margin-bottom: 8px;
}

.text-editor-wrapper h4 {
  font-size: 1.4rem;
  font-weight: 600;
  margin-top: 14px;
  margin-bottom: 6px;
}

.text-editor-wrapper p {
  font-size: 1.2rem;
  margin-top: 12px;
  margin-bottom: 12px;
}

.text-editor-wrapper ol,
.text-editor-wrapper ul {
  padding-left: 16px !important;
}

.text-editor-wrapper ol li {
  font-size: 1.2rem;
  list-style: auto;
}

.text-editor-wrapper ul li {
  font-size: 1.2rem;
  list-style: disc;
}

.text-editor-wrapper blockquote {
  font-size: 1.2rem;
  margin: 16px 0;
  padding: 0 16px;
  border-left: 4px solid #90a4ae;
}
</style>
