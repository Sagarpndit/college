<script setup>
import { computed, watch, onMounted } from "vue";
import { isEqual, isNull } from "lodash";

import { useAuth } from "@store/auth";
import { useCollege } from "@store/corporate/college.js";
import { useDropdown } from "@store/dropdown.js";
import { collegeType } from "@utils/constant";
import { resetForm, composables, singleFileUpload } from "@composables/index";
import { States } from "@/@core/utils/constant";
import config from "../../../config";

const props = defineProps({
  title: {
    type: String,
    default: "College | Article",
  },
});

const title = props.title;

const college = useCollege();
const dropdown = useDropdown();
const { apiToast } = composables();

const formField = college.formField;
const baseURL = config.default.apiBaseUrl;

const relatedCollegeOptions = computed(() => {
  const currentId = college.singleItem?.id || college.selectedRow?.id;
  return (college.dropdown || []).filter(
    (item) => Number(item.value) !== Number(currentId)
  );
});

const atFormReset = () => {
  resetForm(college);
};

const removeVideo = () => {
  college.file1 = "";
  formField.video = "";
};

const removePodcast = () => {
  college.file2 = "";
  formField.podcast = "";
  formField.podcastHighlight = false;
};

const atFormSubmit = async () => {
  if (!formField.stateId && !formField.collegeType.length)
    return apiToast({
      data: {
        response: false,
        message: `Category OR Location any one is required`,
      },
    });

  if (isEqual(college.formDialogType, "create")) {
    formField.bannerImage = await singleFileUpload(college.file);
    console.log(formField.bannerImage);
    college.currentPage = 0;
    return college.fetchCreate();
  }

  if (isEqual(college.formDialogType, "update")) {
    if (typeof college.file === "object") {
      formField.bannerImage = await singleFileUpload(college.file);
    }

    return college.fetchUpdate();
  }
};

const atFormSubmited = async () => {
  apiToast({
    data: {
      response: true,
      message: `${title}  successfully ${
        college.formDialogType === "create" ? "created" : "updated"
      }!`,
    },
  });

  if (isEqual(college.formDialogType, "create")) {
    await college.fetchList();
  } else {
    await college.fetchPreview();
  }

  atFormReset();
};

// watch(
//   () => formField.stateId,
//   (newValue) => {
//     if (!isNull(newValue)) {
//       dropdown.fetchCityByStateDropdown(newValue);
//     }
//   }
// );

watch(
  () => formField.isCustomLocation,
  (newValue) => {
    if (newValue) {
      formField.stateId = null;
      formField.cityId = [];
    } else {
      formField.location = "";
    }
  }
);

watch(
  () => formField.isCustomTag,
  (newValue) => {
    if (newValue) {
      formField.tagId = null;
    } else {
      formField.tag = "";
    }
  }
);

watch(
  () => formField.isCustomAuthor,
  (newValue) => {
    if (newValue) {
      formField.authorId = null;
    } else {
      formField.customAuthor = "";
    }
  }
);

onMounted(() => {});
</script>

<template>
  <jinzFormDialog
    :title="`${college.formDialogType} ${title}`"
    :visible="college.formDialogVisibility"
    :disabled="isEqual(college.formDialogType, 'view')"
    :isUpdate="isEqual(college.formDialogType, 'update')"
    :atReset="atFormReset"
    :atFetch="atFormSubmit"
    :atFinish="atFormSubmited"
  >
    <div class="grid">
      <!-- Name -->
      <div class="col-12 pb-0">
        <jinzFiled
          :value="formField.name"
          name="name"
          size="large"
          placeholder="Enter Name"
          label="Name"
          @atInput="(value) => (formField.name = value)"
        />
      </div>

      <!-- Slug  -->
      <div class="col-12 pb-0">
        <jinzFiled
          :value="formField.slug"
          name="slug"
          size="large"
          placeholder="Enter Slug"
          label="Slug"
          @atInput="(value) => (formField.slug = value)"
        />
      </div>

      <!-- College Type -->
      <div class="col-12">
        <jinzFiled
          filedType="single-select"
          :value="formField.collegeType"
          name="collegeType"
          :options="collegeType"
          optionLabel="name"
          optionValue="value"
          dataKey="value"
          label="College Type"
          placeholder="Select College Type"
          @atInput="(value) => (formField.collegeType = value)"
        />
      </div>

      <!-- College Type -->
      <div class="col-12">
        <jinzFiled
          filedType="single-select"
          :value="formField.stateId"
          name="state"
          :options="States"
          optionLabel="name"
          optionValue="value"
          dataKey="value"
          filter
          label="College State"
          placeholder="Select College State"
          @atInput="(value) => (formField.stateId = value)"
        />
      </div>

      <!-- Short Description -->
      <div class="col-12 pb-0">
        <jinzFiled
          filedType="text-area"
          :value="formField.shortDescription"
          name="shortDescription"
          size="large"
          placeholder="Enter Short Description"
          label="Short Description"
          @atInput="(value) => (formField.shortDescription = value)"
        />
      </div>

      <!-- Banner Image -->
      <div class="col-12">
        <jinzFiled
          v-if="!isEqual(college.formDialogType, 'view')"
          filedType="single-file-upload"
          :value="college.file"
          name="banner"
          accept=".png , .jpg, .jpeg, .webp, .gif"
          :maxFileSize="10000000"
          :rules="isEqual(college.formDialogType, 'create') ? 'required' : ''"
          label="Banner"
          hint="Upload image to 1200 x 675px (16:9), Max file size: 10MB, Type: .png, .jpg, .jpeg, .webp, .gif"
          @atInput="(value) => (college.file = value)"
        />
        <!-- Already Upload Files View -->
        <div
          v-if="
            !isEqual(college.formDialogType, 'create') &&
            formField?.bannerImage?.length
          "
        >
          <p class="text-lg font-bold my-2">Uploaded Banner</p>

          <div class="flex flex-wrap gap-3">
            <div class="border-half surface-100 border-round-sm relative">
              <img
                :src="`${baseURL}/${formField.bannerImage}`"
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
                  :href="`${baseURL}/${formField.banner}`"
                  target="_blank"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-12 pb-0">
        <jinzFiled
          :value="formField.seoTitle"
          name="seoTitle"
          size="large"
          placeholder="SEO Title"
          label="SEO Title"
          @atInput="(value) => (formField.seoTitle = value)"
        />
      </div>

      <div class="col-12 pb-0">
        <jinzFiled
          filedType="text-area"
          :value="formField.seoDescription"
          name="seoDescription"
          size="large"
          placeholder="SEO Description"
          label="SEO Description"
          @atInput="(value) => (formField.seoDescription = value)"
        />
      </div>

      <div class="col-12 pb-0">
        <jinzFiled
          :value="formField.seoKeywords"
          name="seoKeywords"
          size="large"
          placeholder="SEO Keywords"
          label="SEO Keywords"
          @atInput="(value) => (formField.seoKeywords = value)"
        />
      </div>
    </div>
  </jinzFormDialog>
</template>
