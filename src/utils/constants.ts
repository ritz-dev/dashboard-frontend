
export const SUPER_ADMIN = 'super_admin';
export const STORE_OWNER = 'store_owner';
export const STAFF = 'staff';
export const TOKEN = 'token';
export const AUTH_CRED = 'AUTH_CRED';
export const EMail_VERIFIED = 'emailVerified';
export const PERMISSIONS = 'permissions';
export const RESPONSIVE_WIDTH = 1024 as number;


export const phoneRegExp =
  /^\+?((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
export const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

export const ACCEPTED_FILE_TYPES = {
    'image/jpeg': [],
    'image/png': [],
    'application/pdf': [],
    'application/zip': [],
    'application/vnd.rar': [],
    'application/epub+zip': [],
    '.psd': [],
};

export const ACCEPTED_IMAGE_TYPES = {
    'image/jpeg': [],
    'image/png': [],
    'image/gif': [],      // You might want to include other common image types like GIF
    'image/webp': [],     // And WebP
    'image/bmp': [],      // And BMP
    'image/tiff': [],     // And TIFF
};

export const imageUrlRegExp = /\.(jpg|jpeg|png|gif|bmp|webp)$/i;