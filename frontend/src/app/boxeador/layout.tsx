import Header from "../layout/header/Header"

export default function AdminLayout({
    children,
} : {
    children: React.ReactNode
}) {
    return (
        <>
        <Header/>
        {children}
        </>
    )
}