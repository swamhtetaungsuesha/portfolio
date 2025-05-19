import UserForm from "@/components/form/user";
import UserQueryService from "@/services/user/QueryService";

const User = async () => {
  const result = await UserQueryService.get();
  if (!result.success) {
    return <div>500 Server Error</div>;
  }
  return (
    <div>
      <UserForm defaultValues={result.data} />
    </div>
  );
};

export default User;
