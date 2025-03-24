import { Textarea } from "../../ui/textarea";
import { AdressInput } from "../address-input";
import { FormInput } from "../form-components/form-input";
import { FormTextarea } from "../form-components/form-textarea";
import { WhiteBlock } from "../white-block";

type props = {
  className?: string;
};

export function CheckOutAddress({className}: props) {
  return (
            <WhiteBlock title="2. Адрес доставки">
              <div className="flex flex-col gap-5">
                <AdressInput  />
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