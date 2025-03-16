<script lang="ts">
    let openQuestion = -1;

    function toggleQuestion(index: number) {
        openQuestion = openQuestion === index ? -1 : index;
    }

    const faqs = [
        {
            question: "Which image formats are supported?",
            answer: "We support all major image formats including PNG, JPG (JPEG), WEBP, and GIF. You can convert between any of these formats instantly."
        },
        {
            question: "Is there a file size limit?",
            answer: "No, there are no file size limits as all processing is done locally in your browser. However, larger files may take slightly longer to process depending on your device's capabilities."
        },
        {
            question: "Is my data private and secure?",
            answer: "Yes, absolutely! All image processing happens directly in your browser. Your images never leave your device or get uploaded to any server, ensuring 100% privacy and security."
        },
        {
            question: "Do you maintain the image quality?",
            answer: "Yes, we use advanced algorithms to maintain the highest possible quality during conversion. However, when converting to a format with inherent compression (like JPEG), some quality adjustment might occur."
        },
        {
            question: "Is this service really free?",
            answer: "Yes, our service is completely free with no hidden costs. You can convert as many images as you want without any limitations or premium features."
        },
        {
            question: "Can I convert multiple images at once?",
            answer: "Batch conversion feature is coming soon! Currently, you can convert one image at a time with our fast and efficient process."
        },
        {
            question: "What devices and browsers are supported?",
            answer: "Our tool works on all modern browsers including Chrome, Firefox, Safari, and Edge. It's fully responsive and works great on both desktop and mobile devices."
        },
        {
            question: "Do I need to create an account?",
            answer: "No, you don't need to create an account or sign up. Just visit the website and start converting your images instantly."
        }
    ];
</script>

<div class="w-full py-24 sm:py-32">
    <div class="container mx-auto px-4 sm:px-6">
        <div class="flex flex-col items-center text-center mb-16 sm:mb-20 animate-fade-in">
            <h2 class="text-3xl sm:text-4xl md:text-5xl font-bold text-black leading-[1.1] tracking-tight max-w-3xl">Frequently Asked <span class="bg-gradient-to-r from-black via-black/90 to-black/80 bg-clip-text text-transparent">Questions</span></h2>
            <p class="mt-6 text-lg sm:text-xl text-black/70 max-w-2xl">Find answers to common questions about our image conversion tool</p>
        </div>

        <div class="max-w-3xl mx-auto">
            <div class="divide-y divide-black/10">
                {#each faqs as faq, index}
                    <div class="py-6">
                        <button class="w-full flex items-center justify-between text-left focus:outline-none group" on:click={() => toggleQuestion(index)}>
                            <span class="text-lg font-medium text-black group-hover:text-black/80 transition-colors duration-200">{faq.question}</span>
                            <span class="ml-6 flex-shrink-0 rounded-full bg-black/[0.03] p-2 group-hover:bg-black/[0.05] transition-all duration-200">
                                <svg class="w-5 h-5 text-black transform transition-transform duration-200 ease-out" style="transform: rotate({openQuestion === index ? '180deg' : '0deg'})" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                                </svg>
                            </span>
                        </button>
                        {#if openQuestion === index}
                            <div class="mt-4 text-base text-black/70 animate-fade-in" style="animation-duration: 200ms;">{faq.answer}</div>
                        {/if}
                    </div>
                {/each}
            </div>
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