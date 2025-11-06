import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/Navigation";
import { courses } from "@/data/coursesData";
import {
  ArrowLeft,
  Clock,
  BookOpen,
  CheckCircle,
  PlayCircle,
  Award,
} from "lucide-react";
import { toast } from "sonner";

const CourseDetail = () => {
  const { id } = useParams();
  const course = courses.find((c) => c.id === id);
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(
    new Set()
  );

  if (!course) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Course Not Found</h1>
          <Button asChild>
            <Link to="/courses">Back to Courses</Link>
          </Button>
        </div>
      </div>
    );
  }

  const toggleLesson = (lessonId: string) => {
    const newCompleted = new Set(completedLessons);
    if (newCompleted.has(lessonId)) {
      newCompleted.delete(lessonId);
      toast.info("Lesson marked as incomplete");
    } else {
      newCompleted.add(lessonId);
      toast.success("Lesson completed! Great job!");
    }
    setCompletedLessons(newCompleted);
  };

  const progress = (completedLessons.size / course.lessons.length) * 100;
  const isCompleted = completedLessons.size === course.lessons.length;

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <section className="py-8 bg-secondary/30">
        <div className="container mx-auto px-4">
          <Button variant="ghost" asChild className="mb-4">
            <Link to="/courses">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Courses
            </Link>
          </Button>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              <Card className="p-8 gradient-card border-border">
                <Badge
                  variant="secondary"
                  className="mb-4 capitalize bg-primary/10 text-primary"
                >
                  {course.category}
                </Badge>
                <h1 className="text-3xl font-bold mb-4">{course.title}</h1>
                <p className="text-lg text-muted-foreground mb-6">
                  {course.description}
                </p>

                <div className="grid sm:grid-cols-3 gap-4 mb-6">
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="w-4 h-4 text-primary" />
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <BookOpen className="w-4 h-4 text-success" />
                    <span>{course.lessons.length} lessons</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Badge className="capitalize">{course.level}</Badge>
                  </div>
                </div>

                {/* Progress */}
                <div className="bg-secondary/50 p-4 rounded-lg mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold">
                      Your Progress
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {completedLessons.size} / {course.lessons.length} completed
                    </span>
                  </div>
                  <Progress value={progress} className="mb-2" />
                  <p className="text-xs text-muted-foreground">
                    {progress.toFixed(0)}% complete
                  </p>
                </div>

                {isCompleted && (
                  <div className="bg-success/10 border border-success/20 p-6 rounded-lg text-center mb-6">
                    <Award className="w-12 h-12 text-success mx-auto mb-3" />
                    <h3 className="text-lg font-semibold text-success mb-2">
                      Course Completed! 🎉
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Congratulations on completing this course. Your credit score
                      has been updated!
                    </p>
                    <Button variant="success" size="sm">
                      Download Certificate
                    </Button>
                  </div>
                )}
              </Card>

              {/* Lessons */}
              <Card className="p-6 gradient-card border-border">
                <h2 className="text-xl font-semibold mb-4">Course Lessons</h2>
                <div className="space-y-3">
                  {course.lessons.map((lesson, index) => {
                    const isComplete = completedLessons.has(lesson.id);
                    return (
                      <div
                        key={lesson.id}
                        className={`p-4 rounded-lg border transition-smooth cursor-pointer hover-lift ${
                          isComplete
                            ? "bg-success/5 border-success/20"
                            : "bg-card border-border"
                        }`}
                        onClick={() => toggleLesson(lesson.id)}
                      >
                        <div className="flex items-start gap-4">
                          <div
                            className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                              isComplete
                                ? "bg-success text-success-foreground"
                                : "bg-primary/10 text-primary"
                            }`}
                          >
                            {isComplete ? (
                              <CheckCircle className="w-5 h-5" />
                            ) : (
                              <PlayCircle className="w-5 h-5" />
                            )}
                          </div>
                          <div className="flex-grow">
                            <div className="flex items-center justify-between mb-1">
                              <h3 className="font-semibold">
                                {index + 1}. {lesson.title}
                              </h3>
                              <span className="text-sm text-muted-foreground">
                                {lesson.duration}
                              </span>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {lesson.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <Card className="p-6 gradient-card border-border sticky top-24">
                <h3 className="text-lg font-semibold mb-4">Course Info</h3>
                <div className="space-y-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Duration:</span>
                    <div className="font-semibold">{course.duration}</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Level:</span>
                    <div className="font-semibold capitalize">
                      {course.level}
                    </div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Enrolled:</span>
                    <div className="font-semibold">
                      {course.enrolledCount.toLocaleString()} students
                    </div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Rating:</span>
                    <div className="font-semibold">⭐ {course.rating}/5.0</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Certificate:</span>
                    <div className="font-semibold">Upon completion</div>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-border">
                  <h4 className="font-semibold mb-3 text-sm">Benefits</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                      <span>Improve credit score</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                      <span>Better loan terms</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                      <span>Practical skills</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                      <span>Lifetime access</span>
                    </li>
                  </ul>
                </div>

                <Button variant="hero" size="lg" className="w-full mt-6" asChild>
                  <Link to="/courses">Browse More Courses</Link>
                </Button>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CourseDetail;
