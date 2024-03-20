// imageUtils.ts
import fs from "fs";
import { join } from "path";

/**
 * Fungsi untuk menghapus gambar dari sistem penyimpanan.
 * @param {string} imagePath - Path gambar yang akan dihapus.
 * @returns {Promise<void>} - Promise yang menunjukkan apakah penghapusan berhasil atau tidak.
 */
export const deleteImage = async (imagePath: string): Promise<void> => {
    try {
        const fullPath = join(process.cwd(), "public", "property-pictures", imagePath);
        if (fs.existsSync(fullPath)) {
            await fs.promises.unlink(fullPath);
        }
    } catch (error) {
        throw error;
    }
};
