import {
  useHistory,
  useLocation,
  useRouteMatch,
  useParams,
} from "react-router-dom";

export default function RouterHooks() {
  const params = useRouteMatch();
  console.log(params);
  return <h1>Router Hooks</h1>;
}
