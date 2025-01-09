
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import React from "react";
import { Button } from "./ui/button";
import { toast } from "@/hooks/use-toast";
import { Textarea } from "./ui/textarea";
import { useSharedState } from "@/context/ItemProvider";

// Define Zod schema for form validation
const formSchema = z.object({
  name: z.string().min(1, "plese inser address"),
  category: z.string().min(1, "Title is required"),
  des: z.string().min(1, "Description is required"),
  priority: z.string().min(1, "Price is required"),
});

function AddItem() {
  const [loading, setLoading] = useState(false);
  const {items,setItems}=useSharedState()

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      category: "",
      des: "",
      priority: "",
    },
  });

  const onSubmit = async (values) => {
     console.log(values)
    setLoading(true);
    try {


      const response = await fetch(`http://localhost:5000/api/shop/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Ensure the server knows the data is JSON
        },
        body: JSON.stringify(values), // Convert the `values` object to a JSON string
      });

      const data = await response.json();

      if (response.ok) {
        setItems((prevItems) => [...prevItems, data.data]);
        toast({
          description: "the post add succussfuly",
          className: "bg-green-500 text-white p-4 rounded shadow-lg",
        });

      } else {
        toast({
          description: data.message,
          className: "bg-red-500 text-white p-4 rounded shadow-lg",
        });
      }
    } catch (err) {
      toast({
        description: err.message,
        className: "bg-red-500 text-white p-4 rounded shadow-lg",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger><Button className="bg-[#3F51B5] hover:bg-[#3F51B5]/80">Add Item</Button></DialogTrigger>
      <DialogContent>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 flex flex-col gap-4"
          >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="name..." />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                  <FormField
                    control={form.control}
                    name="des"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea 
                          className={"min-h-52"}
                            type="text"
                            {...field}
                            placeholder="description..."
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category</FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            {...field}
                            placeholder="category..."
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="priority"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>priority</FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="high">
                                High Priority
                              </SelectItem>
                              <SelectItem value="medium">
                                Medium Priority
                              </SelectItem>
                              <SelectItem value="low">Low Priority</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

            <Button
              type="submit"
              disabled={loading} // Disable the button while loading
            >
              {loading ? "Submitting..." : "Submit"}{" "}
            </Button>
          </form>
        </Form>


      </DialogContent>
    </Dialog>
  );
}

export default AddItem;
