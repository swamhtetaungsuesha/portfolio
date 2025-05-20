import UserQueryService from "@/services/user/QueryService";
import UserView from "@/views/admin/user/UserView";

const UserPage = async () => {
  const result = await UserQueryService.get();

  return <UserView user={result} />;
};

export default UserPage;
