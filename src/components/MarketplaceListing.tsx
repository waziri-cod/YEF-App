import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { ShoppingBag, Plus, Loader2 } from "lucide-react";
import { toast } from "sonner";

const marketplaceItemSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  description: z.string().min(20, "Description must be at least 20 characters"),
  category: z.enum(['products', 'services', 'business']),
  price: z.coerce.number().optional(),
  location: z.string().min(3, "Location required"),
  phone: z.string().regex(/^\+?[1-9]\d{1,14}$/, "Valid phone number required"),
  email: z.string().email("Valid email required").optional(),
  tags: z.string(), // Comma-separated
});

type MarketplaceFormValues = z.infer<typeof marketplaceItemSchema>;

export const MarketplaceListing = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState<string[]>([]);

  const form = useForm<MarketplaceFormValues>({
    resolver: zodResolver(marketplaceItemSchema),
    defaultValues: {
      title: "",
      description: "",
      category: "products",
      location: "",
      phone: "",
      email: "",
      tags: "",
    },
  });

  const onSubmit = async (values: MarketplaceFormValues) => {
    try {
      setIsLoading(true);

      if (images.length === 0) {
        toast.error("Please upload at least one image");
        return;
      }

      // Create marketplace item
      const marketplaceItem = {
        title: values.title,
        description: values.description,
        category: values.category,
        price: values.price,
        location: values.location,
        phone: values.phone,
        email: values.email,
        images: images,
        tags: values.tags.split(',').map(tag => tag.trim()),
        currency: 'TZS',
        rating: 0,
        reviews: 0,
        views: 0,
        status: 'active',
      };

      // TODO: Save to Firestore
      console.log('Marketplace item:', marketplaceItem);

      toast.success("Product/Service listed successfully! 🎉");
      form.reset();
      setImages([]);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Failed to list item";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      // In production, upload to Firebase Storage
      // For now, create local URLs
      Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImages(prev => [...prev, reader.result as string]);
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <ShoppingBag className="w-6 h-6 text-primary" />
            <div>
              <CardTitle>Promote Your Product or Service</CardTitle>
              <CardDescription>
                List your products, services, or business to attract customers and connect with loan opportunities
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Title */}
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product/Service Title</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g., Fresh Organic Vegetables, Photography Services"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Description */}
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describe your product or service in detail. What makes it special? Why should customers choose you?"
                        rows={5}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Category */}
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="products">Products</SelectItem>
                        <SelectItem value="services">Services</SelectItem>
                        <SelectItem value="business">Business</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Price */}
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price (Optional)</FormLabel>
                    <FormControl>
                      <div className="flex gap-2">
                        <Input
                          type="number"
                          placeholder="Enter price"
                          {...field}
                        />
                        <span className="flex items-center text-muted-foreground">TZS</span>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Location */}
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="City/Region where you operate"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Contact Info */}
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="+255 xyz"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email (Optional)</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="your@email.com"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Tags */}
              <FormField
                control={form.control}
                name="tags"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tags (Comma-separated)</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g., organic, handmade, eco-friendly"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Image Upload */}
              <FormItem>
                <FormLabel>Product Images</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                  />
                </FormControl>
              </FormItem>

              {/* Image Preview */}
              {images.length > 0 && (
                <div className="space-y-3">
                  <p className="text-sm font-medium">Preview ({images.length} images)</p>
                  <div className="grid grid-cols-3 gap-3">
                    {images.map((image, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={image}
                          alt={`Preview ${index}`}
                          className="w-full h-24 object-cover rounded-lg"
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition"
                          onClick={() => removeImage(index)}
                        >
                          ×
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={() => form.reset()}>
            Clear Form
          </Button>
          <Button
            onClick={form.handleSubmit(onSubmit)}
            disabled={isLoading}
            className="gap-2"
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Plus className="w-4 h-4" />
            )}
            List Now
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default MarketplaceListing;
