import { UserSelect } from "@/db/schema";
import UserForm from "./UserForm";

const UserView = async (props: { user: UserSelect }) => {
  return (
    <div>
      <UserForm defaultValues={props.user} />
    </div>
  );
};

export default UserView;
