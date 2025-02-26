"use client";

import { useState } from "react";
import { z } from "zod";
// import { insertCompany, updateCompany } from "@/actions/command/companies";
import { Button } from "@/components/ui/button";
import { GenericForm } from "@/components/custom/generic-form";
import { useRouter } from "next/navigation";
import { insertCompany } from "@/actions/command/companies";
import { CompanySelect } from "@/db/schema";
import CompanyService from "@/services/company/CompanyService";
import { toast } from "sonner";

const updateSchema = z.object({
  id: z.number(),
  image: z.string().url("Invalid URL"),
  name: z.string().min(1, "Company name is required"),
  link: z.string().url("Invalid URL"),
  createdAt: z.date(),
  updatedAt: z.date(),
});

const createSchema = z.object({
  image: z.string().url("Invalid URL"),
  name: z.string().min(1, "Company name is required"),
  link: z.string().url("Invalid URL"),
});

type Schema = z.infer<typeof updateSchema> | z.infer<typeof createSchema>;

export function CompanyForm({ initialData }: { initialData?: CompanySelect }) {
  const onSubmit = async (values: Schema) => {
    let response;
    if (initialData) {
      response = await CompanyService.update(
        values as z.infer<typeof updateSchema>
      );
    } else {
      response = await CompanyService.create({
        image: values.image,
        link: values.link,
        name: values.name,
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
          image: initialData?.image || "",
          link: initialData?.link || "",
        }}
        onSubmit={onSubmit}
        fields={[
          {
            name: "name",
            label: "Company Name",
            type: "text",
            placeholder: "Enter company name",
          },
          {
            name: "image",
            label: "Company Logo",
            type: "text",
            placeholder: "https://example.png",
          },
          {
            name: "link",
            label: "Company Website",
            type: "text",
            placeholder: "https://example.com",
          },
        ]}
        submitButtonText={"Submit"}
      />
    </div>
  );
}
