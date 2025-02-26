"use client";
import { GenericForm } from "@/components/custom/generic-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import AuthService from "@/services/auth/AuthService";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { z } from "zod";

const profileSchema = z.object({
  username: z.string().email("Invalid email address"),
  password: z.string().min(6, "Your password must be 6 characters at least."),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

const Login = () => {
  const router = useRouter();

  const onSubmit = async (values: ProfileFormValues) => {
    const res = await AuthService.login(values);
    if (res.success) {
      toast("Success", {
        description: res.message,
      });
      router.push("/dashboard");
    } else {
      toast("Error", {
        description: res.message,
      });
    }
  };
  return (
    <div className="mx-auto h-full flex items-center justify-center">
      <Card className="w-[400px] mx-auto bg-black/10">
        <CardHeader>
          <CardTitle>Log in to your account</CardTitle>
          <CardDescription>Enter your information to login</CardDescription>
        </CardHeader>
        <CardContent>
          <GenericForm<ProfileFormValues>
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
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
