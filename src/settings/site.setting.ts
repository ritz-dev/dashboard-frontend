import { Routes } from "@/config/routes";
import { adminOwnerAndStaffOnly } from "@/utils/auth-utils";

export const siteSettings = {
    name: 'Dashboard',
    description: '',
    logo: {
        url: '/logo.png',
        alt: 'Dashboard',
        href: '/',
        width: 60,
        height: 60,
    },
    collapseLogo: {
        url: '/collapse-logo.svg',
        alt: 'P',
        href: '/',
        width: 32,
        height: 32,
    },
    avatar: {
      placeholder: '/avatar-placeholder.svg',
    },
    defaultLanguage: 'en',
    author:{
        name: 'RITZ, Inc.',
        websiteUrl: 'http://redq.io',
        address: '',
    },
    authorizedLinks: [
      {
        href: Routes.profileUpdate,
        labelTransKey: 'Profile',
        icon: 'UserIcon',
        permission: adminOwnerAndStaffOnly,
      },
      {
        href: Routes.logout,
        labelTransKey: 'Logout',
        icon: 'LogOutIcon',
        permission: adminOwnerAndStaffOnly,
      }
    ],
    headerLinks: [],
    currencyCode: 'USD',
    sidebarLinks: {
        admin: {
          root: {
            href: Routes.dashboard,
            label: 'Main',
            icon: 'DashboardIcon',
              childMenu: [
                {
                  href: Routes.dashboard,
                  label: 'Dashboard',
                  icon: 'DashboardIcon'
                }
              ]
          },
          shop: {
            href: '',
            label: 'shop-management',
            icon: 'ShopIcon',
            childMenu: [
              {
                href: '',
                label: 'Item-shops',
                icon: 'ShopIcon',
                childMenu: [
                  {
                    href: Routes.shop.list,
                    label: 'All-shops',
                    icon: 'MyShopIcon',
                  },
                  {
                    href: Routes.shop.create,
                    label: 'Add-all-shops',
                    icon: 'ShopIcon',
                  },
                ],
              },
            ],
          },
        
        }
    }
}