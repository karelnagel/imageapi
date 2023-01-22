import { Login } from "../../../components/Login";
import { getServerSession } from "../../../lib/getServerSession";
import { getTemplate } from "../../../pages/api/templates/[id]";
import { ClientPageWrapper } from "./ClientPage";

export const revalidate = 0;

export default async function Page({
  params: { id },
}: {
  params: { id: string };
}) {
  if (!id) return <div>Wrong id!</div>;
  const session = await getServerSession();
  if (!session?.user)
    return (
      <div className="h-full w-full flex flex-col items-center justify-center">
        <p className="text-3xl font-bold">Not logged in</p>
        <Login />
      </div>
    );
  const template = await getTemplate({ id });
  if (!template) return <div>Template not found!</div>;
  if (!template.isOwner) return <div>{"You can't edit this template!"}</div>;
  return <ClientPageWrapper template={template} />;
}