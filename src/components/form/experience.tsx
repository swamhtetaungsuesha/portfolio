"use client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
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
import { CompanySelect, ExperienceWithCompany } from "@/db/schema";
import { ResponseData } from "@/services/ApiResponse";
import { ExperienceData } from "@/services/experience/Experience";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import { MonthYearPicker } from "../ui/month-year-picker";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import ExperienceCommandService from "@/services/experience/CommandService";

const formSchema = z.object({
  companyId: z.number().min(1), // Assuming companyId is a number
  position: z.string().min(1),
  description: z
    .array(z.string())
    .nonempty("Please add at least one description item"),
  startedAt: z.string().length(6),
  endedAt: z.string().length(6).nullable(),
  isActive: z.boolean(),
});

export default function ExperienceForm({
  defaultValues,
  companies,
}: {
  defaultValues?: ExperienceWithCompany;
  companies: CompanySelect[];
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues
      ? {
          companyId: defaultValues.company.id,
          position: defaultValues.position,
          description: defaultValues.description,
          startedAt: defaultValues.startedAt,
          endedAt: defaultValues.endedAt,
          isActive: defaultValues.isActive,
        }
      : {
          description: [], // Provide a default empty array
        },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    let res: ResponseData<ExperienceWithCompany | ExperienceData>;
    if (defaultValues) {
      res = await ExperienceCommandService.update({
        ...values,
        id: defaultValues.id,
      });
    } else {
      res = await ExperienceCommandService.create(values);
    }
    if (res.success) {
      toast("Success", {
        description: res.message,
      });
    } else {
      toast("Error", {
        description: res.message,
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full">
        <FormField
          control={form.control}
          name="companyId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company</FormLabel>
              <FormControl>
                <Select
                  onValueChange={(value) => field.onChange(Number(value))}
                  defaultValue={field.value?.toString()}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a company" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {companies.map((company) => (
                      <SelectItem
                        key={company.id}
                        value={company.id.toString()}
                      >
                        {company.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="position"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Position</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your position"
                  type="text"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter your experience description. Add each item on new line."
                  className="resize-none"
                  rows={8}
                  value={field.value.join("\n")}
                  onChange={(e) => field.onChange(e.target.value.split("\n"))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-6">
            <FormField
              control={form.control}
              name="startedAt"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Started at</FormLabel>
                  <FormControl>
                    <MonthYearPicker
                      value={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="col-span-6">
            <FormField
              control={form.control}
              name="endedAt"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ended at</FormLabel>
                  <FormControl>
                    <MonthYearPicker
                      value={field.value || undefined}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <FormField
          control={form.control}
          name="isActive"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Is Active</FormLabel>
                <FormDescription>
                  This experience is currently active.
                </FormDescription>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          Submit
        </Button>
      </form>
    </Form>
  );
}
