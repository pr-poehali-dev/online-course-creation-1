import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

interface Course {
  id: string;
  title: string;
  description: string;
  category: string;
  level: string;
  duration: string;
  image: string;
  lessons: number;
  students: number;
}

interface Lesson {
  id: string;
  title: string;
  type: 'video' | 'quiz' | 'practice';
  completed: boolean;
}

const courses: Course[] = [
  {
    id: '1',
    title: 'Основы веб-разработки',
    description: 'Изучите HTML, CSS и JavaScript с нуля до профессионального уровня',
    category: 'Программирование',
    level: 'Начальный',
    duration: '8 недель',
    image: 'https://cdn.poehali.dev/projects/74d0a78e-663c-4131-924d-bc09dd9213df/files/1a512ce1-4617-47c8-921d-0c8f13b51aec.jpg',
    lessons: 42,
    students: 1234
  },
  {
    id: '2',
    title: 'UI/UX дизайн для начинающих',
    description: 'Освойте принципы создания современных интерфейсов',
    category: 'Дизайн',
    level: 'Начальный',
    duration: '6 недель',
    image: 'https://cdn.poehali.dev/projects/74d0a78e-663c-4131-924d-bc09dd9213df/files/8e736bdb-2962-4213-ac4b-eda32b835dc3.jpg',
    lessons: 28,
    students: 856
  },
  {
    id: '3',
    title: 'React и современный фронтенд',
    description: 'Продвинутая разработка с использованием React, TypeScript и Next.js',
    category: 'Программирование',
    level: 'Продвинутый',
    duration: '10 недель',
    image: 'https://cdn.poehali.dev/projects/74d0a78e-663c-4131-924d-bc09dd9213df/files/1a512ce1-4617-47c8-921d-0c8f13b51aec.jpg',
    lessons: 56,
    students: 542
  }
];

const courseLessons: Lesson[] = [
  { id: '1', title: 'Введение в курс', type: 'video', completed: true },
  { id: '2', title: 'Первое задание', type: 'quiz', completed: true },
  { id: '3', title: 'Практика: создание компонента', type: 'practice', completed: false },
  { id: '4', title: 'Тестирование знаний', type: 'quiz', completed: false }
];

const quizQuestions = [
  {
    id: 'q1',
    question: 'Какой тег используется для создания заголовка первого уровня?',
    options: ['<h1>', '<header>', '<head>', '<title>'],
    correct: '<h1>'
  },
  {
    id: 'q2',
    question: 'Что означает CSS?',
    options: [
      'Computer Style Sheets',
      'Cascading Style Sheets',
      'Creative Style System',
      'Colorful Style Sheets'
    ],
    correct: 'Cascading Style Sheets'
  }
];

const Index = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [currentLesson, setCurrentLesson] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const { toast } = useToast();

  const handleCourseSelect = (course: Course) => {
    setSelectedCourse(course);
    setActiveTab('course');
  };

  const handleSubmitQuiz = () => {
    const correctAnswers = quizQuestions.filter(
      q => answers[q.id] === q.correct
    ).length;
    const score = (correctAnswers / quizQuestions.length) * 100;
    
    setQuizSubmitted(true);
    toast({
      title: 'Тест завершен!',
      description: `Вы набрали ${score}% правильных ответов`,
      variant: score >= 70 ? 'default' : 'destructive'
    });
  };

  const completedLessons = courseLessons.filter(l => l.completed).length;
  const progressPercent = (completedLessons / courseLessons.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
      <nav className="border-b bg-card/50 backdrop-blur-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <Icon name="GraduationCap" className="text-white" size={24} />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              EduPlatform
            </span>
          </div>
          
          <div className="hidden md:flex gap-6">
            <Button variant="ghost" onClick={() => setActiveTab('home')}>
              Главная
            </Button>
            <Button variant="ghost" onClick={() => setActiveTab('courses')}>
              Каталог
            </Button>
            <Button variant="ghost" onClick={() => setActiveTab('profile')}>
              Профиль
            </Button>
          </div>

          <Button className="bg-gradient-to-r from-primary to-accent hover:opacity-90">
            <Icon name="User" size={18} className="mr-2" />
            Войти
          </Button>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-12">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsContent value="home" className="space-y-12 animate-fade-in">
            <section className="grid md:grid-cols-2 gap-12 items-center py-12">
              <div className="space-y-6 animate-slide-up">
                <Badge className="bg-gradient-to-r from-primary to-accent text-white">
                  🚀 Новая эра обучения
                </Badge>
                <h1 className="text-5xl md:text-7xl font-extrabold leading-tight">
                  Учитесь в удобном{' '}
                  <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
                    темпе
                  </span>
                </h1>
                <p className="text-xl text-muted-foreground">
                  Интерактивные курсы с проверкой заданий, персональным прогрессом и сертификатами
                </p>
                <div className="flex gap-4">
                  <Button 
                    size="lg" 
                    className="bg-gradient-to-r from-primary to-accent hover:opacity-90 text-lg"
                    onClick={() => setActiveTab('courses')}
                  >
                    <Icon name="PlayCircle" size={20} className="mr-2" />
                    Начать обучение
                  </Button>
                  <Button size="lg" variant="outline">
                    <Icon name="Info" size={20} className="mr-2" />
                    Узнать больше
                  </Button>
                </div>
              </div>
              
              <div className="relative animate-scale-in">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 blur-3xl" />
                <img 
                  src="https://cdn.poehali.dev/projects/74d0a78e-663c-4131-924d-bc09dd9213df/files/4d12f893-0c02-4bad-9384-8868edc3332f.jpg"
                  alt="Education"
                  className="relative rounded-3xl shadow-2xl"
                />
              </div>
            </section>

            <section className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { icon: 'BookOpen', label: '150+ курсов', value: '150+' },
                { icon: 'Users', label: 'студентов', value: '25K+' },
                { icon: 'Award', label: 'сертификатов', value: '10K+' },
                { icon: 'Star', label: 'средний рейтинг', value: '4.9' }
              ].map((stat, i) => (
                <Card key={i} className="text-center hover:scale-105 transition-transform duration-300 border-2 animate-slide-up" style={{ animationDelay: `${i * 100}ms` }}>
                  <CardHeader>
                    <div className="w-12 h-12 mx-auto rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-2">
                      <Icon name={stat.icon as any} className="text-primary" size={24} />
                    </div>
                    <CardTitle className="text-3xl font-bold">{stat.value}</CardTitle>
                    <CardDescription>{stat.label}</CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </section>

            <section className="space-y-6">
              <div className="text-center space-y-3">
                <h2 className="text-4xl font-bold">Популярные курсы</h2>
                <p className="text-muted-foreground text-lg">Выберите направление и начните учиться прямо сейчас</p>
              </div>
              
              <div className="grid md:grid-cols-3 gap-6">
                {courses.map((course, i) => (
                  <Card 
                    key={course.id} 
                    className="overflow-hidden hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer group animate-slide-up border-2"
                    style={{ animationDelay: `${i * 150}ms` }}
                    onClick={() => handleCourseSelect(course)}
                  >
                    <div className="relative overflow-hidden">
                      <img 
                        src={course.image} 
                        alt={course.title}
                        className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <Badge className="absolute top-4 right-4 bg-gradient-to-r from-primary to-accent text-white">
                        {course.category}
                      </Badge>
                    </div>
                    <CardHeader>
                      <CardTitle className="text-xl group-hover:text-primary transition-colors">
                        {course.title}
                      </CardTitle>
                      <CardDescription>{course.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Icon name="Clock" size={16} />
                          {course.duration}
                        </span>
                        <span className="flex items-center gap-1">
                          <Icon name="BookOpen" size={16} />
                          {course.lessons} уроков
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground flex items-center gap-1">
                          <Icon name="Users" size={16} />
                          {course.students} студентов
                        </span>
                        <Badge variant="outline">{course.level}</Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          </TabsContent>

          <TabsContent value="courses" className="animate-fade-in">
            <div className="text-center space-y-6 mb-12">
              <h1 className="text-5xl font-bold">Каталог курсов</h1>
              <p className="text-xl text-muted-foreground">Все направления обучения в одном месте</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              {courses.map(course => (
                <Card 
                  key={course.id} 
                  className="overflow-hidden hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer group border-2"
                  onClick={() => handleCourseSelect(course)}
                >
                  <div className="relative overflow-hidden">
                    <img 
                      src={course.image} 
                      alt={course.title}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <Badge className="absolute top-4 right-4 bg-gradient-to-r from-primary to-accent text-white">
                      {course.category}
                    </Badge>
                  </div>
                  <CardHeader>
                    <CardTitle className="text-xl group-hover:text-primary transition-colors">
                      {course.title}
                    </CardTitle>
                    <CardDescription>{course.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Icon name="Clock" size={16} />
                        {course.duration}
                      </span>
                      <span className="flex items-center gap-1">
                        <Icon name="BookOpen" size={16} />
                        {course.lessons} уроков
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="course" className="space-y-6 animate-fade-in">
            {selectedCourse && (
              <>
                <Button 
                  variant="ghost" 
                  onClick={() => setActiveTab('courses')}
                  className="mb-4"
                >
                  <Icon name="ArrowLeft" size={18} className="mr-2" />
                  Назад к курсам
                </Button>

                <div className="grid md:grid-cols-3 gap-6">
                  <div className="md:col-span-2 space-y-6">
                    <Card className="border-2">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div>
                            <Badge className="mb-3 bg-gradient-to-r from-primary to-accent text-white">
                              {selectedCourse.category}
                            </Badge>
                            <CardTitle className="text-3xl mb-2">{selectedCourse.title}</CardTitle>
                            <CardDescription className="text-base">{selectedCourse.description}</CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div className="aspect-video bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl flex items-center justify-center">
                          <Icon name="Play" size={64} className="text-primary" />
                        </div>

                        <div className="space-y-4">
                          <h3 className="text-xl font-semibold">Интерактивное задание</h3>
                          <Card className="bg-muted/50 border-2">
                            <CardHeader>
                              <CardTitle className="text-lg">Тест: Проверьте свои знания</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                              {quizQuestions.map((q, index) => (
                                <div key={q.id} className="space-y-3">
                                  <Label className="text-base font-semibold">
                                    {index + 1}. {q.question}
                                  </Label>
                                  <RadioGroup
                                    value={answers[q.id]}
                                    onValueChange={(value) => setAnswers({ ...answers, [q.id]: value })}
                                    disabled={quizSubmitted}
                                  >
                                    {q.options.map(option => (
                                      <div key={option} className="flex items-center space-x-2">
                                        <RadioGroupItem value={option} id={`${q.id}-${option}`} />
                                        <Label 
                                          htmlFor={`${q.id}-${option}`}
                                          className={`cursor-pointer ${
                                            quizSubmitted && option === q.correct 
                                              ? 'text-green-600 font-semibold' 
                                              : quizSubmitted && answers[q.id] === option && option !== q.correct
                                              ? 'text-red-600'
                                              : ''
                                          }`}
                                        >
                                          {option}
                                        </Label>
                                      </div>
                                    ))}
                                  </RadioGroup>
                                </div>
                              ))}

                              {!quizSubmitted ? (
                                <Button 
                                  onClick={handleSubmitQuiz}
                                  disabled={Object.keys(answers).length < quizQuestions.length}
                                  className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90"
                                >
                                  Проверить ответы
                                </Button>
                              ) : (
                                <Button 
                                  onClick={() => {
                                    setAnswers({});
                                    setQuizSubmitted(false);
                                  }}
                                  variant="outline"
                                  className="w-full"
                                >
                                  Попробовать снова
                                </Button>
                              )}
                            </CardContent>
                          </Card>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="space-y-6">
                    <Card className="border-2">
                      <CardHeader>
                        <CardTitle>Ваш прогресс</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Завершено уроков</span>
                            <span className="font-semibold">{completedLessons}/{courseLessons.length}</span>
                          </div>
                          <Progress value={progressPercent} className="h-3" />
                          <p className="text-xs text-muted-foreground text-right">{Math.round(progressPercent)}%</p>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div className="p-3 rounded-lg bg-primary/10 text-center">
                            <Icon name="Award" className="mx-auto mb-1 text-primary" size={24} />
                            <p className="text-xs text-muted-foreground">Баллов</p>
                            <p className="text-xl font-bold">250</p>
                          </div>
                          <div className="p-3 rounded-lg bg-accent/10 text-center">
                            <Icon name="Flame" className="mx-auto mb-1 text-accent" size={24} />
                            <p className="text-xs text-muted-foreground">Дней подряд</p>
                            <p className="text-xl font-bold">7</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border-2">
                      <CardHeader>
                        <CardTitle>Уроки курса</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        {courseLessons.map((lesson, index) => (
                          <div
                            key={lesson.id}
                            className={`p-3 rounded-lg border-2 flex items-center gap-3 cursor-pointer transition-all hover:border-primary ${
                              currentLesson === index ? 'bg-primary/10 border-primary' : ''
                            }`}
                            onClick={() => setCurrentLesson(index)}
                          >
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                              lesson.completed 
                                ? 'bg-green-500 text-white' 
                                : 'bg-muted text-muted-foreground'
                            }`}>
                              {lesson.completed ? (
                                <Icon name="Check" size={16} />
                              ) : (
                                <Icon name={lesson.type === 'video' ? 'Play' : lesson.type === 'quiz' ? 'FileQuestion' : 'Code'} size={16} />
                              )}
                            </div>
                            <div className="flex-1">
                              <p className="text-sm font-medium">{lesson.title}</p>
                              <p className="text-xs text-muted-foreground capitalize">{lesson.type}</p>
                            </div>
                          </div>
                        ))}
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </>
            )}
          </TabsContent>

          <TabsContent value="profile" className="space-y-6 animate-fade-in">
            <div className="text-center space-y-4 mb-12">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-accent mx-auto flex items-center justify-center">
                <Icon name="User" size={48} className="text-white" />
              </div>
              <h1 className="text-4xl font-bold">Студент Иванов</h1>
              <p className="text-muted-foreground">student@example.com</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <Card className="border-2">
                <CardHeader>
                  <CardTitle>Активные курсы</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-4xl font-bold text-primary">3</p>
                </CardContent>
              </Card>

              <Card className="border-2">
                <CardHeader>
                  <CardTitle>Завершено</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-4xl font-bold text-green-600">12</p>
                </CardContent>
              </Card>

              <Card className="border-2">
                <CardHeader>
                  <CardTitle>Сертификатов</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-4xl font-bold text-accent">8</p>
                </CardContent>
              </Card>
            </div>

            <Card className="border-2">
              <CardHeader>
                <CardTitle>Последние достижения</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { title: 'Первый курс', desc: 'Завершили свой первый курс', icon: 'Award', color: 'text-yellow-500' },
                  { title: 'Неделя обучения', desc: '7 дней активности подряд', icon: 'Flame', color: 'text-orange-500' },
                  { title: 'Мастер тестов', desc: 'Сдали 10 тестов на 100%', icon: 'Target', color: 'text-green-500' }
                ].map((achievement, i) => (
                  <div key={i} className="flex items-center gap-4 p-3 rounded-lg bg-muted/50">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                      <Icon name={achievement.icon as any} className={achievement.color} size={24} />
                    </div>
                    <div>
                      <p className="font-semibold">{achievement.title}</p>
                      <p className="text-sm text-muted-foreground">{achievement.desc}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      <footer className="border-t mt-24 py-12 bg-card/50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                  <Icon name="GraduationCap" className="text-white" size={18} />
                </div>
                <span className="text-xl font-bold">EduPlatform</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Современная платформа для онлайн-обучения с интерактивными курсами
              </p>
            </div>
            
            {[
              { title: 'Курсы', items: ['Программирование', 'Дизайн', 'Маркетинг', 'Бизнес'] },
              { title: 'Компания', items: ['О нас', 'Преподаватели', 'Карьера', 'Блог'] },
              { title: 'Поддержка', items: ['Помощь', 'Контакты', 'FAQ', 'Правила'] }
            ].map((column, i) => (
              <div key={i}>
                <h3 className="font-semibold mb-4">{column.title}</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {column.items.map((item, j) => (
                    <li key={j} className="hover:text-primary cursor-pointer transition-colors">{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          
          <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
            <p>© 2024 EduPlatform. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
