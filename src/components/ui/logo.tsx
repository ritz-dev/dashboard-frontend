import Link from "@/components/ui/link";
import { siteSettings } from "@/settings/site.setting";
import Image from "next/image";
import cn from 'classnames';

const Logo: React.FC<React.AnchorHTMLAttributes<{}>> = ({
    className,
    ...props
}) => {
    return (
        <Link
            href={siteSettings?.logo?.href}
            className={cn('inline-flex items-center gap-3',className)}
        >
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
                />
            </span>
        </Link>
    )
}

export default Logo;