<script setup>
import { Form } from 'vee-validate';
import { useToast } from 'primevue/usetoast';
import { country } from '~/utility/countryList';

const axios = useNuxtApp().$axios;
const toast = useToast();

const form = ref('');
const isLoading = ref(false);
const successContactUsModal = ref(false);

const formFiled = reactive({
    fullName: '',
    email: '',
    country: null,
    mobile: '',
    queries: ''
});

const setFieldValue = (filed, value) => {
    formFiled[filed] = value;
};

const onSubmit = async () => {
    isLoading.value = true;

    const fieldset = {
        fullName: formFiled.fullName,
        email: formFiled.email,
        mobile: `${formFiled.country.code}${formFiled.mobile}`,
        queries: formFiled.queries
    };

    try {
        const response = await axios.post('unauth/contact-us', fieldset);
        if (response.data.response) {
            isLoading.value = false;
            form.value.resetForm();
            successContactUsModal.value = true;
        }
    } catch ({ response }) {
        if (!response.data.response) {
            isLoading.value = false;
            if (response.status === 422) {
                form.value.setErrors(response.data.message || {});

                if (typeof response.data.message === String) {
                    toast.add({
                        severity: 'error',
                        summary: 'Error',
                        detail: response.data.message,
                        life: 3500
                    });
                }

                toast.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'Something went wrong.',
                    life: 3150
                });
            }
        }
    }
};

const pageDetails = {
    title: `Get in Touch: Contact Us at Ownteacher`,
    description: 'Reach out to Ownteacher for inquiries, feedback, collaborations, and personalized academic support. Our team is here to assist you on your educational journey.',
    keywords: 'contact us, academic support, inquiry, feedback, collaboration, assistance, academic journey, personalized support, educational guidance"'
};

useSeoMeta({
    title: pageDetails.title,
    description: pageDetails.description,
    ogTitle: pageDetails.title,
    ogDescription: pageDetails.description,
    keywords: pageDetails.keywords
});
</script>

<template>
    <PageSection title="Contact Us" subtitle="We are your go to resource for all your academic needs. Get the support you deserve in any filed of study!" />

    <section class="container py-6">
        <div class="mb-6">
            <p class="text-2xl lg:text-4xl line-height-2 font-bold">No fear when OWN TEACHER is here!</p>
            <p class="text-lg">Unlock a world of knowledge with our extensive coverage of over 100+ subjects.</p>
        </div>
        <div class="grid">
            <div class="col-12 md:col-6">
                <div class="gradient-bg border-round-xl p-5 mb-4 border-2 border-white">
                    <p class="text-2xl font-bold text-white">Need Help? Just WhatsApp!</p>
                    <div class="flex align-items-center justify-content-center gap-3 text-white mb-4">
                        <i class="pi pi-whatsapp text-xl" />
                        <p class="text-lg font-medium text-left">Skip the hassle of learning a website or app.</p>
                    </div>

                    <a href="https://api.whatsapp.com/send/?phone=%2B917258082001&text=Hi.%20I%20am%20not%20sure%20how%20to%20proceed%20on%20your%20website%20OT.%20Need%20help.%20Please%20assist." target="_blank" aria-label="Whatsapp">
                        <div class="bg-green-500 border-round-xl p-3 px-4 flex align-items-center justify-content-center text-white gap-2">
                            <i class="pi pi-whatsapp text-2xl" />
                            <p class="font-bold text-xl">Start a WhatsApp Chat Now!</p>
                        </div>
                    </a>
                </div>

                <div class="surface-0 p-5 border-round-xl border-2 border-primary">
                    <p class="text-xl font-bold mt-0">Have a Questions?</p>
                    <div class="flex align-items-center mb-3">
                        <i class="pi pi-map-marker text-xl text-primary" />
                        <p class="m-0 ml-3">
                            Aadharshila Academy, Patna City, Patna, Bihar,<br />
                            India - 800008
                        </p>
                    </div>
                    <div class="flex align-items-center mb-3">
                        <i class="pi pi-phone text-xl text-primary" />
                        <p class="m-0 ml-3">
                            <a href="tel:+91 7258082001" class="text-color no-underline"> +91 7258082001 </a>
                        </p>
                    </div>
                    <div class="flex align-items-center">
                        <i class="pi pi-send text-xl text-primary" />
                        <p class="m-0 ml-3">
                            <a href="mailto:contact@ownteacher.com" class="text-color no-underline"> contact@ownteacher.com </a>
                        </p>
                    </div>
                    <div class="flex mt-4">
                        <a href="https://www.linkedin.com/in/own-teacher-08b009289/" target="_blank" class="bg-primary border-circle mr-2 social-icon" aria-label="Linkedin">
                            <i class="pi pi-linkedin text-xl text-white" />
                        </a>
                        <a href="https://www.instagram.com/ownteacherdotcom/?utm_source=qr&igsh=YnJ5cHNhZjdmOXNl" target="_blank" class="bg-primary border-circle mr-2 social-icon" aria-label="Instagram">
                            <i class="pi pi-instagram text-xl text-white" />
                        </a>
                        <a href="https://www.facebook.com/profile.php?id=100092691056077" target="_blank" class="bg-primary border-circle mr-2 social-icon" aria-label="Facebook">
                            <i class="pi pi-facebook text-xl text-white" />
                        </a>
                    </div>
                </div>
            </div>

            <div class="col-12 md:col-6">
                <div class="md:mx-3 surface-0 border-round-xl p-5">
                    <p class="text-2xl font-bold">Have any queries about this own teacher, ask to team expert,</p>
                    <Form ref="form" @submit="onSubmit">
                        <FormFIled :value="formFiled.fullName" name="fullName" rules="required|alpha_spaces|max:250" label="Full Name" @atInput="(value) => setFieldValue('fullName', value)" />

                        <FormFIled :value="formFiled.email" name="email" rules="required|email" label="Email Address" @atInput="(value) => setFieldValue('email', value)" />

                        <FormFIled :value="formFiled.country" name="country" rules="required" label="Country" dropdownFilter filedType="dropdown" :dropdownOption="country" @atInput="(value) => setFieldValue('country', value)" />

                        <FormFIled
                            :value="formFiled.mobile"
                            name="mobile"
                            rules="required|min:6|max:12"
                            label="WhatsApp Number"
                            placeholder="WhatsApp Number"
                            @atInput="(value) => setFieldValue('mobile', value)"
                            hint="Enter your WhatsApp number without country code."
                        />
                        <FormFIled :value="formFiled.queries" filedType="text-area" name="queries" rules="required|min:3|max:1500" label="Your valuable queries" @atInput="(value) => setFieldValue('queries', value)" />
                        <div class="py-3 text-right">
                            <Button class="mr-3" type="submit" :disabled="isLoading"> Submit </Button>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    </section>

    <MainSection label="Answer To" heading="Frequently Asked Questions" white>
        <Faq />
    </MainSection>

    <section>
        <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d202596.60341276115!2d85.11744877098744!3d25.547858084883146!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ed597e09f70087%3A0x18b261452db0f51b!2sAadharshila%20Academy!5e0!3m2!1sen!2sin!4v1714305473597!5m2!1sen!2sin"
            width="100%"
            height="500"
            style="border: 0"
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
        ></iframe>
    </section>

    <Dialog
        v-model:visible="successContactUsModal"
        modal
        :pt="{
            root: 'border-none',
            mask: {
                style: 'backdrop-filter: blur(2px)'
            }
        }"
    >
        <template #container="{}">
            <div class="flex flex-column p-5 gap-3 align-items-center justify-content-center" style="border-radius: 12px; background-image: radial-gradient(circle at left top, var(--primary-400), var(--primary-700))">
                <div>
                    <img src="/image/auth/auth-login-check.png" alt="Registration completed" width="100" height="100" />
                </div>
                <p class="text-2xl font-bold text-white m-0">Thank you for filling out your information!</p>
                <div class="text-center">
                    <p class="text-lg font-medium text-white m-0 mb-2">We have received your message and would like to thank you for writing to us.</p>

                    <p class="text-yellow-500 font-bold m-0">Please enjoy, and let us know if there’s anything else we can help you with.</p>
                </div>

                <Button label="OK" class="p-button-secondary" @click="successContactUsModal = false"></Button>
            </div>
        </template>
    </Dialog>
</template>
