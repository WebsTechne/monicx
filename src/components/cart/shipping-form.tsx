import { ShippingFormInputs, shippingFormSchema } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import type { Resolver, SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";

export default function ShippingForm({
    setShippingForm,
}: {
    setShippingForm: (data: ShippingFormInputs) => void;
}) {
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ShippingFormInputs>({
        resolver: zodResolver(
            shippingFormSchema,
        ) as Resolver<ShippingFormInputs>,
        defaultValues: {
            country: "Nigeria",
        },
    });

    const handleShippingForm: SubmitHandler<ShippingFormInputs> = async (
        data,
    ) => {
        // save form data first
        setShippingForm(data);

        // wait for navigation to complete to avoid race conditions / unmounted state updates
        try {
            await router.push("/cart?step=3");
        } catch (err) {
            console.error("Navigation failed after shipping form submit:", err);
        }
    };

    return (
        <form
            className="flex max-w-full! flex-col gap-4 border-0!"
            onSubmit={handleSubmit(handleShippingForm)}
        >
            {/* Name */}
            <div className="input-group max-w-full!">
                <label htmlFor="name" className="input-label">
                    Full name
                </label>
                <Input
                    {...register("name")}
                    className="input required"
                    id="name"
                    placeholder="John Doe"
                />
                {errors.name && (
                    <p className="input-error">{errors.name.message}</p>
                )}
            </div>

            {/* Email */}
            <div className="input-group max-w-full!">
                <label htmlFor="email" className="input-label">
                    Email
                </label>
                <Input
                    {...register("email")}
                    className="input required"
                    id="email"
                    placeholder="john.doe@example.com"
                />
                {errors.email && (
                    <p className="input-error">{errors.email.message}</p>
                )}
            </div>

            {/* Phone */}
            <div className="input-group max-w-full!">
                <label htmlFor="phone" className="input-label">
                    Phone
                </label>
                <Input
                    {...register("phone")}
                    className="input required"
                    type="tel"
                    id="phone"
                    placeholder="+234 801 234 5678"
                    inputMode="tel"
                />
                {errors.phone && (
                    <p className="input-error">{errors.phone.message}</p>
                )}
            </div>

            {/* Address */}
            <div className="input-group max-w-full!">
                <label htmlFor="address" className="input-label">
                    Address
                </label>
                <Input
                    {...register("address")}
                    className="input required"
                    id="address"
                    placeholder="123 Main St, Sometown"
                />
                {errors.address && (
                    <p className="input-error">{errors.address.message}</p>
                )}
            </div>

            {/* City */}
            <div className="input-group max-w-full!">
                <label htmlFor="city" className="input-label">
                    City
                </label>
                <Input
                    {...register("city")}
                    className="input required"
                    id="city"
                    placeholder="Benin City"
                />
                {errors.city && (
                    <p className="input-error">{errors.city.message}</p>
                )}
            </div>

            {/* Country */}
            <div className="input-group max-w-full!">
                <label htmlFor="country" className="input-label">
                    Country
                </label>
                <Input
                    {...register("country")}
                    className="input"
                    id="country"
                    placeholder="Country"
                />
                {errors.country && (
                    <p className="input-error">{errors.country.message}</p>
                )}
            </div>

            {/* State / Region — now a simple input (works for every country) */}
            <div className="input-group max-w-full!">
                <label htmlFor="state" className="input-label">
                    State / Region
                </label>
                <Input
                    {...register("state")}
                    className="input required"
                    id="state"
                    placeholder="State or region"
                />
                {errors.state && (
                    <p className="input-error">{errors.state.message}</p>
                )}
            </div>

            {/* Postal Code (optional) */}
            <div className="input-group max-w-full!">
                <label htmlFor="postalCode" className="input-label">
                    Postal Code (optional)
                </label>
                <Input
                    {...register("postalCode")}
                    className="input"
                    id="postalCode"
                    placeholder="Postal code"
                />
                {errors.postalCode && (
                    <p className="input-error">{errors.postalCode.message}</p>
                )}
            </div>

            <Button type="submit" className="w-full">
                Continue <ArrowRight />
            </Button>
        </form>
    );
}
