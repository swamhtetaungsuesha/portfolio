import UserQueryService from "@/services/user/QueryService";
import UserView from "@/views/admin/user/UserView";

const UserPage = async () => {
  const result = await UserQueryService.get();
  if (!result.success) {
    return <div>500 Server Error</div>;
  }
  return <UserView user={result.data} />;
};

export default UserPage;
