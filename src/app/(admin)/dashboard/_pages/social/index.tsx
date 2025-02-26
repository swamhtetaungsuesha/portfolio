import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { db } from "@/db";
import { socials } from "@/db/schema";
import { SocialForm } from "./components/social-form";
import { SocialCard } from "./components/social-card";

const Social = async () => {
  const result = await db.select().from(socials);
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
            <SocialForm />
          </DialogContent>
        </Dialog>
      </div>
      {result.map((social) => (
        <SocialCard social={social} key={social.id} />
      ))}
      {/* <Suspense fallback={<div>Loading companies...</div>}> */}
      {/* </Suspense> */}
    </div>
  );
};

export default Social;
