import { useParams } from "react-router-dom";

const Dashboard = () => {
  const { workspaceId, channelId } = useParams<{
    workspaceId: string;
    channelId: string;
  }>();
  return (
    <div>
      <p>Workspace ID: {workspaceId}</p>
      <p>Channel ID: {channelId}</p>
    </div>
  );
};

export default Dashboard;
