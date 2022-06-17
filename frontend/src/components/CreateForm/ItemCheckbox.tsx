import React, { memo } from "react";
import { MdClose } from "react-icons/md";
import { useTranslations } from "next-intl";

interface IITemCheckbox {
  inputProps: React.InputHTMLAttributes<HTMLInputElement>;
  onDelete: React.MouseEventHandler<HTMLButtonElement>;
}

const ItemCheckbox = ({ inputProps, onDelete }: IITemCheckbox) => {
  const t = useTranslations();
  return (
    <div className="flex gap-x-2 items-center">
      <div className="h-6 w-6 border-2" />
      <input
        className="input--inline bg-transparent text-2xl font-medium  border-b border-dotted border-white border-opacity-20 p-2 relative transition-colors"
        autoComplete="off"
        {...inputProps}
      />
      <button className="button--icon" title={t("removeOption")} onClick={onDelete}>
        <span className="sr-only">{t("removeOption")}</span>
        <MdClose />
      </button>
    </div>
  );
};

export default memo(ItemCheckbox);