import { ContactClient } from '@/components/contact-client';

export const metadata = {
  title: '문의하기 - 테크 블로그',
  description: '테크 블로그 팀과 연락하세요. 여러분의 의견을 듣고 싶습니다!',
};

export default function ContactPage() {
  return <ContactClient />;
}