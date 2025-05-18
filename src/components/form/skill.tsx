"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { MonthYearPicker } from "@/components/ui/month-year-picker"; // Assuming you have a MonthYearPicker
import { SkillWithTag } from "@/db/schema";
import { ResponseData } from "@/services/ApiResponse";
import { SkillDataWithoutId } from "@/services/skill/Skill";
import SkillService from "@/services/skill/SkillService"; // Assuming you have a SkillService
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

const formSchema = z.object({
  tag: z.string().min(1),
  category: z.string().min(1),
  startedAt: z.string().length(6),
});

export default function SkillForm({
  defaultValues,
}: {
  defaultValues?: SkillWithTag;
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues
      ? {
          tag: defaultValues.tag,
          category: defaultValues.category,
          startedAt: defaultValues.startedAt,
        }
      : undefined,
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    let res: ResponseData<SkillWithTag | SkillDataWithoutId>;
    if (defaultValues) {
      res = await SkillService.update({
        ...values,
        id: defaultValues.id,
      });
    } else {
      res = await SkillService.create(values);
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
          name="tag"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tag</FormLabel>
              <FormControl>
                <Input placeholder="Enter tag name" type="text" {...field} />
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
                <Input placeholder="Enter category" type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="startedAt"
          render={({ field }) => (
            <FormItem className="flex flex-col w-full">
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

        <Button type="submit" className="w-full">
          Submit
        </Button>
      </form>
    </Form>
  );
}
