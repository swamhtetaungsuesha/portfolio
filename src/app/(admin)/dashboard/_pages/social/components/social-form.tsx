"use client";

import { z } from "zod";
import { GenericForm } from "@/components/custom/generic-form";
import { SocialSelect } from "@/db/schema";
import { toast } from "sonner";
import SocialService from "@/services/social/SocialService";

const updateSchema = z.object({
  id: z.number(),
  name: z.string().min(1, "Social name is required"),
  link: z.string().url("Invalid URL"),
  userId: z.number().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

const createSchema = z.object({
  name: z.string().min(1, "Company name is required"),
  link: z.string().url("Invalid URL"),
});

type Schema = z.infer<typeof updateSchema> | z.infer<typeof createSchema>;

export function SocialForm({ initialData }: { initialData?: SocialSelect }) {
  const onSubmit = async (values: Schema) => {
    let response;
    if (initialData) {
      response = await SocialService.update(
        values as z.infer<typeof updateSchema>
      );
    } else {
      response = await SocialService.create({
        link: values.link,
        name: values.name,
        userId: null,
      });
    }
    if (response.success) {
      toast("Success", {
        description: response.message,
      });
    } else {
      toast("Error", {
        description: response.message,
      });
    }
  };

  //   const onClose = () => {
  //     setIsOpen(false);
  //     router.back();
  //   };

  return (
    <div>
      <GenericForm<Schema>
        schema={initialData ? updateSchema : createSchema}
        defaultValues={{
          id: initialData?.id,
          createdAt: initialData?.createdAt,
          updatedAt: initialData?.updatedAt,
          name: initialData?.name,
          link: initialData?.link || "",
        }}
        onSubmit={onSubmit}
        fields={[
          {
            name: "name",
            label: "Social Name",
            type: "text",
            placeholder: "Enter company name",
          },
          {
            name: "link",
            label: "Social Link",
            type: "text",
            placeholder: "https://example.com",
          },
        ]}
        submitButtonText={"Submit"}
      />
    </div>
  );
}
