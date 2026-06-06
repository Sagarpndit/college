<template>
    <div class="lg:col-6 hidden lg:block auth-banner">
        <div class="flex justify-content-between flex-column h-full p-4">
            <!-- Header -->
            <div>
                <img src="/brand/logo-dark.png" height="50" />
                <h4 class="text-white font-bold text-xl my-4">EXPAND YOUR BUSINESS WITH <br />Vyapaar</h4>
                <ul>
                    <li class="text-white">
                        <i class="pi pi-star-fill text-xs mr-2"></i>
                        Personalized portfolio
                    </li>
                    <li class="text-white">
                        <i class="pi pi-star-fill text-xs mr-2"></i>
                        Reviews and testimonials profiling.
                    </li>
                    <li class="text-white">
                        <i class="pi pi-star-fill text-xs mr-2"></i>
                        Increase your brand visibility
                    </li>
                    <li class="text-white">
                        <i class="pi pi-star-fill text-xs mr-2"></i>
                        Increase your business turnover
                    </li>
                    <li class="text-white">
                        <i class="pi pi-star-fill text-xs mr-2"></i>
                        Consistent Orders
                    </li>
                    <li class="text-white">
                        <i class="pi pi-star-fill text-xs mr-2"></i>
                        Enjoy timely payments
                    </li>
                    <li class="text-white">
                        <i class="pi pi-star-fill text-xs mr-2"></i>
                        Access to verified leads
                    </li>
                    <li class="text-white">
                        <i class="pi pi-star-fill text-xs mr-2"></i>
                        Automated reminders
                    </li>
                </ul>
            </div>

            <!-- Body -->
            <div class="-mt-6">
                <!-- Quote -->
                <div class="mb-5">
                    <img src="/auth/quote.png" width="180" height="180" class="opacity-20 -mx-4 -mt-8" />

                    <p class="text-white -mt-6">
                        Vyapaar has been a great platform for my business, connecting me with genuine clients and increasing my projects. The interface is user-friendly, and the support team is always helpful. Since joining, I’ve seen steady growth
                        in work and revenue. Highly recommended for vendors looking to expand!
                    </p>
                </div>
                <div class="my-5 flex gap-4 align-items-center">
                    <div class="flex gap-2 align-items-center justify-content-center">
                        <Avatar image="/auth/profile.jpg" class="mr-2" size="xlarge" shape="circle" />
                        <div class="text-white">
                            <p class="font-bold text-lg mb-0">Vivek Singh</p>
                            <p>Owner & Founder, Synkroot</p>
                        </div>
                    </div>
                    <Divider layout="vertical" class="py-5" />
                    <div>
                        <img src="/auth/brand/logo.png" width="150" />
                    </div>
                </div>
            </div>

            <!-- Footer -->
            <div>
                <small class="text-white">
                    © 2024
                    <a href="https://vyapaar.com" target="_blank" class="text-white font-bold">Vyapaar</a>
                    All rights reserved.
                </small>
            </div>
        </div>
    </div>
</template>

<style>
.auth-banner {
    background: linear-gradient(190deg, rgb(8, 3, 42) 65%, rgb(8, 9, 67) 80%, rgb(9, 91, 198) 95%, rgb(27, 124, 228) 100%);
}
</style>
