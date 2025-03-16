interface ConversionResult {
    blob: Blob;
    url: string;
}

type ImageFormat = 'image/jpeg' | 'image/png' | 'image/webp' | 'image/gif';

export const supportedFormats = {
    PNG: 'image/png',
    JPEG: 'image/jpeg',
    WEBP: 'image/webp',
    GIF: 'image/gif'
} as const;

function createCanvasContext(width: number, height: number, targetFormat: ImageFormat) {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d', { alpha: targetFormat !== 'image/jpeg' });
    return { canvas, ctx };
}

function drawImageOnCanvas(ctx: CanvasRenderingContext2D, img: HTMLImageElement, targetFormat: ImageFormat) {
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    if (targetFormat === 'image/jpeg') {
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    }

    ctx.drawImage(img, 0, 0);
}

function canvasToBlob(canvas: HTMLCanvasElement, targetFormat: ImageFormat, quality: number | undefined): Promise<Blob> {
    return new Promise((resolve, reject) => {
        canvas.toBlob((blob) => {
            if (blob) {
                resolve(blob);
            } else {
                reject(new Error('Blob creation failed'));
            }
        }, targetFormat, quality);
    });
}

async function convertImage(file: File, targetFormat: ImageFormat, quality: number = 1.0): Promise<ConversionResult> {
    return new Promise((resolve, reject) => {
        const img = new Image();

        img.onload = async () => {
            const { canvas, ctx } = createCanvasContext(img.width, img.height, targetFormat);

            if (!ctx) {
                reject(new Error('Could not get canvas context'));
                return;
            }

            drawImageOnCanvas(ctx, img, targetFormat);

            const conversionQuality = targetFormat === 'image/png' || targetFormat === 'image/gif' ? undefined : quality;

            try {
                const blob = await canvasToBlob(canvas, targetFormat, conversionQuality);
                const url = URL.createObjectURL(blob);
                URL.revokeObjectURL(img.src);
                resolve({ blob, url });
            } catch (error) {
                reject(error);
            }
        };

        img.onerror = () => {
            reject(new Error('Failed to load image'));
        };

        img.src = URL.createObjectURL(file);
    });
}

export async function convertToPng(file: File): Promise<ConversionResult> {
    if (file.type === 'image/png') {
        throw new Error('File is already in PNG format');
    }
    return convertImage(file, 'image/png');
}

export async function convertToJpeg(file: File): Promise<ConversionResult> {
    if (file.type === 'image/jpeg') {
        throw new Error('File is already in JPEG format');
    }
    return convertImage(file, 'image/jpeg');
}

export async function convertToWebp(file: File): Promise<ConversionResult> {
    if (file.type === 'image/webp') {
        throw new Error('File is already in WebP format');
    }
    return convertImage(file, 'image/webp');
}

export async function convertToGif(file: File): Promise<ConversionResult> {
    if (file.type === 'image/gif') {
        throw new Error('File is already in GIF format');
    }
    return convertImage(file, 'image/gif');
}

export function getFileExtension(format: ImageFormat): string {
    return format.split('/')[1] === 'jpeg' ? 'jpg' : format.split('/')[1];
}

export interface BatchConversionResult {
    originalName: string;
    convertedUrl: string;
    success: boolean;
    error?: string;
}

export async function convertMultipleImages(files: File[], targetFormat: ImageFormat, onProgress?: (progress: number) => void): Promise<BatchConversionResult[]> {
    const results: BatchConversionResult[] = [];

    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const progress = ((i + 1) / files.length) * 100;

        try {
            if (!file.type.startsWith('image/')) {
                throw new Error('Not an image file');
            }

            if (file.type === targetFormat) {
                throw new Error(`File is already in ${targetFormat.split('/')[1].toUpperCase()} format`);
            }

            const result = await convertImage(file, targetFormat);
            results.push({
                originalName: file.name,
                convertedUrl: result.url,
                success: true
            });
        } catch (error) {
            results.push({
                originalName: file.name,
                convertedUrl: '',
                success: false,
                error: error instanceof Error ? error.message : 'Conversion failed'
            });
        } finally {
            if (onProgress) {
                onProgress(progress);
            }
        }
    }

    return results;
}