import { FormInput } from "../form-components/form-input";
import { WhiteBlock } from "../white-block";

type props = {
  className?: string;
};

export function CheckOutPersonal({className}: props) {
  return (
    <WhiteBlock title="2. Персональные данные">
    <div className="grid grid-cols-2 gap-5">
      <FormInput name="firstName"  placeholder="Введите имя" className="text-base" />
      <FormInput name="lastName"  placeholder="Введите фамилию" className="text-base" />
      <FormInput name="email"  placeholder="Введите email" className="text-base" />
      <FormInput name="phone"  placeholder="Введите телефон" className="text-base" />
    </div>
  </WhiteBlock>
  );
}