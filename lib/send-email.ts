import { PayOrderTemplate } from "@/src/shared/components/shared/email-temapltes/pay-order";
import { Resend } from "resend";

export const sendEmail =async (subject:string, react:any)=>{
    const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_KEY);
    const { data, error } = await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: ['denolinevichd@inbox.ru'],
        subject,
        text:"",
        react,
      });
      return data
}