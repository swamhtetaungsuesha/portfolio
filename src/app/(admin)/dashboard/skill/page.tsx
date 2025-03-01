import SkillCard from "@/components/card/skill";
import SkillForm from "@/components/form/skill";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { db } from "@/db";
import { skills, tags } from "@/db/schema";
import { eq, sql } from "drizzle-orm";

const Skill = async () => {
  const result = await db
    .select({
      id: skills.id,
      category: skills.category,
      startedAt: skills.startedAt,
      tag: sql<string>`${tags.name}`.as("tag"),
    })
    .from(skills)
    .leftJoin(tags, eq(skills.tagId, tags.id));
  return (
    <div>
      <div className="flex justify-end items-center mb-4">
        {/* <h1 className="text-2xl font-bold">Company Management</h1> */}
        <Dialog>
          <DialogTrigger asChild>
            <Button>Add New</Button>
          </DialogTrigger>
          <DialogContent className="w-[450px]">
            <DialogHeader>
              <DialogTitle>Add New Company</DialogTitle>
            </DialogHeader>
            <SkillForm />
          </DialogContent>
        </Dialog>
      </div>
      <div className="grid grid-cols-5 gap-2">
        {result.map((skill) => (
          <SkillCard skill={skill} key={skill.id} />
        ))}
      </div>
    </div>
  );
};

export default Skill;
