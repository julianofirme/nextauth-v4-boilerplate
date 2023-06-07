export const metadata = {
  title: "Dashboard",
  description: "Your dashboard",
};

export default async function LoginLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="bg-zinc-800 h-full">
      {children}
    </div>
  )
}
