export const Routes = {
    dashboard: '/',
    login: '/login',
    logout: 'logout',
    register: '/register',
    forgotPassword: '/forgot-password',
    profileUpdate: '/profile-update',
    verifyEmail: '/verify-email',
    verifyLicense: 'verify-license',
    shop: {
        ...routesFactory('/shops'),
    },
    user: {
        ...routesFactory('users')
    },
};

function routesFactory(endpoint: string) {
    return {
        list: `${endpoint}`,
        create: `${endpoint}/create`,
        editWithoutLang: (slug: string, shop?: string) => {
            return shop
              ? `/${shop}${endpoint}/${slug}/edit`
              : `${endpoint}/${slug}/edit`
        },
        edit: (slug: string,language: string, shop?: string) => {
            return shop
                ? `/${language}/${shop}${endpoint}/${slug}/translate`
                : `${language}${endpoint}/${slug}/translate`;
        },
        translate: (slug: string, language: string, shop?: string) => {
            return shop
              ? `/${language}/${shop}${endpoint}/${slug}/translate`
              : `${language}${endpoint}/${slug}/translate`;
        },
        details: (slug: string) => `${endpoint}/${slug}`,
        editByIdWithoutLang: (id: string, shop?: string) => {
        return shop ? `/${shop}${endpoint}/${id}/edit` : `${endpoint}/${id}/edit`;
        },
    }
}

