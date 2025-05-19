"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import AuthService from "@/services/auth/AuthService";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const profileSchema = z.object({
  username: z.string().email("Invalid email address"),
  password: z.string().min(6, "Your password must be 6 characters at least."),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

const Login = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (values: ProfileFormValues) => {
    setIsLoading(true);
    const res = await AuthService.login(values);
    if (res.success) {
      toast("Success", {
        description: res.message,
      });
      router.push("/dashboard/company");
    } else {
      toast("Error", {
        description: res.message,
      });
    }
    setIsLoading(false);
  };
  return (
    <div className="mx-auto h-full flex items-center justify-center">
      <Card className="w-[400px] mx-auto bg-black/10">
        <CardHeader>
          <CardTitle>Log in to your account</CardTitle>
          <CardDescription>Enter your information to login</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your username"
                        type="email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your password"
                        type="password"
                        value={field.value || undefined}
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? "Submitting..." : "Sign In"}
              </Button>
            </form>
          </Form>
          {/* <GenericForm<ProfileFormValues>
            schema={profileSchema}
            defaultValues={{
              username: "",
              password: "",
            }}
            onSubmit={onSubmit}
            fields={[
              {
                name: "username",
                label: "Username",
                type: "email",
                placeholder: "Enter your username",
              },
              {
                name: "password",
                label: "Password",
                type: "password",
                placeholder: "Enter your password",
              },
            ]}
            submitButtonText="Sign In"
          /> */}
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
