import { Routes } from "@/config/routes";
import { adminOwnerAndStaffOnly } from "@/utils/auth-utils";

export const siteSettings = {
    name: 'Dashboard',
    description: '',
    logo: {
        url: '/logo.png',
        alt: 'logo',
        href: '/',
        width: 180,
        height: 90,
    },
    collapseLogo: {
        url: '/collapse-logo.png',
        alt: 'collapse-logo',
        href: '/',
        width: 80,
        height: 85,
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
          user: {
            href: '',
            label: 'user-management',
            icon: '',
            childMenu:[
              {
                href: '',
                label: 'Users',
                icon: 'AdminListIcon',
                childMenu: [
                  {
                    href: Routes.user.list,
                    label: 'All users',
                    icon: 'CustomersIcon',
                  },
                  {
                    href: Routes.user.create,
                    label: 'Add new user',
                    icon: 'CustomersIcon',
                  }
                ]
              },
              {
                href: Routes.role.list,
                label: 'All roles',
                icon: 'TypesIcon',
              },
            ]
          },
        }
    }
}