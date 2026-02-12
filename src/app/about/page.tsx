import Image from 'next/image';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Об авторе',
  description: 'Узнайте больше о Наталье Уваровой, логопеде-дефектологе с 30-летним стажем и авторе уникальной методики по запуску речи.',
};

export default function AboutPage() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-12">
      <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-3">
        <div className="relative h-64 w-64 justify-self-center overflow-hidden rounded-full md:h-80 md:w-80">
          <Image
            src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw0fHxwcm9mZXNzaW9uYWwlMjB3b21hbiUyMHBvcnRyYWl0fGVufDB8fHx8MTc3MTI4OTgxNnww&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Портрет Натальи Уваровой"
            fill
            className="object-cover"
            data-ai-hint="professional woman portrait"
          />
        </div>
        <div className="md:col-span-2">
          <h1 className="font-headline text-4xl font-bold tracking-tight md:text-5xl">
            Наталья Уварова
          </h1>
          <p className="mt-2 text-xl font-medium text-primary">
            Логопед-дефектолог, 30 лет опыта
          </p>
          <div className="prose prose-lg mt-6 max-w-none dark:prose-invert">
            <p>
              Наталья — ведущий специалист в области детской логопедии и дефектологии с более чем 30-летним опытом работы. За свою карьеру она помогла тысячам детей преодолеть трудности с речью и обрести уверенность в общении.
            </p>
            <p>
              Её авторская методика "18 шагов к уверенной речи" основана на глубоком понимании процессов развития ребенка и сочетает в себе классические подходы с инновационными игровыми техниками. Методика доказала свою эффективность в работе с различными речевыми нарушениями, включая задержку речевого развития (ЗРР), общее недоразвитие речи (ОНР) и дислалию.
            </p>
            <p>
              Наталья является автором многочисленных статей, постоянным спикером на профильных конференциях и создателем популярного мобильного приложения для развития речи. Её миссия — сделать профессиональную логопедическую помощь доступной для каждой семьи.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
