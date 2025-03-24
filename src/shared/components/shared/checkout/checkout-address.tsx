"use client"
import { Controller, useFormContext } from "react-hook-form";
import { Textarea } from "../../ui/textarea";
import { AdressInput } from "../address-input";
import { FormInput } from "../form-components/form-input";
import { FormTextarea } from "../form-components/form-textarea";
import { WhiteBlock } from "../white-block";
import { ErrorText } from "../error-text";

type props = {
  className?: string;
};

export function CheckOutAddress({className}: props) {
  const {control} = useFormContext()
  return (
            <WhiteBlock title="2. Адрес доставки">
              <div className="flex flex-col gap-5">
              <Controller
                control={control}
                name='address'
                render={({field, fieldState})=> (
                <>
                <AdressInput onChange={field.onChange} />
                {fieldState.error?.message && <ErrorText text={fieldState.error.message} className="mb-2" />}
                </>
            )}
                />
                <FormTextarea
                name="comment"
                  
                  rows={5}
                  className="text-base"
                  placeholder="комментарий к заказу"
                />
              </div>
            </WhiteBlock>
  );
}