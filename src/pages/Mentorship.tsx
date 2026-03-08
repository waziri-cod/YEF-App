import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Navigation } from "@/components/Navigation";
import {
  Users,
  MessageSquare,
  Star,
  TrendingUp,
  Award,
  Calendar,
} from "lucide-react";

const Mentorship = () => {
  const mentors = [
    {
      name: "Amina Juma",
      role: "Retail Business Expert",
      experience: "12 years",
      specialty: "Retail & E-commerce",
      rating: 4.9,
      sessions: 145,
      initials: "AJ",
    },
    {
      name: "Joseph Mwamba",
      role: "Agricultural Specialist",
      experience: "15 years",
      specialty: "Agribusiness",
      rating: 4.8,
      sessions: 128,
      initials: "JM",
    },
    {
      name: "Grace Ndege",
      role: "Tech Entrepreneur",
      experience: "8 years",
      specialty: "Technology & Innovation",
      rating: 5.0,
      sessions: 92,
      initials: "GN",
    },
    {
      name: "Hassan Bakari",
      role: "Financial Advisor",
      experience: "10 years",
      specialty: "Financial Management",
      rating: 4.7,
      sessions: 167,
      initials: "HB",
    },
  ];

  const successStories = [
    {
      name: "Sarah K.",
      business: "Fashion Boutique",
      story:
        "Started with TZS 1M loan, now earning TZS 8M monthly. Mentorship helped me scale from online to physical store.",
      year: "2023",
    },
    {
      name: "Michael T.",
      business: "Poultry Farm",
      story:
        "Used agricultural loan to start with 500 chickens. Now running 5,000+ bird operation with consistent profits.",
      year: "2022",
    },
    {
      name: "Neema R.",
      business: "Mobile App Development",
      story:
        "Tech innovation loan helped build my first app. Now have 3 apps with 50,000+ downloads and growing.",
      year: "2024",
    },
  ];

  const forumTopics = [
    {
      title: "Marketing on a tight budget",
      author: "John D.",
      replies: 23,
      views: 456,
      category: "Marketing",
    },
    {
      title: "How to approach first investors?",
      author: "Mary K.",
      replies: 18,
      views: 389,
      category: "Funding",
    },
    {
      title: "Managing seasonal cash flow",
      author: "Peter M.",
      replies: 31,
      views: 512,
      category: "Finance",
    },
    {
      title: "Best social media for small business",
      author: "Grace N.",
      replies: 42,
      views: 678,
      category: "Digital",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Header */}
      <section className="gradient-hero text-primary-foreground py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Mentorship & Community
            </h1>
            <p className="text-lg opacity-95">
              Connect with experienced entrepreneurs, share knowledge, and grow
              together in a supportive community.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-8 bg-card border-b border-border">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-primary mb-1">50+</div>
              <div className="text-sm text-muted-foreground">Expert Mentors</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-success mb-1">
                2,500+
              </div>
              <div className="text-sm text-muted-foreground">
                Community Members
              </div>
            </div>
            <div>
              <div className="text-3xl font-bold text-accent mb-1">500+</div>
              <div className="text-sm text-muted-foreground">
                Success Stories
              </div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-1">24/7</div>
              <div className="text-sm text-muted-foreground">
                Community Support
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mentors */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Meet Our Mentors</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Get guidance from experienced entrepreneurs who have built
              successful businesses in Tanzania.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {mentors.map((mentor, index) => (
              <Card
                key={index}
                className="p-6 hover-lift gradient-card border-border text-center"
              >
                <Avatar className="w-20 h-20 mx-auto mb-4">
                  <AvatarFallback className="text-xl bg-primary text-primary-foreground">
                    {mentor.initials}
                  </AvatarFallback>
                </Avatar>
                <h3 className="font-semibold text-lg mb-1">{mentor.name}</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  {mentor.role}
                </p>
                <Badge variant="secondary" className="mb-4">
                  {mentor.specialty}
                </Badge>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-center gap-1">
                    <Star className="w-4 h-4 fill-accent text-accent" />
                    <span className="font-semibold">{mentor.rating}</span>
                    <span className="text-muted-foreground">
                      ({mentor.sessions} sessions)
                    </span>
                  </div>
                  <div className="text-muted-foreground">
                    {mentor.experience} experience
                  </div>
                </div>
                <Button variant="hero" size="sm" className="w-full mt-4">
                  <MessageSquare className="w-4 h-4 mr-2" /> Book Session
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Award className="w-12 h-12 text-accent mx-auto mb-4" />
            <h2 className="text-3xl font-bold mb-4">Success Stories</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Real stories from entrepreneurs who transformed their lives with YEF.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {successStories.map((story, index) => (
              <Card
                key={index}
                className="p-6 hover-lift gradient-card border-border"
              >
                <div className="flex items-center gap-3 mb-4">
                  <Avatar>
                    <AvatarFallback className="bg-success/10 text-success">
                      {story.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold">{story.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {story.business}
                    </p>
                  </div>
                </div>
                <p className="text-sm mb-3">{story.story}</p>
                <Badge variant="secondary" className="text-xs">
                  <TrendingUp className="w-3 h-3 mr-1" /> Success {story.year}
                </Badge>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Community Forum */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Users className="w-12 h-12 text-primary mx-auto mb-4" />
            <h2 className="text-3xl font-bold mb-4">Community Forum</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Join discussions, ask questions, and share your experiences with
              fellow entrepreneurs.
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-4">
            {forumTopics.map((topic, index) => (
              <Card
                key={index}
                className="p-6 hover-lift gradient-card border-border cursor-pointer"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-grow">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-lg">{topic.title}</h3>
                      <Badge variant="secondary" className="text-xs">
                        {topic.category}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      by {topic.author}
                    </p>
                  </div>
                  <div className="text-right text-sm text-muted-foreground">
                    <div className="flex items-center gap-2 mb-1">
                      <MessageSquare className="w-4 h-4" />
                      <span>{topic.replies} replies</span>
                    </div>
                    <div>{topic.views} views</div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8">
            <Button variant="hero" size="lg">
              <MessageSquare className="mr-2" /> Join the Discussion
            </Button>
          </div>
        </div>
      </section>

      {/* Events */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="p-8 gradient-card border-border">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Calendar className="w-10 h-10 text-primary" />
                </div>
                <div className="flex-grow text-center md:text-left">
                  <h2 className="text-2xl font-bold mb-2">
                    Upcoming Events & Workshops
                  </h2>
                  <p className="text-muted-foreground mb-4">
                    Join monthly workshops, networking events, and masterclasses
                    with industry experts.
                  </p>
                  <Button variant="hero" size="lg">
                    View Event Calendar
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Mentorship;
