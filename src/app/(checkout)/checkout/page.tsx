"use client"
import { getCartItemsDetails } from "@/lib/get-cart-item-details";
import { CheckoutItem } from "@/src/shared/components/shared/checkout-item";
import { CheckoutSideBar } from "@/src/shared/components/shared/checkout-sidebar";
import { Container } from "@/src/shared/components/shared/containter";
import { FormInput } from "@/src/shared/components/shared/form-components/form-input";
import { Title } from "@/src/shared/components/shared/title";
import { WhiteBlock } from "@/src/shared/components/shared/white-block";
import { Input } from "@/src/shared/components/ui/input";
import { Textarea } from "@/src/shared/components/ui/textarea";
import { PizzaSizeType, PizzaTypeType } from "@/src/shared/constants/pizza";
import { useDataCart } from "@/src/shared/hooks/use-cart";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import { CheckOutCart } from "@/src/shared/components/shared/checkout/checkout-cart";
import { CheckOutPersonal } from "@/src/shared/components/shared/checkout/checkout-personal";
import { CheckOutAddress } from "@/src/shared/components/shared/checkout/checkout-address";
import { CheckoutFormSchema, checkoutFormSchema } from "@/src/shared/components/shared/checkout/schemas/checkout-form-schema";
import { createOrder } from "../../actions";
import toast from "react-hot-toast";
import { useState } from "react";
import { useRouter } from "next/navigation";
export default function Page() {
  const {cartState,onClickCountButton, onClickRemoveItem } = useDataCart()
  const [submmiting, setSubmmiting] = useState(false)
  const router = useRouter()

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
  const onSubmit =  async (data:CheckoutFormSchema) =>{
    try {
      setSubmmiting(true)
      await createOrder(data)
      // toast.success("Заказ оформлен! Переход на оплату...")

      router.push("/")
      toast.success("Заказ успешно оплачен!", {duration:3000})

    }catch (e) {
      console.log(e)

      setSubmmiting(false)
    }finally{
      setSubmmiting(false)
    }
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
                <CheckoutSideBar submmiting={submmiting} loading={cartState.loading} totalAmount={cartState.totalAmount} />
          </div>
        </div>
  
  
  </div>
</form>
</FormProvider>
  </Container>
  );
}