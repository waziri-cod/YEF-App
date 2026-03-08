import { useParams, useNavigate } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Clock, CheckCircle2, Circle, BookOpen, Video, Play } from "lucide-react";
import { courses } from "@/data/coursesData";
import { useState } from "react";

export default function CourseDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const course = courses.find((c) => c.id === id);
  const [lessons, setLessons] = useState(course?.lessons || []);

  if (!course) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Course not found</h1>
          <Button onClick={() => navigate("/courses")}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Courses
          </Button>
        </div>
      </div>
    );
  }

  const completedLessons = lessons.filter((l) => l.completed).length;
  const progress = (completedLessons / lessons.length) * 100;

  const toggleLesson = (lessonId: string) => {
    setLessons(
      lessons.map((lesson) =>
        lesson.id === lessonId ? { ...lesson, completed: !lesson.completed } : lesson
      )
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        <Button variant="ghost" onClick={() => navigate("/courses")} className="mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Courses
        </Button>

        <div className="mb-8">
          <Badge className="mb-4">{course.category}</Badge>
          <h1 className="text-4xl font-bold text-foreground mb-4">{course.title}</h1>
          <p className="text-lg text-muted-foreground mb-6">{course.description}</p>
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <span>⭐ {course.rating}</span>
            <span>• {course.enrolledCount.toLocaleString()} enrolled</span>
            <span>• {course.duration}</span>
            <span>• {course.level}</span>
          </div>
        </div>

        <Tabs defaultValue="lessons" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="lessons">Lessons</TabsTrigger>
            <TabsTrigger value="books">Books</TabsTrigger>
            <TabsTrigger value="videos">Motivation</TabsTrigger>
          </TabsList>

          <TabsContent value="lessons">
            <Card className="gradient-card border-border">
              <CardHeader>
                <CardTitle>Course Content</CardTitle>
                <CardDescription>
                  {completedLessons} of {course.lessons.length} lessons completed
                </CardDescription>
                <Progress value={progress} className="mt-4" />
              </CardHeader>
              <CardContent className="space-y-4">
                {lessons.map((lesson) => (
                  <Card
                    key={lesson.id}
                    className="border-border hover-lift cursor-pointer"
                    onClick={() => toggleLesson(lesson.id)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          {lesson.completed ? (
                            <CheckCircle2 className="h-6 w-6 text-success" />
                          ) : (
                            <Circle className="h-6 w-6 text-muted-foreground" />
                          )}
                          <div>
                            <h3 className="font-semibold text-foreground">{lesson.title}</h3>
                            <p className="text-sm text-muted-foreground">{lesson.description}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                          <Clock className="h-4 w-4" />
                          <span>{lesson.duration}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="books">
            <Card className="gradient-card border-border">
              <CardHeader>
                <CardTitle>Recommended Books</CardTitle>
                <CardDescription>
                  Essential reading to deepen your knowledge
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-6 md:grid-cols-2">
                {course.books.length === 0 ? (
                  <p className="text-muted-foreground col-span-2 text-center py-8">
                    No books available for this course yet.
                  </p>
                ) : (
                  course.books.map((book) => (
                    <Card key={book.id} className="border-border hover-lift">
                      <CardContent className="p-4">
                        <div className="flex space-x-4">
                          <div className="flex-shrink-0">
                            <img
                              src={book.coverUrl}
                              alt={book.title}
                              className="h-32 w-24 object-cover rounded-md"
                            />
                          </div>
                          <div className="flex-1 space-y-2">
                            <div className="flex items-start space-x-2">
                              <BookOpen className="h-5 w-5 text-primary mt-1" />
                              <div>
                                <h3 className="font-semibold text-foreground">{book.title}</h3>
                                <p className="text-sm text-muted-foreground">by {book.author}</p>
                              </div>
                            </div>
                            <p className="text-sm text-muted-foreground">{book.description}</p>
                            <Button size="sm" variant="outline" className="mt-2">
                              Read More
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="videos">
            <Card className="gradient-card border-border">
              <CardHeader>
                <CardTitle>Success Stories</CardTitle>
                <CardDescription>
                  Learn from entrepreneurs who made it
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {course.motivationalVideos.length === 0 ? (
                  <p className="text-muted-foreground text-center py-8">
                    No videos available for this course yet.
                  </p>
                ) : (
                  course.motivationalVideos.map((video) => (
                    <Card key={video.id} className="border-border hover-lift">
                      <CardContent className="p-4">
                        <div className="space-y-4">
                          <div className="relative aspect-video rounded-lg overflow-hidden bg-muted">
                            <img
                              src={video.thumbnail}
                              alt={video.title}
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                              <Button size="lg" className="rounded-full">
                                <Play className="h-6 w-6" />
                              </Button>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-start space-x-2">
                              <Video className="h-5 w-5 text-accent mt-1" />
                              <div>
                                <h3 className="font-semibold text-foreground">{video.title}</h3>
                                <p className="text-sm text-muted-foreground">Speaker: {video.speaker}</p>
                              </div>
                            </div>
                            <p className="text-sm text-muted-foreground">{video.description}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
