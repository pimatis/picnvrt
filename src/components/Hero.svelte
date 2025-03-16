<script lang="ts">
    import { supportedFormats, getFileExtension, convertMultipleImages, type BatchConversionResult } from "../lib/imageConverter";
    
    let files: File[] = [];
    let dragActive = false;
    let fileInput: HTMLInputElement;
    let convertedImages: BatchConversionResult[] = [];
    let error: string | null = null;
    let isConverting = false;
    let selectedFormat: string = supportedFormats.JPEG;
    let conversionProgress = 0;
    
    async function handleFileChange(event: Event) {
        const target = event.target as HTMLInputElement;
        if (target.files && target.files.length > 0) {
            await handleFiles(Array.from(target.files));
        }
    }
    
    async function handleDrop(event: DragEvent) {
        event.preventDefault();
        event.stopPropagation();
        dragActive = false;
        
        if (event.dataTransfer?.files && event.dataTransfer.files.length > 0) {
            await handleFiles(Array.from(event.dataTransfer.files));
        }
    }
    
    async function handleFiles(uploadedFiles: File[]) {
        const imageFiles = uploadedFiles.filter(file => file.type.startsWith('image/'));
        
        if (imageFiles.length === 0) {
            error = 'Please upload image files only';
            return;
        }

        error = null;
        convertedImages = [];
        files = imageFiles;
        isConverting = true;
        conversionProgress = 0;

        try {
            convertedImages = await convertMultipleImages(
                files,
                selectedFormat as any,
                (progress) => {
                    conversionProgress = progress;
                }
            );
        } catch (err) {
            error = err instanceof Error ? err.message : 'Conversion failed';
        } finally {
            isConverting = false;
            conversionProgress = 100;
        }
    }
    
    function handleDragOver(event: DragEvent) {
        event.preventDefault();
        event.stopPropagation();
        dragActive = true;
    }
    
    function handleDragLeave(event: DragEvent) {
        event.preventDefault();
        event.stopPropagation();
        dragActive = false;
    }

    function downloadConvertedImage(result: BatchConversionResult) {
        if (result.convertedUrl) {
            const link = document.createElement('a');
            link.href = result.convertedUrl;
            const extension = getFileExtension(selectedFormat as any);
            const fileName = result.originalName.split('.')[0];
            link.download = `${fileName}-converted.${extension}`;
            link.click();
        }
    }

    function downloadAllImages() {
        convertedImages.forEach(result => {
            if (result.success) {
                downloadConvertedImage(result);
            }
        });
    }

    function handleFormatChange() {
        convertedImages = [];
        error = null;
        if (files.length > 0) handleFiles(files);
    }

    $: successCount = convertedImages.filter(r => r.success).length;
</script>

<div class="w-full min-h-screen flex items-center justify-center py-20 sm:py-24 md:py-32 relative overflow-hidden">
    <div class="absolute inset-0">
        <div class="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-black/[0.03] via-black/[0.01] to-transparent animate-gradient"></div>
        <div class="absolute inset-0 bg-[linear-gradient(to_right,_var(--tw-gradient-stops))] from-transparent via-black/[0.02] to-transparent opacity-50 animate-pulse-slow"></div>
    </div>
    <div class="container mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-16 lg:gap-20 relative">
        <div class="md:w-1/2 space-y-10 md:space-y-12 animate-fade-in">
            <div class="space-y-6 md:space-y-8">
                <div class="inline-flex items-center rounded-full border px-4 py-1.5 sm:px-5 sm:py-2 text-sm font-medium border-black/10 bg-black/[0.03]">
                    <span class="bg-gradient-to-r from-black via-black/90 to-black/80 bg-clip-text text-transparent">✨ Fast and Easy Image Conversion</span>
                </div>
                <h1 class="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-black leading-[1.1] tracking-tight transition-all duration-500">
                    Convert Images <span class="bg-gradient-to-r from-black via-black/90 to-black/80 bg-clip-text text-transparent">Instantly</span>
                </h1>
                <p class="text-lg sm:text-xl text-black/70 leading-relaxed max-w-2xl transition-all duration-300">
                    Fast, free, and easy to use. Upload your image and instantly convert it to PNG, JPG, WEBP, 
                    or GIF format.
                </p>
            </div>
            <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <button class="group inline-flex items-center justify-center rounded-xl text-sm font-medium transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/20 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-black text-white hover:bg-black/90 h-12 sm:h-14 px-6 sm:px-8 shadow-lg shadow-black/5 hover:shadow-xl hover:shadow-black/10 transform hover:-translate-y-0.5 cursor-pointer" on:click={() => fileInput.click()}>
                    <span>Start Converting</span>
                    <svg class="w-5 h-5 ml-2 transition-transform duration-200 ease-out group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                </button>
                <a href="#why" class="group inline-flex items-center justify-center rounded-xl text-sm font-medium transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/20 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-black/10 hover:bg-black/[0.03] text-black h-12 sm:h-14 px-6 sm:px-8 transform hover:-translate-y-0.5 cursor-pointer">
                    <span>Learn More</span>
                    <svg class="w-5 h-5 ml-2 transition-transform duration-200 ease-out group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                    </svg>
                </a>
            </div>
        </div>
        
        <div class="md:w-1/2 w-full animate-fade-in-delayed">
            <div class="rounded-2xl border border-black/10 shadow-2xl shadow-black/5 backdrop-blur-sm bg-white/50 transition-all duration-300 ease-out transform hover:scale-[1.01] hover:shadow-2xl">
                <div class="p-6 sm:p-8 md:p-10">
                    {#if files.length > 0}
                        <div class="space-y-8 sm:space-y-10">
                            <div class="space-y-3">
                                <label for="format" class="text-sm font-medium leading-none text-black peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                    Select Target Format
                                </label>
                                <div class="relative" role="button" tabindex="0" on:click|stopPropagation on:keydown>
                                    <select id="format" bind:value={selectedFormat} on:change={handleFormatChange} class="flex h-12 w-full items-center justify-between rounded-xl border border-black/10 bg-white px-4 py-2 text-sm ring-offset-white placeholder:text-black/50 focus:outline-none focus:ring-2 focus:ring-black/20 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 text-black hover:border-black/20 transition-all duration-200">
                                        {#each Object.entries(supportedFormats) as [format, value]}
                                            <option value={value}>{format}</option>
                                        {/each}
                                    </select>
                                </div>
                            </div>

                            <div class="space-y-6">
                                <div class="flex items-center justify-between">
                                    <h3 class="text-sm font-medium text-black">Conversion Results</h3>
                                    {#if successCount > 0}
                                        <button class="inline-flex items-center justify-center rounded-xl text-sm font-medium transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/20 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-black text-white hover:bg-black/90 h-10 px-4 shadow-lg shadow-black/5 hover:shadow-xl hover:shadow-black/10 transform hover:-translate-y-0.5" on:click={downloadAllImages}>Download All</button>
                                    {/if}
                                </div>

                                {#if isConverting}
                                    <div class="space-y-3">
                                        <div class="flex items-center justify-between text-sm text-black">
                                            <span>Converting images...</span>
                                            <span>{Math.round(conversionProgress)}%</span>
                                        </div>
                                        <div class="w-full bg-black/10 rounded-full h-2">
                                            <div class="bg-black h-2 rounded-full transition-all duration-300" style="width: {conversionProgress}%"></div>
                                        </div>
                                    </div>
                                {/if}

                                <div class="space-y-4">
                                    {#each convertedImages as result, i (result.originalName)}
                                        <div class="rounded-xl border border-black/10 p-4 space-y-4 animate-fade-in" style="animation-delay: {i * 50}ms">
                                            <div class="flex items-center justify-between">
                                                <span class="text-sm font-medium text-black">{result.originalName}</span>
                                                {#if result.success}
                                                    <button class="inline-flex items-center justify-center rounded-xl text-sm font-medium transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/20 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-black text-white hover:bg-black/90 h-8 px-3 shadow-lg shadow-black/5 hover:shadow-xl hover:shadow-black/10 transform hover:-translate-y-0.5" on:click={() => downloadConvertedImage(result)}>Download</button>
                                                {/if}
                                            </div>
                                            {#if result.success}
                                                <div class="grid grid-cols-2 gap-4">
                                                    <div class="aspect-square rounded-lg border border-black/10 p-2 bg-black/[0.02]">
                                                        <img src={URL.createObjectURL(files[i])} alt="Original" class="h-full w-full object-contain rounded" />
                                                    </div>
                                                    <div class="aspect-square rounded-lg border border-black/10 p-2 bg-black/[0.02]">
                                                        <img src={result.convertedUrl} alt="Converted" class="h-full w-full object-contain rounded" />
                                                    </div>
                                                </div>
                                            {:else}
                                                <div class="flex items-center space-x-3 text-sm text-red-600 bg-red-50 rounded-xl py-2 px-3">
                                                    <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clip-rule="evenodd" />
                                                    </svg>
                                                    <span>{result.error}</span>
                                                </div>
                                            {/if}
                                        </div>
                                    {/each}
                                </div>
                            </div>
                        </div>
                    {:else}
                        <div role="button" tabindex="0" class="flex flex-col items-center justify-center py-16 sm:py-20 border-2 border-dashed border-black/10 rounded-xl cursor-pointer hover:border-black/20 hover:bg-black/[0.02] transition-all duration-300 ease-out group" on:click={() => fileInput.click()} on:keydown={() => fileInput.click()} on:dragover={handleDragOver} on:dragleave={handleDragLeave} on:drop={handleDrop}>
                            <div class="rounded-full bg-black/[0.03] p-4 sm:p-5 mb-4 sm:mb-5 transition-all duration-300 ease-out transform group-hover:scale-110 group-hover:bg-black/[0.05] group-hover:rotate-3">
                                <svg class="w-8 h-8 sm:w-10 sm:h-10 text-black transition-transform duration-300 ease-out group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                                </svg>
                            </div>
                            <p class="text-base sm:text-lg font-medium text-black text-center px-4 transition-all duration-300 ease-out group-hover:scale-105">You can upload multiple images or drag and drop them</p>
                            <p class="text-sm text-black/60 mt-2 text-center transition-all duration-300 ease-out">Supports all common image formats</p>
                        </div>
                    {/if}
                    <input type="file" bind:this={fileInput} on:change={handleFileChange} accept="image/*" multiple class="hidden" />
                </div>
            </div>
        </div>
    </div>
</div>

<style>
    @keyframes gradient {
        0% { opacity: 0.5; }
        50% { opacity: 0.8; }
        100% { opacity: 0.5; }
    }

    @keyframes pulse-slow {
        0% { opacity: 0.3; }
        50% { opacity: 0.6; }
        100% { opacity: 0.3; }
    }

    @keyframes fade-in {
        from { opacity: 0; transform: translateY(5px); }
        to { opacity: 1; transform: translateY(0); }
    }

    :global(.animate-gradient) {
        animation: gradient 6s ease-in-out infinite;
    }

    :global(.animate-pulse-slow) {
        animation: pulse-slow 4s ease-in-out infinite;
    }

    :global(.animate-fade-in) {
        animation: fade-in 0.4s ease-out forwards;
    }

    :global(.animate-fade-in-delayed) {
        animation: fade-in 0.4s ease-out 0.1s forwards;
        opacity: 0;
    }
</style>