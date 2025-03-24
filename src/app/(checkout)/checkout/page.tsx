"use client"
import { CheckoutSideBar } from "@/src/shared/components/shared/checkout-sidebar";
import { Container } from "@/src/shared/components/shared/containter";
import { Title } from "@/src/shared/components/shared/title";
import { useDataCart } from "@/src/shared/hooks/use-cart";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import { CheckOutCart } from "@/src/shared/components/shared/checkout/checkout-cart";
import { CheckOutPersonal } from "@/src/shared/components/shared/checkout/checkout-personal";
import { CheckOutAddress } from "@/src/shared/components/shared/checkout/checkout-address";
import { CheckoutFormSchema, checkoutFormSchema } from "@/src/shared/components/shared/checkout/schemas/checkout-form-schema";
import toast from "react-hot-toast";
export default function Page() {
  const {cartState,onClickCountButton, onClickRemoveItem } = useDataCart()

  const form = useForm<CheckoutFormSchema>({
    resolver: zodResolver(checkoutFormSchema),
    mode: 'onChange',
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: '',
      comment: '',
    },
  })
  const onSubmit =  (data:CheckoutFormSchema) =>{
    console.log(data)
    toast.success("Заказ оформлен! Переход на оплату...")
  }
  
  return (
  <Container>
      <Title text="Оформить заказ" size="lg" className="font-extrabold mt-10"/>

  <FormProvider {...form}>
<form onSubmit={form.handleSubmit(onSubmit)}>
  <div className="flex gap-10">
        {/* контент слева */}
          <div className="flex flex-col gap-12 flex-1 mb-20">
              <CheckOutCart cartState={cartState} onClickCountButton={onClickCountButton} onClickRemoveItem={onClickRemoveItem} />
  
              <CheckOutPersonal/>
              <CheckOutAddress/>
          </div>
        {/* контент справа */}
        <div className="">
  
          <div className="w-[450px] ">
                <CheckoutSideBar loading={cartState.loading} totalAmount={cartState.totalAmount} />
          </div>
        </div>
  
  
  </div>
</form>
</FormProvider>
  </Container>
  );
}