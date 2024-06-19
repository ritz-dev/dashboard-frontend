import { RESPONSIVE_WIDTH } from "@/utils/constants";
import { useWindowSize } from "react-use";
import { motion } from "framer-motion";
import cn from 'classnames';
import Logo from "@/components/ui/logo";
import { useState } from "react";
import { SearchIcon } from "@/components/icons/search-icon";
import AuthorizedMenu from "./authorized-menu";

const Navbar = () => {

    const { width } = useWindowSize();

    const [miniSidebar,setminiSidebar] =  useState<boolean>(false);

    const toggleSidebar = () => {
        setminiSidebar(!miniSidebar);
    }
    

    return (
        <header className="fixed top-0 z-40 w-full bg-white shadow">
            <div className="relative flex w-full flex-1 items-center">
                <nav className="flex items-center px-5 md:px-8">
                    <div className="flex items-center">
                        <motion.button
                            whileTap={{ scale: 0.38 }}
                            onClick ={()=> setminiSidebar(!miniSidebar)}
                            className="group flex h-5 w-5 shrink-0 cursor-pointer flex-col justify-center space-y-1 me-4 focus:text-accent focus:outline-none lg:hidden"
                        >   
                            <span className="h-0.5 w-full rounded-full bg-gray-600 group-hover:bg-accent" />
                            <span
                                className={cn(
                                    'h-0.5 rounded-full bg-gray-600 transition-[width] group-hover:bg-accent',
                                    miniSidebar ? 'w-full' :
                                    'w-2/4',
                                )}
                            />
                            <span className="h-0.5 w-full rounded-full bg-gray-600 group-hover:bg-accent" />
                        </motion.button>
                        <div
                            className={cn(
                                'flex items-center h-16 shrink-0 transition-[width] duration-300 me-4 lg:h-[76px] lg:border-solid lg:border-gray-200/80 lg:me-8 lg:border-e',
                                miniSidebar ? 'lg:w-[70px]' :
                                'lg:w-[257px]'
                            )}
                        >
                            <Logo />
                        </div>
                        <button
                            className="group hidden h-5 w-5 shrink-0 cursor-pointer flex-col justify-center space-y-1 me-6 lg:flex"
                            onClick={toggleSidebar}
                        >
                        <span
                            className={cn(
                            'h-0.5 rounded-full bg-gray-600 transition-[width] group-hover:bg-accent',
                            miniSidebar ? 'w-full' : 'w-2/4',
                            )}
                        />
                        <span className="h-0.5 w-full rounded-full bg-gray-600 group-hover:bg-accent" />
                        <span
                            className={cn(
                            'h-0.5 rounded-full bg-gray-600 transition-[width] group-hover:bg-accent',
                            miniSidebar ? 'w-full' : 'w-3/4',
                            )}
                        />
                        </button>
                         {/* <div
                            className="relative ml-auto mr-1.5 flex h-9 w-9 shrink-0 cursor-pointer item-center justify-center rounded-full border border-gray-200 bg-gray-50 py-4 text-gray-600 hover:border-transparent hover:border-gray-200 hover:bg-white hover:text-accent sm:mr-6 lg:hidden xl:hidden"
                            onClick={handleClick}
                        >
                            <SearchIcon className="h-4 w-4"/>
                        </div>
                        <div className="relative hidden w-full max-w-[710px] py-4 me-6 lg:block 2xl:me-auto">
                            <SearchBar />
                        </div> */}
                        <div className="fixed right-20">
                            <AuthorizedMenu/>
                        </div>
                    </div>
                   
                </nav>
            </div>
            
        </header>
    )
};

export default Navbar;