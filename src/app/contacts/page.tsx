import type { Metadata } from 'next';
import { Mail, Phone } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'Контакты',
  description: 'Свяжитесь с нами для получения дополнительной информации о курсах, консультациях или приложении.',
};

export default function ContactsPage() {
  return (
    <div className="container mx-auto max-w-2xl px-4 py-12">
      <div className="mb-12 flex flex-col items-center text-center">
        <h1 className="font-headline text-4xl font-bold tracking-tight md:text-5xl">
          Свяжитесь с нами
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
          Мы всегда рады ответить на ваши вопросы.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Контактная информация</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <Mail className="h-6 w-6 text-primary" />
            <a href="mailto:info@speechace.com" className="text-lg hover:underline">
              info@speechace.com
            </a>
          </div>
          <div className="flex items-center gap-4">
            <Phone className="h-6 w-6 text-primary" />
            <span className="text-lg">+7 (999) 123-45-67</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
