import { getCategories } from "@/services/category.service";
import { useQuery } from "@tanstack/react-query";

function Dashboard() {
  const { data } = useQuery({
    queryKey: ["categories"],
    queryFn: () => getCategories(),
  });

  return <div>{JSON.stringify(data, null, 2)}</div>;
}

export default Dashboard;
