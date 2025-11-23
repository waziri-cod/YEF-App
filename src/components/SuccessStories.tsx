import { useState, useEffect } from "react";
import { DocumentData } from "firebase/firestore";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Star,
  Quote,
  Heart,
  Share2,
  Loader2,
  CheckCircle2,
  TrendingUp,
} from "lucide-react";
import { successStoryService } from "@/services/firestoreService";
import { toast } from "sonner";
import { useAuthStore } from "@/store/authStore";

const successStorySchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  story: z.string().min(50, "Story must be at least 50 characters"),
  loanId: z.string().optional(),
});

type SuccessStoryFormValues = z.infer<typeof successStorySchema>;

export const SuccessStories = () => {
  const { user } = useAuthStore();
  const [stories, setStories] = useState<DocumentData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showDialog, setShowDialog] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<SuccessStoryFormValues>({
    resolver: zodResolver(successStorySchema),
    defaultValues: {
      title: "",
      story: "",
      loanId: "",
    },
  });

  useEffect(() => {
    loadSuccessStories();
  }, []);

  const loadSuccessStories = async () => {
    try {
      setIsLoading(true);
      const allStories = await successStoryService.getAllSuccessStories(false);
      setStories(allStories);
    } catch (error) {
      toast.error("Failed to load success stories");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = async (values: SuccessStoryFormValues) => {
    if (!user) {
      toast.error("Please log in to share your story");
      return;
    }

    try {
      setIsSubmitting(true);
      await successStoryService.createSuccessStory(
        user.id,
        values.loanId || "",
        values.title,
        values.story
      );

      toast.success("Thank you for sharing your success story!");
      form.reset();
      setShowDialog(false);

      // Reload stories
      setTimeout(() => {
        loadSuccessStories();
      }, 1000);
    } catch (error) {
      toast.error("Failed to submit story");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">Success Stories</h1>
        <p className="text-xl text-muted-foreground mb-6">
          Read inspiring stories from clients who have transformed their lives and businesses through YEF's microfinance services.
        </p>
        <Button
          onClick={() => setShowDialog(true)}
          size="lg"
          className="gap-2"
        >
          <Heart className="w-5 h-5" />
          Share Your Story
        </Button>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Stories</p>
                <p className="text-3xl font-bold mt-2">{stories.length}</p>
              </div>
              <TrendingUp className="w-10 h-10 text-blue-600 opacity-20" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Lives Changed</p>
                <p className="text-3xl font-bold mt-2">{Math.floor(stories.length * 2.5)}+</p>
              </div>
              <Heart className="w-10 h-10 text-red-600 opacity-20" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">This Month</p>
                <p className="text-3xl font-bold mt-2">{Math.floor(stories.length * 0.3)}+</p>
              </div>
              <CheckCircle2 className="w-10 h-10 text-green-600 opacity-20" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Stories Grid */}
      {isLoading ? (
        <div className="text-center py-12">
          <Loader2 className="w-8 h-8 animate-spin mx-auto text-muted-foreground mb-2" />
          <p className="text-muted-foreground">Loading success stories...</p>
        </div>
      ) : stories.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground mb-4">No success stories yet. Be the first to share!</p>
          <Button onClick={() => setShowDialog(true)}>Share Your Story</Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stories.map(story => (
            <Card key={story.id} className="hover:shadow-lg transition-shadow flex flex-col">
              {story.image && (
                <div className="w-full h-48 bg-gradient-to-br from-primary/10 to-primary/5 overflow-hidden rounded-t-lg">
                  <img
                    src={story.image}
                    alt={story.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              <CardHeader className="flex-grow">
                <div className="flex items-start justify-between mb-2">
                  <Badge variant={story.featured ? "default" : "secondary"}>
                    {story.featured ? "Featured" : "Success"}
                  </Badge>
                </div>
                <CardTitle className="line-clamp-2">{story.title}</CardTitle>
              </CardHeader>

              <CardContent className="flex-grow">
                <p className="text-sm text-muted-foreground line-clamp-4">
                  {story.story}
                </p>
              </CardContent>

              <div className="border-t p-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                  <span className="text-sm font-medium">5.0</span>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm" className="gap-1">
                    <Heart className="w-4 h-4" />
                    Like
                  </Button>
                  <Button variant="ghost" size="sm" className="gap-1">
                    <Share2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Testimonial Featured */}
      {stories.length > 0 && (
        <Card className="bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20 p-8">
          <div className="text-center max-w-2xl mx-auto">
            <Quote className="w-12 h-12 mx-auto text-primary/30 mb-4" />
            <p className="text-lg font-medium mb-4 italic">
              "YEF changed my life. With their support and micro-loans, I was able to expand my business and now I employ 15 people in my community."
            </p>
            <div className="flex items-center justify-center gap-3">
              <Avatar>
                <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div className="text-left">
                <p className="font-semibold">Jane Doe</p>
                <p className="text-sm text-muted-foreground">Entrepreneur, Dar es Salaam</p>
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* Submit Story Dialog */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Share Your Success Story</DialogTitle>
            <DialogDescription>
              Inspire others by sharing how YEF helped you achieve your dreams
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {/* Title */}
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Story Title</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g., How I grew my tailoring business from zero to hero"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Story */}
              <FormField
                control={form.control}
                name="story"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Story</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Tell us your journey... How did YEF help you? What challenges did you overcome? What are your plans for the future?"
                        rows={6}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Loan ID */}
              <FormField
                control={form.control}
                name="loanId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Associated Loan ID (Optional)</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Leave blank if not applicable"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              {/* Submit */}
              <div className="flex gap-3 justify-end pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowDialog(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Sharing...
                    </>
                  ) : (
                    <>
                      <Heart className="w-4 h-4" />
                      Share Story
                    </>
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SuccessStories;
