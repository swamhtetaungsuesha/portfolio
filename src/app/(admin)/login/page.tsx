"use client";
import { GenericForm } from "@/components/custom/generic-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { z } from "zod";

const profileSchema = z.object({
  username: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

const Login = () => {
  const router = useRouter();

  const onSubmit = async (values: ProfileFormValues) => {
    // Implement your profile update logic here
    console.log(values);
    // If profile update is successful, redirect to dashboard
    router.push("/dashboard");
  };
  return (
    <Card className="w-[500px]">
      <CardHeader>
        <CardTitle>Update Profile</CardTitle>
        <CardDescription>Manage your profile information</CardDescription>
      </CardHeader>
      <CardContent>
        <GenericForm<ProfileFormValues>
          schema={profileSchema}
          defaultValues={{
            username: "",
            email: "",
          }}
          onSubmit={onSubmit}
          fields={[
            {
              name: "username",
              label: "Username",
              type: "text",
              placeholder: "Enter your name",
            },
            {
              name: "email",
              label: "Email",
              type: "email",
              placeholder: "Enter your email",
            },
          ]}
          submitButtonText="Sign In"
        />
      </CardContent>
    </Card>
  );
};

export default Login;
