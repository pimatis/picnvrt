<script lang="ts">
    const comparisonCards = [
        {
            name: "PicNvrt",
            label: "Our Tool",
            labelClass: "text-black",
            nameClass: "text-black",
            features: [
                "Instant Processing",
                "100% Browser-Based",
                "No File Size Limits",
                "Multiple Format Support",
                "Always Free"
            ],
            iconType: "check",
            animationDelay: "0ms"
        },
        {
            name: "Other Tools",
            label: "Competitors",
            labelClass: "text-black/70",
            nameClass: "text-black/70",
            features: [
                "Slow Server Processing",
                "Server Upload Required",
                "File Size Restrictions",
                "Limited Format Support",
                "Premium Features"
            ],
            iconType: "x",
            animationDelay: "100ms"
        }
    ];

    const tableFeatures = [
        {
            feature: "Processing Time",
            ourValue: "Instant",
            otherValue: "5-10 seconds"
        },
        {
            feature: "Privacy",
            ourValue: "100% Private",
            otherValue: "Server Processing"
        },
        {
            feature: "File Size",
            ourValue: "Unlimited",
            otherValue: "Usually 5-10MB"
        },
        {
            feature: "Cost",
            ourValue: "Always Free",
            otherValue: "Freemium"
        }
    ];

    function getIcon(type: "check" | "x"): string {
        if (type === "check") {
            return `<svg class="w-5 h-5 mr-3 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>`;
        } else if (type === "x") {
            return `<svg class="w-5 h-5 mr-3 text-black/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>`;
        }
        return '';
    }
</script>

<div class="w-full py-24 sm:py-32">
    <div class="container mx-auto px-4 sm:px-6">
        <div class="flex flex-col items-center text-center mb-16 animate-fade-in">
            <h2 class="text-3xl sm:text-4xl md:text-5xl font-bold text-black leading-[1.1] tracking-tight max-w-3xl">Why Choose <span class="bg-gradient-to-r from-black via-black/90 to-black/80 bg-clip-text text-transparent">PicNvrt</span>?</h2>
            <p class="mt-6 text-lg sm:text-xl text-black/70 max-w-2xl">See how our tool stands out from the competition</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {#each comparisonCards as card}
                <div class="rounded-2xl border border-black/10 p-8 hover:border-black/20 transition-all duration-300 ease-out transform bg-white animate-fade-in {card.animationDelay ? `[animation-delay:${card.animationDelay}]` : ''}">
                    <div class="flex items-center justify-between mb-8">
                        <h3 class="text-2xl font-bold {card.nameClass}">{card.name}</h3>
                        <span class="inline-flex items-center rounded-full bg-black/[0.03] px-4 py-1 text-sm font-medium {card.labelClass}">
                            {card.label}
                        </span>
                    </div>
                    <ul class="space-y-4">
                        {#each card.features as feature}
                            <li class="flex items-center {card.nameClass}">
                                {@html getIcon(card.iconType as "check" | "x")}
                                <span>{feature}</span>
                            </li>
                        {/each}
                    </ul>
                </div>
            {/each}
        </div>

        <div class="overflow-x-auto rounded-2xl border border-black/10">
            <table class="w-full border-collapse bg-white">
                <thead>
                    <tr class="border-b border-black/10">
                        <th class="py-4 px-6 text-left text-sm font-medium text-black/70">Feature</th>
                        <th class="py-4 px-6 text-center text-sm font-medium text-black">PicNvrt</th>
                        <th class="py-4 px-6 text-center text-sm font-medium text-black/70">Others</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-black/10">
                    {#each tableFeatures as row}
                        <tr class="group hover:bg-black/[0.01] transition-colors duration-200">
                            <td class="py-4 px-6 text-sm text-black">{row.feature}</td>
                            <td class="py-4 px-6 text-center text-sm text-black">{row.ourValue}</td>
                            <td class="py-4 px-6 text-center text-sm text-black/70">{row.otherValue}</td>
                        </tr>
                    {/each}
                </tbody>
            </table>
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