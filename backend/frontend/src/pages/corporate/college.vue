<script setup>
import { onBeforeUnmount, onMounted, ref, computed } from "vue";
import { useAuth } from "@store/auth";
import { useCollege } from "@store/corporate/college.js";
import { States, collegeType } from "@/@core/utils/constant";
import { useDropdown } from "@store/dropdown.js";
import config from "@config";

import { composables } from "@composables/index";
import { useRouter } from "vue-router";

import CollegeForm from "@/components/college/college-form.vue";

const college = useCollege();
const router = useRouter();
const title = "College | Article";
const baseURL = config.default.apiBaseUrl;
const webBaseURL = config.default.baseUrl;
const { setTableLoading, apiToast, confirmDialog } = composables();

const filterField = college.filterField;
const menuAction = ref();
const scheduleDialogVisible = ref(false);
const scheduledAt = ref(null);
const minScheduledAt = ref(new Date());

const getCollegeUrl = (data) => {
  let slug = `${webBaseURL}/content/${data.slug}`;

  return slug;
};

const getCollegeStatus = (value) => {
  return (
    {
      0: { label: "Draft", severity: "primary", icon: "pi pi-file" },
      1: { label: "Pending Review", severity: "warn", icon: "pi pi-clock" },
      2: {
        label: "Published",
        severity: "success",
        icon: "pi pi-check-circle",
      },
      3: { label: "Unpublished", severity: "danger", icon: "pi pi-eye-slash" },
      4: { label: "Archived", severity: "info", icon: "pi pi-archive" },
      5: { label: "Scheduled", severity: "help", icon: "pi pi-calendar" },
    }[value] || {
      label: "Unknown",
      severity: "secondary",
      icon: "pi pi-question-circle",
    }
  );
};

const getThumbnailUrl = (thumbnail) => {
  if (!thumbnail) {
    return null;
  }

  return `${baseURL}/${thumbnail}`;
};

const fetchList = async () => {
  setTableLoading(true);
  await college.fetchList();
  setTableLoading(false);
};

const listingFilter = () => {
  college.currentPage = 0;
  setTableLoading(true);
  fetchList();
  setTableLoading(false);
};

const getCollegeTypeStatus = (value) => {
  return (
    collegeType.find((item) => item.value === value)?.name || "Not Available"
  );
};

const getStateTypeStatus = (value) => {
  return States.find((item) => item.value === value)?.name || "Not Available";
};

// const stateFilterChange = () => {
//   filterField.cityId = null;
//   dropdown.cityList = [];

//   if (filterField.stateId) {
//     dropdown.fetchCityByStateDropdown(filterField.stateId.value);
//   }

//   listingFilter();
// };

const toggleAction = (event, data) => {
  college.selectedRow = data;
  menuAction.value.toggle(event);
};

const updateStatusDialog = async (status) => {
  confirmDialog({
    header: "Confirm",
    message: `Are you sure you want to change status as ${status} the selected record?`,
    accept: () => updateStatus(status),
  });
};

const updateStatus = async (status) => {
  await college.fetchStatus(status);
  fetchList();
};

const openScheduleDialog = () => {
  minScheduledAt.value = new Date(Date.now() + 5 * 60 * 1000);
  scheduledAt.value = null;
  scheduleDialogVisible.value = true;
};

const scheduleCollege = async () => {
  if (!scheduledAt.value) {
    return apiToast({
      data: {
        response: false,
        message: "Please select scheduled publish time",
      },
    });
  }

  await college.fetchStatus("scheduled", scheduledAt.value);
  scheduleDialogVisible.value = false;
  scheduledAt.value = null;
  fetchList();
};

const createAction = () => {
  college.formDialogType = "create";
  college.formDialogVisibility = true;
};

const updateAction = async (data) => {
  college.selectedRow = data;
  if (college.fetchById) await college.fetchById();
  college.formDialogType = "update";
  college.formDialogVisibility = true;
};

const viewAction = async (data) => {
  college.selectedRow = data;
  if (college.fetchById) await college.fetchById();
  college.formDialogType = "view";
  college.formDialogVisibility = true;
};

const previewAction = async (data) => {
  college.selectedRow = data;
  router.push(`/corporate/college/${college.selectedRow._id}`);
};

const deleteDialog = async (data) => {
  college.selectedRow = data;

  confirmDialog({
    header: "Confirm",
    message: "Are you sure you want to delete the selected record?",
    accept: fetchDelete,
  });
};

const fetchDelete = async () => {
  await college.fetchDelete();
  fetchList();
};

// onMounted(() => {
//   dropdown.fetchStateDropdown();
//   dropdown.fetchCategoryDropdown();
//   dropdown.fetchTagsDropdown();
//   dropdown.fetchReporterDropdown();
// });

onMounted(() => {
  fetchList();
});

onBeforeUnmount(() => {
  college.$reset();
});
</script>

<template>
  <div class="pages-wrapper">
    <div class="surface-0 border-round-lg shadow-1 px-4 pt-4">
      <div
        class="pb-4 flex flex-wrap gap-3 align-items-center justify-content-between"
      >
        <div class="flex gap-2 align-items-center">
          <i class="pi pi-file text-xl" />
          <p className="font-bold  text-lg">
            {{ title }}
          </p>
        </div>

        <div class="flex gap-2 align-items-center">
          <Tag severity="info">
            {{ college.list?.totalRecord || 0 }} Records
          </Tag>
          <Button
            icon="pi pi-plus"
            label="Create College"
            size="small"
            @click="createAction()"
          />
        </div>
      </div>

      <jinz-filter :store="college">
        <div class="col-12 sm:col-6 lg:col-2">
          <InputText
            v-model="filterField.id"
            type="text"
            size="small"
            class="w-full"
            placeholder="Search by college id"
            v-debounce:500ms="listingFilter"
          />
        </div>

        <div class="col-12 sm:col-6 lg:col-2">
          <InputText
            v-model="filterField.name"
            type="text"
            size="small"
            class="w-full"
            placeholder="Search by Name"
            v-debounce:500ms="listingFilter"
          />
        </div>

        <div class="col-12 sm:col-6 lg:col-2">
          <InputText
            v-model="filterField.slug"
            type="text"
            size="small"
            class="w-full"
            placeholder="Search by slug"
            v-debounce:500ms="listingFilter"
          />
        </div>

        <div class="col-12 sm:col-6 lg:col-2">
          <Select
            v-model="filterField.stateId"
            :options="States"
            optionLabel="name"
            filter
            class="w-full"
            inputClass="p-2 text-sm"
            style="height: 29.4px"
            label="State"
            placeholder="Select state"
            @change="stateFilterChange"
          />
        </div>

        <div class="col-12 sm:col-6 lg:col-2">
          <Select
            v-model="filterField.cityId"
            :options="States"
            optionLabel="name"
            filter
            class="w-full"
            inputClass="p-2 text-sm"
            style="height: 29.4px"
            label="City"
            placeholder="Select city"
            :disabled="!filterField.stateId"
            @change="listingFilter"
          />
        </div>

        <div class="col-12 sm:col-6 lg:col-2">
          <Select
            v-model="filterField.categoryId"
            :options="collegeType"
            optionLabel="name"
            filter
            class="w-full"
            inputClass="p-2 text-sm"
            style="height: 29.4px"
            label="Category"
            placeholder="Select category"
            @change="listingFilter"
          />
        </div>

        <div class="col-12 sm:col-6 lg:col-2">
          <DatePicker
            v-model="filterField.createdAt"
            class="w-full"
            showIcon
            inputClass="p-2 text-sm"
            label="Created Date"
            placeholder="Search by created date"
            @date-select="listingFilter"
          />
        </div>

        <div class="col-12 sm:col-6 lg:col-2">
          <DatePicker
            v-model="filterField.publishedAt"
            class="w-full"
            showIcon
            inputClass="p-2 text-sm"
            label="Published Date"
            placeholder="Search by published date"
            @date-select="listingFilter"
          />
        </div>
      </jinz-filter>

      <jinzTable :store="college" class="college-preview-table">
        <!-- {{ college.list.data[0] }} -->
        <Column field="title" header="Article Preview" style="min-width: 520px">
          <template #body="{ data }">
            <div class="college-preview">
              <div class="college-thumb">
                <img
                  v-if="getThumbnailUrl(data.bannerImage)"
                  :src="getThumbnailUrl(data.bannerImage)"
                  loading="lazy"
                />
                <i v-else class="pi pi-image text-500" />
              </div>

              <div class="min-w-0 flex-1">
                <div class="flex flex-wrap gap-2 align-items-center mb-2">
                  <Tag severity="secondary">#{{ data._id }}</Tag>
                </div>

                <p class="college-title">
                  <b v-if="data.name">{{ data.name }}:</b>
                  {{ data.title }}
                </p>

                <div
                  class="flex flex-wrap gap-3 align-items-center text-sm text-600"
                >
                  <span v-if="data.slug" class="flex align-items-center gap-1">
                    <i class="pi pi-link text-xs" />
                    {{ getCollegeUrl(data) }}
                  </span>
                  <a
                    v-if="data.slug"
                    class="flex align-items-center gap-1"
                    target="_blank"
                    :href="getCollegeUrl(data)"
                  >
                    <i class="pi pi-external-link text-xs" />
                    Public URL
                  </a>
                  <span
                    v-if="data.location"
                    class="flex align-items-center gap-1"
                  >
                    <i class="pi pi-map-marker text-xs" />
                    {{ data.location }}
                  </span>
                </div>
              </div>
            </div>
          </template>
        </Column>

        <Column
          style="min-width: 180px; max-width: 420px"
          field="state"
          header="State"
        >
          <template #body="{ data }">
            <div class="flex gap-2 flex-wrap">
              <Tag v-if="data.stateId" severity="secondary">
                {{ getStateTypeStatus(data.stateId) }}
              </Tag>
              <span
                v-if="!data.stateId && !data.cityId"
                class="text-500 text-sm"
                >Not set</span
              >
            </div>
          </template>
        </Column>

        <Column
          style="min-width: 160px; max-width: 400px"
          field="categories"
          header="College Type"
        >
          <template #body="{ data }">
            <div class="flex gap-2 flex-wrap">
              <Tag v-if="data.collegeType" severity="secondary">
                {{ getCollegeTypeStatus(data.collegeType) }}
              </Tag>

              <span
                v-if="!data.stateId && !data.cityId"
                class="text-500 text-sm"
                >Not set</span
              >
            </div>
          </template>
        </Column>

        <Column field="status" header="Status" style="min-width: 170px">
          <template #body="{ data }">
            <div class="flex flex-column gap-2">
              <Tag :severity="getCollegeStatus(data.status).severity">
                <i :class="getCollegeStatus(data.status).icon" class="mr-1" />
                {{ getCollegeStatus(data.status).label }}
              </Tag>
              <small v-if="data.publishedAt" class="text-600">{{
                data.status === 5
                  ? `Scheduled: ${data.publishedAt}`
                  : data.publishedAt
              }}</small>
            </div>
          </template>
        </Column>

        <Column field="seo" header="SEO Details" style="min-width: 250px">
          <template #body="{ data }">
            <p class="mb-0">
              <b>{{ data.seoTitle }}</b>
            </p>
            <p class="mb-0 -mt-1 mb-2">{{ data.seoDescription }}</p>
            <div class="flex gap-2 flex-row flex-wrap">
              <span
                v-for="value in data.seoKeyword"
                class="p-1 border-round-sm mr-1 font-bold text-xs"
                :style="{ background: `#c3c3c6`, color: '#120101' }"
              >
                {{ value }}
              </span>
            </div>
          </template>
        </Column>

        <Column field="manageBy" header="Manage By" style="min-width: 250px">
          <template #body="{ data }">
            <div class="manage-cell">
              <p class="mb-1">
                <i class="pi pi-plus-circle mr-1" /><b>Created</b>
                {{ data.createdAt }}
              </p>
              <p v-if="data.updater" class="mb-1">
                <i class="pi pi-refresh mr-1" /><b>Updated</b>
                {{ data.updatedAt }}
              </p>

              <p v-if="data.publisher" class="mb-1">
                <i class="pi pi-send mr-1" /><b>Published</b>
                {{ data.publishedAt }}
              </p>
            </div>
          </template>
        </Column>

        <Column field="action" header="Action">
          <template #body="{ data }">
            <div class="flex gap-2">
              <Button
                icon="pi pi-file-edit"
                size="small"
                label="Edit"
                @click="updateAction(data)"
              />
              <Button
                icon="pi pi-eye"
                size="small"
                label="View"
                @click="viewAction(data)"
              />
              <Button
                icon="pi pi-eye"
                size="small"
                label="Preview"
                @click="previewAction(data)"
              />
              <Button
                icon="pi pi-trash"
                size="small"
                label="Delete"
                @click="deleteDialog(data)"
              />
            </div>
          </template>
        </Column>
      </jinzTable>
    </div>

    <CollegeForm :title="title" />
  </div>
</template>

<style scoped>
.college-preview {
  display: flex;
  align-items: flex-start;
  gap: 0.875rem;
}

.college-thumb {
  width: 92px;
  height: 64px;
  border-radius: 8px;
  overflow: hidden;
  background: #f1f5f9;
  border: 1px solid #e2e8f0;
  flex: 0 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
}

.college-thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.college-title {
  margin: 0 0 0.5rem;
  color: #111827;
  font-size: 0.95rem;
  line-height: 1.45;
}

.manage-cell {
  color: #475569;
  font-size: 0.875rem;
  line-height: 1.45;
}

.manage-cell i {
  color: #64748b;
}
</style>
