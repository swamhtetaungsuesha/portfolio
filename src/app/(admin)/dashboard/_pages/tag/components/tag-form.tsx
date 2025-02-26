"use client";

import { z } from "zod";
// import { insertCompany, updateCompany } from "@/actions/command/companies";
import { GenericForm } from "@/components/custom/generic-form";
import { TagSelect } from "@/db/schema";
import { toast } from "sonner";
import TagService from "@/services/tag/TagService";

const updateSchema = z.object({
  id: z.number(),
  name: z.string().min(1, "Company name is required"),
  term: z.string().min(1, "Term is required"),
  category: z.string().min(1, "Category is required"),
  createdAt: z.date(),
  updatedAt: z.date(),
});

const createSchema = z.object({
  name: z.string().min(1, "Company name is required"),
  term: z.string().min(1, "Term is required"),
  category: z.string().min(1, "Category is required"),
});

type Schema = z.infer<typeof updateSchema> | z.infer<typeof createSchema>;

export function TagForm({ initialData }: { initialData?: TagSelect }) {
  const onSubmit = async (values: Schema) => {
    let response;
    if (initialData) {
      response = await TagService.update(
        values as z.infer<typeof updateSchema>
      );
    } else {
      response = await TagService.create({
        name: values.name,
        term: values.term,
        category: values.category,
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
          term: initialData?.term,
        }}
        onSubmit={onSubmit}
        fields={[
          {
            name: "name",
            label: "Name",
            type: "text",
            placeholder: "Enter tag name",
          },
          {
            name: "term",
            label: "Term",
            type: "text",
            placeholder: "Enter tag term",
          },
          {
            name: "category",
            label: "Category",
            type: "text",
            placeholder: "Enter tag category",
          },
        ]}
        submitButtonText={"Submit"}
      />
    </div>
  );
}
