import { encode } from '@jsquash/webp';

/**
 * 压缩图片 - 如果宽度大于1000px，压缩到1000px，高度按比例调整
 * @param {File} file - 原始图片文件
 * @returns {Promise<File>} - 压缩后的图片文件
 */
export async function compressImage(file) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    
    img.onload = async () => {
      URL.revokeObjectURL(url);
      
      // 如果宽度小于等于1000px，直接返回原文件
      if (img.width <= 1000) {
        resolve(file);
        return;
      }
      
      // 计算新的高度（保持宽高比）
      const scaleFactor = 1000 / img.width;
      const newWidth = 1000;
      const newHeight = Math.round(img.height * scaleFactor);
      
      // 创建canvas进行压缩
      const canvas = document.createElement('canvas');
      canvas.width = newWidth;
      canvas.height = newHeight;
      
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, newWidth, newHeight);
      
      try {
        // 转换为blob
        canvas.toBlob(async (blob) => {
          const compressedFile = new File([blob], file.name, {
            type: 'image/jpeg',
            lastModified: Date.now()
          });
          resolve(compressedFile);
        }, 'image/jpeg', 0.95); // 95%质量
      } catch (error) {
        reject(error);
      }
    };
    
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('图片加载失败'));
    };
    
    img.src = url;
  });
}

/**
 * 将Blob转换为ImageData
 * @param {Blob} blob - 图片Blob对象
 * @returns {Promise<ImageData>} - ImageData对象
 */
export const blobToImageData = async (blob) => {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    let objectUrl = null;
    
    img.onload = () => {
      let { width, height } = img;
      
      // 如果图片宽度大于1080px，按比例缩放
      if (width > 1080) {
        const ratio = 1080 / width;
        width = 1080;
        height = Math.round(height * ratio);
      }
      
      canvas.width = width;
      canvas.height = height;
      
      // 绘制缩放后的图片
      ctx.drawImage(img, 0, 0, width, height);
      
      const imageData = ctx.getImageData(0, 0, width, height);
      
      // 清理内存
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
      }
      
      resolve(imageData);
    };
    
    img.onerror = () => {
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
      }
      reject(new Error('图片加载失败'));
    };
    
    objectUrl = URL.createObjectURL(blob);
    img.src = objectUrl;
  });
};

/**
 * 将图片转换为webp格式
 * @param {File} file - 原始图片文件
 * @returns {Promise<File>} - webp格式的图片文件
 */
export async function convertToWebp(file) {
  try {
    // 将File转换为Blob
    const blob = new Blob([file], { type: file.type });
    
    // 将Blob转换为ImageData
    const imageData = await blobToImageData(blob);
    
    // 使用jsquash转换为webp
    const webpBuffer = await encode(imageData, {
      quality: 95 // 95%质量
    });
    
    // 创建新的webp文件
    const webpFile = new File([webpBuffer],
      file.name.replace(/\.[^/.]+$/, '.webp'), // 替换扩展名为.webp
      {
        type: 'image/webp',
        lastModified: Date.now()
      }
    );
    
    return webpFile;
  } catch (error) {
    console.error('转换为webp失败:', error);
    throw error;
  }
}

/**
 * 添加水印到图片
 * @param {File} file - 原始图片文件
 * @param {string} watermarkPath - 水印图片路径
 * @returns {Promise<File>} - 添加水印后的图片文件
 */
export async function addWatermark(file, watermarkPath) {
  return new Promise((resolve, reject) => {
    const mainImg = new Image();
    const watermarkImg = new Image();
    
    const mainUrl = URL.createObjectURL(file);
    
    // 加载水印图片
    watermarkImg.onload = () => {
      // 加载主图片
      mainImg.onload = async () => {
        URL.revokeObjectURL(mainUrl);
        
        const canvas = document.createElement('canvas');
        canvas.width = mainImg.width;
        canvas.height = mainImg.height;
        
        const ctx = canvas.getContext('2d');
        
        // 绘制主图片
        ctx.drawImage(mainImg, 0, 0);
        
        // 使用固定水印尺寸：144px宽，30px高
        const watermarkWidth = 144;
        const watermarkHeight = 30;
        
        // 计算水印位置（右下角，留10px边距）
        const watermarkX = mainImg.width - watermarkWidth - 10;
        const watermarkY = mainImg.height - watermarkHeight - 10;
        
        // 绘制水印
        ctx.drawImage(
          watermarkImg,
          watermarkX,
          watermarkY,
          watermarkWidth,
          watermarkHeight
        );
        
        try {
          // 转换为blob
          canvas.toBlob(async (blob) => {
            const watermarkedFile = new File([blob], file.name, {
              type: file.type,
              lastModified: Date.now()
            });
            resolve(watermarkedFile);
          }, file.type || 'image/jpeg', 0.9);
        } catch (error) {
          reject(error);
        }
      };
      
      mainImg.onerror = () => {
        URL.revokeObjectURL(mainUrl);
        reject(new Error('主图片加载失败'));
      };
      
      mainImg.src = mainUrl;
    };
    
    watermarkImg.onerror = () => {
      URL.revokeObjectURL(mainUrl);
      reject(new Error('水印图片加载失败'));
    };
    
    watermarkImg.src = watermarkPath;
  });
}

/**
 * 处理图片的完整流程
 * @param {File} file - 原始图片文件
 * @param {boolean} needWatermark - 是否需要添加水印
 * @returns {Promise<File>} - 处理后的图片文件
 */
export async function processImage(file, needWatermark = false) {
  try {
    // 1. 压缩图片
    let processedFile = await compressImage(file);
    
    // 2. 转换为webp格式
    processedFile = await convertToWebp(processedFile);
    
    // 3. 如果需要，添加水印
    if (needWatermark) {
      processedFile = await addWatermark(processedFile, '/src/assets/logo.png');
    }
    
    return processedFile;
  } catch (error) {
    console.error('图片处理失败:', error);
    throw error;
  }
}