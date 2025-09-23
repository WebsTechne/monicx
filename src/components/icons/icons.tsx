import { FC, SVGProps, useId } from "react";

type SVGIconProps = SVGProps<SVGSVGElement> & {
    size?: number;
    strokeWidth?: number;
    isFill?: boolean;
    fill?: string;
};

export const ChatIcon: React.FC<SVGIconProps> = ({
    size = 24,
    strokeWidth = 1.5,
    stroke = "currentColor",
    isFill = false,
    fill,
    ...props
}) => {
    const fillColor = fill ?? stroke ?? "currentColor";

    if (!isFill) {
        return (
            <svg
                width={size}
                height={size}
                viewBox="0 0 25 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                {...props}
            >
                <path
                    d="M12 1C18.0751 1 23 5.92487 23 12C23 18.0751 18.0751 23 12 23H5.25C2.90279 23 1 21.0972 1 18.75V12C1 5.92487 5.92487 1 12 1Z"
                    stroke={stroke}
                    strokeWidth={strokeWidth}
                />
                <circle cx="6" cy="12" r={strokeWidth} fill={stroke} />
                <circle cx="12" cy="12" r={strokeWidth} fill={stroke} />
                <circle cx="18" cy="12" r={strokeWidth} fill={stroke} />
            </svg>
        );
    }
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                d="M12 0.429688C18.6274 0.429688 24 5.80227 24 12.4297C24 19.0571 18.6274 24.4297 12 24.4297H5.25C2.35051 24.4297 0 22.0792 0 19.1797V12.1846C0.000118543 5.69258 5.26289 0.429806 11.7549 0.429688H12ZM6 10.4297C4.89543 10.4297 4 11.3251 4 12.4297C4 13.5343 4.89543 14.4297 6 14.4297C7.10457 14.4297 8 13.5343 8 12.4297C8 11.3251 7.10457 10.4297 6 10.4297ZM12 10.4297C10.8954 10.4297 10 11.3251 10 12.4297C10 13.5343 10.8954 14.4297 12 14.4297C13.1046 14.4297 14 13.5343 14 12.4297C14 11.3251 13.1046 10.4297 12 10.4297ZM18 10.4297C16.8954 10.4297 16 11.3251 16 12.4297C16 13.5343 16.8954 14.4297 18 14.4297C19.1046 14.4297 20 13.5343 20 12.4297C20 11.3251 19.1046 10.4297 18 10.4297Z"
                fill={fillColor}
            />
        </svg>
    );
};
