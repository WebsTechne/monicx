import { PaymentFormInputs, paymentFormSchema } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";

export default function PaymentForm() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<PaymentFormInputs>({
        resolver: zodResolver(paymentFormSchema),
    });

    const handlePaymentForm: SubmitHandler<PaymentFormInputs> = () => {};

    return (
        <form
            className="flex max-w-full! flex-col gap-4 border-0!"
            onSubmit={handleSubmit(handlePaymentForm)}
        >
            {/* Name */}
            <div className="input-group max-w-full!">
                <label htmlFor="cardHolder" className="input-label">
                    Name on card
                </label>
                <Input
                    type="text"
                    {...register("cardHolder")}
                    className="input required"
                    id="cardHolder"
                    placeholder="John Doe"
                />
                {errors.cardHolder && (
                    <p className="input-error">{errors.cardHolder.message}</p>
                )}
            </div>

            {/* Email */}
            <div className="input-group max-w-full!">
                <label htmlFor="cardNumber" className="input-label">
                    Card number
                </label>
                <Input
                    type="text"
                    {...register("cardNumber")}
                    className="input required"
                    id="cardNumber"
                    placeholder="1234 5678 9012 3456"
                />
                {errors.cardNumber && (
                    <p className="input-error">{errors.cardNumber.message}</p>
                )}
            </div>

            <div className="flex flex-row items-start gap-5">
                {/* Expiration Date */}
                <div className="input-group max-w-full!">
                    <label htmlFor="expirationDate" className="input-label">
                        Expiration date
                    </label>
                    <Input
                        {...register("expirationDate")}
                        className="input required"
                        type="text"
                        id="expirationDate"
                        placeholder="01/27"
                        inputMode="tel"
                    />
                    {errors.expirationDate && (
                        <p className="input-error">
                            {errors.expirationDate.message}
                        </p>
                    )}
                </div>
                {/* CVV */}
                <div className="input-group max-w-full!">
                    <label htmlFor="cvv" className="input-label">
                        CVV
                    </label>
                    <Input
                        {...register("cvv")}
                        className="input required"
                        id="cvv"
                        placeholder="123"
                        inputMode="tel"
                    />
                    {errors.cvv && (
                        <p className="input-error">{errors.cvv.message}</p>
                    )}
                </div>
            </div>

            <div className="mt-1 flex items-center gap-2">
                <Image
                    src="/klarna.png"
                    alt="klarna"
                    width={50}
                    height={25}
                    className="rounded-md"
                />
                <Image
                    src="/cards.png"
                    alt="cards"
                    width={50}
                    height={25}
                    className="rounded-md"
                />
                <Image
                    src="/stripe.png"
                    alt="stripe"
                    width={50}
                    height={25}
                    className="rounded-md"
                />
            </div>

            <Button type="submit" className="w-full">
                Checkout <ShoppingCart />
            </Button>
        </form>
    );
}
