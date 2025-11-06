import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Navigation } from "@/components/Navigation";
import { courses } from "@/data/coursesData";
import {
  BookOpen,
  Clock,
  Users,
  Star,
  TrendingUp,
  DollarSign,
  Megaphone,
  Smartphone,
} from "lucide-react";

const categoryIcons = {
  finance: DollarSign,
  business: TrendingUp,
  marketing: Megaphone,
  tech: Smartphone,
};

const categoryColors = {
  finance: "bg-primary/10 text-primary",
  business: "bg-success/10 text-success",
  marketing: "bg-accent/10 text-accent",
  tech: "bg-primary/10 text-primary",
};

const levelColors = {
  beginner: "bg-success/20 text-success",
  intermediate: "bg-accent/20 text-accent",
  advanced: "bg-destructive/20 text-destructive",
};

const Courses = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Header */}
      <section className="gradient-hero text-primary-foreground py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Financial Literacy Courses
            </h1>
            <p className="text-lg opacity-95">
              Build your business knowledge with free courses designed for young
              entrepreneurs. Learn at your own pace.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-8 bg-card border-b border-border">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-primary mb-1">
                {courses.length}
              </div>
              <div className="text-sm text-muted-foreground">
                Courses Available
              </div>
            </div>
            <div>
              <div className="text-3xl font-bold text-success mb-1">
                {courses.reduce((acc, c) => acc + c.lessons.length, 0)}
              </div>
              <div className="text-sm text-muted-foreground">Total Lessons</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-accent mb-1">
                {courses
                  .reduce((acc, c) => acc + c.enrolledCount, 0)
                  .toLocaleString()}
                +
              </div>
              <div className="text-sm text-muted-foreground">
                Students Enrolled
              </div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-1">Free</div>
              <div className="text-sm text-muted-foreground">
                All Courses
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => {
              const Icon = categoryIcons[course.category];
              return (
                <Card
                  key={course.id}
                  className="p-6 hover-lift gradient-card border-border flex flex-col"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className={`w-12 h-12 rounded-lg ${categoryColors[course.category]} flex items-center justify-center`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <Badge
                      variant="secondary"
                      className={`capitalize ${levelColors[course.level]}`}
                    >
                      {course.level}
                    </Badge>
                  </div>

                  <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4 flex-grow">
                    {course.description}
                  </p>

                  <div className="space-y-2 mb-6">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <BookOpen className="w-4 h-4" />
                      <span>{course.lessons.length} lessons</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Users className="w-4 h-4" />
                      <span>{course.enrolledCount.toLocaleString()} enrolled</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Star className="w-4 h-4 fill-accent text-accent" />
                      <span className="font-semibold">{course.rating}</span>
                      <span className="text-muted-foreground">rating</span>
                    </div>
                  </div>

                  <Button variant="hero" className="w-full" asChild>
                    <Link to={`/course/${course.id}`}>Start Learning</Link>
                  </Button>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Learn Section */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="p-8 gradient-card border-border">
              <h2 className="text-2xl font-bold mb-6 text-center">
                Why Financial Literacy Matters
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                    <TrendingUp className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">Better Decisions</h3>
                  <p className="text-sm text-muted-foreground">
                    Make informed financial choices for your business
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-3">
                    <DollarSign className="w-6 h-6 text-success" />
                  </div>
                  <h3 className="font-semibold mb-2">Higher Success Rate</h3>
                  <p className="text-sm text-muted-foreground">
                    Educated entrepreneurs are 3x more likely to succeed
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-3">
                    <BookOpen className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="font-semibold mb-2">Lifetime Skills</h3>
                  <p className="text-sm text-muted-foreground">
                    Knowledge that benefits you beyond business
                  </p>
                </div>
              </div>
              <div className="mt-8 text-center">
                <p className="text-muted-foreground mb-4">
                  Complete courses to unlock better loan terms and higher
                  credit scores
                </p>
                <Button variant="hero" size="lg">
                  Start Your First Course
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Courses;
