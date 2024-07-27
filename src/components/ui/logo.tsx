import Link from "@/components/ui/link";
import { siteSettings } from "@/settings/site.setting";
import Image from "next/image";
import cn from 'classnames';
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Logo: React.FC<React.AnchorHTMLAttributes<{}>> = ({
    className,
    ...props
}) => {

    const router = useRouter();
    const currentRoute = router.pathname;

    const [imageSize,setImageSize] = useState(true);

    useEffect(()=>{
        if(currentRoute.includes('login')) {
            setImageSize(false);
        }
    },[currentRoute]);

    return (
        <Link
            href={siteSettings?.logo?.href}
            className={cn('inline-flex items-center gap-3',className)}
        >
            {
                imageSize ? (
                    <span
                        className="relative overflow-hidden"
                        style={{
                            width: siteSettings.logo.width,
                            height: siteSettings.logo.height
                        }}
                    >
                        <Image
                            src={siteSettings.logo.url}
                            alt={siteSettings.logo.alt}
                            fill
                            sizes="(max-width: 768px) 100vw"
                            className="objext-contain"
                            loading="eager"
                            priority
                        />
                    </span>
                ) : (
                    <span
                        className="relative overflow-hidden"
                        style={{
                            width: siteSettings.collapseLogo.width,
                            height: siteSettings.collapseLogo.height
                        }}
                    >
                        <Image
                            src={siteSettings.collapseLogo.url}
                            alt={siteSettings.collapseLogo.alt}
                            fill
                            sizes="(max-width: 768px) 100vw"
                            className="objext-contain"
                            loading="eager"
                            priority
                        />
                    </span>
                )
            }
            
        </Link>
    )
}

export default Logo;