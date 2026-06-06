"use client";

import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { SubmitHandler, useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
// import emailjs from "@emailjs/browser";
import { Button } from "../ui/button";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

type TourName = {
  tourName: string;
};

//zod schema
const BookingSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().min(1, "Email is required").email("Enter a valid email"),
  phoneNumber: z
    .string()
    .regex(/^\+?\d{10,15}$/, "Must be a valid phone number"),
  guest: z.number({ error: "Must be a valid number" }),
  tourName: z.string().optional(),
});

type BookingTypes = z.infer<typeof BookingSchema>;

// function to submit the request
const sendEmailFunction = async (formData: BookingTypes) => {
  try {
    const response = await axios.post("/api/send", formData);

    if (response.status === 500) {
      throw new Error("Error in submitting form request");
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.log(error, "email");
    throw new Error(
      error.response?.data?.message || "Error submitting booking"
    );
  }
};

function TourBooking({ tourName }: TourName) {
  const { toast } = useToast();
  const form = useForm<BookingTypes>({
    resolver: zodResolver(BookingSchema),
    defaultValues: {
      email: "",
      guest: 0,
      name: "",
      phoneNumber: "",
      tourName: "",
    },
  });

  //post to send the email
  const mutation = useMutation({
    mutationFn: sendEmailFunction,
    onSuccess: () => {
      toast({ description: "Booking submitted successfully!" });
      form.reset(); // Reset the form after success
    },
  });

  const onSubmit = async (data: BookingTypes) => {
    mutation.mutate({ ...data, tourName: tourName });
  };

  return (
    <div>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Book Tour</DialogTitle>
        </DialogHeader>
        <DialogDescription className="hidden">
          {" "}
          Form to book the tour
        </DialogDescription>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-3"
          >
            <div className="space-y-1">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
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
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone number</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="guest"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Persons Attending</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="number"
                        min={1}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button
              variant={"outline"}
              type="submit"
              disabled={mutation.isPending}
            >
              {mutation.isPending ? "submitting" : "submit"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </div>
  );
}

export default TourBooking;
