<script>
    const features = [
        {
            icon: `<svg class="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>`,
            title: "Lightning Fast",
            description: "Convert your images instantly with our optimized processing engine. No waiting, no delays.",
            animationDelay: "0ms"
        },
        {
            icon: `<svg class="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>`,
            title: "High Quality",
            description: "Maintain image quality during conversion with our advanced algorithms and optimization techniques.",
            animationDelay: "100ms"
        },
        {
            icon: `<svg class="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>`,
            title: "User Friendly",
            description: "Simple drag-and-drop interface makes image conversion accessible to everyone, no technical skills required.",
            animationDelay: "200ms"
        },
        {
            icon: `<svg class="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>`,
            title: "Multiple Formats",
            description: "Support for all popular image formats including PNG, JPG, WEBP, and GIF. Convert between any formats instantly.",
            animationDelay: "300ms"
        },
        {
            icon: `<svg class="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>`,
            title: "Completely Free",
            description: "No hidden fees, no subscriptions. Convert as many images as you want, whenever you want.",
            animationDelay: "400ms"
        },
        {
            icon: `<svg class="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>`,
            title: "Secure & Private",
            description: "Your images are processed locally in your browser. We never store or share your files.",
            animationDelay: "500ms"
        }
    ];
</script>

<div id="why" class="w-full py-24 sm:py-32">
    <div class="container mx-auto px-4 sm:px-6">
        <div class="flex flex-col items-center text-center mb-16 sm:mb-20 animate-fade-in">
            <h2 class="text-3xl sm:text-4xl md:text-5xl font-bold text-black leading-[1.1] tracking-tight max-w-3xl">Transform Your Images with <span class="bg-gradient-to-r from-black via-black/90 to-black/80 bg-clip-text text-transparent">Confidence</span></h2>
            <p class="mt-6 text-lg sm:text-xl text-black/70 max-w-2xl">Experience seamless image conversion with our powerful, user-friendly tool designed for everyone.
            </p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 md:gap-12">
            {#each features as feature, index}
                <div class="group rounded-2xl border border-black/10 p-6 sm:p-8 hover:border-black/20 transition-all duration-300 ease-out transform hover:scale-[1.02] hover:shadow-xl animate-fade-in {feature.animationDelay ? `[animation-delay:${feature.animationDelay}]` : ''} bg-white">
                    <div class="rounded-full bg-black/[0.03] p-4 w-fit mb-6 transition-all duration-300 ease-out group-hover:scale-110 group-hover:bg-black/[0.05] group-hover:rotate-3">
                        {@html feature.icon}
                    </div>
                    <h3 class="text-xl font-semibold text-black mb-3">{feature.title}</h3>
                    <p class="text-black/70">{feature.description}</p>
                </div>
            {/each}
        </div>
    </div>
</div>

<style>
    @keyframes fade-in {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
    }

    :global(.animate-fade-in) {
        animation: fade-in 0.4s ease-out forwards;
        opacity: 0;
    }
</style>