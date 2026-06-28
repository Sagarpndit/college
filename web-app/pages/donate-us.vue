<script setup>
const openDialog = ref(false);
const handlePayPal = () => {
    window.open('https://www.paypal.me/001siddhant', '_blank');
};
</script>

<template>
    <div class="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div class="max-w-3xl mx-auto text-center">
            <h1 class="text-4xl py-5 font-extrabold text-gray-800 mb-4">🙏 Donate to Support Free Education for All</h1>
            <p class="text-lg text-gray-600 mb-8">
                At <span class="text-primary font-semibold">OwnTeacher.com</span>, we believe quality education is a right — not a privilege. Your donation helps us deliver free learning resources to students globally and uplift the underprivileged
                through education.
            </p>

            <div class="bg-white shadow-lg rounded-lg p-6 mb-10">
                <h2 class="text-2xl font-bold text-gray-800 mb-4">🌍 Where Your Donation Goes</h2>
                <ul class="text-left space-y-4 text-gray-700">
                    <li>✅ <strong>Improving the Platform:</strong> Boosting performance, adding features, and growing our content library.</li>
                    <li>✅ <strong>Creating Free Resources:</strong> More videos, notes, mock tests, and guides for exams like JEE, NEET, and board levels.</li>
                    <li>✅ <strong>Charity for Education:</strong> Funding access to internet, devices, and mentoring for economically weaker students.</li>
                </ul>
            </div>

            <div class="bg-yellow-50 border border-yellow-300 p-6 rounded-lg mb-10">
                <h3 class="text-xl font-bold text-yellow-800 mb-2">💖 Join Us in This Movement</h3>
                <p class="text-gray-700">Even a small amount can spark change. Together, we can bridge the educational divide and build a future where every child thrives.</p>
            </div>
            <Button class="bg-primary-600 hover:bg-primary-700 text-white font-bold py-3 px-6 rounded-lg text-lg shadow" label="Donate Now" @click="openDialog = true" />
        </div>
        <Dialog v-model:visible="openDialog" modal header="Support OwnTeacher" :style="{ width: '50vw' }" :breakpoints="{ '1199px': '75vw', '575px': '90vw' }" :pt="{ content: { class: 'p-4 sm:p-6' } }">
            <div class="space-y-4 sm:space-y-6 text-center">
                <h2 class="text-xl sm:text-2xl font-extrabold text-gray-800">🙏 Thank You for Supporting Free Education!</h2>
                <p class="text-gray-600 text-sm sm:text-base">Your donation helps us provide quality educational content free of cost and support underprivileged students across the world.</p>

                <div class="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6">
                    <!-- PayPal Option -->
                    <div class="bg-blue-50 hover:bg-blue-100 transition p-4 sm:p-5 rounded-lg shadow cursor-pointer w-full sm:w-1/2" @click="handlePayPal">
                        <img src="https://www.paypalobjects.com/webstatic/mktg/logo/pp_cc_mark_111x69.jpg" alt="PayPal" class="mx-auto mb-2 h-8 sm:h-10" />
                        <p class="font-semibold text-blue-800 text-sm sm:text-base">Donate with PayPal</p>
                    </div>

                    <!-- UPI Option -->
                    <div class="bg-green-50 transition p-4 sm:p-5 rounded-lg shadow w-full sm:w-1/2 text-center">
                        <img src="../public/qr.jpg" alt="UPI QR Code" class="mx-auto w-24 sm:w-32 h-24 sm:h-32 max-w-full object-contain rounded-md border border-gray-300 shadow" />
                        <p class="font-semibold text-green-800 mt-2 sm:mt-3 text-sm sm:text-base">Scan & Donate via UPI</p>
                        <p class="text-xs sm:text-sm text-gray-600 mt-1">or use UPI ID: <strong>kumarsiddhant1@oksbi</strong></p>
                    </div>
                </div>
            </div>
        </Dialog>
    </div>
</template>
