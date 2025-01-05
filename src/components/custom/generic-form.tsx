"use client";

import { useState } from "react";
import { useForm, FieldValues, DefaultValues } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import ImageUpload from "./image-upload";

interface GenericFormProps<T extends FieldValues> {
  schema: z.ZodType<T>;
  defaultValues: DefaultValues<T>;
  onSubmit: (data: T) => Promise<void>;
  fields: {
    name: keyof T;
    label: string;
    type:
      | "text"
      | "email"
      | "password"
      | "textarea"
      | "checkbox"
      | "select"
      | "image";
    placeholder?: string;
    description?: string;
    options?: { value: string; label: string }[];
    maxSizeMB?: number;
    acceptedFileTypes?: string[];
  }[];
  submitButtonText: string;
}

export function GenericForm<T extends FieldValues>({
  schema,
  defaultValues,
  onSubmit,
  fields,
  submitButtonText,
}: GenericFormProps<T>) {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<T>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const handleSubmit = async (values: T) => {
    setIsLoading(true);
    setError(null);
    try {
      await onSubmit(values);
    } catch (err) {
      setError("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        {fields.map((field) => (
          <FormField
            key={field.name as string}
            control={form.control}
            name={field.name as string}
            render={({ field: formField }) => (
              <FormItem>
                <FormLabel>{field.label}</FormLabel>
                <FormControl>
                  {field.type === "textarea" ? (
                    <Textarea placeholder={field.placeholder} {...formField} />
                  ) : field.type === "checkbox" ? (
                    <Checkbox
                      checked={formField.value}
                      onCheckedChange={formField.onChange}
                    />
                  ) : field.type === "select" ? (
                    <Select
                      onValueChange={formField.onChange}
                      defaultValue={formField.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder={field.placeholder} />
                      </SelectTrigger>
                      <SelectContent>
                        {field.options?.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  ) : field.type === "image" ? (
                    <ImageUpload
                      onUpload={async (file) => {
                        // Here you would typically upload the file to your server or cloud storage
                        // and get back a URL or file identifier
                        // For this example, we'll just set the file object directly
                        formField.onChange(file);
                      }}
                      maxSizeMB={field.maxSizeMB}
                      acceptedFileTypes={field.acceptedFileTypes}
                      buttonText={`Upload ${field.label}`}
                    />
                  ) : (
                    <Input
                      type={field.type}
                      placeholder={field.placeholder}
                      {...formField}
                    />
                  )}
                </FormControl>
                {field.description && (
                  <FormDescription>{field.description}</FormDescription>
                )}
                <FormMessage />
              </FormItem>
            )}
          />
        ))}
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Submitting..." : submitButtonText}
        </Button>
        {error && (
          <Alert variant="destructive">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
      </form>
    </Form>
  );
}
