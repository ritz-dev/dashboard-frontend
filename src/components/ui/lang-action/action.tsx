import ActionButtons from '@/components/common/action-buttons';
import { Config } from '@/config';
// import LanguageAction from './language-switcher';
import { useRouter } from 'next/router';
import { CheckMarkCircle } from '@/components/icons/checkmark-circle';
import { CloseFillIcon } from '@/components/icons/close-fill';
// import { useModalAction } from '../modal/modal.context';

export type LanguageSwitcherProps = {
  record: any;
  slug: string;
  deleteModalView?: string | any;
  routes: any;
  className?: string | undefined;
  enablePreviewMode?: boolean;
  isShop?: boolean;
  shopSlug?: string;
  couponApproveButton?: boolean;
  isCouponApprove?: boolean;
};

export default function LanguageSwitcher({
  record,
  slug,
  deleteModalView,
  routes,
  className,
  enablePreviewMode,
  isShop,
  shopSlug,
  couponApproveButton,
  isCouponApprove,
}: LanguageSwitcherProps) {
  const { enableMultiLang } = Config;
  const {
    query: { shop },
  } = useRouter();

  return (
    <>
      {enableMultiLang ? (
        // <LanguageAction
        //   slug={slug}
        //   record={record}
        //   deleteModalView={deleteModalView}
        //   routes={routes}
        //   className={className}
        //   enablePreviewMode={enablePreviewMode}
        //   isShop={isShop}
        //   shopSlug={shopSlug}
        //   couponApproveButton={couponApproveButton}
        //   isCouponApprove={isCouponApprove}
        // />
        null
      ) : (
        <ActionButtons
          id={record?.id}
          editUrl={routes.editWithoutLang(slug, shop)}
          enablePreviewMode={enablePreviewMode}
          deleteModalView={deleteModalView}
        //   previewUrl={preview}
        //   couponApproveButton={couponApproveButton}
        //   isCouponApprove={isCouponApprove}
        />
      )}
    </>
  );
}
