import cn from 'classnames';
import { useWindowSize } from "react-use";
import { RESPONSIVE_WIDTH } from "@/utils/constants";
import { siteSettings } from "@/settings/site.setting";
import SidebarItem from '../navigation/sidebar-item';
import Navbar from '../navigation/top-navbar';
import Scrollbar from '@/components/ui/scrollbar';

interface MenuItemsProps {
    [key: string] : {
        href: string;
        label: string;
        icon: string;
        childMenu: {
            href: string;
            label: string;
            icon: string;
        }[];
    };
}

const SidebarItemMap = ({ menuItems }: any) => {
    const { childMenu } = menuItems;
    const { width } = useWindowSize();
    
    return (
        <div className="space-y-2">
            {childMenu?.map(
                ({
                    href,
                    label,
                    icon,
                    childMenu
                }: {
                    href: string;
                    label: string;
                    icon: string;
                    childMenu: any;
                }) => (
                    <SidebarItem
                        href={href}
                        key={label}
                        label={label}
                        icon={icon}
                        childMenu={childMenu}
                        // miniSidebar={miniSidebar && width >= RESPONSIVE_WIDTH}
                    />
                )
            )}
        </div>
    )
}

const SideBarGroup = () => {
    const menuItems: MenuItemsProps = siteSettings?.sidebarLinks?.admin;
    const menuKeys = Object.keys(menuItems);
    const { width } = useWindowSize();

    return (
        <>
            {
                menuKeys?.map((menu,index)=> (
                    <div
                        className={cn(
                            'flex flex-col px-5',
                            // miniSidebar && width >= RESPONSIVE_WIDTH
                                // ? 'border-b border-dashed border-gray-200 py-5' :
                                'pt-6 pb-3'
                        )}
                        key={index}
                    >
                        <div
                            className={cn(
                                'px-3 pb-5 text-xs font-semibold uppercase tracking-[0.05em] text-body/60',
                                // miniSidebar && width >= RESPONSIVE_WIDTH ? 'hidden' : 
                                ''
                            )}
                        >
                            { menuItems[menu]?.label }
                        </div>
                        <SidebarItemMap menuItems={menuItems[menu]} />
                    </div>
                )) 
            }
        </>
    )
}

const AdminLayout: React.FC<{ children?: React.ReactNode }> = ({
    children
}) => {

    const { width } = useWindowSize();

    return(
        <div className="flex min-h-screen flex-col bg-gray-100 transition-colors duration-150">
            <Navbar/>
            <div className="flex flex-1">
                <aside className={cn('fixed hidden bottom-0 left-0 z-10 h-full w-72 bg-white shadow transition-[width] duration-300 right-auto lg:block',
                    width >= RESPONSIVE_WIDTH && 
                    // (underMaintenance || underMaintenanceStart) ? 'lg:-pt-[8.75rem]':
                    'pt-20',
                    // miniSidebar && width >= RESPONSIVE_WIDTH ? 'lg:w-24' :
                    'lg:w-76'
                )}>
                    <div className="sidebar-scrollbar h-full w-full overflow-x-hidden">
                        <Scrollbar
                            className='w-full h-full'
                            options={{
                                scrollbars:{
                                    autoHide: 'never',
                                },
                            }}
                        >
                            <SideBarGroup />
                        </Scrollbar>
                    </div>
                </aside>
                <main
                    className={cn(
                        'relative flex w-full flex-col justify-start transition-[padding] duration-300',
                        // width >= RESPONSIVE_WIDTH && 
                        // (underMaintenance || underMaintenanceStart) ? 'lg:pt-[8.75rem]' :
                        'pt-20',
                        // miniSidebar && width >= RESPONSIVE_WIDTH ? 'lg:w-24' :
                        'lg:w-76',
                        // miniSidebar && width >= RESPONSIVE_WIDTH ? 'lg:pl-24 ' : 
                        'xl:pl-76 lg:pl-72'
                    )}
                >
                    <div className='h-full p-5 md:p-8'>
                        {children}
                    </div>
                </main>
            </div>
        </div>
    )
}

export default AdminLayout;